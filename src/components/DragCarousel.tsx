import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = { title: string; images: string[] };

const DragCarousel = ({ title, images }: Props) => {
  const scroller = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, startX: 0, start: 0 });

  // Mouse drag-to-scroll (touch devices use native horizontal scroll)
  const onDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const el = scroller.current;
    if (!el) return;
    drag.current = { down: true, startX: e.clientX, start: el.scrollLeft };
    el.setPointerCapture(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    const el = scroller.current;
    if (!el || !drag.current.down) return;
    el.scrollLeft = drag.current.start - (e.clientX - drag.current.startX);
  };
  const onUp = (e: React.PointerEvent) => {
    drag.current.down = false;
    scroller.current?.releasePointerCapture?.(e.pointerId);
  };

  const nudge = (dir: number) =>
    scroller.current?.scrollBy({ left: dir * 320, behavior: "smooth" });

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-3">
        <h3 className="font-display text-xl md:text-2xl font-bold">{title}</h3>
        <div className="flex items-center gap-2 shrink-0">
          <span className="hidden sm:inline text-xs opacity-60">
            Arraste para o lado
          </span>
          <button
            onClick={() => nudge(-1)}
            aria-label="Anterior"
            className="w-9 h-9 rounded-full border border-current/25 flex items-center justify-center hover:bg-current/10 transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => nudge(1)}
            aria-label="Próximo"
            className="w-9 h-9 rounded-full border border-current/25 flex items-center justify-center hover:bg-current/10 transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div
        ref={scroller}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory cursor-grab active:cursor-grabbing select-none touch-pan-y [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`${title}, imagem ${i + 1}`}
            draggable={false}
            loading="lazy"
            className="snap-start shrink-0 w-[230px] md:w-[300px] aspect-[3/4] object-cover rounded-2xl border border-current/10 pointer-events-none"
          />
        ))}
      </div>
    </div>
  );
};

export default DragCarousel;
