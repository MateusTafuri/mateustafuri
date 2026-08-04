import { type CSSProperties, type ReactNode } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { ETAPAS } from "@/data/rifaSolidaria";

/* Fundo escolhido: petróleo com brasa. O degradê é 3x maior que a tela e a
   animação passeia a background-position de um lado ao outro (receita do
   arrecade.social). Aqui a página serve para escolher como destacar o
   "Rifa Solidária" dentro do título. */

const CORAL = "hsl(15 65% 56%)";
const BRASA =
  "linear-gradient(120deg, hsl(176 44% 12%), hsl(178 40% 18%), hsl(184 36% 30%) 40%, hsl(15 45% 32%) 58%, hsl(178 40% 20%) 80%, hsl(176 44% 12%))";

const PALETA = {
  "--primary": "15 65% 56%",
  "--primary-foreground": "0 0% 100%",
  "--secondary": "42 37% 88%",
  "--secondary-foreground": "178 36% 22%",
  "--border": "42 22% 84%",
} as CSSProperties;

const CSS = `
@keyframes aurora {
  0%, 100% { background-position: 0% 50%; }
  50%      { background-position: 100% 50%; }
}
@keyframes confete {
  0%   { transform: translateY(-18px) rotate(0deg); opacity: 0; }
  12%  { opacity: 1; }
  100% { transform: translateY(78px) rotate(340deg); opacity: 0; }
}
@keyframes faisca {
  0%   { transform: translate(0, 0) scale(0); opacity: 0; }
  12%  { transform: translate(0, 0) scale(1); opacity: 1; }
  100% { transform: translate(var(--dx), var(--dy)) scale(0.15); opacity: 0; }
}
@keyframes reluz {
  0%        { transform: translateX(-140%); }
  45%, 100% { transform: translateX(240%); }
}
@keyframes sublinha {
  0%       { transform: scaleX(0); opacity: 1; }
  45%      { transform: scaleX(1); opacity: 1; }
  88%      { transform: scaleX(1); opacity: 1; }
  100%     { transform: scaleX(1); opacity: 0; }
}
@keyframes halo {
  0%, 100% { opacity: 0.3; transform: scale(0.92); }
  50%      { opacity: 0.65; transform: scale(1.1); }
}
.aurora { background-size: 300% 300%; animation: aurora 22s ease-in-out infinite; }
@media (prefers-reduced-motion: reduce) {
  .aurora, .confete, .faisca, .reluz, .sublinha, .halo { animation: none !important; }
}
`;

/* Texto em degradê varrido: é o destaque que a página já usa hoje */
const textoVarrido: CSSProperties = {
  backgroundImage:
    "linear-gradient(100deg, hsl(15 65% 56%) 20%, hsl(35 90% 70%) 45%, hsl(15 65% 56%) 70%)",
  backgroundSize: "200% 100%",
  animation: "varrer 3.5s ease-in-out infinite",
};

const Varrido = ({ children }: { children: ReactNode }) => (
  <span className="bg-clip-text text-transparent" style={textoVarrido}>
    {children}
  </span>
);

/* 1 · confete: papelotes caindo por trás das palavras */
const CONFETES = [
  { x: 4, cor: CORAL, d: 0, t: 4.2, w: 5, h: 9 },
  { x: 17, cor: "hsl(35 90% 65%)", d: 1.4, t: 5, w: 4, h: 7 },
  { x: 29, cor: "hsl(168 55% 60%)", d: 2.6, t: 4.6, w: 6, h: 6 },
  { x: 41, cor: "#ffffff", d: 0.7, t: 5.4, w: 3, h: 8 },
  { x: 53, cor: CORAL, d: 3.1, t: 4.4, w: 5, h: 5 },
  { x: 66, cor: "hsl(35 90% 65%)", d: 2, t: 5.2, w: 4, h: 9 },
  { x: 78, cor: "hsl(168 55% 60%)", d: 0.3, t: 4.8, w: 5, h: 6 },
  { x: 91, cor: "#ffffff", d: 3.6, t: 5.6, w: 4, h: 7 },
];

const Confete = ({ children }: { children: ReactNode }) => (
  <span className="relative inline-block">
    <span className="pointer-events-none absolute inset-x-0 -top-2 bottom-0">
      {CONFETES.map((c, i) => (
        <span
          key={i}
          className="confete absolute block rounded-[1px]"
          style={{
            left: `${c.x}%`,
            width: c.w,
            height: c.h,
            backgroundColor: c.cor,
            opacity: 0,
            animation: `confete ${c.t}s linear ${c.d}s infinite`,
          }}
        />
      ))}
    </span>
    <span className="relative">
      <Varrido>{children}</Varrido>
    </span>
  </span>
);

/* 2 · fogos: faíscas que estouram acima das palavras a cada 4s */
const FAISCAS = Array.from({ length: 9 }, (_, i) => {
  const ang = (Math.PI / 8) * i - Math.PI; // meia-volta, de 180° a 0°
  const raio = 34 + (i % 3) * 10;
  return {
    dx: `${Math.round(Math.cos(ang) * raio)}px`,
    dy: `${Math.round(Math.sin(ang) * raio)}px`,
    d: (i % 4) * 0.08,
    cor: i % 3 === 0 ? "hsl(35 90% 68%)" : CORAL,
  };
});

const Fogos = ({ children }: { children: ReactNode }) => (
  <span className="relative inline-block">
    <span className="pointer-events-none absolute left-1/2 top-1 block h-0 w-0">
      {FAISCAS.map((f, i) => (
        <span
          key={i}
          className="faisca absolute block h-1.5 w-1.5 rounded-full"
          style={
            {
              backgroundColor: f.cor,
              opacity: 0,
              "--dx": f.dx,
              "--dy": f.dy,
              animation: `faisca 4s ease-out ${f.d}s infinite`,
            } as CSSProperties
          }
        />
      ))}
    </span>
    <Varrido>{children}</Varrido>
  </span>
);

/* 3 · bilhete premiado: as palavras viram um bilhete com brilho passando */
const Bilhete = ({ children }: { children: ReactNode }) => (
  <span
    className="relative inline-block overflow-hidden rounded-2xl border border-dashed px-3 py-0.5 sm:px-4"
    style={{ borderColor: "hsl(15 65% 56% / 0.55)", color: CORAL }}
  >
    <span
      className="reluz pointer-events-none absolute inset-y-0 -left-1/2 block w-1/3 skew-x-12"
      style={{
        background:
          "linear-gradient(90deg, transparent, hsl(0 0% 100% / 0.28), transparent)",
        animation: "reluz 4.5s ease-in-out infinite",
      }}
    />
    {children}
  </span>
);

/* 4 · sublinhado sorteado: o traço se desenha sob as palavras e recomeça */
const Sublinhado = ({ children }: { children: ReactNode }) => (
  <span className="relative inline-block">
    <Varrido>{children}</Varrido>
    <span
      className="sublinha absolute -bottom-1 left-0 block h-[3px] w-full origin-left rounded-full"
      style={{ backgroundColor: CORAL, animation: "sublinha 4.5s ease-in-out infinite" }}
    />
  </span>
);

/* 5 · halo: um brilho coral respirando atrás das palavras */
const Halo = ({ children }: { children: ReactNode }) => (
  <span className="relative inline-block">
    <span
      className="halo pointer-events-none absolute -inset-x-6 -inset-y-4 -z-10 block rounded-full blur-2xl"
      style={{
        background:
          "radial-gradient(circle, hsl(15 65% 56% / 0.75) 0%, transparent 70%)",
        animation: "halo 3.6s ease-in-out infinite",
      }}
    />
    <Varrido>{children}</Varrido>
  </span>
);

const OPCOES = [
  {
    id: "atual",
    nome: "0 · Atual",
    nota: "Referência: só o degradê varrendo as letras, como está hoje na página.",
    Destaque: Varrido,
  },
  {
    id: "confete",
    nome: "1 · Confete",
    nota: "Oito papelotes caindo devagar por trás das palavras, em cores e tempos diferentes. Festa sem barulho.",
    Destaque: Confete,
  },
  {
    id: "fogos",
    nome: "2 · Fogos",
    nota: "Um estouro de faíscas acima das palavras a cada quatro segundos. É o momento do sorteio.",
    Destaque: Fogos,
  },
  {
    id: "bilhete",
    nome: "3 · Bilhete premiado",
    nota: "As palavras viram o próprio bilhete: borda picotada e um brilho que atravessa de tempos em tempos.",
    Destaque: Bilhete,
  },
  {
    id: "sublinhado",
    nome: "4 · Sublinhado sorteado",
    nota: "Um traço coral que se desenha sob as palavras e reinicia. O mais discreto de todos.",
    Destaque: Sublinhado,
  },
  {
    id: "halo",
    nome: "5 · Halo",
    nota: "Um brilho coral respirando atrás das palavras. Sem elemento novo, só luz.",
    Destaque: Halo,
  },
];

const Hero = ({ Destaque }: { Destaque: (p: { children: ReactNode }) => JSX.Element }) => (
  <section
    className="relative isolate overflow-hidden aurora"
    style={{ backgroundImage: BRASA }}
  >
    <div className="relative z-10 mx-auto max-w-4xl px-5 py-16 text-center text-white sm:px-6 md:py-24">
      <span
        className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] sm:text-xs sm:tracking-[0.2em]"
        style={{ backgroundColor: "hsl(15 65% 56% / 0.15)", color: CORAL }}
      >
        <Sparkles size={13} className="shrink-0" /> Metodologia aberta e gratuita
      </span>
      <h1 className="mt-6 text-[2rem] font-bold leading-[1.15] tracking-tight sm:text-4xl md:text-6xl md:leading-[1.12]">
        Como captar recursos para
        <br className="hidden sm:inline" />{" "}
        a sua causa com a <Destaque>Rifa Solidária</Destaque>
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
        Cinco etapas para planejar, lançar e encerrar a rifa da sua organização.
        Da primeira meta à prestação de contas.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
        {ETAPAS.map((e) => (
          <span
            key={e.n}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/[0.06] px-3 py-1.5 text-xs font-semibold sm:px-4 sm:py-2 sm:text-sm"
          >
            <span className="text-sm leading-none sm:text-base">{e.emoji}</span>
            {e.title}
          </span>
        ))}
      </div>

      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <span
          className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-bold text-white"
          style={{ backgroundColor: CORAL }}
        >
          Ver as 5 etapas <ArrowRight size={16} />
        </span>
        <span className="inline-flex items-center justify-center rounded-full border border-white/25 px-8 py-4 text-sm font-semibold">
          Montar a minha rifa
        </span>
      </div>
    </div>
  </section>
);

const TestesDegrade = () => (
  <div className="min-h-screen bg-background text-foreground" style={PALETA}>
    <style>{CSS}</style>

    <header className="mx-auto max-w-4xl px-5 pb-2 pt-10 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
        Teste de destaque
      </p>
      <h2 className="mt-2 text-2xl font-bold md:text-3xl">
        Como destacar o "Rifa Solidária"
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        O fundo já é o escolhido: petróleo com brasa, com o degradê andando pela
        tela em 22 segundos. Abaixo, cinco maneiras de dar mais peso ao nome do
        método, todas em CSS puro e sem imagem.
      </p>
    </header>

    {OPCOES.map((o) => (
      <div key={o.id} className="mt-8">
        <div className="mx-auto max-w-4xl px-5 pb-3 sm:px-6">
          <h3 className="font-bold">{o.nome}</h3>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            {o.nota}
          </p>
        </div>
        <Hero Destaque={o.Destaque} />
      </div>
    ))}

    <p className="mx-auto max-w-4xl px-5 py-12 text-sm text-muted-foreground sm:px-6">
      Todas respeitam <code>prefers-reduced-motion</code>: quem pede menos
      movimento no sistema vê tudo parado.
    </p>
  </div>
);

export default TestesDegrade;
