import heroImg from "@/assets/hero.jpg";

const HeroSection = () => {
  return (
    <section className="relative h-[92vh] min-h-[520px] overflow-hidden">
      <img
        src={heroImg}
        alt="Mateus Tafuri trabalhando com comunidade"
        className="w-full h-full object-cover object-[center_10%]"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-black/5 via-black/20 to-black/75" />
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 flex items-end justify-between gap-8 flex-wrap">
        <div className="max-w-xl">
          <span className="inline-block bg-white/15 border border-white/40 text-primary-foreground text-xs uppercase tracking-wider px-4 py-1.5 rounded-full mb-4 backdrop-blur-sm">
            Impacto Social
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground leading-tight mb-3">
            Mateus Tafuri
            <br />
            <span className="text-green-accent">
              Engenheiro na Captação
              <br />
              de Recursos
            </span>
          </h1>
          <p className="text-base text-white/85 leading-relaxed mb-6 max-w-md">
            Quando uma causa tem propósito,
            <br />
            ela merece voz.
          </p>
          <a
            href="https://wa.me/5567998860067"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-background text-primary px-7 py-3.5 rounded-full text-base font-semibold hover:opacity-90 transition-opacity"
          >
            Entrar em contato
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
