import { validarLead, type Lead } from "../src/lib/lead-validacao";

/**
 * O que roda no servidor. Só existem três endereços; todo o resto do site é
 * arquivo estático, servido antes de chegar aqui.
 *
 *   POST /api/lead          grava o contato de quem baixou o PDF
 *   GET  /api/leads         a lista, em HTML, para o Mateus olhar
 *   GET  /api/leads.csv     a mesma lista para abrir na planilha
 *
 * As duas leituras exigem ?token=, guardado como secret em LEADS_TOKEN.
 */

export type Env = {
  DB: D1Database;
  LEADS_TOKEN: string;
};

type Registro = Lead & {
  id: number;
  origem: string | null;
  progresso: string | null;
  organizacao: string | null;
  pais: string | null;
  criado_em: string;
};

const CAMPOS = ["origem", "progresso", "organizacao"] as const;

const json = (dados: unknown, status = 200) =>
  new Response(JSON.stringify(dados), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });

const texto = (corpo: string, status: number) =>
  new Response(corpo, { status, headers: { "Content-Type": "text/plain; charset=utf-8" } });

/** aceita tanto JSON quanto formulário: o cliente manda JSON, mas um POST
    de formulário puro continua funcionando se um dia precisar */
const lerCorpo = async (req: Request): Promise<Record<string, string>> => {
  const tipo = req.headers.get("content-type") || "";
  if (tipo.includes("application/json")) {
    const bruto = (await req.json()) as Record<string, unknown>;
    return Object.fromEntries(
      Object.entries(bruto).map(([k, v]) => [k, typeof v === "string" ? v : String(v ?? "")]),
    );
  }
  const form = await req.formData();
  return Object.fromEntries([...form.entries()].map(([k, v]) => [k, String(v)]));
};

const gravar = async (req: Request, env: Env) => {
  let corpo: Record<string, string>;
  try {
    corpo = await lerCorpo(req);
  } catch {
    return json({ erro: "corpo ilegível" }, 400);
  }

  const lead: Lead = {
    nome: (corpo.nome || "").trim(),
    celular: (corpo.celular || "").trim(),
    email: (corpo.email || "").trim().toLowerCase(),
  };

  /* a mesma validação da tela: aqui ela vale contra quem chama a API direto */
  const erros = validarLead(lead);
  if (Object.keys(erros).length) return json({ erros }, 422);

  /* isca de robô: campo escondido no formulário, gente não preenche */
  if ((corpo["bot-field"] || "").trim()) return json({ ok: true });

  await env.DB.prepare(
    `INSERT INTO leads (nome, celular, email, origem, progresso, organizacao, pais)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
  )
    .bind(
      lead.nome,
      lead.celular,
      lead.email,
      ...CAMPOS.map((c) => (corpo[c] || "").trim() || null),
      req.headers.get("cf-ipcountry") || null,
    )
    .run();

  return json({ ok: true });
};

const escapar = (v: unknown) =>
  String(v ?? "").replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );

const pagina = (linhas: Registro[], token: string) => `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>Leads do Mapeamento</title>
<style>
  :root { color-scheme: light dark; }
  body { font: 15px/1.5 system-ui, sans-serif; margin: 0; padding: 24px; background: #faf9f6; color: #16281f; }
  h1 { font-size: 20px; margin: 0 0 4px; }
  p { margin: 0 0 20px; color: #6b6b6b; font-size: 13px; }
  a.csv { display: inline-block; margin-bottom: 20px; background: #e4633c; color: #fff; text-decoration: none;
          padding: 8px 16px; border-radius: 999px; font-size: 13px; font-weight: 600; }
  table { border-collapse: collapse; width: 100%; background: #fff; border-radius: 10px; overflow: hidden;
          box-shadow: 0 1px 3px rgba(0,0,0,.08); }
  th, td { padding: 10px 12px; text-align: left; border-bottom: 1px solid #eee; font-size: 13px; vertical-align: top; }
  th { background: #f4f0e6; font-size: 11px; text-transform: uppercase; letter-spacing: .08em; color: #6b6b6b; }
  tr:last-child td { border-bottom: 0; }
  .vazio { padding: 40px; text-align: center; color: #6b6b6b; }
  @media (max-width: 700px) { table, thead, tbody, tr, th, td { display: block; }
    thead { display: none; } tr { margin-bottom: 12px; background:#fff; border-radius:10px; padding:6px 0; }
    td::before { content: attr(data-r) ": "; font-weight: 600; color: #6b6b6b; } }
</style></head><body>
<h1>Leads do Mapeamento</h1>
<p>${linhas.length} contato${linhas.length === 1 ? "" : "s"} · do mais novo para o mais antigo</p>
<a class="csv" href="/api/leads.csv?token=${encodeURIComponent(token)}">Baixar em CSV</a>
${
  linhas.length === 0
    ? '<div class="vazio">Nenhum contato ainda.</div>'
    : `<table><thead><tr>
    <th>Quando</th><th>Nome</th><th>Celular</th><th>E-mail</th><th>Organização</th><th>Progresso</th>
  </tr></thead><tbody>
  ${linhas
    .map(
      (l) => `<tr>
      <td data-r="Quando">${escapar(l.criado_em)}</td>
      <td data-r="Nome">${escapar(l.nome)}</td>
      <td data-r="Celular">${escapar(l.celular)}</td>
      <td data-r="E-mail">${escapar(l.email)}</td>
      <td data-r="Organização">${escapar(l.organizacao || "—")}</td>
      <td data-r="Progresso">${escapar(l.progresso || "—")}</td>
    </tr>`,
    )
    .join("")}
  </tbody></table>`
}
</body></html>`;

/** CSV com aspas dobradas, do jeito que Excel e Planilhas esperam */
const csv = (linhas: Registro[]) => {
  const celula = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const cabecalho = ["criado_em", "nome", "celular", "email", "organizacao", "progresso", "origem", "pais"];
  return [
    cabecalho.join(","),
    ...linhas.map((l) =>
      [l.criado_em, l.nome, l.celular, l.email, l.organizacao, l.progresso, l.origem, l.pais]
        .map(celula)
        .join(","),
    ),
  ].join("\n");
};

const listar = async (url: URL, env: Env, formato: "html" | "csv") => {
  const token = url.searchParams.get("token") || "";
  if (!env.LEADS_TOKEN || token !== env.LEADS_TOKEN) {
    return texto("Token inválido.", 401);
  }

  const { results } = await env.DB.prepare(
    "SELECT * FROM leads ORDER BY criado_em DESC, id DESC LIMIT 1000",
  ).all<Registro>();
  const linhas = results ?? [];

  if (formato === "csv") {
    return new Response(csv(linhas), {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="leads-mapeamento.csv"',
      },
    });
  }

  return new Response(pagina(linhas, token), {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
};

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url);

    if (url.pathname === "/api/lead" && req.method === "POST") return gravar(req, env);
    if (url.pathname === "/api/leads" && req.method === "GET") return listar(url, env, "html");
    if (url.pathname === "/api/leads.csv" && req.method === "GET") return listar(url, env, "csv");

    return texto("Não encontrado.", 404);
  },
};
