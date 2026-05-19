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
      <div className="absolute top-0 left-0 right-0 h-[45%] bg-gradient-to-b from-[hsl(var(--green-dark))]/80 via-[hsl(var(--green-dark))]/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[20%] bg-gradient-to-t from-black/30 to-transparent" />
      <div className="absolute top-24 left-0 right-0 p-6 md:px-10">
        <h1 className="font-bold leading-[1.1] tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)] text-4xl md:text-5xl max-w-xl text-[hsl(var(--secondary))] text-left">
          Quando uma causa tem propósito, ela merece voz.
        </h1>
      </div>
    </section>
  );
};

export default HeroSection;
