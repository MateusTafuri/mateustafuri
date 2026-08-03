import { type CSSProperties } from "react";
import { ArrowRight, Sparkles } from "lucide-react";

const ETAPAS = ["Sonhar", "Ofertar", "Contar", "Escalar", "Retribuir"];

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

/* ─────────── AS 5 COPIES ─────────── */

type Copy = {
  nome: string;
  angulo: string;
  selo: string;
  titulo: React.ReactNode;
  sub: string;
  cta: string;
};

const COPIES: Copy[] = [
  {
    nome: "Direta ao ponto",
    angulo: "Diz exatamente o que a pessoa vai encontrar. Nenhum rodeio, nenhuma promessa.",
    selo: "Metodologia aberta e gratuita",
    titulo: (
      <>
        Como captar recursos para
        <br />
        a sua causa com a{" "}
        <span style={{ color: CORAL }}>Rifa Solidária</span>
      </>
    ),
    sub: "Uma metodologia em 5 etapas para planejar, lançar e encerrar uma campanha de rifa na sua organização. Do primeiro objetivo até a prestação de contas.",
    cta: "Ver as 5 etapas",
  },
  {
    nome: "Explica o que é",
    angulo: "Assume que a pessoa nunca ouviu falar e explica o mecanismo da rifa em uma frase.",
    selo: "O que é a Rifa Solidária",
    titulo: (
      <>
        Em vez de pedir doação,
        <br />
        a sua causa <span style={{ color: CORAL }}>oferece um prêmio</span>
      </>
    ),
    sub: "É assim que funciona uma rifa solidária: as pessoas participam por uma experiência e a sua organização arrecada para um objetivo real. Aqui está o passo a passo para montar a sua, em 5 etapas.",
    cta: "Entender o método",
  },
  {
    nome: "Guia passo a passo",
    angulo: "Vende como material de estudo. As 5 etapas aparecem já no subtítulo.",
    selo: "Guia gratuito, etapa por etapa",
    titulo: (
      <>
        Aprenda a montar a sua
        <br />
        <span style={{ color: CORAL }}>rifa solidária</span> do começo ao fim
      </>
    ),
    sub: "Sonhar, ofertar, contar, escalar e retribuir. Em cada etapa você vê o que precisa ter antes de começar, o que aprender na prática e o que deve estar pronto para seguir para a próxima.",
    cta: "Começar pela etapa 1",
  },
  {
    nome: "Foco na organização",
    angulo: "Fala com quem tem uma meta concreta e precisa saber por onde começar.",
    selo: "Captação com pessoas físicas",
    titulo: (
      <>
        A sua organização tem uma meta.
        <br />
        A <span style={{ color: CORAL }}>rifa solidária</span> tem o caminho.
      </>
    ),
    sub: "Uma obra, um equipamento, um projeto. A metodologia organiza em 5 etapas o que a campanha precisa: objetivo claro, prêmio, parceiros, narrativa, alcance e prestação de contas.",
    cta: "Ver como funciona",
  },
  {
    nome: "Convite ao aprendizado",
    angulo: "Tom de quem compartilha o que aprendeu, sem vender nada. O mais pessoal.",
    selo: "Metodologia Rifa Solidária",
    titulo: (
      <>
        Tudo que aprendi captando
        <br />
        recursos com{" "}
        <span style={{ color: CORAL }}>rifas solidárias</span>
      </>
    ),
    sub: "Reuni em 5 etapas o método que apliquei em projetos sociais pelo Brasil. Está aberto aqui, de graça, para a sua organização estudar e adaptar à realidade dela.",
    cta: "Conhecer as 5 etapas",
  },
];

/* ─────────── LAYOUT (o mesmo da opção 1) ─────────── */

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

const Header = ({ copy }: { copy: Copy }) => (
  <header
    className="relative px-6 pt-28 pb-20 md:pt-32 md:pb-24 text-white text-center overflow-hidden"
    style={{ backgroundImage: GRADIENTE }}
  >
    <NavFake />
    <div
      className="pointer-events-none absolute -top-24 left-1/2 h-80 w-[36rem] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
      style={{ background: `radial-gradient(circle, ${CORAL} 0%, transparent 70%)` }}
    />
    <div className="relative max-w-4xl mx-auto">
      <span
        className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em]"
        style={{ backgroundColor: "hsl(15 65% 56% / 0.15)", color: CORAL }}
      >
        <Sparkles size={13} /> {copy.selo}
      </span>
      <h1 className="mt-6 text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight">
        {copy.titulo}
      </h1>
      <p className="mt-6 max-w-2xl mx-auto text-white/75 text-lg leading-relaxed">
        {copy.sub}
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-x-2 gap-y-3">
        {ETAPAS.map((e, i) => (
          <div key={e} className="flex items-center gap-2">
            <span className="rounded-full border border-white/20 bg-white/[0.06] px-4 py-2 text-sm font-semibold">
              {e}
            </span>
            {i < ETAPAS.length - 1 && (
              <ArrowRight size={14} className="text-white/30" />
            )}
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
        <span
          className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-bold text-white"
          style={{ backgroundColor: CORAL }}
        >
          {copy.cta} <ArrowRight size={16} />
        </span>
        <span className="inline-flex items-center justify-center border border-white/25 px-8 py-4 rounded-full text-sm font-semibold">
          Montar a minha rifa
        </span>
      </div>
    </div>
  </header>
);

/* ─────────── PÁGINA ─────────── */

const TestesCopy = () => (
  <main className="bg-background text-foreground" style={PALETA}>
    <div className="max-w-5xl mx-auto px-6 pt-16 pb-4 text-center">
      <p
        className="text-xs font-semibold uppercase tracking-[0.25em] mb-2"
        style={{ color: CORAL }}
      >
        Modo teste
      </p>
      <h1 className="text-3xl md:text-4xl font-bold">
        5 copies para o header manifesto
      </h1>
      <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
        Mesmo layout que você escolheu, cinco formas de vender a metodologia.
        Nenhuma usa números de arrecadação.
      </p>
    </div>

    {COPIES.map((copy, i) => (
      <section key={copy.nome} className="border-b border-border">
        <div className="max-w-5xl mx-auto px-6 pt-14 pb-6">
          <div className="flex items-start gap-3">
            <span
              className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-bold text-white"
              style={{ backgroundColor: CORAL }}
            >
              {i + 1}
            </span>
            <div>
              <h2 className="text-xl font-bold">{copy.nome}</h2>
              <p className="text-sm text-muted-foreground mt-0.5">{copy.angulo}</p>
            </div>
          </div>
        </div>
        <Header copy={copy} />
      </section>
    ))}

    <div className="py-14 text-center text-sm text-muted-foreground">
      Fim das opções. Me diga o número que prefere, ou peça ajustes na frase.
    </div>
  </main>
);

export default TestesCopy;
