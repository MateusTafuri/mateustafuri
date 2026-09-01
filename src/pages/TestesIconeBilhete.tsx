import { Ticket, Tickets } from "lucide-react";

/* Cinco ícones de bilhete para a pílula "metodologia aberta e gratuita" do
   topo da Rifa Solidária. Página de teste: nada em uso ainda. */

const PETROLEO = "hsl(176 39% 14%)";
const CORAL = "hsl(15 65% 56%)";

/* ── 3. bilhete com picote e furos, desenhado à mão ── */
const BilhetePicote = ({ size = 16 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" aria-hidden>
    <path
      d="M3 8.5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v1a2.5 2.5 0 0 0 0 5v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1a2.5 2.5 0 0 0 0-5v-1Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path
      d="M14.5 7v2m0 2v2m0 2v2"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

/* ── 4. dois bilhetes soltos, um atrás do outro ── */
const BilheteDuplo = ({ size = 16 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" aria-hidden>
    <rect
      x="2.5"
      y="7.5"
      width="14"
      height="9"
      rx="2"
      transform="rotate(-8 2.5 7.5)"
      stroke="currentColor"
      strokeWidth="1.5"
      opacity="0.55"
    />
    <rect
      x="7"
      y="8"
      width="14"
      height="9"
      rx="2"
      transform="rotate(6 7 8)"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

/* ── 5. bilhete premiado: canhoto destacado e a estrela ── */
const BilheteEstrela = ({ size = 16 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" aria-hidden>
    <path
      d="M2.5 9a1.5 1.5 0 0 1 1.5-1.5h9v9H4A1.5 1.5 0 0 1 2.5 15v-1.2a1.8 1.8 0 0 0 0-3.6V9Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M15.5 7.5H20a1.5 1.5 0 0 1 1.5 1.5v1.2a1.8 1.8 0 0 0 0 3.6V15a1.5 1.5 0 0 1-1.5 1.5h-4.5v-9Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="m18 10.4.62 1.25 1.38.2-1 .97.24 1.38L18 13.55l-1.24.65.24-1.38-1-.97 1.38-.2L18 10.4Z"
      fill="currentColor"
    />
  </svg>
);

const OPCOES = [
  {
    n: 1,
    nome: "Ticket do sistema",
    nota: "O ícone que já vem na biblioteca do site. Zero código novo, traço igual ao do resto.",
    icone: <Ticket size={16} />,
  },
  {
    n: 2,
    nome: "Dois tickets do sistema",
    nota: "Mesma família, mas com dois bilhetes: passa a ideia de muitos apoiadores.",
    icone: <Tickets size={16} />,
  },
  {
    n: 3,
    nome: "Bilhete com picote",
    nota: "Desenhado à mão: recortes nas laterais e a linha pontilhada do canhoto.",
    icone: <BilhetePicote />,
  },
  {
    n: 4,
    nome: "Dois bilhetes tortos",
    nota: "Dois retângulos soltos, um mais claro atrás. Tem cara de talão de rifa de papel.",
    icone: <BilheteDuplo />,
  },
  {
    n: 5,
    nome: "Bilhete premiado",
    nota: "O canhoto já destacado e uma estrelinha dentro. É o mais temático dos cinco.",
    icone: <BilheteEstrela />,
  },
];

const Pilula = ({ icone }: { icone: React.ReactNode }) => (
  <span
    className="inline-flex items-center gap-2 rounded-full border px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em]"
    style={{ borderColor: "hsl(15 65% 56% / 0.4)", color: CORAL }}
  >
    {icone}
    Metodologia aberta e gratuita
  </span>
);

const TestesIconeBilhete = () => (
  <div className="min-h-screen bg-background pb-20">
    <header className="mx-auto max-w-5xl px-5 pb-8 pt-16 sm:px-6">
      <h1 className="font-display text-3xl font-bold">Ícone da pílula do topo</h1>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Cinco bilhetes para substituir o ✨ em “metodologia aberta e gratuita”. Cada um aparece no
        fundo real do hero e ampliado ao lado.
      </p>
    </header>

    <div className="mx-auto max-w-5xl space-y-4 px-5 sm:px-6">
      {OPCOES.map((o) => (
        <section key={o.n} className="overflow-hidden rounded-2xl border border-border">
          <div className="flex flex-wrap items-center gap-4 border-b border-border bg-muted px-6 py-4">
            <span
              className="grid h-8 w-8 shrink-0 place-items-center rounded-full font-display text-sm font-bold text-white"
              style={{ background: CORAL }}
            >
              {o.n}
            </span>
            <div className="min-w-0">
              <p className="font-display text-base font-bold">{o.nome}</p>
              <p className="text-sm text-muted-foreground">{o.nota}</p>
            </div>
            <div className="ml-auto flex items-center gap-5" style={{ color: CORAL }}>
              {/* o mesmo desenho grande, para conferir o traço */}
              <span className="scale-[2.6] opacity-90">{o.icone}</span>
              <span className="w-6" />
            </div>
          </div>

          <div
            className="px-6 py-10 text-center"
            style={{
              background: `linear-gradient(120deg, ${PETROLEO} 0%, hsl(178 30% 20%) 45%, hsl(20 30% 26%) 100%)`,
            }}
          >
            <Pilula icone={o.icone} />
            <p className="mx-auto mt-6 max-w-2xl font-display text-2xl font-bold leading-tight text-white md:text-4xl">
              Como captar recursos para a sua causa com a{" "}
              <span style={{ color: CORAL }}>Rifa Solidária</span>
            </p>
          </div>
        </section>
      ))}
    </div>
  </div>
);

export default TestesIconeBilhete;
