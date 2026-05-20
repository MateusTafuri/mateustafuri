import { useRef } from "react";
import heroImg from "@/assets/hero-real.jpg";
import heroMobileImg from "@/assets/hero-mobile.jpg";

const HeroSection = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLHeadingElement>) => {
    const el = headingRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--mx", `${x}%`);
    el.style.setProperty("--my", `${y}%`);
  };

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
      <div className="block md:hidden absolute inset-0 overflow-hidden">
        <img
          src={heroMobileImg}
          alt="Mateus Tafuri com alunos no dojo"
          className="w-full h-full object-cover object-center scale-[0.92]"
          width={1080}
          height={1350}
          fetchPriority="high"
          decoding="async"
        />
      </div>
      <div className="absolute top-0 left-0 right-0 h-[30%] bg-gradient-to-b from-black/70 via-black/25 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[45%] bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      <div className="absolute bottom-4 md:bottom-6 left-0 right-0 p-6 md:px-10 flex flex-col items-center justify-center gap-3">
        <h1
          ref={headingRef}
          onMouseMove={handleMouseMove}
          style={{
            backgroundImage:
              "radial-gradient(circle at var(--mx, 50%) var(--my, 50%), hsl(var(--secondary)) 0%, hsl(var(--green-accent)) 45%, hsl(var(--green-accent)) 100%)",
          }}
          className="font-bold leading-[1.05] tracking-tight text-3xl md:text-5xl lg:text-6xl max-w-4xl text-center animate-fade-in [animation-duration:1.2s] bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] cursor-default"
        >
          Quando uma causa
          <br />
          tem propositivo,
          <br />
          ela merece voz.
        </h1>
        <div className="flex flex-col items-center mt-2">
          <div className="flex flex-col items-center animate-bounce">
            <svg width="20" height="8" viewBox="0 0 20 8" fill="none" className="opacity-90">
              <path d="M10 7L2 1H18L10 7Z" fill="white"/>
            </svg>
            <svg width="20" height="8" viewBox="0 0 20 8" fill="none" className="opacity-60 -mt-1">
              <path d="M10 7L2 1H18L10 7Z" fill="white"/>
            </svg>
            <svg width="20" height="8" viewBox="0 0 20 8" fill="none" className="opacity-30 -mt-1">
              <path d="M10 7L2 1H18L10 7Z" fill="white"/>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
