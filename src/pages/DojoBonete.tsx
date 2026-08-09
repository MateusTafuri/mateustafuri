import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Clapperboard,
  Coins,
  Megaphone,
  MousePointerClick,
  PenLine,
  Ticket,
  TrendingUp,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { ETAPAS } from "@/data/rifaSolidaria";
import BoneteHero from "@/components/BoneteHero";
import DragCarousel from "@/components/DragCarousel";

import logoBonete from "@/assets/logo-bonete.webp";
import logoTafuri from "@/assets/logo-tafuri.webp";

import inauguracao from "@/assets/bonete-inauguracao.webp";
import rifaGrupo from "@/assets/bonete-rifa-grupo.webp";
import largaPraia from "@/assets/bonete-larga-praia.jpg";

import tijolo2 from "@/assets/bonete-tijolo-2.jpg";
import tijolo3 from "@/assets/bonete-tijolo-3.jpg";

import renderInterior from "@/assets/bonete-render-interior.jpg";
import renderTatame from "@/assets/bonete-render-tatame.jpg";

import capaSorteio from "@/assets/bonete-capa-sorteio.jpg";
import flyerRifa from "@/assets/bonete-flyer-rifa.jpg";
import capaObra from "@/assets/bonete-capa-obra.jpg";
import largaDeck from "@/assets/bonete-larga-deck.jpg";

/* ─────────────────────────── DATA ─────────────────────────── */

const VERDE = "#16281f"; // fundo escuro dos blocos
const CREME = "#F4F0E6"; // base da página
const LIME = "#A9C46C"; // destaque

const SECTIONS = [
  { id: "desafio", label: "O desafio" },
  { id: "entregas", label: "A campanha" },
  { id: "estrategia", label: "Estratégia" },
  { id: "processo", label: "Processo" },
  { id: "artes", label: "As artes" },
  { id: "ficha", label: "Ficha técnica" },
];

/* uma cor por cartão, para as etapas e para as entregas */
const CORES = [
  { bg: "#A9C46C", fg: "#22331a" }, // lime
  { bg: "#C4693F", fg: "#fff" }, // tijolo
  { bg: "#3C7A99", fg: "#fff" }, // mar
  { bg: "#D9A441", fg: "#3a2c0a" }, // areia
  { bg: "#2F6B45", fg: "#fff" }, // mata
  { bg: "#8C6A9E", fg: "#fff" }, // fim de tarde
];

const DELIVERABLES = [
  { icon: Ticket, title: "Rifa Solidária", sub: "Metodologia de captação com prêmio-experiência" },
  { icon: PenLine, title: "Copywriting & storytelling", sub: "Narrativa que levou o Bonete ao Brasil" },
  { icon: TrendingUp, title: "Gestão de tráfego pago", sub: "Distribuição paga para públicos frios de todo o país" },
  { icon: Clapperboard, title: "Criativos de campanha", sub: "Carrosséis e vídeos nativos" },
  { icon: Megaphone, title: "Mobilização comunitária", sub: "A comunidade como parte da história" },
  { icon: Coins, title: "Estratégia de arrecadação", sub: "Bilhetes, doações e checkout" },
];

/* O processo contado pelas cinco etapas da metodologia. As perguntas de cada
   etapa estão em @/data/rifaSolidaria; aqui ficam as respostas do Bonete. */
const PROCESS = [
  {
    n: "01",
    etapa: "Sonhar",
    title: "Um sonho que precisava ser coletivo",
    text: "Antes de tudo foi preciso sonhar: desenhar o projeto no papel, entender a realidade local e definir um plano claro, que era a construção da sede do Dojo Bonete. A meta precisava ir além de uma necessidade interna — tinha que ser um sonho coletivo, uma causa que outras pessoas sentissem orgulho de apoiar, garantindo novas oportunidades para as crianças e jovens da comunidade através do jiu-jitsu. Em número: R$ 200 mil de meta, R$ 0 em caixa.",
    imgs: [renderInterior, renderTatame],
    retrato: true,
    alt: "Render do projeto da sede do Dojo Bonete",
    legenda: "Projeto de arquitetura doado, a custo zero para a obra.",
  },
  {
    n: "02",
    etapa: "Ofertar",
    title: "Uma viagem para o próprio Bonete",
    text: "Em vez do pedido de doação, uma oferta: por R$ 30 o bilhete, o apoiador concorria a uma experiência para duas pessoas na Praia do Bonete. Pousadas, restaurantes e lojas da região entraram com diárias, almoços, jantar, translado e passeio de lancha, e levaram visibilidade nacional de volta. Foram 4.383 bilhetes vendidos.",
    img: flyerRifa,
    retrato: true,
    alt: "Flyer da Rifa Solidária do Dojo Bonete, com os prêmios da experiência",
  },
  {
    n: "03",
    etapa: "Contar",
    title: "As tartaruguinhas no rosto da campanha",
    text: "O protagonismo ficou com as próprias crianças, apelidadas de tartaruguinhas. Vídeos espontâneos e memes no lugar de peça superproduzida, virando reels, carrosséis e flyers ao longo dos 104 dias. Na captação digital, o real conecta mais do que produção.",
    imgs: [tijolo2, tijolo3],
    retrato: true,
    alt: "Crianças do Bonete carregando tijolos e blocos na areia da praia",
  },
  {
    n: "04",
    etapa: "Escalar",
    title: "R$ 41 mil levando a história para o país",
    text: "A conversão acontecia numa página focada na transparência da obra e integrada via Pix. Grandes nomes do esporte e parceiros locais abraçaram a causa no orgânico, e o Meta Ads levou roteiros curtos de gancho forte a públicos frios de todo o Brasil: 77,2% dos bilhetes vendidos e R$ 103,5 mil em receita direta.",
    painel: true,
  },
  {
    n: "05",
    etapa: "Retribuir",
    title: "O sorteio na frente de quem construiu",
    text: "A obra virou conteúdo: atualizações constantes da fundação ao telhado, e vídeos exclusivos gravados na construção para os maiores doadores. O sorteio do prêmio aconteceu no dia da inauguração, diante da comunidade que carregou cada tijolo.",
    img: inauguracao,
    alt: "Inauguração do novo dojo, com a comunidade reunida",
  },
];

const STATS = [
  { label: "Visualizações totais", value: "1,2 mi" },
  { label: "Bilhetes vendidos", value: "4.383" },
  { label: "Novos apoiadores", value: "2.077" },
  { label: "Seguidores nas redes", value: "+100%" },
  { label: "Mobilizados na campanha", value: "R$ 155,7 mil" },
  { label: "Líquidos para o projeto", value: "R$ 102,5 mil" },
  { label: "Investidos em anúncios", value: "R$ 41 mil" },
  { label: "Retorno sobre os anúncios", value: "3,8x" },
];

const FICHA = [
  { label: "Projeto", value: "Dojo Bonete · Ilhabela/SP" },
  { label: "Metodologia", value: "Rifa Solidária" },
  { label: "Idealização & mestre", value: "André Queiroz" },
  { label: "Estratégia & captação", value: "Mateus Tafuri" },
];

/* álbum: o dojo pronto, em uso */
const ALBUM = Array.from({ length: 11 }, (_, i) => `/album/${i + 1}.jpg`);

const CARROSSEIS = [
  { title: "Conheça o Dojo Bonete", slug: "conheca-o-dojo", count: 5 },
  { title: "Rifa Solidária", slug: "rifa-solidaria", count: 10 },
  { title: "Jiu-jitsu", slug: "jiu-jitsu", count: 9 },
  { title: "O impacto", slug: "o-impacto", count: 6 },
  { title: "Uma comunidade unida", slug: "carrossel-3", count: 6 },
  { title: "Tijolo em tijolo", slug: "tijolo-em-tijolo", count: 6 },
].map((c) => ({
  ...c,
  images: Array.from({ length: c.count }, (_, i) => `/carrosseis/${c.slug}/${i + 1}.jpg`),
}));

/* topo: duas em pé atrás e a deitada do deck na frente */
const CAPAS = [capaObra, capaSorteio, largaDeck];

const OUTROS_CASES = [
  {
    cliente: "Dojo Caraíva",
    titulo: "R$ 100 mil em bilhetes de R$ 20",
    tipo: "Rifa Solidária",
    path: "/dojo-caraiva",
  },
  {
    cliente: "Corumbau BJJ",
    titulo: "101 dias de fé no extremo sul da Bahia",
    tipo: "Rifa Solidária",
    path: "/corumbau-bjj",
  },
];

/* ─────────────────────────── HELPERS ─────────────────────────── */

/* Os quatro números da mídia paga, no lugar da foto da etapa Escalar */
const PainelEscalar = () => (
  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl">
    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#F4F0E6]/45">
      A mídia paga em quatro números
    </p>
    <div className="mt-5 grid grid-cols-2 gap-4">
      {[
        { icon: TrendingUp, v: "3,8x", l: "retorno sobre o investido" },
        { icon: MousePointerClick, v: "R$ 41 mil", l: "investidos em mídia" },
        { icon: Ticket, v: "77,2%", l: "dos bilhetes via tráfego" },
        { icon: ArrowUpRight, v: "R$ 103,5 mil", l: "de receita direta" },
      ].map((k) => (
        <div key={k.l} className="rounded-xl bg-white/[0.04] p-4">
          <k.icon size={16} className="text-[#A9C46C]" />
          <p className="mt-2 font-display text-2xl font-extrabold">{k.v}</p>
          <p className="mt-0.5 text-xs leading-snug text-[#F4F0E6]/50">{k.l}</p>
        </div>
      ))}
    </div>
  </div>
);


const Label = ({ children, escuro }: { children: React.ReactNode; escuro?: boolean }) => (
  <p
    className={`mb-4 text-xs font-semibold uppercase tracking-[0.25em] ${
      escuro ? "text-[#A9C46C]" : "text-[#16281f]/45"
    }`}
  >
    {children}
  </p>
);

/* Menu de seções que gruda no topo e segue a rolagem */
const AnchorNav = () => {
  const [active, setActive] = useState(SECTIONS[0].id);
  const navigate = useNavigate();
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

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
        <div
          ref={barRef}
          className="mx-auto flex w-max items-center gap-1.5 px-4 py-2.5"
        >
        <button
          onClick={voltar}
          aria-label="Voltar para a página anterior"
          className="mr-1 grid h-8 w-8 shrink-0 place-items-center rounded-full text-[#16281f]/60 transition-colors hover:bg-black/5 hover:text-[#16281f]"
        >
          <ArrowLeft size={17} />
        </button>
        <span aria-hidden className="mr-1 h-5 w-px shrink-0 bg-black/10" />

        {SECTIONS.map((s) => (
          <button
            key={s.id}
            data-id={s.id}
            onClick={() => go(s.id)}
            aria-current={active === s.id ? "true" : undefined}
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition-colors ${
              active === s.id
                ? "bg-[#16281f] text-[#F4F0E6]"
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

/* ─────────────────────────── PAGE ─────────────────────────── */

const DojoBonete = () => (
  <div className="min-h-screen" style={{ backgroundColor: CREME, color: VERDE }}>
    <Navbar />

    <BoneteHero pecas={CAPAS} />

    <AnchorNav />

    <main className="mx-auto max-w-5xl px-5 sm:px-6">
      {/* ───────── O DESAFIO ───────── */}
      <section id="desafio" className="scroll-mt-20 py-14 md:py-20">
        <Label>O desafio</Label>
        <div className="border-l-[3px] border-[#A9C46C] pl-5 md:pl-7">
          <p className="font-display text-2xl font-bold leading-snug md:text-4xl">
            Como construir um centro esportivo de alto nível em um lugar onde cada
            grama de cimento precisa vir pelo mar?
          </p>
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div className="space-y-4 leading-relaxed text-[#16281f]/70">
            <p>
              A Praia do Bonete é uma comunidade caiçara de 350 moradores em Ilhabela,
              aonde só se chega por uma hora de barco ou 12 km de trilha. Ali, o
              faixa-preta <strong className="text-[#16281f]">André Queiroz</strong>
              {" "}ensinava jiu-jitsu num tatame embaixo da própria casa. Virou projeto
              social gratuito em 2023 e, em pouco tempo, colocou{" "}
              <strong className="text-[#16281f]">20% da comunidade</strong> no tatame.
            </p>
            <p>
              O projeto pedia um dojo à altura, e a conta precisava fechar sem verba
              pública, patrocinador ou edital. Restava levar a história do Bonete para a
              internet: R$ 200 mil de meta, R$ 0 em caixa.
            </p>
          </div>
          {/* a foto sai do fluxo no desktop para acompanhar a altura do texto */}
          <div className="md:relative">
            <img
              src={largaPraia}
              alt="Vista aérea do tatame montado na areia da Praia do Bonete"
              className="aspect-[16/9] w-full rounded-2xl object-cover md:absolute md:inset-0 md:aspect-auto md:h-full"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* ───────── SOBRE A CAMPANHA ───────── */}
      <section id="entregas" className="scroll-mt-20 border-t border-black/10 py-14 md:py-20">
        <Label>Sobre a campanha</Label>
        <h2 className="max-w-2xl font-display text-3xl font-bold md:text-4xl">
          Tudo o que a campanha exigiu
        </h2>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {DELIVERABLES.map((d, i) => (
            <div
              key={d.title}
              /* no hover o cartão sobe, ganha a borda da própria cor e o ícone inclina */
              className="group flex items-start gap-3 rounded-2xl border border-black/10 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--cor)] hover:shadow-[0_14px_28px_-16px_rgba(22,40,31,0.45)]"
              style={{ "--cor": CORES[i].bg } as React.CSSProperties}
            >
              <span
                className="grid h-9 w-9 shrink-0 place-items-center rounded-xl transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110"
                style={{ backgroundColor: CORES[i].bg, color: "#fff" }}
              >
                <d.icon size={16} strokeWidth={2.2} />
              </span>
              <div>
                <h3 className="font-semibold leading-tight">{d.title}</h3>
                <p className="mt-0.5 text-sm text-[#16281f]/55">{d.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ───────── ESTRATÉGIA ───────── */}
      <section id="estrategia" className="scroll-mt-20 border-t border-black/10 py-14 md:py-20">
        <Label>Estratégia adotada</Label>
        <h2 className="max-w-2xl font-display text-3xl font-bold md:text-4xl">
          As cinco etapas da Rifa Solidária
        </h2>
        <p className="mt-3 max-w-2xl leading-relaxed text-[#16281f]/65">
          A mesma metodologia aplicada em toda campanha. O que cada etapa virou no
          Bonete está logo adiante, no processo.
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {ETAPAS.map((e, i) => (
            <div
              key={e.n}
              /* mesmo hover dos cartões da campanha: sobe, acende a borda e o emoji inclina */
              className="group relative overflow-hidden rounded-xl border border-black/10 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--cor)] hover:shadow-[0_14px_28px_-16px_rgba(22,40,31,0.45)]"
              style={
                {
                  borderTop: `3px solid ${CORES[i].bg}`,
                  "--cor": CORES[i].bg,
                } as React.CSSProperties
              }
            >
              <span
                aria-hidden
                className="absolute right-3 top-1 font-display text-4xl font-extrabold text-[#16281f]/[0.06]"
              >
                0{e.n}
              </span>
              <span
                className="grid h-9 w-9 place-items-center rounded-lg text-lg transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110"
                style={{ backgroundColor: CORES[i].bg }}
              >
                {e.emoji}
              </span>
              <h3 className="relative mt-3 font-display font-bold leading-none">
                {e.title}
              </h3>
              <p className="relative mt-2 text-[13px] leading-snug text-[#16281f]/65">
                {e.chamada}
              </p>
            </div>
          ))}
        </div>

      </section>

    </main>

    {/* ───────── PROCESSO + NÚMEROS + LEGADO (bloco escuro) ───────── */}
    <section
      id="processo"
      className="scroll-mt-20 px-5 py-16 sm:px-6 md:py-24"
      style={{
        background: "linear-gradient(165deg, #14271e 0%, #193024 60%, #1d3a2b 100%)",
        color: CREME,
      }}
    >
      <div className="mx-auto max-w-5xl">
        <Label escuro>Processo de desenvolvimento</Label>
        <h2 className="max-w-2xl font-display text-3xl font-bold leading-tight md:text-5xl">
          As cinco etapas aplicadas no Bonete
        </h2>
        <p className="mt-4 max-w-xl leading-relaxed text-[#F4F0E6]/65">
          A mesma metodologia da Rifa Solidária, etapa por etapa, com o que cada uma
          virou nos 104 dias de campanha.
        </p>

        {/* texto e foto em zigue-zague: nas etapas pares a foto vem primeiro */}
        <div className="mt-14 space-y-12 md:space-y-16">
          {PROCESS.map((p, i) => (
            <div
              key={p.n}
              className="grid items-center gap-6 md:grid-cols-2 md:gap-10"
            >
              <div className={i % 2 ? "md:order-2" : undefined}>
                <div className="flex items-center gap-3">
                  {/* no hover o emoji da etapa entra pela esquerda e empurra o texto */}
                  <span className="group inline-flex items-center rounded-full border border-[#A9C46C]/40 px-3 py-1 font-display text-xs font-extrabold tracking-widest text-[#A9C46C] transition-colors hover:border-[#A9C46C]">
                    <span className="w-0 overflow-hidden text-sm opacity-0 transition-all duration-300 group-hover:mr-1.5 group-hover:w-4 group-hover:opacity-100">
                      {ETAPAS[i].emoji}
                    </span>
                    {p.n} · {p.etapa.toUpperCase()}
                  </span>
                  <span className="h-px w-8 bg-[#A9C46C]/30" />
                </div>
                <h3 className="mt-3 font-display text-2xl font-bold md:text-3xl">
                  {p.title}
                </h3>
                <p className="mt-3 leading-relaxed text-[#F4F0E6]/65">{p.text}</p>
              </div>
              {p.painel ? (
                <PainelEscalar />
              ) : (
              <div>
                <div
                  className={
                    p.imgs?.length === 4
                      ? "mx-auto grid max-w-[340px] grid-cols-2 gap-3"
                      : `flex justify-center ${p.imgs?.length === 3 ? "" : "gap-3"}`
                  }
                >
                {(p.imgs ?? [p.img]).map((src, k) => (
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
                        ? ({ "--giro": "-2deg" } as React.CSSProperties)
                        : p.imgs
                        ? ({
                            "--giro": ["-4deg", "3deg", "2deg", "-3deg"][k % 4],
                            animationDelay: `${-1.8 * k}s`,
                            zIndex: [10, 30, 20, 25][k % 4],
                          } as React.CSSProperties)
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

        {/* números */}
        <div className="mt-16 border-t border-white/10 pt-10">
          <Label escuro>Os números da campanha</Label>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 text-center"
              >
                <p className="font-display text-2xl font-extrabold text-[#A9C46C] md:text-3xl">
                  {s.value}
                </p>
                <p className="mt-1 text-xs text-[#F4F0E6]/55">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-2xl border border-[#A9C46C]/30 bg-[#A9C46C]/10 py-8 text-center">
            <p className="text-[11px] uppercase tracking-[0.25em] text-[#F4F0E6]/60">
              A campanha em uma linha
            </p>
            <p className="mt-2 px-4 font-display text-3xl font-extrabold text-[#A9C46C] md:text-5xl">
              De R$ 0 a R$ 155,7 mil em 104 dias
            </p>
          </div>
        </div>

        {/* legado */}
        <div className="mt-16 border-t border-white/10 pt-10">
          <Label escuro>O legado</Label>
          <p className="max-w-4xl font-display text-2xl font-bold leading-snug md:text-4xl">
            Quando a própria comunidade carrega os tijolos, o dojo deixa de ser uma obra
            e vira patrimônio. O Bonete não ganhou só um tatame: ganhou a prova de que
            uma causa bem contada atravessa o mar.
          </p>
        </div>

        {/* ficha técnica */}
        <div id="ficha" className="scroll-mt-20 pt-16">
          <div className="overflow-hidden rounded-3xl" style={{ backgroundColor: CREME }}>
            <div className="flex items-center justify-between px-5 py-4 md:px-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#16281f]/60">
                Ficha técnica
              </p>
              <p className="text-xs text-[#16281f]/45">2024 – 2025</p>
            </div>
            {FICHA.map((f) => (
              <div
                key={f.label}
                className="flex flex-col gap-1 border-t border-black/10 px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between md:px-7"
                style={{ color: VERDE }}
              >
                <p className="text-[11px] uppercase tracking-[0.15em] text-[#16281f]/50">
                  {f.label}
                </p>
                <p className="font-semibold">{f.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* ───────── AS ARTES ───────── */}
    <section id="artes" className="scroll-mt-20 px-5 py-16 sm:px-6 md:py-20">
      <div className="mx-auto max-w-5xl">
        <Label>As artes</Label>
        <h2 className="font-display text-3xl font-bold md:text-4xl">
          Os carrosséis da campanha
        </h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-[#16281f]/65">
          As peças que levaram a história do Dojo Bonete para todo o Brasil. Arraste
          para o lado para ver cada carrossel.
        </p>

        <div className="mt-10 space-y-12">
          {CARROSSEIS.map((c) => (
            <DragCarousel key={c.slug} title={`Carrossel: ${c.title}`} images={c.images} />
          ))}
        </div>

        {/* ───────── ÁLBUM ───────── */}
        <div className="mt-16 border-t border-black/10 pt-12">
          <Label>Álbum de fotos</Label>
          <p className="mb-8 max-w-2xl leading-relaxed text-[#16281f]/65">
            As aulas, as graduações e a comunidade dentro da sede nova.
          </p>

          <DragCarousel title="O tatame em uso" images={ALBUM} />
        </div>
      </div>
    </section>

    {/* ───────── OUTROS CASES ───────── */}
    <section className="border-t border-black/10 px-5 py-16 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <Label>Outros projetos</Label>
        <div className="grid gap-4 sm:grid-cols-2">
          {OUTROS_CASES.map((c) => (
            <Link
              key={c.path}
              to={c.path}
              className="group rounded-3xl border border-black/10 bg-white p-6 no-underline transition-colors hover:border-[#A9C46C]"
              style={{ color: VERDE }}
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#16281f]/45">
                {c.cliente}
              </p>
              <h3 className="mt-2 font-display text-xl font-bold">{c.titulo}</h3>
              <p className="mt-1 text-sm text-[#16281f]/55">{c.tipo}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#3f5c2a]">
                Ver case
                <ArrowRight
                  size={15}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>

    {/* ───────── CTA ───────── */}
    <section
      className="px-5 py-20 text-center sm:px-6"
      style={{ backgroundColor: VERDE, color: CREME }}
    >
      <div className="mx-auto max-w-2xl">
        <img
          src={logoTafuri}
          alt="Mateus Tafuri"
          className="mx-auto mb-2 h-24 w-24 [filter:brightness(0)_saturate(100%)_invert(80%)_sepia(18%)_saturate(700%)_hue-rotate(35deg)_brightness(95%)_contrast(88%)]"
        />
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#A9C46C]">
          Sua causa é a próxima
        </p>
        <h2 className="font-display text-3xl font-bold md:text-4xl">Vamos captar juntos?</h2>
        <p className="mx-auto mt-4 mb-8 max-w-lg leading-relaxed text-[#F4F0E6]/65">
          Se o Dojo Bonete te inspirou, imagine o que podemos construir pela sua causa.
          Vamos transformar sua história em uma campanha que mobiliza, emociona e
          arrecada.
        </p>
        <a
          href="https://wa.me/5567998860067"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-full px-8 py-4 text-base font-semibold transition-opacity hover:opacity-90"
          style={{ backgroundColor: LIME, color: VERDE }}
        >
          Falar com Mateus no WhatsApp
        </a>
      </div>
    </section>

    <footer className="py-6 text-center text-xs text-[#16281f]/50">
      © 2026 Mateus Tafuri | Impacto Social
    </footer>
  </div>
);

export default DojoBonete;
