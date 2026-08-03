import { useState, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ETAPAS, WHATSAPP } from "@/data/rifaSolidaria";
import { ArrowLeft, ArrowRight, Check, Download } from "lucide-react";

const CHAVE = "rifa-canvas";
const TOTAL = ETAPAS.reduce((soma, e) => soma + e.canvas.length, 0);

const MapeamentoRifa = () => {
  const [respostas, setRespostas] = useState<Record<string, string>>(() => {
    try {
      return JSON.parse(localStorage.getItem(CHAVE) || "{}");
    } catch {
      return {};
    }
  });
  const [baixado, setBaixado] = useState(false);

  const salvar = (proximas: Record<string, string>) => {
    setRespostas(proximas);
    setBaixado(false);
    try {
      localStorage.setItem(CHAVE, JSON.stringify(proximas));
    } catch {
      // navegação privada: o formulário segue funcionando, só não guarda
    }
  };

  const responder = (chave: string, valor: string) =>
    salvar({ ...respostas, [chave]: valor });

  const preenchida = (chave: string) => (respostas[chave] || "").trim().length > 0;
  const totalPreenchidas = ETAPAS.flatMap((e) =>
    e.canvas.map((b) => `${e.n}-${b.title}`)
  ).filter(preenchida).length;

  const baixarRespostas = () => {
    const org = (respostas.organizacao || "").trim();
    const linhas = [
      "MAPEAMENTO RIFA SOLIDÁRIA",
      "Metodologia de captação de recursos · Mateus Tafuri",
      org ? `Organização: ${org}` : "",
      `Preenchido em: ${new Date().toLocaleDateString("pt-BR")}`,
      `Respondidas: ${totalPreenchidas} de ${TOTAL}`,
      "",
    ];

    ETAPAS.forEach((etapa) => {
      linhas.push("=".repeat(60));
      linhas.push(`0${etapa.n}. ${etapa.title.toUpperCase()}`);
      linhas.push(etapa.pergunta);
      linhas.push("");
      etapa.canvas.forEach((bloco) => {
        const resposta = (respostas[`${etapa.n}-${bloco.title}`] || "").trim();
        linhas.push(`${bloco.title.toUpperCase()}`);
        linhas.push(`Pergunta: ${bloco.pergunta}`);
        linhas.push(`Resposta: ${resposta || "(em branco)"}`);
        linhas.push(`Lembrete: ${bloco.dica}`);
        linhas.push("");
      });
    });

    linhas.push("=".repeat(60));
    linhas.push("Quando uma causa tem propósito, ela merece voz.");
    linhas.push("mateustafuri.com.br");

    const blob = new Blob([linhas.filter((l) => l !== null).join("\n")], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = org
      ? `mapeamento-rifa-solidaria-${org.toLowerCase().replace(/\s+/g, "-")}.txt`
      : "mapeamento-rifa-solidaria.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setBaixado(true);
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
        <Navbar />

        {/* ───── CABEÇALHO ───── */}
        <header className="px-6 pt-28 pb-14 md:pt-32 md:pb-16 text-white">
          <div className="max-w-5xl mx-auto">
            <Link
              to="/rifa-solidaria"
              className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-[hsl(15,65%,56%)] transition-colors mb-8"
            >
              <ArrowLeft size={16} /> Voltar para a metodologia
            </Link>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[hsl(15,65%,56%)] mb-3">
              Ferramenta gratuita
            </p>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight">
              Mapeamento Rifa Solidária
            </h1>
            <p className="mt-4 max-w-2xl text-white/75 text-lg leading-relaxed">
              Responda as 15 perguntas das 5 etapas e saia daqui com a sua
              campanha desenhada. Preencha no seu ritmo: o que você escrever fica
              guardado neste navegador até você salvar.
            </p>

            <div className="mt-8 max-w-md">
              <label
                htmlFor="organizacao"
                className="block text-xs font-semibold uppercase tracking-[0.2em] text-white/60 mb-2"
              >
                Organização ou campanha
              </label>
              <input
                id="organizacao"
                value={respostas.organizacao || ""}
                onChange={(ev) => responder("organizacao", ev.target.value)}
                placeholder="Ex: Projeto Social Dojo Bonete"
                className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white outline-none transition-colors placeholder:text-white/40 focus:border-[hsl(15,65%,56%)]"
              />
            </div>
          </div>
        </header>
      </div>

      {/* ───── FORMULÁRIO ───── */}
      <main className="px-6 py-14 md:py-16">
        <div className="max-w-5xl mx-auto space-y-12">
          {ETAPAS.map((etapa) => {
            const respondidasEtapa = etapa.canvas.filter((b) =>
              preenchida(`${etapa.n}-${b.title}`)
            ).length;
            const completa = respondidasEtapa === etapa.canvas.length;

            return (
              <section key={etapa.n}>
                {/* Cabeçalho da etapa */}
                <div
                  className="rounded-t-3xl px-6 py-5 md:px-8 text-white"
                  style={{ backgroundColor: "hsl(176 39% 14%)" }}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-[hsl(15,65%,56%)] text-sm font-bold">
                        {etapa.n}
                      </span>
                      <h2 className="text-xl md:text-2xl font-bold">{etapa.title}</h2>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                        completa
                          ? "bg-[hsl(15,65%,56%)] text-white"
                          : "bg-white/10 text-white/70"
                      }`}
                    >
                      {completa && <Check size={13} />}
                      {respondidasEtapa} de {etapa.canvas.length}
                    </span>
                  </div>
                  <p className="mt-2 text-white/70">{etapa.pergunta}</p>
                </div>

                {/* Blocos */}
                <div className="grid gap-4 md:grid-cols-3 rounded-b-3xl border border-t-0 border-border bg-secondary/25 p-4 md:p-6">
                  {etapa.canvas.map((bloco) => {
                    const chave = `${etapa.n}-${bloco.title}`;
                    return (
                      <div
                        key={bloco.title}
                        className="flex flex-col rounded-2xl border border-border bg-background p-5"
                      >
                        <div className="flex items-center gap-2">
                          <bloco.icon size={17} className="shrink-0 text-primary" />
                          <h3 className="font-bold">{bloco.title}</h3>
                        </div>
                        <label
                          htmlFor={`campo-${chave}`}
                          className="text-sm text-muted-foreground mt-2 leading-relaxed"
                        >
                          {bloco.pergunta}
                        </label>
                        <textarea
                          id={`campo-${chave}`}
                          value={respostas[chave] || ""}
                          onChange={(ev) => responder(chave, ev.target.value)}
                          rows={5}
                          placeholder="Escreva aqui a sua resposta"
                          className="mt-3 w-full flex-1 resize-y rounded-xl border border-border bg-secondary/30 p-3 text-sm leading-relaxed outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary/60 focus:bg-background"
                        />
                        <p className="mt-3 pt-3 border-t border-border text-xs italic text-primary">
                          {bloco.dica}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}

          {/* Encerramento */}
          <div className="rounded-3xl border border-primary/30 bg-secondary/40 p-8 text-center">
            <h2 className="text-xl md:text-2xl font-bold">
              Terminou o mapeamento?
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto leading-relaxed">
              Salve as suas respostas em um arquivo para compartilhar com a
              equipe. Se quiser, me mande o resultado e a gente conversa sobre
              como tirar essa campanha do papel.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={baixarRespostas}
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 rounded-full text-sm font-bold hover:opacity-90 transition-opacity"
              >
                <Download size={16} /> Salvar respostas
              </button>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-primary/40 text-primary px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-primary/10 transition-colors"
              >
                Falar com Mateus <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* ───── BARRA FIXA DE PROGRESSO E SALVAR ───── */}
      <div className="sticky bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <div className="h-1.5 flex-1 rounded-full bg-secondary overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-300"
                  style={{ width: `${(totalPreenchidas / TOTAL) * 100}%` }}
                />
              </div>
              <span className="text-xs font-bold text-primary shrink-0">
                {totalPreenchidas}/{TOTAL}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1 truncate">
              {baixado
                ? "Arquivo salvo. Suas respostas continuam aqui neste navegador."
                : "Salvo automaticamente neste navegador enquanto você escreve."}
            </p>
          </div>
          <button
            onClick={baixarRespostas}
            className="shrink-0 inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-full text-sm font-bold hover:opacity-90 transition-opacity"
          >
            <Download size={15} />
            <span className="hidden sm:inline">Salvar respostas</span>
            <span className="sm:hidden">Salvar</span>
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MapeamentoRifa;
