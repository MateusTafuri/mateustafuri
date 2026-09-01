import { ArrowLeft } from "lucide-react";
import foto from "@/assets/story-18.webp";

/* Dez topos para a página /sobre, todos mais claros que o atual e com a mesma
   foto de capa. Página de teste: nada em uso ainda. */

const CORAL = "hsl(15 65% 56%)";
const PETROLEO = "hsl(176 39% 14%)";
const PETROLEO_MEDIO = "hsl(178 36% 22%)";
const CREME = "#F4F0E6";

const TITULO = "Mateus Tafuri";
const PAPEL = "Estratégia · Mobilização · Captação de recursos";
const RESUMO =
  "Engenheiro de produção de formação, cinco anos de terceiro setor. Estruturo campanhas de captação de recursos com marketing digital.";

/* o texto do topo, com as cores trocáveis */
const Texto = ({
  titulo = "text-green-dark",
  apoio = "text-black/55",
  resumo = "text-black/70",
  volta = "text-black/45",
  eyebrow = CORAL,
}: {
  titulo?: string;
  apoio?: string;
  resumo?: string;
  volta?: string;
  eyebrow?: string;
}) => (
  <div>
    <span className={`inline-flex items-center gap-2 text-sm ${volta}`}>
      <ArrowLeft size={16} /> Voltar para a entrada
    </span>
    <p className="mt-8 text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: eyebrow }}>
      Sobre mim
    </p>
    <h1 className={`mt-3 font-display text-5xl font-bold leading-[0.95] md:text-6xl ${titulo}`}>
      {TITULO}
    </h1>
    <p className={`mt-4 text-xs font-semibold uppercase tracking-[0.2em] ${apoio}`}>{PAPEL}</p>
    <p className={`mt-6 max-w-md text-lg leading-relaxed ${resumo}`}>{RESUMO}</p>
  </div>
);

const Foto = ({ className = "", style }: { className?: string; style?: React.CSSProperties }) => (
  <img
    src={foto}
    alt="Mateus no tatame com as crianças do projeto"
    className={`object-cover object-[40%_35%] ${className}`}
    style={style}
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
      <h2 className="mt-1 text-xl font-bold">{titulo}</h2>
      <p className="mt-1 text-sm text-black/50">{nota}</p>
    </div>
    {children}
  </section>
);

/* ── 1 ── creme, o mais sóbrio dos claros */
const V1 = () => (
  <header style={{ background: CREME }}>
    <div className="mx-auto grid max-w-5xl items-center gap-10 px-6 py-14 md:grid-cols-[1fr_300px]">
      <Texto />
      <Foto className="aspect-[4/5] w-full rounded-3xl shadow-xl" />
    </div>
  </header>
);

/* ── 2 ── verde claro da marca */
const V2 = () => (
  <header className="bg-secondary">
    <div className="mx-auto grid max-w-5xl items-center gap-10 px-6 py-14 md:grid-cols-[1fr_300px]">
      <Texto apoio="text-green-dark/50" resumo="text-secondary-foreground/80" eyebrow="hsl(80 15% 28%)" />
      <Foto className="aspect-[4/5] w-full rounded-3xl shadow-xl" />
    </div>
  </header>
);

/* ── 3 ── degradê quente: coral clareando para o creme */
const V3 = () => (
  <header
    style={{
      backgroundImage: `linear-gradient(115deg, hsl(15 80% 92%), ${CREME} 55%, hsl(42 60% 90%))`,
    }}
  >
    <div className="mx-auto grid max-w-5xl items-center gap-10 px-6 py-14 md:grid-cols-[1fr_300px]">
      <Texto />
      <Foto className="aspect-[4/5] w-full rounded-3xl shadow-xl" />
    </div>
  </header>
);

/* ── 4 ── coral cheio: o mais chamativo */
const V4 = () => (
  <header style={{ background: CORAL }}>
    <div className="mx-auto grid max-w-5xl items-center gap-10 px-6 py-14 md:grid-cols-[1fr_300px]">
      <Texto
        titulo="text-white"
        apoio="text-white/70"
        resumo="text-white/85"
        volta="text-white/60"
        eyebrow="rgba(255,255,255,0.7)"
      />
      <Foto className="aspect-[4/5] w-full rounded-3xl shadow-2xl ring-4 ring-white/30" />
    </div>
  </header>
);

/* ── 5 ── claro com bloco coral atrás da foto */
const V5 = () => (
  <header className="bg-background">
    <div className="mx-auto grid max-w-5xl items-center gap-10 px-6 py-14 md:grid-cols-[1fr_300px]">
      <Texto />
      <div className="relative">
        <span
          aria-hidden
          className="absolute -left-4 -top-4 h-full w-full rounded-3xl"
          style={{ background: CORAL }}
        />
        <Foto className="relative aspect-[4/5] w-full rounded-3xl" />
      </div>
    </div>
  </header>
);

/* ── 6 ── o degradê do hero, clareado */
const V6 = () => (
  <header
    className="animate-aurora motion-reduce:animate-none [background-size:300%_300%]"
    style={{
      backgroundImage:
        "linear-gradient(120deg, hsl(178 30% 82%), hsl(184 40% 88%) 35%, hsl(15 70% 86%) 58%, hsl(42 50% 90%) 85%, hsl(178 30% 84%))",
    }}
  >
    <div className="mx-auto grid max-w-5xl items-center gap-10 px-6 py-14 md:grid-cols-[1fr_300px]">
      <Texto titulo="text-[#0f2320]" resumo="text-[#0f2320]/75" />
      <Foto className="aspect-[4/5] w-full rounded-3xl shadow-xl" />
    </div>
  </header>
);

/* ── 7 ── creme com faixa coral no topo */
const V7 = () => (
  <header style={{ background: CREME }}>
    <div className="h-2 w-full" style={{ background: CORAL }} />
    <div className="mx-auto grid max-w-5xl items-center gap-10 px-6 py-14 md:grid-cols-[1fr_300px]">
      <Texto />
      <div className="grid gap-3">
        <Foto className="aspect-[4/3] w-full rounded-2xl" />
        <dl className="grid grid-cols-3 gap-2 text-center">
          {[
            { v: "+R$ 500 mil", l: "mobilizados" },
            { v: "+10", l: "campanhas" },
            { v: "+10 mil", l: "apoiadores" },
          ].map((n) => (
            <div key={n.l} className="rounded-xl bg-white/70 px-2 py-3">
              <dt className="font-display text-sm font-extrabold" style={{ color: CORAL }}>
                {n.v}
              </dt>
              <dd className="text-[10px] text-black/50">{n.l}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  </header>
);

/* ── 8 ── metade texto no claro, metade foto sangrando */
const V8 = () => (
  <header style={{ background: CREME }}>
    <div className="grid md:grid-cols-[1.1fr_1fr]">
      <div className="px-6 py-14 md:py-20 md:pl-10">
        <Texto />
      </div>
      <Foto className="h-72 w-full md:h-full" />
    </div>
  </header>
);

/* ── 9 ── verde claro com a foto em círculo */
const V9 = () => (
  <header className="relative overflow-hidden bg-secondary">
    <span
      aria-hidden
      className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full opacity-20"
      style={{ background: CORAL }}
    />
    <div className="relative mx-auto grid max-w-5xl items-center gap-10 px-6 py-14 md:grid-cols-[1fr_280px]">
      <Texto apoio="text-green-dark/50" resumo="text-secondary-foreground/80" eyebrow="hsl(80 15% 28%)" />
      <Foto className="aspect-square w-full rounded-full shadow-2xl ring-8 ring-white/70" />
    </div>
  </header>
);

/* ── 10 ── branco, título gigante e a foto pequena ao lado */
const V10 = () => (
  <header className="bg-background">
    <div className="mx-auto max-w-5xl px-6 py-14">
      <span className="inline-flex items-center gap-2 text-sm text-black/45">
        <ArrowLeft size={16} /> Voltar para a entrada
      </span>
      <p className="mt-8 text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: CORAL }}>
        Sobre mim
      </p>
      <h1 className="mt-3 font-display text-6xl font-bold leading-[0.9] text-green-dark md:text-[5.5rem]">
        {TITULO}
      </h1>
      <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-center">
        <Foto className="h-40 w-40 shrink-0 rounded-2xl" />
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/50">{PAPEL}</p>
          <p className="mt-3 max-w-lg text-lg leading-relaxed text-black/70">{RESUMO}</p>
        </div>
      </div>
      <div className="mt-10 h-1 w-full rounded-full" style={{ background: `linear-gradient(90deg, ${CORAL}, ${PETROLEO_MEDIO})` }} />
    </div>
  </header>
);

const TestesHeaderSobre = () => (
  <div className="min-h-screen bg-background pb-20">
    <header className="mx-auto max-w-5xl px-5 pb-4 pt-16 sm:px-6">
      <h1 className="font-display text-3xl font-bold">Topo do /sobre, versões claras</h1>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Dez topos mais claros que o atual, todos com a mesma foto e as cores do site: creme e coral
        do pôster, verde da marca, petróleo{" "}
        <span className="text-black/40">({PETROLEO})</span> só nos detalhes.
      </p>
    </header>

    <Bloco n={1} titulo="Creme" nota="O claro mais sóbrio: fundo de papel, texto verde escuro, foto com sombra.">
      <V1 />
    </Bloco>
    <Bloco n={2} titulo="Verde claro da marca" nota="O mesmo verde das seções internas. Coeso com o resto do site.">
      <V2 />
    </Bloco>
    <Bloco n={3} titulo="Degradê quente" nota="Coral clareado passando para o creme. Chama sem gritar.">
      <V3 />
    </Bloco>
    <Bloco n={4} titulo="Coral cheio" nota="O mais chamativo de todos: a cor do pôster ocupando o topo inteiro.">
      <V4 />
    </Bloco>
    <Bloco n={5} titulo="Branco com bloco coral" nota="Fundo limpo e um retângulo coral deslocado atrás da foto.">
      <V5 />
    </Bloco>
    <Bloco n={6} titulo="O degradê do hero, clareado" nota="Mesma varredura do hero da rifa, com as cores lavadas.">
      <V6 />
    </Bloco>
    <Bloco n={7} titulo="Creme com faixa e números" nota="Faixa coral no topo e os três números logo abaixo da foto.">
      <V7 />
    </Bloco>
    <Bloco n={8} titulo="Metade e metade" nota="Texto no creme e a foto sangrando até a borda, sem moldura.">
      <V8 />
    </Bloco>
    <Bloco n={9} titulo="Verde claro com foto redonda" nota="Círculo grande e um brilho coral no canto. O mais leve.">
      <V9 />
    </Bloco>
    <Bloco n={10} titulo="Branco editorial" nota="Nome gigante, foto pequena ao lado do resumo e um filete coral fechando.">
      <V10 />
    </Bloco>
  </div>
);

export default TestesHeaderSobre;
