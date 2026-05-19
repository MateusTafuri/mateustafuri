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
      <div className="absolute top-0 left-0 right-0 h-[30%] bg-gradient-to-b from-black/70 via-black/25 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[45%] bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      <div className="absolute bottom-10 md:bottom-16 left-0 right-0 p-6 md:px-10 flex flex-col items-center justify-center gap-4">
        <h1 className="font-bold leading-[1.12] tracking-tight text-2xl md:text-4xl max-w-2xl text-center animate-fade-in [animation-duration:1.2s]">
          <span className="bg-gradient-to-r from-[hsl(var(--green-accent))] via-[hsl(var(--secondary))] to-[hsl(var(--green-accent))] bg-clip-text text-transparent drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]">
            Quando uma causa tem propósito,
            <br />
            ela merece voz.
          </span>
        </h1>
        <div className="flex flex-col items-center animate-bounce mt-2">
          <svg width="24" height="40" viewBox="0 0 24 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-80">
            <rect x="1" y="1" width="22" height="38" rx="11" stroke="white" strokeWidth="2" />
            <circle cx="12" cy="10" r="3" fill="white" className="animate-pulse" />
          </svg>
          <span className="text-white/60 text-xs mt-1 tracking-widest uppercase">Scroll</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
