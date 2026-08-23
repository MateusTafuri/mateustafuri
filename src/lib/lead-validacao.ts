/**
 * As regras do contato, sem nada de navegador dentro: é este arquivo que o
 * worker também importa, para validar do mesmo jeito nos dois lados.
 */

export const ROTA_LEAD = "/api/lead";

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

/** o que vai no corpo do POST, já normalizado */
export const corpoDoLead = (lead: Lead, extras: Record<string, string> = {}) =>
  JSON.stringify({
    nome: lead.nome.trim(),
    celular: mascaraCelular(lead.celular),
    email: lead.email.trim().toLowerCase(),
    ...extras,
  });
