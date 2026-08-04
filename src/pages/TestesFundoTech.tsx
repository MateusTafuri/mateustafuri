import { useEffect, useRef, type CSSProperties } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { ETAPAS } from "@/data/rifaSolidaria";

const CORAL = "hsl(15 65% 56%)";
const CORAL_RGB = "216, 106, 70";
const CIANO_RGB = "120, 220, 210";
const GRADIENTE =
  "linear-gradient(150deg, hsl(176 44% 13%) 0%, hsl(178 40% 19%) 55%, hsl(181 38% 27%) 100%)";

const PALETA = {
  "--primary": "15 65% 56%",
  "--primary-foreground": "0 0% 100%",
  "--secondary": "42 37% 88%",
  "--secondary-foreground": "178 36% 22%",
  "--border": "42 22% 84%",
} as CSSProperties;

/* ───────────── host de canvas reutilizável ───────────── */

type Mouse = { x: number; y: number; ativo: boolean };
type Cena = {
  init: (w: number, h: number) => unknown;
  frame: (
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    t: number,
    mouse: Mouse,
    estado: never
  ) => void;
};

const CanvasFundo = ({ cena }: { cena: Cena }) => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const pai = canvas?.parentElement;
    if (!canvas || !pai) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let estado: unknown = null;
    let raf = 0;

    const medir = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = pai.getBoundingClientRect();
      w = Math.max(1, Math.round(r.width));
      h = Math.max(1, Math.round(r.height));
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      estado = cena.init(w, h);
    };

    medir();
    const ro = new ResizeObserver(medir);
    ro.observe(pai);

    const mouse: Mouse = { x: -9999, y: -9999, ativo: false };
    const mover = (ev: MouseEvent) => {
      const r = pai.getBoundingClientRect();
      mouse.x = ev.clientX - r.left;
      mouse.y = ev.clientY - r.top;
      mouse.ativo = true;
    };
    const sair = () => {
      mouse.ativo = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };
    pai.addEventListener("mousemove", mover);
    pai.addEventListener("mouseleave", sair);

    const inicio = performance.now();
    const loop = (agora: number) => {
      const t = (agora - inicio) / 1000;
      ctx.clearRect(0, 0, w, h);
      cena.frame(ctx, w, h, t, mouse, estado as never);
      if (!reduz) raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      pai.removeEventListener("mousemove", mover);
      pai.removeEventListener("mouseleave", sair);
    };
  }, [cena]);

  return <canvas ref={ref} className="pointer-events-none absolute inset-0" aria-hidden />;
};

/* ───────────── 1 · REDE NEURAL INTERATIVA ───────────── */

type No = { x: number; y: number; vx: number; vy: number; r: number; coral: boolean };

const redeNeural: Cena = {
  init: (w, h) => {
    const qtd = Math.min(90, Math.round((w * h) / 14000));
    const nos: No[] = Array.from({ length: qtd }, (_, i) => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      r: 1 + Math.random() * 1.6,
      coral: i % 7 === 0,
    }));
    return nos;
  },
  frame: (ctx, w, h, _t, mouse, nos: never) => {
    const lista = nos as unknown as No[];
    const DIST = Math.min(150, w / 8);

    for (const n of lista) {
      // leve atração pelo cursor
      if (mouse.ativo) {
        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 200 * 200 && d2 > 1) {
          const f = 0.035 / Math.sqrt(d2);
          n.vx += dx * f;
          n.vy += dy * f;
        }
      }
      // o impulso do cursor decai, mas a deriva base nunca morre
      const BASE = 0.3;
      const sp = Math.hypot(n.vx, n.vy) || 0.0001;
      const alvo =
        sp > BASE ? Math.max(BASE, sp * 0.985) : Math.max(sp, BASE * 0.8);
      const k = Math.min(alvo, 1.2) / sp;
      n.vx *= k;
      n.vy *= k;

      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > w) n.vx *= -1;
      if (n.y < 0 || n.y > h) n.vy *= -1;
      n.x = Math.max(0, Math.min(w, n.x));
      n.y = Math.max(0, Math.min(h, n.y));
    }

    // ligações
    ctx.lineWidth = 0.7;
    for (let i = 0; i < lista.length; i++) {
      for (let j = i + 1; j < lista.length; j++) {
        const a = lista[i];
        const b = lista[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const d = Math.hypot(dx, dy);
        if (d > DIST) continue;
        const alpha = (1 - d / DIST) * 0.32;
        ctx.strokeStyle =
          a.coral || b.coral
            ? `rgba(${CORAL_RGB}, ${alpha})`
            : `rgba(${CIANO_RGB}, ${alpha * 0.75})`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }

    // linhas até o cursor
    if (mouse.ativo) {
      for (const n of lista) {
        const d = Math.hypot(mouse.x - n.x, mouse.y - n.y);
        if (d > 190) continue;
        ctx.strokeStyle = `rgba(${CORAL_RGB}, ${(1 - d / 190) * 0.5})`;
        ctx.lineWidth = 0.9;
        ctx.beginPath();
        ctx.moveTo(mouse.x, mouse.y);
        ctx.lineTo(n.x, n.y);
        ctx.stroke();
      }
    }

    // nós
    for (const n of lista) {
      ctx.fillStyle = n.coral
        ? `rgba(${CORAL_RGB}, 0.9)`
        : `rgba(${CIANO_RGB}, 0.55)`;
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fill();
    }
  },
};

/* ───────────── 2 · GRADE EM PERSPECTIVA ───────────── */

const gradePerspectiva: Cena = {
  init: () => null,
  frame: (ctx, w, h, t) => {
    const horizonte = h * 0.42;
    const fuga = w / 2;

    // brilho do horizonte
    const g = ctx.createLinearGradient(0, horizonte - 90, 0, horizonte + 40);
    g.addColorStop(0, "rgba(120,220,210,0)");
    g.addColorStop(0.7, "rgba(120,220,210,0.16)");
    g.addColorStop(1, "rgba(216,106,70,0.12)");
    ctx.fillStyle = g;
    ctx.fillRect(0, horizonte - 90, w, 130);

    ctx.lineWidth = 1;

    // linhas que fogem para o ponto de fuga
    const colunas = 26;
    for (let i = 0; i <= colunas; i++) {
      const p = i / colunas;
      const xBase = (p - 0.5) * w * 3 + fuga;
      ctx.strokeStyle = `rgba(${CIANO_RGB}, ${0.1 + 0.12 * (1 - Math.abs(p - 0.5) * 2)})`;
      ctx.beginPath();
      ctx.moveTo(fuga, horizonte);
      ctx.lineTo(xBase, h);
      ctx.stroke();
    }

    // linhas horizontais avançando
    const linhas = 16;
    for (let i = 0; i < linhas; i++) {
      const prog = ((i / linhas + (t * 0.09) % (1 / linhas) * linhas) % 1);
      const z = Math.pow(prog, 2.4);
      const y = horizonte + z * (h - horizonte);
      const alpha = 0.05 + prog * 0.3;
      ctx.strokeStyle = prog > 0.82
        ? `rgba(${CORAL_RGB}, ${alpha})`
        : `rgba(${CIANO_RGB}, ${alpha})`;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }
  },
};

/* ───────────── 3 · CHUVA DE BILHETES NUMERADOS ───────────── */

type Coluna = { x: number; y: number; v: number; texto: string[]; destaque: boolean };

const chuvaNumeros: Cena = {
  init: (w, h) => {
    const passo = 26;
    const qtd = Math.max(6, Math.floor(w / passo));
    const cols: Coluna[] = Array.from({ length: qtd }, (_, i) => ({
      x: i * passo + passo / 2,
      y: Math.random() * h * -1.4,
      v: 22 + Math.random() * 46,
      texto: Array.from({ length: 6 + Math.floor(Math.random() * 8) }, () =>
        String(Math.floor(Math.random() * 10))
      ),
      destaque: Math.random() < 0.16,
    }));
    return cols;
  },
  frame: (ctx, w, h, t, _m, cols: never) => {
    const lista = cols as unknown as Coluna[];
    ctx.font = "600 13px ui-monospace, SFMono-Regular, Menlo, monospace";
    ctx.textAlign = "center";

    for (const c of lista) {
      c.y += c.v / 60;
      if (c.y - c.texto.length * 17 > h) {
        c.y = -20;
        c.destaque = Math.random() < 0.16;
        c.texto = Array.from({ length: 6 + Math.floor(Math.random() * 8) }, () =>
          String(Math.floor(Math.random() * 10))
        );
      }
      for (let i = 0; i < c.texto.length; i++) {
        const y = c.y - i * 17;
        if (y < -20 || y > h + 20) continue;
        const fade = 1 - i / c.texto.length;
        const alpha = fade * (c.destaque ? 0.5 : 0.22);
        ctx.fillStyle = c.destaque
          ? `rgba(${CORAL_RGB}, ${alpha})`
          : `rgba(${CIANO_RGB}, ${alpha})`;
        ctx.fillText(c.texto[i], c.x, y);
      }
      // cabeça mais brilhante
      if (c.y > 0 && c.y < h) {
        ctx.fillStyle = c.destaque
          ? `rgba(255, 230, 210, 0.75)`
          : `rgba(220, 255, 250, 0.5)`;
        ctx.fillText(c.texto[0], c.x, c.y);
      }
    }

    // vinheta para o texto respirar
    const g = ctx.createRadialGradient(w / 2, h * 0.45, 0, w / 2, h * 0.45, w * 0.55);
    g.addColorStop(0, "rgba(15,35,33,0.75)");
    g.addColorStop(1, "rgba(15,35,33,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  },
};

/* ───────────── 4 · CAMPO DE ONDAS ───────────── */

const campoOndas: Cena = {
  init: () => null,
  frame: (ctx, w, h, t, mouse) => {
    const passo = 30;
    const cols = Math.ceil(w / passo) + 1;
    const linhas = Math.ceil(h / passo) + 1;

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < linhas; j++) {
        const x = i * passo;
        const y = j * passo;
        const onda =
          Math.sin(x * 0.012 + t * 1.1) * 7 + Math.cos(y * 0.015 - t * 0.8) * 7;

        let empurra = 0;
        if (mouse.ativo) {
          const d = Math.hypot(mouse.x - x, mouse.y - y);
          if (d < 170) empurra = (1 - d / 170) * 16;
        }

        const yy = y + onda + empurra;
        const intensidade = (onda + 14) / 28;
        const r = 0.9 + intensidade * 1.5 + empurra * 0.06;
        const perto = empurra > 1;

        ctx.fillStyle = perto
          ? `rgba(${CORAL_RGB}, ${0.35 + empurra * 0.03})`
          : `rgba(${CIANO_RGB}, ${0.14 + intensidade * 0.24})`;
        ctx.beginPath();
        ctx.arc(x, yy, Math.max(0.4, r), 0, Math.PI * 2);
        ctx.fill();
      }
    }
  },
};

/* ───────────── 5 · ÓRBITAS DE DADOS ───────────── */

type Orb = { raio: number; ang: number; vel: number; r: number; coral: boolean };

const orbitas: Cena = {
  init: (w, h) => {
    const base = Math.min(w, h) * 0.16;
    const orbs: Orb[] = [];
    for (let anel = 0; anel < 5; anel++) {
      const raio = base + anel * base * 0.62;
      const qtd = 5 + anel * 3;
      for (let i = 0; i < qtd; i++) {
        orbs.push({
          raio,
          ang: (i / qtd) * Math.PI * 2 + anel,
          vel: (0.13 - anel * 0.016) * (anel % 2 ? -1 : 1),
          r: 1.2 + Math.random() * 1.8,
          coral: Math.random() < 0.22,
        });
      }
    }
    return orbs;
  },
  frame: (ctx, w, h, t, mouse, orbs: never) => {
    const lista = orbs as unknown as Orb[];
    const cx = w / 2 + (mouse.ativo ? (mouse.x - w / 2) * 0.05 : 0);
    const cy = h * 0.44 + (mouse.ativo ? (mouse.y - h * 0.44) * 0.05 : 0);

    // anéis
    const raios = [...new Set(lista.map((o) => o.raio))];
    for (const raio of raios) {
      ctx.strokeStyle = `rgba(${CIANO_RGB}, 0.09)`;
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 7]);
      ctx.beginPath();
      ctx.arc(cx, cy, raio, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.setLineDash([]);

    // núcleo
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, 120);
    g.addColorStop(0, `rgba(${CORAL_RGB}, 0.16)`);
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(cx, cy, 120, 0, Math.PI * 2);
    ctx.fill();

    // partículas com rastro
    for (const o of lista) {
      const a = o.ang + t * o.vel;
      const x = cx + Math.cos(a) * o.raio;
      const y = cy + Math.sin(a) * o.raio * 0.42;

      ctx.strokeStyle = o.coral
        ? `rgba(${CORAL_RGB}, 0.3)`
        : `rgba(${CIANO_RGB}, 0.22)`;
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.arc(cx, cy, o.raio, a - 0.26, a);
      ctx.stroke();

      ctx.fillStyle = o.coral
        ? `rgba(${CORAL_RGB}, 0.95)`
        : `rgba(${CIANO_RGB}, 0.7)`;
      ctx.beginPath();
      ctx.arc(x, y, o.r, 0, Math.PI * 2);
      ctx.fill();
    }
  },
};

/* ───────────── header ───────────── */

const NavFake = () => (
  <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-5 text-sm text-white/85">
    <span className="font-bold">Mateus Tafuri</span>
    <div className="hidden md:flex items-center gap-6">
      <span>Campanhas</span>
      <span>Rifa Solidária</span>
      <span>Trajetória</span>
      <span>Depoimentos</span>
    </div>
    <span className="rounded-full border border-white/25 px-4 py-2 text-xs font-semibold">
      Entrar em contato
    </span>
  </div>
);

const Header = ({ cena }: { cena: Cena }) => (
  <header
    className="relative overflow-hidden px-6 pt-28 pb-20 md:pt-32 md:pb-24 text-white text-center"
    style={{ backgroundImage: GRADIENTE }}
  >
    <NavFake />
    <CanvasFundo cena={cena} />
    <div
      className="pointer-events-none absolute -top-24 left-1/2 h-80 w-[36rem] -translate-x-1/2 rounded-full opacity-20 blur-3xl"
      style={{ background: `radial-gradient(circle, ${CORAL} 0%, transparent 70%)` }}
    />
    <div className="relative z-10 max-w-4xl mx-auto">
      <span
        className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] backdrop-blur-sm"
        style={{ backgroundColor: "hsl(15 65% 56% / 0.15)", color: CORAL }}
      >
        <Sparkles size={13} /> Metodologia aberta e gratuita
      </span>
      <h1
        className="mt-6 text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight"
        style={{ textShadow: "0 2px 24px rgba(8,26,24,.55)" }}
      >
        Como captar recursos para
        <br />a sua causa com a{" "}
        <span
          className="bg-clip-text text-transparent"
          style={{
            backgroundImage:
              "linear-gradient(100deg, hsl(15 65% 56%) 20%, hsl(35 90% 70%) 45%, hsl(15 65% 56%) 70%)",
            backgroundSize: "200% 100%",
            animation: "varrer 3.5s ease-in-out infinite",
          }}
        >
          Rifa Solidária
        </span>
      </h1>
      <p
        className="mt-6 max-w-2xl mx-auto text-white/80 text-lg leading-relaxed"
        style={{ textShadow: "0 1px 16px rgba(8,26,24,.6)" }}
      >
        Uma metodologia em 5 etapas para planejar, lançar e encerrar uma campanha
        de rifa na sua organização. Do primeiro objetivo até a prestação de
        contas.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-x-2 gap-y-3">
        {ETAPAS.map((e, i) => (
          <div key={e.n} className="flex items-center gap-2">
            <span className="rounded-full border border-white/20 bg-white/[0.08] px-4 py-2 text-sm font-semibold backdrop-blur-md">
              {e.title}
            </span>
            {i < ETAPAS.length - 1 && <ArrowRight size={14} className="text-white/30" />}
          </div>
        ))}
      </div>
      <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
        <span
          className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-bold text-white"
          style={{ backgroundColor: CORAL }}
        >
          Ver as 5 etapas <ArrowRight size={16} />
        </span>
        <span className="inline-flex items-center justify-center border border-white/25 px-8 py-4 rounded-full text-sm font-semibold backdrop-blur-md">
          Montar a minha rifa
        </span>
      </div>
    </div>
  </header>
);

/* ───────────── página ───────────── */

const OPCOES = [
  {
    nome: "Rede neural interativa",
    desc: "Nós conectados que se movem sozinhos. O cursor atrai as partículas e cria ligações em coral. Passe o mouse pelo header.",
    cena: redeNeural,
  },
  {
    nome: "Grade em perspectiva",
    desc: "Uma grade infinita corre em direção ao horizonte, com brilho ciano e coral na linha de fuga.",
    cena: gradePerspectiva,
  },
  {
    nome: "Chuva de números",
    desc: "Colunas de dígitos caindo, como bilhetes sendo sorteados. Algumas colunas acendem em coral.",
    cena: chuvaNumeros,
  },
  {
    nome: "Campo de ondas",
    desc: "Malha de pontos que ondula continuamente. O cursor empurra os pontos e os deixa coral.",
    cena: campoOndas,
  },
  {
    nome: "Órbitas de dados",
    desc: "Partículas orbitando um núcleo com rastros luminosos. O sistema inteiro segue o cursor de leve.",
    cena: orbitas,
  },
];

const TestesFundoTech = () => (
  <main className="bg-background text-foreground" style={PALETA}>
    <style>{`
      @keyframes varrer { 0%,100% { background-position: 0% 0; } 50% { background-position: 100% 0; } }
    `}</style>

    <div className="max-w-4xl mx-auto px-6 pt-16 pb-4 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-2" style={{ color: CORAL }}>
        Modo teste
      </p>
      <h1 className="text-3xl md:text-4xl font-bold">5 fundos com cara de tecnologia</h1>
      <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
        Todos animados em canvas, rodando de verdade. Passe o mouse dentro de
        cada header: quase todos reagem ao cursor.
      </p>
    </div>

    {OPCOES.map((o, i) => (
      <section key={o.nome} className="border-b border-border">
        <div className="max-w-5xl mx-auto px-6 pt-14 pb-6">
          <div className="flex items-start gap-3">
            <span
              className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-bold text-white"
              style={{ backgroundColor: CORAL }}
            >
              {i + 1}
            </span>
            <div>
              <h2 className="text-xl font-bold">{o.nome}</h2>
              <p className="text-sm text-muted-foreground mt-0.5">{o.desc}</p>
            </div>
          </div>
        </div>
        <Header cena={o.cena} />
      </section>
    ))}

    <div className="py-14 text-center text-sm text-muted-foreground">
      Fim das opções. Me diga o número que prefere.
    </div>
  </main>
);

export default TestesFundoTech;
