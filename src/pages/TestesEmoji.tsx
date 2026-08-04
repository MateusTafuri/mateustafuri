import { type CSSProperties } from "react";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import { ETAPAS } from "@/data/rifaSolidaria";

const CORAL = "hsl(15 65% 56%)";
const GRADIENTE =
  "linear-gradient(150deg, hsl(176 44% 13%) 0%, hsl(178 40% 19%) 55%, hsl(181 38% 27%) 100%)";

const PALETA = {
  "--primary": "15 65% 56%",
  "--primary-foreground": "0 0% 100%",
  "--secondary": "42 37% 88%",
  "--secondary-foreground": "178 36% 22%",
  "--border": "42 22% 84%",
} as CSSProperties;

/* três conjuntos de emoji para as mesmas 5 etapas */
const CONJUNTOS = [
  {
    nome: "Jornada",
    desc: "Do sonho ao abraço final. O mais emocional dos três.",
    emojis: ["💭", "🎁", "📣", "🚀", "🤝"],
  },
  {
    nome: "Rifa",
    desc: "Fala a língua da campanha: bilhete, sorteio, alcance.",
    emojis: ["🎯", "🎟️", "🎬", "📈", "🏆"],
  },
  {
    nome: "Causa",
    desc: "Puxa para o campo social: semente, mãos, comunidade.",
    emojis: ["🌱", "🤲", "📖", "🌎", "💚"],
  },
];

const NavFake = () => (
  <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-5 text-sm text-white/85">
    <span className="font-bold">Mateus Tafuri</span>
    <div className="hidden md:flex items-center gap-6">
      <span>Campanhas</span>
      <span>Rifa Solidária</span>
      <span>Trajetória</span>
      <span>Depoimentos</span>
    </div>
    <span className="rounded-full border border-white/25 px-4 py-2 text-xs font-semibold">
      Entrar em contato
    </span>
  </div>
);

/* header com a trilha usando emoji */
const Header = ({ emojis }: { emojis: string[] }) => (
  <header
    className="relative overflow-hidden px-6 pt-28 pb-20 md:pt-32 md:pb-24 text-white text-center"
    style={{ backgroundImage: GRADIENTE }}
  >
    <NavFake />
    <div
      className="pointer-events-none absolute -top-24 left-1/2 h-80 w-[36rem] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
      style={{ background: `radial-gradient(circle, ${CORAL} 0%, transparent 70%)` }}
    />
    <div className="relative z-10 max-w-4xl mx-auto">
      <span
        className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em]"
        style={{ backgroundColor: "hsl(15 65% 56% / 0.15)", color: CORAL }}
      >
        <Sparkles size={13} /> Metodologia aberta e gratuita
      </span>
      <h1 className="mt-6 text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight">
        Como captar recursos para
        <br />a sua causa com a{" "}
        <span
          className="bg-clip-text text-transparent"
          style={{
            backgroundImage:
              "linear-gradient(100deg, hsl(15 65% 56%) 20%, hsl(35 90% 70%) 45%, hsl(15 65% 56%) 70%)",
            backgroundSize: "200% 100%",
            animation: "varrer 3.5s ease-in-out infinite",
          }}
        >
          Rifa Solidária
        </span>
      </h1>
      <p className="mt-6 max-w-2xl mx-auto text-white/75 text-lg leading-relaxed">
        Um caminho em 5 etapas para planejar, lançar e encerrar uma campanha de
        rifa na sua organização. Do primeiro objetivo até a prestação de contas.
      </p>

      {/* trilha com emoji */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-x-2 gap-y-3">
        {ETAPAS.map((e, i) => (
          <div key={e.n} className="flex items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-4 py-2 text-sm font-semibold">
              <span className="text-base leading-none">{emojis[i]}</span>
              {e.title}
            </span>
            {i < ETAPAS.length - 1 && <ArrowRight size={14} className="text-white/30" />}
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
        <span
          className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-bold text-white"
          style={{ backgroundColor: CORAL }}
        >
          Ver as 5 etapas <ArrowRight size={16} />
        </span>
        <span className="inline-flex items-center justify-center border border-white/25 px-8 py-4 rounded-full text-sm font-semibold">
          Montar a minha rifa
        </span>
      </div>
    </div>
  </header>
);

/* acordeão com o mesmo emoji, para ver a coerência */
const Acordeao = ({ emojis }: { emojis: string[] }) => (
  <div className="max-w-3xl mx-auto rounded-2xl border border-border divide-y divide-border overflow-hidden">
    {ETAPAS.map((e, i) => (
      <div key={e.n} className="flex items-center gap-4 px-5 py-4">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-secondary text-lg">
          {emojis[i]}
        </span>
        <span className="flex-1 min-w-0">
          <span className="font-bold block">
            {e.n}. {e.title}
          </span>
          <span className="text-sm text-muted-foreground">{e.pergunta}</span>
        </span>
        <ChevronDown size={18} className="shrink-0 text-muted-foreground" />
      </div>
    ))}
  </div>
);

const TestesEmoji = () => (
  <main className="bg-background text-foreground" style={PALETA}>
    <style>{`
      @keyframes varrer { 0%,100% { background-position: 0% 0; } 50% { background-position: 100% 0; } }
    `}</style>

    <div className="max-w-4xl mx-auto px-6 pt-16 pb-4 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-2" style={{ color: CORAL }}>
        Modo teste
      </p>
      <h1 className="text-3xl md:text-4xl font-bold">Emoji em cada etapa</h1>
      <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
        Três conjuntos para as mesmas cinco etapas. Cada bloco mostra o emoji na
        trilha do header e também no acordeão, para ver se combina nos dois.
      </p>
    </div>

    {CONJUNTOS.map((c, i) => (
      <section key={c.nome} className="border-b border-border">
        <div className="max-w-5xl mx-auto px-6 pt-14 pb-6">
          <div className="flex items-start gap-3">
            <span
              className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-bold text-white"
              style={{ backgroundColor: CORAL }}
            >
              {i + 1}
            </span>
            <div>
              <h2 className="text-xl font-bold">
                {c.nome} <span className="font-normal">{c.emojis.join(" ")}</span>
              </h2>
              <p className="text-sm text-muted-foreground mt-0.5">{c.desc}</p>
            </div>
          </div>
        </div>
        <Header emojis={c.emojis} />
        <div className="max-w-5xl mx-auto px-6 py-10">
          <Acordeao emojis={c.emojis} />
        </div>
      </section>
    ))}

    <div className="py-14 text-center text-sm text-muted-foreground">
      Fim das opções. Me diga o número, ou troque emojis soltos de um conjunto.
    </div>
  </main>
);

export default TestesEmoji;
