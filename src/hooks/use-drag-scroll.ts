import { useRef } from "react";

/**
 * Arrastar uma faixa horizontal com o mouse.
 * No touch o scroll nativo já resolve, então só o mouse é tratado aqui.
 */
export const useDragScroll = () => {
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef({ ativo: false, x: 0, scroll: 0 });

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    drag.current = { ativo: true, x: e.clientX, scroll: ref.current.scrollLeft };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current.ativo || !ref.current) return;
    const dx = e.clientX - drag.current.x;
    // Só captura depois de arrastar de verdade: capturar no pointerdown faz o
    // clique cair no container e links dentro da faixa param de navegar.
    if (!ref.current.hasPointerCapture(e.pointerId)) {
      if (Math.abs(dx) < 5) return;
      ref.current.setPointerCapture(e.pointerId);
    }
    ref.current.scrollLeft = drag.current.scroll - dx;
  };

  const onPointerUp = (e: React.PointerEvent) => {
    drag.current.ativo = false;
    ref.current?.releasePointerCapture?.(e.pointerId);
  };

  return {
    ref,
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel: onPointerUp,
    },
  };
};
