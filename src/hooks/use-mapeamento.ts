import { useState } from "react";
import { ETAPAS } from "@/data/rifaSolidaria";

/**
 * Estado do Mapeamento Rifa Solidária: respostas, progresso e download.
 * Guarda no localStorage a cada tecla, então a pessoa pode fechar e voltar.
 */

export const CHAVE = "rifa-canvas";
export const TOTAL = ETAPAS.reduce((soma, e) => soma + e.canvas.length, 0);

/** chave de uma resposta: "2-Prêmio" */
export const chaveDe = (etapa: number, bloco: string) => `${etapa}-${bloco}`;

export const useMapeamento = () => {
  const [respostas, setRespostas] = useState<Record<string, string>>(() => {
    try {
      return JSON.parse(localStorage.getItem(CHAVE) || "{}");
    } catch {
      return {};
    }
  });
  const [baixado, setBaixado] = useState(false);

  const responder = (chave: string, valor: string) => {
    const proximas = { ...respostas, [chave]: valor };
    setRespostas(proximas);
    setBaixado(false);
    try {
      localStorage.setItem(CHAVE, JSON.stringify(proximas));
    } catch {
      // navegação privada: o formulário segue funcionando, só não guarda
    }
  };

  const preenchida = (chave: string) =>
    (respostas[chave] || "").trim().length > 0;

  const respondidasNa = (n: number) => {
    const etapa = ETAPAS.find((e) => e.n === n);
    if (!etapa) return 0;
    return etapa.canvas.filter((b) => preenchida(chaveDe(n, b.title))).length;
  };

  const completa = (n: number) => {
    const etapa = ETAPAS.find((e) => e.n === n);
    return !!etapa && respondidasNa(n) === etapa.canvas.length;
  };

  const totalPreenchidas = ETAPAS.reduce(
    (soma, e) => soma + respondidasNa(e.n),
    0,
  );

  const baixar = () => {
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
        const resposta = (respostas[chaveDe(etapa.n, bloco.title)] || "").trim();
        linhas.push(bloco.title.toUpperCase());
        linhas.push(`Pergunta: ${bloco.pergunta}`);
        linhas.push(`Resposta: ${resposta || "(em branco)"}`);
        linhas.push(`Lembrete: ${bloco.dica}`);
        linhas.push("");
      });
    });

    linhas.push("=".repeat(60));
    linhas.push("Quando uma causa tem propósito, ela merece voz.");
    linhas.push("mateustafuri.com.br");

    const blob = new Blob([linhas.join("\n")], {
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

  return {
    respostas,
    responder,
    preenchida,
    respondidasNa,
    completa,
    totalPreenchidas,
    baixado,
    baixar,
  };
};

export type Mapeamento = ReturnType<typeof useMapeamento>;
