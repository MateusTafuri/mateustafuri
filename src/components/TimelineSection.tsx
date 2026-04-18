import { GraduationCap, FileText, Heart, Globe, Lightbulb, Rocket } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const timeline = [
  {
    year: "2021",
    icon: GraduationCap,
    text: "Primeiro contato com o terceiro setor durante a graduação (UFMS) e estágio no Instituto Causadores da Alegria.",
  },
  {
    year: "2022",
    icon: FileText,
    text: "Publicação do artigo científico sobre gestão do conhecimento e desenvolvimento sustentável no terceiro setor.",
  },
  {
    year: "2023",
    icon: Heart,
    text: "Realização de mais de 30 ações sociais, aplicando estratégias de captação de recursos em asilos, orfanatos e clínicas de reabilitação.",
  },
  {
    year: "2024",
    icon: Globe,
    text: "Início da jornada como nômade digital, expandindo atuação e projetos pelo Brasil.",
  },
  {
    year: "2025",
    icon: Lightbulb,
    text: "Desenvolvimento e aplicação da metodologia da Rifa Solidária, com mais de R$ 400 mil mobilizados para projetos sociais.",
  },
  {
    year: "2026",
    icon: Rocket,
    text: "Estruturação de uma plataforma própria de arrecadação de recursos.",
  },
];

const TimelineItem = ({
  item,
  index,
  isLeft,
}: {
  item: (typeof timeline)[number];
  index: number;
  isLeft: boolean;
}) => {
  const Icon = item.icon;
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

  return (
    <div
      ref={ref}
      className={`relative flex items-start gap-4 md:gap-0 transition-all duration-700 ease-out ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      } ${
        visible
          ? "opacity-100 translate-y-0"
          : `opacity-0 translate-y-8 ${isLeft ? "md:-translate-x-8 md:translate-y-0" : "md:translate-x-8 md:translate-y-0"}`
      }`}
      style={{ transitionDelay: visible ? `${index * 120}ms` : "0ms" }}
    >
      {/* Content */}
      <div
        className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${
          isLeft ? "md:text-right md:pr-8" : "md:text-left md:pl-8"
        }`}
      >
        <span className="text-xs font-bold text-primary">{item.year}</span>
        <p className="text-sm text-muted-foreground leading-relaxed mt-1">
          {item.text}
        </p>
      </div>

      {/* Icon circle */}
      <div
        className={`absolute left-0 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg shrink-0 z-10 transition-transform duration-700 ${
          visible ? "scale-100" : "scale-0"
        }`}
        style={{ transitionDelay: visible ? `${index * 120 + 100}ms` : "0ms" }}
      >
        <Icon className="w-5 h-5" />
      </div>

      {/* Spacer for the other side on desktop */}
      <div className="hidden md:block md:w-[calc(50%-2rem)]" />
    </div>
  );
};

const TimelineSection = () => {
  const lineRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height + vh * 0.6;
      const scrolled = vh * 0.8 - rect.top;
      const p = Math.max(0, Math.min(1, scrolled / total));
      setProgress(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section className="max-w-5xl mx-auto px-6 py-16" id="trajetoria">
      <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
        minha Trajetória
      </p>
      <h2 className="text-2xl md:text-3xl font-bold mb-12 leading-snug">
        Do propósito à prática
      </h2>

      <div className="relative" ref={containerRef}>
        {/* Vertical line track */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />
        {/* Vertical line progress */}
        <div
          ref={lineRef}
          className="absolute left-6 md:left-1/2 top-0 w-px bg-primary md:-translate-x-px transition-[height] duration-150 ease-out"
          style={{ height: `${progress * 100}%` }}
        />

        <div className="flex flex-col gap-10">
          {timeline.map((item, i) => (
            <TimelineItem key={item.year} item={item} index={i} isLeft={i % 2 === 0} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
