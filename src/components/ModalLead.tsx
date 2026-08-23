import { useEffect, useRef, useState } from "react";
import { Loader2, X } from "lucide-react";
import {
  mascaraCelular,
  salvarLead,
  validarLead,
  enviarLead,
  type ErrosLead,
  type Lead,
} from "@/lib/leads";

/**
 * Pede nome, celular e e-mail antes de liberar o PDF do Mapeamento.
 * Se o envio falhar, o PDF baixa do mesmo jeito: quem preencheu cumpriu a
 * parte dela.
 */

const VAZIO: Lead = { nome: "", celular: "", email: "" };

const ModalLead = ({
  aberto,
  aoFechar,
  aoConcluir,
  extras,
}: {
  aberto: boolean;
  aoFechar: () => void;
  /** chamado depois do envio: é aqui que o PDF é gerado */
  aoConcluir: (lead: Lead) => void;
  extras?: Record<string, string>;
}) => {
  const [lead, setLead] = useState<Lead>(VAZIO);
  const [erros, setErros] = useState<ErrosLead>({});
  const [enviando, setEnviando] = useState(false);
  const primeiro = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (aberto) primeiro.current?.focus();
  }, [aberto]);

  useEffect(() => {
    if (!aberto) return;
    const fechar = (e: KeyboardEvent) => e.key === "Escape" && aoFechar();
    document.addEventListener("keydown", fechar);
    return () => document.removeEventListener("keydown", fechar);
  }, [aberto, aoFechar]);

  if (!aberto) return null;

  const campo = (k: keyof Lead, v: string) => {
    setLead((a) => ({ ...a, [k]: k === "celular" ? mascaraCelular(v) : v }));
    setErros((a) => ({ ...a, [k]: undefined }));
  };

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    const achados = validarLead(lead);
    setErros(achados);
    if (Object.keys(achados).length) return;

    setEnviando(true);
    await enviarLead(lead, extras);
    salvarLead(lead);
    setEnviando(false);
    aoConcluir(lead);
    setLead(VAZIO);
  };

  const CAMPOS: { k: keyof Lead; rotulo: string; tipo: string; dica: string }[] = [
    { k: "nome", rotulo: "Seu nome", tipo: "text", dica: "Maria Silva" },
    { k: "celular", rotulo: "Celular", tipo: "tel", dica: "(11) 99999-0000" },
    { k: "email", rotulo: "E-mail", tipo: "email", dica: "maria@email.com" },
  ];

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-black/60 p-4 backdrop-blur-sm sm:items-center"
      onClick={aoFechar}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="titulo-lead"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-3xl bg-background p-6 shadow-2xl sm:p-8"
      >
        <button
          type="button"
          onClick={aoFechar}
          aria-label="Fechar"
          className="absolute right-4 top-4 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <X size={18} />
        </button>

        <h2 id="titulo-lead" className="pr-8 text-xl font-bold">
          Para onde eu mando o seu plano?
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          O PDF baixa na hora. Deixo o seu contato guardado para te avisar
          quando sair material novo sobre a Rifa Solidária.
        </p>

        <form onSubmit={enviar} noValidate className="mt-6 space-y-4">
          {CAMPOS.map((c) => (
            <div key={c.k}>
              <label htmlFor={`lead-${c.k}`} className="block text-sm font-semibold">
                {c.rotulo}
              </label>
              <input
                id={`lead-${c.k}`}
                ref={c.k === "nome" ? primeiro : undefined}
                name={c.k}
                type={c.tipo}
                value={lead[c.k]}
                placeholder={c.dica}
                onChange={(e) => campo(c.k, e.target.value)}
                aria-invalid={!!erros[c.k]}
                aria-describedby={erros[c.k] ? `erro-${c.k}` : undefined}
                className={`mt-1.5 w-full rounded-xl border bg-background px-4 py-3 text-base outline-none transition-colors focus:border-primary ${
                  erros[c.k] ? "border-destructive" : "border-border"
                }`}
              />
              {erros[c.k] && (
                <p id={`erro-${c.k}`} role="alert" className="mt-1.5 text-xs text-destructive">
                  {erros[c.k]}
                </p>
              )}
            </div>
          ))}

          <button
            type="submit"
            disabled={enviando}
            className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {enviando ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Enviando
              </>
            ) : (
              "Baixar o meu PDF"
            )}
          </button>

          <p className="text-center text-[11px] leading-relaxed text-muted-foreground">
            Seus dados ficam comigo. Nada de spam e você sai quando quiser.
          </p>
        </form>
      </div>
    </div>
  );
};

export default ModalLead;
