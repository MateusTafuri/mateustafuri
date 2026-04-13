import heroImg from "@/assets/hero-real.webp";

const HeroSection = () => {
  return (
    <section className="relative h-[92vh] min-h-[520px] overflow-hidden">
      <img
        src={heroImg}
        alt="Mateus Tafuri com alunos no dojo"
        className="w-full h-full object-cover object-[center_30%]"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-black/5 via-black/20 to-black/75" />
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 flex items-end justify-between gap-8 flex-wrap">
        <div className="max-w-xl">
          <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground leading-tight mb-3">
            Mateus Tafuri
            <br />
            <span className="text-green-accent">
              Quando uma causa tem propósito,
              <br />
              ela merece voz.
            </span>
          </h1>
          <p className="text-base text-white/75 leading-relaxed mb-6 max-w-lg">
            Ajudo projetos sociais a se tornarem financeiramente sustentáveis, unindo estratégia, narrativa e mobilização para transformar intenção em impacto real.
          </p>
          <a
            href="https://wa.me/5567998860067"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-background text-primary px-7 py-3.5 rounded-full text-base font-semibold hover:opacity-90 transition-opacity"
          >
            Vamos conversar
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
