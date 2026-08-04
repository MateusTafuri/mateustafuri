import { type CSSProperties } from "react";
import { ArrowRight, Sparkles, Ticket } from "lucide-react";
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

/* gerador com semente fixa, mesmas posições em todo render */
const rng = (seed: number) => () => {
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
const pontos = (qtd: number, seed: number) => {
  const r = rng(seed);
  return Array.from({ length: qtd }, () => ({
    x: r() * 100,
    y: r() * 100,
    t: 0.6 + r() * 2.2,
    d: r() * 4,
    o: 0.25 + r() * 0.6,
  }));
};

const ESTRELAS = pontos(90, 7);
const BILHETES = pontos(18, 33);
const CADENTES = pontos(4, 91);

/* ───────── fundos ───────── */

const Estrelas = ({ qtd = ESTRELAS }: { qtd?: typeof ESTRELAS }) => (
  <>
    {qtd.map((e, i) => (
      <span
        key={i}
        className="absolute rounded-full bg-white"
        style={{
          left: `${e.x}%`,
          top: `${e.y}%`,
          width: e.t,
          height: e.t,
          opacity: e.o,
          animation: `piscar ${2.5 + e.d}s ease-in-out ${e.d}s infinite`,
        }}
      />
    ))}
  </>
);

const Nebulosa = () => (
  <div
    className="absolute inset-0 opacity-60"
    style={{
      background:
        "radial-gradient(60% 38% at 68% 18%, hsl(190 60% 55% / 0.22) 0%, transparent 60%), radial-gradient(48% 30% at 28% 32%, hsl(265 55% 60% / 0.18) 0%, transparent 65%)",
      filter: "blur(6px)",
    }}
  />
);

const FundoViaLactea = () => (
  <div className="pointer-events-none absolute inset-0">
    <Nebulosa />
    <Estrelas />
  </div>
);

const FundoGalaxia = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    {/* espiral girando bem devagar */}
    <div
      className="absolute left-1/2 top-[30%] h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-35"
      style={{
        background:
          "conic-gradient(from 0deg, transparent 0deg, hsl(190 70% 60% / 0.25) 40deg, transparent 90deg, hsl(265 60% 65% / 0.22) 140deg, transparent 200deg, hsl(15 65% 56% / 0.15) 260deg, transparent 320deg)",
        filter: "blur(30px)",
        animation: "girar 60s linear infinite",
      }}
    />
    {/* núcleo */}
    <div
      className="absolute left-1/2 top-[30%] h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40"
      style={{
        background: "radial-gradient(circle, hsl(45 80% 85% / 0.5) 0%, transparent 70%)",
        filter: "blur(18px)",
      }}
    />
    <Estrelas />
  </div>
);

const FundoBilhetes = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    <Nebulosa />
    <Estrelas qtd={ESTRELAS.slice(0, 50)} />
    {BILHETES.map((b, i) => (
      <Ticket
        key={i}
        size={22 + b.t * 12}
        className="absolute"
        style={{
          left: `${b.x}%`,
          top: `${b.y}%`,
          color: i % 4 === 0 ? CORAL : "white",
          opacity: 0.06 + b.o * 0.07,
          transform: `rotate(${(b.d - 2) * 25}deg)`,
          animation: `flutuar ${8 + b.d * 2}s ease-in-out ${b.d}s infinite`,
        }}
      />
    ))}
  </div>
);

const FundoCadentes = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    <Nebulosa />
    <Estrelas />
    {CADENTES.map((c, i) => (
      <span
        key={i}
        className="absolute h-px w-24"
        style={{
          left: `${10 + c.x * 0.7}%`,
          top: `${c.y * 0.5}%`,
          background: "linear-gradient(90deg, white, transparent)",
          transform: "rotate(-30deg)",
          opacity: 0,
          animation: `cadente 6s ease-in ${i * 2.7}s infinite`,
        }}
      />
    ))}
  </div>
);

/* ───────── título em variações ───────── */

const TituloPadrao = () => (
  <span style={{ color: CORAL }}>Rifa Solidária</span>
);

/* brilho varrendo o gradiente + hover muda a cor */
const TituloBrilho = () => (
  <span
    className="bg-clip-text text-transparent transition-all duration-500 hover:brightness-125 cursor-default"
    style={{
      backgroundImage:
        "linear-gradient(100deg, hsl(15 65% 56%) 20%, hsl(35 90% 70%) 45%, hsl(15 65% 56%) 70%)",
      backgroundSize: "200% 100%",
      animation: "varrer 3.5s ease-in-out infinite",
    }}
  >
    Rifa Solidária
  </span>
);

/* cada letra reage ao mouse */
const TituloLetras = () => (
  <span className="cursor-default">
    {"Rifa Solidária".split("").map((l, i) => (
      <span
        key={i}
        className="inline-block transition-all duration-200 hover:-translate-y-1.5 hover:scale-110"
        style={{ color: CORAL, whiteSpace: l === " " ? "pre" : undefined }}
        onMouseEnter={(ev) => {
          (ev.target as HTMLElement).style.color = "hsl(45 90% 70%)";
        }}
        onMouseLeave={(ev) => {
          (ev.target as HTMLElement).style.color = CORAL;
        }}
      >
        {l}
      </span>
    ))}
  </span>
);

/* neon pulsando */
const TituloNeon = () => (
  <span
    className="cursor-default transition-colors duration-500 hover:text-white"
    style={{
      color: CORAL,
      animation: "neon 3s ease-in-out infinite",
    }}
  >
    Rifa Solidária
  </span>
);

/* sublinhado desenhado que acende no hover */
const TituloSublinhado = () => (
  <span className="relative inline-block cursor-default group/tit" style={{ color: CORAL }}>
    Rifa Solidária
    <svg
      viewBox="0 0 300 14"
      preserveAspectRatio="none"
      className="absolute -bottom-3 left-0 w-full h-3 transition-all duration-500 group-hover/tit:scale-y-150"
    >
      <path
        d="M4 10 C 60 2, 150 12, 296 5"
        fill="none"
        stroke={CORAL}
        strokeWidth="5"
        strokeLinecap="round"
        style={{
          strokeDasharray: 300,
          strokeDashoffset: 300,
          animation: "riscar 1.4s ease-out 0.4s forwards",
        }}
      />
    </svg>
  </span>
);

/* ───────── header ───────── */

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

const Header = ({
  fundo,
  titulo,
}: {
  fundo: React.ReactNode;
  titulo: React.ReactNode;
}) => (
  <header
    className="relative overflow-hidden px-6 pt-28 pb-20 md:pt-32 md:pb-24 text-white text-center"
    style={{ backgroundImage: GRADIENTE }}
  >
    <NavFake />
    {fundo}
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
        <br />a sua causa com a {titulo}
      </h1>
      <p className="mt-6 max-w-2xl mx-auto text-white/75 text-lg leading-relaxed">
        Uma metodologia em 5 etapas para planejar, lançar e encerrar uma campanha
        de rifa na sua organização. Do primeiro objetivo até a prestação de
        contas.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-x-2 gap-y-3">
        {ETAPAS.map((e, i) => (
          <div key={e.n} className="flex items-center gap-2">
            <span className="rounded-full border border-white/20 bg-white/[0.06] px-4 py-2 text-sm font-semibold backdrop-blur-sm">
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
        <span className="inline-flex items-center justify-center border border-white/25 px-8 py-4 rounded-full text-sm font-semibold backdrop-blur-sm">
          Montar a minha rifa
        </span>
      </div>
    </div>
  </header>
);

/* ───────── página ───────── */

const OPCOES = [
  {
    nome: "Brilho varrendo",
    desc: "Um brilho dourado varre o nome sem parar. No hover, tudo fica mais claro. Fundo: Via Láctea atual.",
    fundo: <FundoViaLactea />,
    titulo: <TituloBrilho />,
  },
  {
    nome: "Letras vivas",
    desc: "Cada letra pula e muda de cor quando o mouse passa por cima. Fundo: Via Láctea atual.",
    fundo: <FundoViaLactea />,
    titulo: <TituloLetras />,
  },
  {
    nome: "Galáxia em espiral",
    desc: "Uma galáxia gira bem devagar atrás do título. Nome com neon pulsando que vira branco no hover.",
    fundo: <FundoGalaxia />,
    titulo: <TituloNeon />,
  },
  {
    nome: "Chuva de bilhetes",
    desc: "Bilhetes de rifa flutuando discretos entre as estrelas, alguns em coral. Título padrão.",
    fundo: <FundoBilhetes />,
    titulo: <TituloPadrao />,
  },
  {
    nome: "Estrelas cadentes + sublinhado",
    desc: "Estrelas cadentes cruzam o céu de tempos em tempos e um risco desenhado sublinha o nome.",
    fundo: <FundoCadentes />,
    titulo: <TituloSublinhado />,
  },
];

const TestesHero = () => (
  <main className="bg-background text-foreground" style={PALETA}>
    <style>{`
      @keyframes varrer { 0%,100% { background-position: 0% 0; } 50% { background-position: 100% 0; } }
      @keyframes girar { to { transform: translate(-50%, -50%) rotate(360deg); } }
      @keyframes neon {
        0%, 100% { text-shadow: 0 0 8px hsl(15 65% 56% / .5), 0 0 24px hsl(15 65% 56% / .25); }
        50% { text-shadow: 0 0 16px hsl(15 65% 56% / .9), 0 0 48px hsl(15 65% 56% / .45); }
      }
      @keyframes riscar { to { stroke-dashoffset: 0; } }
      @keyframes flutuar { 0%,100% { translate: 0 0; } 50% { translate: 0 -14px; } }
      @keyframes cadente {
        0% { opacity: 0; transform: rotate(-30deg) translateX(0); }
        5% { opacity: .9; }
        18% { opacity: 0; transform: rotate(-30deg) translateX(260px); }
        100% { opacity: 0; transform: rotate(-30deg) translateX(260px); }
      }
      @media (prefers-reduced-motion: reduce) {
        [style*="animation"] { animation: none !important; }
      }
    `}</style>

    <div className="max-w-4xl mx-auto px-6 pt-16 pb-4 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-2" style={{ color: CORAL }}>
        Modo teste
      </p>
      <h1 className="text-3xl md:text-4xl font-bold">5 versões do header</h1>
      <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
        Mesma estrutura, variando o efeito no nome Rifa Solidária e os elementos
        do fundo. Passe o mouse sobre o nome em cada uma.
      </p>
    </div>

    {OPCOES.map((o, i) => (
      <section key={o.nome} className="border-b border-border">
        <div className="max-w-5xl mx-auto px-6 pt-14 pb-6">
          <div className="flex items-start gap-3">
            <span
              className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-bold text-white"
              style={{ backgroundColor: CORAL }}
            >
              {i + 1}
            </span>
            <div>
              <h2 className="text-xl font-bold">{o.nome}</h2>
              <p className="text-sm text-muted-foreground mt-0.5">{o.desc}</p>
            </div>
          </div>
        </div>
        <Header fundo={o.fundo} titulo={o.titulo} />
      </section>
    ))}

    <div className="py-14 text-center text-sm text-muted-foreground">
      Fim das opções. Me diga o número, ou combine título de uma com fundo de outra.
    </div>
  </main>
);

export default TestesHero;
