-- Contatos de quem baixou o Mapeamento em PDF.
-- Aplicar com: npx wrangler d1 execute leads --remote --file=worker/schema.sql

CREATE TABLE IF NOT EXISTS leads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  celular TEXT NOT NULL,
  email TEXT NOT NULL,
  origem TEXT,
  progresso TEXT,
  organizacao TEXT,
  pais TEXT,
  criado_em TEXT NOT NULL DEFAULT (datetime('now'))
);

-- a listagem é sempre do mais novo para o mais velho
CREATE INDEX IF NOT EXISTS idx_leads_criado_em ON leads (criado_em DESC);
