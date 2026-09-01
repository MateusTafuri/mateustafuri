/* Comparação: os títulos principais do site na fonte de hoje (Inter) e na
   Bricolage Grotesque, que é a do "Como legalizar a sua rifa solidária".
   Página de teste: nada em uso ainda. */

const CORAL = "hsl(15 65% 56%)";
const PETROLEO_MEDIO = "hsl(178 36% 22%)";

const TITULOS = [
  { onde: "Hero da Rifa Solidária", texto: "Como captar recursos para a sua causa com a Rifa Solidária" },
  { onde: "O método", texto: "5 etapas para tirar a sua campanha do papel" },
  { onde: "As rifas", texto: "As rifas que originaram o método" },
  { onde: "Guia de legalização", texto: "Como legalizar a sua rifa solidária", jaBricolage: true },
  { onde: "Mapeamento", texto: "Como funciona o mapeamento" },
  { onde: "Depoimentos", texto: "O que dizem sobre a metodologia" },
  { onde: "CTA final", texto: "Vamos tirar a sua campanha do papel?" },
  { onde: "Sobre / história", texto: "Da inquietação ao impacto" },
  { onde: "Case", texto: "Do lote vazio ao início da obra, em 101 dias" },
];

const TestesFonteTitulos = () => (
  <div className="min-h-screen bg-background pb-20">
    <header className="mx-auto max-w-5xl px-5 pb-8 pt-16 sm:px-6">
      <h1 className="font-display text-3xl font-bold">Fonte dos títulos</h1>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Hoje o site mistura duas: a maior parte dos títulos está em <strong>Inter</strong>, a
        mesma do texto corrido, e alguns poucos em <strong>Bricolage Grotesque</strong>, que é a
        do “Como legalizar a sua rifa solidária”. Abaixo, os títulos principais nas duas.
      </p>
    </header>

    <div className="mx-auto max-w-5xl space-y-4 px-5 sm:px-6">
      {TITULOS.map((t) => (
        <section key={t.onde} className="overflow-hidden rounded-2xl border border-border">
          <p className="border-b border-border bg-muted px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            {t.onde}
            {t.jaBricolage && (
              <span className="ml-2 normal-case tracking-normal" style={{ color: CORAL }}>
                (já é Bricolage hoje)
              </span>
            )}
          </p>

          <div className="grid md:grid-cols-2">
            <div className="border-b border-border p-6 md:border-b-0 md:border-r">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/60">
                Hoje · Inter
              </p>
              <p className="mt-3 text-2xl font-bold leading-tight md:text-3xl">{t.texto}</p>
            </div>
            <div className="p-6" style={{ background: "hsl(15 65% 56% / 0.05)" }}>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: CORAL }}>
                Proposta · Bricolage
              </p>
              <p className="mt-3 font-display text-2xl font-bold leading-tight md:text-3xl">
                {t.texto}
              </p>
            </div>
          </div>
        </section>
      ))}
    </div>

    {/* como fica no escuro, que é onde metade dos títulos vive */}
    <div className="mt-10 py-14" style={{ background: PETROLEO_MEDIO }}>
      <div className="mx-auto grid max-w-5xl gap-10 px-5 sm:px-6 md:grid-cols-2">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
            Hoje · Inter
          </p>
          <p className="mt-3 text-3xl font-bold leading-tight text-white md:text-4xl">
            As rifas que originaram o método
          </p>
          <p className="mt-4 text-white/55">Números reais de cada campanha.</p>
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: CORAL }}>
            Proposta · Bricolage
          </p>
          <p className="mt-3 font-display text-3xl font-bold leading-tight text-white md:text-4xl">
            As rifas que originaram o método
          </p>
          <p className="mt-4 text-white/55">Números reais de cada campanha.</p>
        </div>
      </div>
    </div>
  </div>
);

export default TestesFonteTitulos;
