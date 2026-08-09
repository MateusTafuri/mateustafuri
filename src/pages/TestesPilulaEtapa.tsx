import type { ReactNode } from "react";
import { ETAPAS } from "@/data/rifaSolidaria";

/* Seis efeitos de hover para a pílula de etapa do processo. Três usam o emoji
   da etapa, três são só tipografia e cor. Passe o mouse para ver. */

const CREME = "#F4F0E6";
const LIME = "#A9C46C";

const base =
  "group relative inline-flex items-center gap-2 rounded-full border px-3 py-1 font-display text-xs font-extrabold tracking-widest";

type Pilula = (e: (typeof ETAPAS)[number]) => ReactNode;

/* 1 · o emoji entra pela esquerda e empurra o texto */
const EmojiEntra: Pilula = (e) => (
  <span className={`${base} border-[#A9C46C]/40 text-[#A9C46C] transition-colors hover:border-[#A9C46C]`}>
    <span className="w-0 overflow-hidden text-sm opacity-0 transition-all duration-300 group-hover:w-4 group-hover:opacity-100">
      {e.emoji}
    </span>
    0{e.n} · {e.title.toUpperCase()}
  </span>
);

/* 2 · o número troca de lugar com o emoji, sem mexer na largura */
const NumeroVira: Pilula = (e) => (
  <span className={`${base} border-[#A9C46C]/40 text-[#A9C46C]`}>
    <span className="relative inline-block w-[1.6em] text-center">
      <span className="inline-block transition-all duration-300 group-hover:-translate-y-1 group-hover:opacity-0">
        0{e.n}
      </span>
      <span className="absolute inset-0 translate-y-1 text-sm opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        {e.emoji}
      </span>
    </span>
    <span className="opacity-40">·</span> {e.title.toUpperCase()}
  </span>
);

/* 3 · o emoji sobe como um balão acima da pílula */
const EmojiBalao: Pilula = (e) => (
  <span className={`${base} border-[#A9C46C]/40 text-[#A9C46C]`}>
    <span
      aria-hidden
      className="pointer-events-none absolute -top-5 left-3 translate-y-2 text-base opacity-0 transition-all duration-300 group-hover:-top-7 group-hover:translate-y-0 group-hover:opacity-100"
    >
      {e.emoji}
    </span>
    0{e.n} · {e.title.toUpperCase()}
  </span>
);

/* 4 · a pílula preenche de lime, da esquerda para a direita */
const Preenche: Pilula = (e) => (
  <span
    className={`${base} overflow-hidden border-[#A9C46C]/40 text-[#A9C46C] transition-colors duration-300 group-hover:text-[#16281f] hover:text-[#16281f]`}
  >
    <span
      aria-hidden
      className="absolute inset-0 origin-left scale-x-0 bg-[#A9C46C] transition-transform duration-300 group-hover:scale-x-100"
    />
    <span className="relative">
      0{e.n} · {e.title.toUpperCase()}
    </span>
  </span>
);

/* 5 · a borda acende e a pílula sobe um fio */
const BordaAcende: Pilula = (e) => (
  <span
    className={`${base} border-[#A9C46C]/30 text-[#A9C46C]/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#A9C46C] hover:text-[#A9C46C] hover:shadow-[0_6px_16px_-6px_rgba(169,196,108,0.6)]`}
  >
    0{e.n} · {e.title.toUpperCase()}
  </span>
);

/* 6 · um traço cresce por baixo, sem borda nenhuma */
const TracoCresce: Pilula = (e) => (
  <span className={`${base} border-transparent px-1 text-[#A9C46C]/70 transition-colors hover:text-[#A9C46C]`}>
    0{e.n} · {e.title.toUpperCase()}
    <span
      aria-hidden
      className="absolute -bottom-0.5 left-1 right-1 h-px origin-left scale-x-0 bg-[#A9C46C] transition-transform duration-300 group-hover:scale-x-100"
    />
  </span>
);

const VARIANTES = [
  {
    nome: "1 · Emoji entra pela esquerda",
    nota: "No repouso é só texto. No hover o emoji abre espaço e empurra o resto. Com emoji.",
    Render: EmojiEntra,
  },
  {
    nome: "2 · O número vira emoji",
    nota: "O 01 sobe e some enquanto o emoji entra por baixo, no mesmo espaço. A largura não muda. Com emoji.",
    Render: NumeroVira,
  },
  {
    nome: "3 · Emoji como balão",
    nota: "O emoji aparece flutuando acima da pílula, como um pensamento. Com emoji.",
    Render: EmojiBalao,
  },
  {
    nome: "4 · Preenchimento lime",
    nota: "A cor varre da esquerda para a direita e o texto escurece. Minimalista.",
    Render: Preenche,
  },
  {
    nome: "5 · Borda acende e sobe",
    nota: "Um fio de movimento, borda mais forte e um brilho baixo. Minimalista.",
    Render: BordaAcende,
  },
  {
    nome: "6 · Traço por baixo",
    nota: "Sem borda: só o texto e uma linha que cresce embaixo. O mais discreto de todos.",
    Render: TracoCresce,
  },
];

const TestesPilulaEtapa = () => (
  <div
    className="min-h-screen px-5 py-12 sm:px-6"
    style={{
      background: "linear-gradient(165deg, #14271e 0%, #193024 60%, #1d3a2b 100%)",
      color: CREME,
    }}
  >
    <div className="mx-auto max-w-5xl">
      <p className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: LIME }}>
        Testes
      </p>
      <h1 className="mt-2 font-display text-3xl font-bold md:text-4xl">
        Seis efeitos para a pílula de etapa
      </h1>
      <p className="mt-3 max-w-2xl leading-relaxed text-[#F4F0E6]/65">
        Passe o mouse por cima de cada uma. As três primeiras usam o emoji da etapa; as
        três últimas são só tipografia e cor.
      </p>

      <div className="mt-12 space-y-12">
        {VARIANTES.map((v) => (
          <section key={v.nome} className="border-t border-white/10 pt-8">
            <h2 className="font-display text-lg font-bold">{v.nome}</h2>
            <p className="mt-1 max-w-2xl text-sm leading-relaxed text-[#F4F0E6]/55">
              {v.nota}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {ETAPAS.map((e) => (
                <span key={e.n} className="inline-flex">
                  {v.Render(e)}
                </span>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  </div>
);

export default TestesPilulaEtapa;
