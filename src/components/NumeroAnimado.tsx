import { useEffect, useRef, useState } from "react";

/* Número que sobe de zero até o valor quando entra na tela.
   Recebe o texto pronto ("+R$ 500 mil", "2.077", "2,85x") e anima só a parte
   numérica, preservando prefixo, sufixo, casas decimais e o ponto de milhar. */

const PARTES = /^(\D*?)([\d.]*\d(?:,\d+)?)(.*)$/s;

const NumeroAnimado = ({ valor, className }: { valor: string; className?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [texto, setTexto] = useState(valor);

  useEffect(() => {
    const partes = valor.match(PARTES);
    const parado =
      typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!partes || parado || !ref.current) return;

    const [, prefixo, numero, sufixo] = partes;
    const casas = numero.includes(",") ? numero.split(",")[1].length : 0;
    const alvo = Number(numero.replace(/\./g, "").replace(",", "."));
    if (!Number.isFinite(alvo)) return;

    const formata = (n: number) =>
      prefixo +
      n.toLocaleString("pt-BR", { minimumFractionDigits: casas, maximumFractionDigits: casas }) +
      sufixo;

    setTexto(formata(0));

    let quadro = 0;
    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada.isIntersecting) return;
        observador.disconnect();

        const inicio = performance.now();
        const passo = (agora: number) => {
          const t = Math.min((agora - inicio) / 1200, 1);
          // desacelera no fim: o número chega e para, sem repique
          setTexto(formata(alvo * (1 - Math.pow(1 - t, 3))));
          if (t < 1) quadro = requestAnimationFrame(passo);
        };
        quadro = requestAnimationFrame(passo);
      },
      { threshold: 0.4 },
    );

    observador.observe(ref.current);
    return () => {
      observador.disconnect();
      cancelAnimationFrame(quadro);
    };
  }, [valor]);

  return (
    <span ref={ref} className={className}>
      {texto}
    </span>
  );
};

export default NumeroAnimado;
