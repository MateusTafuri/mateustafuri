import heroImg from "@/assets/hero-real.webp";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative h-[92vh] min-h-[520px] overflow-hidden">
      <img
        src={heroImg}
        alt="Mateus Tafuri com alunos no dojo"
        className="w-full h-full object-cover object-[center_25%]"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 flex items-end justify-between gap-8 flex-wrap">
        <div className="max-w-xl">
          <p className="text-sm text-white/60 mb-2">Impacto Social</p>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
            <span className="text-green-accent drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
              Quando uma causa tem propósito, ela merece voz.
            </span>
          </h1>
          <p className="text-base md:text-lg text-white font-bold leading-relaxed mb-6 max-w-lg drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
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
