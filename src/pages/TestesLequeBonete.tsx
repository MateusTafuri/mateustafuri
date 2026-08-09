import type { CSSProperties } from "react";

import vTurma from "@/assets/bonete-capa-turma.webp";
import vFaixa from "@/assets/bonete-capa-faixa.webp";
import vFormatura from "@/assets/bonete-capa-formatura.webp";
import vPorDoSol from "@/assets/bonete-capa-por-do-sol.webp";

import hDeck from "@/assets/bonete-larga-deck.webp";
import hSalao from "@/assets/bonete-larga-salao.webp";
import hFormatura from "@/assets/bonete-larga-formatura.webp";
import hPraia from "@/assets/bonete-larga-praia.webp";

/* Dez arranjos para as peças que flutuam no topo do case, misturando fotos
   em pé e deitadas. Cada peça: v = 3:4, h = 16:9; a altura sai da largura. */

const VERDE = "#16281f";
const CREME = "#F4F0E6";

const V = [vTurma, vFaixa, vFormatura, vPorDoSol];
const H = [hDeck, hSalao, hFormatura, hPraia];

type Peca = {
  t: "v" | "h";
  i: number;
  w: number; // largura em px
  x: string; // left
  y: string; // top
  g: string; // giro
  z: number;
};

const ARRANJOS: { nome: string; nota: string; pecas: Peca[] }[] = [
  {
    nome: "1 · Triângulo em pé",
    nota: "As três verticais bem sobrepostas, a da frente embaixo. É o que está no ar hoje.",
    pecas: [
      { t: "v", i: 0, w: 208, x: "0%", y: "0%", g: "-6deg", z: 10 },
      { t: "v", i: 1, w: 208, x: "42%", y: "7%", g: "8deg", z: 20 },
      { t: "v", i: 2, w: 208, x: "15%", y: "40%", g: "-3deg", z: 30 },
    ],
  },
  {
    nome: "2 · Escada diagonal",
    nota: "Três em pé descendo da esquerda para a direita, com pouca sobreposição. Mais organizado, menos bagunça de mesa.",
    pecas: [
      { t: "v", i: 0, w: 190, x: "0%", y: "0%", g: "-7deg", z: 10 },
      { t: "v", i: 1, w: 190, x: "26%", y: "22%", g: "3deg", z: 20 },
      { t: "v", i: 2, w: 190, x: "52%", y: "44%", g: "-4deg", z: 30 },
    ],
  },
  {
    nome: "3 · Duas em pé, uma deitada na frente",
    nota: "As verticais atrás e uma horizontal atravessada na frente. A deitada vira a legenda visual das outras duas.",
    pecas: [
      { t: "v", i: 0, w: 190, x: "2%", y: "0%", g: "-7deg", z: 10 },
      { t: "v", i: 1, w: 190, x: "44%", y: "5%", g: "7deg", z: 20 },
      { t: "h", i: 0, w: 340, x: "8%", y: "52%", g: "-2deg", z: 30 },
    ],
  },
  {
    nome: "4 · Deitada grande com duas em pé nas pontas",
    nota: "A horizontal manda e as verticais pequenas seguram as pontas. Boa quando a foto principal é panorâmica.",
    pecas: [
      { t: "h", i: 0, w: 360, x: "6%", y: "4%", g: "-3deg", z: 20 },
      { t: "v", i: 1, w: 160, x: "0%", y: "40%", g: "-8deg", z: 30 },
      { t: "v", i: 2, w: 160, x: "52%", y: "42%", g: "7deg", z: 10 },
    ],
  },
  {
    nome: "5 · Pilha deitada",
    nota: "Só horizontais, empilhadas com deslocamento. Lembra prancha de contato, boa para mostrar sequência.",
    pecas: [
      { t: "h", i: 3, w: 340, x: "0%", y: "2%", g: "-4deg", z: 10 },
      { t: "h", i: 1, w: 340, x: "14%", y: "30%", g: "3deg", z: 20 },
      { t: "h", i: 0, w: 340, x: "4%", y: "58%", g: "-2deg", z: 30 },
    ],
  },
  {
    nome: "6 · Uma em pé na frente, duas deitadas atrás",
    nota: "As deitadas dão contexto e a vertical rouba a cena. Hierarquia mais forte de todas.",
    pecas: [
      { t: "h", i: 3, w: 300, x: "2%", y: "0%", g: "-5deg", z: 10 },
      { t: "h", i: 2, w: 300, x: "22%", y: "58%", g: "4deg", z: 20 },
      { t: "v", i: 0, w: 210, x: "28%", y: "20%", g: "2deg", z: 30 },
    ],
  },
  {
    nome: "7 · Grade 2×2 misturada",
    nota: "Duas em pé e duas deitadas nos quatro cantos, giradas de leve. Máximo de material visível, mínimo de sobreposição.",
    pecas: [
      { t: "v", i: 0, w: 165, x: "0%", y: "0%", g: "-5deg", z: 10 },
      { t: "h", i: 1, w: 240, x: "44%", y: "6%", g: "4deg", z: 20 },
      { t: "h", i: 2, w: 240, x: "0%", y: "56%", g: "3deg", z: 30 },
      { t: "v", i: 2, w: 165, x: "56%", y: "48%", g: "-4deg", z: 40 },
    ],
  },
  {
    nome: "8 · Vertical grande com deitada cruzando",
    nota: "Uma vertical dominante e uma horizontal atravessando para fora da coluna, invadindo o texto. A mais ousada.",
    pecas: [
      { t: "v", i: 0, w: 240, x: "20%", y: "0%", g: "-4deg", z: 20 },
      { t: "h", i: 2, w: 330, x: "-14%", y: "58%", g: "6deg", z: 30 },
    ],
  },
  {
    nome: "9 · L invertido",
    nota: "Deitada no topo, duas em pé embaixo em alturas diferentes. Desenha um L e sobra respiro no canto.",
    pecas: [
      { t: "h", i: 0, w: 330, x: "0%", y: "0%", g: "-3deg", z: 10 },
      { t: "v", i: 1, w: 180, x: "2%", y: "36%", g: "-7deg", z: 30 },
      { t: "v", i: 2, w: 190, x: "46%", y: "28%", g: "6deg", z: 20 },
    ],
  },
  {
    nome: "10 · Panorama com destaque",
    nota: "Uma deitada larga ocupando a coluna inteira e uma vertical pequena na frente. Fundo e figura.",
    pecas: [
      { t: "h", i: 3, w: 440, x: "0%", y: "12%", g: "-2deg", z: 10 },
      { t: "v", i: 0, w: 180, x: "32%", y: "30%", g: "5deg", z: 20 },
    ],
  },
];

const Palco = ({ pecas }: { pecas: Peca[] }) => (
  <div
    className="px-5 py-10 sm:px-6"
    style={{
      background: "linear-gradient(165deg, #0f1f18 0%, #14271e 45%, #193024 100%)",
      color: CREME,
    }}
  >
    <div className="mx-auto grid max-w-5xl items-center gap-8 md:grid-cols-[1.05fr_0.95fr]">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#F4F0E6]/45">
          Projeto
        </p>
        <p className="mt-4 text-lg text-[#F4F0E6]/70">Rifa Solidária</p>
        <h3 className="mt-1 font-display text-4xl font-extrabold leading-[0.95] md:text-6xl">
          Dojo <span className="text-[#A9C46C]">Bonete</span>
        </h3>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-[#F4F0E6]/70">
          A construção coletiva de um sonho caiçara, do outro lado do mar.
        </p>
      </div>

      <div className="relative hidden h-[500px] md:block">
        {pecas.map((p, k) => (
          <img
            key={k}
            src={(p.t === "v" ? V : H)[p.i]}
            alt=""
            aria-hidden
            loading="lazy"
            className="peca-flutuante absolute rounded-2xl object-cover shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6)]"
            style={
              {
                "--giro": p.g,
                animationDelay: `${-2.3 * k}s`,
                left: p.x,
                top: p.y,
                width: p.w,
                height: p.t === "v" ? (p.w * 4) / 3 : (p.w * 9) / 16,
                zIndex: p.z,
              } as CSSProperties
            }
          />
        ))}
      </div>
    </div>
  </div>
);

const TestesLequeBonete = () => (
  <div className="min-h-screen" style={{ backgroundColor: CREME, color: VERDE }}>
    <div className="mx-auto max-w-5xl px-5 pt-10 sm:px-6">
      <h1 className="font-display text-2xl font-bold">
        Dez arranjos para as peças do topo
      </h1>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#16281f]/65">
        Fotos em pé (3:4) e deitadas (16:9), todas flutuando. O leque só aparece a
        partir de 768px — no celular o topo segue sendo texto.
      </p>
    </div>

    {ARRANJOS.map((a) => (
      <section key={a.nome} className="pt-10">
        <div className="mx-auto max-w-5xl px-5 pb-4 sm:px-6">
          <h2 className="font-display text-xl font-bold">{a.nome}</h2>
          <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-[#16281f]/65">
            {a.nota}
          </p>
        </div>
        <Palco pecas={a.pecas} />
      </section>
    ))}

    <div className="h-16" />
  </div>
);

export default TestesLequeBonete;
