import { useEffect, useRef, type CSSProperties } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { ETAPAS } from "@/data/rifaSolidaria";
import logoTafuri from "@/assets/logo-tafuri.webp";

const CORAL = "hsl(15 65% 56%)";
const CORAL_RGB = "216, 106, 70";
const CIANO_RGB = "120, 220, 210";
const CREME_RGB = "229, 220, 199";
const GRADIENTE =
  "linear-gradient(150deg, hsl(176 44% 13%) 0%, hsl(178 40% 19%) 55%, hsl(181 38% 27%) 100%)";

const PALETA = {
  "--primary": "15 65% 56%",
  "--primary-foreground": "0 0% 100%",
  "--secondary": "42 37% 88%",
  "--secondary-foreground": "178 36% 22%",
  "--border": "42 22% 84%",
} as CSSProperties;

/* ───────────── host de canvas ───────────── */

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

/* ───────────── 1 · MAPA DO BRASIL SE ACENDENDO ───────────── */

/* contorno simplificado do Brasil, normalizado */
const BRASIL: [number, number][] = [
  [0.44, 0.0], [0.5, 0.05], [0.55, 0.03], [0.58, 0.1], [0.62, 0.13],
  [0.68, 0.16], [0.74, 0.17], [0.8, 0.2], [0.86, 0.26], [0.88, 0.33],
  [0.86, 0.4], [0.84, 0.46], [0.8, 0.52], [0.76, 0.58], [0.7, 0.62],
  [0.64, 0.67], [0.6, 0.72], [0.55, 0.78], [0.5, 0.8], [0.46, 0.76],
  [0.44, 0.7], [0.42, 0.64], [0.38, 0.6], [0.34, 0.55], [0.3, 0.5],
  [0.26, 0.45], [0.22, 0.4], [0.16, 0.36], [0.1, 0.34], [0.08, 0.3],
  [0.12, 0.26], [0.16, 0.22], [0.14, 0.16], [0.18, 0.12], [0.24, 0.1],
  [0.3, 0.06], [0.36, 0.04],
];

const dentro = (px: number, py: number) => {
  let d = false;
  for (let i = 0, j = BRASIL.length - 1; i < BRASIL.length; j = i++) {
    const [xi, yi] = BRASIL[i];
    const [xj, yj] = BRASIL[j];
    if (yi > py !== yj > py && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi) d = !d;
  }
  return d;
};

type Cidade = { x: number; y: number; r: number; acende: number; hub: boolean };

const mapaBrasil: Cena = {
  init: (w, h) => {
    const esc = Math.min(w * 0.5, h * 1.15);
    const ox = w / 2 - esc * 0.48;
    const oy = h / 2 - esc * 0.4;
    const cidades: Cidade[] = [];
    let tent = 0;
    while (cidades.length < 150 && tent < 6000) {
      tent++;
      const nx = Math.random();
      const ny = Math.random() * 0.8;
      if (!dentro(nx, ny)) continue;
      cidades.push({
        x: ox + nx * esc,
        y: oy + ny * esc,
        r: 1 + Math.random() * 1.5,
        acende: Math.random() * 14,
        hub: Math.random() < 0.07,
      });
    }
    return { cidades, origem: { x: ox + 0.62 * esc, y: oy + 0.62 * esc } };
  },
  frame: (ctx, w, h, t, mouse, est: never) => {
    const { cidades, origem } = est as unknown as {
      cidades: Cidade[];
      origem: { x: number; y: number };
    };
    const ciclo = t % 14;

    // arcos partindo da origem para os hubs já acesos
    for (const c of cidades) {
      if (!c.hub || ciclo < c.acende) continue;
      const prog = Math.min(1, (ciclo - c.acende) / 1.6);
      const mx = (origem.x + c.x) / 2;
      const my = (origem.y + c.y) / 2 - Math.hypot(c.x - origem.x, c.y - origem.y) * 0.35;
      ctx.strokeStyle = `rgba(${CORAL_RGB}, ${0.3 * prog * (1 - prog * 0.4)})`;
      ctx.lineWidth = 1.1;
      ctx.beginPath();
      ctx.moveTo(origem.x, origem.y);
      ctx.quadraticCurveTo(mx, my, origem.x + (c.x - origem.x) * prog, origem.y + (c.y - origem.y) * prog);
      ctx.stroke();
    }

    // cidades
    for (const c of cidades) {
      const acesa = ciclo > c.acende;
      const idade = ciclo - c.acende;
      const pulso = acesa && idade < 1 ? 1 + (1 - idade) * 2.5 : 1;
      let alpha = acesa ? 0.75 : 0.14;

      if (mouse.ativo) {
        const d = Math.hypot(mouse.x - c.x, mouse.y - c.y);
        if (d < 120) alpha = Math.min(1, alpha + (1 - d / 120) * 0.6);
      }

      ctx.fillStyle = c.hub
        ? `rgba(${CORAL_RGB}, ${alpha})`
        : `rgba(${CREME_RGB}, ${alpha * 0.8})`;
      ctx.beginPath();
      ctx.arc(c.x, c.y, c.r * pulso, 0, Math.PI * 2);
      ctx.fill();

      if (acesa && idade < 1) {
        ctx.strokeStyle = `rgba(${CORAL_RGB}, ${(1 - idade) * 0.4})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.r + idade * 16, 0, Math.PI * 2);
        ctx.stroke();
      }
    }
  },
};

/* ───────────── 2 · ONDAS DE MOBILIZAÇÃO ───────────── */

type Pessoa = { x: number; y: number; acesa: boolean; quando: number };
type Onda = { x: number; y: number; inicio: number };

const ondasMobilizacao: Cena = {
  init: (w, h) => {
    const passo = 42;
    const pessoas: Pessoa[] = [];
    for (let x = passo / 2; x < w; x += passo) {
      for (let y = passo / 2; y < h; y += passo) {
        pessoas.push({
          x: x + (Math.random() - 0.5) * 14,
          y: y + (Math.random() - 0.5) * 14,
          acesa: false,
          quando: 0,
        });
      }
    }
    return { pessoas, ondas: [] as Onda[], proxima: 0.5 };
  },
  frame: (ctx, w, h, t, mouse, est: never) => {
    const s = est as unknown as { pessoas: Pessoa[]; ondas: Onda[]; proxima: number };

    // nova onda de tempos em tempos
    if (t > s.proxima) {
      s.ondas.push({ x: Math.random() * w, y: Math.random() * h, inicio: t });
      s.proxima = t + 1.6 + Math.random() * 1.4;
    }
    // onda ao mover o mouse
    if (mouse.ativo && s.ondas.length < 14 && Math.random() < 0.02) {
      s.ondas.push({ x: mouse.x, y: mouse.y, inicio: t });
    }

    const VEL = 190;
    s.ondas = s.ondas.filter((o) => (t - o.inicio) * VEL < Math.hypot(w, h) * 1.1);

    // anéis
    for (const o of s.ondas) {
      const raio = (t - o.inicio) * VEL;
      const fade = Math.max(0, 1 - raio / (Math.hypot(w, h) * 0.85));
      ctx.strokeStyle = `rgba(${CORAL_RGB}, ${fade * 0.3})`;
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.arc(o.x, o.y, raio, 0, Math.PI * 2);
      ctx.stroke();
    }

    // pessoas acendem quando a onda passa
    for (const p of s.pessoas) {
      for (const o of s.ondas) {
        const raio = (t - o.inicio) * VEL;
        const d = Math.hypot(p.x - o.x, p.y - o.y);
        if (Math.abs(d - raio) < 16) {
          if (!p.acesa || t - p.quando > 0.5) {
            p.acesa = true;
            p.quando = t;
          }
        }
      }

      const idade = t - p.quando;
      const brilho = p.acesa ? Math.max(0, 1 - idade / 2.6) : 0;
      const r = 1.3 + brilho * 2.4;

      ctx.fillStyle = `rgba(${CREME_RGB}, ${0.1 + brilho * 0.75})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.fill();

      if (brilho > 0.5) {
        ctx.fillStyle = `rgba(${CORAL_RGB}, ${(brilho - 0.5) * 0.5})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r + 4, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  },
};

/* ───────────── 3 · O TSURU SE FORMANDO ───────────── */

type Part = { x: number; y: number; ax: number; ay: number; r: number; coral: boolean };

const tsuruParticulas: Cena = {
  init: (w, h) => {
    const est = {
      parts: [] as Part[],
      pronto: false,
    };
    const img = new Image();
    img.src = logoTafuri;
    img.onload = () => {
      const lado = Math.min(w * 0.45, h * 0.8, 460);
      const off = document.createElement("canvas");
      off.width = Math.round(lado);
      off.height = Math.round(lado);
      const oc = off.getContext("2d");
      if (!oc) return;
      oc.drawImage(img, 0, 0, off.width, off.height);
      const d = oc.getImageData(0, 0, off.width, off.height).data;
      const alvos: [number, number][] = [];
      const passo = 4;
      for (let y = 0; y < off.height; y += passo) {
        for (let x = 0; x < off.width; x += passo) {
          const a = d[(y * off.width + x) * 4 + 3];
          if (a > 120) alvos.push([x, y]);
        }
      }
      // no máximo 700 partículas
      const fator = Math.max(1, Math.floor(alvos.length / 700));
      const escolhidos = alvos.filter((_, i) => i % fator === 0);
      const ox = w / 2 - off.width / 2;
      const oy = h * 0.46 - off.height / 2;
      est.parts = escolhidos.map(([x, y], i) => ({
        x: Math.random() * w,
        y: Math.random() * h,
        ax: ox + x,
        ay: oy + y,
        r: 0.9 + Math.random() * 1.1,
        coral: i % 9 === 0,
      }));
      est.pronto = true;
    };
    return est;
  },
  frame: (ctx, w, h, t, mouse, est: never) => {
    const s = est as unknown as { parts: Part[]; pronto: boolean };
    if (!s.pronto) return;

    // ciclo: junta, segura, dispersa
    const ciclo = t % 12;
    const juntar = ciclo < 8;

    for (const p of s.parts) {
      const alvoX = juntar ? p.ax : p.ax + Math.sin(p.ax * 0.05 + t) * 90;
      const alvoY = juntar ? p.ay : p.ay + Math.cos(p.ay * 0.05 + t) * 70;
      const k = juntar ? 0.045 : 0.012;
      p.x += (alvoX - p.x) * k;
      p.y += (alvoY - p.y) * k;

      // o cursor afasta as partículas
      if (mouse.ativo) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d = Math.hypot(dx, dy);
        if (d < 90 && d > 0.5) {
          const f = (1 - d / 90) * 6;
          p.x += (dx / d) * f;
          p.y += (dy / d) * f;
        }
      }

      ctx.fillStyle = p.coral
        ? `rgba(${CORAL_RGB}, 0.85)`
        : `rgba(${CREME_RGB}, 0.5)`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
  },
};

/* ───────────── 4 · CONSTRUÇÃO COLETIVA ───────────── */

type Tijolo = { x: number; y: number; w: number; h: number; entra: number; coral: boolean };

const construcao: Cena = {
  init: (w, h) => {
    const larg = 26;
    const alt = 11;
    const colunas = Math.ceil(w / (larg + 4)) + 1;
    const fileiras = 9;
    const tijolos: Tijolo[] = [];
    for (let f = 0; f < fileiras; f++) {
      for (let c = 0; c < colunas; c++) {
        if (Math.random() < 0.22) continue;
        const desloc = f % 2 ? larg / 2 : 0;
        tijolos.push({
          x: c * (larg + 4) - desloc,
          y: h - (f + 1) * (alt + 4),
          w: larg,
          h: alt,
          entra: f * 0.9 + Math.random() * 0.8,
          coral: Math.random() < 0.09,
        });
      }
    }
    return tijolos;
  },
  frame: (ctx, w, h, t, mouse, tj: never) => {
    const lista = tj as unknown as Tijolo[];
    const ciclo = t % 16;

    for (const b of lista) {
      const idade = ciclo - b.entra;
      if (idade < 0) continue;
      const chegada = Math.min(1, idade / 0.7);
      const suave = 1 - Math.pow(1 - chegada, 3);
      const y = b.y - (1 - suave) * 70;
      const alpha = Math.min(0.5, suave * 0.5) * (ciclo > 14 ? (16 - ciclo) / 2 : 1);

      let realce = 0;
      if (mouse.ativo) {
        const d = Math.hypot(mouse.x - (b.x + b.w / 2), mouse.y - (b.y + b.h / 2));
        if (d < 130) realce = (1 - d / 130) * 0.5;
      }

      ctx.fillStyle = b.coral
        ? `rgba(${CORAL_RGB}, ${alpha + realce})`
        : `rgba(${CREME_RGB}, ${alpha * 0.55 + realce})`;
      ctx.fillRect(b.x, y, b.w, b.h);

      if (chegada < 1) {
        ctx.fillStyle = `rgba(${CORAL_RGB}, ${(1 - chegada) * 0.5})`;
        ctx.fillRect(b.x, y, b.w, 1.5);
      }
    }
  },
};

/* ───────────── 5 · REDE DE COMUNIDADES ───────────── */

type Membro = { cx: number; cy: number; ang: number; raio: number; vel: number; grupo: number; r: number };

const comunidades: Cena = {
  init: (w, h) => {
    // o texto ocupa uma coluna central de no máximo 896px.
    // as comunidades vivem nas margens que sobram dos dois lados.
    const colunaTexto = Math.min(896, w - 48);
    const margem = Math.max(40, (w - colunaTexto) / 2);
    const limite = margem - 10; // a órbita pode chegar até aqui sem tocar o texto

    // escalonadas em x e y, nenhuma alinhada com a outra
    const bruto = [
      { x: margem * 0.35, y: h * 0.18 },
      { x: margem * 0.72, y: h * 0.62 },
      { x: w - margem * 0.45, y: h * 0.32 },
      { x: w - margem * 0.75, y: h * 0.8 },
    ];

    const centros = bruto.map((c) => {
      const folga = c.x < w / 2 ? limite - c.x : c.x - (w - limite);
      return { ...c, raio: Math.max(12, Math.min(84, folga)) };
    });

    const membros: Membro[] = [];
    centros.forEach((c, g) => {
      const qtd = 7 + Math.floor(Math.random() * 4);
      for (let i = 0; i < qtd; i++) {
        membros.push({
          cx: c.x,
          cy: c.y,
          ang: (i / qtd) * Math.PI * 2 + g,
          raio: c.raio * (0.35 + Math.random() * 0.65),
          vel: (0.1 + Math.random() * 0.12) * (i % 2 ? 1 : -1),
          grupo: g,
          r: 1.2 + Math.random() * 1.4,
        });
      }
    });
    return {
      membros,
      centros,
      pulsos: [] as { de: number; para: number; inicio: number }[],
      proximo: 1,
      colunaTexto,
    };
  },
  frame: (ctx, w, h, t, mouse, est: never) => {
    const s = est as unknown as {
      membros: Membro[];
      centros: { x: number; y: number }[];
      pulsos: { de: number; para: number; inicio: number }[];
      proximo: number;
      colunaTexto: number;
    };

    if (t > s.proximo) {
      const de = Math.floor(Math.random() * s.centros.length);
      let para = Math.floor(Math.random() * s.centros.length);
      if (para === de) para = (para + 1) % s.centros.length;
      s.pulsos.push({ de, para, inicio: t });
      s.proximo = t + 1.1 + Math.random();
    }
    s.pulsos = s.pulsos.filter((p) => t - p.inicio < 2);

    // quanto o ponto está dentro da coluna de texto (0 fora, 1 no meio)
    const noTexto = (x: number) => {
      const meia = s.colunaTexto / 2;
      const dist = Math.abs(x - w / 2);
      return dist > meia ? 0 : 1 - dist / meia;
    };

    // linhas entre comunidades, apagando ao cruzar o texto
    ctx.lineWidth = 1;
    for (let i = 0; i < s.centros.length; i++) {
      for (let j = i + 1; j < s.centros.length; j++) {
        const a = s.centros[i];
        const b = s.centros[j];
        const mesmoLado = (a.x < w / 2) === (b.x < w / 2);
        if (mesmoLado) {
          ctx.strokeStyle = `rgba(${CIANO_RGB}, 0.1)`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        } else {
          const g = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
          g.addColorStop(0, `rgba(${CIANO_RGB}, 0.1)`);
          g.addColorStop(0.42, `rgba(${CIANO_RGB}, 0)`);
          g.addColorStop(0.58, `rgba(${CIANO_RGB}, 0)`);
          g.addColorStop(1, `rgba(${CIANO_RGB}, 0.1)`);
          ctx.strokeStyle = g;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    // pulsos viajando, sumindo por trás do texto
    for (const p of s.pulsos) {
      const prog = (t - p.inicio) / 2;
      const a = s.centros[p.de];
      const b = s.centros[p.para];
      const x = a.x + (b.x - a.x) * prog;
      const y = a.y + (b.y - a.y) * prog;
      const liberdade = 1 - noTexto(x);

      if (liberdade > 0.02) {
        ctx.strokeStyle = `rgba(${CORAL_RGB}, ${(1 - prog) * 0.4 * liberdade})`;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.fillStyle = `rgba(${CORAL_RGB}, ${(1 - prog) * liberdade})`;
        ctx.beginPath();
        ctx.arc(x, y, 2.6, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // membros orbitando o centro da comunidade
    for (const m of s.membros) {
      const a = m.ang + t * m.vel;
      let x = m.cx + Math.cos(a) * m.raio;
      let y = m.cy + Math.sin(a) * m.raio * 0.62;

      if (mouse.ativo) {
        const d = Math.hypot(mouse.x - x, mouse.y - y);
        if (d < 110) {
          const f = (1 - d / 110) * 10;
          x += (x - mouse.x) / (d || 1) * f;
          y += (y - mouse.y) / (d || 1) * f;
        }
      }

      // liga ao centro
      ctx.strokeStyle = `rgba(${CIANO_RGB}, 0.13)`;
      ctx.lineWidth = 0.7;
      ctx.beginPath();
      ctx.moveTo(m.cx, m.cy);
      ctx.lineTo(x, y);
      ctx.stroke();

      ctx.fillStyle = `rgba(${CREME_RGB}, 0.55)`;
      ctx.beginPath();
      ctx.arc(x, y, m.r, 0, Math.PI * 2);
      ctx.fill();
    }

    // núcleo de cada comunidade
    for (const c of s.centros) {
      ctx.fillStyle = `rgba(${CORAL_RGB}, 0.75)`;
      ctx.beginPath();
      ctx.arc(c.x, c.y, 3.4, 0, Math.PI * 2);
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
        style={{ textShadow: "0 2px 28px rgba(8,26,24,.6)" }}
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
        style={{ textShadow: "0 1px 18px rgba(8,26,24,.7)" }}
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
    nome: "O Brasil se acendendo",
    desc: "Pontos no mapa do Brasil acendem um a um e arcos partem da sua campanha para os outros estados. É o alcance nacional virando imagem.",
    cena: mapaBrasil,
  },
  {
    nome: "Ondas de mobilização",
    desc: "Um apoio vira onda, a onda acende quem está em volta, e assim por diante. O efeito multiplicador da rifa em movimento.",
    cena: ondasMobilizacao,
  },
  {
    nome: "O tsuru se formando",
    desc: "Centenas de partículas dispersas se juntam para formar o seu tsuru, seguram e se espalham de novo. O cursor afasta as partículas.",
    cena: tsuruParticulas,
  },
  {
    nome: "Construção coletiva",
    desc: "Tijolos sobem e formam uma parede, fileira por fileira, como a sede erguida em mutirão. Recomeça a cada ciclo.",
    cena: construcao,
  },
  {
    nome: "Rede de comunidades",
    desc: "Quatro comunidades com seus membros em órbita, e pulsos de apoio viajando entre elas. Rede, mas com gente reunida em grupos.",
    cena: comunidades,
  },
];

const TestesFundoImpacto = () => (
  <main className="bg-background text-foreground" style={PALETA}>
    <style>{`
      @keyframes varrer { 0%,100% { background-position: 0% 0; } 50% { background-position: 100% 0; } }
    `}</style>

    <div className="max-w-4xl mx-auto px-6 pt-16 pb-4 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-2" style={{ color: CORAL }}>
        Modo teste
      </p>
      <h1 className="text-3xl md:text-4xl font-bold">
        5 fundos que falam de impacto social
      </h1>
      <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
        Nenhum é rede de partículas genérica. Cada um traduz uma ideia da sua
        causa. Passe o mouse dentro dos headers.
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

export default TestesFundoImpacto;
