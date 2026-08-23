import { ArrowRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import FeedbackSection from "@/components/FeedbackSection";
import CtaSection from "@/components/CtaSection";
import { ETAPAS } from "@/data/rifaSolidaria";

import caseCaraiva from "@/assets/case-caraiva-v2.webp";
import caseBonete from "@/assets/case-bonete-v3.webp";
import caseCorumbau from "@/assets/case-corumbau.webp";
import logoCaraiva from "@/assets/logo-caraiva.webp";
import logoBonete from "@/assets/logo-bonete.webp";
import logoCorumbau from "@/assets/logo-corumbau.webp";

/* Versão enxuta da entrada: prova primeiro, biografia na página /sobre.
   Cinco blocos — topo, cases, método, um depoimento e contato. */

const CASES = [
  {
    img: caseBonete,
    logo: logoBonete,
    nome: "Dojo Bonete",
    local: "Ilhabela, SP",
    valor: "R$ 155,7 mil",
    linha: "em 104 dias, para erguer um dojo do outro lado do mar",
    path: "/dojo-bonete",
    pos: "center 58%",
  },
  {
    img: caseCorumbau,
    logo: logoCorumbau,
    nome: "Corumbau BJJ",
    local: "Corumbau, BA",
    valor: "R$ 159,5 mil",
    linha: "em 101 dias, para a primeira sede cultural da vila",
    path: "/corumbau-bjj",
    pos: "center 65%",
  },
  {
    img: caseCaraiva,
    logo: logoCaraiva,
    nome: "Dojo Caraíva",
    local: "Caraíva, BA",
    valor: "R$ 100 mil",
    linha: "em bilhetes de R$ 20, garantindo um ano de projeto",
    path: "/dojo-caraiva",
    pos: "center 65%",
  },
];

const TestesHomeEnxuta = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <HeroSection />

    {/* ───────── OS CASES, COM O NÚMERO NA FRENTE ───────── */}
    <section className="mx-auto max-w-5xl scroll-mt-24 px-6 py-16" id="cases">
      <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-primary">
        Campanhas
      </p>
      <h2 className="mb-8 text-2xl font-bold md:text-3xl">
        R$ 415 mil captados para três projetos sociais
      </h2>

      <div className="grid gap-5 md:grid-cols-3">
        {CASES.map((c) => (
          <Link
            key={c.path}
            to={c.path}
            className="group overflow-hidden rounded-2xl border border-border bg-card no-underline shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={c.img}
                alt={c.nome}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                style={{ objectPosition: c.pos }}
              />
            </div>
            <div className="p-5 text-foreground">
              <div className="mb-2 flex items-center gap-2">
                <img src={c.logo} alt="" className="h-6 w-6 rounded-full object-cover" />
                <span className="text-sm font-semibold">{c.nome}</span>
                <ArrowRight
                  size={16}
                  className="ml-auto text-primary transition-transform group-hover:translate-x-1"
                />
              </div>
              <p className="font-display text-2xl font-extrabold text-primary">{c.valor}</p>
              <p className="mt-1 text-sm leading-snug text-muted-foreground">{c.linha}</p>
              <div className="mt-3 flex items-center gap-1 text-xs font-medium text-muted-foreground/80">
                <MapPin size={12} className="text-primary" />
                <span>{c.local}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>

    {/* ───────── O MÉTODO, EM UM BLOCO ───────── */}
    <section className="bg-secondary">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-primary">
          O método
        </p>
        <h2 className="max-w-2xl text-2xl font-bold md:text-3xl">
          Rifa Solidária: cinco etapas entre a sua causa e o valor que ela precisa
        </h2>
        <p className="mt-3 max-w-2xl leading-relaxed text-secondary-foreground/70">
          A mesma metodologia nas três campanhas. Ela troca o pedido de doação por uma
          oferta que a pessoa quer aceitar.
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {ETAPAS.map((e) => (
            <span
              key={e.n}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold"
            >
              <span className="text-base leading-none">{e.emoji}</span>
              {e.n}. {e.title}
            </span>
          ))}
        </div>

        <Link
          to="/rifa-solidaria"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground no-underline transition-opacity hover:opacity-90"
        >
          Conhecer a metodologia <ArrowRight size={16} />
        </Link>
      </div>
    </section>

    {/* ───────── UM DEPOIMENTO ───────── */}
    <FeedbackSection titulo="O que dizem sobre o trabalho" apenas="Dojo Caraíva" />

    <CtaSection />
    <Footer />
  </div>
);

export default TestesHomeEnxuta;
