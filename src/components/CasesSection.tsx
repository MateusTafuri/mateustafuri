import caseCaraiva from "@/assets/case-caraiva-real.webp";
import caseCorumbau from "@/assets/case-corumbau-real.webp";
import caseBonete from "@/assets/case-bonete-real.webp";
import logoCaraiva from "@/assets/logo-caraiva.png";
import logoBonete from "@/assets/logo-bonete.png";
import logoCorumbau from "@/assets/logo-corumbau.png";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const cases = [
  { img: caseBonete, logo: logoBonete, name: "Dojo Bonete", desc: "Uma comunidade isolada, um professor de jiu jitsu e um sonho que construíram muito mais que um espaço.", stats: ["+2M de views", "+R$ 152 mil captados"], path: "/dojo-bonete" },
  { img: caseCorumbau, logo: logoCorumbau, name: "Corumbau BJJ", desc: "4.500 apoiadores e um projeto que provou que o esporte transforma vidas, mesmo longe de tudo.", stats: ["+1M de views", "+R$ 159 mil captados"], path: "/corumbau-bjj" },
  { img: caseCaraiva, logo: logoCaraiva, name: "Dojo Caraíva", desc: "Quando estratégia encontra propósito, o simples vira poderoso. Uma campanha que mostrou que qualquer causa pode ir além do que parece possível.", stats: ["+3M de views", "+R$ 100 mil captados"], path: "/dojo-caraiva" },
];

const CasesSection = () => {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16" id="cases">
      <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
        Realidades Transformadas
      </p>
      <h2 className="text-2xl md:text-3xl font-bold mb-8">
        Campanhas que geraram resultado real
      </h2>
      <div className="flex gap-5 overflow-x-auto pb-2">
        {cases.map((c) => (
          <Link
            key={c.name}
            to={c.path}
            className="min-w-[280px] flex-1 rounded-2xl overflow-hidden border border-border bg-card shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-200 cursor-pointer group no-underline text-foreground"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={c.img}
                alt={c.name}
                loading="lazy"
                width={800}
                height={600}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <img src={c.logo} alt="" className="w-6 h-6 rounded-full object-cover" />
                <span className="text-sm font-semibold">{c.name}</span>
                <ArrowRight size={16} className="ml-auto text-primary" />
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">{c.desc}</p>
              <div className="flex gap-3">
                {c.stats.map((s) => (
                  <span key={s} className="text-[10px] text-muted-foreground/70 font-medium">{s}</span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CasesSection;
