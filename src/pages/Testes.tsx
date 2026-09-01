import heroImg from "@/assets/hero-real.webp";

const PHRASE = (
  <>
    Quando uma causa
    <br />
    tem propósito,
    <br />
    ela merece voz.
  </>
);

type VariantProps = {
  num: number;
  title: string;
  desc: string;
  children: React.ReactNode;
};

const Variant = ({ num, title, desc, children }: VariantProps) => (
  <section className="relative h-[85vh] min-h-[560px] w-full overflow-hidden">
    {children}
    {/* Label */}
    <div className="absolute top-5 left-5 z-20 max-w-sm">
      <div className="inline-flex items-center gap-2 rounded-full bg-black/40 backdrop-blur px-3 py-1.5 text-white">
        <span className="grid h-6 w-6 place-items-center rounded-full bg-white text-black text-xs font-bold">
          {num}
        </span>
        <span className="text-sm font-semibold">{title}</span>
      </div>
      <p className="mt-2 rounded-lg bg-black/35 backdrop-blur px-3 py-1.5 text-xs text-white/90">
        {desc}
      </p>
    </div>
  </section>
);

const Testes = () => {
  return (
    <main className="w-full bg-neutral-950">
      <div className="mx-auto max-w-3xl px-6 py-10 text-center">
        <h1 className="text-2xl font-bold text-white">Testes de Capa, 5 opções</h1>
        <p className="mt-2 text-sm text-white/60">
          Mesma foto, mesma frase. Menos preto, mais impacto e mais alinhado à paleta verde da marca.
          Role para comparar.
        </p>
      </div>

      {/* ─────────────────────────────── OPÇÃO 1 ─────────────────────────────── */}
      <Variant
        num={1}
        title="Oliva translúcido"
        desc="Preto trocado por verde-oliva da marca com blend multiply, tinge a foto em vez de escurecê-la."
      >
        <img
          src={heroImg}
          alt="Mateus Tafuri com alunos no dojo"
          className="absolute inset-0 h-full w-full object-cover object-[center_25%]"
        />
        {/* Olive tint instead of black */}
        <div
          className="absolute inset-0 mix-blend-multiply"
          style={{
            backgroundImage:
              "linear-gradient(to top, hsl(80 25% 20% / 0.9) 0%, hsl(80 25% 25% / 0.35) 45%, transparent 75%)",
          }}
        />
        <div className="absolute inset-0 flex items-end justify-center pb-16 px-6">
          <h1 className="max-w-4xl text-center font-bold leading-[1.05] tracking-tight text-white text-3xl md:text-5xl lg:text-6xl drop-shadow-[0_2px_12px_rgba(30,40,20,0.7)]">
            {PHRASE}
          </h1>
        </div>
      </Variant>

      {/* ─────────────────────────────── OPÇÃO 2 ─────────────────────────────── */}
      <Variant
        num={2}
        title="Duotone verde"
        desc="Tratamento editorial: sombras oliva + luzes verde-claro. Visual de campanha, zero cinza-morto."
      >
        <img
          src={heroImg}
          alt="Mateus Tafuri com alunos no dojo"
          className="absolute inset-0 h-full w-full object-cover object-[center_25%] grayscale contrast-[1.1] brightness-[1.05]"
        />
        {/* Green tint that preserves photo luminance/detail */}
        <div
          className="absolute inset-0 mix-blend-color"
          style={{ backgroundColor: "hsl(90 45% 38%)" }}
        />
        {/* Subtle depth + text contrast at bottom */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to top, hsl(88 40% 14% / 0.8) 0%, hsl(88 35% 20% / 0.25) 45%, transparent 72%)",
          }}
        />
        <div className="absolute inset-0 flex items-end justify-center pb-16 px-6">
          <h1 className="max-w-4xl text-center font-bold leading-[1.05] tracking-tight text-[hsl(103,66%,94%)] text-3xl md:text-5xl lg:text-6xl drop-shadow-[0_2px_10px_rgba(20,30,10,0.6)]">
            {PHRASE}
          </h1>
        </div>
      </Variant>

      {/* ─────────────────────────────── OPÇÃO 3 ─────────────────────────────── */}
      <Variant
        num={3}
        title="Faixa lateral"
        desc="Painel verde à esquerda com a frase; rostos das crianças livres à direita. Layout de revista, alto contraste."
      >
        <img
          src={heroImg}
          alt="Mateus Tafuri com alunos no dojo"
          className="absolute inset-0 h-full w-full object-cover object-[70%_25%]"
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, hsl(80 18% 22% / 0.92) 0%, hsl(80 18% 24% / 0.75) 32%, hsl(80 18% 24% / 0.15) 60%, transparent 78%)",
          }}
        />
        <div className="absolute inset-0 flex items-center px-8 md:px-16">
          <div className="max-w-xl">
            <div className="mb-4 h-1 w-16 rounded-full bg-[hsl(103,66%,80%)]" />
            <h1 className="text-left font-bold leading-[1.05] tracking-tight text-white text-3xl md:text-5xl lg:text-6xl">
              {PHRASE}
            </h1>
          </div>
        </div>
      </Variant>

      {/* ─────────────────────────────── OPÇÃO 4 ─────────────────────────────── */}
      <Variant
        num={4}
        title="Foto clara + placa glass"
        desc="Foto quase intacta e mais viva; a frase ganha uma placa de vidro fosco. Leve, premium, nada escuro."
      >
        <img
          src={heroImg}
          alt="Mateus Tafuri com alunos no dojo"
          className="absolute inset-0 h-full w-full object-cover object-[center_25%] brightness-[1.05] saturate-[1.1]"
        />
        {/* very soft green vignette only */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(120% 90% at 50% 60%, transparent 45%, hsl(80 20% 18% / 0.35) 100%)",
          }}
        />
        <div className="absolute inset-0 flex items-end justify-center pb-16 px-6">
          <div className="rounded-2xl border border-white/25 bg-white/10 px-8 py-6 backdrop-blur-md shadow-[0_8px_40px_rgba(0,0,0,0.25)]">
            <h1 className="max-w-3xl text-center font-bold leading-[1.05] tracking-tight text-white text-3xl md:text-5xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
              {PHRASE}
            </h1>
          </div>
        </div>
      </Variant>

      {/* ─────────────────────────────── OPÇÃO 5 ─────────────────────────────── */}
      <Variant
        num={5}
        title="Gradiente lima vibrante"
        desc="Base em degradê verde-lima energético + frase branca com brilho. A mais chamativa e otimista."
      >
        <img
          src={heroImg}
          alt="Mateus Tafuri com alunos no dojo"
          className="absolute inset-0 h-full w-full object-cover object-[center_25%]"
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to top, hsl(88 55% 32% / 0.92) 0%, hsl(95 50% 40% / 0.5) 38%, transparent 72%)",
          }}
        />
        <div
          className="absolute inset-0 mix-blend-soft-light"
          style={{
            backgroundImage:
              "linear-gradient(to top, hsl(80 70% 55% / 0.8) 0%, transparent 55%)",
          }}
        />
        <div className="absolute inset-0 flex items-end justify-center pb-16 px-6">
          <h1 className="max-w-4xl text-center font-bold leading-[1.05] tracking-tight text-white text-3xl md:text-5xl lg:text-6xl drop-shadow-[0_2px_16px_hsl(88_60%_25%_/_0.9)]">
            {PHRASE}
          </h1>
        </div>
      </Variant>

      <div className="py-12 text-center text-sm text-white/50">
        Fim das opções, me diga qual número você prefere (ou combine ideias).
      </div>
    </main>
  );
};

export default Testes;
