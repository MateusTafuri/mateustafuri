import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CaseHero from "@/components/CaseHero";
import { CaseEtapas, CaseNav, Label } from "@/components/CaseParts";
import DragCarousel from "@/components/DragCarousel";
import FeedbackSection from "@/components/FeedbackSection";
import { ETAPAS } from "@/data/rifaSolidaria";

import logoCaraiva from "@/assets/logo-caraiva.webp";
import logoTafuri from "@/assets/logo-tafuri.webp";

import heroPraia from "@/assets/caraiva-hero.webp";
import social from "@/assets/caraiva-social.webp";
import kids from "@/assets/caraiva-kids.webp";
import bastidores1 from "@/assets/caraiva-bastidores-1.webp";
import bastidores2 from "@/assets/caraiva-bastidores-2-new.webp";
import pousada2 from "@/assets/caraiva-pousada-2.webp";
import pousada3 from "@/assets/caraiva-pousada-3-new.webp";
import rifa1 from "@/assets/caraiva-rifa-1.webp";
import rifa2 from "@/assets/caraiva-rifa-2.webp";
import sorteio1 from "@/assets/caraiva-sorteio-1.webp";
import sorteio2 from "@/assets/caraiva-sorteio-2.webp";
import sorteio3 from "@/assets/caraiva-sorteio-3.webp";
import sorteio4 from "@/assets/caraiva-sorteio-4.webp";
import impacto1 from "@/assets/caraiva-impacto-1.webp";
import impacto2 from "@/assets/caraiva-impacto-2.webp";
import impacto3 from "@/assets/caraiva-impacto-3.webp";
import impacto4 from "@/assets/caraiva-impacto-4.webp";

/* ─────────────────────────── DATA ─────────────────────────── */

const VERDE = "#16281f";
const CREME = "#F4F0E6";

const SECTIONS = [
  { id: "desafio", label: "O desafio" },
  { id: "estrategia", label: "Estratégia" },
  { id: "processo", label: "Processo" },
  { id: "artes", label: "As artes" },
  { id: "fotos", label: "As fotos" },
  { id: "ficha", label: "Ficha técnica" },
];

/* paleta do case: fundo escuro e destaque próprios */
const TEMA = {
  grad: "linear-gradient(165deg, #1c1c1c 0%, #2b2b2b 55%, #363636 100%)",
  heroGrad: "linear-gradient(165deg, #161616 0%, #232323 45%, #2b2b2b 100%)",
  brilho: "#4a4a4a",
  destaque: "#D9A441",
  destaque40: "rgba(217,164,65,0.4)",
  destaque30: "rgba(217,164,65,0.3)",
  escuro: "#2B2B2B",
};

/* uma cor por cartão das etapas */
const CORES = ["#A9C46C", "#C4693F", "#3C7A99", "#D9A441", "#2F6B45"];

/* topo: duas em pé atrás e a deitada da turma na frente */
const CAPAS = [bastidores1, sorteio2, heroPraia];

/* O processo contado pelas cinco etapas da metodologia. */
const PROCESS = [
  {
    n: "01",
    etapa: "Sonhar",
    title: "Um ano inteiro, não só o mês seguinte",
    text: "O Dojo Caraíva foi erguido na Aldeia Xandó em 2019, com doações e mutirão, e se manteve por vaquinhas pontuais. Elas resolviam o mês e nunca o ano. O sonho desta campanha era outro: garantir o custeio do projeto por doze meses, com kimonos, campeonatos e manutenção previstos desde o começo.",
    img: kids,
    alt: "Turma de crianças do Dojo Caraíva sentada no tatame",
  },
  {
    n: "02",
    etapa: "Ofertar",
    title: "Uma estadia em Caraíva por R$ 20",
    text: "Em vez de pedir doação, uma oferta ao alcance de qualquer pessoa: o bilhete custava R$ 20 e concorria a uma estadia na Pousada Vila do Mar, dentro da própria vila. O parceiro entrou com a experiência e levou de volta a visibilidade de uma campanha que rodou o país inteiro.",
    imgs: [rifa1, rifa2],
    retrato: true,
    alt: "Alunos do Dojo Caraíva com o cartaz da Rifa Solidária",
  },
  {
    n: "03",
    etapa: "Contar",
    title: "As estrelas de Caraíva no comando",
    text: "Quem contou a história foram Pérola, Arlison, Atxuhi e Helena. Levamos os alunos para conhecer o prêmio que ajudariam a rifar, e a pureza das perguntas deu o tom: “Vai ter piscina, tio?”, “Eu quero ser famoso, tio!”. Eles refaziam cada take para melhorar a fala e a postura, com a mesma teimosia que aprendem no tatame.",
    imgs: [pousada2, pousada3],
    alt: "Bastidores da gravação da rifa, na pousada de Caraíva",
  },
  {
    n: "04",
    etapa: "Escalar",
    title: "R$ 21,5 mil que levaram Caraíva ao Brasil",
    text: "A narrativa das crianças foi distribuída por tráfego pago com segmentação para quem ama Caraíva ou acompanha jiu-jitsu social. Foram 3.183 apoiadores comprando bilhetes de todo o país, muitos deles sem nunca ter pisado na vila.",
    painel: {
      titulo: "A mídia paga em quatro números",
      itens: [
        { v: "3,77x", l: "retorno sobre o investido" },
        { v: "R$ 21,5 mil", l: "investidos em mídia" },
        { v: "3.183", l: "apoiadores conquistados" },
        { v: "R$ 100 mil", l: "arrecadados no total" },
      ],
    },
  },
  {
    n: "05",
    etapa: "Retribuir",
    title: "O sorteio virou festa da vila",
    text: "A entrega dos prêmios reuniu a comunidade, os alunos e quem apoiou de longe. Depois vieram as contas abertas e, principalmente, o destino do dinheiro: inscrições no Campeonato Baiano e no Mundial da CBJJE, kimonos, sapatilhas, equipamento de segurança e as novas camisetas da equipe.",
    imgs: [sorteio1, sorteio2, sorteio3, sorteio4],
    retrato: true,
    alt: "Dia do sorteio da Rifa Solidária do Dojo Caraíva",
  },
];

const STATS = [
  { label: "Novos apoiadores", value: "3.183" },
  { label: "Arrecadados na campanha", value: "R$ 100 mil" },
  { label: "Líquidos para o projeto", value: "R$ 67,4 mil" },
  { label: "Investidos em anúncios", value: "R$ 21,5 mil" },
  { label: "Retorno sobre os anúncios", value: "3,77x" },
  { label: "Preço do bilhete", value: "R$ 20" },
];

const VIROU = [
  {
    title: "Campeonatos",
    text: "Inscrições e custos garantidos para o Campeonato Baiano e o Mundial da CBJJE.",
  },
  {
    title: "Equipamento",
    text: "Kimonos, sapatilhas, figurinos do projeto parceiro de ballet e itens de segurança para o treino.",
  },
  {
    title: "Identidade",
    text: "Camisetas novas da equipe e o evento de sorteio que reuniu a vila inteira.",
  },
];

const FICHA = [
  { label: "Projeto", value: "Dojo Caraíva · Aldeia Xandó, Caraíva/BA" },
  { label: "Metodologia", value: "Rifa Solidária" },
  { label: "Idealização & mestre", value: "Suellen Boni" },
  { label: "Estratégia & captação", value: "Mateus Tafuri" },
];

const CARROSSEIS = [
  { title: "Conheça o Dojo Caraíva", slug: "conheca-o-dojo-caraiva", count: 14 },
  { title: "O prêmio da rifa", slug: "o-premio", count: 10 },
  { title: "A importância do jiu-jitsu", slug: "importancia-jiu-jitsu", count: 7 },
  { title: "Motivos para apoiar", slug: "ajudar-o-dojo", count: 6 },
  { title: "Horários das aulas", slug: "horarios", count: 10 },
  { title: "Gratidão", slug: "gratidao", count: 7 },
  { title: "O que fizemos com a arrecadação", slug: "o-que-fizemos", count: 11 },
].map((c) => ({
  ...c,
  images: Array.from({ length: c.count }, (_, i) => `/carrosseis/${c.slug}/${i + 1}.webp`),
}));

/* álbum: a vila, o tatame e os campeonatos que a rifa bancou */
const ALBUM = [
  heroPraia,
  kids,
  impacto1,
  impacto2,
  impacto3,
  impacto4,
  bastidores1,
  bastidores2,
  social,
];

const OUTROS_CASES = [
  {
    cliente: "Dojo Bonete",
    titulo: "R$ 155,7 mil em 104 dias, do outro lado do mar",
    tipo: "Rifa Solidária",
    path: "/dojo-bonete",
  },
  {
    cliente: "Corumbau BJJ",
    titulo: "101 dias de fé no extremo sul da Bahia",
    tipo: "Rifa Solidária",
    path: "/corumbau-bjj",
  },
];

/* ─────────────────────────── PAGE ─────────────────────────── */

const DojoCaraiva = () => (
  <div
    className="min-h-screen"
    style={
      {
        backgroundColor: CREME,
        color: VERDE,
        "--case-grad": TEMA.heroGrad,
        "--case-brilho": TEMA.brilho,
        "--case-destaque": TEMA.destaque,
        "--case-destaque-40": TEMA.destaque40,
        "--case-destaque-30": TEMA.destaque30,
        "--case-escuro": TEMA.escuro,
      } as React.CSSProperties
    }
  >
    <Navbar />

    <CaseHero
      tipo="Rifa Solidária"
      titulo="Dojo"
      destaque="Caraíva"
      descricao="Uma vila de ruas de areia no sul da Bahia, um tatame erguido por doações e a campanha que garantiu um ano inteiro de projeto com bilhetes de R$ 20."
      logo={logoCaraiva}
      logoAlt="Logo Dojo Caraíva"
      pecas={CAPAS}
    />

    <CaseNav secoes={SECTIONS} />

    <main className="mx-auto max-w-5xl px-5 sm:px-6">
      {/* ───────── O DESAFIO ───────── */}
      <section id="desafio" className="scroll-mt-20 py-14 md:py-20">
        <Label>O desafio</Label>
        <div className="border-l-[3px] border-[var(--case-destaque)] pl-5 md:pl-7">
          <p className="font-display text-2xl font-bold leading-snug md:text-4xl">
            Como sustentar um projeto social o ano inteiro numa vila que vive de
            temporada?
          </p>
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div className="space-y-4 leading-relaxed text-[#16281f]/70">
            <p>
              Caraíva é conhecida pelas ruas de areia e pelo encontro do rio com o mar.
              Longe dos holofotes do turismo, é uma vila com acesso limitado e poucas
              oportunidades para os jovens. Ali, sob a mestre{" "}
              <strong className="text-[#16281f]">Suellen Boni</strong>, o tatame virou o
              porto seguro de dezenas de crianças e adolescentes.
            </p>
            <p>
              O dojo foi erguido em 2019 com doações e mutirão, e se manteve por vaquinhas
              pontuais — que resolviam o mês e nunca o ano seguinte. A rifa nasceu para
              romper esse ciclo: custear o projeto por doze meses, vendendo bilhetes de
              R$ 20 para gente de todo o país.
            </p>
          </div>

          {/* a foto sai do fluxo no desktop para acompanhar a altura do texto */}
          <div className="md:relative">
            <img
              src={social}
              alt="Vila de Caraíva, no sul da Bahia"
              className="aspect-[16/9] w-full rounded-2xl object-cover md:absolute md:inset-0 md:aspect-auto md:h-full"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* ───────── ESTRATÉGIA ───────── */}
      <section id="estrategia" className="scroll-mt-20 border-t border-black/10 py-14 md:py-20">
        <Label>Estratégia adotada</Label>
        <h2 className="max-w-2xl font-display text-3xl font-bold md:text-4xl">
          As cinco etapas da Rifa Solidária
        </h2>
        <p className="mt-3 max-w-2xl leading-relaxed text-[#16281f]/65">
          A mesma metodologia aplicada em toda campanha. O que cada etapa virou em
          Caraíva está logo adiante, no processo.
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {ETAPAS.map((e, i) => (
            <div
              key={e.n}
              /* no hover o cartão sobe, acende a borda e o emoji inclina */
              className="group relative overflow-hidden rounded-xl border border-black/10 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--cor)] hover:shadow-[0_14px_28px_-16px_rgba(22,40,31,0.45)]"
              style={
                {
                  borderTop: `3px solid ${CORES[i]}`,
                  "--cor": CORES[i],
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
                style={{ backgroundColor: CORES[i] }}
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
        background: TEMA.grad,
        color: CREME,
      }}
    >
      <div className="mx-auto max-w-5xl">
        <Label escuro>Processo de desenvolvimento</Label>
        <h2 className="max-w-2xl font-display text-3xl font-bold leading-tight md:text-5xl">
          As cinco etapas aplicadas em Caraíva
        </h2>
        <p className="mt-4 max-w-xl leading-relaxed text-[#F4F0E6]/65">
          A mesma metodologia da Rifa Solidária, etapa por etapa, com o que cada uma
          virou na vila.
        </p>

        <CaseEtapas itens={PROCESS} />

        {/* números */}
        <div className="mt-16 border-t border-white/10 pt-10">
          <Label escuro>Os números da campanha</Label>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 text-center"
              >
                <p className="font-display text-2xl font-extrabold text-[var(--case-destaque)] md:text-3xl">
                  {s.value}
                </p>
                <p className="mt-1 text-xs text-[#F4F0E6]/55">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-3 rounded-2xl border border-[var(--case-destaque-30)] bg-[var(--case-destaque)]/10 py-8 text-center">
            <p className="text-[11px] uppercase tracking-[0.25em] text-[#F4F0E6]/60">
              A campanha em uma linha
            </p>
            <p className="mt-2 px-4 font-display text-3xl font-extrabold text-[var(--case-destaque)] md:text-5xl">
              Um ano de projeto garantido a R$ 20 o bilhete
            </p>
          </div>
        </div>

        {/* no que o dinheiro virou */}
        <div className="mt-16 border-t border-white/10 pt-10">
          <Label escuro>No que o dinheiro virou</Label>
          <div className="grid gap-4 md:grid-cols-3">
            {VIROU.map((v) => (
              <div key={v.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                <h3 className="font-display text-lg font-bold text-[var(--case-destaque)]">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#F4F0E6]/65">{v.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* legado ao lado da ficha */}
        <div
          id="ficha"
          className="mt-16 grid scroll-mt-20 items-start gap-8 border-t border-white/10 pt-10 md:grid-cols-2 md:gap-12"
        >
          <div>
            <Label escuro>O legado</Label>
            <p className="font-display text-2xl font-bold leading-snug md:text-3xl">
              Quando a vila inteira vende bilhete, o tatame deixa de depender de sorte.
              Caraíva não ganhou só um ano de caixa: ganhou um modelo de captação que
              pode repetir na próxima temporada.
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl" style={{ backgroundColor: CREME }}>
            <div className="flex items-center justify-between px-5 py-4 md:px-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#16281f]/60">
                Ficha técnica
              </p>
              <p className="text-xs text-[#16281f]/45">Caraíva · BA</p>
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
          As peças que apresentaram o Dojo Caraíva ao país e sustentaram a venda dos
          bilhetes. Arraste para o lado para ver cada carrossel.
        </p>

        <div className="mt-10 space-y-12">
          {CARROSSEIS.map((c) => (
            <DragCarousel key={c.slug} title={`Carrossel: ${c.title}`} images={c.images} />
          ))}
        </div>
      </div>
    </section>

    {/* ───────── AS FOTOS ───────── */}
    <section id="fotos" className="scroll-mt-20 border-t border-black/10 px-5 py-16 sm:px-6 md:py-20">
      <div className="mx-auto max-w-5xl">
        <Label>Álbum de fotos</Label>
        <h2 className="font-display text-3xl font-bold md:text-4xl">
          A vila, o tatame e os campeonatos
        </h2>
        <p className="mb-8 mt-4 max-w-2xl leading-relaxed text-[#16281f]/65">
          O que a rifa comprou aparece aqui: viagem, competição e a turma inteira de pé.
        </p>

        <DragCarousel title="Depois da campanha" images={ALBUM} />
      </div>
    </section>

    {/* ───────── DEPOIMENTO ───────── */}
    <div className="border-t border-black/10">
      <FeedbackSection titulo="O que dizem sobre a campanha" apenas="Dojo Caraíva" />
    </div>

    {/* ───────── OUTROS CASES ───────── */}
    <section className="border-t border-black/10 px-5 py-16 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <Label>Outros projetos</Label>
        <div className="grid gap-4 sm:grid-cols-2">
          {OUTROS_CASES.map((c) => (
            <Link
              key={c.path}
              to={c.path}
              className="group rounded-3xl border border-black/10 bg-white p-6 transition-colors hover:border-[var(--case-destaque)]"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#16281f]/45">
                {c.cliente}
              </p>
              <h3 className="mt-2 font-display text-xl font-bold leading-snug">
                {c.titulo}
              </h3>
              <p className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--case-escuro)]">
                {c.tipo} <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>

    {/* ───────── CTA ───────── */}
    <section
      className="px-5 py-16 text-center sm:px-6 md:py-20"
      style={{ backgroundColor: "#eae5d8" }}
    >
      <div className="mx-auto max-w-2xl">
        <img
          src={logoTafuri}
          alt="Mateus Tafuri"
          className="mx-auto -mb-2 h-28 w-28 [filter:brightness(0)_saturate(100%)_invert(18%)_sepia(58%)_saturate(1654%)_hue-rotate(78deg)_brightness(96%)_contrast(95%)] md:h-32 md:w-32"
        />
        <Label>Sua causa é a próxima</Label>
        <h2 className="font-display text-3xl font-bold md:text-4xl">Vamos captar juntos?</h2>
        <p className="mt-4 leading-relaxed text-[#16281f]/70">
          Se o Dojo Caraíva te inspirou, imagine o que dá para construir pelo seu
          projeto. Vamos transformar a sua história em uma campanha que mobiliza,
          emociona e arrecada.
        </p>
        <a
          href="https://wa.me/5567998860067"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block rounded-full bg-[var(--case-escuro)] px-8 py-4 text-base font-semibold text-[#F4F0E6] transition-opacity hover:opacity-90"
        >
          Falar com Mateus no WhatsApp
        </a>
      </div>
    </section>

    <Footer />
  </div>
);

export default DojoCaraiva;
