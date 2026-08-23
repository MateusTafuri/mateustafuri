import "@testing-library/jest-dom";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

/* O jsdom desta versão não expõe localStorage; o app usa em vários lugares,
   então os testes rodam com um de mentira, em memória. */
if (typeof window.localStorage === "undefined") {
  const memoria = new Map<string, string>();
  Object.defineProperty(window, "localStorage", {
    configurable: true,
    value: {
      getItem: (k: string) => (memoria.has(k) ? memoria.get(k)! : null),
      setItem: (k: string, v: string) => void memoria.set(k, String(v)),
      removeItem: (k: string) => void memoria.delete(k),
      clear: () => memoria.clear(),
      key: (i: number) => [...memoria.keys()][i] ?? null,
      get length() {
        return memoria.size;
      },
    },
  });
}

/* jsdom não implementa rolagem: quem chama scrollIntoView no efeito
   quebraria a renderização nos testes. */
if (!Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = () => {};
}
