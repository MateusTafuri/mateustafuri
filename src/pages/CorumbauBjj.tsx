import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import logo from "@/assets/logo-corumbau.png";
import caseImg from "@/assets/case-corumbau-real.webp";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const CorumbauBjj = () => (
  <div className="min-h-screen bg-background text-foreground">
    <Navbar />
    <main className="max-w-4xl mx-auto px-6 py-16">
      <Link to="/#cases" className="inline-flex items-center gap-2 text-sm text-primary mb-8 hover:underline">
        <ArrowLeft size={16} /> Voltar
      </Link>
      <div className="flex items-center gap-4 mb-8">
        <img src={logo} alt="Corumbau BJJ" className="w-16 h-16 rounded-full object-cover" />
        <div>
          <h1 className="text-3xl font-bold">Corumbau BJJ</h1>
          <span className="text-xs bg-secondary text-secondary-foreground px-3 py-1 rounded-full">Rifa Solidária</span>
        </div>
      </div>
      <img src={caseImg} alt="Corumbau BJJ" className="w-full rounded-2xl mb-8 object-cover max-h-[400px]" />
      <div className="text-4xl font-bold text-primary mb-6">R$ 159.493,60</div>
      <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
        <p>O Corumbau BJJ Team, liderado por Diego Oliveira, é um projeto que leva o Jiu-Jitsu para a comunidade de Corumbau, na Bahia. A campanha de rifa solidária arrecadou R$ 159.493,60 para sustentar as atividades do projeto.</p>
        <p>O time forma atletas e cidadãos, usando o Jiu-Jitsu como ferramenta de transformação social e desenvolvimento pessoal.</p>
      </div>
    </main>
    <Footer />
  </div>
);

export default CorumbauBjj;
