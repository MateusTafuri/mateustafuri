import { useState, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FeedbackSection from "@/components/FeedbackSection";
import FundoViaLactea from "@/components/FundoViaLactea";
import fotoMateus from "@/assets/bonete-mateus.webp";
import { ETAPAS, WHATSAPP } from "@/data/rifaSolidaria";
import {
  ArrowRight,
  ChevronDown,
  ClipboardList,
  Gift,
  HandHeart,
  Megaphone,
  QrCode,
  Sparkles,
  Target,
} from "lucide-react";

/* ─────────── DATA ─────────── */

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

  return (
    <div
      className="min-h-screen bg-background text-foreground"
      style={
        {
          // Paleta do pôster do Festival ABCR: petróleo + coral + creme
          "--primary": "15 65% 56%",
          "--primary-foreground": "0 0% 100%",
          "--secondary": "42 37% 88%",
          "--secondary-foreground": "178 36% 22%",
          "--accent": "15 65% 56%",
          "--accent-foreground": "0 0% 100%",
          "--border": "42 22% 84%",
          "--green-dark": "178 36% 22%",
          "--ring": "15 65% 56%",
        } as CSSProperties
      }
    >
      {/* Primeira tela: hero verde + faixa do QR, sem sobra branca */}
      <div className="min-h-screen flex flex-col">
      <div
        className="flex-1 flex items-center"
        style={{
          backgroundImage:
            "linear-gradient(150deg, hsl(176 44% 13%) 0%, hsl(178 40% 19%) 55%, hsl(181 38% 27%) 100%)",
        }}
      >
        <Navbar />

        {/* ───── HERO ───── */}
        <header className="relative w-full overflow-hidden px-6 pt-28 pb-16 md:pt-32 md:pb-20 text-white text-center">
          <FundoViaLactea />
          {/* brilho decorativo */}
          <div
            className="pointer-events-none absolute -top-24 left-1/2 h-80 w-[36rem] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, hsl(15 65% 56%) 0%, transparent 70%)",
            }}
          />
          <div className="relative z-10 max-w-4xl mx-auto">
            <span className="inline-flex items-center gap-2 rounded-full bg-[hsl(15,65%,56%)]/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(15,65%,56%)]">
              <Sparkles size={13} /> Metodologia aberta e gratuita
            </span>
            <h1 className="mt-6 text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight">
              Como captar recursos para
              <br />
              a sua causa com a{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(100deg, hsl(15 65% 56%) 20%, hsl(35 90% 70%) 45%, hsl(15 65% 56%) 70%)",
                  backgroundSize: "200% 100%",
                  animation: "varrer 3.5s ease-in-out infinite",
                }}
              >
                Rifa Solidária
              </span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-white/75 text-lg leading-relaxed">
              Um caminho em 5 etapas para planejar, lançar e encerrar uma
              campanha de rifa na sua organização. Do primeiro objetivo até a
              prestação de contas.
            </p>

            {/* trilha das etapas */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-2 gap-y-3">
              {ETAPAS.map((e, i) => (
                <div key={e.n} className="flex items-center gap-2">
                  <a
                    href="#metodologia"
                    className="rounded-full border border-white/20 bg-white/[0.06] px-4 py-2 text-sm font-semibold transition-colors hover:border-[hsl(15,65%,56%)]/60 hover:bg-white/[0.12]"
                  >
                    {e.title}
                  </a>
                  {i < ETAPAS.length - 1 && (
                    <ArrowRight size={14} className="text-white/30" />
                  )}
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="#metodologia"
                className="inline-flex items-center justify-center gap-2 bg-[hsl(15,65%,56%)] text-white px-8 py-4 rounded-full text-sm font-bold hover:opacity-90 transition-opacity"
              >
                Ver as 5 etapas <ArrowRight size={16} />
              </a>
              <Link
                to="/mapeamento-rifa-solidaria"
                className="inline-flex items-center justify-center border border-white/25 text-white px-8 py-4 rounded-full text-sm font-semibold hover:bg-white/10 transition-colors"
              >
                Montar a minha rifa
              </Link>
            </div>
          </div>
        </header>
      </div>

      {/* ───── BOAS-VINDAS DO FESTIVAL ───── */}
      <section className="shrink-0 px-6 py-6 bg-secondary/50 border-b border-border">
        <div className="max-w-4xl mx-auto flex items-start gap-4">
          <span className="hidden sm:grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
            <QrCode size={22} />
          </span>
          <div>
            <p className="font-bold">Veio pelo poster do Festival ABCR? Que bom ter você aqui.</p>
            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
              Esta página é a continuação daquele poster. Aqui você encontra o
              passo a passo completo para aplicar na sua organização. Leia, anote
              e, se quiser ajuda para colocar em prática, me chame.
            </p>
          </div>
        </div>
      </section>
      </div>

      {/* ───── METODOLOGIA (etapas clicáveis) ───── */}
      <section id="metodologia" className="scroll-mt-20 px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary text-center mb-3">
            O método, passo a passo
          </p>
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-3">
            5 etapas para tirar a sua campanha do papel
          </h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-10">
            Cada etapa responde três perguntas. Toque para ver as suas.
          </p>

          {/* Acordeão das etapas */}
          <div className="rounded-2xl border border-border divide-y divide-border overflow-hidden">
            {ETAPAS.map((e, i) => {
              const aberta = i === ativa;
              return (
                <div key={e.n}>
                  <button
                    onClick={() => setAtiva(aberta ? -1 : i)}
                    aria-expanded={aberta}
                    className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-secondary/30"
                  >
                    <span
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-bold transition-colors ${
                        aberta
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground"
                      }`}
                    >
                      {e.n}
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="font-bold block">{e.title}</span>
                      <span className="text-sm text-muted-foreground">{e.pergunta}</span>
                    </span>
                    <ChevronDown
                      size={18}
                      className="shrink-0 text-muted-foreground transition-transform"
                      style={{ transform: aberta ? "rotate(180deg)" : "none" }}
                    />
                  </button>

                  {aberta && (
                    <div className="grid gap-3 px-5 pb-5 sm:grid-cols-3 animate-fade-in">
                      {e.canvas.map((bloco) => (
                        <div key={bloco.title} className="rounded-xl bg-secondary/40 p-4">
                          <div className="flex items-center gap-2">
                            <bloco.icon size={16} className="shrink-0 text-primary" />
                            <h4 className="font-bold text-sm">{bloco.title}</h4>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1.5 leading-snug">
                            {bloco.pergunta}
                          </p>
                          <p className="mt-2 text-xs italic text-primary">{bloco.dica}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───── CHAMADA PARA O MAPEAMENTO ───── */}
      <section className="px-6 pb-16 md:pb-20">
        <div
          className="max-w-4xl mx-auto rounded-3xl px-6 py-10 md:px-12 md:py-12 text-white text-center"
          style={{ backgroundColor: "hsl(176 39% 14%)" }}
        >
          <span className="inline-grid h-12 w-12 place-items-center rounded-2xl bg-white/10 text-[hsl(15,65%,56%)] mb-4">
            <ClipboardList size={24} />
          </span>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[hsl(15,65%,56%)] mb-3">
            Ferramenta gratuita
          </p>
          <h2 className="text-2xl md:text-3xl font-bold">
            Mapeamento Rifa Solidária
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-white/75 leading-relaxed">
            Entendeu o método? Agora responda as 15 perguntas das 5 etapas e saia
            daqui com a sua campanha desenhada no papel. É de graça, você preenche
            no seu ritmo e salva o resultado no final.
          </p>
          <Link
            to="/mapeamento-rifa-solidaria"
            className="mt-7 inline-flex items-center gap-2 bg-[hsl(15,65%,56%)] text-white px-8 py-4 rounded-full text-base font-bold hover:opacity-90 transition-opacity"
          >
            Montar a minha rifa <ArrowRight size={18} />
          </Link>
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
