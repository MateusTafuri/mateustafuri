import heroImg from "@/assets/hero-real.webp";
import heroMobileImg from "@/assets/hero-mobile.webp";

const HeroSection = () => {
  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Desktop/Tablet image */}
      <img
        src={heroImg}
        alt="Mateus Tafuri com alunos no dojo"
        className="hidden md:block w-full h-full object-cover object-[center_25%]"
        width={1920}
        height={1080}
        fetchPriority="high"
        decoding="async"
      />
      {/* Mobile image */}
      <img
        src={heroMobileImg}
        alt="Mateus Tafuri com alunos no dojo"
        className="block md:hidden w-full h-full object-cover object-[center_20%]"
        width={1080}
        height={1350}
        fetchPriority="high"
        decoding="async"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--green-dark))]/90 via-[hsl(var(--green-dark))]/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6 pb-16 md:pb-24 md:px-6 md:max-w-5xl md:mx-auto">
        <h1 className="font-bold leading-[1.05] tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)] text-5xl md:text-7xl max-w-4xl text-[hsl(var(--secondary))]">
          Quando uma causa tem propósito, ela merece voz.
        </h1>
      </div>
    </section>
  );
};

export default HeroSection;
