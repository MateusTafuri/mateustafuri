

## Recomendação

**Opção C — Painel + Lovable Cloud** é a melhor pra você. Aqui está o porquê:

### Comparação rápida

| Critério | Opção A (Chat) | Opção B (Local) | **Opção C (Cloud)** |
|---|---|---|---|
| Esforço seu por troca | Alto (depende de mim) | Baixo | **Baixo** |
| Persiste no site publicado | ✅ (mas via mim) | ❌ Só no seu navegador | ✅ |
| Funciona em outro dispositivo | ✅ | ❌ | ✅ |
| Sobrevive a limpar cache | ✅ | ❌ | ✅ |
| Crop visual com zoom | ❌ | ✅ | ✅ |
| Reordenar arrastando | ❌ | ✅ | ✅ |
| Tempo de implementação | 0 | ~médio | ~médio+ |
| Custo | 0 | 0 | Gratuito pra começar |

### Por que C ganha

A **Opção B tem um problema sério**: as imagens vivem só no `localStorage` do **seu navegador atual**. Se você:
- Abrir o site no celular → vê as imagens antigas
- Limpar cache → perde tudo
- Mostrar pra um cliente em outro PC → ele vê as antigas

Ou seja, B é só uma "prévia pessoal" — você ainda precisaria me chamar pra fixar as mudanças no código de verdade. Acaba sendo trabalho duplo.

A **Opção C** resolve isso de vez: você sobe, croppa, reordena no painel `/admin/caraiva`, salva, e **aparece pra todo mundo** no site publicado, em qualquer dispositivo, pra sempre.

### Plano (Opção C)

1. Ativar **Lovable Cloud** (Supabase gerenciado, gratuito pra começar)
2. Criar bucket de Storage `caraiva-images` (público pra leitura)
3. Criar tabela `caraiva_image_sections` (seção, ordem, url, alt) com RLS
4. Instalar `react-easy-crop` + `@dnd-kit/sortable` (drag-and-drop)
5. Criar `src/components/ImageCropEditor.tsx` — modal com crop quadrado, zoom, posição
6. Criar `src/pages/AdminCaraiva.tsx` em rota `/admin/caraiva`:
   - Lista das seções editáveis
   - Upload, crop, reordenar arrastando, remover
   - Proteção: senha simples ou login (te pergunto na hora)
7. Refatorar `src/pages/DojoCaraiva.tsx` pra ler imagens da tabela (com fallback nos assets atuais como default, então nada quebra se a tabela estiver vazia)

### Antes de começar, preciso decidir 2 coisas

