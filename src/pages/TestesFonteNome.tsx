import foto from "@/assets/story-18.webp";

/* Cinco caligrafias para o nome no topo do /sobre, cada uma no contexto real.
   Página de teste: nada em uso ainda. */

const CORAL = "hsl(15 65% 56%)";

const FONTES = [
  {
    n: 1,
    nome: "Dancing Script",
    familia: "'Dancing Script', cursive",
    peso: 700,
    escala: "text-6xl md:text-8xl",
    nota: "Cursiva casual e cheia. A mais legível das caligrafias, boa para nome grande.",
  },
  {
    n: 2,
    nome: "Great Vibes",
    familia: "'Great Vibes', cursive",
    peso: 400,
    escala: "text-6xl md:text-8xl",
    nota: "Caligrafia formal, de convite de casamento. Elegante, com traço fino.",
  },
  {
    n: 3,
    nome: "Caveat",
    familia: "'Caveat', cursive",
    peso: 700,
    escala: "text-6xl md:text-8xl",
    nota: "Letra de mão, de caderno. Informal e próxima, combina com o tom do site.",
  },
  {
    n: 4,
    nome: "Kaushan Script",
    familia: "'Kaushan Script', cursive",
    peso: 400,
    escala: "text-5xl md:text-7xl",
    nota: "Pincel inclinado, com energia. Tem cara de assinatura de marca.",
  },
  {
    n: 5,
    nome: "Parisienne",
    familia: "'Parisienne', cursive",
    peso: 400,
    escala: "text-6xl md:text-8xl",
    nota: "Delicada e fina. A mais leve de todas, quase um traço a lápis.",
  },
];

const Topo = ({ familia, peso, escala }: { familia: string; peso: number; escala: string }) => (
  <header className="bg-secondary">
    <div className="mx-auto grid max-w-5xl items-center gap-10 px-6 py-12 md:grid-cols-[1fr_260px]">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">Sobre mim</p>
        <h1
          className={`mt-3 leading-[1.05] text-[#0f2320] ${escala}`}
          style={{ fontFamily: familia, fontWeight: peso }}
        >
          Mateus Tafuri
        </h1>
        <ul className="mt-5 flex flex-wrap gap-2">
          {["Estratégia", "Mobilização", "Captação de recursos"].map((t) => (
            <li
              key={t}
              className="rounded-full bg-white/60 px-3.5 py-1.5 text-xs font-semibold text-[#0f2320]/75 ring-1 ring-[#0f2320]/10"
            >
              {t}
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-md text-lg leading-relaxed text-[#0f2320]/75">
          Estruturo campanhas de captação de recursos com marketing digital.
        </p>
      </div>
      <img
        src={foto}
        alt=""
        className="aspect-[4/5] w-full rounded-3xl object-cover object-[40%_35%] shadow-xl"
      />
    </div>
  </header>
);

const TestesFonteNome = () => (
  <div className="min-h-screen bg-background pb-20">
    <header className="mx-auto max-w-5xl px-5 pb-4 pt-16 sm:px-6">
      <h1 className="font-display text-3xl font-bold">Caligrafia do nome</h1>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Cinco fontes manuscritas para “Mateus Tafuri”, no topo verde que já está no ar.
      </p>
    </header>

    {FONTES.map((f) => (
      <section key={f.n} className="border-t border-black/10 py-10">
        <div className="mx-auto mb-6 max-w-5xl px-5 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: CORAL }}>
            Versão {f.n}
          </p>
          <h2 className="mt-1 text-xl font-bold">{f.nome}</h2>
          <p className="mt-1 text-sm text-black/50">{f.nota}</p>
        </div>
        <Topo familia={f.familia} peso={f.peso} escala={f.escala} />
      </section>
    ))}
  </div>
);

export default TestesFonteNome;
