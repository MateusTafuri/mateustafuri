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

/* Gerador estável, para as estrelas não mudarem a cada render */
const rng = (seed: number) => () => {
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const estrelas = (qtd: number, seed: number) => {
  const r = rng(seed);
  return Array.from({ length: qtd }, () => ({
    x: r() * 100,
    y: r() * 100,
    t: 0.6 + r() * 2.2,
    d: r() * 4,
    o: 0.25 + r() * 0.6,
  }));
};

const ESTRELAS = estrelas(90, 7);
const ESTRELAS_CONST = estrelas(26, 21);
const BILHETES = estrelas(16, 33);
const MOEDAS = estrelas(14, 55);

/* ─────────── O HEADER (estrutura fixa) ─────────── */

const Conteudo = () => (
  <div className="relative z-10 max-w-4xl mx-auto">
    <span
      className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em]"
      style={{ backgroundColor: "hsl(15 65% 56% / 0.15)", color: CORAL }}
    >
      <Sparkles size={13} /> Metodologia aberta e gratuita
    </span>
    <h1 className="mt-6 text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight">
      Como captar recursos para
      <br />
      a sua causa com a <span style={{ color: CORAL }}>Rifa Solidária</span>
    </h1>
    <p className="mt-6 max-w-2xl mx-auto text-white/75 text-lg leading-relaxed">
      Uma metodologia em 5 etapas para planejar, lançar e encerrar uma campanha
      de rifa na sua organização. Do primeiro objetivo até a prestação de contas.
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
);

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

const Header = ({ children }: { children?: React.ReactNode }) => (
  <header
    className="relative overflow-hidden px-6 pt-28 pb-20 md:pt-32 md:pb-24 text-white text-center"
    style={{ backgroundImage: GRADIENTE }}
  >
    <NavFake />
    {children}
    {/* brilho coral que já existia */}
    <div
      className="pointer-events-none absolute -top-24 left-1/2 h-80 w-[36rem] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
      style={{ background: `radial-gradient(circle, ${CORAL} 0%, transparent 70%)` }}
    />
    <Conteudo />
  </header>
);

/* ─────────── 1 · VIA LÁCTEA ─────────── */

const FundoViaLactea = () => (
  <div className="pointer-events-none absolute inset-0">
    {/* faixa da via láctea */}
    <div
      className="absolute inset-0 opacity-60"
      style={{
        background:
          "radial-gradient(60% 38% at 68% 18%, hsl(190 60% 55% / 0.22) 0%, transparent 60%), radial-gradient(48% 30% at 28% 32%, hsl(265 55% 60% / 0.18) 0%, transparent 65%)",
        filter: "blur(6px)",
      }}
    />
    {ESTRELAS.map((e, i) => (
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
  </div>
);

/* ─────────── 2 · CONSTELAÇÃO QUE CONECTA ─────────── */

const FundoConstelacao = () => (
  <div className="pointer-events-none absolute inset-0">
    <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
      {ESTRELAS_CONST.map((a, i) =>
        ESTRELAS_CONST.slice(i + 1).map((b, j) => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist > 18) return null;
          return (
            <line
              key={`${i}-${j}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke="white"
              strokeWidth={0.08}
              opacity={0.22}
            />
          );
        })
      )}
      {ESTRELAS_CONST.map((e, i) => (
        <circle key={i} cx={e.x} cy={e.y} r={0.45} fill={i % 5 === 0 ? CORAL : "white"} opacity={0.75} />
      ))}
    </svg>
  </div>
);

/* ─────────── 3 · BILHETES FLUTUANTES ─────────── */

const FundoBilhetes = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    {BILHETES.map((b, i) => (
      <Ticket
        key={i}
        size={26 + b.t * 14}
        className="absolute text-white"
        style={{
          left: `${b.x}%`,
          top: `${b.y}%`,
          opacity: 0.07 + b.o * 0.08,
          transform: `rotate(${(b.d - 2) * 22}deg)`,
          animation: `flutuar ${7 + b.d * 2}s ease-in-out ${b.d}s infinite`,
        }}
      />
    ))}
  </div>
);

/* ─────────── 4 · MOEDAS E ONDAS ─────────── */

const FundoMoedas = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    {/* ondas concêntricas, ideia de alcance */}
    <svg className="absolute left-1/2 top-1/2 h-[130%] w-[130%] -translate-x-1/2 -translate-y-1/2 opacity-[0.13]">
      {[10, 20, 30, 40, 50].map((r) => (
        <circle
          key={r}
          cx="50%"
          cy="50%"
          r={`${r}%`}
          fill="none"
          stroke="white"
          strokeWidth="1"
          strokeDasharray="4 6"
        />
      ))}
    </svg>
    {MOEDAS.map((m, i) => (
      <span
        key={i}
        className="absolute rounded-full border"
        style={{
          left: `${m.x}%`,
          top: `${m.y}%`,
          width: 14 + m.t * 10,
          height: 14 + m.t * 10,
          borderColor: i % 3 === 0 ? CORAL : "white",
          opacity: 0.16 + m.o * 0.1,
          animation: `flutuar ${8 + m.d * 2}s ease-in-out ${m.d}s infinite`,
        }}
      />
    ))}
  </div>
);

/* ─────────── 5 · TOPOGRAFIA COM ESTRELAS ─────────── */

const FundoTopografia = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    <svg className="absolute inset-0 h-full w-full opacity-[0.16]" preserveAspectRatio="none" viewBox="0 0 400 200">
      {Array.from({ length: 9 }, (_, i) => (
        <path
          key={i}
          d={`M0,${40 + i * 18} C60,${20 + i * 18} 120,${62 + i * 18} 200,${40 + i * 18} S340,${18 + i * 18} 400,${44 + i * 18}`}
          fill="none"
          stroke={i % 4 === 0 ? CORAL : "white"}
          strokeWidth="0.8"
        />
      ))}
    </svg>
    {ESTRELAS.slice(0, 40).map((e, i) => (
      <span
        key={i}
        className="absolute rounded-full bg-white"
        style={{
          left: `${e.x}%`,
          top: `${e.y * 0.6}%`,
          width: e.t,
          height: e.t,
          opacity: e.o * 0.8,
          animation: `piscar ${3 + e.d}s ease-in-out ${e.d}s infinite`,
        }}
      />
    ))}
  </div>
);

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
  <section className="border-b border-border">
    <div className="max-w-5xl mx-auto px-6 pt-14 pb-6">
      <div className="flex items-start gap-3">
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
    </div>
    {children}
  </section>
);

const TestesFundo = () => (
  <main className="bg-background text-foreground" style={PALETA}>
    <style>{`
      @keyframes piscar {
        0%, 100% { opacity: .15; }
        50% { opacity: .9; }
      }
      @keyframes flutuar {
        0%, 100% { transform: translateY(0) rotate(var(--rot, 0deg)); }
        50% { transform: translateY(-14px) rotate(var(--rot, 0deg)); }
      }
      @media (prefers-reduced-motion: reduce) {
        [style*="animation"] { animation: none !important; }
      }
    `}</style>

    <div className="max-w-4xl mx-auto px-6 pt-16 pb-4 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-2" style={{ color: CORAL }}>
        Modo teste
      </p>
      <h1 className="text-3xl md:text-4xl font-bold">5 fundos para o header</h1>
      <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
        A estrutura do header é exatamente a mesma. Só muda o que acontece atrás.
      </p>
    </div>

    <Bloco num={1} nome="Via Láctea" desc="Céu estrelado com nebulosa azul e roxa. Lembra a noite das comunidades isoladas.">
      <Header>
        <FundoViaLactea />
      </Header>
    </Bloco>

    <Bloco num={2} nome="Constelação que conecta" desc="Pontos ligados por linhas: a ideia de pessoas se conectando em rede.">
      <Header>
        <FundoConstelacao />
      </Header>
    </Bloco>

    <Bloco num={3} nome="Bilhetes flutuantes" desc="Ícones de bilhete de rifa boiando bem discretos ao fundo.">
      <Header>
        <FundoBilhetes />
      </Header>
    </Bloco>

    <Bloco num={4} nome="Moedas e ondas de alcance" desc="Círculos de moeda flutuando sobre ondas concêntricas que se espalham.">
      <Header>
        <FundoMoedas />
      </Header>
    </Bloco>

    <Bloco num={5} nome="Topografia com estrelas" desc="Curvas de nível como um mapa, com um céu estrelado por cima.">
      <Header>
        <FundoTopografia />
      </Header>
    </Bloco>

    <div className="py-14 text-center text-sm text-muted-foreground">
      Fim das opções. Me diga o número que prefere.
    </div>
  </main>
);

export default TestesFundo;
