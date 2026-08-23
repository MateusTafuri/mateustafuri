import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StorySection from "@/components/StorySection";
import TimelineSection from "@/components/TimelineSection";
import ServicesSection from "@/components/ServicesSection";
import FeedbackSection from "@/components/FeedbackSection";
import CtaSection from "@/components/CtaSection";

import retrato from "@/assets/story-16.webp";

/* A página que recebe a biografia que hoje mora na entrada: história,
   trajetória, o que faço e os depoimentos completos. */

const NUMEROS = [
  { v: "R$ 415 mil", l: "captados para projetos sociais" },
  { v: "3", l: "campanhas conduzidas" },
  { v: "9.600+", l: "apoiadores conquistados" },
];

const TestesSobre = () => (
  <div className="min-h-screen bg-background">
    <Navbar />

    {/* ───────── TOPO ───────── */}
    <header className="border-b border-border bg-secondary">
      <div className="mx-auto grid max-w-5xl items-center gap-8 px-6 pb-14 pt-28 md:grid-cols-[1fr_320px] md:pt-32">
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground no-underline transition-colors hover:text-primary"
          >
            <ArrowLeft size={16} /> Voltar para a entrada
          </Link>

          <p className="mt-8 text-xs font-semibold uppercase tracking-widest text-primary">
            Sobre mim
          </p>
          <h1 className="mt-2 font-display text-4xl font-bold leading-tight md:text-5xl">
            Mateus Tafuri
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-secondary-foreground/75">
            Trabalho com captação de recursos para projetos sociais em comunidades
            isoladas. Moro onde a campanha acontece, escrevo a história junto com quem
            vive ela e cuido da operação até o dinheiro virar obra.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-4 border-t border-border pt-6">
            {NUMEROS.map((n) => (
              <div key={n.l}>
                <p className="font-display text-xl font-extrabold text-primary md:text-2xl">
                  {n.v}
                </p>
                <p className="mt-0.5 text-xs leading-snug text-muted-foreground">{n.l}</p>
              </div>
            ))}
          </div>
        </div>

        <img
          src={retrato}
          alt="Mateus Tafuri"
          className="aspect-[3/4] w-full rounded-3xl object-cover shadow-lg"
          loading="lazy"
        />
      </div>
    </header>

    <StorySection />

    <div className="bg-secondary">
      <TimelineSection />
    </div>

    <ServicesSection />

    <FeedbackSection titulo="O que dizem sobre minhas campanhas" />

    <CtaSection />
    <Footer />
  </div>
);

export default TestesSobre;
