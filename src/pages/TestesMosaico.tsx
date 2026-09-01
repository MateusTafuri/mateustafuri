import story2 from "@/assets/story-2.webp";
import story4 from "@/assets/story-4.webp";
import story9 from "@/assets/story-9.webp";
import story10 from "@/assets/story-10.webp";
import story11 from "@/assets/story-11.webp";
import story13 from "@/assets/story-13.webp";
import story16 from "@/assets/story-16.webp";
import story18 from "@/assets/story-18.webp";
import story20 from "@/assets/story-20.webp";
import story21 from "@/assets/story-21.webp";

/* Cinco mosaicos para as fotos de "Minha história", no lugar do carrossel
   que anda sozinho. Página de teste: nada aqui está em uso ainda. */

const FOTOS = [
  { src: story10, pos: "center 25%" },
  { src: story11, pos: "center 25%" },
  { src: story2, pos: "center 25%" },
  { src: story4, pos: "center 25%" },
  { src: story9, pos: "center 25%" },
  { src: story13, pos: "center 25%" },
  { src: story16, pos: "center 70%" },
  { src: story18, pos: "center 25%" },
  { src: story20, pos: "center 60%" },
  { src: story21, pos: "center 25%" },
];

const CORAL = "hsl(15 65% 56%)";

const Foto = ({
  f,
  className = "",
}: {
  f: (typeof FOTOS)[number];
  className?: string;
}) => (
  <img
    src={f.src}
    alt=""
    loading="lazy"
    className={`h-full w-full rounded-2xl object-cover ${className}`}
    style={{ objectPosition: f.pos }}
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
  <section className="border-t border-black/10 py-14">
    <div className="mx-auto mb-8 max-w-5xl px-5 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: CORAL }}>
        Versão {n}
      </p>
      <h2 className="mt-1 text-xl font-bold">{titulo}</h2>
      <p className="mt-1 text-sm text-black/50">{nota}</p>
    </div>
    <div className="mx-auto max-w-5xl px-5 sm:px-6">{children}</div>
  </section>
);

/* ── 1. uma grande e quatro ao lado ── */
const V1 = () => (
  <div className="grid gap-3 md:grid-cols-2">
    <div className="h-[300px] md:h-[420px]">
      <Foto f={FOTOS[0]} />
    </div>
    <div className="grid grid-cols-2 gap-3">
      {FOTOS.slice(1, 5).map((f, i) => (
        <div key={i} className="h-[145px] md:h-[204px]">
          <Foto f={f} />
        </div>
      ))}
    </div>
  </div>
);

/* ── 2. colunas em cascata, alturas alternadas ── */
const V2 = () => (
  <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
    {FOTOS.slice(0, 8).map((f, i) => (
      <div key={i} className={i % 2 ? "h-[180px] md:h-[220px]" : "h-[240px] md:h-[300px]"}>
        <Foto f={f} />
      </div>
    ))}
  </div>
);

/* ── 3. mosaico irregular, uma foto ocupa quatro células ── */
const V3 = () => (
  <div className="grid auto-rows-[110px] grid-cols-3 gap-3 md:auto-rows-[150px] md:grid-cols-4">
    <div className="col-span-2 row-span-2">
      <Foto f={FOTOS[0]} />
    </div>
    <div>
      <Foto f={FOTOS[1]} />
    </div>
    <div className="row-span-2">
      <Foto f={FOTOS[2]} />
    </div>
    <div>
      <Foto f={FOTOS[3]} />
    </div>
    <div className="col-span-2">
      <Foto f={FOTOS[4]} />
    </div>
    <div>
      <Foto f={FOTOS[5]} />
    </div>
    <div className="row-span-2">
      <Foto f={FOTOS[6]} />
    </div>
    <div className="col-span-2">
      <Foto f={FOTOS[7]} />
    </div>
    <div>
      <Foto f={FOTOS[8]} />
    </div>
  </div>
);

/* ── 4. muro de quadrados, todas do mesmo tamanho ── */
const V4 = () => (
  <div className="grid grid-cols-3 gap-2 md:grid-cols-5">
    {FOTOS.map((f, i) => (
      <div key={i} className="aspect-square">
        <Foto f={f} className="rounded-xl" />
      </div>
    ))}
  </div>
);

/* ── 5. colunas independentes, alturas naturais ── */
const V5 = () => (
  <div className="columns-2 gap-3 md:columns-3 [&>*]:mb-3">
    {FOTOS.map((f, i) => (
      <img
        key={i}
        src={f.src}
        alt=""
        loading="lazy"
        className="w-full break-inside-avoid rounded-2xl object-cover"
        style={{ objectPosition: f.pos, height: [260, 190, 320, 230][i % 4] }}
      />
    ))}
  </div>
);

const TestesMosaico = () => (
  <div className="min-h-screen bg-background pb-20">
    <header className="mx-auto max-w-5xl px-5 pb-4 pt-16 sm:px-6">
      <h1 className="font-display text-3xl font-bold">Mosaico de “Minha história”</h1>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Cinco arranjos parados para as mesmas dez fotos, no lugar do carrossel que anda
        sozinho.
      </p>
    </header>

    <Bloco n={1} titulo="Uma grande e quatro ao lado" nota="Hierarquia clara: uma foto conduz, as outras acompanham.">
      <V1 />
    </Bloco>
    <Bloco n={2} titulo="Faixa de alturas alternadas" nota="Uma linha só, com o pé desencontrado. Mantém o ar de tira do carrossel, mas parada.">
      <V2 />
    </Bloco>
    <Bloco n={3} titulo="Mosaico irregular" nota="Blocos de tamanhos diferentes encaixados. É o mais próximo de mosaico de verdade.">
      <V3 />
    </Bloco>
    <Bloco n={4} titulo="Muro de quadrados" nota="Todas do mesmo tamanho, como um feed. Simples e organizado.">
      <V4 />
    </Bloco>
    <Bloco n={5} titulo="Colunas soltas" nota="Alturas variadas em colunas, estilo Pinterest. O mais informal.">
      <V5 />
    </Bloco>
  </div>
);

export default TestesMosaico;
