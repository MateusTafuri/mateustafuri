import { useEffect } from "react";
import { ArrowRight, BadgeCheck, Check, ExternalLink, X } from "lucide-react";
import { Voltar } from "@/components/Voltar";
import { Link } from "react-router-dom";
import { useSeo } from "@/lib/seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* Guia "Como legalizar a rifa", mesmo conteúdo do PDF distribuído para as
   organizações. Página só de leitura: tudo mora nas listas abaixo. */

const PETROLEO = "hsl(178 36% 22%)";

const FICHA = [
  { rotulo: "Quem autoriza", valor: "Ministério da Fazenda" },
  { rotulo: "Como se chama", valor: "Sorteio filantrópico" },
  { rotulo: "O caminho", valor: "Sete etapas" },
  { rotulo: "Conferido em", valor: "Agosto de 2026" },
];

const ETAPAS = [
  {
    titulo: "Confira se a organização se enquadra",
    resumo: "Veja se o estatuto e o CNPJ estão de acordo antes de qualquer outra coisa.",
    itens: [
      "Associação, fundação, organização religiosa ou cooperativa social, sem fins lucrativos.",
      "Estatuto com pelo menos uma das treze finalidades.",
      "Não precisa de título de utilidade pública. Isso acabou em 2020. É a mudança que abriu a rifa para a maior parte das organizações, e muito material antigo ainda diz o contrário.",
    ],
    fonte: "Lei 5.768/1971, art. 4º e § 1º-A · Portaria SECAP/ME 20.749/2020, arts. 1º e 2º",
  },
  {
    titulo: "Consiga o prêmio doado e registre em cartório",
    resumo: "A organização não pode comprar o que vai rifar.",
    itens: [
      "Alguém de fora doa o bem, seja pessoa, loja ou empresa, e essa doação vira um termo registrado no Cartório de Títulos e Documentos.",
      "O prêmio precisa estar pronto e com documentação em ordem já na data do pedido.",
      "Pode rifar mercadoria, imóvel residencial urbano, viagem, bolsa, ingresso, passagem. Não pode rifar remédio, arma, explosivo, fogos, cigarro nem bebida forte.",
    ],
    fonte: "Portaria 20.749/2020, arts. 5º III, 11 V e VI, 15 e 17",
  },
  {
    titulo: "Escreva o plano e o regulamento",
    resumo: "É o documento que explica como a rifa funciona, e ele tem itens obrigatórios.",
    itens: [
      "No máximo 100 mil números por série, e o resultado tem que sair da extração da Loteria Federal. Aplicativo, roleta em live ou site de sorteio não valem.",
      "O regulamento traz catorze informações: quantos bilhetes, preço, valor dos prêmios, data e local da apuração, prazo de 180 dias para reclamar, entre outras.",
      "Pode contratar quem administra ou divulga, mas o gasto total com terceiros não passa de 44% do arrecadado.",
    ],
    fonte: "Portaria 20.749/2020, arts. 3º II, 7º, 9º e 11 IX",
  },
  {
    titulo: "Pague a taxa",
    resumo: "Há uma taxa federal, ela varia com o valor do prêmio, e o comprovante entra no pedido.",
    itens: [
      "Paga-se por GRU antes de protocolar, na UG 170592, Gestão 00001, código de recolhimento 10033-1.",
      "Não existe desconto para organização filantrópica. Coloque no orçamento desde o começo.",
      "O valor sai da faixa em que cai o total dos prêmios, não da arrecadação esperada.",
    ],
    tabela: {
      cabecalho: ["Valor total dos prêmios", "Taxa a pagar"],
      linhas: [
        ["Até R$ 1.000,00", "R$ 34,00"],
        ["De R$ 1.000,01 a R$ 5.000,00", "R$ 166,00"],
        ["De R$ 5.000,01 a R$ 10.000,00", "R$ 334,00"],
        ["De R$ 10.000,01 a R$ 50.000,00", "R$ 1.666,00"],
        ["De R$ 50.000,01 a R$ 100.000,00", "R$ 4.166,00"],
        ["De R$ 100.000,01 a R$ 500.000,00", "R$ 13.334,00"],
        ["De R$ 500.000,01 a R$ 1.667.000,00", "R$ 41.666,00"],
        ["Igual ou superior a R$ 1.667.000,01", "R$ 83.334,00"],
      ],
    },
    fonte:
      "MP 2.158-35/2001, art. 50 · Decreto 12.307/2024, Anexo, em vigor desde 1º/1/2025 · Portaria 20.749/2020, art. 11 VIII",
  },
  {
    titulo: "Peça a autorização",
    resumo: "O pedido é pela internet e tem uma janela de tempo rígida.",
    itens: [
      "Vai pelo sistema SCPC, com login gov.br, para a Secretaria de Prêmios e Apostas do Ministério da Fazenda.",
      "Protocolo entre 40 e 120 dias antes do sorteio. Menos que isso não entra; mais que isso também não.",
      "Resposta em até 20 dias. Se pedirem documento a mais, o prazo para de contar até você responder.",
      "Na tela de anexos, o sistema pede que você classifique cada arquivo por tipo.",
    ],
    anexos: [
      {
        categoria: "Atos constitutivos",
        docs: [
          "Estatuto social",
          "Consulta pública do CNPJ (Redesim)",
          "Demonstrativo de previsão de despesa, receita e aplicação dos recursos do sorteio",
          "Declaração de que não foi firmado convênio",
          "Certidão de débitos federais e dívida ativa da União",
        ],
      },
      { categoria: "Ata de Eleição de Diretoria", docs: ["Ata da eleição da diretoria em exercício"] },
      {
        categoria: "Declaração de destinação de recursos (Filantrópico)",
        docs: ["Declaração de que o dinheiro vai para a obra social, aplicado integralmente no país"],
      },
      { categoria: "Certidão Estadual", docs: ["Certidão negativa estadual"] },
      { categoria: "Certidão municipal mobiliária", docs: ["Certidão negativa municipal"] },
      { categoria: "Termo de doação de bem (Filantrópico)", docs: ["Termo de doação do prêmio", "Nota fiscal do bem doado"] },
    ],
    alerta:
      "Atenção às três certidões. A organização precisa estar quite nas três esferas: federal, estadual e municipal. É o item que mais atrasa pedido, porque cada certidão sai em um órgão diferente e tem validade própria.",
    fonte: "Portaria 20.749/2020, arts. 4º, 5º e 11 · categorias conforme a tela de anexos do SCPC",
  },
  {
    titulo: "Espere o certificado antes de divulgar",
    resumo: "Nenhum post, nenhum teaser, nenhuma venda antes de o certificado sair.",
    itens: [
      "Divulgar antes da autorização contamina a campanha inteira.",
      "A autorização vale por até doze meses, e você tem direito a uma única alteração do plano.",
    ],
    fonte: "Portaria 20.749/2020, arts. 20, 21 e 23",
  },
  {
    titulo: "Sorteie, entregue e preste contas",
    resumo: "A campanha só termina quando a prestação de contas é aceita.",
    itens: [
      "Entregue o prêmio em até 30 dias, sem custo nenhum para o ganhador.",
      "Recolha 20% de imposto de renda sobre o prêmio e repasse 2% do arrecadado a dois fundos federais.",
      "Preste contas no próprio SCPC, com recibos assinados, comprovantes de despesa e guias pagas. Prêmio não reclamado em 180 dias vai para o Tesouro.",
    ],
    fonte: "Portaria 20.749/2020, arts. 25, 26, 29 e 31 · Lei 8.981/1995, art. 63",
  },
];

const DESTINOS = [
  ["Taxa de autorização", "varia com o prêmio", "Antes de protocolar"],
  ["Imposto de renda sobre o prêmio", "20%", "Logo após o sorteio"],
  ["Fundo da Criança e do Adolescente", "1%", "Mês seguinte"],
  ["Fundo de Direitos Difusos", "1%", "Mês seguinte"],
  ["Quem administra e divulga", "até 44%", "Conforme contrato"],
  ["A sua causa", "o restante", "Aplicado no Brasil"],
];

const PROIBIDO = [
  ["Comprar o prêmio.", "Tem que ser doado, com termo em cartório."],
  ["Sortear dinheiro ou PIX.", "Nem prêmio em dinheiro, nem conversão do prêmio em dinheiro."],
  ["Divulgar antes do certificado.", "Nem post, nem lista de espera, nem venda antecipada."],
  ["Protocolar em cima da hora.", "Fora da janela de 40 a 120 dias, o pedido nem é analisado."],
  ["Fazer o sorteio por conta própria.", "O resultado vem da Loteria Federal."],
  ["Dar porcentagem do resultado a alguém.", "Terceiro é contratado e pago por serviço, não é sócio do resultado."],
  ["Usar a rifa em campanha eleitoral.", "Vedado sob qualquer forma."],
];

const ATALHOS = [
  {
    frase: "“Somos autorizados por uma loteria estadual”",
    texto:
      "Plataformas de rifa online costumam exibir licença de loteria de algum estado. A licença existe, mas é de loteria estadual, e a lei federal limita a venda a quem está fisicamente naquele estado ou mora nele. Além disso, rifa beneficente é outro regime: quem autoriza é o Ministério da Fazenda. Licença estadual não substitui esse certificado. Se der problema, quem responde é a sua organização e a diretoria. A plataforma some.",
  },
  {
    frase: "“Não é rifa, é doação com sorteio”",
    texto:
      "Trocar o nome não muda nada. Se a pessoa paga e o prêmio depende de sorte, a lei chama de loteria, seja “rifa”, “cota solidária”, “apoio premiado” ou “doação com sorteio”.",
  },
  {
    frase: "“Contrate nossa empresa que a gente legaliza”",
    texto:
      "Existe um mercado vendendo aparência de licença. A prova de que a rifa é legal é o número do certificado de autorização emitido pelo órgão federal, não um contrato com intermediária. Exija o número. Sem número, não há autorização.",
  },
];

const ADVOGADO = [
  "Para escrever ou revisar o estatuto, principalmente a cláusula de finalidades. É barato fazer certo e caro consertar depois.",
  "Se a organização já fez rifa sem autorização. Há caminhos de regularização, mas alguns só podem ser usados uma vez: não queime a chance agindo sozinho.",
  "Antes de assinar contrato com empresa que vá operar a campanha.",
  "Se usou imagem de crianças na divulgação sem autorização escrita dos responsáveis, ou se há dinheiro público envolvido.",
];

const FONTES = [
  {
    nome: "Lei nº 5.768/1971",
    desc: "a lei que rege o assunto",
    url: "https://www.planalto.gov.br/ccivil_03/leis/l5768.htm",
  },
  {
    nome: "Portaria SECAP/ME nº 20.749/2020",
    desc: "as regras práticas de prazos, documentos e prestação de contas",
    url: "https://www.in.gov.br/en/web/dou/-/portaria-n-20.749-de-17-de-setembro-de-2020-278467072",
  },
  {
    nome: "“As rifas são permitidas no Brasil?”",
    desc: "a resposta oficial do Ministério da Fazenda",
    url: "https://www.gov.br/fazenda/pt-br/composicao/orgaos/secretaria-de-premios-e-apostas/apostas-de-quota-fixa/tire-suas-duvidas/rifas/as-rifas-sao-permitidas-no",
  },
  {
    nome: "Carta de serviços do gov.br",
    desc: "o serviço oficial, passo a passo",
    url: "https://www.gov.br/pt-br/servicos/obter-autorizacao-para-atividades-de-distribuicao-gratuita-de-premios-a-titulo-de-propaganda-ou-de-captacao-de-poupanca-popular",
  },
];

const Bullet = ({ children }: { children: React.ReactNode }) => (
  <li className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground">
    <Check size={16} className="mt-0.5 shrink-0 text-primary" />
    <span>{children}</span>
  </li>
);

const RifaLegal = () => {
  useSeo({
    titulo: "Como legalizar a rifa da sua organização | Mateus Tafuri",
    descricao:
      "Sete etapas para regularizar a rifa de uma organização social no Brasil, do CNPJ à autorização e à prestação de contas, em linguagem direta.",
    path: "/como-legalizar-a-rifa",
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* cabeçalho com cara de documento: mesma cor do banner que traz pra cá */}
      <header className="relative overflow-hidden" style={{ background: PETROLEO }}>
        {/* carimbo desbotado atrás do título */}
        <BadgeCheck
          size={300}
          strokeWidth={0.6}
          aria-hidden
          className="pointer-events-none absolute -right-14 top-1/2 hidden -translate-y-1/2 text-white/[0.07] md:block"
        />

        <div className="relative mx-auto max-w-3xl px-6 pb-14 pt-28 md:pt-32">
          <Voltar
            fallback="/"
            className="inline-flex items-center gap-2 text-sm text-white/55 transition-colors hover:text-white"
          />

          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.25em] text-white/45">
            Guia prático para organizações sociais
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold leading-[1.1] text-white md:text-[3.25rem]">
            Como legalizar a rifa da sua organização
          </h1>
          <p className="mt-4 text-lg text-white/65">Do CNPJ à prestação de contas.</p>

          <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-5 border-t border-dashed border-white/20 pt-6">
            {FICHA.map((f) => (
              <div key={f.rotulo}>
                <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
                  {f.rotulo}
                </dt>
                <dd className="mt-1 text-sm font-semibold text-white">{f.valor}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-16">
        <section>
          <h2 className="font-display text-2xl font-bold md:text-3xl">
            Antes de vender o primeiro bilhete
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            No Brasil, rifa é proibida. Isso não é interpretação, é o que está escrito na
            página oficial do Ministério da Fazenda.
          </p>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Existe uma exceção, e ela tem nome: sorteio filantrópico. É a rifa feita por uma
            organização da sociedade civil, com autorização prévia do governo federal, para
            arrecadar recursos para a própria causa.
          </p>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            O procedimento é definido e público. O que costuma pegar as organizações de
            surpresa são o prazo e o custo: são meses até a autorização sair, e as taxas
            variam conforme o valor do prêmio. Vale ler este guia inteiro antes de começar.
          </p>

          <div className="mt-8 rounded-xl border border-primary/20 bg-secondary p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              Em resumo
            </p>
            <p className="mt-2 leading-relaxed text-secondary-foreground/80">
              Não existe “rifa pequena que pode”. Existe rifa autorizada e rifa ilegal, e o
              tamanho não muda nada. O Congresso chegou a aprovar uma isenção para campanhas
              de até R$ 10 mil por mês, e ela foi vetada.
            </p>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-2xl font-bold md:text-3xl">
            Etapa zero: a organização existe no papel?
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Quem pede autorização é a organização, não a pessoa. Ela precisa de CNPJ ativo e
            estatuto registrado em cartório. Campanha feita no CPF de alguém não tem como ser
            legalizada. Esse caminho não existe.
          </p>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            E o estatuto precisa dizer a coisa certa. A lei lista treze finalidades, e a sua
            organização precisa ter ao menos uma delas escrita nos objetivos sociais:
            assistência social, cultura, educação, saúde, segurança alimentar, meio ambiente,
            voluntariado, combate à pobreza, novos modelos socioprodutivos, promoção de
            direitos, cidadania e direitos humanos, atividades sociais de organizações
            religiosas e pesquisa.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-2xl font-bold md:text-3xl">O caminho, passo a passo</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            São sete etapas, e a ordem importa: pular ou inverter qualquer uma invalida a
            campanha inteira.
          </p>

          <ol className="mt-8 space-y-6">
            {ETAPAS.map((e, i) => (
              <li key={e.titulo} className="rounded-xl border border-border bg-card p-6">
                <div className="flex items-start gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary font-display text-sm font-bold text-primary-foreground">
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-lg font-bold leading-snug">{e.titulo}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-foreground/80">{e.resumo}</p>

                    <ul className="mt-4 space-y-2.5">
                      {e.itens.map((it) => (
                        <Bullet key={it}>{it}</Bullet>
                      ))}
                    </ul>

                    {e.tabela && (
                      <div className="mt-5 overflow-x-auto">
                        <table className="w-full min-w-[380px] text-sm">
                          <thead>
                            <tr className="border-b border-border">
                              {e.tabela.cabecalho.map((c, ci) => (
                                <th
                                  key={c}
                                  className={`pb-2 text-xs font-semibold uppercase tracking-wider text-primary ${
                                    ci ? "text-right" : "text-left"
                                  }`}
                                >
                                  {c}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {e.tabela.linhas.map(([faixa, taxa]) => (
                              <tr key={faixa} className="border-b border-border/60 last:border-0">
                                <td className="py-2 pr-4 text-muted-foreground">{faixa}</td>
                                <td className="py-2 text-right font-semibold tabular-nums">{taxa}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {e.anexos && (
                      <dl className="mt-5 space-y-3 rounded-lg bg-muted p-4">
                        {e.anexos.map((a) => (
                          <div key={a.categoria} className="sm:grid sm:grid-cols-[190px_1fr] sm:gap-4">
                            <dt className="text-sm font-semibold">{a.categoria}</dt>
                            <dd className="mt-1 space-y-1 sm:mt-0">
                              {a.docs.map((d) => (
                                <p key={d} className="text-sm leading-snug text-muted-foreground">
                                  {d}
                                </p>
                              ))}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    )}

                    {e.alerta && (
                      <p className="mt-4 border-l-2 border-primary pl-4 text-sm leading-relaxed text-foreground/80">
                        {e.alerta}
                      </p>
                    )}

                    <p className="mt-4 text-xs leading-relaxed text-muted-foreground/70">{e.fonte}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-2xl font-bold md:text-3xl">Para onde vai o dinheiro</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Monte o preço do bilhete a partir desta conta, não do palpite. Os percentuais
            incidem sobre tudo o que entrou, sem descontar nada antes.
          </p>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[480px] text-sm">
              <thead>
                <tr className="border-b border-border">
                  {["Destino", "Quanto", "Quando"].map((c) => (
                    <th
                      key={c}
                      className="pb-2 text-left text-xs font-semibold uppercase tracking-wider text-primary"
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {DESTINOS.map(([destino, quanto, quando]) => (
                  <tr key={destino} className="border-b border-border/60 last:border-0">
                    <td className="py-2.5 pr-4 font-medium">{destino}</td>
                    <td className="py-2.5 pr-4 text-muted-foreground">{quanto}</td>
                    <td className="py-2.5 text-muted-foreground">{quando}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-2xl font-bold md:text-3xl">
            O que não pode, de jeito nenhum
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {PROIBIDO.map(([titulo, texto]) => (
              <li key={titulo} className="flex gap-3 rounded-xl border border-border bg-card p-4">
                <X size={18} className="mt-0.5 shrink-0 text-destructive" />
                <p className="text-sm leading-relaxed text-muted-foreground">
                  <strong className="font-semibold text-foreground">{titulo}</strong> {texto}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-2xl font-bold md:text-3xl">Cuidado com os atalhos</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Sua organização vai ser procurada por gente oferecendo caminho mais rápido. Nenhum
            destes funciona.
          </p>

          <div className="mt-6 space-y-4">
            {ATALHOS.map((a) => (
              <div key={a.frase} className="rounded-xl border border-border bg-muted p-6">
                <p className="font-display text-base font-bold">{a.frase}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.texto}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-2xl font-bold md:text-3xl">Quando chamar um advogado</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Este guia mostra o caminho, mas não substitui análise do seu caso. Procure um
            advogado com experiência em terceiro setor:
          </p>
          <ul className="mt-5 space-y-2.5">
            {ADVOGADO.map((a) => (
              <Bullet key={a}>{a}</Bullet>
            ))}
          </ul>

          <div className="mt-8 rounded-xl border border-primary/20 bg-secondary p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              Consulta prévia
            </p>
            <p className="mt-2 leading-relaxed text-secondary-foreground/80">
              Antes de gastar com cartório e taxa, a organização pode protocolar uma consulta
              formal ao órgão federal perguntando se ela se enquadra. A resposta vem por
              escrito e vale como segurança.
            </p>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-2xl font-bold md:text-3xl">Onde conferir</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Tudo neste guia foi conferido nas normas oficiais.
          </p>
          <ul className="mt-5 space-y-3">
            {FONTES.map((f) => (
              <li key={f.url}>
                <a
                  href={f.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-start gap-2 text-sm leading-relaxed"
                >
                  <ExternalLink size={15} className="mt-1 shrink-0 text-primary" />
                  <span>
                    <strong className="font-semibold text-foreground underline-offset-4 group-hover:underline">
                      {f.nome}
                    </strong>
                    <span className="text-muted-foreground">: {f.desc}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16 rounded-xl border border-border bg-muted p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            Depois da autorização
          </p>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Legalizar é o começo. Como montar a meta, escolher o prêmio, contar a história e vender
            os bilhetes está no outro guia, com as cinco etapas destrinchadas.
          </p>
          <Link
            to="/como-estruturar-rifa-solidaria-digital"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary no-underline hover:underline"
          >
            Como estruturar a sua rifa solidária no digital <ArrowRight size={15} />
          </Link>
        </section>

        <section className="mt-16 rounded-2xl bg-green-dark p-8 text-center md:p-10">
          <h2 className="font-display text-2xl font-bold text-white md:text-3xl">
            Precisa de ajuda para percorrer esse caminho?
          </h2>
          <p className="mx-auto mt-3 max-w-xl leading-relaxed text-white/75">
            Se a sua organização quiser apoio para estruturar a campanha e o pedido de
            autorização, fale comigo.
          </p>
          <a
            href="https://wa.me/5567998860067"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block rounded-full bg-green-light px-6 py-3 text-sm font-semibold text-green-dark transition-opacity hover:opacity-90"
          >
            Falar com o Mateus · (67) 99886-0067
          </a>
        </section>

        <p className="mt-10 text-xs leading-relaxed text-muted-foreground/70">
          Material informativo. Não substitui orientação jurídica sobre o caso concreto: o
          formato da organização, a origem do prêmio e o desenho da campanha mudam o que o
          órgão vai exigir. Conteúdo conferido em agosto de 2026 nas fontes oficiais. As
          normas mudam com frequência, então confirme antes de protocolar. Distribuição livre
          para organizações da sociedade civil.
        </p>
      </main>

      <Footer />
    </div>
  );
};

export default RifaLegal;
