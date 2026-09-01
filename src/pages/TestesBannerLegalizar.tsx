import { ArrowRight, BadgeCheck, FileCheck2, ScrollText, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

/* Cinco desenhos para o banner do guia "Como legalizar a rifa", que entra
   logo abaixo de "As rifas que originaram o método".
   Página de teste: nada aqui está em uso na home ainda. */

const PETROLEO = "hsl(178 36% 22%)";
const CORAL = "hsl(15 65% 56%)";
const DESTINO = "/como-legalizar-a-rifa";

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

/* ── 1. faixa clara, promessa à esquerda e botão à direita ── */
const V1 = () => (
  <section className="bg-secondary py-12">
    <div className="mx-auto flex max-w-5xl flex-col gap-6 px-5 sm:px-6 md:flex-row md:items-center md:justify-between">
      <div className="max-w-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
          Guia gratuito
        </p>
        <h2 className="mt-2 font-display text-2xl font-bold leading-tight text-green-dark md:text-3xl">
          No Brasil, rifa é proibida. A da sua organização não precisa ser.
        </h2>
        <p className="mt-3 leading-relaxed text-secondary-foreground/75">
          O caminho inteiro do sorteio filantrópico, do CNPJ à prestação de contas, em sete
          etapas conferidas nas normas oficiais.
        </p>
      </div>
      <Link
        to={DESTINO}
        className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground no-underline transition-opacity hover:opacity-90 md:self-auto"
      >
        Ler o guia <ArrowRight size={16} />
      </Link>
    </div>
  </section>
);

/* ── 2. continuação da faixa escura, com moldura de certificado ── */
const V2 = () => (
  <section className="py-12" style={{ background: PETROLEO }}>
    <div className="mx-auto max-w-5xl px-5 sm:px-6">
      <div className="rounded-3xl border-2 border-dashed border-white/25 p-8 text-center md:p-12">
        <BadgeCheck size={30} className="mx-auto text-white/50" />
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.25em] text-white/45">
          Guia gratuito
        </p>
        <h2 className="mx-auto mt-3 max-w-2xl font-display text-2xl font-bold leading-tight text-white md:text-3xl">
          Como legalizar a sua rifa solidária
        </h2>
        <p className="mx-auto mt-3 max-w-xl leading-relaxed text-white/60">
          Sete etapas, do CNPJ à prestação de contas.
        </p>
        <Link
          to={DESTINO}
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-green-dark no-underline transition-opacity hover:opacity-90"
        >
          Ler o guia <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  </section>
);

/* ── 3. cartão de documento oficial sobre fundo claro ── */
const V3 = () => (
  <section className="bg-muted py-12">
    <div className="mx-auto max-w-3xl px-5 sm:px-6">
      <article className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <div
          className="flex items-center gap-3 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white"
          style={{ background: PETROLEO }}
        >
          <ScrollText size={15} />
          Sorteio filantrópico · Ministério da Fazenda
        </div>
        <div className="p-6 md:p-8">
          <h2 className="font-display text-2xl font-bold leading-tight md:text-3xl">
            Como legalizar a rifa da sua organização
          </h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Um guia prático com o que o órgão federal exige: quem pode pedir, o prêmio doado,
            os prazos, as taxas e a prestação de contas.
          </p>
          <ul className="mt-5 space-y-2">
            {[
              "Protocolo entre 40 e 120 dias antes do sorteio",
              "Taxa federal a partir de R$ 34, conforme o prêmio",
              "Nenhuma divulgação antes do certificado sair",
            ].map((t) => (
              <li key={t} className="flex gap-2.5 text-sm text-muted-foreground">
                <FileCheck2 size={16} className="mt-0.5 shrink-0 text-primary" />
                {t}
              </li>
            ))}
          </ul>
          <Link
            to={DESTINO}
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground no-underline transition-opacity hover:opacity-90"
          >
            Abrir o guia completo <ArrowRight size={16} />
          </Link>
        </div>
      </article>
    </div>
  </section>
);

/* ── 4. pergunta e resposta em duas metades ── */
const V4 = () => (
  <section className="mx-auto max-w-5xl px-5 py-12 sm:px-6">
    <div className="grid overflow-hidden rounded-3xl md:grid-cols-2">
      <div className="p-8 md:p-10" style={{ background: PETROLEO }}>
        <ShieldCheck size={28} className="text-white/50" />
        <h2 className="mt-5 font-display text-2xl font-bold leading-tight text-white md:text-3xl">
          A rifa da sua organização é legal?
        </h2>
        <p className="mt-3 leading-relaxed text-white/60">
          Não existe “rifa pequena que pode”. Existe rifa autorizada e rifa ilegal, e quem
          responde é a diretoria.
        </p>
      </div>
      <div className="bg-secondary p-8 md:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
          Pode ser
        </p>
        <p className="mt-3 leading-relaxed text-secondary-foreground/80">
          O sorteio filantrópico é a exceção prevista em lei. Escrevi o caminho inteiro, das
          treze finalidades do estatuto até a prestação de contas.
        </p>
        <Link
          to={DESTINO}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground no-underline transition-opacity hover:opacity-90"
        >
          Ver as sete etapas <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  </section>
);

/* ── 5. faixa clara com as etapas numeradas em pílulas ── */
const V5 = () => (
  <section className="bg-green-light py-12">
    <div className="mx-auto max-w-5xl px-5 sm:px-6">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            Antes de vender o primeiro bilhete
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold leading-tight text-green-dark md:text-3xl">
            Sete etapas separam a sua rifa de uma autorização federal
          </h2>
        </div>
        <Link
          to={DESTINO}
          className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-green-dark px-6 py-3.5 text-sm font-semibold text-white no-underline transition-opacity hover:opacity-90"
        >
          Ler o guia gratuito <ArrowRight size={16} />
        </Link>
      </div>

      <ol className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {[
          "Enquadre a organização",
          "Consiga o prêmio doado",
          "Escreva o regulamento",
          "Pague a taxa federal",
          "Peça a autorização",
          "Espere o certificado",
          "Sorteie e preste contas",
        ].map((t, i) => (
          <li
            key={t}
            className="flex items-center gap-2.5 rounded-full bg-white/70 px-4 py-2.5 text-sm text-green-dark"
          >
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-green-dark font-display text-[11px] font-bold text-white">
              {i + 1}
            </span>
            {t}
          </li>
        ))}
      </ol>
    </div>
  </section>
);

const TestesBannerLegalizar = () => (
  <div className="min-h-screen bg-background pb-20">
    <header className="mx-auto max-w-5xl px-5 pb-4 pt-16 sm:px-6">
      <h1 className="font-display text-3xl font-bold">Banner do guia de legalização</h1>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Cinco desenhos para a faixa que entra abaixo de “As rifas que originaram o método”.
        Todos apontam para <code>/como-legalizar-a-rifa</code>.
      </p>
    </header>

    <Bloco n={1} titulo="Faixa clara com botão ao lado" nota="A mais simples: promessa à esquerda, ação à direita. Corta o escuro da seção de cima.">
      <V1 />
    </Bloco>
    <Bloco n={2} titulo="Certificado na mesma faixa escura" nota="Em uso na página da Rifa Solidária. Continua a cor da vitrine, moldura de documento.">
      <V2 />
    </Bloco>
    <Bloco n={3} titulo="Cartão de documento oficial" nota="Parece o papel do órgão: cabeçalho, três exigências e o botão.">
      <V3 />
    </Bloco>
    <Bloco n={4} titulo="Pergunta de um lado, resposta do outro" nota="Escuro pergunta, claro responde. O contraste faz o convite.">
      <V4 />
    </Bloco>
    <Bloco n={5} titulo="Faixa verde com as sete etapas" nota="Mostra o conteúdo do guia inteiro em pílulas numeradas.">
      <V5 />
    </Bloco>
  </div>
);

export default TestesBannerLegalizar;
