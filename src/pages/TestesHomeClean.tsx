import { ArrowRight, Instagram, Linkedin, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { ETAPAS } from "@/data/rifaSolidaria";

import logoTafuri from "@/assets/logo-tafuri.webp";
import retrato from "@/assets/retrato-mateus.webp";
import caseBonete from "@/assets/case-bonete-v3.webp";
import caseCorumbau from "@/assets/case-corumbau.webp";
import caseCaraiva from "@/assets/case-caraiva-v2.webp";

/* Entrada pensada para quem chega do link da bio: quieta, curta e vertical.
   Quem é, o que fez, como fez e como falar comigo, nessa ordem. */

const NUMEROS = [
  { v: "R$ 415 mil", l: "captados" },
  { v: "3", l: "campanhas" },
  { v: "9.600+", l: "apoiadores" },
];

const CASES = [
  {
    img: caseBonete,
    nome: "Dojo Bonete",
    local: "Ilhabela, SP",
    valor: "R$ 155,7 mil",
    linha: "um dojo erguido do outro lado do mar",
    path: "/dojo-bonete",
  },
  {
    img: caseCorumbau,
    nome: "Corumbau BJJ",
    local: "Corumbau, BA",
    valor: "R$ 159,5 mil",
    linha: "a primeira sede cultural da vila",
    path: "/corumbau-bjj",
  },
  {
    img: caseCaraiva,
    nome: "Dojo Caraíva",
    local: "Caraíva, BA",
    valor: "R$ 100 mil",
    linha: "um ano inteiro de projeto garantido",
    path: "/dojo-caraiva",
  },
];

/* A maior parte de quem chega pelo Instagram nunca vai contratar uma campanha.
   Cada porta atende um desses públicos, sem privilegiar o cliente. */
const PORTAS = [
  {
    titulo: "Quero fazer a minha própria campanha",
    linha: "O passo a passo completo da Rifa Solidária, de graça",
    href: "/rifa-solidaria",
    externo: false,
  },
  {
    titulo: "Quero que você conduza a minha",
    linha: "Me conta a sua causa no WhatsApp",
    href: "https://wa.me/5567998860067",
    externo: true,
  },
  {
    titulo: "Só quero saber quem é você",
    linha: "Como cheguei até aqui e o que faço hoje",
    href: "/testes-sobre",
    externo: false,
  },
] as const;

const REDES = [
  { icone: Instagram, label: "@mateustafuri", href: "https://www.instagram.com/mateustafuri/" },
  { icone: MessageCircle, label: "WhatsApp", href: "https://wa.me/5567998860067" },
  { icone: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/mateus-tafuri/" },
];

const TestesHomeClean = () => (
  <div className="min-h-screen bg-[#FBFAF7] text-foreground">
    {/* ───────── topo discreto ───────── */}
    <header className="mx-auto flex max-w-xl items-center justify-between px-6 py-5">
      <span className="flex items-center gap-2">
        <span
          aria-hidden
          className="inline-block h-7 w-7 bg-primary"
          style={{
            WebkitMaskImage: `url(${logoTafuri})`,
            maskImage: `url(${logoTafuri})`,
            WebkitMaskSize: "contain",
            maskSize: "contain",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            maskPosition: "center",
          }}
        />
        <span className="sr-only">Mateus Tafuri</span>
      </span>
      <a
        href="https://wa.me/5567998860067"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-muted-foreground no-underline transition-colors hover:text-primary"
      >
        Contato
      </a>
    </header>

    {/* ───────── quem é ───────── */}
    <section className="mx-auto max-w-xl px-6 pb-12 pt-6">
      <img
        src={retrato}
        alt="Mateus Tafuri"
        width={440}
        height={440}
        className="h-20 w-20 rounded-full object-cover"
      />
      <h1 className="mt-5 font-display text-3xl font-bold tracking-tight">Mateus Tafuri</h1>
      <p className="mt-3 text-base leading-relaxed text-muted-foreground">
        Trabalho com captação de recursos para projetos sociais. Nos últimos anos
        ajudei três projetos em comunidades isoladas do Brasil a levantar o dinheiro
        de que precisavam, e compartilho por aqui tudo que aprendi no caminho.
      </p>

      <dl className="mt-8 grid grid-cols-3 border-y border-border/70 py-4">
        {NUMEROS.map((n) => (
          <div key={n.l}>
            <dt className="sr-only">{n.l}</dt>
            <dd>
              <span className="block font-display text-lg font-bold text-primary">{n.v}</span>
              <span className="mt-0.5 block text-xs text-muted-foreground">{n.l}</span>
            </dd>
          </div>
        ))}
      </dl>
    </section>

    {/* ───────── as campanhas ───────── */}
    <section className="mx-auto max-w-xl px-6 pb-12">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Campanhas
      </h2>

      <ul className="mt-3 divide-y divide-border/70 border-y border-border/70">
        {CASES.map((c) => (
          <li key={c.path}>
            <Link
              to={c.path}
              className="group flex items-center gap-4 py-4 text-foreground no-underline"
            >
              <img
                src={c.img}
                alt=""
                loading="lazy"
                className="h-14 w-14 shrink-0 rounded-xl object-cover"
              />
              <span className="min-w-0 flex-1">
                <span className="flex items-baseline gap-2">
                  <span className="truncate text-[15px] font-semibold">{c.nome}</span>
                  <span className="shrink-0 text-xs text-muted-foreground">{c.local}</span>
                </span>
                <span className="mt-0.5 block text-sm text-muted-foreground">
                  <span className="font-semibold text-primary">{c.valor}</span> · {c.linha}
                </span>
              </span>
              <ArrowRight
                size={16}
                className="shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary"
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>

    {/* ───────── o método ───────── */}
    <section className="mx-auto max-w-xl px-6 pb-12">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        O método
      </h2>
      <p className="mt-3 leading-relaxed text-muted-foreground">
        Chamo de Rifa Solidária: no lugar de pedir doação, a campanha faz uma oferta
        que a pessoa quer aceitar. São cinco etapas, as mesmas nos três projetos, e o
        passo a passo está inteiro aberto aqui, dá para rodar sozinho, sem me contratar.
      </p>
      <p className="mt-4 text-sm text-foreground/80">
        {ETAPAS.map((e) => e.title).join(" · ")}
      </p>
      <Link
        to="/rifa-solidaria"
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary no-underline hover:underline"
      >
        Ver as cinco etapas <ArrowRight size={14} />
      </Link>
    </section>

    {/* ───────── uma voz de quem viveu ───────── */}
    <section className="mx-auto max-w-xl px-6 pb-12">
      <blockquote className="border-l-2 border-primary/30 pl-4">
        <p className="text-[15px] leading-relaxed text-foreground/85">
          Me senti apoiada financeiramente na nossa missão pela primeira vez. Fizemos
          mais e por mais pessoas.
        </p>
        <footer className="mt-2 text-xs text-muted-foreground">
          Suellen Thomaz Boni · Dojo Caraíva
        </footer>
      </blockquote>
    </section>

    {/* ───────── contato ───────── */}
    <section className="mx-auto max-w-xl px-6 pb-16">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Por onde seguir
      </h2>

      <ul className="mt-3 divide-y divide-border/70 border-y border-border/70">
        {PORTAS.map((p) =>
          p.externo ? (
            <li key={p.titulo}>
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 py-4 text-foreground no-underline"
              >
                <span className="min-w-0 flex-1">
                  <span className="block text-[15px] font-semibold">{p.titulo}</span>
                  <span className="mt-0.5 block text-sm text-muted-foreground">{p.linha}</span>
                </span>
                <ArrowRight
                  size={16}
                  className="shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary"
                />
              </a>
            </li>
          ) : (
            <li key={p.titulo}>
              <Link
                to={p.href}
                className="group flex items-center gap-4 py-4 text-foreground no-underline"
              >
                <span className="min-w-0 flex-1">
                  <span className="block text-[15px] font-semibold">{p.titulo}</span>
                  <span className="mt-0.5 block text-sm text-muted-foreground">{p.linha}</span>
                </span>
                <ArrowRight
                  size={16}
                  className="shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary"
                />
              </Link>
            </li>
          ),
        )}
      </ul>

      <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
        {REDES.map((r) => (
          <li key={r.href}>
            <a
              href={r.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground no-underline transition-colors hover:text-primary"
            >
              <r.icone size={15} /> {r.label}
            </a>
          </li>
        ))}
      </ul>
    </section>

    <footer className="mx-auto max-w-xl border-t border-border/70 px-6 py-6 text-xs text-muted-foreground">
      © 2026 Mateus Tafuri
    </footer>
  </div>
);

export default TestesHomeClean;
