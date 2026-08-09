import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import logoBonete from "@/assets/logo-bonete.webp";

/* Topo do case do Dojo Bonete. As peças do leque chegam por props porque
   estamos comparando duas versões: capas de carrossel e fotos. */

const CREME = "#F4F0E6";

/* Duas em pé atrás e uma deitada atravessada na frente. A largura vem daqui e
   a altura sai da proporção: "v" é 3:4, "h" é 16:9. */
const LEQUE = [
  { tipo: "v", larg: 215, giro: "-7deg", left: "0%", top: "0%", z: 10, atraso: "0s" },
  { tipo: "v", larg: 215, giro: "7deg", left: "45%", top: "5%", z: 20, atraso: "-2.3s" },
  { tipo: "h", larg: 385, giro: "-2deg", left: "6%", top: "52%", z: 30, atraso: "-4.6s" },
] as const;

const BoneteHero = ({ pecas }: { pecas: string[] }) => (
  <header
    className="relative overflow-hidden px-5 pt-24 pb-12 sm:px-6 md:pt-28 md:pb-16"
    style={{
      background: "linear-gradient(165deg, #0f1f18 0%, #14271e 45%, #193024 100%)",
      color: CREME,
    }}
  >
    <div
      aria-hidden
      className="pointer-events-none absolute -right-32 -top-24 h-96 w-96 rounded-full opacity-30 blur-3xl"
      style={{ background: "radial-gradient(circle, #2f6b45 0%, transparent 70%)" }}
    />

    <div className="relative mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-[1.05fr_0.95fr]">
      <div>
        <Link
          to="/#cases"
          className="inline-flex items-center gap-2 text-sm text-[#F4F0E6]/60 transition-colors hover:text-[#A9C46C]"
        >
          <ArrowLeft size={16} /> Voltar para cases
        </Link>

        <div className="mt-10 flex items-center gap-3">
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#F4F0E6]/45">
            Projeto
          </span>
          <img
            src={logoBonete}
            alt="Logo Dojo Bonete"
            className="h-10 w-10 rounded-xl border border-white/15 bg-white/5 object-cover p-1"
          />
        </div>

        <p className="mt-6 text-lg text-[#F4F0E6]/70 md:text-xl">Rifa Solidária</p>
        <h1 className="mt-1 font-display text-5xl font-extrabold leading-[0.95] tracking-tight md:text-7xl">
          Dojo <span className="text-[#A9C46C]">Bonete</span>
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-[#F4F0E6]/70 md:text-lg">
          A construção coletiva de um sonho caiçara: como a união de uma comunidade
          isolada e a comunicação estratégica levantaram um dojo do outro lado do mar.
        </p>
      </div>

      {/* leque de peças: só no desktop, onde sobra largura para ele respirar */}
      <div className="relative hidden h-[500px] md:block">
        {pecas.slice(0, LEQUE.length).map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            aria-hidden
            loading="lazy"
            className="peca-flutuante absolute rounded-xl border-[3px] border-white object-cover shadow-[0_25px_50px_-12px_rgba(0,0,0,0.65)]"
            style={
              {
                "--giro": LEQUE[i].giro,
                animationDelay: LEQUE[i].atraso,
                left: LEQUE[i].left,
                top: LEQUE[i].top,
                width: LEQUE[i].larg,
                height:
                  LEQUE[i].tipo === "v"
                    ? (LEQUE[i].larg * 4) / 3
                    : (LEQUE[i].larg * 9) / 16,
                zIndex: LEQUE[i].z,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
    </div>
  </header>
);

export default BoneteHero;
