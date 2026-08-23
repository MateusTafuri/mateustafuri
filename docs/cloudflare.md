# Publicar na Cloudflare

O site é estático; só `/api/*` passa pelo worker (`worker/index.ts`), que grava
os contatos do Mapeamento no D1.

## 1. Conta e login

Criar a conta grátis em <https://dash.cloudflare.com/sign-up> e depois:

```bash
npx wrangler login
```

## 2. Banco dos leads

```bash
npx wrangler d1 create leads
```

O comando devolve um `database_id`. Colar esse valor no `wrangler.jsonc`, no
lugar de `PREENCHER`. Em seguida criar a tabela:

```bash
npx wrangler d1 execute leads --remote --file=worker/schema.sql
```

## 3. Senha da página de leads

```bash
npx wrangler secret put LEADS_TOKEN
```

Ele pede o valor na hora: inventar uma senha longa. É ela que abre
`/api/leads?token=SUA_SENHA`.

## 4. Publicar

```bash
npm run build && npx wrangler deploy
```

Sai um endereço `mateustafuri.workers.dev`. Dá para testar tudo por ele antes
de mexer no domínio.

## 5. Apontar o domínio

O `mateustafuri.com.br` usa hoje o DNS do Registro.br e **não tem e-mail
configurado** (nenhum registro MX ou TXT), então a troca não derruba nada além
do site.

1. No painel da Cloudflare: **Add a domain** → `mateustafuri.com.br`.
2. Ela mostra dois nameservers (algo como `xxx.ns.cloudflare.com`).
3. No Registro.br, em **DNS → Alterar servidores DNS**, trocar pelos dois da
   Cloudflare.
4. De volta na Cloudflare, no worker: **Settings → Domains & Routes → Add
   custom domain** → `mateustafuri.com.br` e `www.mateustafuri.com.br`.

A propagação costuma levar de minutos a poucas horas. Enquanto isso o site
antigo continua respondendo pela Netlify, então não há janela fora do ar.

## Onde ver os contatos

- Lista: `https://mateustafuri.com.br/api/leads?token=SUA_SENHA`
- Planilha: `https://mateustafuri.com.br/api/leads.csv?token=SUA_SENHA`

## Rodar local

```bash
npm run build
npx wrangler d1 execute leads --local --file=worker/schema.sql   # só na 1ª vez
npx wrangler dev --local --port 8788
```

O `LEADS_TOKEN` local sai do arquivo `.dev.vars`, que não vai para o Git.
