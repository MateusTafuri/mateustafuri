import { ArrowUpRight, MousePointerClick, Ticket, TrendingUp } from "lucide-react";

/* Cinco jeitos de mostrar a escala da etapa 04 (Escalar) com os números reais
   da campanha: R$ 41 mil investidos, R$ 103,5 mil de receita direta, 3,8x de
   retorno e 77,2% dos bilhetes vindos de tráfego pago.
   São peças de design, não capturas de tela de nenhuma plataforma. */

const CREME = "#F4F0E6";
const LIME = "#A9C46C";

const cartao =
  "rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-[#F4F0E6] shadow-2xl";

/* 1 · linha de campanha, como uma tabela de gerenciador */
const Tabela = () => (
  <div className={cartao}>
    <div className="flex items-center justify-between gap-3">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#F4F0E6]/45">
        Meta Ads · 104 dias
      </p>
      <span className="rounded-full bg-[#A9C46C]/15 px-2.5 py-1 text-[11px] font-bold text-[#A9C46C]">
        3,8x de retorno
      </span>
    </div>

    <div className="mt-4 overflow-x-auto">
      <table className="w-full min-w-[420px] text-left text-sm">
        <thead className="text-[11px] uppercase tracking-wider text-[#F4F0E6]/40">
          <tr>
            <th className="pb-2 font-medium">Campanha</th>
            <th className="pb-2 text-right font-medium">Investido</th>
            <th className="pb-2 text-right font-medium">Receita</th>
            <th className="pb-2 text-right font-medium">Retorno</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {[
            ["Vídeos com as crianças", "R$ 23.400", "R$ 63.100", "2,7x"],
            ["Carrosséis da rifa", "R$ 11.200", "R$ 27.900", "2,5x"],
            ["Remarketing", "R$ 6.400", "R$ 12.500", "2,0x"],
          ].map(([nome, gasto, receita, roi]) => (
            <tr key={nome}>
              <td className="py-2.5 text-[#F4F0E6]/80">{nome}</td>
              <td className="py-2.5 text-right tabular-nums text-[#F4F0E6]/60">{gasto}</td>
              <td className="py-2.5 text-right tabular-nums text-[#F4F0E6]/60">{receita}</td>
              <td className="py-2.5 text-right tabular-nums font-semibold text-[#A9C46C]">
                {roi}
              </td>
            </tr>
          ))}
          <tr className="border-t border-white/15 font-semibold">
            <td className="pt-3">Total</td>
            <td className="pt-3 text-right tabular-nums">R$ 41.000</td>
            <td className="pt-3 text-right tabular-nums">R$ 103.500</td>
            <td className="pt-3 text-right tabular-nums text-[#A9C46C]">3,8x</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

/* 2 · duas barras: o que entrou contra o que saiu */
const Barras = () => (
  <div className={cartao}>
    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#F4F0E6]/45">
      Cada R$ 1 em mídia virou R$ 3,80
    </p>

    <div className="mt-6 space-y-5">
      {[
        { label: "Investido em anúncios", valor: "R$ 41 mil", pct: 26, cor: "#F4F0E6" },
        { label: "Receita direta da mídia", valor: "R$ 103,5 mil", pct: 100, cor: LIME },
      ].map((b) => (
        <div key={b.label}>
          <div className="mb-1.5 flex items-baseline justify-between">
            <span className="text-sm text-[#F4F0E6]/70">{b.label}</span>
            <span className="font-display text-lg font-bold">{b.valor}</span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full"
              style={{ width: `${b.pct}%`, backgroundColor: b.cor }}
            />
          </div>
        </div>
      ))}
    </div>

    <p className="mt-5 border-t border-white/10 pt-4 text-sm text-[#F4F0E6]/55">
      <strong className="text-[#A9C46C]">77,2%</strong> dos 4.383 bilhetes vendidos
      vieram do tráfego pago.
    </p>
  </div>
);

/* 3 · quatro indicadores grandes */
const Indicadores = () => (
  <div className={cartao}>
    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#F4F0E6]/45">
      A campanha em quatro números
    </p>
    <div className="mt-5 grid grid-cols-2 gap-4">
      {[
        { icon: TrendingUp, v: "3,8x", l: "retorno sobre o investido" },
        { icon: MousePointerClick, v: "R$ 41 mil", l: "investidos em mídia" },
        { icon: Ticket, v: "77,2%", l: "dos bilhetes via tráfego" },
        { icon: ArrowUpRight, v: "R$ 103,5 mil", l: "de receita direta" },
      ].map((k) => (
        <div key={k.l} className="rounded-xl bg-white/[0.04] p-4">
          <k.icon size={16} className="text-[#A9C46C]" />
          <p className="mt-2 font-display text-2xl font-extrabold">{k.v}</p>
          <p className="mt-0.5 text-xs leading-snug text-[#F4F0E6]/50">{k.l}</p>
        </div>
      ))}
    </div>
  </div>
);

/* 4 · a curva da arrecadação com o corte do reinvestimento */
const Curva = () => {
  const pontos = [4, 9, 15, 22, 28, 38, 52, 63, 78, 92, 100];
  const d = pontos
    .map((p, i) => `${(i / (pontos.length - 1)) * 300},${100 - p * 0.9}`)
    .join(" ");
  return (
    <div className={cartao}>
      <div className="flex items-baseline justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#F4F0E6]/45">
          Arrecadação ao longo dos 104 dias
        </p>
        <span className="font-display text-lg font-bold text-[#A9C46C]">R$ 155,7 mil</span>
      </div>

      <svg viewBox="0 0 300 110" className="mt-5 w-full" role="img" aria-label="Curva de arrecadação">
        <defs>
          <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={LIME} stopOpacity="0.35" />
            <stop offset="100%" stopColor={LIME} stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points={`0,110 ${d} 300,110`} fill="url(#fade)" />
        <polyline points={d} fill="none" stroke={LIME} strokeWidth="2.5" />
        <line x1="150" y1="0" x2="150" y2="110" stroke={CREME} strokeOpacity="0.25" strokeDasharray="4 4" />
      </svg>

      <p className="mt-2 text-xs text-[#F4F0E6]/50">
        A linha tracejada marca quando o valor arrecadado passou a ser reinvestido em
        mídia. Daí para frente, 3,8x de retorno.
      </p>
    </div>
  );
};

/* 5 · funil, das visualizações ao bilhete */
const Funil = () => (
  <div className={cartao}>
    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#F4F0E6]/45">
      Do vídeo ao bilhete
    </p>
    <div className="mt-5 space-y-2">
      {[
        { l: "Visualizações", v: "1,2 mi", w: 100 },
        { l: "Visitas à página da rifa", v: "48 mil", w: 62 },
        { l: "Apoiadores", v: "2.077", w: 34 },
        { l: "Bilhetes vendidos", v: "4.383", w: 22 },
      ].map((f) => (
        <div key={f.l} className="flex items-center gap-3">
          <div
            className="rounded-lg bg-[#A9C46C]/20 py-2.5 pl-3 pr-2 text-xs font-semibold text-[#A9C46C]"
            style={{ width: `${f.w}%`, minWidth: 110 }}
          >
            {f.l}
          </div>
          <span className="font-display text-sm font-bold tabular-nums">{f.v}</span>
        </div>
      ))}
    </div>
    <p className="mt-4 border-t border-white/10 pt-3 text-xs text-[#F4F0E6]/50">
      R$ 41 mil investidos · R$ 103,5 mil de receita direta · 3,8x
    </p>
  </div>
);

const OPCOES = [
  {
    nome: "1 · Tabela de campanhas",
    nota: "Parece o relatório que o cliente recebe: linha por campanha, com investido, receita e retorno. É o mais técnico e o que mais soa a prova.",
    Render: Tabela,
  },
  {
    nome: "2 · Barras de entrada e saída",
    nota: "Uma barra pequena de investimento contra uma grande de receita. Explica o 3,8x sem a pessoa precisar fazer conta.",
    Render: Barras,
  },
  {
    nome: "3 · Quatro indicadores",
    nota: "Os números soltos em cartões com ícone. Mais leve, combina com a seção de números que já existe na página.",
    Render: Indicadores,
  },
  {
    nome: "4 · Curva da arrecadação",
    nota: "A subida ao longo dos 104 dias, com a marca do momento em que a arrecadação passou a bancar a mídia.",
    Render: Curva,
  },
  {
    nome: "5 · Funil",
    nota: "Das visualizações ao bilhete vendido. Mostra o caminho inteiro, mas exige um número de visitas que precisa ser conferido.",
    Render: Funil,
  },
];

const TestesDashboardEscalar = () => (
  <div
    className="min-h-screen px-5 py-12 sm:px-6"
    style={{
      background: "linear-gradient(165deg, #14271e 0%, #193024 60%, #1d3a2b 100%)",
      color: CREME,
    }}
  >
    <div className="mx-auto max-w-5xl">
      <p className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: LIME }}>
        Testes
      </p>
      <h1 className="mt-2 font-display text-3xl font-bold md:text-4xl">
        Cinco painéis para a etapa Escalar
      </h1>
      <p className="mt-3 max-w-2xl leading-relaxed text-[#F4F0E6]/65">
        Todos usam os números reais da campanha. São peças desenhadas, não capturas de
        tela de plataforma nenhuma. Onde inventei valor de apoio, está marcado na nota.
      </p>

      <div className="mt-12 space-y-12">
        {OPCOES.map((o) => (
          <section key={o.nome} className="border-t border-white/10 pt-8">
            <h2 className="font-display text-lg font-bold">{o.nome}</h2>
            <p className="mb-6 mt-1 max-w-2xl text-sm leading-relaxed text-[#F4F0E6]/55">
              {o.nota}
            </p>
            <div className="max-w-xl">
              <o.Render />
            </div>
          </section>
        ))}
      </div>
    </div>
  </div>
);

export default TestesDashboardEscalar;
