import { describe, expect, it } from "vitest";
import { temHistoricoInterno } from "@/components/Voltar";

describe("temHistoricoInterno", () => {
  it("é falso na primeira página da visita", () => {
    window.history.replaceState({ idx: 0 }, "");
    expect(temHistoricoInterno()).toBe(false);
  });

  it("é falso quando não há state (entrada direta)", () => {
    window.history.replaceState(null, "");
    expect(temHistoricoInterno()).toBe(false);
  });

  it("é verdadeiro depois de navegar dentro do site", () => {
    window.history.replaceState({ idx: 3 }, "");
    expect(temHistoricoInterno()).toBe(true);
  });
});
