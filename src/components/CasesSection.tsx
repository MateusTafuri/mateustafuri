import caseCaraiva from "@/assets/case-caraiva-real.webp";
import caseCorumbau from "@/assets/case-corumbau-real.webp";
import caseBonete from "@/assets/case-bonete-real.webp";
import logoCaraiva from "@/assets/logo-caraiva.png";
import logoBonete from "@/assets/logo-bonete.png";
import logoCorumbau from "@/assets/logo-corumbau.png";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const cases = [
  { img: caseCaraiva, logo: logoCaraiva, name: "Dojo Caraíva", value: "R$ 100 mil", tag: "Rifa Solidária", path: "/dojo-caraiva" },
  { img: caseCorumbau, logo: logoCorumbau, name: "Corumbau BJJ", value: "R$ 159.493,60", tag: "Rifa Solidária", path: "/corumbau-bjj" },
  { img: caseBonete, logo: logoBonete, name: "Dojo Bonete", value: "R$ 152.678,93", tag: "Rifa Solidária", path: "/dojo-bonete" },
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
              <div className="flex items-center gap-2 mb-1">
                <img src={c.logo} alt="" className="w-6 h-6 rounded-full object-cover" />
                <span className="text-sm font-semibold">{c.name}</span>
                <ArrowRight size={16} className="ml-auto text-primary" />
              </div>
              <div className="text-2xl font-bold text-primary mb-1">{c.value}</div>
              <span className="text-xs bg-secondary text-secondary-foreground px-3 py-1 rounded-full">
                {c.tag}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CasesSection;
