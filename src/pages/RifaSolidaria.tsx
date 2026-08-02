import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FeedbackSection from "@/components/FeedbackSection";
import fotoMateus from "@/assets/bonete-mateus.webp";
import {
  ArrowRight,
  CheckCircle2,
  Gift,
  HandHeart,
  Megaphone,
  PlayCircle,
  QrCode,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";

const WHATSAPP =
  "https://wa.me/5567998860067?text=Oi%20Mateus!%20Vim%20pela%20p%C3%A1gina%20da%20Rifa%20Solid%C3%A1ria%20e%20quero%20falar%20sobre%20a%20minha%20causa.";

/* ─────────── DATA ─────────── */

const HERO_CARDS = [
  { icon: PlayCircle, title: "5 aulas em vídeo", sub: "uma para cada etapa" },
  { icon: TrendingUp, title: "R$ 410 mil+", sub: "mobilizados com o método" },
  { icon: Sparkles, title: "100% gratuito", sub: "sem cadastro, sem pegadinha" },
  { icon: Target, title: "Testado em campo", sub: "em comunidades reais" },
];

const ETAPAS = [
  {
    n: 1,
    title: "Sonhar",
    chamada: "Antes de pensar em prêmio, defina onde você quer chegar.",
    objetivo:
      "Sair do “precisamos arrecadar dinheiro” e chegar a uma meta clara, alcançável e amarrada a uma transformação que dá pra mostrar.",
    video: "",
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
    chamada: "O prêmio certo faz a pessoa querer participar, mesmo sem conhecer a sua causa.",
    objetivo:
      "Montar uma oferta desejável e construir parcerias estratégicas com troca real de valor: o parceiro fortalece a causa e ganha mídia e visibilidade de volta.",
    video: "",
    precisaTitulo: "Uma oferta que faça a pessoa querer participar",
    precisa: [
      "Um prêmio desejável: uma experiência única ou vários ganhadores",
      "Parceiros estratégicos com credibilidade e audiência",
      "Uma troca de valor clara para cada parceiro",
    ],
    aprender: [
      "Como escolher a rota do prêmio: experiência única ou vários ganhadores",
      "Como mapear e escolher parceiros estratégicos a dedo",
      "Como apresentar a proposta e conduzir a conversa com o parceiro",
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
    chamada: "Uma causa boa que ninguém conhece não arrecada. A narrativa resolve isso.",
    objetivo:
      "Transformar a história real da sua organização em roteiro, peças e um calendário que sustenta semanas de conteúdo antes do lançamento.",
    video: "",
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
    chamada: "É aqui que a campanha sai do grupo da família e chega no Brasil inteiro.",
    objetivo:
      "Colocar no ar uma página que converte e um investimento em mídia que se paga com as próprias vendas da campanha.",
    video: "",
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
      "Divulgação orgânica ativada e rodando",
      "Tráfego pago otimizado, financiado pelas primeiras vendas",
    ],
  },
  {
    n: 5,
    title: "Retribuir",
    chamada: "É a etapa que faz o apoiador de hoje virar o apoiador da próxima campanha.",
    objetivo:
      "Fechar o ciclo com credibilidade: quem apoiou precisa ver o sorteio, a entrega do prêmio e o resultado que ajudou a construir.",
    video: "",
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
    text: "A narrativa real vira roteiro e peças que fazem a causa sair do círculo próximo e chegar em quem nunca ouviu falar dela.",
  },
  {
    icon: HandHeart,
    title: "Ciclo que se repete",
    text: "A prestação de contas transforma apoiadores pontuais em uma base que apoia de novo na próxima campanha.",
  },
];

const CENARIOS = [
  {
    title: "Vai começar do zero",
    text: "Sua organização nunca fez uma campanha de arrecadação e quer estruturar tudo certo desde o primeiro passo.",
  },
  {
    title: "Depende de vaquinhas",
    text: "Toda necessidade vira uma vaquinha improvisada, que toma tempo da equipe e nem sempre atinge o objetivo.",
  },
  {
    title: "Comunica muito, converte pouco",
    text: "As redes engajam, mas o engajamento não vira doação. Falta um caminho claro entre o post e o Pix.",
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
              Aprenda a captar recursos para sua causa
            </p>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">
              Rifa <span className="text-[hsl(103,66%,80%)]">Solidária</span>
            </h1>
            <p className="mt-5 max-w-2xl mx-auto text-white/80 text-lg leading-relaxed">
              O método completo, em 5 etapas, para transformar a sua causa em uma
              campanha que mobiliza pessoas e arrecada de verdade. Do primeiro
              objetivo até a prestação de contas.
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
                href="#metodologia"
                className="inline-flex items-center justify-center gap-2 bg-[hsl(103,66%,80%)] text-green-dark px-7 py-3.5 rounded-full text-sm font-bold hover:opacity-90 transition-opacity"
              >
                Começar pela etapa 1 <ArrowRight size={16} />
              </a>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center border border-white/25 text-white px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-white/10 transition-colors"
              >
                Quero ajuda com a minha campanha
              </a>
            </div>
          </div>
        </header>
      </div>

      {/* ───── BOAS-VINDAS DO FESTIVAL ───── */}
      <section className="px-6 py-6 bg-secondary/50 border-b border-border">
        <div className="max-w-4xl mx-auto flex items-start gap-4">
          <span className="hidden sm:grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
            <QrCode size={22} />
          </span>
          <div>
            <p className="font-bold">Veio pelo poster do Festival ABCR? Que bom ter você aqui.</p>
            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
              Esta página é a continuação daquele poster. Aqui a metodologia está
              aberta, etapa por etapa, para você aplicar na sua organização. Leia,
              anote e, se quiser ajuda para colocar em prática, me chame.
            </p>
          </div>
        </div>
      </section>

      {/* ───── METODOLOGIA (etapas clicáveis) ───── */}
      <section id="metodologia" className="scroll-mt-20 px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary text-center mb-3">
            O método, passo a passo
          </p>
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-3">
            5 etapas para tirar a sua campanha do papel
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-10">
            Clique em cada etapa para ver o que você precisa ter antes de
            começar, o que vai aprender na aula e o que deve ter em mãos no final
            antes de seguir para a próxima.
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
            <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-primary mb-2">
              Etapa {etapa.n} de 5
            </p>
            <h3 className="text-2xl md:text-3xl font-bold text-center">{etapa.title}</h3>
            <p className="text-center mt-3 max-w-2xl mx-auto text-lg font-medium">
              {etapa.chamada}
            </p>
            <p className="text-center mt-3 max-w-2xl mx-auto text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Objetivo:</strong> {etapa.objetivo}
            </p>

            {/* Aula em vídeo */}
            <div className="mt-8 rounded-3xl overflow-hidden border border-border">
              {etapa.video ? (
                <div className="aspect-video bg-black">
                  <iframe
                    key={etapa.video}
                    src={etapa.video}
                    title={`Aula ${etapa.n}: ${etapa.title}`}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="bg-secondary/50 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left px-6 py-6">
                  <PlayCircle size={36} className="shrink-0 text-primary/60" />
                  <div className="flex-1">
                    <p className="font-bold">
                      Aula {etapa.n}: {etapa.title}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      A aula em vídeo desta etapa está sendo gravada.
                    </p>
                  </div>
                  <a
                    href={WHATSAPP}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                  >
                    Quero ser avisado <ArrowRight size={14} />
                  </a>
                </div>
              )}
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2 items-stretch">
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
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Quero ajuda para aplicar esta etapa <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ───── BENEFÍCIOS ───── */}
      <section className="px-6 py-16 md:py-20 bg-secondary/40">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary text-center mb-3">
            Por que funciona
          </p>
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-10">
            O que muda quando existe método
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
            Reconhece a sua organização aqui?
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-10">
            Se você marcou algum destes cenários, a Rifa Solidária foi desenhada
            para a sua realidade.
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {CENARIOS.map((c) => (
              <div key={c.title} className="rounded-2xl border border-border bg-secondary/40 p-5">
                <h3 className="font-bold">{c.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{c.text}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground mb-4">
              Marcou mais de um? Melhor ainda: é exatamente aí que o método gera
              mais resultado.
            </p>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Falar sobre a minha causa <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* ───── QUEM CONDUZ ───── */}
      <section className="px-6 py-16 md:py-20 bg-secondary/40">
        <div className="max-w-4xl mx-auto grid gap-10 md:grid-cols-[320px_1fr] items-center">
          <img
            src={fotoMateus}
            alt="Mateus Tafuri em frente ao dojo, segurando o cartaz de uma Rifa Solidária"
            className="w-full rounded-3xl object-cover aspect-[4/5]"
            style={{ objectPosition: "center 35%" }}
            loading="lazy"
          />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary mb-3">
              Quem criou o método
            </p>
            <h2 className="text-2xl md:text-4xl font-bold mb-2">Mateus Tafuri</h2>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-5">
              Estratégia · Mobilização · Captação de Recursos
            </p>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Eu não aprendi captação em sala de aula. Aprendi morando em
                comunidades isoladas, vendendo bilhete, negociando parceria e
                gravando vídeo no celular ao lado de quem toca o projeto.
              </p>
              <p>
                A Rifa Solidária nasceu dessa prática e já mobilizou mais de{" "}
                <strong className="text-foreground">R$ 410 mil</strong> para
                projetos sociais. É esse caminho, o mesmo que apliquei em campo,
                que está aberto aqui nesta página.
              </p>
            </div>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              Falar comigo no WhatsApp <ArrowRight size={14} />
            </a>
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
            Vamos tirar a sua campanha do papel?
          </h2>
          <p className="text-secondary-foreground/80 mb-8 text-base leading-relaxed">
            Me conte qual é a sua causa e qual valor você precisa alcançar. A
            gente avalia juntos o momento da sua organização e desenha o caminho
            pelas cinco etapas.
          </p>
          <a
            href={WHATSAPP}
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
