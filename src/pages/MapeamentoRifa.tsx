import { useState, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  CampoDobravel,
  NavegacaoEtapas,
  PilulasEtapas,
} from "@/components/MapeamentoCampos";
import { ETAPAS, WHATSAPP } from "@/data/rifaSolidaria";
import { useMapeamento } from "@/hooks/use-mapeamento";
import { ArrowLeft, ArrowRight, Download } from "lucide-react";

const MapeamentoRifa = () => {
  const m = useMapeamento();
  const [i, setI] = useState(0);
  const [aberto, setAberto] = useState(-1);
  const etapa = ETAPAS[i];

  const irPara = (n: number) => {
    setI(n);
    setAberto(-1); // a etapa sempre abre com as perguntas fechadas
  };

  return (
    <div
      className="min-h-screen bg-background text-foreground"
      style={
        {
          "--primary": "15 65% 56%",
          "--primary-foreground": "0 0% 100%",
          "--secondary": "42 37% 88%",
          "--secondary-foreground": "178 36% 22%",
          "--accent": "15 65% 56%",
          "--accent-foreground": "0 0% 100%",
          "--border": "42 22% 84%",
          "--green-dark": "178 36% 22%",
          "--green-accent": "15 65% 56%",
          "--ring": "15 65% 56%",
        } as CSSProperties
      }
    >
      <div
        style={{
          backgroundImage:
            "linear-gradient(150deg, hsl(176 44% 13%) 0%, hsl(178 40% 19%) 55%, hsl(181 38% 27%) 100%)",
        }}
      >
        <Navbar links={[]} />

        {/* ───── CABEÇALHO ───── */}
        <header className="px-5 pt-24 pb-12 sm:px-6 md:pt-28 md:pb-14 text-white">
          <div className="mx-auto max-w-4xl">
            <Link
              to="/rifa-solidaria"
              className="inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-[hsl(15,65%,56%)]"
            >
              <ArrowLeft size={16} /> Voltar para a metodologia
            </Link>

            <div className="mt-8 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[hsl(15,65%,56%)]">
                Ferramenta gratuita
              </p>
              <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight md:text-5xl">
                Mapeamento Rifa Solidária
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
                Uma pergunta de cada vez, até a sua campanha estar desenhada.
              </p>
            </div>

          </div>
        </header>
      </div>

      {/* as etapas seguem a rolagem: dá para pular de qualquer ponto da página */}
      <PilulasEtapas m={m} i={i} irPara={irPara} />

      {/* ───── PREENCHIMENTO ───── */}
      <main className="px-5 py-10 sm:px-6 md:py-14">
        <div className="mx-auto max-w-2xl">
          <div className="min-w-0 rounded-3xl border border-border bg-card p-4 shadow-sm sm:p-6">
            <div className="mb-5 flex items-start gap-3 border-b border-border pb-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-secondary text-xl">
                {etapa.emoji}
              </span>
              <div className="min-w-0 flex-1">
                <h2 className="text-lg font-bold sm:text-xl">{etapa.title}</h2>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {etapa.chamada}
                </p>
              </div>
              <span className="shrink-0 rounded-full bg-secondary px-3 py-1 text-xs font-bold text-primary">
                {m.respondidasNa(etapa.n)}/{etapa.canvas.length}
              </span>
            </div>

            <div className="space-y-2">
              {etapa.canvas.map((b, idx) => (
                <CampoDobravel
                  key={b.title}
                  etapa={etapa}
                  bloco={b}
                  m={m}
                  aberto={idx === aberto}
                  abrir={() => setAberto(idx === aberto ? -1 : idx)}
                  proxima={
                    idx < etapa.canvas.length - 1
                      ? () => setAberto(idx + 1)
                      : i < ETAPAS.length - 1
                        ? () => irPara(i + 1)
                        : undefined
                  }
                />
              ))}
            </div>

            <NavegacaoEtapas
              i={i}
              setI={irPara}
              total={ETAPAS.length}
              rotulo={`Etapa ${i + 1} de ${ETAPAS.length}`}
            />
          </div>

          <p className="mt-4 text-center text-xs leading-relaxed text-muted-foreground">
            Tudo fica salvo neste navegador: pode fechar a página e voltar
            quando quiser.
          </p>
        </div>

        {/* ───── ENCERRAMENTO ───── */}
        <div className="mx-auto mt-8 max-w-2xl md:mt-10">
          <div className="rounded-3xl border border-primary/30 bg-secondary/40 p-6 text-center md:p-8">
              <h2 className="text-xl font-bold md:text-2xl">
                Terminou o mapeamento?
              </h2>
              <p className="mx-auto mt-3 max-w-xl leading-relaxed text-muted-foreground">
                Salve as respostas em um arquivo para compartilhar com a equipe.
                Se quiser, me mande o resultado.
              </p>
              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <button
                  onClick={m.baixar}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
                >
                  <Download size={16} /> Salvar respostas
                </button>
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/40 px-7 py-3.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/10"
                >
                  Falar com Mateus <ArrowRight size={16} />
                </a>
              </div>
              {m.baixado && (
                <p className="mt-4 text-xs text-muted-foreground">
                  Arquivo salvo. As suas respostas continuam aqui neste navegador.
                </p>
              )}
            </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MapeamentoRifa;
