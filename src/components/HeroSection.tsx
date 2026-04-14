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
          <p className="text-sm text-white/60 mb-2">Mateus Tafuri</p>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
            <span className="text-green-accent">
              Quando uma causa tem propósito, ela merece voz.
            </span>
          </h1>
          <p className="text-base md:text-lg text-white font-bold leading-relaxed mb-6 max-w-lg">
            Transformo causas em narrativas que mobilizam pessoas e geram impacto.
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
