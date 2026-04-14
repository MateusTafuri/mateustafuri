

## Plano: Depoimentos deslizáveis com melhor enquadramento das fotos

### O que muda

1. **Carousel/Slider**: Transformar a lista vertical de depoimentos em um carousel horizontal deslizável usando o componente `Carousel` (Embla) que já existe em `src/components/ui/carousel.tsx`. Cada depoimento será um slide, com setas de navegação e indicadores de posição (dots).

2. **Enquadramento das fotos**: Trocar `object-top` por `object-[center_30%]` nas imagens para focar melhor nos rostos, similar ao que foi feito no Hero.

### Detalhes técnicos

**Arquivo**: `src/components/FeedbackSection.tsx`

- Importar `Carousel`, `CarouselContent`, `CarouselItem`, `CarouselPrevious`, `CarouselNext` de `@/components/ui/carousel`
- Envolver os cards de feedback dentro do `Carousel` > `CarouselContent` > `CarouselItem`
- Cada `CarouselItem` contém um card de depoimento (mantendo o layout atual de imagem + texto)
- Adicionar `CarouselPrevious` e `CarouselNext` para navegação
- Adicionar indicadores (dots) mostrando o slide atual usando a API do Embla
- Mudar `object-top` para `object-[center_30%]` nas imagens para enquadrar melhor os rostos
- Configurar `loop: true` nas opções do carousel para navegação contínua

