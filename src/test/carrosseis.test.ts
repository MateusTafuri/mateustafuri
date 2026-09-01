import { existsSync, readFileSync, readdirSync } from "node:fs";
import { describe, expect, it } from "vitest";

/* Um slug de carrossel que não bate com a pasta em public/ vira carrossel vazio
   no ar, sem erro de build. Já aconteceu: o hífen do título ("jiu‑jitsu", U+2011)
   entrou no slug junto. Este teste varre os slugs declarados nas páginas e
   confere se cada imagem existe mesmo. */

const paginas = readdirSync("src/pages").filter((f) => f.endsWith(".tsx"));

const carrosseis = paginas.flatMap((pagina) =>
  [...readFileSync(`src/pages/${pagina}`, "utf8").matchAll(/slug: "([^"]+)", count: (\d+)/g)].map(
    ([, slug, count]) => ({ pagina, slug, count: Number(count) }),
  ),
);

describe("carrosseis", () => {
  it("encontra pelo menos um carrossel declarado", () => {
    expect(carrosseis.length).toBeGreaterThan(0);
  });

  it.each(carrosseis)("$pagina: $slug tem as $count imagens", ({ slug, count }) => {
    const faltando = Array.from({ length: count }, (_, i) => `${i + 1}.webp`).filter(
      (arquivo) => !existsSync(`public/carrosseis/${slug}/${arquivo}`),
    );
    expect(faltando).toEqual([]);
  });
});
