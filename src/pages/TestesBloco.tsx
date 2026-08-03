import { useState, type CSSProperties } from "react";
import { ChevronDown } from "lucide-react";
import { ETAPAS } from "@/data/rifaSolidaria";

const CORAL = "hsl(15 65% 56%)";
const PETROLEO = "hsl(176 39% 14%)";

const PALETA = {
  "--primary": "15 65% 56%",
  "--primary-foreground": "0 0% 100%",
  "--secondary": "42 37% 88%",
  "--secondary-foreground": "178 36% 22%",
  "--border": "42 22% 84%",
} as CSSProperties;

const Titulo = ({ compacto = false }: { compacto?: boolean }) => (
  <div className={compacto ? "mb-6" : "mb-10"}>
    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary text-center mb-2">
      O método, passo a passo
    </p>
    <h2 className="text-2xl md:text-3xl font-bold text-center">
      5 etapas para tirar a sua campanha do papel
    </h2>
  </div>
);

/* ─────────── 1 · COMPACTO ─────────── */

const Compacto = () => {
  const [i, setI] = useState(0);
  const etapa = ETAPAS[i];
  return (
    <div>
      <Titulo compacto />
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {ETAPAS.map((e, idx) => {
          const on = idx === i;
          return (
            <button
              key={e.n}
              onClick={() => setI(idx)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                on
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/60 text-foreground/60 hover:text-foreground"
              }`}
            >
              {e.n}. {e.title}
            </button>
          );
        })}
      </div>
      <h3 className="text-xl md:text-2xl font-bold text-center mb-6">
        {etapa.pergunta}
      </h3>
      <div className="grid gap-3 md:grid-cols-3">
        {etapa.canvas.map((b) => (
          <div key={b.title} className="rounded-xl border border-border bg-secondary/25 p-4">
            <div className="flex items-center gap-2">
              <b.icon size={16} className="text-primary" />
              <h4 className="font-bold text-sm">{b.title}</h4>
            </div>
            <p className="text-sm text-muted-foreground mt-1.5 leading-snug">{b.pergunta}</p>
            <p className="text-xs italic text-primary mt-2">{b.dica}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─────────── 2 · PERGUNTA À ESQUERDA ─────────── */

const PerguntaLado = () => {
  const [i, setI] = useState(0);
  const etapa = ETAPAS[i];
  return (
    <div>
      <Titulo compacto />
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {ETAPAS.map((e, idx) => (
          <button
            key={e.n}
            onClick={() => setI(idx)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              idx === i
                ? "bg-primary text-primary-foreground"
                : "bg-secondary/60 text-foreground/60 hover:text-foreground"
            }`}
          >
            {e.title}
          </button>
        ))}
      </div>
      <div className="grid md:grid-cols-[0.85fr_1.15fr] gap-8 items-start">
        <div className="md:sticky md:top-8">
          <span
            className="inline-grid h-10 w-10 place-items-center rounded-full text-sm font-bold text-white mb-4"
            style={{ backgroundColor: CORAL }}
          >
            {etapa.n}
          </span>
          <h3 className="text-2xl font-bold leading-snug">{etapa.pergunta}</h3>
          <p className="text-sm text-muted-foreground mt-3">
            Três perguntas para responder nesta etapa.
          </p>
        </div>
        <div className="space-y-3">
          {etapa.canvas.map((b) => (
            <div key={b.title} className="rounded-xl border border-border bg-secondary/25 p-5">
              <div className="flex items-center gap-2">
                <b.icon size={17} className="text-primary" />
                <h4 className="font-bold">{b.title}</h4>
              </div>
              <p className="text-sm text-muted-foreground mt-1.5">{b.pergunta}</p>
              <p className="text-xs italic text-primary mt-2">{b.dica}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ─────────── 3 · LISTA SEM CAIXAS ─────────── */

const ListaLimpa = () => {
  const [i, setI] = useState(0);
  const etapa = ETAPAS[i];
  return (
    <div>
      <Titulo compacto />
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {ETAPAS.map((e, idx) => (
          <button
            key={e.n}
            onClick={() => setI(idx)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              idx === i
                ? "bg-primary text-primary-foreground"
                : "bg-secondary/60 text-foreground/60 hover:text-foreground"
            }`}
          >
            {e.title}
          </button>
        ))}
      </div>
      <h3 className="text-xl md:text-2xl font-bold text-center mb-8">{etapa.pergunta}</h3>
      <div className="max-w-2xl mx-auto divide-y divide-border">
        {etapa.canvas.map((b) => (
          <div key={b.title} className="flex gap-4 py-5">
            <span
              className="grid h-10 w-10 shrink-0 place-items-center rounded-xl"
              style={{ backgroundColor: "hsl(15 65% 56% / 0.12)", color: CORAL }}
            >
              <b.icon size={18} />
            </span>
            <div>
              <h4 className="font-bold">{b.title}</h4>
              <p className="text-sm text-muted-foreground mt-1">{b.pergunta}</p>
              <p className="text-xs italic text-primary mt-1.5">{b.dica}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─────────── 4 · ABAS NA LATERAL ─────────── */

const AbasLaterais = () => {
  const [i, setI] = useState(0);
  const etapa = ETAPAS[i];
  return (
    <div>
      <Titulo compacto />
      <div className="grid md:grid-cols-[200px_1fr] gap-8">
        <div className="flex md:flex-col gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {ETAPAS.map((e, idx) => {
            const on = idx === i;
            return (
              <button
                key={e.n}
                onClick={() => setI(idx)}
                className={`flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition-colors ${
                  on ? "text-primary-foreground" : "text-foreground/55 hover:bg-secondary/50"
                }`}
                style={on ? { backgroundColor: CORAL } : undefined}
              >
                <span
                  className={`grid h-6 w-6 place-items-center rounded-full text-xs font-bold ${
                    on ? "bg-white/25" : "bg-foreground/10"
                  }`}
                >
                  {e.n}
                </span>
                {e.title}
              </button>
            );
          })}
        </div>
        <div>
          <h3 className="text-xl md:text-2xl font-bold leading-snug mb-6">{etapa.pergunta}</h3>
          <div className="grid gap-3 sm:grid-cols-3">
            {etapa.canvas.map((b) => (
              <div key={b.title} className="rounded-xl border border-border bg-secondary/25 p-4">
                <b.icon size={17} className="text-primary" />
                <h4 className="font-bold text-sm mt-2">{b.title}</h4>
                <p className="text-sm text-muted-foreground mt-1 leading-snug">{b.pergunta}</p>
                <p className="text-xs italic text-primary mt-2">{b.dica}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─────────── 5 · ACORDEÃO ─────────── */

const Acordeao = () => {
  const [aberta, setAberta] = useState(0);
  return (
    <div>
      <Titulo compacto />
      <div className="max-w-3xl mx-auto rounded-2xl border border-border divide-y divide-border overflow-hidden">
        {ETAPAS.map((e, idx) => {
          const on = idx === aberta;
          return (
            <div key={e.n}>
              <button
                onClick={() => setAberta(on ? -1 : idx)}
                className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-secondary/30"
              >
                <span
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-bold transition-colors"
                  style={
                    on
                      ? { backgroundColor: CORAL, color: "white" }
                      : { backgroundColor: "hsl(42 37% 88%)", color: PETROLEO }
                  }
                >
                  {e.n}
                </span>
                <span className="flex-1">
                  <span className="font-bold block">{e.title}</span>
                  <span className="text-sm text-muted-foreground">{e.pergunta}</span>
                </span>
                <ChevronDown
                  size={18}
                  className="shrink-0 text-muted-foreground transition-transform"
                  style={{ transform: on ? "rotate(180deg)" : "none" }}
                />
              </button>
              {on && (
                <div className="grid gap-3 px-5 pb-5 sm:grid-cols-3 animate-fade-in">
                  {e.canvas.map((b) => (
                    <div key={b.title} className="rounded-xl bg-secondary/40 p-4">
                      <div className="flex items-center gap-2">
                        <b.icon size={15} className="text-primary" />
                        <h4 className="font-bold text-sm">{b.title}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1.5 leading-snug">
                        {b.pergunta}
                      </p>
                      <p className="text-xs italic text-primary mt-2">{b.dica}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ─────────── PÁGINA ─────────── */

const Bloco = ({
  num,
  nome,
  desc,
  children,
}: {
  num: number;
  nome: string;
  desc: string;
  children: React.ReactNode;
}) => (
  <section className="border-b border-border py-14">
    <div className="max-w-4xl mx-auto px-6">
      <div className="flex items-start gap-3 mb-10">
        <span
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-bold text-white"
          style={{ backgroundColor: CORAL }}
        >
          {num}
        </span>
        <div>
          <h2 className="text-xl font-bold">{nome}</h2>
          <p className="text-sm text-muted-foreground mt-0.5">{desc}</p>
        </div>
      </div>
      {children}
    </div>
  </section>
);

const TestesBloco = () => (
  <main className="bg-background text-foreground" style={PALETA}>
    <div className="max-w-4xl mx-auto px-6 pt-16 pb-4 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-2" style={{ color: CORAL }}>
        Modo teste
      </p>
      <h1 className="text-3xl md:text-4xl font-bold">
        5 arranjos para o bloco das etapas
      </h1>
      <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
        Mesmo conteúdo, distribuições diferentes. Todos clicáveis.
      </p>
    </div>

    <Bloco num={1} nome="Compacto" desc="Tudo mais junto: pílulas menores, cards baixos e espaçamento reduzido.">
      <Compacto />
    </Bloco>

    <Bloco num={2} nome="Pergunta à esquerda" desc="A pergunta ocupa a coluna esquerda e acompanha o scroll. Os 3 cards empilham à direita.">
      <PerguntaLado />
    </Bloco>

    <Bloco num={3} nome="Lista sem caixas" desc="Sem cartões: só ícone, título e texto separados por linhas finas. O mais leve.">
      <ListaLimpa />
    </Bloco>

    <Bloco num={4} nome="Abas na lateral" desc="As 5 etapas viram menu vertical à esquerda, liberando a largura para o conteúdo.">
      <AbasLaterais />
    </Bloco>

    <Bloco num={5} nome="Acordeão" desc="As 5 etapas empilhadas numa lista só. Abre e fecha, sem barra de abas separada.">
      <Acordeao />
    </Bloco>

    <div className="py-14 text-center text-sm text-muted-foreground">
      Fim das opções. Me diga o número que prefere.
    </div>
  </main>
);

export default TestesBloco;
