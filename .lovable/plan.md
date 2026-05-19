## Mudanças no Hero (`src/components/HeroSection.tsx`)

- Remover o parágrafo "Transformo causas em narrativas que mobilizam pessoas e geram impacto social."
- Remover o botão "Vamos conversar" (CTA WhatsApp).
- Manter apenas a frase principal "Quando uma causa tem propósito, ela merece voz.", com mais destaque:
  - Aumentar o tamanho (ex.: `text-5xl md:text-7xl`) e peso (bold).
  - Posicionar mais à esquerda/baixo, como na referência do Instituto Justiça (texto grande sobre a imagem, sem CTA).
  - Ampliar `max-w-xl` para acomodar a frase em 2 linhas no desktop.
- Manter o gradiente escuro inferior para garantir legibilidade.

## Mudanças no Navbar (`src/components/Navbar.tsx`)

- Tornar o cabeçalho transparente sobreposto ao hero:
  - Trocar `sticky` por `absolute top-0 left-0 right-0` (ou `fixed`) com `z-50`.
  - Remover `bg-background/95 backdrop-blur-md` e a borda inferior.
  - Fundo transparente.
- Aplicar o tom verde do projeto (`--primary` / `text-primary-foreground` claro sobre imagem):
  - Logo, nome "Mateus Tafuri" e links em branco/verde claro para contraste sobre a imagem hero.
  - Hover usando `text-green-accent`.
  - Botão "Entrar em contato" com fundo `bg-primary` ou variante translúcida com borda verde.
- Ajustar `src/pages/Index.tsx`: o Navbar precisa ficar sobreposto ao Hero (o Hero já é `relative`), então a estrutura passa a renderizar o Navbar em cima do Hero sem empurrar o conteúdo.

## Observações

- Mobile mantém o menu hambúrguer; ícone passa a ser branco sobre a imagem.
- Demais seções da página não mudam.
