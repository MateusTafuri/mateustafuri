import { ETAPAS, type BlocoCanvas, type Etapa } from "@/data/rifaSolidaria";
import { chaveDe, TOTAL, type Mapeamento } from "@/hooks/use-mapeamento";
import { ArrowLeft, ArrowRight, Check, ChevronDown } from "lucide-react";

/* Peças do preenchimento do Mapeamento Rifa Solidária: o mapa das respostas,
   o campo que abre e fecha e a navegação entre etapas. */

const PETROLEO = "hsl(176 39% 14%)";

/** Mapa das 15 respostas: em cima no celular, à esquerda no desktop */
export const MapaEtapas = ({
  m,
  i,
  irPara,
}: {
  m: Mapeamento;
  i: number;
  irPara: (n: number) => void;
}) => (
  <aside
    className="h-max min-w-0 rounded-3xl p-4 text-white sm:p-5 md:sticky md:top-6"
    style={{ backgroundColor: PETROLEO }}
  >
    <div className="flex items-baseline justify-between gap-3">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
        Seu mapa
      </p>
      <p className="text-2xl font-bold md:hidden">
        {m.totalPreenchidas}
        <span className="text-base font-semibold text-white/45">/{TOTAL}</span>
      </p>
    </div>
    <p className="mt-1 hidden text-2xl font-bold md:block">
      {m.totalPreenchidas}
      <span className="text-base font-semibold text-white/45">/{TOTAL}</span>
    </p>

    <div className="mt-3 space-y-1.5 md:mt-4 md:space-y-2">
      {ETAPAS.map((e, idx) => (
        <button
          key={e.n}
          onClick={() => irPara(idx)}
          className={`flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left transition-colors ${
            idx === i ? "bg-white/10" : "hover:bg-white/[0.06]"
          }`}
        >
          <span className="shrink-0 text-sm leading-none">{e.emoji}</span>
          <span className="min-w-0 flex-1 truncate text-xs text-white/80">
            {e.title}
          </span>
          <span className="flex shrink-0 gap-1">
            {e.canvas.map((b) => (
              <span
                key={b.title}
                className={`h-3 w-3 rounded-[3px] ${
                  m.preenchida(chaveDe(e.n, b.title))
                    ? "bg-[hsl(15,65%,56%)]"
                    : "bg-white/15"
                }`}
              />
            ))}
          </span>
        </button>
      ))}
    </div>

    <p className="mt-3 hidden border-t border-white/10 pt-3 text-[11px] leading-relaxed text-white/45 md:block">
      Cada quadradinho é uma resposta. Quando os quinze acenderem, a sua
      campanha está desenhada.
    </p>
  </aside>
);

/** Campo que abre e fecha: só um fica aberto por vez dentro da etapa */
export const CampoDobravel = ({
  etapa,
  bloco,
  m,
  aberto,
  abrir,
  proxima,
}: {
  etapa: Etapa;
  bloco: BlocoCanvas;
  m: Mapeamento;
  aberto: boolean;
  abrir: () => void;
  proxima?: () => void;
}) => {
  const chave = chaveDe(etapa.n, bloco.title);
  const ok = m.preenchida(chave);
  const resposta = (m.respostas[chave] || "").trim();

  return (
    <div
      className={`overflow-hidden rounded-2xl border transition-colors ${
        aberto ? "border-primary/50 bg-background" : "border-border"
      }`}
    >
      <button
        onClick={abrir}
        aria-expanded={aberto}
        className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors ${
          aberto ? "" : "hover:bg-secondary/40"
        }`}
      >
        <span className="shrink-0 text-lg leading-none">{bloco.emoji}</span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-bold">{bloco.title}</span>
          {!aberto && (
            <span className="block truncate text-xs text-muted-foreground">
              {resposta || bloco.pergunta}
            </span>
          )}
        </span>
        {ok && (
          <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
            <Check size={12} strokeWidth={3} />
          </span>
        )}
        <ChevronDown
          size={17}
          className="shrink-0 text-muted-foreground transition-transform"
          style={{ transform: aberto ? "rotate(180deg)" : "none" }}
        />
      </button>

      {aberto && (
        <div className="px-4 pb-4">
          <label
            htmlFor={`d-${chave}`}
            className="block text-sm text-muted-foreground"
          >
            {bloco.pergunta}
          </label>
          <textarea
            id={`d-${chave}`}
            value={m.respostas[chave] || ""}
            onChange={(ev) => m.responder(chave, ev.target.value)}
            rows={4}
            placeholder="Escreva aqui a sua resposta"
            className="mt-2 w-full resize-y rounded-xl border border-border bg-secondary/30 p-3 text-sm leading-relaxed outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary/60 focus:bg-background"
          />
          <div className="mt-3 flex items-center justify-between gap-3 border-t border-border pt-3">
            <p className="text-xs italic text-primary">{bloco.dica}</p>
            {proxima && (
              <button
                onClick={proxima}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-semibold transition-colors hover:bg-secondary/50"
              >
                Próxima <ArrowRight size={13} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export const NavegacaoEtapas = ({
  i,
  setI,
  total,
  rotulo,
}: {
  i: number;
  setI: (n: number) => void;
  total: number;
  rotulo: string;
}) => (
  <div className="mt-6 flex items-center justify-between gap-3">
    <button
      onClick={() => setI(Math.max(0, i - 1))}
      disabled={i === 0}
      className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-secondary/50 disabled:opacity-35"
    >
      <ArrowLeft size={16} /> Voltar
    </button>
    <span className="text-xs text-muted-foreground">{rotulo}</span>
    <button
      onClick={() => setI(Math.min(total - 1, i + 1))}
      disabled={i === total - 1}
      className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-35"
    >
      Avançar <ArrowRight size={16} />
    </button>
  </div>
);
