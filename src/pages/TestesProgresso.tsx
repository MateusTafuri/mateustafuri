import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ETAPAS } from "@/data/rifaSolidaria";
import { useMapeamento, TOTAL, type Mapeamento } from "@/hooks/use-mapeamento";
import { CampoDobravel } from "@/components/MapeamentoCampos";
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react";

/* Cinco formas de mostrar o progresso e deixar as cinco etapas ao alcance
   durante a página inteira. Todas usam as mesmas respostas, salvas neste
   navegador: escreva em uma e troque de opção para comparar. Pensadas para o
   celular primeiro — no desktop elas continuam funcionando, mais folgadas. */

const PALETA = {
  "--primary": "15 65% 56%",
  "--primary-foreground": "0 0% 100%",
  "--secondary": "42 37% 88%",
  "--secondary-foreground": "178 36% 22%",
  "--border": "42 22% 84%",
  "--ring": "15 65% 56%",
} as CSSProperties;

type Nav = {
  m: Mapeamento;
  i: number;
  irPara: (n: number) => void;
};

/* ─────────── o formulário, igual em todas as opções ─────────── */

const Corpo = ({
  m,
  i,
  irPara,
  aberto,
  setAberto,
}: Nav & { aberto: number; setAberto: (n: number) => void }) => {
  const etapa = ETAPAS[i];

  return (
    <div className="rounded-3xl border border-border bg-card p-4 shadow-sm sm:p-6">
      <div className="mb-5 flex items-start gap-3 border-b border-border pb-5">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-secondary text-xl">
          {etapa.emoji}
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="text-lg font-bold sm:text-xl">{etapa.title}</h2>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            {etapa.chamada}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        {etapa.canvas.map((b, idx) => (
          <CampoDobravel
            key={b.title}
            etapa={etapa}
            bloco={b}
            m={m}
            aberto={idx === aberto}
            abrir={() => setAberto(idx === aberto ? -1 : idx)}
            proxima={
              idx < etapa.canvas.length - 1
                ? () => setAberto(idx + 1)
                : i < ETAPAS.length - 1
                  ? () => irPara(i + 1)
                  : undefined
            }
          />
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between gap-3 border-t border-border pt-5">
        <button
          onClick={() => irPara(i - 1)}
          disabled={i === 0}
          className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold transition-colors hover:bg-secondary/50 disabled:opacity-30"
        >
          <ArrowLeft size={15} /> Voltar
        </button>
        <button
          onClick={() => irPara(i + 1)}
          disabled={i === ETAPAS.length - 1}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-30"
        >
          Avançar <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
};

/* ─────────── 1 · Linha fina ─────────── */

const LinhaFina = ({ m, i, irPara }: Nav) => (
  <div className="px-5 sm:px-6">
    <div className="mx-auto flex max-w-2xl items-center gap-3 py-2.5">
      <span className="truncate text-xs font-bold">
        {ETAPAS[i].emoji} {ETAPAS[i].title}
      </span>
      <span className="ml-auto flex shrink-0 items-center gap-1.5">
        {ETAPAS.map((e, idx) => (
          <button
            key={e.n}
            onClick={() => irPara(idx)}
            aria-label={`Etapa ${e.n}, ${e.title}`}
            aria-current={idx === i ? "step" : undefined}
            className={`h-2 rounded-full transition-all ${
              idx === i
                ? "w-6 bg-primary"
                : m.completa(e.n)
                  ? "w-2 bg-primary/45"
                  : "w-2 bg-border"
            }`}
          />
        ))}
      </span>
    </div>
    <div className="h-0.5 overflow-hidden rounded-full bg-secondary">
      <div
        className="h-full bg-primary transition-all duration-300"
        style={{ width: `${(m.totalPreenchidas / TOTAL) * 100}%` }}
      />
    </div>
  </div>
);

/* ─────────── 2 · Pílulas roláveis ─────────── */

const Pilulas = ({ m, i, irPara }: Nav) => {
  const faixa = useRef<HTMLDivElement>(null);

  // mantém a etapa aberta sempre visível na faixa
  useEffect(() => {
    faixa.current?.children[i]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [i]);

  return (
    <div className="py-2">
      <div
        ref={faixa}
        className="flex gap-2 overflow-x-auto px-5 pb-1 sm:px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {ETAPAS.map((e, idx) => {
          const feita = m.completa(e.n);
          return (
            <button
              key={e.n}
              onClick={() => irPara(idx)}
              aria-current={idx === i ? "step" : undefined}
              className={`flex shrink-0 items-center gap-1.5 rounded-full border py-1.5 text-xs font-semibold transition-all ${
                idx === i
                  ? "border-primary bg-primary px-3.5 text-primary-foreground"
                  : "border-border px-2.5 text-muted-foreground"
              }`}
            >
              {feita && idx !== i ? (
                <Check size={13} strokeWidth={3} className="text-primary" />
              ) : (
                <span>{e.n}</span>
              )}
              {idx === i && <span>{e.title}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
};

/* ─────────── 3 · Barra inferior ─────────── */

const BarraInferior = ({ m, i, irPara }: Nav) => (
  <div
    className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur-md"
    style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
  >
    <div className="mx-auto flex max-w-2xl">
      {ETAPAS.map((e, idx) => (
        <button
          key={e.n}
          onClick={() => irPara(idx)}
          aria-current={idx === i ? "step" : undefined}
          className="flex flex-1 flex-col items-center gap-1 py-2.5"
        >
          <span
            className={`grid h-7 w-7 place-items-center rounded-full text-xs font-bold transition-colors ${
              idx === i
                ? "bg-primary text-primary-foreground"
                : m.completa(e.n)
                  ? "bg-primary/20 text-primary"
                  : "bg-secondary text-muted-foreground"
            }`}
          >
            {m.completa(e.n) && idx !== i ? (
              <Check size={13} strokeWidth={3} />
            ) : (
              e.n
            )}
          </span>
          <span
            className={`text-[10px] font-semibold ${
              idx === i ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            {e.title}
          </span>
          <span className="flex gap-0.5">
            {e.canvas.map((b, k) => (
              <span
                key={b.title}
                className={`h-1 w-1.5 rounded-full ${
                  k < m.respondidasNa(e.n) ? "bg-primary" : "bg-border"
                }`}
              />
            ))}
          </span>
        </button>
      ))}
    </div>
  </div>
);

/* ─────────── 4 · Anel flutuante ─────────── */

const Anel = ({ m, i, irPara }: Nav) => {
  const [aberta, setAberta] = useState(false);
  const pct = m.totalPreenchidas / TOTAL;

  return (
    <>
      <button
        onClick={() => setAberta(true)}
        aria-label="Abrir as etapas"
        className="fixed bottom-5 right-5 z-40 grid h-16 w-16 place-items-center rounded-full bg-background shadow-lg ring-1 ring-border"
      >
        <svg viewBox="0 0 36 36" className="absolute h-16 w-16 -rotate-90">
          <circle
            cx="18"
            cy="18"
            r="16"
            fill="none"
            strokeWidth="2.5"
            className="stroke-secondary"
          />
          <circle
            cx="18"
            cy="18"
            r="16"
            fill="none"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="stroke-primary transition-all duration-500"
            strokeDasharray={`${pct * 100.5} 100.5`}
          />
        </svg>
        <span className="relative text-sm font-bold leading-none">
          {m.totalPreenchidas}
          <span className="text-[10px] text-muted-foreground">/{TOTAL}</span>
        </span>
      </button>

      {aberta && (
        <div
          className="fixed inset-0 z-50 flex items-end bg-black/40"
          onClick={() => setAberta(false)}
        >
          <div
            className="w-full rounded-t-3xl bg-background p-5 pb-8"
            onClick={(ev) => ev.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-bold">Etapas</p>
              <button onClick={() => setAberta(false)} aria-label="Fechar">
                <X size={18} className="text-muted-foreground" />
              </button>
            </div>
            <div className="space-y-1.5">
              {ETAPAS.map((e, idx) => (
                <button
                  key={e.n}
                  onClick={() => {
                    irPara(idx);
                    setAberta(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-2xl border px-3 py-2.5 text-left transition-colors ${
                    idx === i ? "border-primary bg-secondary/40" : "border-border"
                  }`}
                >
                  <span className="text-lg leading-none">{e.emoji}</span>
                  <span className="flex-1 text-sm font-semibold">{e.title}</span>
                  <span className="text-xs font-bold text-muted-foreground">
                    {m.respondidasNa(e.n)}/{e.canvas.length}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

/* ─────────── 5 · Quinze segmentos ─────────── */

const Segmentos = ({ m, i, irPara }: Nav) => (
  <div className="px-5 py-2.5 sm:px-6">
    <div className="mx-auto max-w-2xl">
      <div className="flex gap-2">
        {ETAPAS.map((e, idx) => (
          <button
            key={e.n}
            onClick={() => irPara(idx)}
            aria-label={`Etapa ${e.n}, ${e.title}`}
            aria-current={idx === i ? "step" : undefined}
            className="flex flex-1 gap-0.5"
          >
            {e.canvas.map((b, k) => (
              <span
                key={b.title}
                className={`h-1.5 flex-1 rounded-full transition-colors ${
                  k < m.respondidasNa(e.n)
                    ? "bg-primary"
                    : idx === i
                      ? "bg-primary/25"
                      : "bg-border"
                }`}
              />
            ))}
          </button>
        ))}
      </div>
      <p className="mt-2 text-xs font-semibold">
        {ETAPAS[i].emoji} {ETAPAS[i].title}
        <span className="font-normal text-muted-foreground">
          {" "}
          · etapa {i + 1} de {ETAPAS.length} · {m.totalPreenchidas} de {TOTAL}{" "}
          respondidas
        </span>
      </p>
    </div>
  </div>
);

/* ─────────── página ─────────── */

const OPCOES = [
  {
    id: "linha",
    nome: "1 · Linha fina",
    nota: "Uma faixa de 40px que gruda no topo: nome da etapa, cinco bolinhas para pular e um fio de progresso embaixo. É o mínimo possível de cromo — sobra tela para o teclado do celular.",
    Chrome: LinhaFina,
    topo: true,
  },
  {
    id: "pilulas",
    nome: "2 · Pílulas roláveis",
    nota: "As cinco etapas viram pílulas numa faixa que rola sozinha para manter a atual no centro. Só a etapa aberta mostra o nome; as fechadas viram número ou check. Dá nome ao lugar sem ocupar duas linhas.",
    Chrome: Pilulas,
    topo: true,
  },
  {
    id: "barra",
    nome: "3 · Barra inferior",
    nota: "Navegação onde o polegar alcança, como um app. Cada etapa mostra três tracinhos com as respostas dela. É a que mais convida a pular de etapa, e a que mais come altura de tela.",
    Chrome: BarraInferior,
    topo: false,
  },
  {
    id: "anel",
    nome: "4 · Anel flutuante",
    nota: "Nada fixo na tela além de um botão redondo com o anel de 0 a 15. O toque abre uma gaveta com as cinco etapas. Máximo de espaço para escrever, com o progresso a um toque de distância.",
    Chrome: Anel,
    topo: false,
  },
  {
    id: "segmentos",
    nome: "5 · Quinze segmentos",
    nota: "As quinze respostas viram quinze tracinhos agrupados de três em três: cada grupo é uma etapa clicável. Mostra exatamente onde você está dentro do todo, sem número nenhum na cara.",
    Chrome: Segmentos,
    topo: true,
  },
];

const TestesProgresso = () => {
  const m = useMapeamento();
  const [op, setOp] = useState(OPCOES[0].id);
  const [i, setI] = useState(0);
  const [aberto, setAberto] = useState(-1);
  const atual = OPCOES.find((o) => o.id === op)!;

  const irPara = (n: number) => {
    setI(Math.max(0, Math.min(ETAPAS.length - 1, n)));
    setAberto(-1);
  };

  return (
    <div className="min-h-screen bg-background text-foreground" style={PALETA}>
      {/* seletor das opções + a barra fixa da opção, num bloco só:
          juntos evitam a fresta que aparece entre dois sticky empilhados */}
      <div className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-2xl gap-2 overflow-x-auto px-5 py-2.5 sm:px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {OPCOES.map((o) => (
            <button
              key={o.id}
              onClick={() => setOp(o.id)}
              className={`shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                o.id === op
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border hover:bg-secondary/50"
              }`}
            >
              {o.nome}
            </button>
          ))}
        </div>
        {atual.topo && (
          <div className="border-t border-border">
            <atual.Chrome m={m} i={i} irPara={irPara} />
          </div>
        )}
      </div>

      {!atual.topo && <atual.Chrome m={m} i={i} irPara={irPara} />}

      <main
        className={`mx-auto max-w-2xl px-5 sm:px-6 ${
          atual.id === "barra" ? "pb-28" : "pb-16"
        }`}
      >
        <header className="pt-6">
          <h1 className="text-xl font-bold">{atual.nome}</h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {atual.nota}
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            As cinco opções dividem as mesmas respostas. Escreva em uma e troque
            para comparar.
          </p>
        </header>

        <div className="mt-6">
          <Corpo
            m={m}
            i={i}
            irPara={irPara}
            aberto={aberto}
            setAberto={setAberto}
          />
        </div>

        {/* texto solto só para dar rolagem e testar o comportamento fixo */}
        <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
          {ETAPAS[i].objetivo}
        </p>
        <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
          {ETAPAS[i].aprender.map((a) => (
            <li key={a} className="flex gap-2">
              <span className="text-primary">·</span>
              {a}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default TestesProgresso;
