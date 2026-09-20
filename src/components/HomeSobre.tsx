import { ArrowRight, ArrowUpRight, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import NumeroAnimado from "@/components/NumeroAnimado";
import { NUMEROS, RetratoRotativo } from "@/components/ConteudoRifa";
import { WHATSAPP_SOBRE } from "@/data/rifaSolidaria";

/* A apresentação na entrada do site. Fala do trabalho inteiro, não de uma
   metodologia só: a Rifa Solidária virou uma porta entre outras, e o método
   completo mora agora na página dela. */

const DESTAQUES = [
  {
    to: "/rifa-solidaria",
    titulo: "Rifa Solidária",
    texto: "A metodologia completa em cinco etapas, aberta e com os números de cada campanha.",
  },
  {
    to: "/mapeamento-rifa-solidaria",
    titulo: "Mapeamento gratuito",
    texto: "Quinze perguntas que viram o plano da sua campanha em PDF, sem cadastro.",
  },
  {
    to: "/como-legalizar-a-rifa",
    titulo: "Como legalizar a rifa",
    texto: "Do CNPJ à prestação de contas, o caminho legal explicado em sete etapas.",
  },
];

const HomeSobre = () => (
  <section id="sobre" className="scroll-mt-20 bg-secondary/40 px-5 py-16 sm:px-6 md:py-20">
    <div className="mx-auto max-w-4xl">
      <div className="grid gap-8 md:grid-cols-[300px_1fr] md:items-center md:gap-10">
        <RetratoRotativo />
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            Sobre mim
          </p>
          <h2 className="mb-2 font-display text-2xl font-bold md:text-4xl">Mateus Tafuri</h2>
          <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Estratégia · Mobilização · Captação de Recursos
          </p>
          <div className="space-y-3 text-justify leading-relaxed text-muted-foreground hyphens-auto">
            <p>
              Ajudo projetos sociais a transformar causa em recurso. Trabalho os dois
              lados do problema: a campanha que mobiliza e a estrutura que recebe a
              doação.
            </p>
            <p>
              São mais de dez campanhas conduzidas, uma metodologia própria de rifa
              solidária e, hoje, a Arrecade — a plataforma de doações que construo para
              organizações sem equipe de tecnologia.
            </p>
          </div>
          <Link
            to="/sobre"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            Mais sobre mim <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* números consolidados */}
      <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
        {NUMEROS.map((n) => (
          <div
            key={n.label}
            className="rounded-2xl border border-border bg-background px-4 py-5 text-center"
          >
            <p className="text-xl font-bold text-primary sm:text-2xl">
              <NumeroAnimado valor={n.valor} />
            </p>
            <p className="mt-1 text-[11px] leading-snug text-muted-foreground sm:text-xs">
              {n.label}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <a
          href={WHATSAPP_SOBRE}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground no-underline transition-opacity hover:opacity-90"
        >
          <MessageCircle size={18} /> Mandar mensagem
        </a>
      </div>

      {/* as portas de entrada do conteúdo, que antes ficavam abertas na home */}
      <div className="mt-12 grid gap-3 sm:grid-cols-3">
        {DESTAQUES.map((d) => (
          <Link
            key={d.to}
            to={d.to}
            className="group rounded-2xl border border-border bg-background p-5 no-underline transition-colors hover:border-primary/40"
          >
            <p className="flex items-center gap-2 font-display text-lg font-bold text-foreground">
              {d.titulo}
              <ArrowUpRight
                size={16}
                className="text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{d.texto}</p>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default HomeSobre;
