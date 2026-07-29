import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FeedbackSection from "@/components/FeedbackSection";
import fotoMateus from "@/assets/bonete-mateus.webp";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Gift,
  HandHeart,
  Megaphone,
  Sparkles,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";

/* ─────────── DATA ─────────── */

const HERO_CARDS = [
  { icon: Target, title: "5 etapas", sub: "do sonho à retribuição" },
  { icon: TrendingUp, title: "R$ 410 mil+", sub: "mobilizados para causas" },
  { icon: Users, title: "3 comunidades", sub: "transformadas pelo método" },
  { icon: Sparkles, title: "Método validado", sub: "na prática, em campo" },
];

const ETAPAS = [
  {
    n: 1,
    title: "Sonhar",
    objetivo: "Definir o que queremos alcançar, por que queremos alcançar e quais os objetivos por trás da campanha.",
    precisaTitulo: "Uma causa que as pessoas queiram apoiar",
    precisa: [
      "Um objetivo claro: o que exatamente a campanha vai construir",
      "Uma transformação visível, que dá pra mostrar depois",
      "Uma meta financeira alcançável, não aspiracional",
    ],
    aprender: [
      "Como conduzir o briefing inicial e sair do “queremos arrecadar dinheiro”",
      "Como definir um objetivo claro e amarrado a um resultado concreto",
      "Como desenhar a transformação visível por trás da campanha",
      "Como chegar a uma meta realista para o tamanho da sua causa",
    ],
    entregaveis: [
      "Objetivo e meta da campanha definidos por escrito",
      "Transformação visível desenhada: o que muda e dá pra mostrar",
      "Briefing alinhado com toda a equipe da organização",
    ],
  },
  {
    n: 2,
    title: "Ofertar",
    objetivo: "Montar o prêmio certo e construir parcerias estratégicas, com troca real de valor: o parceiro fortalece a causa e ganha mídia e visibilidade de volta.",
    precisaTitulo: "Uma oferta que faça a pessoa querer participar",
    precisa: [
      "Um prêmio desejável: uma experiência única ou vários ganhadores",
      "Parceiros estratégicos com credibilidade e audiência",
      "Uma troca de valor clara para cada parceiro",
    ],
    aprender: [
      "Como escolher a rota do prêmio: experiência única ou vários ganhadores",
      "Como mapear e escolher parceiros estratégicos a dedo",
      "Como apresentar a proposta e negociar a parceria",
      "Como estruturar a troca de valor: o que cada parceiro ganha em mídia",
    ],
    entregaveis: [
      "Prêmio definido e garantido com os parceiros",
      "Parcerias fechadas e alinhadas, com contrapartidas claras",
      "Troca de valor acordada: o que cada parceiro ganha em visibilidade",
    ],
  },
  {
    n: 3,
    title: "Contar",
    objetivo: "Transformar a história real da organização em roteiro, peças e um calendário que sustenta semanas de conteúdo.",
    precisaTitulo: "Alcançar mais pessoas do que o seu círculo",
    precisa: [
      "Uma história real, com pessoas no centro",
      "Peças e criativos que traduzam a causa",
      "Um calendário de conteúdo antes do lançamento",
    ],
    aprender: [
      "Como encontrar a história por trás da campanha: pessoas, não números",
      "Como estruturar a narrativa e o roteiro do vídeo de lançamento",
      "Como produzir criativos com poucos recursos: gravação e edição",
      "Como montar o calendário de pré-campanha de 2 semanas",
    ],
    entregaveis: [
      "História da campanha encontrada e roteirizada",
      "Vídeo de lançamento e peças de apoio produzidos",
      "Calendário de pré-campanha pronto: posts, destaques e bio",
    ],
  },
  {
    n: 4,
    title: "Escalar",
    objetivo: "Fazer a campanha sair do círculo próximo, com uma página que converte e mídia que se paga sozinha.",
    precisaTitulo: "Ganhar escala de verdade",
    precisa: [
      "Uma página de vendas que converte visitante em apoiador",
      "Investimento em tráfego que se paga com as primeiras vendas",
      "Números acompanhados de perto durante a campanha",
    ],
    aprender: [
      "Como montar a anatomia de uma boa página de vendas",
      "Como ativar a divulgação orgânica: influenciadores, imprensa e listas",
      "Como rodar tráfego pago e testar criativos até chegar na escala",
      "Quais números acompanhar todos os dias durante a campanha",
    ],
    entregaveis: [
      "Página de vendas no ar, com compra em passo único",
      "Estratégia orgânica ativada e divulgação rodando",
      "Tráfego pago otimizado, financiado pelas primeiras vendas",
    ],
  },
  {
    n: 5,
    title: "Retribuir",
    objetivo: "Fechar o ciclo com credibilidade: quem apoiou precisa ver o sorteio, a entrega e o resultado.",
    precisaTitulo: "Retribuir a quem confiou: parceiros e apoiadores",
    precisa: [
      "Um sorteio conduzido com transparência",
      "A entrega do prêmio documentada",
      "Prestação de contas para apoiadores e parceiros",
    ],
    aprender: [
      "Como conduzir um sorteio ao vivo com credibilidade e regras claras",
      "Como documentar e comunicar o encerramento da campanha",
      "Como entregar o prêmio e dar suporte no pós-campanha",
      "Como retribuir os parceiros e prestar contas de todo o resultado",
    ],
    entregaveis: [
      "Sorteio realizado ao vivo, com regras claras",
      "Prêmio entregue e cada etapa documentada",
      "Prestação de contas publicada: o que o dinheiro construiu",
    ],
  },
];

const BENEFICIOS = [
  {
    icon: Target,
    title: "Meta antes do prêmio",
    text: "A campanha nasce de um objetivo claro e uma transformação visível, não de um sorteio aleatório.",
  },
  {
    icon: Gift,
    title: "Parcerias estratégicas",
    text: "O prêmio nasce de parcerias com troca real de valor: o parceiro fortalece a causa e ganha mídia e visibilidade de volta.",
  },
  {
    icon: Megaphone,
    title: "História que mobiliza",
    text: "Narrativa real transformada em roteiro e peças que fazem a causa sair do círculo próximo.",
  },
  {
    icon: HandHeart,
    title: "Ciclo que se repete",
    text: "A prestação de contas transforma apoiadores pontuais em uma comunidade que apoia de novo.",
  },
];

const CENARIOS = [
  {
    title: "Vai começar do zero",
    text: "Sua organização nunca fez uma campanha de arrecadação e quer estruturar tudo certo desde o primeiro passo.",
  },
  {
    title: "Depende de vaquinhas",
    text: "Toda necessidade vira uma vaquinha improvisada, que toma tempo e nem sempre atinge o objetivo.",
  },
  {
    title: "Comunica muito, converte pouco",
    text: "As redes engajam, mas o engajamento não vira apoio financeiro. Falta um caminho entre o post e o Pix.",
  },
  {
    title: "Tem uma causa forte e invisível",
    text: "O trabalho é real e transforma vidas, mas quase ninguém fora da comunidade conhece.",
  },
  {
    title: "Já tentou rifa sem método",
    text: "Vendeu bilhete no boca a boca, mas sem narrativa, página e tráfego, a campanha não escalou.",
  },
  {
    title: "Precisa de um valor específico",
    text: "Uma obra, um equipamento, um projeto: existe uma meta concreta esperando a campanha certa.",
  },
];

/* ─────────── PAGE ─────────── */

const RifaSolidaria = () => {
  const [ativa, setAtiva] = useState(0);
  const etapa = ETAPAS[ativa];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar é branca — precisa de fundo escuro atrás */}
      <div
        style={{
          backgroundImage:
            "linear-gradient(150deg, hsl(80 15% 18%) 0%, hsl(80 15% 25%) 60%, hsl(80 17% 30%) 100%)",
        }}
      >
        <Navbar />

        {/* ───── HERO ───── */}
        <header className="px-6 pt-28 pb-16 md:pt-32 md:pb-20 text-white text-center">
          <div className="max-w-4xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[hsl(103,66%,80%)] mb-3">
              Metodologia própria
            </p>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">
              Rifa <span className="text-[hsl(103,66%,80%)]">Solidária</span>
            </h1>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-4 py-2 text-sm">
              <span className="text-[hsl(103,66%,80%)] font-semibold">Do sonho à retribuição</span>
              <span className="text-white/60">· 5 etapas</span>
            </div>
            <p className="mt-5 max-w-xl mx-auto text-white/75 text-lg leading-relaxed">
              Método e narrativa para sua causa parar de depender de vaquinhas
              improvisadas e captar com campanhas que mobilizam o Brasil inteiro.
            </p>

            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 text-left">
              {HERO_CARDS.map((c) => (
                <div key={c.title} className="rounded-2xl bg-white/[0.07] border border-white/10 p-4">
                  <c.icon size={20} className="text-[hsl(103,66%,80%)]" />
                  <p className="font-bold mt-2">{c.title}</p>
                  <p className="text-xs text-white/60 mt-0.5">{c.sub}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://wa.me/5567998860067"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[hsl(103,66%,80%)] text-green-dark px-7 py-3.5 rounded-full text-sm font-bold hover:opacity-90 transition-opacity"
              >
                Falar com Mateus <ArrowRight size={16} />
              </a>
              <a
                href="#metodologia"
                className="inline-flex items-center justify-center border border-white/25 text-white px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-white/10 transition-colors"
              >
                Ver a metodologia
              </a>
            </div>
          </div>
        </header>
      </div>

      {/* ───── COMO FUNCIONA (etapas clicáveis) ───── */}
      <section id="metodologia" className="scroll-mt-20 px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary text-center mb-3">
            Como funciona a metodologia
          </p>
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-3">
            5 etapas · cada uma com entregáveis claros
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-10">
            Clique em uma etapa para ver o que fazer e o que você deve ter em
            mãos no final dela antes de seguir para a próxima.
          </p>

          {/* Tab bar em pílula */}
          <div className="rounded-full bg-secondary/60 p-1.5 flex overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden mb-12">
            {ETAPAS.map((e, i) => {
              const on = i === ativa;
              return (
                <button
                  key={e.n}
                  onClick={() => setAtiva(i)}
                  className={`flex items-center gap-2 shrink-0 rounded-full px-4 md:px-6 py-3 text-sm font-semibold transition-colors flex-1 justify-center ${
                    on ? "bg-primary text-primary-foreground shadow" : "text-foreground/60 hover:text-foreground"
                  }`}
                >
                  <span
                    className={`grid h-6 w-6 place-items-center rounded-full text-xs font-bold ${
                      on ? "bg-white/20" : "bg-foreground/10"
                    }`}
                  >
                    {e.n}
                  </span>
                  {e.title}
                </button>
              );
            })}
          </div>

          {/* Conteúdo da etapa ativa */}
          <div key={etapa.n} className="animate-fade-in">
            <h3 className="text-2xl md:text-3xl font-bold text-center">{etapa.title}</h3>
            <p className="text-center mt-3 max-w-2xl mx-auto">
              <strong>Objetivo:</strong>{" "}
              <span className="text-muted-foreground">{etapa.objetivo}</span>
            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-2 items-stretch">
              {/* Esquerda: o que é necessário */}
              <div className="rounded-3xl border border-border bg-secondary/30 p-6 md:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-3">
                  O que é necessário
                </p>
                <h4 className="text-lg font-bold leading-snug mb-5">
                  {etapa.precisaTitulo}
                </h4>
                <ul className="space-y-3">
                  {etapa.precisa.map((p) => (
                    <li key={p} className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-primary" />
                      <span className="leading-relaxed">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Direita: o que você vai aprender */}
              <div className="rounded-3xl p-6 md:p-8 text-white" style={{ backgroundColor: "hsl(80 15% 16%)" }}>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[hsl(103,66%,80%)]">
                    O que você vai aprender
                  </p>
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-xs font-bold">
                    0{etapa.n}
                  </span>
                </div>
                <h4 className="text-lg font-bold leading-snug mb-5">
                  Como fazer a etapa {etapa.title}
                </h4>
                <ul className="space-y-3">
                  {etapa.aprender.map((a) => (
                    <li key={a} className="flex items-start gap-3">
                      <ArrowRight size={18} className="mt-1 shrink-0 text-[hsl(103,66%,80%)]" />
                      <span className="leading-relaxed text-white/90">{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Faixa: o que você deve ter no final */}
            <div className="mt-6 rounded-3xl border border-primary/25 bg-secondary/40 p-6 md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary mb-4">
                Ao final da etapa você tem
              </p>
              <ul className="grid gap-3 sm:grid-cols-3">
                {etapa.entregaveis.map((e) => (
                  <li key={e} className="flex items-start gap-2 text-sm leading-relaxed">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-primary" />
                    <span>{e}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 text-center">
              <a
                href="https://wa.me/5567998860067"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Quero aplicar na minha causa <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ───── BENEFÍCIOS ───── */}
      <section className="px-6 py-16 md:py-20 bg-secondary/40">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary text-center mb-3">
            Benefícios
          </p>
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-10">
            Por que a Rifa Solidária funciona?
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {BENEFICIOS.map((b) => (
              <div key={b.title} className="rounded-2xl bg-background border border-border p-6">
                <b.icon size={22} className="text-primary" />
                <h3 className="font-bold mt-3">{b.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── PARA QUEM É ───── */}
      <section className="px-6 py-16 md:py-20">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary text-center mb-3">
            Diagnóstico rápido
          </p>
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-3">
            Para quem é essa metodologia
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-10">
            Reconheceu sua causa em algum destes cenários? Então a Rifa Solidária
            foi desenhada pra você.
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {CENARIOS.map((c) => (
              <div key={c.title} className="rounded-2xl border border-border bg-secondary/40 p-5">
                <h3 className="font-bold">{c.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{c.text}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-8">
            Marcou mais de um cenário? Melhor ainda: é exatamente aí que o método
            gera mais resultado.
          </p>
        </div>
      </section>

      {/* ───── QUEM CONDUZ ───── */}
      <section className="px-6 py-16 md:py-20 bg-secondary/40">
        <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-[320px_1fr] md:items-center">
          <img
            src={fotoMateus}
            alt="Mateus Tafuri no Dojo Bonete segurando o cartaz da Rifa Solidária"
            className="w-full rounded-3xl object-cover h-72 md:h-96"
            style={{ objectPosition: "center 35%" }}
            loading="lazy"
          />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary mb-3">
              Quem conduz
            </p>
            <h2 className="text-2xl md:text-4xl font-bold mb-2">Mateus Tafuri</h2>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
              Estratégia · Mobilização · Captação de Recursos
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Atuo na captação de recursos combinando estratégia, mobilização e
              narrativa. Desenvolvi a metodologia da Rifa Solidária em campo, ao
              lado de comunidades isoladas, e já foram mais de R$ 410 mil
              mobilizados para transformar causas sociais em campanhas que movem
              pessoas e geram resultados concretos.
            </p>
          </div>
        </div>
      </section>

      {/* ───── DEPOIMENTOS ───── */}
      <FeedbackSection />

      {/* ───── CTA FINAL ───── */}
      <section className="bg-secondary py-16 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
            Sua causa é a próxima
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-green-dark mb-4">
            Vamos tirar a campanha do papel?
          </h2>
          <p className="text-secondary-foreground/80 mb-8 text-base leading-relaxed">
            Me conta a sua causa e a gente desenha juntos o caminho pelas cinco
            etapas, do sonho à retribuição.
          </p>
          <a
            href="https://wa.me/5567998860067"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-primary text-primary-foreground px-8 py-4 rounded-full text-base font-semibold hover:opacity-90 transition-opacity"
          >
            Falar com Mateus no WhatsApp
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RifaSolidaria;
