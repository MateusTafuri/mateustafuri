import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import {
  corpoDoLead,
  digitos,
  enviarLead,
  leadSalvo,
  mascaraCelular,
  salvarLead,
  validarLead,
  type Lead,
} from "@/lib/leads";

const bom: Lead = {
  nome: "Maria Silva",
  celular: "(67) 99886-0067",
  email: "Maria@Email.com ",
};

describe("máscara do celular", () => {
  it("formata enquanto a pessoa digita", () => {
    expect(mascaraCelular("6")).toBe("6");
    expect(mascaraCelular("67")).toBe("67");
    expect(mascaraCelular("679988")).toBe("(67) 9988");
    expect(mascaraCelular("6733334444")).toBe("(67) 3333-4444");
    expect(mascaraCelular("67998860067")).toBe("(67) 99886-0067");
  });

  it("ignora o que passa de 11 dígitos e o que não é número", () => {
    expect(mascaraCelular("67 99886-0067 ramal 12")).toBe("(67) 99886-0067");
    expect(digitos("(67) 99886-0067")).toBe("67998860067");
  });
});

describe("validação", () => {
  it("aceita um contato completo", () => {
    expect(validarLead(bom)).toEqual({});
  });

  it("aceita fixo com 10 dígitos", () => {
    expect(validarLead({ ...bom, celular: "(67) 3333-4444" }).celular).toBeUndefined();
  });

  it("cobra o nome", () => {
    expect(validarLead({ ...bom, nome: " " }).nome).toBeDefined();
    expect(validarLead({ ...bom, nome: "A" }).nome).toBeDefined();
  });

  it("cobra o celular com DDD", () => {
    expect(validarLead({ ...bom, celular: "99886-0067" }).celular).toBeDefined();
    expect(validarLead({ ...bom, celular: "" }).celular).toBeDefined();
  });

  it("recusa celular de 11 dígitos que não começa com 9", () => {
    expect(validarLead({ ...bom, celular: "(67) 18886-0067" }).celular).toBeDefined();
  });

  it("recusa e-mail sem arroba, sem domínio ou com espaço", () => {
    expect(validarLead({ ...bom, email: "maria.email.com" }).email).toBeDefined();
    expect(validarLead({ ...bom, email: "maria@email" }).email).toBeDefined();
    expect(validarLead({ ...bom, email: "maria @email.com" }).email).toBeDefined();
  });

  it("acusa os três de uma vez", () => {
    expect(Object.keys(validarLead({ nome: "", celular: "", email: "" }))).toHaveLength(3);
  });
});

describe("corpo enviado à API", () => {
  it("normaliza e-mail e mascara o celular", () => {
    const p = JSON.parse(corpoDoLead({ ...bom, celular: "67998860067" }));
    expect(p.nome).toBe("Maria Silva");
    expect(p.celular).toBe("(67) 99886-0067");
    expect(p.email).toBe("maria@email.com");
  });

  it("carrega os extras da página", () => {
    const p = JSON.parse(corpoDoLead(bom, { origem: "Mapeamento", progresso: "9 de 15" }));
    expect(p.origem).toBe("Mapeamento");
    expect(p.progresso).toBe("9 de 15");
  });
});

describe("memória do navegador", () => {
  beforeEach(() => localStorage.clear());

  it("começa vazia, guarda e devolve", () => {
    expect(leadSalvo()).toBeNull();
    salvarLead(bom);
    expect(leadSalvo()?.email).toBe(bom.email);
  });

  it("não quebra com lixo no localStorage", () => {
    localStorage.setItem("rifa-lead", "{isso não é json");
    expect(leadSalvo()).toBeNull();
  });
});

describe("envio", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("posta JSON para /api/lead", async () => {
    const fetchFalso = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchFalso);

    await expect(enviarLead(bom)).resolves.toBe(true);

    const [url, opcoes] = fetchFalso.mock.calls[0];
    expect(url).toBe("/api/lead");
    expect(opcoes.method).toBe("POST");
    expect(opcoes.headers["Content-Type"]).toBe("application/json");
    expect(JSON.parse(opcoes.body).nome).toBe("Maria Silva");
  });

  it("devolve false sem lançar quando a rede cai", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));
    await expect(enviarLead(bom)).resolves.toBe(false);
  });

  it("devolve false quando o servidor recusa", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }));
    await expect(enviarLead(bom)).resolves.toBe(false);
  });
});
