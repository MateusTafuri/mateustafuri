import { type CSSProperties } from "react";
import {
  ArrowRight,
  ClipboardList,
  QrCode,
  Sparkles,
} from "lucide-react";
import fotoMateus from "@/assets/bonete-mateus.webp";
import fotoTurma from "@/assets/bonete-turma.webp";
import fotoGraduacao from "@/assets/bonete-graduacao-praia.webp";

const ETAPAS = ["Sonhar", "Ofertar", "Contar", "Escalar", "Retribuir"];

const CORAL = "hsl(15 65% 56%)";
const PETROLEO = "hsl(176 39% 14%)";
const CREME = "hsl(42 37% 92%)";
const GRADIENTE =
  "linear-gradient(150deg, hsl(176 44% 13%) 0%, hsl(178 40% 19%) 55%, hsl(181 38% 27%) 100%)";

/* Paleta do pôster aplicada nas variações */
const PALETA = {
  "--primary": "15 65% 56%",
  "--primary-foreground": "0 0% 100%",
  "--secondary": "42 37% 88%",
  "--secondary-foreground": "178 36% 22%",
  "--border": "42 22% 84%",
} as CSSProperties;

/* Barra de navegação simulada, só para avaliar o header no contexto */
const NavFake = ({ escuro = true }: { escuro?: boolean }) => (
  <div
    className={`absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-5 text-sm ${
      escuro ? "text-white/85" : "text-[hsl(176,39%,14%)]/80"
    }`}
  >
    <span className="font-bold">Mateus Tafuri</span>
    <div className="hidden md:flex items-center gap-6">
      <span>Campanhas</span>
      <span>Rifa Solidária</span>
      <span>Trajetória</span>
      <span>Depoimentos</span>
    </div>
    <span
      className={`rounded-full border px-4 py-2 text-xs font-semibold ${
        escuro ? "border-white/25" : "border-[hsl(176,39%,14%)]/25"
      }`}
    >
      Entrar em contato
    </span>
  </div>
);

const Opcao = ({
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
    <div className="relative">{children}</div>
  </section>
);

/* ─────────── 1 · MANIFESTO ─────────── */

const Header1 = () => (
  <header
    className="relative px-6 pt-28 pb-20 md:pt-32 md:pb-24 text-white text-center overflow-hidden"
    style={{ backgroundImage: GRADIENTE }}
  >
    <NavFake />
    {/* brilho decorativo */}
    <div
      className="pointer-events-none absolute -top-24 left-1/2 h-80 w-[36rem] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
      style={{ background: `radial-gradient(circle, ${CORAL} 0%, transparent 70%)` }}
    />
    <div className="relative max-w-4xl mx-auto">
      <span
        className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em]"
        style={{ backgroundColor: "hsl(15 65% 56% / 0.15)", color: CORAL }}
      >
        <Sparkles size={13} /> Metodologia aberta e gratuita
      </span>
      <h1 className="mt-6 text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight">
        Sua causa não precisa
        <br />
        de sorte. Precisa de{" "}
        <span style={{ color: CORAL }}>método</span>.
      </h1>
      <p className="mt-6 max-w-2xl mx-auto text-white/75 text-lg leading-relaxed">
        A Rifa Solidária é o caminho, em 5 etapas, que transforma o sonho da sua
        organização em uma campanha que mobiliza o Brasil inteiro. Do primeiro
        objetivo até a prestação de contas.
      </p>

      {/* etapas como trilha */}
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
          Conhecer as 5 etapas <ArrowRight size={16} />
        </span>
        <span className="inline-flex items-center justify-center border border-white/25 px-8 py-4 rounded-full text-sm font-semibold">
          Montar a minha rifa
        </span>
      </div>
    </div>
  </header>
);

/* ─────────── 2 · AS 5 ETAPAS COMO PROTAGONISTAS ─────────── */

const Header2 = () => (
  <header
    className="relative px-6 pt-28 pb-16 md:pt-32 md:pb-20 text-white"
    style={{ backgroundImage: GRADIENTE }}
  >
    <NavFake />
    <div className="max-w-5xl mx-auto">
      <div className="max-w-2xl">
        <p
          className="text-xs font-semibold uppercase tracking-[0.3em] mb-4"
          style={{ color: CORAL }}
        >
          Aprenda a captar recursos para sua causa
        </p>
        <h1 className="text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight">
          Rifa <span style={{ color: CORAL }}>Solidária</span>
        </h1>
        <p className="mt-5 text-white/75 text-lg leading-relaxed">
          Cinco etapas para tirar a campanha da sua organização do papel. Um
          método nascido em campo, aberto aqui de graça, do começo ao fim.
        </p>
      </div>

      {/* as 5 etapas em cartões numerados */}
      <div className="mt-12 grid grid-cols-2 md:grid-cols-5 gap-3">
        {ETAPAS.map((e, i) => (
          <div
            key={e}
            className="rounded-2xl border border-white/12 bg-white/[0.05] p-4 transition-colors hover:border-white/30"
          >
            <span
              className="text-2xl font-extrabold leading-none"
              style={{ color: CORAL }}
            >
              0{i + 1}
            </span>
            <p className="mt-2 font-bold">{e}</p>
            <div
              className="mt-3 h-1 w-8 rounded-full"
              style={{ backgroundColor: CORAL, opacity: 0.5 }}
            />
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-col sm:flex-row gap-3">
        <span
          className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-bold text-white"
          style={{ backgroundColor: CORAL }}
        >
          Começar pela etapa 1 <ArrowRight size={16} />
        </span>
        <span className="inline-flex items-center justify-center border border-white/25 px-8 py-4 rounded-full text-sm font-semibold">
          Montar a minha rifa
        </span>
      </div>
    </div>
  </header>
);

/* ─────────── 3 · SPLIT COM FOTO ─────────── */

const Header3 = () => (
  <header
    className="relative px-6 pt-28 pb-16 md:pt-32 md:pb-20 text-white"
    style={{ backgroundImage: GRADIENTE }}
  >
    <NavFake />
    <div className="max-w-5xl mx-auto grid md:grid-cols-[1.05fr_0.95fr] gap-12 items-center">
      <div>
        <p
          className="text-xs font-semibold uppercase tracking-[0.3em] mb-4"
          style={{ color: CORAL }}
        >
          Metodologia Rifa Solidária
        </p>
        <h1 className="text-4xl md:text-5xl font-bold leading-[1.08] tracking-tight">
          O método que já ergueu
          <br />
          sonhos em comunidades
          <br />
          <span style={{ color: CORAL }}>que ninguém via</span>.
        </h1>
        <p className="mt-6 text-white/75 text-lg leading-relaxed">
          Nasceu numa praia sem estrada, com uma equipe pequena e um celular na
          mão. Hoje está aqui, aberto em 5 etapas, para a sua organização
          aplicar do jeito dela.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <span
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold text-white"
            style={{ backgroundColor: CORAL }}
          >
            Conhecer o método <ArrowRight size={16} />
          </span>
          <span className="inline-flex items-center justify-center border border-white/25 px-7 py-3.5 rounded-full text-sm font-semibold">
            Montar a minha rifa
          </span>
        </div>
      </div>

      {/* colagem de fotos */}
      <div className="relative h-[340px] md:h-[400px] hidden md:block">
        <img
          src={fotoTurma}
          alt=""
          className="absolute right-0 top-0 h-56 w-44 rounded-2xl border-4 border-white/90 object-cover shadow-2xl"
          style={{ transform: "rotate(5deg)" }}
        />
        <img
          src={fotoGraduacao}
          alt=""
          className="absolute left-2 top-16 h-52 w-40 rounded-2xl border-4 border-white/90 object-cover shadow-2xl"
          style={{ transform: "rotate(-7deg)" }}
        />
        <img
          src={fotoMateus}
          alt=""
          className="absolute left-24 bottom-0 h-56 w-44 rounded-2xl border-4 border-white/90 object-cover shadow-2xl"
          style={{ transform: "rotate(2deg)" }}
        />
      </div>
    </div>
  </header>
);

/* ─────────── 4 · PROBLEMA E SOLUÇÃO ─────────── */

const Header4 = () => (
  <header
    className="relative px-6 pt-28 pb-16 md:pt-32 md:pb-20 text-white"
    style={{ backgroundImage: GRADIENTE }}
  >
    <NavFake />
    <div className="max-w-4xl mx-auto text-center">
      <p className="text-white/50 text-sm font-medium uppercase tracking-[0.25em] mb-5">
        Toda necessidade vira uma vaquinha às pressas
      </p>
      <h1 className="text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight">
        Pare de fazer vaquinha.
        <br />
        Comece a fazer{" "}
        <span className="relative inline-block">
          <span style={{ color: CORAL }}>campanha</span>
          <span
            className="absolute left-0 -bottom-1 h-1.5 w-full rounded-full"
            style={{ backgroundColor: CORAL, opacity: 0.4 }}
          />
        </span>
        .
      </h1>
      <p className="mt-7 max-w-2xl mx-auto text-white/75 text-lg leading-relaxed">
        A Rifa Solidária organiza em 5 etapas tudo que uma campanha precisa:
        objetivo, prêmio, narrativa, alcance e prestação de contas. Sem
        improviso, sem depender da boa vontade de sempre.
      </p>

      {/* antes e depois */}
      <div className="mt-10 grid sm:grid-cols-2 gap-4 text-left max-w-2xl mx-auto">
        <div className="rounded-2xl border border-white/12 bg-white/[0.04] p-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-3">
            Sem método
          </p>
          <ul className="space-y-2 text-sm text-white/55">
            <li>Pedido improvisado no grupo da família</li>
            <li>Cansa a mesma base de sempre</li>
            <li>Cada campanha começa do zero</li>
          </ul>
        </div>
        <div
          className="rounded-2xl border p-5"
          style={{ borderColor: "hsl(15 65% 56% / 0.4)", backgroundColor: "hsl(15 65% 56% / 0.08)" }}
        >
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: CORAL }}
          >
            Com a Rifa Solidária
          </p>
          <ul className="space-y-2 text-sm text-white/85">
            <li>Uma oferta que atrai quem não conhece você</li>
            <li>Alcance muito além do círculo próximo</li>
            <li>Uma base que volta a apoiar na próxima</li>
          </ul>
        </div>
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

/* ─────────── 5 · CLARO E EDITORIAL ─────────── */

const Header5 = () => (
  <header
    className="relative px-6 pt-28 pb-16 md:pt-32 md:pb-20"
    style={{ backgroundColor: CREME, color: PETROLEO }}
  >
    <NavFake escuro={false} />
    <div className="max-w-5xl mx-auto">
      <div className="grid md:grid-cols-[1fr_auto] gap-10 items-end">
        <div>
          <span
            className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold"
            style={{ borderColor: "hsl(15 65% 56% / 0.35)", color: CORAL }}
          >
            <QrCode size={13} /> Veio pelo poster do Festival ABCR?
          </span>
          <h1 className="mt-6 text-4xl md:text-6xl font-bold leading-[1.02] tracking-tight">
            Quando uma causa
            <br />
            tem propósito,
            <br />
            <span style={{ color: CORAL }}>ela merece voz.</span>
          </h1>
        </div>
        <div className="md:text-right md:pb-3">
          <p
            className="text-7xl md:text-8xl font-extrabold leading-none"
            style={{ color: CORAL, opacity: 0.9 }}
          >
            05
          </p>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] opacity-60">
            etapas
          </p>
        </div>
      </div>

      <div className="mt-10 border-t pt-8" style={{ borderColor: "hsl(176 39% 14% / 0.15)" }}>
        <div className="grid md:grid-cols-[1.2fr_1fr] gap-8 items-start">
          <p className="text-lg leading-relaxed opacity-80">
            A Rifa Solidária é a metodologia que dá voz à sua causa: um caminho
            claro para transformar o que a sua organização precisa em uma
            campanha que as pessoas querem apoiar. Está tudo aqui, aberto e de
            graça.
          </p>
          <div className="flex flex-col gap-3">
            <span
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold text-white"
              style={{ backgroundColor: CORAL }}
            >
              Conhecer as 5 etapas <ArrowRight size={16} />
            </span>
            <span
              className="inline-flex items-center justify-center gap-2 border px-7 py-3.5 rounded-full text-sm font-semibold"
              style={{ borderColor: "hsl(176 39% 14% / 0.25)" }}
            >
              <ClipboardList size={15} /> Montar a minha rifa
            </span>
          </div>
        </div>
      </div>
    </div>
  </header>
);

/* ─────────── PÁGINA ─────────── */

const TestesHeader = () => (
  <main className="bg-background text-foreground" style={PALETA}>
    <div className="max-w-5xl mx-auto px-6 pt-16 pb-4 text-center">
      <p
        className="text-xs font-semibold uppercase tracking-[0.25em] mb-2"
        style={{ color: CORAL }}
      >
        Modo teste
      </p>
      <h1 className="text-3xl md:text-4xl font-bold">
        5 headers para a Rifa Solidária
      </h1>
      <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
        Cada opção vende a metodologia por um ângulo diferente. Sem números de
        arrecadação. Role para comparar e me diga qual número prefere.
      </p>
    </div>

    <Opcao
      num={1}
      nome="Manifesto"
      desc="Frase de impacto contra a sorte e a favor do método, com as 5 etapas como trilha logo abaixo."
    >
      <Header1 />
    </Opcao>

    <Opcao
      num={2}
      nome="As 5 etapas como protagonistas"
      desc="O método vira o elemento gráfico: cinco cartões numerados dominam o header."
    >
      <Header2 />
    </Opcao>

    <Opcao
      num={3}
      nome="Split com fotos"
      desc="Prova social visual: colagem de fotos reais das comunidades ao lado da promessa."
    >
      <Header3 />
    </Opcao>

    <Opcao
      num={4}
      nome="Problema e solução"
      desc="Ataca a dor da vaquinha improvisada e mostra o contraste lado a lado."
    >
      <Header4 />
    </Opcao>

    <Opcao
      num={5}
      nome="Claro e editorial"
      desc="Fundo creme, tipografia grande e o slogan do site como headline. Direção oposta às demais."
    >
      <Header5 />
    </Opcao>

    <div className="py-14 text-center text-sm text-muted-foreground">
      Fim das opções. Me diga o número que prefere, ou combine ideias de duas.
    </div>
  </main>
);

export default TestesHeader;
