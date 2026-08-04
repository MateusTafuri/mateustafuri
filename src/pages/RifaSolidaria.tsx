import { useRef, useState, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FeedbackSection from "@/components/FeedbackSection";
import fotoMateus from "@/assets/bonete-mateus.webp";
import { ETAPAS, WHATSAPP } from "@/data/rifaSolidaria";
import {
  ArrowRight,
  ChevronDown,
  ClipboardList,
  QrCode,
  Sparkles,
} from "lucide-react";

/* ─────────── DATA ─────────── */

const PRINCIPIOS = [
  { emoji: "🎯", title: "Meta antes do prêmio", text: "A campanha nasce de um objetivo claro, não de um sorteio aleatório." },
  { emoji: "🎁", title: "Parceria com troca real", text: "O parceiro fortalece a causa e ganha mídia e visibilidade de volta." },
  { emoji: "📣", title: "História que mobiliza", text: "A causa sai do círculo próximo e chega em quem nunca ouviu falar dela." },
  { emoji: "🚀", title: "Mídia que se paga", text: "O tráfego é financiado pelas primeiras vendas da própria campanha." },
  { emoji: "👀", title: "Sorteio transparente", text: "Ao vivo e com regra clara: o resultado não deixa dúvida em ninguém." },
  { emoji: "🤝", title: "Ciclo que se repete", text: "A prestação de contas vira base de apoiadores para a próxima campanha." },
];

const PASSOS = [
  {
    n: "1",
    title: "Abra o link",
    text: "Não tem cadastro, login nem e-mail. Você clica e já cai direto nas 5 etapas do método.",
  },
  {
    n: "2",
    title: "Responda etapa por etapa",
    text: "São 15 perguntas, 3 em cada etapa. Cada campo tem uma dica curta do que uma boa resposta precisa ter.",
  },
  {
    n: "3",
    title: "Pare e volte quando quiser",
    text: "Tudo fica salvo no seu navegador enquanto você escreve. Pode fechar a página e retomar de onde parou.",
  },
  {
    n: "4",
    title: "Baixe o seu plano",
    text: "No fim você salva um arquivo com todas as respostas: é o desenho da sua campanha para levar pra equipe.",
  },
];

const RIFAS = [
  {
    nome: "Dojo Bonete",
    local: "Ilhabela · SP",
    valor: "R$ 152.678",
    linhas: ["2.161 apoiadores", "1,2M de alcance", "R$ 41 mil em mídia"],
    path: "/dojo-bonete",
  },
  {
    nome: "Dojo Caraíva",
    local: "Caraíva · BA",
    valor: "R$ 100.000",
    linhas: ["3.183 apoiadores", "Bilhete de R$ 20", "R$ 21,5 mil em mídia"],
    path: "/dojo-caraiva",
  },
  {
    nome: "Corumbau BJJ",
    local: "Corumbau · BA",
    valor: "R$ 159.493",
    linhas: ["101 dias de campanha", "Comunidade isolada", "Prêmio por parceria"],
    path: "/corumbau-bjj",
  },
];

const NUMEROS = [
  { valor: "R$ 412 mil", label: "mobilizados em rifas" },
  { valor: "3", label: "campanhas conduzidas" },
  { valor: "5.300+", label: "apoiadores conquistados" },
  { valor: "1,2M+", label: "pessoas alcançadas" },
];

/* ─────────── PAGE ─────────── */

const RifaSolidaria = () => {
  const [ativa, setAtiva] = useState(0);

  // arrastar a faixa de princípios com o mouse (no touch o scroll nativo já resolve)
  const faixa = useRef<HTMLDivElement>(null);
  const drag = useRef({ ativo: false, x: 0, scroll: 0 });
  const arrastarInicio = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !faixa.current) return;
    drag.current = { ativo: true, x: e.clientX, scroll: faixa.current.scrollLeft };
    faixa.current.setPointerCapture(e.pointerId);
  };
  const arrastarMover = (e: React.PointerEvent) => {
    if (!drag.current.ativo || !faixa.current) return;
    faixa.current.scrollLeft = drag.current.scroll - (e.clientX - drag.current.x);
  };
  const arrastarFim = (e: React.PointerEvent) => {
    drag.current.ativo = false;
    faixa.current?.releasePointerCapture?.(e.pointerId);
  };

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
        <header className="relative w-full overflow-hidden px-5 sm:px-6 pt-24 pb-12 sm:pt-28 sm:pb-16 md:pt-32 md:pb-20 text-white text-center">
          {/* brilho decorativo */}
          <div
            className="pointer-events-none absolute -top-24 left-1/2 h-80 w-[36rem] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, hsl(15 65% 56%) 0%, transparent 70%)",
            }}
          />
          <div className="relative z-10 max-w-4xl mx-auto">
            <span className="inline-flex items-center gap-2 rounded-full bg-[hsl(15,65%,56%)]/15 px-3.5 py-1.5 sm:px-4 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.12em] sm:tracking-[0.2em] text-[hsl(15,65%,56%)]">
              <Sparkles size={13} className="shrink-0" /> Metodologia aberta e gratuita
            </span>
            <h1 className="mt-6 text-[2rem] sm:text-4xl md:text-6xl font-bold leading-[1.08] sm:leading-[1.05] tracking-tight">
              Como captar recursos para
              <br className="hidden sm:inline" />{" "}
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
            <p className="mt-5 sm:mt-6 max-w-2xl mx-auto text-white/75 text-base sm:text-lg leading-relaxed">
              Um caminho em 5 etapas para planejar, lançar e encerrar uma
              campanha de rifa na sua organização. Do primeiro objetivo até a
              prestação de contas.
            </p>

            {/* trilha das etapas */}
            <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-x-2 gap-y-2 sm:gap-y-3">
              {ETAPAS.map((e, i) => (
                <div key={e.n} className="flex items-center gap-2">
                  <a
                    href="#metodologia"
                    className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-white/20 bg-white/[0.06] px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm font-semibold transition-colors hover:border-[hsl(15,65%,56%)]/60 hover:bg-white/[0.12]"
                  >
                    <span className="text-sm sm:text-base leading-none">{e.emoji}</span>
                    {e.title}
                  </a>
                  {i < ETAPAS.length - 1 && (
                    <ArrowRight size={14} className="hidden sm:block text-white/30" />
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 justify-center">
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
      <section className="shrink-0 px-5 sm:px-6 py-6 bg-secondary/50 border-b border-border">
        <div className="max-w-4xl mx-auto flex items-start gap-3 sm:gap-4">
          <span className="grid h-10 w-10 sm:h-11 sm:w-11 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
            <QrCode size={20} className="sm:hidden" />
            <QrCode size={22} className="hidden sm:block" />
          </span>
          <div>
            <p className="font-bold">Veio pelo poster do Festival ABCR? Que bom ter você aqui.</p>
            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
              Esta página é a continuação do poster: o passo a passo completo
              para aplicar na sua organização.
            </p>
          </div>
        </div>
      </section>
      </div>

      {/* ───── METODOLOGIA (etapas clicáveis) ───── */}
      <section id="metodologia" className="scroll-mt-20 px-5 sm:px-6 py-16 md:py-24">
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
                    className={`flex w-full items-center gap-4 px-5 py-4 text-left transition-colors ${
                      aberta ? "bg-background" : "hover:bg-secondary/30"
                    }`}
                  >
                    <span
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-lg transition-colors ${
                        aberta ? "bg-primary/15" : "bg-secondary"
                      }`}
                    >
                      {e.emoji}
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="font-bold block">
                        {e.n}. {e.title}
                      </span>
                      <span className="text-sm text-muted-foreground">{e.pergunta}</span>
                    </span>
                    <ChevronDown
                      size={18}
                      className="shrink-0 text-muted-foreground transition-transform"
                      style={{ transform: aberta ? "rotate(180deg)" : "none" }}
                    />
                  </button>

                  {aberta && (
                    <div className="grid gap-3 bg-background px-5 pb-5 sm:grid-cols-3">
                      {e.canvas.map((bloco) => (
                        <div
                          key={bloco.title}
                          className="rounded-xl border border-border bg-secondary/60 p-4"
                        >
                          <div className="flex items-center gap-2">
                            <bloco.icon size={16} className="shrink-0 text-primary" />
                            <h4 className="font-bold text-sm">{bloco.title}</h4>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1.5 leading-snug">
                            {bloco.pergunta}
                          </p>
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

      {/* ───── PRINCÍPIOS (faixa arrastável) ───── */}
      <section className="py-12 md:py-16 bg-secondary/40">
        <p className="px-5 text-xs font-semibold uppercase tracking-[0.25em] text-primary text-center mb-2">
          Por que funciona
        </p>
        <h2 className="px-5 text-xl sm:text-2xl md:text-3xl font-bold text-center mb-2">
          O que muda quando existe método
        </h2>
        <p className="px-5 text-center text-xs text-muted-foreground mb-6">
          Arraste para o lado
        </p>
        <div
          ref={faixa}
          onPointerDown={arrastarInicio}
          onPointerMove={arrastarMover}
          onPointerUp={arrastarFim}
          onPointerCancel={arrastarFim}
          className="flex gap-3 overflow-x-auto px-5 pb-3 snap-x cursor-grab active:cursor-grabbing select-none touch-pan-y [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {PRINCIPIOS.map((p) => (
            <div
              key={p.title}
              className="snap-start shrink-0 w-[76vw] sm:w-[300px] rounded-2xl bg-background border border-border px-5 py-4"
            >
              <p className="text-lg leading-none">{p.emoji}</p>
              <h3 className="font-bold text-sm mt-2.5">{p.title}</h3>
              <p className="text-[13px] text-muted-foreground mt-1 leading-snug">
                {p.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ───── COMO USAR O MAPEAMENTO ───── */}
      <section id="mapeamento" className="scroll-mt-20 px-5 sm:px-6 py-16 md:py-20">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary text-center mb-3">
            Ferramenta gratuita
          </p>
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-3">
            Como funciona o mapeamento
          </h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-10 leading-relaxed">
            Entender o método é o começo. O mapeamento é onde ele vira o plano da
            sua campanha: você abre o link e preenche etapa por etapa.
          </p>

          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PASSOS.map((p) => (
              <li
                key={p.n}
                className="rounded-2xl border border-border bg-secondary/30 p-5"
              >
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary text-[13px] font-bold text-primary-foreground">
                  {p.n}
                </span>
                <h3 className="font-bold text-sm mt-3">{p.title}</h3>
                <p className="text-[13px] text-muted-foreground mt-1.5 leading-relaxed">
                  {p.text}
                </p>
              </li>
            ))}
          </ol>

          <div
            className="relative mt-6 overflow-hidden rounded-3xl p-6 sm:p-10 text-white"
            style={{ backgroundColor: "hsl(176 39% 14%)" }}
          >
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-20 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, hsl(15 65% 56%) 0%, transparent 70%)",
              }}
            />
            <div className="relative grid gap-8 md:grid-cols-[1fr_300px] md:items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-[hsl(15,65%,56%)]">
                  <ClipboardList size={13} /> Ferramenta gratuita
                </span>
                <h3 className="mt-4 text-xl sm:text-3xl font-bold leading-tight">
                  Mapeamento Rifa Solidária
                </h3>
                <p className="mt-3 max-w-md text-white/70 text-sm sm:text-base leading-relaxed">
                  As 15 perguntas do método, em um formulário só. Você preenche
                  no seu ritmo e sai com a sua campanha desenhada.
                </p>
                <Link
                  to="/mapeamento-rifa-solidaria"
                  className="mt-6 inline-flex items-center gap-2 bg-[hsl(15,65%,56%)] text-white px-7 py-3.5 sm:px-8 sm:py-4 rounded-full text-sm sm:text-base font-bold hover:opacity-90 transition-opacity"
                >
                  Montar a minha rifa <ArrowRight size={18} />
                </Link>
                <p className="mt-3 text-xs text-white/45">
                  Grátis · Sem cadastro · Salva sozinho no seu navegador
                </p>
              </div>

              {/* prévia da ferramenta */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <div className="flex items-baseline justify-between text-xs text-white/50">
                  <span>Seu progresso</span>
                  <span className="font-bold text-white/80">0 / 15</span>
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-0 rounded-full bg-[hsl(15,65%,56%)]" />
                </div>
                <ul className="mt-4 space-y-2">
                  {ETAPAS.map((e) => (
                    <li
                      key={e.n}
                      className="flex items-center gap-2.5 rounded-lg bg-white/[0.04] px-3 py-2 text-sm"
                    >
                      <span className="text-base leading-none">{e.emoji}</span>
                      <span className="flex-1 text-white/80">{e.title}</span>
                      <span className="text-[11px] text-white/35">3 perguntas</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───── QUEM CONDUZ ───── */}
      <section className="px-5 sm:px-6 py-16 md:py-20 bg-secondary/40">
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-8 md:gap-10 md:grid-cols-[300px_1fr] md:items-center">
            <img
              src={fotoMateus}
              alt="Mateus Tafuri em frente ao dojo, segurando o cartaz de uma Rifa Solidária"
              className="w-full max-w-[280px] mx-auto md:max-w-none rounded-3xl object-cover aspect-[4/5]"
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
                  comunidade isolada, vendendo bilhete na mão, batendo na porta
                  de parceiro e gravando vídeo no celular ao lado de quem toca o
                  projeto todo dia.
                </p>
                <p>
                  No Bonete, uma praia sem estrada em Ilhabela, cada bilhete
                  vendido virou tijolo de um dojo novo. Em Caraíva, foram as
                  próprias crianças do projeto que gravaram o vídeo que vendeu a
                  campanha. No Corumbau, foram 101 dias de campanha para uma
                  comunidade a horas da cidade mais próxima.
                </p>
                <p>
                  Três realidades diferentes, o mesmo caminho de cinco etapas. É
                  esse caminho, testado em campo e não em teoria, que está aberto
                  de graça nesta página.
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

          {/* números consolidados */}
          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
            {NUMEROS.map((n) => (
              <div
                key={n.label}
                className="rounded-2xl border border-border bg-background px-4 py-5 text-center"
              >
                <p className="text-xl sm:text-2xl font-bold text-primary">{n.valor}</p>
                <p className="text-[11px] sm:text-xs text-muted-foreground mt-1 leading-snug">
                  {n.label}
                </p>
              </div>
            ))}
          </div>

          {/* rifas na prática */}
          <h3 className="mt-12 mb-1 text-lg sm:text-xl font-bold">
            As rifas que originaram o método
          </h3>
          <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
            Números reais de cada campanha. Toque para ver o case completo.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {RIFAS.map((r) => (
              <Link
                key={r.nome}
                to={r.path}
                className="group rounded-2xl border border-border bg-background p-5 no-underline text-foreground transition-colors hover:border-primary/50"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-bold">{r.nome}</h4>
                    <p className="text-xs text-muted-foreground">
                      {r.local}
                    </p>
                  </div>
                  <ArrowRight
                    size={16}
                    className="mt-1 shrink-0 text-primary transition-transform group-hover:translate-x-0.5"
                  />
                </div>
                <p className="mt-4 text-xl font-bold text-primary">{r.valor}</p>
                <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
                  arrecadados
                </p>
                <ul className="mt-3 space-y-1 border-t border-border pt-3 text-[13px] text-muted-foreground">
                  {r.linhas.map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                </ul>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ───── DEPOIMENTOS ───── */}
      <FeedbackSection />

      {/* ───── CTA FINAL ───── */}
      <section className="bg-secondary py-16 px-5 sm:px-6 text-center">
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
