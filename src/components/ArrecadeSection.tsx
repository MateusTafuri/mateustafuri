import { ArrowUpRight } from "lucide-react";

/* A Arrecade entra como menção, não como vitrine: quem quiser saber mais vai
   para o site dela. */

const ArrecadeSection = () => (
  <section id="arrecade" className="scroll-mt-20 px-5 py-12 sm:px-6">
    <a
      href="https://arrecade.social"
      target="_blank"
      rel="noopener noreferrer"
      className="group mx-auto flex max-w-4xl flex-col gap-2 rounded-2xl border border-border bg-card px-6 py-5 no-underline transition-colors hover:border-primary/40 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
    >
      <span>
        <span className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
          Plataforma de doações
        </span>
        <span className="mt-1 block font-display text-lg font-bold leading-snug text-foreground">
          Arrecade
        </span>
        <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
          A plataforma de doações que eu construo para organizações sociais.
        </span>
      </span>

      <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-primary">
        Saber mais em arrecade.social
        <ArrowUpRight
          size={16}
          className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </span>
    </a>
  </section>
);

export default ArrecadeSection;
