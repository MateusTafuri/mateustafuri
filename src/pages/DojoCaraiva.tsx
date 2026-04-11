import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import logo from "@/assets/logo-caraiva.png";
import caseImg from "@/assets/case-caraiva-real.webp";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const DojoCaraiva = () => (
  <div className="min-h-screen bg-background text-foreground">
    <Navbar />
    <main className="max-w-4xl mx-auto px-6 py-16">
      <Link to="/#cases" className="inline-flex items-center gap-2 text-sm text-primary mb-8 hover:underline">
        <ArrowLeft size={16} /> Voltar
      </Link>
      <div className="flex items-center gap-4 mb-8">
        <img src={logo} alt="Dojo Caraíva" className="w-16 h-16 rounded-full object-cover" />
        <div>
          <h1 className="text-3xl font-bold">Dojo Caraíva</h1>
          <span className="text-xs bg-secondary text-secondary-foreground px-3 py-1 rounded-full">Rifa Solidária</span>
        </div>
      </div>
      <img src={caseImg} alt="Dojo Caraíva" className="w-full rounded-2xl mb-8 object-cover max-h-[400px]" />
      <div className="text-4xl font-bold text-primary mb-6">R$ 100 mil</div>
      <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
        <p>O Dojo Caraíva é um projeto social que leva o Jiu-Jitsu para a comunidade de Caraíva, no sul da Bahia. Através de uma campanha de rifa solidária, conseguimos arrecadar R$ 100 mil para a construção e manutenção do espaço.</p>
        <p>O projeto oferece aulas gratuitas para crianças e jovens da região, promovendo disciplina, saúde e inclusão social através da arte suave.</p>
      </div>
    </main>
    <Footer />
  </div>
);

export default DojoCaraiva;
