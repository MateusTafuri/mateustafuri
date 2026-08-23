import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ConteudoRifa from "@/components/ConteudoRifa";

/* A entrada: o banner de sempre e, abaixo dele, a página da Rifa Solidária
   inteira (sem o menu próprio dela e sem a faixa do Festival ABCR). */
const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <HeroSection />
    <ConteudoRifa navbar={false} faixaFestival={false} />
  </div>
);

export default Index;
