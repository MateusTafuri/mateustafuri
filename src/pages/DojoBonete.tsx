import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import logo from "@/assets/logo-bonete.png";
import caseImg from "@/assets/case-bonete-real.webp";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const DojoBonete = () => (
  <div className="min-h-screen bg-background text-foreground">
    <Navbar />
    <main className="max-w-4xl mx-auto px-6 py-16">
      <Link to="/#cases" className="inline-flex items-center gap-2 text-sm text-primary mb-8 hover:underline">
        <ArrowLeft size={16} /> Voltar
      </Link>
      <div className="flex items-center gap-4 mb-8">
        <img src={logo} alt="Dojô Bonete" className="w-16 h-16 rounded-full object-cover" />
        <div>
          <h1 className="text-3xl font-bold">Dojo Bonete</h1>
          <span className="text-xs bg-secondary text-secondary-foreground px-3 py-1 rounded-full">Rifa Solidária</span>
        </div>
      </div>
      <img src={caseImg} alt="Dojo Bonete" className="w-full rounded-2xl mb-8 object-cover max-h-[400px]" />
      <div className="text-4xl font-bold text-primary mb-6">R$ 152.678,93</div>
      <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
        <p>O Dojô Bonete é um projeto de Jiu-Jitsu localizado em Ilhabela, São Paulo. Através de uma rifa solidária, arrecadamos R$ 152.678,93 para apoiar as atividades do dojo e expandir o alcance do projeto na comunidade.</p>
        <p>O projeto transforma vidas através do esporte, oferecendo uma alternativa saudável e disciplinadora para jovens da região.</p>
      </div>
    </main>
    <Footer />
  </div>
);

export default DojoBonete;
