/**
 * Captura do contato de quem baixa o Mapeamento em PDF.
 *
 * Sem backend: o formulário é postado para o Netlify Forms, que guarda a
 * submissão no painel do site e dispara o e-mail de aviso. O gêmeo estático
 * desse formulário mora no index.html — é ele que o Netlify lê no build.
 */

export const FORM = "leads-mapeamento";
export const CHAVE_LEAD = "rifa-lead";

export type Lead = { nome: string; celular: string; email: string };
export type ErrosLead = Partial<Record<keyof Lead, string>>;

/** só os dígitos: "(67) 99886-0067" vira "67998860067" */
export const digitos = (v: string) => v.replace(/\D/g, "");

/** máscara conforme a pessoa digita, para 10 ou 11 dígitos */
export const mascaraCelular = (v: string) => {
  const d = digitos(v).slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
};

/* um arroba, um ponto depois dele e nada de espaço: o resto quem valida é o
   servidor de e-mail, não uma regex */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const validarLead = (lead: Lead): ErrosLead => {
  const erros: ErrosLead = {};

  if (lead.nome.trim().length < 2) erros.nome = "Escreva o seu nome.";

  const d = digitos(lead.celular);
  if (d.length < 10 || d.length > 11) {
    erros.celular = "Celular com DDD, 10 ou 11 dígitos.";
  } else if (d.length === 11 && d[2] !== "9") {
    erros.celular = "Confira o número: celular com 11 dígitos começa com 9.";
  }

  if (!EMAIL.test(lead.email.trim())) erros.email = "E-mail inválido.";

  return erros;
};

/** o corpo que o Netlify espera: urlencoded, com o nome do formulário junto */
export const corpoDoLead = (lead: Lead, extras: Record<string, string> = {}) =>
  new URLSearchParams({
    "form-name": FORM,
    nome: lead.nome.trim(),
    celular: mascaraCelular(lead.celular),
    email: lead.email.trim().toLowerCase(),
    ...extras,
  }).toString();

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
 * Envia para o Netlify. Devolve true quando a submissão foi aceita.
 * Nunca lança: se a rede cair, o PDF ainda tem que baixar.
 */
export const enviarLead = async (
  lead: Lead,
  extras: Record<string, string> = {},
): Promise<boolean> => {
  try {
    const r = await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: corpoDoLead(lead, extras),
    });
    return r.ok;
  } catch {
    return false;
  }
};
