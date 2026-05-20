import { useEffect, useRef, useState } from "react";
import { Rocket, Ticket, PenLine, Smartphone, LineChart, Lightbulb, type LucideIcon } from "lucide-react";

const services: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: Rocket, title: "Plataforma de Captação", desc: "Estruturo toda a plataforma (rifas, páginas, links e funil) para maximizar cada real arrecadado." },
  { icon: Ticket, title: "Rifas Solidárias", desc: "Estratégia, narrativa e mobilização de ponta a ponta para campanhas que engajam e convertem." },
  { icon: PenLine, title: "Campanhas Temáticas", desc: "Narrativas poderosas que conectam causas a pessoas e geram ação real." },
  { icon: Smartphone, title: "Social Media", desc: "Gestão de redes com foco em engajamento e construção de comunidade." },
  { icon: LineChart, title: "Gestão de Tráfego", desc: "Anúncios estratégicos para amplificar campanhas e alcançar o público certo." },
  { icon: Lightbulb, title: "Consultoria", desc: "Orientação personalizada para projetos sociais que querem escalar seu impacto." },
];

const ServiceCard = ({
  service,
  index,
}: {
  service: (typeof services)[number];
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Icon = service.icon;

  return (
    <div
      ref={ref}
      className={`rounded-2xl p-5 border bg-secondary/50 border-border transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: visible ? `${index * 100}ms` : "0ms" }}
    >
      <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 bg-primary/10 text-primary">
        <Icon size={20} strokeWidth={1.5} />
      </div>
      <h3 className="text-sm font-semibold mb-1">{service.title}</h3>
      <p className="text-xs leading-relaxed text-muted-foreground">
        {service.desc}
      </p>
    </div>
  );
};

const ServicesSection = () => {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16 scroll-mt-24" id="servicos">
      <h2 className="text-2xl md:text-3xl font-bold mb-8">Como posso ajudar</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((s, i) => (
          <ServiceCard key={s.title} service={s} index={i} />
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
