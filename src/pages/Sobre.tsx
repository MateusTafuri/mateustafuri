import { Voltar } from "@/components/Voltar";
import { Link } from "react-router-dom";
import { useSeo } from "@/lib/seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CaseNav } from "@/components/CaseParts";
import StorySection from "@/components/StorySection";
import TimelineSection from "@/components/TimelineSection";
import CasesSection from "@/components/CasesSection";
import ServicesSection from "@/components/ServicesSection";
import FeedbackSection from "@/components/FeedbackSection";
import CtaSection from "@/components/CtaSection";

import NumeroAnimado from "@/components/NumeroAnimado";

import retrato from "@/assets/story-18.webp";

/* os mesmos quatro números que abrem a Rifa Solidária */
const NUMEROS = [
  { v: "+R$ 500 mil", l: "mobilizados em rifas" },
  { v: "+10", l: "campanhas conduzidas" },
  { v: "+10.000", l: "apoiadores conquistados" },
  { v: "3,6 mi", l: "pessoas alcançadas" },
];

/* Tudo que saiu da entrada mora aqui: história, trajetória, campanhas,
   serviços e depoimentos. A home ficou só com o banner e um resumo. */

const Sobre = () => {
  useSeo({
    titulo: "Sobre Mateus Tafuri | Estratégia e captação para projetos sociais",
    descricao:
      "Engenheiro de produção de formação e cinco anos de terceiro setor. Estruturo campanhas de captação de recursos com marketing digital para projetos em comunidades isoladas.",
    path: "/sobre",
  });

  return (
  <div className="min-h-screen bg-background">
    <Navbar textoEscuro />

    {/* verde claro da marca, o mesmo da trajetória e da barra de navegação */}
    <header className="relative overflow-hidden bg-secondary">
      <div className="relative mx-auto grid max-w-5xl items-end gap-10 px-6 pt-28 md:grid-cols-[1fr_320px] md:pt-32">
        <div>
          <Voltar
            fallback="/"
            className="inline-flex items-center gap-2 text-sm text-[#0f2320]/50 transition-colors hover:text-[#0f2320]"
          />

          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            Sobre mim
          </p>
          <h1 className="mt-2 font-display text-5xl font-extrabold leading-[0.95] tracking-tight text-[#0f2320] md:text-7xl">
            Mateus Tafuri
          </h1>
          <ul className="mt-5 flex flex-wrap gap-2">
            {["Estratégia", "Mobilização", "Captação de recursos"].map((t) => (
              <li
                key={t}
                className="rounded-full bg-white/60 px-3.5 py-1.5 text-xs font-semibold text-[#0f2320]/75 ring-1 ring-[#0f2320]/10"
              >
                {t}
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-lg text-xl leading-relaxed text-[#0f2320]/75">
            Estruturo campanhas de captação de recursos com marketing digital.
          </p>
        </div>

        <img
          src={retrato}
          alt="Mateus agachado no tatame com as crianças do projeto"
          width={900}
          height={1200}
          className="aspect-[4/5] w-full max-w-[260px] rounded-3xl object-cover object-[40%_35%] shadow-2xl ring-1 ring-white/40 md:max-w-none"
        />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 pb-14 pt-10">
        <dl className="grid grid-cols-2 gap-4 border-t border-dashed border-[#0f2320]/20 pt-6 md:grid-cols-4">
          {NUMEROS.map((n) => (
            <div key={n.l}>
              <dt className="font-display text-2xl font-extrabold text-primary md:text-3xl">
                <NumeroAnimado valor={n.v} />
              </dt>
              <dd className="mt-1 text-xs leading-snug text-[#0f2320]/55">{n.l}</dd>
            </div>
          ))}
        </dl>
      </div>
    </header>

    {/* mesma barra dos cases: gruda no topo e acompanha a leitura */}
    <CaseNav
      fundo="border-[#0f2320]/10 bg-secondary/95"
      secoes={[
        { id: "historia", label: "História" },
        { id: "trajetoria", label: "Trajetória" },
        { id: "cases", label: "Campanhas" },
        { id: "servicos", label: "Serviços" },
        { id: "feedbacks", label: "Depoimentos" },
      ]}
    />

    <StorySection />

    <div className="bg-secondary">
      <TimelineSection />
    </div>

    <CasesSection />

    <div className="bg-secondary">
      <ServicesSection />
    </div>

    <FeedbackSection />

    <CtaSection />
    <Footer />
  </div>
);
};

export default Sobre;
