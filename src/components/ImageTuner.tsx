import { useEffect, useRef, useState } from "react";
import { X, Copy, Move, ZoomIn, Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";

type Selected = {
  el: HTMLImageElement;
  originalStyle: {
    objectPosition: string;
    transform: string;
    transformOrigin: string;
  };
};

const ImageTuner = () => {
  const [enabled, setEnabled] = useState(false);
  const [picking, setPicking] = useState(false);
  const [selected, setSelected] = useState<Selected | null>(null);
  const [posX, setPosX] = useState(50);
  const [posY, setPosY] = useState(50);
  const [zoom, setZoom] = useState(1);
  const hoverRef = useRef<HTMLImageElement | null>(null);

  // Toggle with Ctrl/Cmd + Shift + I
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "i") {
        e.preventDefault();
        setEnabled((v) => !v);
      }
      if (e.key === "Escape") {
        setPicking(false);
        clearHover();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const clearHover = () => {
    if (hoverRef.current) {
      hoverRef.current.style.outline = "";
      hoverRef.current.style.cursor = "";
      hoverRef.current = null;
    }
  };

  // Picking mode: highlight images on hover, click to select
  useEffect(() => {
    if (!picking) return;

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.tagName === "IMG" && !t.closest("[data-image-tuner]")) {
        clearHover();
        const img = t as HTMLImageElement;
        img.style.outline = "3px solid hsl(var(--primary))";
        img.style.cursor = "crosshair";
        hoverRef.current = img;
      }
    };
    const onClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.tagName === "IMG" && !t.closest("[data-image-tuner]")) {
        e.preventDefault();
        e.stopPropagation();
        const img = t as HTMLImageElement;
        const computed = getComputedStyle(img);
        setSelected({
          el: img,
          originalStyle: {
            objectPosition: img.style.objectPosition || computed.objectPosition,
            transform: img.style.transform,
            transformOrigin: img.style.transformOrigin,
          },
        });

        // Parse current values
        const op = img.style.objectPosition || computed.objectPosition;
        const parts = op.split(" ");
        const px = parsePercent(parts[0], 50);
        const py = parsePercent(parts[1], 50);
        setPosX(px);
        setPosY(py);

        const tr = img.style.transform || computed.transform;
        const scaleMatch = tr.match(/scale\(([\d.]+)\)/) || tr.match(/matrix\(([\d.]+)/);
        setZoom(scaleMatch ? parseFloat(scaleMatch[1]) : 1);

        clearHover();
        setPicking(false);
      }
    };

    document.addEventListener("mouseover", onOver, true);
    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("mouseover", onOver, true);
      document.removeEventListener("click", onClick, true);
      clearHover();
    };
  }, [picking]);

  // Apply changes live
  useEffect(() => {
    if (!selected) return;
    const { el } = selected;
    el.style.objectPosition = `${posX}% ${posY}%`;
    if (zoom !== 1) {
      el.style.transform = `scale(${zoom})`;
      el.style.transformOrigin = `${posX}% ${posY}%`;
    } else {
      el.style.transform = selected.originalStyle.transform || "";
      el.style.transformOrigin = selected.originalStyle.transformOrigin || "";
    }
  }, [posX, posY, zoom, selected]);

  const reset = () => {
    if (!selected) return;
    selected.el.style.objectPosition = selected.originalStyle.objectPosition;
    selected.el.style.transform = selected.originalStyle.transform;
    selected.el.style.transformOrigin = selected.originalStyle.transformOrigin;
  };

  const deselect = () => {
    setSelected(null);
  };

  const copyValues = async () => {
    if (!selected) return;
    const src = selected.el.src.split("/").pop()?.split("?")[0] ?? "image";
    const snippet = `// ${src}\nposition: "${posX}% ${posY}%"${zoom !== 1 ? `, zoom: ${zoom.toFixed(2)}` : ""}`;
    try {
      await navigator.clipboard.writeText(snippet);
      toast({ title: "Copiado!", description: snippet });
    } catch {
      toast({ title: "Erro ao copiar", description: snippet, variant: "destructive" });
    }
  };

  if (!enabled) return null;

  return (
    <div
      data-image-tuner
      className="fixed bottom-4 right-4 z-[9999] w-80 bg-card border border-border rounded-2xl shadow-2xl p-4 text-sm"
      style={{ fontFamily: "system-ui" }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 font-semibold">
          <ZoomIn size={16} className="text-primary" />
          Ajuste de imagem
        </div>
        <button
          onClick={() => {
            setEnabled(false);
            setPicking(false);
            clearHover();
          }}
          className="text-muted-foreground hover:text-foreground"
          aria-label="Fechar"
        >
          <X size={16} />
        </button>
      </div>

      {!selected ? (
        <div className="space-y-3">
          <p className="text-xs text-muted-foreground">
            {picking
              ? "Clique em uma imagem da página. ESC para cancelar."
              : "Selecione uma imagem para ajustar zoom e posição."}
          </p>
          <button
            onClick={() => setPicking((v) => !v)}
            className={`w-full px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
              picking
                ? "bg-destructive text-destructive-foreground"
                : "bg-primary text-primary-foreground"
            }`}
          >
            {picking ? "Cancelar seleção" : "Selecionar imagem"}
          </button>
          <p className="text-[10px] text-muted-foreground/70 text-center">
            Atalho: Ctrl/⌘ + Shift + I
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-2 p-2 bg-muted rounded-lg">
            <img
              src={selected.el.src}
              alt=""
              className="w-10 h-10 rounded object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium truncate">
                {selected.el.src.split("/").pop()?.split("?")[0]}
              </p>
              <p className="text-[10px] text-muted-foreground">
                {selected.el.naturalWidth}×{selected.el.naturalHeight}
              </p>
            </div>
          </div>

          <Slider
            label="Posição X"
            icon={<Move size={12} />}
            value={posX}
            onChange={setPosX}
            min={0}
            max={100}
            suffix="%"
          />
          <Slider
            label="Posição Y"
            icon={<Move size={12} />}
            value={posY}
            onChange={setPosY}
            min={0}
            max={100}
            suffix="%"
          />
          <Slider
            label="Zoom"
            icon={<ZoomIn size={12} />}
            value={zoom}
            onChange={setZoom}
            min={1}
            max={3}
            step={0.05}
            suffix="x"
            decimals={2}
          />

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={reset}
              className="px-3 py-2 rounded-lg text-xs font-semibold bg-secondary text-secondary-foreground hover:opacity-90"
            >
              Resetar
            </button>
            <button
              onClick={copyValues}
              className="px-3 py-2 rounded-lg text-xs font-semibold bg-primary text-primary-foreground hover:opacity-90 flex items-center justify-center gap-1"
            >
              <Copy size={12} /> Copiar
            </button>
          </div>

          <button
            onClick={deselect}
            className="w-full px-3 py-1.5 rounded-lg text-xs text-muted-foreground hover:text-foreground"
          >
            ← Escolher outra imagem
          </button>
        </div>
      )}
    </div>
  );
};

const Slider = ({
  label,
  icon,
  value,
  onChange,
  min,
  max,
  step = 1,
  suffix = "",
  decimals = 0,
}: {
  label: string;
  icon: React.ReactNode;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step?: number;
  suffix?: string;
  decimals?: number;
}) => (
  <div>
    <div className="flex items-center justify-between mb-1 text-xs">
      <span className="flex items-center gap-1 text-muted-foreground">
        {icon} {label}
      </span>
      <span className="font-mono font-semibold">
        {value.toFixed(decimals)}
        {suffix}
      </span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      className="w-full accent-primary"
    />
  </div>
);

const parsePercent = (s: string, fallback: number) => {
  if (!s) return fallback;
  if (s.endsWith("%")) return parseFloat(s);
  if (s === "left" || s === "top") return 0;
  if (s === "center") return 50;
  if (s === "right" || s === "bottom") return 100;
  if (s.endsWith("px")) return fallback;
  const n = parseFloat(s);
  return isNaN(n) ? fallback : n;
};

export default ImageTuner;
