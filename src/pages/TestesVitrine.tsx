import type { CSSProperties } from "react";
import { ArrowUpRight, Megaphone, Ticket, Users } from "lucide-react";
import { Link } from "react-router-dom";

import caseBonete from "@/assets/case-bonete-v3.webp";
import caseCaraiva from "@/assets/case-caraiva-v2.webp";
import caseCorumbau from "@/assets/case-corumbau.webp";
import logoBonete from "@/assets/logo-bonete.webp";
import logoCaraiva from "@/assets/logo-caraiva.webp";
import logoCorumbau from "@/assets/logo-corumbau.webp";

/* Cinco desenhos para a vitrine "As rifas que originaram o método".
   Página de teste: nada aqui está em uso na home ainda. */

const RIFAS = [
  {
    nome: "Dojo Bonete",
    local: "Ilhabela · SP",
    valor: "R$ 155,7 mil",
    apoiadores: "2.077",
    dado2: "1,2 mi de alcance",
    dado3: "R$ 41 mil em mídia",
    linhas: ["2.077 apoiadores", "1,2 mi de alcance", "R$ 41 mil em mídia"],
    frase: "Um dojo erguido do outro lado do mar",
    img: caseBonete,
    logo: logoBonete,
    pos: "center 58%",
    path: "/dojo-bonete",
  },
  {
    nome: "Dojo Caraíva",
    local: "Caraíva · BA",
    valor: "R$ 100 mil",
    apoiadores: "3.183",
    dado2: "Bilhete de R$ 20",
    dado3: "R$ 21,5 mil em mídia",
    linhas: ["3.183 apoiadores", "Bilhete de R$ 20", "R$ 21,5 mil em mídia"],
    frase: "Um ano inteiro de projeto garantido",
    img: caseCaraiva,
    logo: logoCaraiva,
    pos: "center 65%",
    path: "/dojo-caraiva",
  },
  {
    nome: "Corumbau BJJ",
    local: "Corumbau · BA",
    valor: "R$ 159,5 mil",
    apoiadores: "4.377",
    dado2: "101 dias de campanha",
    dado3: "R$ 56 mil em mídia",
    linhas: ["4.377 apoiadores", "101 dias de campanha", "R$ 56 mil em mídia"],
    frase: "A primeira sede cultural da vila",
    img: caseCorumbau,
    logo: logoCorumbau,
    pos: "center 65%",
    path: "/corumbau-bjj",
  },
];

const CORAL = "hsl(15 65% 56%)";
const PETROLEO = "hsl(178 36% 22%)";

const Bloco = ({
  n,
  titulo,
  nota,
  children,
}: {
  n: number;
  titulo: string;
  nota: string;
  children: React.ReactNode;
}) => (
  <section className="border-t border-black/10 py-14">
    <div className="mx-auto mb-8 max-w-5xl px-5 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: CORAL }}>
        Versão {n}
      </p>
      <h2 className="mt-1 text-xl font-bold">{titulo}</h2>
      <p className="mt-1 text-sm text-black/50">{nota}</p>
    </div>
    {children}
  </section>
);

/* ── 1. foto com o valor por cima ── */
const V1 = () => (
  <div className="mx-auto max-w-5xl px-5 sm:px-6">
    <div className="grid gap-4 md:grid-cols-3">
      {RIFAS.map((r) => (
        <Link
          key={r.path}
          to={r.path}
          className="group relative block overflow-hidden rounded-3xl no-underline shadow-sm transition-shadow hover:shadow-xl"
        >
          <div className="relative h-[300px]">
            <img
              src={r.img}
              alt={r.nome}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              style={{ objectPosition: r.pos }}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
          </div>

          <div className="absolute inset-x-0 bottom-0 p-5 text-white">
            <img src={r.logo} alt="" className="mb-3 h-8 w-8 rounded-full object-cover" />
            <p className="font-display text-3xl font-extrabold leading-none">{r.valor}</p>
            <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-white/60">
              arrecadados
            </p>
            <p className="mt-3 text-sm font-semibold">{r.nome}</p>
            <p className="text-xs text-white/70">{r.local}</p>
          </div>

          <span className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-colors group-hover:bg-white group-hover:text-black">
            <ArrowUpRight size={17} />
          </span>
        </Link>
      ))}
    </div>
  </div>
);

/* ── 2. lista tipográfica, sem card ── */
const V2 = () => (
  <div className="mx-auto max-w-5xl px-5 sm:px-6">
    <ul className="border-t border-black/12">
      {RIFAS.map((r) => (
        <li key={r.path} className="border-b border-black/12">
          <Link
            to={r.path}
            className="group grid items-center gap-x-6 gap-y-2 py-6 text-inherit no-underline md:grid-cols-[1.1fr_auto_1fr]"
          >
            <div>
              <p
                className="font-display text-2xl font-bold transition-colors md:text-[28px]"
                style={{ color: PETROLEO }}
              >
                {r.nome}
              </p>
              <p className="mt-0.5 text-sm text-black/45">{r.local}</p>
            </div>

            <p
              className="font-display text-3xl font-extrabold tabular-nums md:text-4xl"
              style={{ color: CORAL }}
            >
              {r.valor}
            </p>

            <div className="flex items-center justify-between gap-4">
              <ul className="flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-black/55">
                {r.linhas.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
              <ArrowUpRight
                size={18}
                className="hidden shrink-0 text-black/30 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 md:block"
                style={{ color: CORAL }}
              />
            </div>
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

/* ── 3. o bilhete de rifa ── */
const V3 = () => (
  <div className="mx-auto max-w-5xl px-5 sm:px-6">
    <div className="grid gap-5 md:grid-cols-3">
      {RIFAS.map((r) => (
        <Link
          key={r.path}
          to={r.path}
          className="group relative block rounded-2xl border-2 border-dashed bg-white p-5 pt-6 text-inherit no-underline transition-colors"
          style={{ borderColor: "rgba(0,0,0,0.15)" }}
        >
          {/* picote nas laterais */}
          <span className="absolute -left-[9px] top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-[#F4F0E6]" />
          <span className="absolute -right-[9px] top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-[#F4F0E6]" />

          <div className="flex items-center gap-2">
            <Ticket size={15} style={{ color: CORAL }} />
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/40">
              Rifa Solidária
            </p>
          </div>

          <p className="mt-3 font-display text-xl font-bold" style={{ color: PETROLEO }}>
            {r.nome}
          </p>
          <p className="text-xs text-black/45">{r.local}</p>

          <div className="my-4 border-t border-dashed border-black/15" />

          <p className="font-display text-[34px] font-extrabold leading-none" style={{ color: CORAL }}>
            {r.valor}
          </p>
          <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-black/40">
            arrecadados
          </p>

          <ul className="mt-4 space-y-1.5 text-[13px] text-black/55">
            {r.linhas.map((l) => (
              <li key={l} className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full" style={{ background: CORAL }} />
                {l}
              </li>
            ))}
          </ul>

          <span className="mt-5 flex items-center gap-1.5 text-sm font-semibold" style={{ color: CORAL }}>
            Ver o case
            <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </span>
        </Link>
      ))}
    </div>
  </div>
);

/* ── 4. faixa escura, números com ícone ── */
const V4 = () => (
  <div style={{ background: PETROLEO }} className="py-12">
    <div className="mx-auto max-w-5xl px-5 sm:px-6">
      <div className="grid gap-4 md:grid-cols-3">
        {RIFAS.map((r) => (
          <Link
            key={r.path}
            to={r.path}
            className="group rounded-2xl border border-white/12 bg-white/[0.05] p-5 text-white no-underline transition-colors hover:border-white/30 hover:bg-white/[0.09]"
          >
            <div className="flex items-center gap-3">
              <img src={r.logo} alt="" className="h-9 w-9 rounded-full object-cover" />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{r.nome}</p>
                <p className="text-xs text-white/50">{r.local}</p>
              </div>
              <ArrowUpRight
                size={16}
                className="ml-auto text-white/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </div>

            <p
              className="mt-5 font-display text-[38px] font-extrabold leading-none"
              style={{ color: CORAL }}
            >
              {r.valor}
            </p>
            <p className="mt-1 text-xs text-white/45">{r.frase}</p>

            <dl className="mt-5 grid grid-cols-3 gap-2 border-t border-white/10 pt-4 text-center">
              {[
                { i: Users, v: r.apoiadores, l: "apoiadores" },
                { i: Ticket, v: r.dado2.split(" ")[0], l: r.dado2.split(" ").slice(1).join(" ") },
                { i: Megaphone, v: r.dado3.split(" ")[1], l: "mil em mídia" },
              ].map((k) => (
                <div key={k.l}>
                  <k.i size={13} className="mx-auto text-white/35" />
                  <dd className="mt-1 font-display text-base font-bold">{k.v}</dd>
                  <dt className="text-[10px] leading-tight text-white/40">{k.l}</dt>
                </div>
              ))}
            </dl>
          </Link>
        ))}
      </div>
    </div>
  </div>
);

/* ── 5. um destaque grande e dois ao lado ── */
const V5 = () => {
  const [principal, ...resto] = RIFAS;
  return (
    <div className="mx-auto max-w-5xl px-5 sm:px-6">
      <div className="grid gap-4 md:grid-cols-[1.4fr_1fr]">
        <Link
          to={principal.path}
          className="group relative overflow-hidden rounded-3xl no-underline"
        >
          <img
            src={principal.img}
            alt={principal.nome}
            className="h-[380px] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] md:h-full"
            style={{ objectPosition: principal.pos }}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 text-white">
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/60">
              {principal.local}
            </p>
            <p className="mt-1 font-display text-2xl font-bold">{principal.nome}</p>
            <p
              className="mt-3 font-display text-5xl font-extrabold leading-none"
              style={{ color: CORAL }}
            >
              {principal.valor}
            </p>
            <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-white/70">
              {principal.linhas.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </div>
        </Link>

        <div className="grid gap-4">
          {resto.map((r) => (
            <Link
              key={r.path}
              to={r.path}
              className="group flex items-center gap-4 rounded-3xl border border-black/10 bg-white p-5 text-inherit no-underline transition-colors hover:border-black/25"
            >
              <img
                src={r.img}
                alt=""
                className="h-20 w-20 shrink-0 rounded-2xl object-cover"
                style={{ objectPosition: r.pos }}
                loading="lazy"
              />
              <div className="min-w-0 flex-1">
                <p className="font-display text-lg font-bold" style={{ color: PETROLEO }}>
                  {r.nome}
                </p>
                <p className="text-xs text-black/45">{r.local}</p>
                <p
                  className="mt-2 font-display text-2xl font-extrabold leading-none"
                  style={{ color: CORAL }}
                >
                  {r.valor}
                </p>
                <p className="mt-1 text-xs text-black/50">{r.apoiadores} apoiadores</p>
              </div>
              <ArrowUpRight
                size={18}
                className="shrink-0 text-black/25 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

const TestesVitrine = () => (
  <div className="min-h-screen bg-[#F4F0E6] text-[#16281f]" style={{ "--x": 0 } as CSSProperties}>
    <header className="mx-auto max-w-5xl px-5 py-14 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: CORAL }}>
        Página de testes
      </p>
      <h1 className="mt-2 font-display text-3xl font-bold md:text-4xl">
        Cinco vitrines para as rifas
      </h1>
      <p className="mt-3 max-w-2xl text-black/55">
        Mesmos dados, cinco desenhos. Escolhe um e eu aplico na home e na página da
        Rifa Solidária de uma vez.
      </p>
    </header>

    <Bloco n={1} titulo="Foto com o valor por cima" nota="A cena da comunidade primeiro; o número aparece sobre ela.">
      <V1 />
    </Bloco>
    <Bloco n={2} titulo="Lista tipográfica" nota="Sem card e sem foto. O nome e o valor carregam sozinhos.">
      <V2 />
    </Bloco>
    <Bloco n={3} titulo="Bilhete de rifa" nota="O formato do produto: picote, linha pontilhada e o valor no lugar do prêmio.">
      <V3 />
    </Bloco>
    <Bloco n={4} titulo="Faixa escura com painel de números" nota="Corta a página em dois e transforma os dados em painel.">
      <V4 />
    </Bloco>
    <Bloco n={5} titulo="Um destaque e dois ao lado" nota="Hierarquia: a maior campanha ocupa o dobro do espaço.">
      <V5 />
    </Bloco>
  </div>
);

export default TestesVitrine;
