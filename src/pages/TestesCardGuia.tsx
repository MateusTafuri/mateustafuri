import { ArrowRight, ArrowUpRight, BookOpen, Check, ListChecks } from "lucide-react";
import { Link } from "react-router-dom";

/* Cinco desenhos para o cartão que leva ao guia completo, no fim das cinco
   etapas da Rifa Solidária. Página de teste: nada em uso ainda. */

const CORAL = "hsl(15 65% 56%)";
const PETROLEO = "hsl(176 39% 14%)";
const PETROLEO_MEDIO = "hsl(178 36% 22%)";
const CREME = "#F4F0E6";
const DESTINO = "/como-estruturar-rifa-solidaria-digital";

const Bloco = ({
  n,
  titulo,
  nota,
  children,
}: {
  n: number;
  titulo: string;
  nota: string;
  children: React.ReactNode;
}) => (
  <section className="border-t border-black/10 py-12">
    <div className="mx-auto mb-6 max-w-4xl px-5 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: CORAL }}>
        Versão {n}
      </p>
      <h2 className="mt-1 text-xl font-bold">{titulo}</h2>
      <p className="mt-1 text-sm text-black/50">{nota}</p>
    </div>
    <div className="py-8" style={{ background: CREME }}>
      <div className="mx-auto max-w-4xl px-5 sm:px-6">{children}</div>
    </div>
  </section>
);

/* ── 1. ícone à esquerda e seta em botão ── */
const V1 = () => (
  <Link
    to={DESTINO}
    className="group flex items-center gap-5 rounded-2xl border bg-white p-6 no-underline transition-shadow hover:shadow-lg"
    style={{ borderColor: "hsl(15 65% 56% / 0.3)" }}
  >
    <span
      className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl"
      style={{ background: "hsl(15 65% 56% / 0.12)", color: CORAL }}
    >
      <BookOpen size={22} />
    </span>
    <span className="min-w-0 flex-1">
      <span className="block text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: CORAL }}>
        Guia completo e gratuito
      </span>
      <span className="mt-1 block font-display text-lg font-bold leading-snug">
        Cada etapa destrinchada, com erros comuns e checklist
      </span>
    </span>
    <span
      className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-white transition-transform group-hover:translate-x-1"
      style={{ background: CORAL }}
    >
      <ArrowRight size={18} />
    </span>
  </Link>
);

/* ── 2. cartão escuro, corta o claro da página ── */
const V2 = () => (
  <Link
    to={DESTINO}
    className="group block overflow-hidden rounded-3xl no-underline"
    style={{ background: PETROLEO_MEDIO }}
  >
    <div className="flex flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between">
      <span>
        <span className="block text-[11px] font-semibold uppercase tracking-[0.25em] text-white/45">
          Guia completo e gratuito
        </span>
        <span className="mt-2 block font-display text-2xl font-bold text-white">
          Quer cada etapa destrinchada?
        </span>
        <span className="mt-2 block text-white/60">
          Erros comuns, checklist e os números de três campanhas reais.
        </span>
      </span>
      <span
        className="inline-flex shrink-0 items-center gap-2 self-start rounded-full px-6 py-3.5 text-sm font-semibold text-white transition-transform group-hover:translate-x-1 md:self-auto"
        style={{ background: CORAL }}
      >
        Ler o guia <ArrowRight size={16} />
      </span>
    </div>
  </Link>
);

/* ── 3. com a capa do guia ao lado ── */
const V3 = () => (
  <Link
    to={DESTINO}
    className="group flex flex-col gap-6 rounded-2xl border border-black/10 bg-white p-5 no-underline transition-colors hover:border-black/20 sm:flex-row sm:items-center"
  >
    <span
      className="flex h-32 w-full shrink-0 flex-col justify-between rounded-xl p-4 sm:w-40"
      style={{ background: PETROLEO }}
    >
      <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/40">
        Guia gratuito
      </span>
      <span className="font-display text-sm font-bold leading-tight text-white">
        Como estruturar a sua rifa solidária no digital
      </span>
      <span className="text-[9px] font-semibold uppercase tracking-[0.2em]" style={{ color: CORAL }}>
        Cinco etapas
      </span>
    </span>
    <span className="min-w-0">
      <span className="block font-display text-lg font-bold leading-snug">
        Cada etapa destrinchada, do jeito que aplico nas campanhas
      </span>
      <span className="mt-2 block text-sm leading-relaxed text-black/60">
        O que decidir em cada uma, os erros mais comuns, o checklist para fechar e o case que
        mostra como foi na prática.
      </span>
      <span
        className="mt-4 inline-flex items-center gap-2 text-sm font-semibold"
        style={{ color: CORAL }}
      >
        Abrir o guia <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
      </span>
    </span>
  </Link>
);

/* ── 4. filete coral, sem caixa ── */
const V4 = () => (
  <Link
    to={DESTINO}
    className="group flex items-start gap-5 border-l-4 py-2 pl-5 no-underline"
    style={{ borderColor: CORAL }}
  >
    <span className="min-w-0 flex-1">
      <span className="block text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: CORAL }}>
        Guia completo e gratuito
      </span>
      <span className="mt-1 block font-display text-2xl font-bold leading-snug">
        Quer cada etapa destrinchada, com erros comuns e checklist?
      </span>
      <span className="mt-2 block text-black/55">
        O caminho inteiro de como estruturar a sua rifa no digital.
      </span>
    </span>
    <ArrowUpRight
      size={26}
      className="mt-1 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      style={{ color: CORAL }}
    />
  </Link>
);

/* ── 5. com o que tem dentro, item a item ── */
const V5 = () => (
  <Link
    to={DESTINO}
    className="group block rounded-2xl bg-white p-7 no-underline shadow-sm ring-1 ring-black/5 transition-shadow hover:shadow-lg"
  >
    <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: CORAL }}>
      <ListChecks size={15} /> Guia completo e gratuito
    </span>
    <span className="mt-3 block font-display text-2xl font-bold leading-snug">
      Cada etapa destrinchada, com o que decidir em cada uma
    </span>

    <span className="mt-5 grid gap-2 sm:grid-cols-3">
      {["As três decisões de cada etapa", "Os erros que mais derrubam campanha", "Checklist para fechar cada uma"].map(
        (t) => (
          <span key={t} className="flex gap-2 text-sm leading-snug text-black/60">
            <Check size={15} className="mt-0.5 shrink-0" style={{ color: CORAL }} />
            {t}
          </span>
        ),
      )}
    </span>

    <span
      className="mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-transform group-hover:translate-x-1"
      style={{ background: CORAL }}
    >
      Ler o guia completo <ArrowRight size={16} />
    </span>
  </Link>
);

const TestesCardGuia = () => (
  <div className="min-h-screen bg-background pb-20">
    <header className="mx-auto max-w-4xl px-5 pb-4 pt-16 sm:px-6">
      <h1 className="font-display text-3xl font-bold">Cartão do guia completo</h1>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Cinco versões do bloco que fecha as cinco etapas na Rifa Solidária, todas no fundo creme
        da página.
      </p>
    </header>

    <Bloco n={1} titulo="Ícone e seta em botão" nota="A mesma caixa de hoje, com ícone, eyebrow e a seta virando botão coral.">
      <V1 />
    </Bloco>
    <Bloco n={2} titulo="Cartão escuro" nota="Bloco petróleo cortando o claro da página. É o que mais chama atenção.">
      <V2 />
    </Bloco>
    <Bloco n={3} titulo="Com a capa do guia" nota="Uma miniatura do guia à esquerda, como capa de livro.">
      <V3 />
    </Bloco>
    <Bloco n={4} titulo="Filete coral, sem caixa" nota="Sem moldura: só o filete e a seta. O mais leve e editorial.">
      <V4 />
    </Bloco>
    <Bloco n={5} titulo="Com o que tem dentro" nota="Lista os três ganhos antes do botão. É o que mais convence a clicar.">
      <V5 />
    </Bloco>
  </div>
);

export default TestesCardGuia;
