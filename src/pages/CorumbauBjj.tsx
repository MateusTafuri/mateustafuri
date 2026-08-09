import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CaseHero from "@/components/CaseHero";
import { CaseEtapas, CaseNav, Label } from "@/components/CaseParts";
import DragCarousel from "@/components/DragCarousel";
import FeedbackSection from "@/components/FeedbackSection";
import { ETAPAS } from "@/data/rifaSolidaria";

import logoCorumbau from "@/assets/logo-corumbau.webp";
import logoTafuri from "@/assets/logo-tafuri.webp";

import capaPraia from "@/assets/corumbau-praia.webp";
import capaAtleta from "@/assets/corumbau-atleta.webp";
import largaBaiano from "@/assets/corumbau-larga-baiano.webp";
import render1 from "@/assets/corumbau-render-1.webp";
import render2 from "@/assets/corumbau-render-2.webp";
import flyer from "@/assets/corumbau-flyer.webp";
import aula1 from "@/assets/corumbau-aula-1.webp";
import aula2 from "@/assets/corumbau-aula-2.webp";
import medalhista from "@/assets/corumbau-medalhista.webp";
import farol from "@/assets/corumbau-farol.webp";
import obra2 from "@/assets/corumbau-obra-2.webp";
import obra3 from "@/assets/corumbau-obra-3.webp";
import obra4 from "@/assets/corumbau-obra-4.webp";
import capaLoja from "@/assets/corumbau-capa-loja.webp";
import capaMedalhas from "@/assets/corumbau-capa-medalhas.webp";

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
  grad: "linear-gradient(165deg, #141b4d 0%, #212b7c 55%, #2c3894 100%)",
  heroGrad: "linear-gradient(165deg, #10163c 0%, #1a2263 45%, #212b7c 100%)",
  brilho: "#3d4bb0",
  destaque: "#F54D2B",
  destaque40: "rgba(245,77,43,0.4)",
  destaque30: "rgba(245,77,43,0.3)",
  escuro: "#212B7C",
};

/* uma cor por cartão das etapas */
const CORES = ["#A9C46C", "#C4693F", "#3C7A99", "#D9A441", "#2F6B45"];

/* topo: duas em pé atrás e a deitada do campeonato na frente */
const CAPAS = [capaPraia, capaAtleta, largaBaiano];

/* O processo contado pelas cinco etapas da metodologia. */
const PROCESS = [
  {
    n: "01",
    etapa: "Sonhar",
    title: "Um lote conquistado e uma planta na mão",
    text: "O Corumbau BJJ nasceu com um propósito simples: dar às crianças da comunidade acesso a novas oportunidades. Depois de três anos treinando numa escola desativada, o projeto conquistou o lote e desenhou a sede — um espaço cultural e esportivo, o primeiro da vila. A campanha existia para tirar essa planta do papel.",
    imgs: [render1, render2],
    alt: "Render do novo espaço cultural e esportivo do Corumbau BJJ",
    legenda: "Projeto arquitetônico do novo espaço, assinado por Fernando Lima.",
  },
  {
    n: "02",
    etapa: "Ofertar",
    title: "Quatro dias em Corumbau por R$ 20",
    text: "A oferta foi montada com nove parceiros da própria região: 4 diárias no Jocotoka Village, passeio de barco pelos recifes de corais, quadriciclo até a Barra do Cahy, buggy para Caraíva, arroz de polvo no Canal do Pampo, moqueca no Cantinho Nativo, massagem à beira-mar, transfer de Porto Seguro e vale-compra na Corumbau Atlantic. Cada bilhete custava R$ 20.",
    img: flyer,
    retrato: true,
    alt: "Cartaz da Rifa Solidária do Corumbau BJJ Team, com os prêmios da experiência",
  },
  {
    n: "03",
    etapa: "Contar",
    title: "As medalhas contaram a história",
    text: "Quem apareceu nas peças foram os atletas: mais de 50 crianças que treinam jiu-jitsu e ballet num espaço improvisado e mesmo assim voltam de campeonato com medalha no peito. Sete carrosséis levaram esse contraste ao país — o sonho gigante de uma vila onde a vida é simples.",
    imgs: [medalhista, aula1, aula2],
    alt: "Alunos do Corumbau BJJ em treino e em competição",
  },
  {
    n: "04",
    etapa: "Escalar",
    title: "R$ 56 mil levando Corumbau ao Brasil",
    text: "A campanha correu por 101 dias, com contagem regressiva pública até o sorteio de 23 de novembro e reinvestimento contínuo do que entrava. O tráfego pago levou a história a quem nunca tinha ouvido falar da vila: 4.377 apoiadores em 4.543 pedidos, com ticket médio de R$ 35,11 — quase o dobro do bilhete avulso.",
    painel: {
      titulo: "A mídia paga em quatro números",
      itens: [
        { v: "2,85x", l: "retorno sobre o investido" },
        { v: "R$ 56 mil", l: "investidos em mídia" },
        { v: "4.377", l: "apoiadores conquistados" },
        { v: "R$ 35,11", l: "de ticket médio" },
      ],
    },
  },
  {
    n: "05",
    etapa: "Retribuir",
    title: "A obra começou",
    text: "Depois do sorteio veio a prestação de contas e, logo em seguida, a parte que ninguém esquece: o caminhão de material chegando ao terreno. Do bruto arrecadado saíram a taxa da plataforma, a mídia e o serviço; o que sobrou virou madeira, bloco e o começo da primeira sede cultural e esportiva de Corumbau.",
    imgs: [obra2, obra3, obra4],
    alt: "Início das obras da sede do Corumbau BJJ Team",
  },
];

const STATS = [
  { label: "Arrecadados na campanha", value: "R$ 159,5 mil" },
  { label: "Líquidos para o projeto", value: "R$ 85,8 mil" },
  { label: "Investidos em anúncios", value: "R$ 56 mil" },
  { label: "Retorno sobre os anúncios", value: "2,85x" },
  { label: "Apoiadores únicos", value: "4.377" },
  { label: "Ticket médio", value: "R$ 35,11" },
];

const FICHA = [
  { label: "Projeto", value: "Corumbau BJJ Team · Corumbau/BA" },
  { label: "Metodologia", value: "Rifa Solidária" },
  { label: "Idealização & mestre", value: "Diego Oliveira" },
  { label: "Projeto arquitetônico", value: "Fernando Lima" },
  { label: "Estratégia & captação", value: "Mateus Tafuri" },
];

const CARROSSEIS = [
  { title: "Conheça o Corumbau BJJ Team", slug: "corumbau-conheca", count: 5 },
  { title: "O prêmio da rifa", slug: "corumbau-premio", count: 10 },
  { title: "De passo em passo", slug: "corumbau-passo-em-passo", count: 11 },
  { title: "Um novo espaço para treinar", slug: "corumbau-novo-espaco", count: 5 },
  { title: "Motivos para apoiar", slug: "corumbau-motivos", count: 6 },
  { title: "Um pequeno gesto", slug: "corumbau-pequeno-gesto", count: 6 },
  { title: "Seu apoio é mais que uma contribuição", slug: "corumbau-seu-apoio", count: 5 },
].map((c) => ({
  ...c,
  images: Array.from({ length: c.count }, (_, i) => `/carrosseis/${c.slug}/${i + 1}.webp`),
}));

/* álbum: a vila, o tatame improvisado e os pódios */
const ALBUM = [
  largaBaiano,
  capaAtleta,
  medalhista,
  capaLoja,
  aula1,
  aula2,
  capaPraia,
  farol,
  capaMedalhas,
  obra2,
  obra3,
];

const OUTROS_CASES = [
  {
    cliente: "Dojo Bonete",
    titulo: "R$ 155,7 mil em 104 dias, do outro lado do mar",
    tipo: "Rifa Solidária",
    path: "/dojo-bonete",
  },
  {
    cliente: "Dojo Caraíva",
    titulo: "Um ano de projeto garantido a R$ 20 o bilhete",
    tipo: "Rifa Solidária",
    path: "/dojo-caraiva",
  },
];

/* ─────────────────────────── PAGE ─────────────────────────── */

const CorumbauBjj = () => (
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
      titulo="Corumbau"
      destaque="BJJ Team"
      descricao="No extremo sul da Bahia, mais de 50 crianças treinam jiu-jitsu e ballet numa escola desativada. A campanha que tirou do papel a primeira sede cultural e esportiva da vila."
      logo={logoCorumbau}
      logoAlt="Logo Corumbau BJJ Team"
      pecas={CAPAS}
    />

    <CaseNav secoes={SECTIONS} />

    <main className="mx-auto max-w-5xl px-5 sm:px-6">
      {/* ───────── O DESAFIO ───────── */}
      <section id="desafio" className="scroll-mt-20 py-14 md:py-20">
        <Label>O desafio</Label>
        <div className="border-l-[3px] border-[var(--case-destaque)] pl-5 md:pl-7">
          <p className="font-display text-2xl font-bold leading-snug md:text-4xl">
            Como levantar a primeira sede cultural de uma vila cujo tatame fica numa
            escola desativada?
          </p>
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div className="space-y-4 leading-relaxed text-[#16281f]/70">
            <p>
              Em Corumbau, no extremo sul da Bahia, a vida é simples e os sonhos das
              crianças são gigantes. Fundado por{" "}
              <strong className="text-[#16281f]">Diego Oliveira</strong> há três anos, o
              Corumbau BJJ Team leva jiu-jitsu, ballet e educação a{" "}
              <strong className="text-[#16281f]">mais de 50 crianças</strong> e
              adolescentes em situação de vulnerabilidade.
            </p>
            <p>
              Os treinos acontecem numa escola desativada: espaço improvisado, mas cheio
              de energia. O projeto já tinha conquistado o lote e o projeto arquitetônico
              da sede. Faltava o dinheiro da obra, e ele precisava vir de fora da vila —
              em bilhetes de R$ 20, com sorteio marcado para 23 de novembro.
            </p>
          </div>

          {/* a foto sai do fluxo no desktop para acompanhar a altura do texto */}
          <div className="md:relative">
            <img
              src={largaBaiano}
              alt="Equipe do Corumbau BJJ Team no Campeonato Baiano de Jiu-Jitsu"
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
          Corumbau está logo adiante, no processo.
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
          As cinco etapas aplicadas em Corumbau
        </h2>
        <p className="mt-4 max-w-xl leading-relaxed text-[#F4F0E6]/65">
          A mesma metodologia da Rifa Solidária, etapa por etapa, ao longo dos 101 dias
          de campanha.
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
              Do lote vazio ao início da obra, em 101 dias
            </p>
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
              Uma vila de pescadores no fim da estrada provou que consegue financiar a
              própria sede. O tatame improvisado tem data para acabar, e as crianças que
              treinam nele já sabem como é ver um sonho sair do papel.
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl" style={{ backgroundColor: CREME }}>
            <div className="flex items-center justify-between px-5 py-4 md:px-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#16281f]/60">
                Ficha técnica
              </p>
              <p className="text-xs text-[#16281f]/45">Extremo sul da Bahia</p>
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
          As peças que apresentaram Corumbau ao país e sustentaram a venda dos bilhetes.
          Arraste para o lado para ver cada carrossel.
        </p>

        <div className="mt-10 space-y-12">
          {CARROSSEIS.map((c) => (
            <DragCarousel key={c.slug} title={`Carrossel: ${c.title}`} images={c.images} />
          ))}
        </div>
      </div>
    </section>

    {/* ───────── AS FOTOS ───────── */}
    <section
      id="fotos"
      className="scroll-mt-20 border-t border-black/10 px-5 py-16 sm:px-6 md:py-20"
    >
      <div className="mx-auto max-w-5xl">
        <Label>Álbum de fotos</Label>
        <h2 className="font-display text-3xl font-bold md:text-4xl">
          O tatame improvisado e os pódios
        </h2>
        <p className="mb-8 mt-4 max-w-2xl leading-relaxed text-[#16281f]/65">
          A equipe no Campeonato Baiano, as aulas na escola desativada e os primeiros
          dias de obra no terreno.
        </p>

        <DragCarousel title="Corumbau, dentro e fora do tatame" images={ALBUM} />
      </div>
    </section>

    {/* ───────── DEPOIMENTO ───────── */}
    <div className="border-t border-black/10">
      <FeedbackSection titulo="O que dizem sobre a campanha" apenas="Corumbau BJJ" />
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
                {c.tipo}{" "}
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
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
          Se o Corumbau te inspirou, imagine o que dá para construir pelo seu projeto.
          Vamos transformar a sua história em uma campanha que mobiliza, emociona e
          arrecada.
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

export default CorumbauBjj;
