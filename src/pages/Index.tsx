import { useSeo } from "@/lib/seo";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ConteudoRifa from "@/components/ConteudoRifa";

/* A entrada: o banner de sempre e, abaixo dele, a página da Rifa Solidária
   inteira (sem o menu próprio dela, sem a faixa do Festival ABCR e sem o hero
   dela, que repetiria uma segunda capa logo depois do banner). */
const Index = () => {
  useSeo({
    titulo: "Mateus Tafuri | Captação de recursos para projetos sociais",
    descricao:
      "Ajudo projetos sociais em comunidades isoladas a captar recursos com a metodologia Rifa Solidária. Mais de R$ 500 mil mobilizados em mais de 10 campanhas.",
    path: "/",
  });

  return (
  <div className="min-h-screen bg-background">
    <Navbar />
    <HeroSection />
    <ConteudoRifa navbar={false} faixaFestival={false} hero={false} />
  </div>
);
};

export default Index;
