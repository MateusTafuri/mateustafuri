const CtaSection = () => {
  return (
    <section className="bg-secondary py-16 px-6 text-center" id="contato">
      <div className="max-w-lg mx-auto">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">Vamos juntos</p>
        <h2 className="text-3xl font-bold text-green-dark mb-3">Pronto para gerar impacto?</h2>
        <p className="text-secondary-foreground/80 mb-8 text-sm leading-relaxed">
          Entre em contato e vamos construir a estratégia certa para a sua causa.
        </p>
        <a
          href="https://wa.me/5567998860067"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-primary text-primary-foreground px-7 py-3.5 rounded-full text-base font-semibold hover:opacity-90 transition-opacity"
        >
          Falar com Mateus no WhatsApp
        </a>
      </div>
    </section>
  );
};

export default CtaSection;
