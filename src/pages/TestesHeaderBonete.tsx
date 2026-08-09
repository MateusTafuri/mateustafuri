import BoneteHero from "@/components/BoneteHero";

import inauguracao from "@/assets/bonete-inauguracao.webp";
import rifaGrupo from "@/assets/bonete-rifa-grupo.webp";
import turma from "@/assets/bonete-turma.webp";

/* As duas versões do leque no topo do case, uma embaixo da outra.
   A · capas dos carrosséis da campanha · B · fotos do projeto. */

const VERSOES = [
  {
    id: "capas",
    nome: "A · Capas dos carrosséis",
    nota: "Tijolo em tijolo, Jiu-jitsu e O impacto. Mostra logo de cara que o case tem peça de campanha, e as artes já carregam texto.",
    pecas: [
      "/carrosseis/tijolo-em-tijolo/1.jpg",
      "/carrosseis/jiu-jitsu/1.jpg",
      "/carrosseis/o-impacto/1.jpg",
    ],
  },
  {
    id: "fotos",
    nome: "B · Fotos do projeto",
    nota: "Inauguração, a rifa na mão da comunidade e a turma. Vende o lugar e as pessoas antes de vender o trabalho de campanha.",
    pecas: [inauguracao, rifaGrupo, turma],
  },
];

const TestesHeaderBonete = () => (
  <div className="min-h-screen bg-[#F4F0E6] text-[#16281f]">
    {VERSOES.map((v) => (
      <section key={v.id}>
        <div className="mx-auto max-w-5xl px-5 pt-10 sm:px-6">
          <h2 className="font-display text-2xl font-bold">{v.nome}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#16281f]/65">
            {v.nota}
          </p>
          <p className="mt-2 text-xs text-[#16281f]/45">
            O leque só aparece a partir de 768px: no celular o topo continua sendo
            texto e a foto larga.
          </p>
        </div>
        <div className="mt-6">
          <BoneteHero pecas={v.pecas} />
        </div>
      </section>
    ))}
  </div>
);

export default TestesHeaderBonete;
