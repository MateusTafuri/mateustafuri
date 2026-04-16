import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import logo from "@/assets/logo-bonete.png";
import droneImg from "@/assets/bonete-drone.jpg";
import dojoKids from "@/assets/bonete-dojo-kids.jpg";
import kidJump from "@/assets/bonete-kid-jump.jpg";
import roda from "@/assets/bonete-roda.jpg";
import turma from "@/assets/bonete-turma.jpg";
import construcao1 from "@/assets/bonete-construcao-1.jpg";
import rifaGrupo from "@/assets/bonete-rifa-grupo.jpg";
import mateus from "@/assets/bonete-mateus.jpg";
import criancaPraia from "@/assets/bonete-crianca-praia-hq.jpg";
import construcao2 from "@/assets/bonete-construcao-2.jpg";
import tijolosPraia from "@/assets/bonete-tijolos-praia.jpg";
import barco from "@/assets/bonete-barco.jpg";
import quadriciclo from "@/assets/bonete-quadriciclo.jpg";
import inauguracao from "@/assets/bonete-inauguracao.jpg";
import exteriorDojo from "@/assets/bonete-exterior-dojo.jpg";

import tatamePraia from "@/assets/bonete-tatame-praia.jpg";
import graduacaoPraia from "@/assets/bonete-graduacao-praia.jpg";
import rodaPraia from "@/assets/bonete-roda-praia.jpg";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  { label: "Alcance no Instagram", value: "1,2M+" },
  { label: "Impressões", value: "2,3M" },
  { label: "Faturamento Bruto", value: "R$ 134.044" },
  { label: "Doações Diretas", value: "R$ 21.716" },
  { label: "Lucro para o Projeto", value: "R$ 102.574" },
  { label: "Cliques na Campanha", value: "32 mil+" },
];

const DojoBonete = () => (
  <div className="min-h-screen bg-background text-foreground">
    <Navbar />

    {/* Hero */}
    <header className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden">
      <img
        src={droneImg}
        alt="Vista aérea da Praia do Bonete, Ilhabela — tatame azul na areia onde acontecem os treinos de jiu-jitsu"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      <div className="absolute bottom-8 left-0 right-0 max-w-4xl mx-auto px-6">
        <Link
          to="/#cases"
          className="inline-flex items-center gap-2 text-sm text-primary mb-4 hover:underline"
        >
          <ArrowLeft size={16} /> Voltar para cases
        </Link>
        <div className="flex items-center gap-4">
          <img
            src={logo}
            alt="Logo Dojô Bonete"
            className="w-14 h-14 rounded-full object-cover border-2 border-primary"
          />
          <div>
            <span className="text-xs bg-primary/20 text-primary px-3 py-1 rounded-full">
              Rifa Solidária
            </span>
            <h1 className="text-3xl md:text-4xl font-bold mt-1 leading-tight">
              A Força de um Sonho: A Construção Coletiva do Novo Dojo Bonete
            </h1>
          </div>
        </div>
      </div>
    </header>

    <main className="max-w-4xl mx-auto px-6 py-12 space-y-16">
      {/* Subtítulo */}
      <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
        Como a união de uma comunidade caiçara e o poder da comunicação
        estratégica transformaram o propósito de um mestre em uma realidade que
        muda destinos.
      </p>

      {/* Seção 1 – O Cenário */}
      <section>
        <h2 className="text-2xl font-bold mb-4">
          📍 O Cenário: Onde o Asfalto Não Chega
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Ilhabela guarda um dos seus maiores tesouros na Praia do Bonete. Uma
          comunidade caiçara com cerca de 350 moradores, onde o tempo é ditado
          pela maré e o acesso é limitado: ou se enfrenta 12 km de trilha densa,
          ou o balanço do mar em pequenas embarcações.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Nesse isolamento, as oportunidades para os jovens são raras. Mas foi
          aqui que o mestre André Queiroz, faixa preta de jiu-jitsu, decidiu
          plantar uma semente. Por anos, a "arte suave" foi ensinada nos
          alicerces de sua própria casa — um espaço improvisado, mas que
          transbordava significado e disciplina.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <figure>
            <img
              src={turma}
              alt="Crianças do Dojo Bonete no antigo espaço improvisado embaixo da casa"
              className="w-full rounded-2xl object-cover h-72"
              loading="lazy"
            />
            <figcaption className="text-xs text-muted-foreground/60 mt-2 text-center">
              O antigo dojo: embaixo da casa do mestre André.
            </figcaption>
          </figure>
          <figure>
            <img
              src={dojoKids}
              alt="Mestre André Queiroz com as crianças do Dojo Bonete no espaço original"
              className="w-full rounded-2xl object-cover h-72"
              loading="lazy"
            />
            <figcaption className="text-xs text-muted-foreground/60 mt-2 text-center">
              O espaço era pequeno, mas o propósito já era gigante.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Seção 2 – O Desafio */}
      <section>
        <h2 className="text-2xl font-bold mb-4">
          🥋 O Desafio: Quando o Sonho Fica Maior que o Teto
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          O projeto cresceu. As crianças ocuparam o tatame, e logo ficou claro
          que o Bonete precisava de um espaço dedicado. Foi nesse momento que a
          minha história se cruzou com a deles. Cheguei em maio de 2024 como
          voluntário e vivi quatro meses imerso na cultura local.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Percebi que o desafio não era apenas financeiro, mas logístico e
          narrativo. Como construir um centro esportivo de alto nível em um
          lugar onde cada grama de cimento precisa vir pelo mar?
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <img
            src={kidJump}
            alt="Criança saltando durante treino de jiu-jitsu no Dojo Bonete"
            className="w-full rounded-2xl object-cover h-72"
            loading="lazy"
          />
          <img
            src={roda}
            alt="Roda de conversa entre mestres e alunos no tatame do Dojo Bonete"
            className="w-full rounded-2xl object-cover h-72"
            loading="lazy"
          />
        </div>
      </section>

      {/* Seção 3 – A Estratégia */}
      <section>
        <h2 className="text-2xl font-bold mb-4">
          🎟️ A Estratégia: Transformando Solidariedade em Experiência
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Para viabilizar o novo Dojo, não pedimos apenas doações. Criamos uma{" "}
          <strong className="text-foreground">Rifa Solidária</strong> com uma
          narrativa estratégica. O prêmio? Uma imersão no paraíso: 3 diárias na
          Pousada Canto Bravo, unindo o apoio ao projeto ao fortalecimento do
          turismo local.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Através de um trabalho de copywriting e storytelling, levamos a rotina
          do Bonete para as telas de todo o Brasil. Mostramos que cada bilhete
          comprado era um tijolo colocado no morro.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <img
            src={rifaGrupo}
            alt="Equipe do Dojo Bonete reunida com o cartaz da Rifa Solidária"
            className="w-full rounded-2xl object-cover h-72"
            loading="lazy"
          />
          <img
            src={mateus}
            alt="Mateus Tafuri na frente do Dojo Bonete segurando o cartaz da rifa solidária"
            className="w-full rounded-2xl object-cover h-72"
            loading="lazy"
          />
        </div>
      </section>

      {/* Seção 4 – A Logística */}
      <section>
        <h2 className="text-2xl font-bold mb-4">
          ⚓ A Logística do Impossível: 9 Toneladas de Suor
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          A construção foi uma prova de resistência. Imagine o cenário:
        </p>
        <ul className="space-y-3 mb-6">
          {[
            {
              icon: "🚢",
              title: "O Mar",
              text: "Barcos carregados de pedra e areia enfrentando o Canal de São Sebastião.",
            },
            {
              icon: "🏖️",
              title: "A Praia",
              text: "Desembarque manual de mais de 9 toneladas de material de construção.",
            },
            {
              icon: "⛰️",
              title: "O Morro",
              text: "Transporte incansável com quadriciclos e, principalmente, no braço.",
            },
          ].map((item) => (
            <li
              key={item.title}
              className="flex items-start gap-3 bg-card border border-border rounded-xl p-4"
            >
              <span className="text-2xl shrink-0">{item.icon}</span>
              <div>
                <strong className="text-foreground">{item.title}:</strong>{" "}
                <span className="text-muted-foreground">{item.text}</span>
              </div>
            </li>
          ))}
        </ul>
        <p className="text-muted-foreground leading-relaxed mb-6">
          As crianças do projeto não foram apenas espectadoras. Elas ajudaram a
          carregar as toras de madeira e os tijolos, entendendo, desde cedo, que
          aquele teto seria delas — porque elas ajudaram a levantá-lo.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <img
            src={barco}
            alt="Comunidade do Bonete empurrando barco com materiais de construção na praia"
            className="w-full rounded-2xl object-cover h-64"
            loading="lazy"
          />
          <img
            src={tijolosPraia}
            alt="Moradores carregando tijolos na Praia do Bonete para a construção do dojo"
            className="w-full rounded-2xl object-cover h-64"
            loading="lazy"
          />
          <img
            src={quadriciclo}
            alt="Quadriciclo transportando blocos de cimento na praia do Bonete com ajuda da comunidade"
            className="w-full rounded-2xl object-cover h-64 col-span-2 md:col-span-1"
            loading="lazy"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <img
            src={criancaPraia}
            alt="Criança carregando tijolos na praia do Bonete durante a construção do dojo"
            className="w-full rounded-2xl object-cover h-64"
            loading="lazy"
          />
          <img
            src={construcao1}
            alt="Estrutura de madeira do novo Dojo Bonete sendo erguida"
            className="w-full rounded-2xl object-cover h-64"
            loading="lazy"
          />
          <img
            src={construcao2}
            alt="Vista geral da obra do Dojo Bonete com tijolos e estrutura"
            className="w-full rounded-2xl object-cover h-64"
            loading="lazy"
          />
        </div>
      </section>

      {/* Seção 5 – Inauguração */}
      <section>
        <h2 className="text-2xl font-bold mb-4">
          🎉 O Dia da Inauguração: O Nascimento do Dojo Bonete
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          O dia da entrega foi a materialização de um esforço coletivo que
          envolveu mais de 2.500 pessoas através da rifa. Ver o novo tatame
          esticado, o cheiro de madeira nova e o brilho no olhar de cada aluno
          foi a confirmação de que a comunicação, quando serve a um propósito
          real, é imbatível.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-6">
          O Dojo Bonete hoje não é apenas um prédio. É um monumento à
          persistência caiçara e à prova de que nenhuma comunidade é isolada
          demais quando o Brasil inteiro decide abraçar a causa.
        </p>
        <div className="mb-6">
          <img
            src={inauguracao}
            alt="Alunos e comunidade reunidos no tatame do novo Dojo Bonete no dia da inauguração"
            className="w-full rounded-2xl object-cover max-h-[420px]"
            loading="lazy"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <img
            src={tatamePraia}
            alt="Crianças e professores de kimono reunidos no novo Dojo Bonete no dia da inauguração"
            className="w-full rounded-2xl object-cover h-72"
            loading="lazy"
          />
          <img
            src={rodaPraia}
            alt="Roda de treino no novo Dojo Bonete durante a inauguração"
            className="w-full rounded-2xl object-cover h-72"
            loading="lazy"
          />
          <img
            src={graduacaoPraia}
            alt="Foto oficial de toda a comunidade reunida no novo Dojo Bonete na inauguração"
            className="w-full rounded-2xl object-cover h-72"
            loading="lazy"
          />
        </div>
      </section>

      {/* Seção 6 – Impacto em Números */}
      <section>
        <h2 className="text-2xl font-bold mb-6">
          📊 O Impacto em Números: A Força da Campanha
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-8">
          A construção do Dojo Bonete foi viabilizada por uma campanha digital
          que rompeu as fronteiras da Ilha. A estratégia de comunicação não
          apenas contou uma história — gerou um engajamento real que se traduziu
          em recursos diretos para a obra.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-card border border-border rounded-2xl p-5 text-center"
            >
              <p className="text-2xl md:text-3xl font-bold text-primary">
                {s.value}
              </p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="bg-card border border-border rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-3">
            Performance de Marketing
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Para alcançar esses resultados em uma comunidade isolada, o
            investimento em tráfego pago foi preciso. Foram investidos{" "}
            <strong className="text-foreground">R$ 41.000,00</strong> em
            anúncios, com um CPM de{" "}
            <strong className="text-foreground">R$ 16,57</strong> e mais de{" "}
            <strong className="text-foreground">32 mil cliques</strong> no link
            da campanha.
          </p>
        </div>
      </section>

      {/* Valor total */}
      <section className="text-center py-8">
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
          Total arrecadado para o projeto
        </p>
        <p className="text-5xl md:text-6xl font-bold text-primary">
          R$ 152.678,93
        </p>
      </section>
    </main>

    <Footer />
  </div>
);

export default DojoBonete;
