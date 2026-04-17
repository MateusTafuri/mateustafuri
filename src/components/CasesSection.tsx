import caseCaraiva from "@/assets/case-caraiva-v2.jpg";
import caseCorumbau from "@/assets/case-corumbau.jpg";
import caseBonete from "@/assets/case-bonete-v3.jpg";
import logoCaraiva from "@/assets/logo-caraiva.png";
import logoBonete from "@/assets/logo-bonete.png";
import logoCorumbau from "@/assets/logo-corumbau.png";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const cases = [
  { img: caseCaraiva, logo: logoCaraiva, name: "Projeto Social l Dojo Caraíva", desc: "Quando a estratégia encontra propósito, o simples encanta, engaja, transforma e realiza.", stats: ["+1 milhão de views", "3.183 novos apoiadores", "100 mil captados"], path: "/dojo-caraiva" },
  { img: caseBonete, logo: logoBonete, name: "Projeto Social l Dojo Bonete", desc: "Uma comunidade isolada, um professor de jiu jitsu e um sonho que construíram muito mais que um espaço.", stats: ["+1.2 milhões de views", "2.077 novos apoiadores", "+150 mil captados"], path: "/dojo-bonete", imgPosition: "center 50%" },
  { img: caseCorumbau, logo: logoCorumbau, name: "Projeto Social l Corumbau BJJ", desc: "101 dias de campanha, persistência e fé. Um projeto que provou que o esporte muda tudo, mesmo longe de tudo.", stats: ["+1.8 milhões de views", "4.377 novos apoiadores", "+160 mil captados"], path: "/corumbau-bjj", imgPosition: "center 65%" },
];

const CasesSection = () => {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16" id="cases">
      <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
        Realidades Transformadas
      </p>
      <h2 className="text-2xl md:text-3xl font-bold mb-8">
        Estratégia, narrativa e mobilização na prática
      </h2>
      <div className="flex gap-5 overflow-x-auto pb-2">
        {cases.map((c) => (
          <Link
            key={c.name}
            to={c.path}
            className="min-w-[280px] flex-1 rounded-2xl overflow-hidden border border-border bg-card shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-200 cursor-pointer group no-underline text-foreground"
          >
            <div className="relative h-64 overflow-hidden">
              <img
                src={c.img}
                alt={c.name}
                loading="lazy"
                width={800}
                height={600}
                className={`w-full h-full ${(c as any).fit === 'contain' ? 'object-contain bg-muted' : 'object-cover'} group-hover:scale-105 transition-transform duration-300 ${(c as any).imgScale || ''}`}
                style={c.imgPosition ? { objectPosition: c.imgPosition } : undefined}
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
      <div className="mt-8 text-center">
        <a
          href="https://wa.me/5567998860067?text=Quero%20fazer%20a%20minha%20rifa"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          Quero fazer a minha rifa
        </a>
      </div>
    </section>
  );
};

export default CasesSection;
