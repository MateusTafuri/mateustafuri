/**
 * Confetes do header. Camada absoluta e sem interação: precisa de um pai com
 * `relative`. A variante muda de onde os papelotes saem, quantos são e a que
 * velocidade viajam.
 *
 *  estouros  quatro estouros revezando pelos cantos          (padrão)
 *  canhoes   dois canhões nos cantos de baixo, tiro rápido
 *  explosao  um estouro grande no centro, muito papelote
 *  chuva     queda lenta e contínua, do topo até embaixo
 *  poeira    muitos papelotes minúsculos subindo devagar
 *  mouse     os papelotes nascem por onde o cursor passa
 */
import { useEffect, useRef, type CSSProperties } from "react";

export type VarianteConfete =
  | "estouros"
  | "canhoes"
  | "explosao"
  | "chuva"
  | "poeira"
  | "mouse";

const CORES = [
  "hsl(15 65% 56%)", // coral
  "hsl(35 90% 66%)", // âmbar
  "hsl(168 45% 55%)", // verde-água
  "hsl(42 37% 88%)", // creme
];

type Papelote = {
  key: string;
  x: number; // % da largura
  y: number; // % da altura
  dx: string;
  dy: string;
  giro: string;
  cor: string;
  largura: number;
  altura: number;
  atraso: number;
  ciclo: number;
  keyframe: "estouro" | "flutuar";
};

/** Leque de papelotes saindo de um ponto. `abertura` e `centro` em radianos. */
const estouro = (
  id: string,
  o: { x: number; y: number; atraso: number },
  qtd: number,
  raioBase: number,
  ciclo: number,
  centro = -Math.PI / 2,
  abertura = Math.PI,
  queda = 46,
): Papelote[] =>
  Array.from({ length: qtd }, (_, i) => {
    const ang = centro - abertura / 2 + (abertura / (qtd - 1)) * i;
    const raio = raioBase + ((i * 7) % 3) * (raioBase * 0.35);
    return {
      key: `${id}-${i}`,
      x: o.x,
      y: o.y,
      dx: `${Math.round(Math.cos(ang) * raio)}px`,
      dy: `${Math.round(Math.sin(ang) * raio + queda)}px`,
      giro: `${(i % 2 ? 1 : -1) * (160 + i * 40)}deg`,
      cor: CORES[i % CORES.length],
      largura: 5 + (i % 3),
      altura: 8 + (i % 4),
      atraso: o.atraso + i * 0.05,
      ciclo,
      keyframe: "estouro" as const,
    };
  });

const PRESETS: Record<Exclude<VarianteConfete, "mouse">, Papelote[]> = {
  // sete estouros pequenos revezando: um a cada 1,5s, sempre um punhado no ar
  estouros: [
    { x: 12, y: 30, atraso: 0 },
    { x: 88, y: 24, atraso: 1.5 },
    { x: 28, y: 74, atraso: 3 },
    { x: 72, y: 68, atraso: 4.5 },
    { x: 50, y: 16, atraso: 6 },
    { x: 8, y: 62, atraso: 7.5 },
    { x: 92, y: 72, atraso: 9 },
  ].flatMap((o, i) => estouro(`e${i}`, o, 9, 78, 10.5)),

  // canhões nos cantos de baixo apontando para o centro: percurso longo em pouco tempo
  canhoes: [
    { o: { x: 3, y: 98, atraso: 0 }, centro: -Math.PI / 3.4 },
    { o: { x: 97, y: 98, atraso: 3.5 }, centro: -Math.PI + Math.PI / 3.4 },
  ].flatMap((c, i) =>
    estouro(`c${i}`, c.o, 12, 300, 7, c.centro, Math.PI / 2.6, 90),
  ),

  // um estouro só, no meio, com o dobro de papelote
  explosao: estouro(
    "x",
    { x: 50, y: 46, atraso: 0 },
    26,
    170,
    9,
    -Math.PI / 2,
    Math.PI * 2,
    70,
  ),

  // chuva contínua: sai de cima da tela e atravessa o header inteiro
  chuva: Array.from({ length: 16 }, (_, i) => ({
    key: `ch-${i}`,
    x: (i * 6.3 + 3) % 100,
    y: -8,
    dx: `${(i % 2 ? 1 : -1) * (14 + (i % 4) * 12)}px`,
    dy: "116vh",
    giro: `${(i % 2 ? 1 : -1) * (280 + i * 30)}deg`,
    cor: CORES[i % CORES.length],
    largura: 4 + (i % 3),
    altura: 7 + (i % 4),
    atraso: (i * 11) % 13,
    ciclo: 11 + (i % 4),
    keyframe: "flutuar" as const,
  })),

  // poeira: muito papelote minúsculo subindo devagar
  poeira: Array.from({ length: 26 }, (_, i) => ({
    key: `p-${i}`,
    x: (i * 13.7 + 4) % 100,
    y: 65 + ((i * 17) % 40),
    dx: `${(i % 2 ? 1 : -1) * (20 + (i % 5) * 14)}px`,
    dy: `${-140 - ((i * 23) % 160)}px`,
    giro: `${(i % 2 ? 1 : -1) * (90 + i * 12)}deg`,
    cor: CORES[i % CORES.length],
    largura: 3 + (i % 2),
    altura: 3 + (i % 3),
    atraso: (i * 3.1) % 18,
    ciclo: 16 + (i % 6),
    keyframe: "flutuar" as const,
  })),
};

/* ── rastro do cursor ── */

const INTERVALO = 110; // ms entre uma leva de papelotes e a próxima
const POR_LEVA = 3;
const VIDA = 1400; // ms até o papelote sumir

const Rastro = () => {
  const camada = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const alvo = camada.current?.parentElement;
    if (!alvo) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ultimo = 0;
    const timers: number[] = [];

    const aoMover = (e: PointerEvent) => {
      if (e.timeStamp - ultimo < INTERVALO) return;
      ultimo = e.timeStamp;

      const caixa = camada.current;
      if (!caixa) return;
      const r = caixa.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;

      for (let i = 0; i < POR_LEVA; i++) {
        const ang = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 0.9;
        const raio = 30 + Math.random() * 45;
        const p = document.createElement("span");
        p.className = "absolute block rounded-[1px]";
        p.style.cssText = `
          left:${x}px; top:${y}px;
          width:${4 + (i % 3)}px; height:${6 + (i % 3)}px;
          background:${CORES[Math.floor(Math.random() * CORES.length)]};
          opacity:0;
          --dx:${Math.round(Math.cos(ang) * raio)}px;
          --dy:${Math.round(Math.sin(ang) * raio + 60)}px;
          --giro:${Math.round((Math.random() - 0.5) * 500)}deg;
          animation: flutuar ${VIDA}ms ease-out forwards;
        `;
        caixa.appendChild(p);
        timers.push(window.setTimeout(() => p.remove(), VIDA));
      }
    };

    alvo.addEventListener("pointermove", aoMover);
    return () => {
      alvo.removeEventListener("pointermove", aoMover);
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div
      ref={camada}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden motion-reduce:hidden"
    />
  );
};

/* ── componente ── */

const Confetes = ({
  variante = "estouros",
  rastro = false,
}: {
  variante?: VarianteConfete;
  /** soma o rastro do cursor à variante automática */
  rastro?: boolean;
}) => {
  if (variante === "mouse") return <Rastro />;

  return (
    <>
      {rastro && <Rastro />}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden motion-reduce:hidden"
      >
        {PRESETS[variante].map((p) => (
          <span
            key={p.key}
            className="absolute block rounded-[1px]"
            style={
              {
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.largura,
                height: p.altura,
                backgroundColor: p.cor,
                opacity: 0,
                "--dx": p.dx,
                "--dy": p.dy,
                "--giro": p.giro,
                animation: `${p.keyframe} ${p.ciclo}s ${
                  p.keyframe === "estouro" ? "ease-out" : "linear"
                } ${p.atraso}s infinite`,
              } as CSSProperties
            }
          />
        ))}
      </div>
    </>
  );
};

export default Confetes;
