import { useState, type CSSProperties } from "react";
import { ETAPAS, type BlocoCanvas, type Etapa } from "@/data/rifaSolidaria";
import {
  useMapeamento,
  chaveDe,
  TOTAL,
  type Mapeamento,
} from "@/hooks/use-mapeamento";
import { ArrowRight, Check, Download } from "lucide-react";
import {
  CampoDobravel,
  MapaEtapas,
  NavegacaoEtapas as Navegacao,
} from "@/components/MapeamentoCampos";

/* Cinco estruturas para o preenchimento do Mapeamento Rifa Solidária.
   Todas compartilham o mesmo estado, então o que você escrever em uma
   aparece nas outras: dá para comparar a navegação com o mesmo conteúdo. */

const PALETA = {
  "--primary": "15 65% 56%",
  "--primary-foreground": "0 0% 100%",
  "--secondary": "42 37% 88%",
  "--secondary-foreground": "178 36% 22%",
  "--border": "42 22% 84%",
  "--ring": "15 65% 56%",
} as CSSProperties;

const PETROLEO = "hsl(176 39% 14%)";

/* ─────────── peças comuns ─────────── */

const Campo = ({
  etapa,
  bloco,
  m,
  linhas = 4,
  grande = false,
}: {
  etapa: Etapa;
  bloco: BlocoCanvas;
  m: Mapeamento;
  linhas?: number;
  grande?: boolean;
}) => {
  const chave = chaveDe(etapa.n, bloco.title);
  const ok = m.preenchida(chave);
  return (
    <div
      className={`flex flex-col rounded-2xl border bg-background p-5 transition-colors ${
        ok ? "border-primary/50" : "border-border"
      }`}
    >
      <div className="flex items-center gap-2">
        <span className={grande ? "text-2xl leading-none" : "text-lg leading-none"}>
          {bloco.emoji}
        </span>
        <h3 className={grande ? "text-lg font-bold" : "font-bold"}>{bloco.title}</h3>
        {ok && (
          <span className="ml-auto grid h-5 w-5 place-items-center rounded-full bg-primary text-primary-foreground">
            <Check size={12} strokeWidth={3} />
          </span>
        )}
      </div>
      <label
        htmlFor={`c-${chave}`}
        className={`mt-2 leading-relaxed text-muted-foreground ${
          grande ? "text-base" : "text-sm"
        }`}
      >
        {bloco.pergunta}
      </label>
      <textarea
        id={`c-${chave}`}
        value={m.respostas[chave] || ""}
        onChange={(ev) => m.responder(chave, ev.target.value)}
        rows={linhas}
        placeholder="Escreva aqui a sua resposta"
        className="mt-3 w-full flex-1 resize-y rounded-xl border border-border bg-secondary/30 p-3 text-sm leading-relaxed outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary/60 focus:bg-background"
      />
      <p className="mt-3 border-t border-border pt-3 text-xs italic text-primary">
        {bloco.dica}
      </p>
    </div>
  );
};

const BotaoBaixar = ({ m }: { m: Mapeamento }) => (
  <button
    onClick={m.baixar}
    className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
  >
    <Download size={16} /> Salvar respostas
  </button>
);

/* ─────────── 1 · trilha horizontal ─────────── */

const Trilha = ({ m }: { m: Mapeamento }) => {
  const [i, setI] = useState(0);
  const etapa = ETAPAS[i];

  return (
    <div>
      {/* stepper */}
      <div className="relative">
        <span className="pointer-events-none absolute top-5 left-[10%] right-[10%] hidden h-px bg-border sm:block" />
        <div className="relative grid grid-cols-5 gap-1">
          {ETAPAS.map((e, idx) => {
            const feita = m.completa(e.n);
            const atual = idx === i;
            return (
              <button
                key={e.n}
                onClick={() => setI(idx)}
                className="flex flex-col items-center gap-2 px-1 text-center"
              >
                <span
                  className={`grid h-10 w-10 place-items-center rounded-full text-sm font-bold transition-colors ${
                    atual
                      ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                      : feita
                        ? "bg-primary/15 text-primary"
                        : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {feita && !atual ? <Check size={16} strokeWidth={3} /> : e.n}
                </span>
                <span
                  className={`text-[11px] font-semibold leading-tight sm:text-xs ${
                    atual ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {e.title}
                </span>
                <span className="text-[10px] text-muted-foreground">
                  {m.respondidasNa(e.n)}/{e.canvas.length}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* etapa */}
      <div className="mt-8 rounded-3xl border border-border bg-secondary/25 p-4 md:p-6">
        <div className="mb-4 flex items-center gap-3 px-1">
          <span className="text-2xl leading-none">{etapa.emoji}</span>
          <div>
            <h2 className="text-xl font-bold">{etapa.title}</h2>
            <p className="text-sm text-muted-foreground">{etapa.pergunta}</p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {etapa.canvas.map((b) => (
            <Campo key={b.title} etapa={etapa} bloco={b} m={m} />
          ))}
        </div>
      </div>

      <Navegacao
        i={i}
        setI={setI}
        total={ETAPAS.length}
        rotulo={`Etapa ${i + 1} de ${ETAPAS.length}`}
      />
    </div>
  );
};

/* ─────────── 2 · menu lateral ─────────── */

const Lateral = ({ m }: { m: Mapeamento }) => {
  const [i, setI] = useState(0);
  const etapa = ETAPAS[i];

  return (
    <div className="grid gap-6 md:grid-cols-[230px_1fr]">
      {/* menu: coluna no desktop, faixa rolável no celular */}
      <nav className="flex gap-2 overflow-x-auto pb-2 md:flex-col md:overflow-visible md:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {ETAPAS.map((e, idx) => {
          const feitas = m.respondidasNa(e.n);
          const atual = idx === i;
          return (
            <button
              key={e.n}
              onClick={() => setI(idx)}
              className={`shrink-0 rounded-2xl border px-4 py-3 text-left transition-colors md:w-full ${
                atual
                  ? "border-primary bg-primary/10"
                  : "border-border hover:bg-secondary/40"
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="text-base leading-none">{e.emoji}</span>
                <span className="text-sm font-bold">{e.title}</span>
                {m.completa(e.n) && (
                  <Check size={14} strokeWidth={3} className="ml-auto text-primary" />
                )}
              </span>
              <span className="mt-2 flex items-center gap-1.5">
                {e.canvas.map((b) => (
                  <span
                    key={b.title}
                    className={`h-1 flex-1 rounded-full ${
                      m.preenchida(chaveDe(e.n, b.title)) ? "bg-primary" : "bg-border"
                    }`}
                  />
                ))}
                <span className="ml-1 text-[10px] text-muted-foreground">
                  {feitas}/{e.canvas.length}
                </span>
              </span>
            </button>
          );
        })}
      </nav>

      <div>
        <div className="mb-4 flex items-center gap-3">
          <span className="text-2xl leading-none">{etapa.emoji}</span>
          <div>
            <h2 className="text-xl font-bold">
              {etapa.n}. {etapa.title}
            </h2>
            <p className="text-sm text-muted-foreground">{etapa.pergunta}</p>
          </div>
        </div>
        <div className="grid gap-4">
          {etapa.canvas.map((b) => (
            <Campo key={b.title} etapa={etapa} bloco={b} m={m} linhas={3} />
          ))}
        </div>
        <Navegacao
          i={i}
          setI={setI}
          total={ETAPAS.length}
          rotulo={`Etapa ${i + 1} de ${ETAPAS.length}`}
        />
      </div>
    </div>
  );
};

/* ─────────── 3 · uma pergunta por vez ─────────── */

const PERGUNTAS = ETAPAS.flatMap((e) => e.canvas.map((b) => ({ etapa: e, bloco: b })));

const UmaPorVez = ({ m }: { m: Mapeamento }) => {
  const [i, setI] = useState(0);
  const { etapa, bloco } = PERGUNTAS[i];

  return (
    <div>
      {/* barra fina com as 15 marcas, agrupadas por etapa */}
      <div className="flex items-end gap-3">
        {ETAPAS.map((e) => (
          <div key={e.n} className="flex-1">
            <div className="flex gap-1">
              {e.canvas.map((b) => {
                const idx = PERGUNTAS.findIndex(
                  (p) => p.etapa.n === e.n && p.bloco.title === b.title,
                );
                return (
                  <button
                    key={b.title}
                    onClick={() => setI(idx)}
                    aria-label={`${e.title}: ${b.title}`}
                    className={`h-1.5 flex-1 rounded-full transition-colors ${
                      idx === i
                        ? "bg-primary"
                        : m.preenchida(chaveDe(e.n, b.title))
                          ? "bg-primary/45"
                          : "bg-border"
                    }`}
                  />
                );
              })}
            </div>
            <p
              className={`mt-1.5 truncate text-[10px] font-semibold sm:text-[11px] ${
                e.n === etapa.n ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {e.emoji} {e.title}
            </p>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-10 max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
          Etapa {etapa.n} · {etapa.title}
        </p>
        <h2 className="mt-3 text-2xl font-bold leading-snug md:text-3xl">
          {bloco.emoji} {bloco.pergunta}
        </h2>
        <textarea
          value={m.respostas[chaveDe(etapa.n, bloco.title)] || ""}
          onChange={(ev) => m.responder(chaveDe(etapa.n, bloco.title), ev.target.value)}
          rows={5}
          autoFocus
          placeholder="Escreva aqui a sua resposta"
          className="mt-6 w-full resize-y rounded-2xl border border-border bg-secondary/30 p-4 leading-relaxed outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary/60 focus:bg-background"
        />
        <p className="mt-3 text-sm italic text-primary">{bloco.dica}</p>
      </div>

      <div className="mx-auto max-w-2xl">
        <Navegacao
          i={i}
          setI={setI}
          total={PERGUNTAS.length}
          rotulo={`${i + 1} de ${PERGUNTAS.length}`}
        />
      </div>
    </div>
  );
};

/* ─────────── 4 · grade do canvas ─────────── */

const Grade = ({ m }: { m: Mapeamento }) => {
  const [i, setI] = useState(0);
  const [aberto, setAberto] = useState(0);
  const etapa = ETAPAS[i];

  // trocar de etapa sempre reabre a primeira pergunta
  const irPara = (n: number) => {
    setI(n);
    setAberto(0);
  };

  return (
    <div className="grid gap-6 md:grid-cols-[220px_1fr]">
      <MapaEtapas m={m} i={i} irPara={irPara} />

      <div className="min-w-0">
        <div className="mb-4 flex items-center gap-3">
          <span className="text-2xl leading-none">{etapa.emoji}</span>
          <div>
            <h2 className="text-xl font-bold">
              {etapa.n}. {etapa.title}
            </h2>
            <p className="text-sm text-muted-foreground">{etapa.chamada}</p>
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
        <Navegacao
          i={i}
          setI={irPara}
          total={ETAPAS.length}
          rotulo={`Etapa ${i + 1} de ${ETAPAS.length}`}
        />
      </div>
    </div>
  );
};

/* ─────────── 5 · acordeão progressivo ─────────── */

const Progressivo = ({ m }: { m: Mapeamento }) => {
  const [aberta, setAberta] = useState(1);

  return (
    <div className="space-y-3">
      {ETAPAS.map((e) => {
        const abertaAqui = aberta === e.n;
        const feitas = m.respondidasNa(e.n);
        return (
          <div
            key={e.n}
            className={`overflow-hidden rounded-2xl border transition-colors ${
              abertaAqui ? "border-primary/50" : "border-border"
            }`}
          >
            <button
              onClick={() => setAberta(abertaAqui ? -1 : e.n)}
              className={`flex w-full items-center gap-3 px-5 py-4 text-left transition-colors ${
                abertaAqui ? "bg-background" : "hover:bg-secondary/40"
              }`}
            >
              <span
                className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-base ${
                  m.completa(e.n) ? "bg-primary text-primary-foreground" : "bg-secondary"
                }`}
              >
                {m.completa(e.n) ? <Check size={16} strokeWidth={3} /> : e.emoji}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-bold">
                  {e.n}. {e.title}
                </span>
                <span className="text-sm text-muted-foreground">{e.pergunta}</span>
              </span>
              <span className="shrink-0 text-xs font-bold text-primary">
                {feitas}/{e.canvas.length}
              </span>
            </button>

            {abertaAqui ? (
              <div className="bg-background px-5 pb-5">
                <div className="grid gap-4 md:grid-cols-3">
                  {e.canvas.map((b) => (
                    <Campo key={b.title} etapa={e} bloco={b} m={m} linhas={3} />
                  ))}
                </div>
                {e.n < ETAPAS.length && (
                  <button
                    onClick={() => setAberta(e.n + 1)}
                    className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
                  >
                    Ir para {ETAPAS[e.n].title} <ArrowRight size={16} />
                  </button>
                )}
              </div>
            ) : (
              feitas > 0 && (
                <div className="border-t border-border bg-secondary/20 px-5 py-3">
                  <ul className="space-y-1">
                    {e.canvas.map((b) => {
                      const r = (m.respostas[chaveDe(e.n, b.title)] || "").trim();
                      return (
                        <li
                          key={b.title}
                          className="flex gap-2 text-xs text-muted-foreground"
                        >
                          <span className="shrink-0 font-semibold text-foreground">
                            {b.emoji} {b.title}:
                          </span>
                          <span className="truncate">{r || "em branco"}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )
            )}
          </div>
        );
      })}
    </div>
  );
};

/* ─────────── página ─────────── */

const OPCOES = [
  {
    id: "trilha",
    nome: "1 · Trilha horizontal",
    nota: "As cinco etapas viram um stepper no topo, com o número virando check quando a etapa fecha. Uma etapa por tela, três perguntas lado a lado. É a estrutura mais convencional e a que menos exige explicação.",
    Render: Trilha,
  },
  {
    id: "lateral",
    nome: "2 · Menu lateral",
    nota: "As etapas ficam sempre visíveis numa coluna à esquerda, cada uma com três barrinhas de progresso. Dá liberdade para pular de etapa sem perder o mapa. No celular a coluna vira uma faixa rolável.",
    Render: Lateral,
  },
  {
    id: "foco",
    nome: "3 · Uma pergunta por vez",
    nota: "Quinze telas, uma pergunta grande de cada vez, com as quinze marcas agrupadas por etapa no topo. É o que mais reduz a sensação de formulário, e o que mais exige cliques.",
    Render: UmaPorVez,
  },
  {
    id: "grade",
    nome: "4 · Mapa lateral",
    nota: "Um painel escuro fixo mostra as quinze respostas como quadradinhos que vão acendendo. A evolução fica visível o tempo inteiro, sem ocupar o lugar do formulário.",
    Render: Grade,
  },
  {
    id: "progressivo",
    nome: "5 · Acordeão progressivo",
    nota: "Tudo em uma tela só: a etapa aberta mostra os campos, as fechadas mostram um resumo do que já foi respondido. Ao terminar uma, um botão leva para a seguinte. Não perde o contexto em nenhum momento.",
    Render: Progressivo,
  },
];

const TestesMapeamento = () => {
  const m = useMapeamento();
  const [op, setOp] = useState(OPCOES[0].id);
  const atual = OPCOES.find((o) => o.id === op)!;

  return (
    <div className="min-h-screen bg-background text-foreground" style={PALETA}>
      {/* seletor */}
      <div className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-md">
        <div className="mx-auto max-w-5xl px-5 py-3 sm:px-6">
          <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {OPCOES.map((o) => (
              <button
                key={o.id}
                onClick={() => setOp(o.id)}
                className={`shrink-0 rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${
                  o.id === op
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border hover:bg-secondary/50"
                }`}
              >
                {o.nome}
              </button>
            ))}
          </div>
          <div className="mt-2 flex items-center gap-2">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-primary transition-all duration-300"
                style={{ width: `${(m.totalPreenchidas / TOTAL) * 100}%` }}
              />
            </div>
            <span className="shrink-0 text-xs font-bold text-primary">
              {m.totalPreenchidas}/{TOTAL}
            </span>
          </div>
        </div>
      </div>

      <header className="mx-auto max-w-5xl px-5 pt-8 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
          Teste de preenchimento
        </p>
        <h1 className="mt-2 text-2xl font-bold md:text-3xl">{atual.nome}</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {atual.nota}
        </p>
        <p className="mt-3 text-xs text-muted-foreground">
          As cinco opções dividem as mesmas respostas, salvas neste navegador.
          Escreva em uma e troque de opção para comparar a navegação com o mesmo
          conteúdo.
        </p>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-8 sm:px-6">
        <atual.Render m={m} />

        <div className="mt-12 rounded-3xl border border-primary/30 bg-secondary/40 p-6 text-center">
          <p className="text-sm text-muted-foreground">
            {m.baixado
              ? "Arquivo salvo. As respostas continuam aqui neste navegador."
              : "Salvo automaticamente enquanto você escreve."}
          </p>
          <div className="mt-4">
            <BotaoBaixar m={m} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default TestesMapeamento;
