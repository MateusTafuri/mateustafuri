import { GraduationCap, FileText, Heart, Globe, Lightbulb, Rocket } from "lucide-react";

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

const TimelineSection = () => {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16" id="trajetoria">
      <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
        minha Trajetória
      </p>
      <h2 className="text-2xl md:text-3xl font-bold mb-12 leading-snug">
        Do propósito à prática
      </h2>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

        <div className="flex flex-col gap-10">
          {timeline.map((item, i) => {
            const Icon = item.icon;
            const isLeft = i % 2 === 0;

            return (
              <div
                key={item.year}
                className={`relative flex items-start gap-4 md:gap-0 ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                }`}
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
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg shrink-0 z-10">
                  <Icon className="w-5 h-5" />
                </div>

                {/* Spacer for the other side on desktop */}
                <div className="hidden md:block md:w-[calc(50%-2rem)]" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
