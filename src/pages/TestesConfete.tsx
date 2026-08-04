import { type CSSProperties } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { ETAPAS } from "@/data/rifaSolidaria";
import Confetes, { type VarianteConfete } from "@/components/Confetes";

/* Mesmo header da Rifa Solidária, repetido com cada variante de confete. */

const CORAL = "hsl(15 65% 56%)";
const BRASA =
  "linear-gradient(120deg, hsl(176 44% 12%), hsl(178 40% 18%), hsl(184 36% 30%) 40%, hsl(15 45% 32%) 58%, hsl(178 40% 20%) 80%, hsl(176 44% 12%))";

const PALETA = {
  "--primary": "15 65% 56%",
  "--primary-foreground": "0 0% 100%",
  "--secondary": "42 37% 88%",
  "--secondary-foreground": "178 36% 22%",
  "--border": "42 22% 84%",
} as CSSProperties;

const OPCOES: {
  id: VarianteConfete;
  nome: string;
  nota: string;
  rastro?: boolean;
}[] = [
  {
    id: "estouros",
    nome: "1 · Estouros pelos cantos",
    nota: "63 papelotes divididos em sete estouros que se revezam a cada 1,5 segundo. Percurso curto, sempre um punhado no ar.",
  },
  {
    id: "estouros",
    nome: "1 + 6 · Estouros com rastro do cursor",
    nota: "Os sete estouros acontecendo sozinhos, mais os papelotes que nascem por onde o mouse passa. É o que está na página hoje: passe o cursor para ver os dois juntos.",
    rastro: true,
  },
  {
    id: "canhoes",
    nome: "2 · Canhões de baixo",
    nota: "Dois canhões nos cantos inferiores atirando na diagonal para o centro. 24 papelotes, percurso de 300 a 400px em pouco mais de um segundo: é o mais veloz dos cinco.",
  },
  {
    id: "explosao",
    nome: "3 · Explosão central",
    nota: "Um estouro só, atrás do título, com 26 papelotes abrindo em 360°. Acontece a cada 9 segundos, então tem silêncio entre um e outro.",
  },
  {
    id: "chuva",
    nome: "4 · Chuva lenta",
    nota: "16 papelotes caindo do topo até o fim do header, cada um no seu tempo, entre 11 e 14 segundos. Nunca para e nunca acelera.",
  },
  {
    id: "poeira",
    nome: "5 · Poeira que sobe",
    nota: "26 papelotes de 3px subindo devagar, como brasa de fogueira. Maior quantidade e menor velocidade dos cinco: quase um textura, não um evento.",
  },
  {
    id: "mouse",
    nome: "6 · Rastro do cursor",
    nota: "Não acontece sozinho: os papelotes nascem por onde o mouse passa, três a cada 110ms. Passe o cursor sobre o bloco abaixo.",
  },
];

const Hero = ({
  variante,
  rastro,
}: {
  variante: VarianteConfete;
  rastro?: boolean;
}) => (
  <section
    className="relative isolate overflow-hidden"
    style={{ backgroundImage: BRASA, backgroundSize: "300% 300%" }}
  >
    <Confetes variante={variante} rastro={rastro} />

    <div className="relative z-10 mx-auto max-w-4xl px-5 py-16 text-center text-white sm:px-6 md:py-24">
      <span
        className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] sm:text-xs sm:tracking-[0.2em]"
        style={{ backgroundColor: "hsl(15 65% 56% / 0.15)", color: CORAL }}
      >
        <Sparkles size={13} className="shrink-0" /> Metodologia aberta e gratuita
      </span>
      <h1 className="mt-6 text-[2rem] font-bold leading-[1.12] tracking-tight sm:text-4xl md:text-6xl md:leading-[1.08]">
        Como captar recursos para
        <br className="hidden sm:inline" />{" "}
        a sua causa com a{" "}
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
      <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
        Cinco etapas para planejar, lançar e encerrar a rifa da sua organização.
        Da primeira meta à prestação de contas.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
        {ETAPAS.map((e) => (
          <span
            key={e.n}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/[0.06] px-3 py-1.5 text-xs font-semibold sm:px-4 sm:py-2 sm:text-sm"
          >
            <span className="text-sm leading-none sm:text-base">{e.emoji}</span>
            {e.title}
          </span>
        ))}
      </div>

      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <span
          className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-bold text-white"
          style={{ backgroundColor: CORAL }}
        >
          Ver as 5 etapas <ArrowRight size={16} />
        </span>
        <span className="inline-flex items-center justify-center rounded-full border border-white/25 px-8 py-4 text-sm font-semibold">
          Montar a minha rifa
        </span>
      </div>
    </div>
  </section>
);

const TestesConfete = () => (
  <div className="min-h-screen bg-background text-foreground" style={PALETA}>
    <header className="mx-auto max-w-4xl px-5 pb-2 pt-10 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
        Teste de confete
      </p>
      <h2 className="mt-2 text-2xl font-bold md:text-3xl">
        Cinco jeitos de estourar confete no header
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Mesmo header, mesma paleta, mesmo tamanho de papelote. O que muda é de
        onde eles saem, quantos são e a que velocidade viajam. A última reage ao
        cursor.
      </p>
    </header>

    {OPCOES.map((o) => (
      <div key={o.nome} className="mt-8">
        <div className="mx-auto max-w-4xl px-5 pb-3 sm:px-6">
          <h3 className="font-bold">{o.nome}</h3>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            {o.nota}
          </p>
        </div>
        <Hero variante={o.id} rastro={o.rastro} />
      </div>
    ))}

    <p className="mx-auto max-w-4xl px-5 py-12 text-sm text-muted-foreground sm:px-6">
      Todas param com <code>prefers-reduced-motion</code>, inclusive a do
      cursor, que nem chega a registrar o evento.
    </p>
  </div>
);

export default TestesConfete;
