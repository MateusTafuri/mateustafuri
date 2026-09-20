import { useSeo } from "@/lib/seo";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HomeSobre from "@/components/HomeSobre";
import ArrecadeSection from "@/components/ArrecadeSection";
import CasesSection from "@/components/CasesSection";
import FeedbackSection from "@/components/FeedbackSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";

/* A entrada do site. Até o Festival ABCR ela era a própria página da Rifa
   Solidária repetida embaixo do banner; agora apresenta o trabalho inteiro e
   manda para as páginas — o método da rifa mora só em /rifa-solidaria. */
const Index = () => {
  useSeo({
    titulo: "Mateus Tafuri | Captação de recursos para projetos sociais",
    descricao:
      "Estratégia, mobilização e captação para projetos sociais. Mais de R$ 500 mil mobilizados em campanhas, a metodologia Rifa Solidária e a Arrecade, plataforma de doações.",
    path: "/",
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <HomeSobre />
      <ArrecadeSection />
      <CasesSection />
      <FeedbackSection />
      <CtaSection />
      <Footer />
    </div>
  );
};

export default Index;
