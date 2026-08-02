import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Gift,
  HandHeart,
  Megaphone,
  Target,
  TrendingUp,
} from "lucide-react";

/* ─────────── DADOS COMPARTILHADOS ─────────── */

const ETAPAS = [
  {
    n: 1,
    title: "Sonhar",
    icon: Target,
    chamada: "Antes de pensar em prêmio, defina onde você quer chegar.",
    precisa: "Uma causa que as pessoas queiram apoiar",
    aprender: [
      "Como definir um objetivo claro",
      "Como desenhar a transformação visível",
      "Como chegar a uma meta realista",
    ],
  },
  {
    n: 2,
    title: "Ofertar",
    icon: Gift,
    chamada: "O prêmio certo faz a pessoa querer participar.",
    precisa: "Uma oferta que faça a pessoa querer participar",
    aprender: [
      "Como escolher a rota do prêmio",
      "Como mapear parceiros estratégicos",
      "Como estruturar a troca de valor",
    ],
  },
  {
    n: 3,
    title: "Contar",
    icon: Megaphone,
    chamada: "Uma causa boa que ninguém conhece não arrecada.",
    precisa: "Alcançar mais pessoas do que o seu círculo",
    aprender: [
      "Como encontrar a história da campanha",
      "Como roteirizar o vídeo de lançamento",
      "Como montar o calendário de conteúdo",
    ],
  },
  {
    n: 4,
    title: "Escalar",
    icon: TrendingUp,
    chamada: "Aqui a campanha chega no Brasil inteiro.",
    precisa: "Ganhar escala de verdade",
    aprender: [
      "Como montar a página de vendas",
      "Como ativar a divulgação orgânica",
      "Como rodar tráfego pago com método",
    ],
  },
  {
    n: 5,
    title: "Retribuir",
    icon: HandHeart,
    chamada: "É o que faz o apoiador de hoje voltar amanhã.",
    precisa: "Retribuir a quem confiou na campanha",
    aprender: [
      "Como conduzir o sorteio ao vivo",
      "Como documentar a entrega do prêmio",
      "Como prestar contas do resultado",
    ],
  },
];

const LIME = "hsl(103 66% 80%)";
const OLIVE = "hsl(80 15% 28%)";
const DARK = "hsl(80 15% 16%)";

/* ─────────── WRAPPER DE CADA OPÇÃO ─────────── */

const Opcao = ({
  num,
  nome,
  desc,
  dark,
  children,
}: {
  num: number;
  nome: string;
  desc: string;
  dark?: boolean;
  children: React.ReactNode;
}) => (
  <section
    className={dark ? "text-white" : "text-foreground"}
    style={dark ? { backgroundColor: DARK } : undefined}
  >
    <div className="max-w-5xl mx-auto px-6 py-16 md:py-20">
      <div className="flex items-start gap-3 mb-10">
        <span
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-bold"
          style={{ backgroundColor: LIME, color: OLIVE }}
        >
          {num}
        </span>
        <div>
          <h2 className="text-xl font-bold">{nome}</h2>
          <p className={`text-sm mt-0.5 ${dark ? "text-white/60" : "text-muted-foreground"}`}>
            {desc}
          </p>
        </div>
      </div>
      {children}
    </div>
  </section>
);

/* ─────────── OPÇÃO 1 · TRILHA VERTICAL ─────────── */

const TrilhaVertical = () => {
  const [ativa, setAtiva] = useState(0);

  return (
    <div className="relative pl-8 md:pl-0">
      {/* linha da trilha */}
      <div
        className="absolute left-[15px] md:left-1/2 top-2 bottom-2 w-0.5 md:-translate-x-1/2"
        style={{
          backgroundImage: `linear-gradient(to bottom, ${LIME}, ${OLIVE})`,
        }}
      />
      <div className="space-y-6">
        {ETAPAS.map((e, i) => {
          const on = i === ativa;
          const esquerda = i % 2 === 0;
          return (
            <div
              key={e.n}
              className={`relative md:grid md:grid-cols-2 md:gap-10 ${
                esquerda ? "" : "md:[&>button]:col-start-2"
              }`}
            >
              {/* marcador */}
              <span
                className="absolute left-[-32px] md:left-1/2 top-6 z-10 grid h-8 w-8 -translate-x-1/2 place-items-center rounded-full border-4 border-background text-xs font-bold transition-all"
                style={{
                  backgroundColor: on ? OLIVE : LIME,
                  color: on ? "white" : OLIVE,
                  boxShadow: on ? `0 0 0 6px hsl(103 66% 80% / 0.35)` : undefined,
                }}
              >
                {e.n}
              </span>

              <button
                onClick={() => setAtiva(i)}
                className={`w-full text-left rounded-2xl border p-5 transition-all ${
                  on
                    ? "border-primary/40 bg-secondary/60 shadow-sm"
                    : "border-border bg-background hover:border-primary/25"
                }`}
              >
                <div className="flex items-center gap-2">
                  <e.icon size={18} className="text-primary" />
                  <h3 className="font-bold">{e.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground mt-1.5">{e.chamada}</p>
                {on && (
                  <div className="mt-4 pt-4 border-t border-border animate-fade-in">
                    <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">
                      Você vai aprender
                    </p>
                    <ul className="space-y-1.5">
                      {e.aprender.map((a) => (
                        <li key={a} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-primary" />
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ─────────── OPÇÃO 2 · ESCADA ASCENDENTE ─────────── */

const EscadaAscendente = () => {
  const [ativa, setAtiva] = useState(0);
  const etapa = ETAPAS[ativa];

  return (
    <div>
      <div className="flex items-end gap-2 md:gap-4 h-56">
        {ETAPAS.map((e, i) => {
          const on = i === ativa;
          const altura = 40 + i * 15;
          return (
            <button
              key={e.n}
              onClick={() => setAtiva(i)}
              className="flex-1 flex flex-col justify-end group"
              style={{ height: "100%" }}
            >
              <span
                className={`text-xs font-bold mb-2 transition-colors ${
                  on ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {e.title}
              </span>
              <div
                className="rounded-t-2xl transition-all duration-300 flex items-start justify-center pt-3"
                style={{
                  height: `${altura}%`,
                  backgroundImage: on
                    ? `linear-gradient(to top, ${OLIVE}, hsl(80 17% 40%))`
                    : `linear-gradient(to top, ${LIME}, hsl(103 60% 88%))`,
                }}
              >
                <span
                  className="grid h-7 w-7 place-items-center rounded-full text-xs font-bold"
                  style={{
                    backgroundColor: on ? LIME : "white",
                    color: OLIVE,
                  }}
                >
                  {e.n}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <div key={etapa.n} className="mt-6 rounded-2xl border border-border bg-secondary/40 p-6 animate-fade-in">
        <div className="flex items-center gap-2 mb-1">
          <etapa.icon size={20} className="text-primary" />
          <h3 className="text-lg font-bold">
            Etapa {etapa.n}: {etapa.title}
          </h3>
        </div>
        <p className="text-muted-foreground mb-4">{etapa.chamada}</p>
        <div className="grid sm:grid-cols-3 gap-3">
          {etapa.aprender.map((a) => (
            <div key={a} className="rounded-xl bg-background border border-border p-3 text-sm">
              {a}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ─────────── OPÇÃO 3 · RODA DO CICLO (SVG) ─────────── */

const RodaCiclo = () => {
  const [ativa, setAtiva] = useState(0);
  const etapa = ETAPAS[ativa];
  const R = 80;
  const C = 2 * Math.PI * R;
  const seg = C / 5;

  return (
    <div className="grid md:grid-cols-[260px_1fr] gap-10 items-center">
      <div className="relative mx-auto">
        <svg viewBox="0 0 200 200" className="w-[240px] h-[240px]">
          {ETAPAS.map((e, i) => {
            const on = i === ativa;
            return (
              <circle
                key={e.n}
                cx="100"
                cy="100"
                r={R}
                fill="none"
                strokeWidth={on ? 30 : 22}
                stroke={on ? OLIVE : LIME}
                strokeDasharray={`${seg - 8} ${C - seg + 8}`}
                strokeDashoffset={-(i * seg)}
                transform="rotate(-90 100 100)"
                className="cursor-pointer transition-all"
                onClick={() => setAtiva(i)}
              />
            );
          })}
          <circle cx="100" cy="100" r="56" fill="white" />
          <text x="100" y="94" textAnchor="middle" className="fill-current text-primary" style={{ fontSize: 30, fontWeight: 700 }}>
            0{etapa.n}
          </text>
          <text x="100" y="118" textAnchor="middle" style={{ fontSize: 15, fontWeight: 600, fill: OLIVE }}>
            {etapa.title}
          </text>
        </svg>
        <div className="flex flex-wrap justify-center gap-1.5 mt-4">
          {ETAPAS.map((e, i) => (
            <button
              key={e.n}
              onClick={() => setAtiva(i)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                i === ativa
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground/60 hover:text-foreground"
              }`}
            >
              {e.title}
            </button>
          ))}
        </div>
      </div>

      <div key={etapa.n} className="animate-fade-in">
        <div className="flex items-center gap-2 mb-2">
          <etapa.icon size={22} className="text-primary" />
          <h3 className="text-2xl font-bold">{etapa.title}</h3>
        </div>
        <p className="text-muted-foreground mb-5">{etapa.chamada}</p>
        <div className="rounded-2xl p-5 text-white" style={{ backgroundColor: DARK }}>
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: LIME }}>
            O que você vai aprender
          </p>
          <ul className="space-y-2">
            {etapa.aprender.map((a) => (
              <li key={a} className="flex items-start gap-2 text-sm text-white/90">
                <ArrowRight size={15} className="mt-0.5 shrink-0" style={{ color: LIME }} />
                {a}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

/* ─────────── OPÇÃO 4 · NÚMEROS GIGANTES + ACORDEÃO ─────────── */

const NumerosGigantes = () => {
  const [ativa, setAtiva] = useState(0);

  return (
    <div>
      {/* barra de progresso */}
      <div className="flex items-center gap-3 mb-8">
        <div className="h-1.5 flex-1 rounded-full bg-white/15 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${((ativa + 1) / 5) * 100}%`, backgroundColor: LIME }}
          />
        </div>
        <span className="text-sm font-bold" style={{ color: LIME }}>
          {ativa + 1}/5
        </span>
      </div>

      <div className="divide-y divide-white/10 border-y border-white/10">
        {ETAPAS.map((e, i) => {
          const on = i === ativa;
          return (
            <button
              key={e.n}
              onClick={() => setAtiva(i)}
              className="w-full text-left py-6 flex items-start gap-5 md:gap-8 group"
            >
              <span
                className="shrink-0 leading-none transition-all"
                style={{
                  fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                  fontWeight: 800,
                  color: on ? LIME : "transparent",
                  WebkitTextStroke: on ? "0" : `1.5px hsl(103 66% 80% / 0.45)`,
                }}
              >
                0{e.n}
              </span>
              <div className="flex-1 pt-1">
                <div className="flex items-center gap-2">
                  <e.icon size={18} style={{ color: on ? LIME : "rgba(255,255,255,.5)" }} />
                  <h3 className={`text-xl font-bold ${on ? "text-white" : "text-white/60"}`}>
                    {e.title}
                  </h3>
                </div>
                <p className={`mt-1 text-sm ${on ? "text-white/75" : "text-white/40"}`}>
                  {e.chamada}
                </p>
                {on && (
                  <div className="mt-4 grid sm:grid-cols-3 gap-2 animate-fade-in">
                    {e.aprender.map((a) => (
                      <div
                        key={a}
                        className="rounded-xl border border-white/15 bg-white/[0.05] p-3 text-sm text-white/85"
                      >
                        {a}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

/* ─────────── OPÇÃO 5 · MAPA DA JORNADA (SVG) ─────────── */

const MapaJornada = () => {
  const [ativa, setAtiva] = useState(0);
  const etapa = ETAPAS[ativa];
  const pinos = [
    { x: 6, y: 62 },
    { x: 28, y: 30 },
    { x: 50, y: 58 },
    { x: 72, y: 24 },
    { x: 93, y: 50 },
  ];

  return (
    <div>
      <div className="relative rounded-3xl border border-border bg-secondary/30 px-4 pt-6 pb-10 overflow-hidden">
        {/* grade de fundo */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.15]" aria-hidden>
          <defs>
            <pattern id="grade" width="28" height="28" patternUnits="userSpaceOnUse">
              <path d="M28 0H0V28" fill="none" stroke={OLIVE} strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grade)" />
        </svg>

        {/* caminho */}
        <svg viewBox="0 0 100 80" preserveAspectRatio="none" className="relative w-full h-44">
          <path
            d="M6,62 C16,62 20,30 28,30 S42,58 50,58 S64,24 72,24 S86,50 93,50"
            fill="none"
            stroke={OLIVE}
            strokeWidth="1.2"
            strokeDasharray="3 2.5"
            strokeLinecap="round"
            opacity="0.5"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* pinos */}
        {pinos.map((p, i) => {
          const e = ETAPAS[i];
          const on = i === ativa;
          return (
            <button
              key={e.n}
              onClick={() => setAtiva(i)}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5 transition-transform hover:scale-105"
              style={{ left: `${p.x}%`, top: `${24 + p.y * 0.72}%` }}
            >
              <span
                className="grid h-11 w-11 place-items-center rounded-full border-4 border-background text-sm font-bold transition-all"
                style={{
                  backgroundColor: on ? OLIVE : LIME,
                  color: on ? "white" : OLIVE,
                  boxShadow: on ? `0 0 0 7px hsl(103 66% 80% / 0.4)` : "0 2px 8px rgba(0,0,0,.12)",
                }}
              >
                {e.n}
              </span>
              <span
                className={`text-xs font-semibold whitespace-nowrap ${
                  on ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {e.title}
              </span>
            </button>
          );
        })}
      </div>

      <div key={etapa.n} className="mt-6 grid md:grid-cols-[1fr_1.2fr] gap-4 animate-fade-in">
        <div className="rounded-2xl border border-border p-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
            O que é necessário
          </p>
          <p className="font-bold leading-snug">{etapa.precisa}</p>
          <p className="text-sm text-muted-foreground mt-3">{etapa.chamada}</p>
        </div>
        <div className="rounded-2xl p-5 text-white" style={{ backgroundColor: DARK }}>
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: LIME }}>
            O que você vai aprender
          </p>
          <ul className="space-y-2">
            {etapa.aprender.map((a) => (
              <li key={a} className="flex items-start gap-2 text-sm text-white/90">
                <ArrowRight size={15} className="mt-0.5 shrink-0" style={{ color: LIME }} />
                {a}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

/* ─────────── PÁGINA ─────────── */

const TestesMetodo = () => (
  <main className="bg-background">
    <div className="max-w-5xl mx-auto px-6 pt-16 pb-4 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary mb-2">
        Modo teste
      </p>
      <h1 className="text-3xl md:text-4xl font-bold">
        5 layouts para o método passo a passo
      </h1>
      <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
        Todas as opções são clicáveis e usam o mesmo conteúdo das 5 etapas.
        Role para comparar e me diga qual número prefere.
      </p>
    </div>

    <Opcao
      num={1}
      nome="Trilha vertical"
      desc="Caminho com linha em degradê e marcadores numerados. Cada etapa expande ao clicar."
    >
      <TrilhaVertical />
    </Opcao>

    <div className="bg-secondary/30">
      <Opcao
        num={2}
        nome="Escada ascendente"
        desc="Barras que crescem etapa a etapa, com a ideia de progresso. Clique numa barra para ver o conteúdo."
      >
        <EscadaAscendente />
      </Opcao>
    </div>

    <Opcao
      num={3}
      nome="Roda do ciclo"
      desc="Anel em SVG com 5 segmentos clicáveis. Reforça que o método é um ciclo que recomeça."
    >
      <RodaCiclo />
    </Opcao>

    <Opcao
      num={4}
      nome="Números gigantes"
      desc="Tipografia grande em contorno, barra de progresso e acordeão. Fundo escuro, bem editorial."
      dark
    >
      <NumerosGigantes />
    </Opcao>

    <Opcao
      num={5}
      nome="Mapa da jornada"
      desc="Caminho pontilhado com pinos sobre uma grade, como um mapa de expedição."
    >
      <MapaJornada />
    </Opcao>

    <div className="py-14 text-center text-sm text-muted-foreground">
      Fim das opções. Me diga o número que você prefere, ou combine ideias de duas.
    </div>
  </main>
);

export default TestesMetodo;
