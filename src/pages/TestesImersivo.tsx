import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowRight, Check, ClipboardList, GripVertical } from "lucide-react";
import DragCarousel from "@/components/DragCarousel";
import { ETAPAS } from "@/data/rifaSolidaria";

import dojoKids from "@/assets/bonete-dojo-kids.webp";
import inauguracao from "@/assets/bonete-inauguracao.webp";
import barco from "@/assets/bonete-barco.webp";
import rifaGrupo from "@/assets/bonete-rifa-grupo.webp";
import tijolos from "@/assets/bonete-tijolos-praia.webp";
import turma from "@/assets/bonete-turma.webp";

const CORAL = "hsl(15 65% 56%)";
const PETROLEO = "hsl(176 39% 14%)";

const PALETA = {
  "--primary": "15 65% 56%",
  "--primary-foreground": "0 0% 100%",
  "--secondary": "42 37% 88%",
  "--secondary-foreground": "178 36% 22%",
  "--border": "42 22% 84%",
} as CSSProperties;

const Bloco = ({
  num,
  nome,
  desc,
  children,
}: {
  num: number;
  nome: string;
  desc: string;
  children: React.ReactNode;
}) => (
  <section className="border-b border-border py-14">
    <div className="max-w-4xl mx-auto px-6">
      <div className="flex items-start gap-3 mb-8">
        <span
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-bold text-white"
          style={{ backgroundColor: CORAL }}
        >
          {num}
        </span>
        <div>
          <h2 className="text-xl font-bold">{nome}</h2>
          <p className="text-sm text-muted-foreground mt-0.5">{desc}</p>
        </div>
      </div>
      {children}
    </div>
  </section>
);

/* ─── 1 · TRILHA QUE ACOMPANHA O SCROLL ─── */

const TrilhaScroll = () => {
  const [ativa, setAtiva] = useState(0);
  const caixa = useRef<HTMLDivElement>(null);

  const aoRolar = () => {
    const el = caixa.current;
    if (!el) return;
    const blocos = [...el.querySelectorAll<HTMLElement>("[data-etapa]")];
    const meio = el.scrollTop + el.clientHeight * 0.35;
    let atual = 0;
    blocos.forEach((b, i) => {
      if (b.offsetTop <= meio) atual = i;
    });
    setAtiva(atual);
  };

  return (
    <div
      ref={caixa}
      onScroll={aoRolar}
      className="h-80 overflow-y-auto rounded-2xl border border-border"
      style={{ backgroundColor: PETROLEO }}
    >
      <div className="sticky top-0 z-10 flex gap-2 overflow-x-auto px-4 py-3 backdrop-blur-md [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ backgroundColor: "hsl(176 39% 14% / 0.92)" }}>
        {ETAPAS.map((e, i) => (
          <span
            key={e.n}
            className="shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors"
            style={
              i === ativa
                ? { backgroundColor: CORAL, color: "white" }
                : { color: "rgba(255,255,255,.45)" }
            }
          >
            {e.title}
          </span>
        ))}
      </div>
      {ETAPAS.map((e) => (
        <div key={e.n} data-etapa className="px-5 py-8 text-white">
          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: CORAL }}>
            Etapa {e.n}
          </p>
          <h3 className="text-xl font-bold mt-1">{e.title}</h3>
          <p className="text-sm text-white/60 mt-2 leading-relaxed">{e.chamada}</p>
        </div>
      ))}
      <p className="pb-6 text-center text-xs text-white/30">role dentro desta caixa</p>
    </div>
  );
};

/* ─── 2 · BARRA DE PROGRESSO DE LEITURA ─── */

const BarraProgresso = () => {
  const [pct, setPct] = useState(0);
  const caixa = useRef<HTMLDivElement>(null);

  const aoRolar = () => {
    const el = caixa.current;
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    setPct(max > 0 ? (el.scrollTop / max) * 100 : 0);
  };

  return (
    <div className="rounded-2xl border border-border overflow-hidden">
      <div className="h-1.5 bg-secondary">
        <div
          className="h-full transition-[width] duration-150"
          style={{ width: `${pct}%`, backgroundColor: CORAL }}
        />
      </div>
      <div ref={caixa} onScroll={aoRolar} className="h-56 overflow-y-auto p-5 space-y-4">
        {ETAPAS.map((e) => (
          <div key={e.n}>
            <h4 className="font-bold">
              {e.n}. {e.title}
            </h4>
            <p className="text-sm text-muted-foreground mt-1">{e.objetivo}</p>
          </div>
        ))}
      </div>
      <p className="px-5 pb-3 text-xs text-muted-foreground">
        {Math.round(pct)}% lido
      </p>
    </div>
  );
};

/* ─── 3 · REVELAÇÃO NO SCROLL ─── */

const Revela = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisivel(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visivel ? 1 : 0,
        transform: visivel ? "translateY(0)" : "translateY(24px)",
        transition: `opacity .6s ease ${delay}ms, transform .6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

const RevelacaoDemo = () => (
  <div className="grid sm:grid-cols-3 gap-4">
    {ETAPAS.slice(0, 3).map((e, i) => (
      <Revela key={e.n} delay={i * 120}>
        <div className="rounded-2xl border border-border bg-secondary/30 p-5 h-full">
          <span className="text-2xl font-extrabold" style={{ color: CORAL }}>
            0{e.n}
          </span>
          <h4 className="font-bold mt-1">{e.title}</h4>
          <p className="text-sm text-muted-foreground mt-2">{e.chamada}</p>
        </div>
      </Revela>
    ))}
  </div>
);

/* ─── 4 · CARTÕES QUE VIRAM ─── */

const EXEMPLOS: Record<string, string> = {
  "Por quê":
    "Nosso tatame fica embaixo de uma casa e já não cabe as 70 crianças da comunidade.",
  Meta: "R$ 150 mil, que cobrem fundação, estrutura de madeira e telhado da sede.",
  Transformação:
    "Uma sede coberta, com espaço para o dobro de alunos e para receber campeonatos.",
};

const CartaoVira = ({ titulo, pergunta }: { titulo: string; pergunta: string }) => {
  const [virado, setVirado] = useState(false);
  return (
    <button
      onClick={() => setVirado((v) => !v)}
      className="h-52 w-full text-left"
      style={{ perspective: "1000px" }}
    >
      <div
        className="relative h-full w-full transition-transform duration-500"
        style={{
          transformStyle: "preserve-3d",
          transform: virado ? "rotateY(180deg)" : "none",
        }}
      >
        {/* frente */}
        <div
          className="absolute inset-0 rounded-2xl border border-border bg-secondary/30 p-5 flex flex-col justify-between"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div>
            <h4 className="font-bold">{titulo}</h4>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{pergunta}</p>
          </div>
          <span className="text-xs font-semibold" style={{ color: CORAL }}>
            Clique para ver um exemplo
          </span>
        </div>
        {/* verso */}
        <div
          className="absolute inset-0 rounded-2xl p-5 flex flex-col justify-between text-white"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            backgroundColor: PETROLEO,
          }}
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: CORAL }}>
              Exemplo real
            </p>
            <p className="text-sm mt-2 leading-relaxed text-white/90">{EXEMPLOS[titulo]}</p>
          </div>
          <span className="text-xs text-white/40">Clique para voltar</span>
        </div>
      </div>
    </button>
  );
};

const CartoesDemo = () => (
  <div className="grid sm:grid-cols-3 gap-4">
    {ETAPAS[0].canvas.map((b) => (
      <CartaoVira key={b.title} titulo={b.title} pergunta={b.pergunta} />
    ))}
  </div>
);

/* ─── 5 · AUTOAVALIAÇÃO ─── */

const AutoAvaliacao = () => {
  const [marcadas, setMarcadas] = useState<Record<number, boolean>>({});
  const total = ETAPAS.length;
  const feitas = Object.values(marcadas).filter(Boolean).length;

  const diagnostico =
    feitas === 0
      ? "Comece pela etapa 1: definir o objetivo é o que sustenta todo o resto."
      : feitas === total
      ? "Sua campanha está mapeada. O próximo passo é colocar no ar."
      : `Você já resolveu ${feitas} de ${total}. Foque na próxima etapa em aberto antes de seguir.`;

  return (
    <div className="rounded-2xl border border-border p-6">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
        Marque o que a sua organização já tem
      </p>
      <div className="space-y-2">
        {ETAPAS.map((e) => (
          <label
            key={e.n}
            className="flex items-center gap-3 rounded-xl border border-border p-3 cursor-pointer hover:bg-secondary/30 transition-colors"
          >
            <input
              type="checkbox"
              checked={!!marcadas[e.n]}
              onChange={(ev) =>
                setMarcadas((m) => ({ ...m, [e.n]: ev.target.checked }))
              }
              className="sr-only"
            />
            <span
              className="grid h-5 w-5 shrink-0 place-items-center rounded-md border transition-colors"
              style={
                marcadas[e.n]
                  ? { backgroundColor: CORAL, borderColor: CORAL }
                  : { borderColor: "hsl(42 22% 74%)" }
              }
            >
              {marcadas[e.n] && <Check size={13} className="text-white" />}
            </span>
            <span className="text-sm">
              <strong>{e.title}:</strong> {e.precisaTitulo}
            </span>
          </label>
        ))}
      </div>
      <div
        className="mt-5 rounded-xl p-4 text-white"
        style={{ backgroundColor: PETROLEO }}
      >
        <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: CORAL }}>
          Seu diagnóstico
        </p>
        <p className="text-sm mt-1.5 text-white/90">{diagnostico}</p>
      </div>
    </div>
  );
};

/* ─── 6 · LINHA DO TEMPO ARRASTÁVEL ─── */

const FOTOS = [dojoKids, rifaGrupo, barco, tijolos, inauguracao];

const LinhaTempo = () => {
  const trilho = useRef<HTMLDivElement>(null);
  const arraste = useRef({ ativo: false, x0: 0, s0: 0 });

  return (
    <div
      ref={trilho}
      onPointerDown={(ev) => {
        if (ev.pointerType !== "mouse") return;
        arraste.current = {
          ativo: true,
          x0: ev.clientX,
          s0: trilho.current!.scrollLeft,
        };
      }}
      onPointerMove={(ev) => {
        if (!arraste.current.ativo || !trilho.current) return;
        trilho.current.scrollLeft =
          arraste.current.s0 - (ev.clientX - arraste.current.x0);
      }}
      onPointerUp={() => (arraste.current.ativo = false)}
      onPointerLeave={() => (arraste.current.ativo = false)}
      className="flex gap-4 overflow-x-auto pb-3 cursor-grab active:cursor-grabbing select-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {ETAPAS.map((e, i) => (
        <div key={e.n} className="shrink-0 w-56">
          <img
            src={FOTOS[i]}
            alt=""
            draggable={false}
            className="h-32 w-full rounded-xl object-cover pointer-events-none"
          />
          <div className="mt-3 flex items-center gap-2">
            <span
              className="grid h-6 w-6 place-items-center rounded-full text-xs font-bold text-white"
              style={{ backgroundColor: CORAL }}
            >
              {e.n}
            </span>
            <h4 className="font-bold text-sm">{e.title}</h4>
          </div>
          <p className="text-xs text-muted-foreground mt-1.5">{e.chamada}</p>
        </div>
      ))}
    </div>
  );
};

/* ─── 7 · ANTES E DEPOIS COM CORTINA ─── */

const AntesDepois = () => {
  const [pos, setPos] = useState(50);
  return (
    <div>
      <div className="relative h-72 md:h-96 overflow-hidden rounded-2xl select-none">
        <img src={inauguracao} alt="Depois" className="absolute inset-0 h-full w-full object-cover" />
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <img src={dojoKids} alt="Antes" className="h-full w-full object-cover" />
        </div>
        {/* etiquetas */}
        <span className="absolute left-4 top-4 rounded-full bg-black/50 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
          Antes
        </span>
        <span className="absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-semibold text-white" style={{ backgroundColor: CORAL }}>
          Depois
        </span>
        {/* divisor */}
        <div
          className="absolute inset-y-0 w-1 pointer-events-none"
          style={{ left: `${pos}%`, backgroundColor: "white", transform: "translateX(-50%)" }}
        >
          <span className="absolute top-1/2 left-1/2 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white shadow-lg">
            <GripVertical size={18} style={{ color: PETROLEO }} />
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label="Comparar antes e depois"
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
      <p className="text-xs text-muted-foreground mt-2 text-center">
        arraste o divisor para comparar
      </p>
    </div>
  );
};

/* ─── 8 · NÚMEROS QUE SOBEM ─── */

const NUMEROS = [
  { valor: 1260000, label: "visualizações da campanha", sufixo: "" },
  { valor: 2077, label: "apoiadores únicos", sufixo: "" },
  { valor: 20, label: "estados alcançados", sufixo: "+" },
  { valor: 104, label: "dias de campanha", sufixo: "" },
];

const Contador = ({ valor, sufixo }: { valor: number; sufixo: string }) => {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      obs.unobserve(el);
      const inicio = performance.now();
      const dur = 1400;
      const passo = (agora: number) => {
        const t = Math.min((agora - inicio) / dur, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        setN(Math.round(valor * eased));
        if (t < 1) requestAnimationFrame(passo);
      };
      requestAnimationFrame(passo);
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, [valor]);

  return (
    <p ref={ref} className="text-3xl md:text-4xl font-extrabold" style={{ color: CORAL }}>
      {n.toLocaleString("pt-BR")}
      {sufixo}
    </p>
  );
};

const NumerosDemo = () => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    {NUMEROS.map((d) => (
      <div key={d.label} className="rounded-2xl border border-border bg-secondary/30 p-5 text-center">
        <Contador valor={d.valor} sufixo={d.sufixo} />
        <p className="text-xs text-muted-foreground mt-1">{d.label}</p>
      </div>
    ))}
  </div>
);

/* ─── 10 · CONVITE AO MAPEAMENTO ─── */

const ConviteMapeamento = () => (
  <div
    className="rounded-3xl p-8 text-white grid md:grid-cols-[1fr_auto] gap-8 items-center"
    style={{ backgroundColor: PETROLEO }}
  >
    <div>
      <span className="inline-grid h-11 w-11 place-items-center rounded-2xl bg-white/10 mb-4" style={{ color: CORAL }}>
        <ClipboardList size={22} />
      </span>
      <h3 className="text-xl md:text-2xl font-bold">
        Faltam 15 perguntas para a sua campanha sair do papel
      </h3>
      <p className="text-white/70 mt-2 leading-relaxed">
        Responda no seu ritmo e leve o mapeamento pronto para a sua equipe.
      </p>
      <span
        className="mt-6 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold text-white"
        style={{ backgroundColor: CORAL }}
      >
        Montar a minha rifa <ArrowRight size={16} />
      </span>
    </div>
    {/* prévia da ferramenta */}
    <div className="hidden md:block w-64 rounded-2xl border border-white/15 bg-white/[0.05] p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-white/50">Progresso</span>
        <span className="text-xs font-bold" style={{ color: CORAL }}>
          0/15
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-white/10 mb-4">
        <div className="h-full w-[6%] rounded-full" style={{ backgroundColor: CORAL }} />
      </div>
      {["Por quê", "Meta", "Transformação"].map((t) => (
        <div key={t} className="rounded-lg border border-white/10 px-3 py-2 mb-2">
          <p className="text-xs font-semibold">{t}</p>
          <div className="mt-1.5 h-1 w-full rounded bg-white/10" />
          <div className="mt-1 h-1 w-2/3 rounded bg-white/10" />
        </div>
      ))}
    </div>
  </div>
);

/* ─── PÁGINA ─── */

const CARROSSEL = Array.from({ length: 10 }, (_, i) => `/carrosseis/rifa-solidaria/${i + 1}.jpg`);

const TestesImersivo = () => (
  <main className="bg-background text-foreground" style={PALETA}>
    <div className="max-w-4xl mx-auto px-6 pt-16 pb-6 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-2" style={{ color: CORAL }}>
        Modo teste
      </p>
      <h1 className="text-3xl md:text-4xl font-bold">
        10 elementos para deixar a página imersiva
      </h1>
      <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
        Todos funcionando de verdade. Interaja com cada um e me diga quais você
        quer na página da Rifa Solidária.
      </p>
    </div>

    <Bloco num={1} nome="Trilha que acompanha o scroll" desc="A etapa que você está lendo fica destacada numa barra fixa. Role dentro da caixa.">
      <TrilhaScroll />
    </Bloco>

    <Bloco num={2} nome="Barra de progresso de leitura" desc="Linha fina no topo mostrando o quanto já foi lido.">
      <BarraProgresso />
    </Bloco>

    <Bloco num={3} nome="Revelação no scroll" desc="Os blocos entram suavemente ao aparecer na tela, um após o outro.">
      <RevelacaoDemo />
    </Bloco>

    <Bloco num={4} nome="Cartões que viram" desc="A frente traz a pergunta, o verso traz um exemplo real. Clique num cartão.">
      <CartoesDemo />
    </Bloco>

    <Bloco num={5} nome="Autoavaliação rápida" desc="A pessoa marca o que já tem e recebe um diagnóstico na hora.">
      <AutoAvaliacao />
    </Bloco>

    <Bloco num={6} nome="Linha do tempo arrastável" desc="As 5 etapas ilustradas com fotos reais. Arraste para o lado.">
      <LinhaTempo />
    </Bloco>

    <Bloco num={7} nome="Antes e depois com cortina" desc="Arraste o divisor para revelar o resultado do método.">
      <AntesDepois />
    </Bloco>

    <Bloco num={8} nome="Números que sobem" desc="Contam de zero quando entram na tela. Só alcance e pessoas, sem valores.">
      <NumerosDemo />
    </Bloco>

    <Bloco num={9} nome="Carrosséis reais da campanha" desc="As peças que rodaram de verdade, com arraste lateral.">
      <DragCarousel title="Rifa Solidária" images={CARROSSEL} />
    </Bloco>

    <Bloco num={10} nome="Convite ao mapeamento" desc="Bloco final com prévia da ferramenta puxando para a página de preenchimento.">
      <ConviteMapeamento />
    </Bloco>

    <div className="py-14 text-center text-sm text-muted-foreground">
      Fim das opções. Me diga os números que você quer na página.
    </div>
  </main>
);

export default TestesImersivo;
