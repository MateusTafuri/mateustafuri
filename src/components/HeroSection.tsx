import heroImg from "@/assets/hero-real.webp";
import heroMobileImg from "@/assets/hero-mobile.webp";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative h-[92vh] min-h-[520px] overflow-hidden">
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
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent text-2xl" />
      <div className="absolute bottom-0 left-0 right-0 p-6 pt-20 md:p-10 flex items-end justify-between gap-8 flex-wrap">
        <div className="max-w-xl">
          <p className="text-white/60 mb-2 text-base mt-8 md:mt-0">​</p>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
            <span className="text-green-accent drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] text-left font-sans mx-0 my-0 px-0 py-0 pb-0 text-4xl">
              Quando uma causa tem propósito, ela merece voz.
            </span>
          </h1>
          <p className="text-white font-bold leading-relaxed mb-6 max-w-lg drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)] text-sm md:text-base">
            Transformo causas em narrativas que mobilizam pessoas e geram impacto.
          </p>
          <a
            href="https://wa.me/5567998860067"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 bg-background text-primary px-7 py-3.5 rounded-full text-base font-semibold hover:gap-3 hover:shadow-lg transition-all duration-300"
          >
            Vamos conversar
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
