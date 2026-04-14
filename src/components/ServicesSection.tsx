const services = [
  { icon: "🚀", title: "Plataforma de Captação", desc: "Estruturo toda a plataforma — rifas, páginas, links e funil — para maximizar cada real arrecadado." },
  { icon: "🎟️", title: "Rifas Solidárias", desc: "Estratégia, narrativa e mobilização de ponta a ponta para campanhas que engajam e convertem." },
  { icon: "✍️", title: "Campanhas Temáticas", desc: "Narrativas poderosas que conectam causas a pessoas e geram ação real." },
  { icon: "📱", title: "Social Media", desc: "Gestão de redes com foco em engajamento e construção de comunidade." },
  { icon: "📈", title: "Gestão de Tráfego", desc: "Anúncios estratégicos para amplificar campanhas e alcançar o público certo." },
  { icon: "💡", title: "Consultoria", desc: "Orientação personalizada para projetos sociais que querem escalar seu impacto." },
];

const ServicesSection = () => {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16" id="servicos">
      <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">O que eu faço</p>
      <h2 className="text-2xl md:text-3xl font-bold mb-8">Como posso ajudar</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((s) => (
          <div
            key={s.title}
            className="rounded-2xl p-5 border bg-secondary/50 border-border"
          >
            <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-lg bg-secondary">
              {s.icon}
            </div>
            <h3 className="text-sm font-semibold mb-1">{s.title}</h3>
            <p className="text-xs leading-relaxed text-muted-foreground">
              {s.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
