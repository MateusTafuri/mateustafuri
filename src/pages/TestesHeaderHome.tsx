import { ArrowRight, ChevronDown } from "lucide-react";
import heroImg from "@/assets/hero-real.webp";

/* Cinco versões da primeira tela da home, todas com a mesma foto de fundo.
   Página de teste: nada em uso ainda. */

const CORAL = "hsl(15 65% 56%)";
const PETROLEO = "hsl(176 44% 12%)";
const WHATSAPP = "#";

const TITULO_1 = "Quando uma causa";
const TITULO_2 = "tem propósito,";
const TITULO_3 = "ela merece voz.";

const Foto = ({ posicao = "center 25%" }: { posicao?: string }) => (
  <img
    src={heroImg}
    alt="Mateus Tafuri com alunos no dojo"
    className="absolute inset-0 h-full w-full object-cover"
    style={{ objectPosition: posicao }}
  />
);

const Bloco = ({
  n,
  titulo,
  nota,
  children,
}: {
  n: number;
  titulo: string;
  nota: string;
  children: React.ReactNode;
}) => (
  <section className="border-t border-black/10 py-12">
    <div className="mx-auto mb-6 max-w-5xl px-5 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: CORAL }}>
        Versão {n}
      </p>
      <h2 className="mt-1 font-display text-xl font-bold">{titulo}</h2>
      <p className="mt-1 text-sm text-black/50">{nota}</p>
    </div>
    <div className="relative h-[560px] overflow-hidden">{children}</div>
  </section>
);

/* ── 1. texto à esquerda, com apoio e dois botões ── */
const V1 = () => (
  <>
    <Foto />
    <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />
    <div className="absolute inset-0 flex items-center">
      <div className="mx-auto w-full max-w-5xl px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: CORAL }}>
          Captação de recursos para projetos sociais
        </p>
        <h1 className="mt-4 max-w-xl font-display text-4xl font-bold leading-[1.05] text-white md:text-6xl">
          Quando uma causa tem propósito, ela merece voz.
        </h1>
        <p className="mt-5 max-w-md text-lg leading-relaxed text-white/75">
          Mais de R$ 500 mil mobilizados para projetos em comunidades isoladas do Brasil.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={WHATSAPP}
            className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white no-underline"
            style={{ background: CORAL }}
          >
            Falar comigo <ArrowRight size={16} />
          </a>
          <a
            href={WHATSAPP}
            className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3.5 text-sm font-semibold text-white no-underline"
          >
            Ver o método
          </a>
        </div>
      </div>
    </div>
  </>
);

/* ── 2. centrado, com pílula em cima e botão embaixo ── */
const V2 = () => (
  <>
    <Foto />
    <div className="absolute inset-0 bg-black/45" />
    <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
      <span className="rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/85 backdrop-blur-sm">
        Estratégia · Mobilização · Captação
      </span>
      <h1 className="mt-6 max-w-3xl font-display text-4xl font-bold leading-[1.05] text-white md:text-6xl">
        Quando uma causa tem propósito, <span style={{ color: CORAL }}>ela merece voz</span>.
      </h1>
      <p className="mt-5 max-w-lg text-lg text-white/75">
        Ajudo projetos sociais a captar recursos com a metodologia Rifa Solidária.
      </p>
      <a
        href={WHATSAPP}
        className="mt-8 inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-semibold text-white no-underline"
        style={{ background: CORAL }}
      >
        Conhecer o método <ArrowRight size={16} />
      </a>
    </div>
  </>
);

/* ── 3. título alto e os números colados embaixo ── */
const V3 = () => (
  <>
    <Foto />
    <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/70 to-transparent" />
    <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/45 to-transparent" />
    <div className="absolute inset-0 flex flex-col justify-end pb-0">
      <div className="mx-auto w-full max-w-5xl px-6 pb-8 text-center">
        <h1 className="mx-auto max-w-3xl font-display text-4xl font-bold leading-[1.05] text-white md:text-6xl">
          {TITULO_1} {TITULO_2} {TITULO_3}
        </h1>
      </div>
      <dl className="grid grid-cols-3 border-t border-white/15 bg-black/40 backdrop-blur-md">
        {[
          { v: "+R$ 500 mil", l: "mobilizados" },
          { v: "+10", l: "campanhas" },
          { v: "+10 mil", l: "apoiadores" },
        ].map((n) => (
          <div key={n.l} className="px-4 py-5 text-center">
            <dt className="font-display text-xl font-extrabold md:text-2xl" style={{ color: CORAL }}>
              {n.v}
            </dt>
            <dd className="mt-0.5 text-[11px] uppercase tracking-[0.15em] text-white/50">{n.l}</dd>
          </div>
        ))}
      </dl>
    </div>
  </>
);

/* ── 4. cartão de vidro sobre a foto ── */
const V4 = () => (
  <>
    <Foto posicao="center 30%" />
    <div className="absolute inset-0 bg-black/30" />
    <div className="absolute inset-0 flex items-center">
      <div className="mx-auto w-full max-w-5xl px-6">
        <div className="max-w-lg rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-xl md:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: "hsl(35 92% 80%)" }}>
            Mateus Tafuri
          </p>
          <h1 className="mt-4 font-display text-3xl font-bold leading-[1.08] text-white md:text-5xl">
            Quando uma causa tem propósito, ela merece voz.
          </h1>
          <p className="mt-4 leading-relaxed text-white/80">
            Estruturo campanhas de captação para projetos sociais em comunidades isoladas.
          </p>
          <a
            href={WHATSAPP}
            className="mt-7 inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white no-underline"
            style={{ background: CORAL }}
          >
            Conhecer a Rifa Solidária <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </div>
  </>
);

/* ── 5. o mesmo layout de hoje, com o preto trocado pelo petróleo ── */
const V5 = () => (
  <>
    <Foto />
    <div
      className="absolute inset-0"
      style={{
        background: `linear-gradient(to top, ${PETROLEO} 4%, hsl(176 44% 12% / 0.75) 30%, hsl(176 44% 12% / 0.15) 62%, hsl(176 44% 12% / 0.55) 100%)`,
      }}
    />
    <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-4 px-6 pb-10 text-center">
      <h1 className="max-w-4xl font-display text-4xl font-bold leading-[1.05] text-white md:text-6xl">
        {TITULO_1} {TITULO_2}{" "}
        <span
          className="bg-clip-text text-transparent"
          style={{
            backgroundImage: "linear-gradient(100deg, hsl(35 92% 80%), hsl(15 65% 56%))",
          }}
        >
          {TITULO_3}
        </span>
      </h1>
      <p className="max-w-xl text-white/70">
        Captação de recursos para projetos sociais em comunidades isoladas.
      </p>
      <ChevronDown size={22} className="mt-2 text-white/50" />
    </div>
  </>
);

const TestesHeaderHome = () => (
  <div className="min-h-screen bg-background pb-20">
    <header className="mx-auto max-w-5xl px-5 pb-4 pt-16 sm:px-6">
      <h1 className="font-display text-3xl font-bold">Primeira tela da home</h1>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Cinco versões com a mesma foto. Hoje a tela só tem o título e a seta: nenhuma delas tem
        botão, e a pessoa precisa rolar para descobrir o que você faz.
      </p>
    </header>

    <Bloco n={1} titulo="Texto à esquerda, com dois botões" nota="Sai do centro: título, uma linha de prova e ação logo na entrada.">
      <V1 />
    </Bloco>
    <Bloco n={2} titulo="Centrado, com pílula e botão" nota="Mantém o centro de hoje, ganha o que você faz em cima e o convite embaixo.">
      <V2 />
    </Bloco>
    <Bloco n={3} titulo="Título alto e números na base" nota="Os três números entram na primeira tela, numa faixa de vidro.">
      <V3 />
    </Bloco>
    <Bloco n={4} titulo="Cartão de vidro sobre a foto" nota="A foto aparece inteira e o texto vive num cartão translúcido.">
      <V4 />
    </Bloco>
    <Bloco n={5} titulo="O de hoje, no petróleo" nota="Mesmo layout, trocando o preto pelo petróleo do site e o coral só na última linha.">
      <V5 />
    </Bloco>
  </div>
);

export default TestesHeaderHome;
