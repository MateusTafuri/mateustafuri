/**
 * Captura do contato de quem baixa o Mapeamento em PDF.
 *
 * O contato vai para /api/lead, que grava no D1. As regras de validação
 * moram em lead-validacao.ts, compartilhadas com o worker.
 */

import { corpoDoLead, ROTA_LEAD, type Lead } from "./lead-validacao";

export * from "./lead-validacao";

export const CHAVE_LEAD = "rifa-lead";

/** guarda quem já se identificou, para não pedir o contato duas vezes */
export const leadSalvo = (): Lead | null => {
  try {
    const bruto = localStorage.getItem(CHAVE_LEAD);
    return bruto ? (JSON.parse(bruto) as Lead) : null;
  } catch {
    return null;
  }
};

export const salvarLead = (lead: Lead) => {
  try {
    localStorage.setItem(CHAVE_LEAD, JSON.stringify(lead));
  } catch {
    // navegação privada: só vai pedir o contato de novo na próxima visita
  }
};

/**
 * Grava o contato. Devolve true quando o servidor aceitou.
 * Nunca lança: se a rede cair, o PDF ainda tem que baixar.
 */
export const enviarLead = async (
  lead: Lead,
  extras: Record<string, string> = {},
): Promise<boolean> => {
  try {
    const r = await fetch(ROTA_LEAD, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: corpoDoLead(lead, extras),
    });
    return r.ok;
  } catch {
    return false;
  }
};
