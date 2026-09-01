import { ArrowRight } from "lucide-react";

import tatame from "@/assets/story-18.webp";
import rifa1 from "@/assets/caraiva-rifa-1.webp";
import rifa2 from "@/assets/caraiva-rifa-2.webp";
import campeonato from "@/assets/story-20.webp";
import praia from "@/assets/story-13.webp";

/* Cinco banners para o topo do guia "Como estruturar a sua rifa solidária no
   digital", todos com foto do Mateus. Página de teste: nada em uso ainda. */

const PETROLEO = "hsl(176 39% 14%)";
const CORAL = "hsl(15 65% 56%)";

const TITULO = "Como estruturar a sua rifa solidária no digital";
const SUB = "As cinco etapas, destrinchadas, com os números de três campanhas reais.";
const FICHA = [
  { r: "O método", v: "Cinco etapas" },
  { r: "Do começo ao sorteio", v: "4 a 5 meses" },
  { r: "Testado em", v: "+10 campanhas" },
  { r: "Mobilizados", v: "+R$ 500 mil" },
];

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
    {children}
  </section>
);

const Ficha = ({ escuro = true }: { escuro?: boolean }) => (
  <dl
    className={`mt-8 flex flex-wrap gap-x-10 gap-y-5 border-t border-dashed pt-6 ${
      escuro ? "border-white/20" : "border-black/15"
    }`}
  >
    {FICHA.map((f) => (
      <div key={f.r}>
        <dt
          className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${
            escuro ? "text-white/40" : "text-black/40"
          }`}
        >
          {f.r}
        </dt>
        <dd className={`mt-1 text-sm font-semibold ${escuro ? "text-white" : "text-black"}`}>
          {f.v}
        </dd>
      </div>
    ))}
  </dl>
);

/* ── 1. card claro sobreposto na foto ── */
const V1 = () => (
  <header className="relative">
    <img
      src={praia}
      alt="Mateus com as crianças do projeto na praia"
      className="h-[380px] w-full object-cover object-[center_35%] md:h-[460px]"
    />
    <div className="absolute inset-0 bg-black/25" />
    <div className="mx-auto max-w-5xl px-6">
      <div className="relative -mt-28 rounded-3xl bg-background p-8 shadow-2xl md:-mt-32 md:max-w-2xl md:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: CORAL }}>
          Guia completo e gratuito
        </p>
        <h1 className="mt-3 font-display text-3xl font-bold leading-[1.1] md:text-[2.75rem]">
          {TITULO}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">{SUB}</p>
        <Ficha escuro={false} />
      </div>
    </div>
  </header>
);

/* ── 2. tríptico: foto, texto, foto ── */
const V2 = () => (
  <header style={{ background: PETROLEO }}>
    <div className="grid md:grid-cols-[1fr_2fr_1fr]">
      <img
        src={tatame}
        alt="Mateus no tatame com as crianças"
        className="hidden h-full w-full object-cover object-[40%_35%] md:block"
      />
      <div className="px-6 py-16 text-center md:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: CORAL }}>
          Guia completo e gratuito
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold leading-[1.08] text-white md:text-5xl">
          {TITULO}
        </h1>
        <p className="mx-auto mt-4 max-w-md text-lg text-white/65">{SUB}</p>
        <dl className="mx-auto mt-8 grid max-w-md grid-cols-2 gap-5 border-t border-dashed border-white/20 pt-6 text-left">
          {FICHA.map((f) => (
            <div key={f.r}>
              <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
                {f.r}
              </dt>
              <dd className="mt-1 text-sm font-semibold text-white">{f.v}</dd>
            </div>
          ))}
        </dl>
      </div>
      <img
        src={rifa1}
        alt="Mateus e uma aluna com o cartaz da rifa"
        className="hidden h-full w-full object-cover md:block"
      />
    </div>
  </header>
);

/* ── 3. fundo claro, foto em faixa panorâmica ── */
const V3 = () => (
  <header className="bg-secondary">
    <div className="mx-auto max-w-4xl px-6 pb-10 pt-16 md:pt-20">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
        Guia completo e gratuito
      </p>
      <h1 className="mt-3 font-display text-4xl font-bold leading-[1.08] text-green-dark md:text-[3.25rem]">
        {TITULO}
      </h1>
      <p className="mt-4 max-w-xl text-lg text-secondary-foreground/75">{SUB}</p>
      <Ficha escuro={false} />
    </div>
    <img
      src={campeonato}
      alt="Mateus com os atletas do projeto depois do campeonato"
      className="h-48 w-full object-cover object-[center_40%] md:h-64"
    />
  </header>
);

/* ── 4. título gigante com a foto encaixada no texto ── */
const V4 = () => (
  <header style={{ background: PETROLEO }}>
    <div className="mx-auto max-w-4xl px-6 py-16 md:py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: CORAL }}>
        Guia completo e gratuito
      </p>
      <h1 className="mt-3 font-display text-[2.6rem] font-bold leading-[1.02] text-white md:text-[4rem]">
        {TITULO}
      </h1>

      <div className="mt-8 md:flex md:items-start md:gap-8">
        <img
          src={rifa2}
          alt="Mateus e uma aluna de kimono com o cartaz da rifa"
          className="mb-5 h-48 w-full rounded-2xl object-cover object-[center_30%] ring-1 ring-white/10 md:mb-0 md:h-56 md:w-56 md:shrink-0"
        />
        <div>
          <p className="text-lg leading-relaxed text-white/65">{SUB}</p>
          <Ficha />
        </div>
      </div>
    </div>
  </header>
);

/* ── 5. grade de quatro fotos ao lado do texto ── */
const V5 = () => (
  <header style={{ background: PETROLEO }}>
    <div className="mx-auto grid max-w-5xl items-center gap-10 px-6 py-16 md:grid-cols-[1fr_300px] md:py-20">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: CORAL }}>
          Guia completo e gratuito
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold leading-[1.08] text-white md:text-5xl">
          {TITULO}
        </h1>
        <p className="mt-4 max-w-md text-lg text-white/65">{SUB}</p>
        <Ficha />
      </div>

      <div className="grid grid-cols-2 gap-2">
        {[tatame, rifa1, campeonato, praia].map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            className="aspect-square w-full rounded-xl object-cover ring-1 ring-white/10"
            style={{ objectPosition: i === 0 ? "40% 35%" : "center 35%" }}
          />
        ))}
      </div>
    </div>
  </header>
);

const TestesBannerGuia = () => (
  <div className="min-h-screen bg-background pb-20">
    <header className="mx-auto max-w-5xl px-5 pb-4 pt-16 sm:px-6">
      <h1 className="font-display text-3xl font-bold">Banner do guia da rifa no digital</h1>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Cinco topos para a página <code>/como-estruturar-rifa-solidaria-digital</code>, todos com
        foto sua.
      </p>
    </header>

    <Bloco n={1} titulo="Card claro sobreposto na foto" nota="A foto abre a página inteira e o título vem num cartão claro subindo por cima dela.">
      <V1 />
    </Bloco>
    <Bloco n={2} titulo="Tríptico: foto, texto, foto" nota="Duas colunas de foto segurando o título no meio. Simétrico e cheio.">
      <V2 />
    </Bloco>
    <Bloco n={3} titulo="Fundo claro com faixa panorâmica" nota="Sai do escuro: verde claro com o título em cima e a foto larga fechando embaixo.">
      <V3 />
    </Bloco>
    <Bloco n={4} titulo="Título gigante com a foto encaixada" nota="O título ocupa tudo e a foto entra abaixo, ao lado do resumo. Bem de revista.">
      <V4 />
    </Bloco>
    <Bloco n={5} titulo="Grade de quatro fotos" nota="Quatro quadrados organizados ao lado do texto, conversando com o mosaico do sobre.">
      <V5 />
    </Bloco>
  </div>
);

export default TestesBannerGuia;
