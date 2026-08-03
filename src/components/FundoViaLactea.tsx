/* Céu estrelado para o header da Rifa Solidária.
   As posições são geradas uma vez, com semente fixa, para as estrelas
   não mudarem de lugar a cada render. */

const gerador = (semente: number) => () => {
  semente |= 0;
  semente = (semente + 0x6d2b79f5) | 0;
  let t = Math.imul(semente ^ (semente >>> 15), 1 | semente);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const r = gerador(7);
const ESTRELAS = Array.from({ length: 90 }, () => ({
  x: r() * 100,
  y: r() * 100,
  tamanho: 0.6 + r() * 2.2,
  atraso: r() * 4,
  opacidade: 0.25 + r() * 0.6,
}));

const FundoViaLactea = () => (
  <div className="pointer-events-none absolute inset-0" aria-hidden>
    {/* nebulosa */}
    <div
      className="absolute inset-0 opacity-60"
      style={{
        background:
          "radial-gradient(60% 38% at 68% 18%, hsl(190 60% 55% / 0.22) 0%, transparent 60%), radial-gradient(48% 30% at 28% 32%, hsl(265 55% 60% / 0.18) 0%, transparent 65%)",
        filter: "blur(6px)",
      }}
    />
    {/* estrelas */}
    {ESTRELAS.map((e, i) => (
      <span
        key={i}
        className="absolute rounded-full bg-white"
        style={{
          left: `${e.x}%`,
          top: `${e.y}%`,
          width: e.tamanho,
          height: e.tamanho,
          opacity: e.opacidade,
          animation: `piscar ${2.5 + e.atraso}s ease-in-out ${e.atraso}s infinite`,
        }}
      />
    ))}
  </div>
);

export default FundoViaLactea;
