import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import logo from "@/assets/logo-bonete.webp";
import logoTafuri from "@/assets/logo-tafuri.webp";
import droneImg from "@/assets/bonete-drone.webp";
// ... keep existing code
import kidJump from "@/assets/bonete-kid-jump.webp";

import turma from "@/assets/bonete-turma.webp";
import construcao1 from "@/assets/bonete-construcao-1.webp";
import rifaGrupo from "@/assets/bonete-rifa-grupo.webp";
import mateus from "@/assets/bonete-mateus.webp";
import criancaPraia from "@/assets/bonete-crianca-praia-hq.webp";
import construcao2 from "@/assets/bonete-construcao-2.webp";
import tijolosPraia from "@/assets/bonete-tijolos-praia.webp";
import barco from "@/assets/bonete-barco.webp";
import quadriciclo from "@/assets/bonete-quadriciclo.webp";
// ... keep existing code
import exteriorDojo from "@/assets/bonete-exterior-dojo.webp";

import tatamePraia from "@/assets/bonete-tatame-praia.webp";
import graduacaoPraia from "@/assets/bonete-graduacao-praia.webp";
import rodaPraia from "@/assets/bonete-roda-praia.webp";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  { label: "Alcance no Instagram", value: "1,2M+" },
  { label: "Impressões", value: "2,3M+" },
  { label: "Novos Apoiadores", value: "2.161" },
  { label: "Faturamento Bruto", value: "R$ 134.044,00" },
  { label: "Doações Diretas", value: "R$ 21.716,00" },
  { label: "Total Arrecadado", value: "R$ 152.678,93" },
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
            <h1 className="md:text-4xl font-bold mt-1 leading-tight text-2xl">
              A Força de um Sonho: A Construção Coletiva do Novo Dojo Bonete
            </h1>
          </div>
        </div>
      </div>
    </header>

    <main className="max-w-4xl mx-auto px-6 py-12 space-y-10">
      {/* Subtítulo */}
      <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
        Como a união de uma comunidade caiçara e o poder da comunicação
        estratégica transformaram o propósito de um professor em uma realidade que
        muda destinos.
      </p>

      {/* Seção 1 – O Cenário */}
      <section>
        <h2 className="text-2xl font-bold mb-4">
          📍 Praia do Bonete: Um paraíso isoaldo
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4 text-justify">
          Ilhabela guarda um dos seus maiores tesouros na Praia do Bonete. Uma
          comunidade caiçara com cerca de 350 moradores, onde o tempo é ditado
          pela maré e o acesso é limitado: ou se enfrenta 12 km de trilha densa,
          ou o balanço do mar em pequenas embarcações.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-6 text-justify">
          Nesse isolamento, as oportunidades para os jovens são raras. Mas foi
          aqui que o mestre André Queiroz, faixa preta de jiu-jitsu, decidiu
          plantar uma semente. Por anos, a "arte suave" foi ensinada nos
          alicerces de sua própria casa — um espaço improvisado, mas que
          transbordava significado e disciplina.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <figure>
            <img
              src="/lovable-uploads/1887d23b-30c3-4e32-91fa-0c97b1d08af4.jpg"
              alt="Crianças do Dojo Bonete no antigo espaço improvisado embaixo da casa"
              className="w-full rounded-2xl object-cover h-72 my-0 py-0 px-0 border-0"
              loading="lazy"
            />
            <figcaption className="text-xs text-muted-foreground/60 mt-2 text-center">
              {"\n"}
            </figcaption>
          </figure>
          <figure>
            <img
              src="/lovable-uploads/9063a5ea-4953-43d0-b435-befb7092e4be.png"
              alt="Mestre André Queiroz com as crianças do Dojo Bonete no espaço original"
              className="w-full rounded-2xl object-cover h-72 my-0 py-0 px-0 border-0"
              style={{ objectPosition: "center 70%" }}
              loading="lazy"
            />
            <figcaption className="text-xs text-muted-foreground/60 mt-2 text-center">
              {"\n"}
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Seção 2 – O Desafio */}
      <section>
        <h2 className="text-2xl font-bold mb-4">
          🥋 O Desafio: Quando o Sonho Fica Maior que o Teto
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4 text-justify">
          O projeto cresceu. As crianças ocuparam o tatame, e logo ficou claro
          que o Bonete precisava de um espaço dedicado. Foi nesse momento que a
          minha história se cruzou com a deles. Cheguei em maio de 2024 como
          voluntário e vivi quatro meses imerso na cultura local.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-6 text-justify">
          Percebi que o desafio não era apenas financeiro, mas logístico e
          narrativo. Como construir um centro esportivo de alto nível em um
          lugar onde cada grama de cimento precisa vir pelo mar?
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <img
            src={kidJump}
            alt="Criança saltando durante treino de jiu-jitsu no Dojo Bonete"
            className="w-full rounded-2xl object-cover h-72 my-0 py-0 px-0 border-0"
            loading="lazy"
          />
          <img
            src={turma}
            alt="Roda de conversa entre mestres e alunos no tatame do Dojo Bonete"
            className="w-full rounded-2xl object-cover h-72 my-0 py-0 px-0 border-0"
            loading="lazy"
          />
        </div>
      </section>

      {/* Seção 3 – A Estratégia */}
      <section>
        <h2 className="text-2xl font-bold mb-4">
          🎟️ A Estratégia: Transformando Solidariedade em Experiência
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4 text-justify">
          Para viabilizar o novo Dojo, não pedimos apenas doações. Criamos uma{" "}
          <strong className="text-foreground">Rifa Solidária</strong> com uma
          narrativa estratégica. O prêmio? Uma imersão no paraíso: 3 diárias na
          Pousada Canto Bravo, unindo o apoio ao projeto ao fortalecimento do
          turismo local.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-6 text-justify">
          Através de um trabalho de copywriting e storytelling, levamos a rotina
          do Bonete para as telas de todo o Brasil. Mostramos que cada bilhete
          comprado era um tijolo colocado no novo dojo.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <img
            src={rifaGrupo}
            alt="Equipe do Dojo Bonete reunida com o cartaz da Rifa Solidária"
            className="w-full rounded-2xl object-cover h-72 my-0 py-0 px-0 border-0"
            loading="lazy"
          />
          <img
            src={mateus}
            alt="Mateus Tafuri na frente do Dojo Bonete segurando o cartaz da rifa solidária"
            className="w-full rounded-2xl object-cover h-72 my-0 py-0 px-0 border-0"
            loading="lazy"
          />
        </div>
      </section>

      {/* Seção 4 – A Logística */}
      <section>
        <h2 className="text-2xl font-bold mb-4">
          ⚓ A Logística do Impossível: 9 Toneladas de Suor
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4 text-justify">
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
        <p className="text-muted-foreground leading-relaxed mb-6 text-justify">
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
            className="w-full rounded-2xl object-cover h-64 my-0 py-0 px-0 border-0"
            loading="lazy"
          />
          <img
            src={construcao1}
            alt="Estrutura de madeira do novo Dojo Bonete sendo erguida"
            className="w-full rounded-2xl object-cover h-64 my-0 py-0 px-0 border-0"
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
        <p className="text-muted-foreground leading-relaxed mb-4 text-justify">
          O dia da entrega foi a materialização de um esforço coletivo que
          envolveu mais de 2.500 pessoas através da rifa. Ver o novo tatame
          esticado, o cheiro de madeira nova e o brilho no olhar de cada aluno
          foi a confirmação de que a comunicação, quando serve a um propósito
          real, é imbatível.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-6 text-justify">
          O Dojo Bonete hoje não é apenas um centro de treinamento. É um monumento à
          persistência caiçara e à prova de que nenhuma comunidade é isolada
          demais quando o Brasil inteiro decide abraçar a causa.
        </p>
        <div className="mb-6">
          <img
            src="/lovable-uploads/8a538a52-84aa-41ef-a182-94ef47370d2a.jpg"
            alt="Alunos e comunidade reunidos no tatame do novo Dojo Bonete no dia da inauguração"
            className="w-full rounded-2xl max-h-[420px] mx-0 px-0 object-cover"
            loading="lazy"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <img
            src={exteriorDojo}
            alt="Mateus com as crianças na frente do novo Dojo Bonete"
            className="w-full rounded-2xl object-cover h-72"
            style={{ objectPosition: "center 60%" }}
            loading="lazy"
          />
          <img
            src={rodaPraia}
            alt="Roda de treino no novo Dojo Bonete durante a inauguração"
            className="w-full rounded-2xl object-cover h-72"
            loading="lazy"
          />
          <img
            src="/lovable-uploads/da40d39d-5119-447b-aa60-90f8448e4c3c.jpg"
            alt="Foto oficial de toda a comunidade reunida no novo Dojo Bonete na inauguração"
            className="w-full rounded-2xl object-cover h-72"
            loading="lazy"
          />
        </div>
        <div className="mt-4">
          <img
            src="/lovable-uploads/0a4b82d0-b22d-47c0-9da1-91b980f5fd59.jpg"
            alt="Cerimônia dentro do novo Dojo Bonete no dia da inauguração"
            className="w-full rounded-2xl max-h-[420px] mx-0 px-0 object-cover"
            loading="lazy"
          />
        </div>
      </section>

      {/* Seção 6 – Impacto em Números */}
      <section>
        <h2 className="text-2xl font-bold mb-6">
          📊 O Impacto em Números: A Força da Campanha
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-8 text-justify">
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

        <div className="text-center py-6 mb-8 border border-border rounded-2xl bg-card">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
            Lucro real para o projeto
          </p>
          <p className="text-5xl md:text-6xl font-bold text-primary">
            R$ 102.574,00
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-3">
            Performance de Marketing
          </h3>
          <p className="text-muted-foreground leading-relaxed text-justify mb-4">
            Para escalar essa campanha, investimos{" "}
            <strong className="text-foreground">R$ 41.000</strong> em tráfego
            pago, com estratégias de alcance, criativos e narrativa que levaram
            a história do Dojo Bonete para milhões de pessoas.
          </p>
          <p className="text-muted-foreground leading-relaxed text-justify">
            Não foi só impulsionamento — foi construção de mensagem, testes de
            criativos e distribuição inteligente para transformar atenção em
            conexão real.
          </p>
        </div>
      </section>
    </main>

    {/* CTA Vamos captar juntos */}
    <section className="bg-secondary py-16 px-6 text-center mt-8">
      <div className="max-w-2xl mx-auto">
        <img
          src={logoTafuri}
          alt="Mateus Tafuri"
          className="w-28 h-28 md:w-32 md:h-32 mx-auto -mb-2 [filter:brightness(0)_saturate(100%)_invert(18%)_sepia(58%)_saturate(1654%)_hue-rotate(78deg)_brightness(96%)_contrast(95%)]"
        />
        <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
          Sua causa é a próxima
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-green-dark mb-4">
          Vamos captar juntos?
        </h2>
        <p className="text-secondary-foreground/80 mb-8 text-base leading-relaxed">
          Se o Dojo Bonete te inspirou, imagine o que podemos construir pelo seu
          projeto. Vamos transformar sua história em uma campanha que mobiliza,
          emociona e arrecada.
        </p>
        <a
          href="https://wa.me/5567998860067"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-primary text-primary-foreground px-8 py-4 rounded-full text-base font-semibold hover:opacity-90 transition-opacity"
        >
          Falar com Mateus no WhatsApp
        </a>
      </div>
    </section>

    <Footer />
  </div>
);

export default DojoBonete;
