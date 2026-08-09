import type { CSSProperties } from "react";

import deck from "@/assets/bonete-larga-deck.jpg";
import salao from "@/assets/bonete-larga-salao.jpg";
import formatura from "@/assets/bonete-larga-formatura.jpg";
import praia from "@/assets/bonete-larga-praia.jpg";

/* Cinco arranjos das fotos horizontais no começo do case, todos flutuando
   como o leque do topo: sobem e descem devagar, cada peça no seu tempo. */

const VERDE = "#16281f";
const CREME = "#F4F0E6";
const LIME = "#A9C46C";

const FOTOS = [
  { src: deck, alt: "As crianças do Dojo Bonete sentadas no deck do dojo novo" },
  { src: salao, alt: "Cerimônia de graduação dentro do dojo" },
  { src: formatura, alt: "Alunos e professores enfileirados na formatura" },
  { src: praia, alt: "Vista aérea do tatame montado na areia da Praia do Bonete" },
];

/** foto flutuante: giro e atraso próprios, moldura clara como no leque */
const Peca = ({
  i,
  giro,
  atraso,
  className,
  style,
}: {
  i: number;
  giro: string;
  atraso: string;
  className?: string;
  style?: CSSProperties;
}) => (
  <img
    src={FOTOS[i].src}
    alt={FOTOS[i].alt}
    loading="lazy"
    className={`peca-flutuante border-4 border-[#F4F0E6]/90 object-cover shadow-2xl ${className || ""}`}
    style={{ "--giro": giro, animationDelay: atraso, ...style } as CSSProperties}
  />
);

/* 1 · uma peça larga, quase de ponta a ponta */
const Faixa = () => (
  <div className="mx-auto max-w-5xl px-5 py-14 sm:px-6">
    <Peca i={0} giro="-1.5deg" atraso="0s" className="h-64 w-full rounded-3xl md:h-[420px]" />
  </div>
);

/* 2 · três em fileira, cada uma pendendo para um lado */
const Fileira = () => (
  <div className="mx-auto grid max-w-5xl gap-4 px-5 py-14 sm:px-6 md:grid-cols-3">
    <Peca i={0} giro="-3deg" atraso="0s" className="h-44 w-full rounded-2xl md:h-56" />
    <Peca i={1} giro="2deg" atraso="-2.4s" className="h-44 w-full rounded-2xl md:mt-8 md:h-56" />
    <Peca i={2} giro="-2deg" atraso="-4.8s" className="h-44 w-full rounded-2xl md:h-56" />
  </div>
);

/* 3 · uma grande e duas empilhadas ao lado */
const Mosaico = () => (
  <div className="mx-auto grid max-w-5xl gap-4 px-5 py-14 sm:px-6 md:grid-cols-[1.6fr_1fr]">
    <Peca i={0} giro="-2deg" atraso="0s" className="h-64 w-full rounded-3xl md:h-[420px]" />
    <div className="grid gap-4">
      <Peca i={1} giro="2.5deg" atraso="-2.4s" className="h-40 w-full rounded-3xl md:h-[196px]" />
      <Peca i={2} giro="-2.5deg" atraso="-4.8s" className="h-40 w-full rounded-3xl md:h-[196px]" />
    </div>
  </div>
);

/* 4 · empilhadas em cascata, uma por cima da outra */
const Cascata = () => (
  <div className="mx-auto max-w-5xl px-5 py-14 sm:px-6">
    <div className="relative h-[300px] md:h-[440px]">
      <Peca
        i={3}
        giro="-4deg"
        atraso="0s"
        className="absolute h-40 w-[68%] rounded-2xl md:h-56"
        style={{ left: "0%", top: "0%", zIndex: 10 }}
      />
      <Peca
        i={1}
        giro="3deg"
        atraso="-2.4s"
        className="absolute h-40 w-[58%] rounded-2xl md:h-56"
        style={{ right: "0%", top: "22%", zIndex: 20 }}
      />
      <Peca
        i={0}
        giro="-2deg"
        atraso="-4.8s"
        className="absolute h-44 w-[72%] rounded-2xl md:h-64"
        style={{ left: "8%", bottom: "0%", zIndex: 30 }}
      />
    </div>
  </div>
);

/* 5 · foto de fundo com o texto por cima, a moldura inteira flutuando */
const Imersiva = () => (
  <div className="mx-auto max-w-5xl px-5 py-14 sm:px-6">
    <div className="peca-flutuante relative overflow-hidden rounded-3xl shadow-2xl">
      <img
        src={FOTOS[0].src}
        alt={FOTOS[0].alt}
        className="h-72 w-full object-cover md:h-[460px]"
        loading="lazy"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(15,31,24,0.95) 0%, rgba(15,31,24,0.4) 50%, rgba(15,31,24,0) 100%)",
        }}
      />
      <div className="absolute inset-x-0 bottom-0 p-6 md:p-10" style={{ color: CREME }}>
        <p className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: LIME }}>
          Ilhabela · SP · 2024 – 2025
        </p>
        <h3 className="mt-2 font-display text-2xl font-extrabold md:text-4xl">
          Um dojo levantado do outro lado do mar
        </h3>
      </div>
    </div>
  </div>
);

const VERSOES = [
  {
    id: "faixa",
    nome: "1 · Peça larga",
    nota: "Uma foto só, quase de ponta a ponta, com giro mínimo. O jeito mais calmo: uma mensagem, muito respiro.",
    Render: Faixa,
  },
  {
    id: "fileira",
    nome: "2 · Fileira desalinhada",
    nota: "Três lado a lado, a do meio mais baixa e cada uma pendendo para um lado. Conta obra, aula e formatura de uma vez.",
    Render: Fileira,
  },
  {
    id: "mosaico",
    nome: "3 · Mosaico assimétrico",
    nota: "A principal grande e duas menores ao lado, as três flutuando em tempos diferentes. Hierarquia clara.",
    Render: Mosaico,
  },
  {
    id: "cascata",
    nome: "4 · Cascata sobreposta",
    nota: "Três empilhadas se cobrindo, como fotos jogadas na mesa. É o que mais lembra o leque do topo.",
    Render: Cascata,
  },
  {
    id: "imersiva",
    nome: "5 · Imersiva com texto",
    nota: "A foto vira cartão com degradê e frase por cima, e o cartão inteiro flutua. A mais cinematográfica.",
    Render: Imersiva,
  },
];

const TestesCapaBonete = () => (
  <div className="min-h-screen" style={{ backgroundColor: CREME, color: VERDE }}>
    <div className="mx-auto max-w-5xl px-5 pt-10 sm:px-6">
      <h1 className="font-display text-2xl font-bold">
        Cinco arranjos flutuantes para as fotos horizontais
      </h1>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#16281f]/65">
        Mesmas quatro fotos em todos: a turma no deck, a cerimônia no salão, a formatura
        e o drone da praia. Todas sobem e descem como as peças do topo.
      </p>
    </div>

    {VERSOES.map((v) => (
      <section key={v.id} className="pt-10">
        <div className="mx-auto max-w-5xl px-5 sm:px-6">
          <h2 className="font-display text-xl font-bold">{v.nome}</h2>
          <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-[#16281f]/65">
            {v.nota}
          </p>
        </div>
        {/* faixa escura simulando o fim do hero, para ver a emenda */}
        <div className="mt-5 h-10 w-full" style={{ backgroundColor: VERDE }} />
        <v.Render />
      </section>
    ))}

    <div className="h-20" />
  </div>
);

export default TestesCapaBonete;
