import { useEffect, useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import DragCarousel from "@/components/DragCarousel";
import EmBreveCase from "@/components/EmBreveCase";

import logoBonete from "@/assets/logo-bonete.webp";
import logoTafuri from "@/assets/logo-tafuri.webp";

import drone from "@/assets/bonete-drone.webp";
import dojoKids from "@/assets/bonete-dojo-kids.webp";
import turma from "@/assets/bonete-turma.webp";
import barco from "@/assets/bonete-barco.webp";
import tijolosPraia from "@/assets/bonete-tijolos-praia.webp";
import quadriciclo from "@/assets/bonete-quadriciclo.webp";
import inauguracao from "@/assets/bonete-inauguracao.webp";
import rifaGrupo from "@/assets/bonete-rifa-grupo.webp";
import criancaPraia from "@/assets/bonete-crianca-praia-hq.webp";

/* ─────────────────────────── DATA ─────────────────────────── */

const SECTIONS = [
  { id: "desafio", label: "O desafio" },
  { id: "estrategia", label: "Estratégia" },
  { id: "entregas", label: "O que entregamos" },
  { id: "processo", label: "Processo" },
  { id: "artes", label: "As artes" },
  { id: "ficha", label: "Ficha técnica" },
];

const STRATEGY = [
  {
    n: "01",
    title: "Narrativa & storytelling",
    text: "Levamos a rotina do Bonete para telas de todo o Brasil. Cada bilhete comprado era, na prática, um tijolo colocado no novo dojo.",
  },
  {
    n: "02",
    title: "Rifa Solidária",
    text: "Em vez de só pedir doação, criamos um prêmio-experiência: 3 diárias na Pousada Canto Bravo, unindo o apoio ao turismo local.",
  },
  {
    n: "03",
    title: "Tráfego pago",
    text: "R$ 41 mil investidos em mídia, com testes de criativos e distribuição inteligente para escalar a história a milhões de pessoas.",
  },
  {
    n: "04",
    title: "Mobilização da comunidade",
    text: "As próprias crianças carregando madeira e tijolos: parte da campanha e donas do teto que ajudaram a levantar.",
  },
];

const DELIVERABLES = [
  { title: "Rifa Solidária", sub: "Metodologia de captação com prêmio-experiência" },
  { title: "Copywriting & storytelling", sub: "Narrativa que levou o Bonete ao Brasil" },
  { title: "Gestão de tráfego pago", sub: "R$ 41 mil em Meta Ads" },
  { title: "Criativos de campanha", sub: "Carrosséis e vídeos nativos" },
  { title: "Mobilização comunitária", sub: "A comunidade como parte da história" },
  { title: "Estratégia de arrecadação", sub: "Bilhetes, doações e checkout" },
];

const PROCESS = [
  {
    n: "01",
    title: "Imersão na comunidade",
    text: "Cheguei em maio de 2024 como voluntário e vivi quatro meses no Bonete, entendendo a cultura caiçara e o propósito do mestre André Queiroz.",
    img: dojoKids,
  },
  {
    n: "02",
    title: "Narrativa & Rifa Solidária",
    text: "Criamos a rifa com um prêmio-experiência e, através de copywriting e storytelling, levamos a rotina do Bonete para as telas de todo o Brasil.",
    img: rifaGrupo,
  },
  {
    n: "03",
    title: "A logística do impossível",
    text: "Mais de 9 toneladas de material atravessando o mar, desembarcadas na areia e subidas no morro, com quadriciclos e, principalmente, no braço da comunidade.",
    img: barco,
  },
  {
    n: "04",
    title: "A construção e a inauguração",
    text: "Tijolo por tijolo até 20 de dezembro de 2025: o novo tatame esticado, o cheiro de madeira nova e o brilho no olhar de cada aluno.",
    img: inauguracao,
  },
];

const STATS = [
  { label: "Alcance no Instagram", value: "1,2M+" },
  { label: "Impressões", value: "2,3M+" },
  { label: "Novos Apoiadores", value: "2.161" },
  { label: "Total Arrecadado", value: "R$ 152.678" },
];

const FICHA = [
  { label: "Ano", value: "2024 – 2025" },
  { label: "Projeto", value: "Dojo Bonete · Ilhabela/SP" },
  { label: "Metodologia", value: "Rifa Solidária" },
  { label: "Idealização & Mestre", value: "André Queiroz" },
  { label: "Estratégia & Captação", value: "Mateus Tafuri" },
  { label: "Comunidade", value: "Moradores da Praia do Bonete" },
];

const CARROSSEIS = [
  { title: "Uma comunidade unida", slug: "carrossel-3", count: 6 },
  { title: "Tijolo em tijolo", slug: "tijolo-em-tijolo", count: 6 },
  { title: "Rifa Solidária", slug: "rifa-solidaria", count: 10 },
  { title: "8 motivos", slug: "8-motivos", count: 10 },
  { title: "Jiu-jitsu", slug: "jiu-jitsu", count: 9 },
  { title: "O impacto", slug: "o-impacto", count: 6 },
].map((c) => ({
  ...c,
  images: Array.from({ length: c.count }, (_, i) => `/carrosseis/${c.slug}/${i + 1}.jpg`),
}));

/* ─────────────────────────── HELPERS ─────────────────────────── */

const Label = ({ children }: { children: React.ReactNode }) => (
  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A9C46C] mb-4">
    {children}
  </p>
);

/* Sticky scroll-spy anchor menu */
const AnchorNav = () => {
  const [active, setActive] = useState(SECTIONS[0].id);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = barRef.current?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [active]);

  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="sticky top-0 z-40 border-y border-black/5 bg-[#F4F0E6]/95 backdrop-blur-md">
      <div
        ref={barRef}
        className="mx-auto flex max-w-5xl items-center gap-2 overflow-x-auto px-4 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {SECTIONS.map((s) => {
          const on = active === s.id;
          return (
            <button
              key={s.id}
              data-id={s.id}
              onClick={() => go(s.id)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                on ? "bg-[#16281f] text-[#F4F0E6]" : "text-[#16281f]/60 hover:text-[#16281f]"
              }`}
            >
              {s.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

/* ─────────────────────────── PAGE ─────────────────────────── */

const DojoBonete = () => (
  <div className="min-h-screen bg-background text-foreground">
    <Navbar />

    <div
      className="text-[#F4F0E6]"
      style={{ background: "linear-gradient(165deg, #0f1f18 0%, #14271e 45%, #193024 100%)" }}
    >
      {/* ───────── HERO ───────── */}
      <header className="relative overflow-hidden px-6 pt-28 pb-16 md:pt-32 md:pb-24">
        <div
          className="pointer-events-none absolute -right-32 -top-24 h-96 w-96 rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle, #2f6b45 0%, transparent 70%)" }}
        />
        <div className="relative mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Link
              to="/#cases"
              className="mb-8 inline-flex items-center gap-2 text-sm text-[#F4F0E6]/60 transition-colors hover:text-[#A9C46C]"
            >
              <ArrowLeft size={16} /> Voltar para cases
            </Link>

            <div className="mb-6 flex items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F4F0E6]/50">
                Projeto
              </span>
              <img
                src={logoBonete}
                alt="Logo Dojo Bonete"
                className="h-11 w-11 rounded-xl border border-white/15 bg-white/5 object-cover p-1"
              />
              <span className="rounded-full bg-[#A9C46C]/15 px-3 py-1 text-xs font-medium text-[#A9C46C]">
                Rifa Solidária
              </span>
            </div>

            <h1 className="font-display text-5xl font-extrabold leading-[0.95] tracking-tight md:text-7xl">
              Dojo Bonete
            </h1>
            <p className="mt-4 font-display text-xl font-semibold text-[#F4F0E6]/85 md:text-2xl">
              A construção coletiva de um sonho caiçara
            </p>
            <p className="mt-5 max-w-md text-base leading-relaxed text-[#F4F0E6]/65">
              Como a união de uma comunidade isolada e o poder da comunicação
              estratégica transformaram o propósito de um professor de jiu-jitsu
              em uma realidade que muda destinos.
            </p>
          </div>

          {/* Fanned photo deck */}
          <div className="relative hidden h-[380px] md:block">
            {[
              { src: drone, r: "-8deg", x: "0%", y: "6%", z: 10 },
              { src: inauguracao, r: "6deg", x: "28%", y: "0%", z: 20 },
              { src: turma, r: "-3deg", x: "14%", y: "30%", z: 30 },
            ].map((c, idx) => (
              <img
                key={idx}
                src={c.src}
                alt=""
                className="absolute h-64 w-48 rounded-2xl border-4 border-[#F4F0E6]/90 object-cover shadow-2xl"
                style={{ transform: `rotate(${c.r})`, left: c.x, top: c.y, zIndex: c.z }}
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </header>

      {/* ───────── STICKY INTERACTIVE MENU ───────── */}
      <AnchorNav />

      <main className="mx-auto max-w-5xl px-6">
        {/* ───────── O DESAFIO ───────── */}
        <section id="desafio" className="scroll-mt-24 border-t border-white/10 py-16 md:py-20">
          <Label>O desafio</Label>
          <p className="max-w-3xl font-display text-2xl font-semibold leading-snug md:text-3xl">
            Como construir um centro esportivo de alto nível em um lugar onde cada
            grama de cimento precisa vir pelo mar?
          </p>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div className="space-y-4 text-[#F4F0E6]/70 leading-relaxed">
              <p>
                Ilhabela guarda um dos seus maiores tesouros na Praia do Bonete:
                uma comunidade caiçara com cerca de 350 moradores, onde o acesso é
                limitado a 12 km de trilha ou ao balanço do mar em pequenas
                embarcações.
              </p>
              <p>
                Nesse isolamento, o mestre <strong className="text-[#F4F0E6]">André
                Queiroz</strong> ensinava jiu-jitsu nos alicerces da própria casa.
                O projeto cresceu e ficou claro que o Bonete precisava de um
                espaço dedicado. O desafio não era só financeiro: era logístico e
                narrativo.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src={drone} alt="Vista aérea da Praia do Bonete" className="h-56 w-full rounded-2xl object-cover" loading="lazy" />
              <img src={criancaPraia} alt="Criança na praia do Bonete" className="h-56 w-full rounded-2xl object-cover" loading="lazy" />
            </div>
          </div>
        </section>

        {/* ───────── ESTRATÉGIA ADOTADA ───────── */}
        <section id="estrategia" className="scroll-mt-24 border-t border-white/10 py-16 md:py-20">
          <Label>Estratégia adotada</Label>
          <h2 className="font-display text-3xl font-bold md:text-4xl">
            Transformando solidariedade em experiência
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {STRATEGY.map((s) => (
              <div
                key={s.n}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-colors hover:border-[#A9C46C]/40"
              >
                <span className="font-display text-2xl font-extrabold text-[#A9C46C]">{s.n}</span>
                <h3 className="mt-2 font-display text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#F4F0E6]/65">{s.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ───────── O QUE ENTREGAMOS ───────── */}
        <section id="entregas" className="scroll-mt-24 border-t border-white/10 py-16 md:py-20">
          <Label>O que entregamos</Label>
          <h2 className="font-display text-3xl font-bold md:text-4xl">
            Uma operação completa de captação
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {DELIVERABLES.map((d) => (
              <div key={d.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <h3 className="font-semibold">{d.title}</h3>
                <p className="mt-1 text-sm text-[#F4F0E6]/60">{d.sub}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ───────── PROCESSO DE DESENVOLVIMENTO ───────── */}
        <section id="processo" className="scroll-mt-24 border-t border-white/10 py-16 md:py-20">
          <Label>Processo de desenvolvimento</Label>
          <h2 className="font-display text-3xl font-bold md:text-4xl">
            Do propósito à inauguração, passo a passo
          </h2>
          <div className="mt-10 space-y-6">
            {PROCESS.map((p, idx) => (
              <div
                key={p.n}
                className={`grid items-center gap-6 rounded-2xl border border-white/10 bg-white/[0.04] p-4 md:grid-cols-2 ${
                  idx % 2 ? "md:[&>figure]:order-2" : ""
                }`}
              >
                <div className="p-2 md:p-6">
                  <span className="font-display text-2xl font-extrabold text-[#A9C46C]">{p.n}</span>
                  <h3 className="mt-2 font-display text-xl font-bold">{p.title}</h3>
                  <p className="mt-2 text-[#F4F0E6]/65 leading-relaxed">{p.text}</p>
                </div>
                <figure className="overflow-hidden rounded-xl">
                  <img src={p.img} alt={p.title} className="h-56 w-full object-cover md:h-64" loading="lazy" />
                </figure>
              </div>
            ))}
          </div>

          {/* Resultado */}
          <div className="mt-10">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-center">
                  <p className="font-display text-2xl font-extrabold text-[#A9C46C] md:text-3xl">{s.value}</p>
                  <p className="mt-1 text-xs text-[#F4F0E6]/60">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 overflow-hidden rounded-2xl border border-[#A9C46C]/30 bg-white/[0.04] py-8 text-center">
              <p className="text-xs uppercase tracking-[0.2em] text-[#F4F0E6]/60">Lucro real para o projeto</p>
              <p className="mt-2 font-display text-5xl font-extrabold text-[#A9C46C] md:text-6xl">R$ 102.574</p>
            </div>
          </div>
        </section>

        {/* ───────── AS ARTES (carrosséis — no final) ───────── */}
        <section id="artes" className="scroll-mt-24 border-t border-white/10 py-16 md:py-20">
          <Label>As artes</Label>
          <h2 className="font-display text-3xl font-bold md:text-4xl">Os carrosséis da campanha</h2>
          <p className="mt-4 mb-10 max-w-2xl text-[#F4F0E6]/70 leading-relaxed">
            As peças que levaram a história do Dojo Bonete para todo o Brasil.
            Arraste para o lado para ver cada carrossel.
          </p>
          <div className="space-y-12">
            {CARROSSEIS.map((c) => (
              <DragCarousel key={c.slug} title={c.title} images={c.images} />
            ))}
          </div>
        </section>

        {/* ───────── FICHA TÉCNICA ───────── */}
        <section id="ficha" className="scroll-mt-24 border-t border-white/10 py-16 md:py-20">
          <Label>Ficha técnica</Label>
          <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 md:grid-cols-3">
            {FICHA.map((f) => (
              <div key={f.label} className="border-t border-white/10 pt-4">
                <p className="text-xs uppercase tracking-[0.15em] text-[#F4F0E6]/45">{f.label}</p>
                <p className="mt-1 font-medium">{f.value}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <EmBreveCase />

      {/* ───────── CTA ───────── */}
      <section className="border-t border-white/10 px-6 py-20 text-center">
        <div className="mx-auto max-w-2xl">
          <img
            src={logoTafuri}
            alt="Mateus Tafuri"
            className="mx-auto mb-2 h-24 w-24 [filter:brightness(0)_saturate(100%)_invert(80%)_sepia(18%)_saturate(700%)_hue-rotate(35deg)_brightness(95%)_contrast(88%)]"
          />
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#A9C46C]">
            Sua causa é a próxima
          </p>
          <h2 className="font-display text-3xl font-bold md:text-4xl">Vamos captar juntos?</h2>
          <p className="mx-auto mt-4 mb-8 max-w-lg text-[#F4F0E6]/65 leading-relaxed">
            Se o Dojo Bonete te inspirou, imagine o que podemos construir pela sua
            causa. Vamos transformar sua história em uma campanha que mobiliza,
            emociona e arrecada.
          </p>
          <a
            href="https://wa.me/5567998860067"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full bg-[#A9C46C] px-8 py-4 text-base font-semibold text-[#16281f] transition-opacity hover:opacity-90"
          >
            Falar com Mateus no WhatsApp
          </a>
        </div>
      </section>
    </div>

    <footer className="py-6 text-center text-xs text-muted-foreground">
      © 2026 Mateus Tafuri | Impacto Social
    </footer>
  </div>
);

export default DojoBonete;
