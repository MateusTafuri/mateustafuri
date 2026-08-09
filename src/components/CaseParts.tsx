import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { ArrowLeft, ArrowUpRight, MousePointerClick, Ticket, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ETAPAS } from "@/data/rifaSolidaria";

/* Peças compartilhadas pelas páginas de case (Bonete, Caraíva, ...).
   Todas seguem a mesma paleta: creme no claro, verde no escuro, lime no destaque. */

const LIME = "var(--case-destaque, #A9C46C)";

export type Secao = { id: string; label: string };

export type Etapa = {
  n: string;
  etapa: string;
  title: string;
  text: string;
  img?: string;
  imgs?: string[];
  retrato?: boolean;
  alt?: string;
  legenda?: string;
  painel?: { titulo: string; itens: { v: string; l: string }[] };
};

/* rótulo em caixa alta que abre cada seção */
export const Label = ({ children, escuro }: { children: ReactNode; escuro?: boolean }) => (
  <p
    className={`mb-4 text-xs font-semibold uppercase tracking-[0.25em] ${
      escuro ? "text-[var(--case-destaque,#A9C46C)]" : "text-[#16281f]/45"
    }`}
  >
    {children}
  </p>
);

/* Menu de seções que gruda no topo e segue a rolagem, com o botão de voltar */
export const CaseNav = ({ secoes }: { secoes: Secao[] }) => {
  const [active, setActive] = useState(secoes[0].id);
  const barRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    secoes.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [secoes]);

  useEffect(() => {
    barRef.current
      ?.querySelector<HTMLElement>(`[data-id="${active}"]`)
      ?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [active]);

  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  /* volta para onde a pessoa estava; se ela caiu aqui direto, vai para os cases */
  const voltar = () => (window.history.length > 1 ? navigate(-1) : navigate("/#cases"));

  return (
    <div className="sticky top-0 z-40 border-b border-black/10 bg-[#F4F0E6]/95 backdrop-blur-md">
      {/* o miolo com w-max + mx-auto centraliza quando cabe e, quando não cabe,
          deixa a faixa rolar do começo — justify-center esconderia a primeira */}
      <div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div ref={barRef} className="mx-auto flex w-max items-center gap-1.5 px-4 py-2.5">
          <button
            onClick={voltar}
            aria-label="Voltar para a página anterior"
            className="mr-1 grid h-8 w-8 shrink-0 place-items-center rounded-full text-[#16281f]/60 transition-colors hover:bg-black/5 hover:text-[#16281f]"
          >
            <ArrowLeft size={17} />
          </button>
          <span aria-hidden className="mr-1 h-5 w-px shrink-0 bg-black/10" />

          {secoes.map((s) => (
            <button
              key={s.id}
              data-id={s.id}
              onClick={() => go(s.id)}
              aria-current={active === s.id ? "true" : undefined}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition-colors ${
                active === s.id
                  ? "bg-[var(--case-escuro,#16281f)] text-[#F4F0E6]"
                  : "text-[#16281f]/55 hover:bg-black/5"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const ICONES = [TrendingUp, MousePointerClick, Ticket, ArrowUpRight];

/* painel de números no lugar da foto, usado na etapa Escalar */
const Painel = ({ titulo, itens }: NonNullable<Etapa["painel"]>) => (
  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl">
    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#F4F0E6]/45">
      {titulo}
    </p>
    <div className="mt-5 grid grid-cols-2 gap-4">
      {itens.map((k, i) => {
        const Icone = ICONES[i % ICONES.length];
        return (
          <div key={k.l} className="rounded-xl bg-white/[0.04] p-4">
            <Icone size={16} style={{ color: LIME }} />
            <p className="mt-2 font-display text-2xl font-extrabold">{k.v}</p>
            <p className="mt-0.5 text-xs leading-snug text-[#F4F0E6]/50">{k.l}</p>
          </div>
        );
      })}
    </div>
  </div>
);

/* As cinco etapas em zigue-zague: nas pares a foto vem primeiro */
export const CaseEtapas = ({ itens }: { itens: Etapa[] }) => (
  <div className="mt-14 space-y-12 md:space-y-16">
    {itens.map((p, i) => (
      <div key={p.n} className="grid items-center gap-6 md:grid-cols-2 md:gap-10">
        <div className={i % 2 ? "md:order-2" : undefined}>
          <div className="flex items-center gap-3">
            {/* no hover o emoji da etapa entra pela esquerda e empurra o texto */}
            <span className="group inline-flex items-center rounded-full border border-[var(--case-destaque-40,rgba(169,196,108,0.4))] px-3 py-1 font-display text-xs font-extrabold tracking-widest text-[var(--case-destaque,#A9C46C)] transition-colors hover:border-[var(--case-destaque,#A9C46C)]">
              <span className="w-0 overflow-hidden text-sm opacity-0 transition-all duration-300 group-hover:mr-1.5 group-hover:w-4 group-hover:opacity-100">
                {ETAPAS[i]?.emoji}
              </span>
              {p.n} · {p.etapa.toUpperCase()}
            </span>
            <span className="h-px w-8 bg-[var(--case-destaque-30,rgba(169,196,108,0.3))]" />
          </div>
          <h3 className="mt-3 font-display text-2xl font-bold md:text-3xl">{p.title}</h3>
          <p className="mt-3 leading-relaxed text-[#F4F0E6]/65">{p.text}</p>
        </div>

        {p.painel ? (
          <Painel {...p.painel} />
        ) : (
          <div>
            <div
              className={
                p.imgs?.length === 4
                  ? "mx-auto grid max-w-[340px] grid-cols-2 gap-3"
                  : `flex justify-center ${p.imgs?.length === 3 ? "" : "gap-3"}`
              }
            >
              {(p.imgs ?? [p.img!]).map((src, k) => (
                <img
                  key={src}
                  src={src}
                  alt={p.alt}
                  className={
                    p.imgs?.length === 4
                      ? `peca-flutuante w-full rounded-xl border-[3px] border-white object-contain shadow-2xl ${k % 2 ? "mt-4" : ""}`
                      : p.imgs?.length === 3
                        ? `peca-flutuante w-[46%] rounded-xl border-[3px] border-white object-contain shadow-2xl ${k ? "-ml-[11%]" : ""}`
                        : p.imgs
                          ? "peca-flutuante min-w-0 flex-1 rounded-xl border-[3px] border-white object-contain shadow-2xl"
                          : p.retrato
                            ? "peca-flutuante max-h-[400px] w-auto rounded-xl border-[3px] border-white object-contain shadow-2xl"
                            : "aspect-[4/3] w-full rounded-3xl object-cover shadow-2xl"
                  }
                  style={
                    p.retrato && !p.imgs
                      ? ({ "--giro": "-2deg" } as CSSProperties)
                      : p.imgs
                        ? ({
                            "--giro": ["-4deg", "3deg", "2deg", "-3deg"][k % 4],
                            animationDelay: `${-1.8 * k}s`,
                            zIndex: [10, 30, 20, 25][k % 4],
                          } as CSSProperties)
                        : undefined
                  }
                  loading="lazy"
                />
              ))}
            </div>
            {p.legenda && (
              <p className="mt-3 text-center text-xs leading-snug text-[#F4F0E6]/45">
                {p.legenda}
              </p>
            )}
          </div>
        )}
      </div>
    ))}
  </div>
);
