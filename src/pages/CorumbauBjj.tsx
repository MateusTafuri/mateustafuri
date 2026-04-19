import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import logo from "@/assets/logo-corumbau.webp";
import logoTafuri from "@/assets/logo-tafuri.webp";
import heroImg from "@/assets/case-corumbau-real.webp";
import teamImg1 from "@/assets/corumbau-team-1.jpg";
import teamImg2 from "@/assets/corumbau-team-2.jpg";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  { label: "Novos Apoiadores", value: "—" },
  { label: "Faturamento Bruto", value: "R$ 159.493,60" },
  { label: "Investimento em Tráfego", value: "—" },
];

const CorumbauBjj = () => (
  <div className="min-h-screen bg-background text-foreground">
    <Navbar />

    {/* Hero */}
    <header className="relative w-full h-[55vh] md:h-[60vh] overflow-hidden">
      <img
        src={heroImg}
        alt="Corumbau BJJ Team - projeto social de jiu-jitsu em Corumbau, Bahia"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      <div className="absolute bottom-6 left-0 right-0 max-w-4xl mx-auto px-6">
        <Link
          to="/#cases"
          className="inline-flex items-center gap-2 text-sm text-primary mb-3 hover:underline"
        >
          <ArrowLeft size={16} /> Voltar para cases
        </Link>
        <div className="flex items-center gap-4">
          <img
            src={logo}
            alt="Logo Corumbau BJJ"
            className="w-14 h-14 rounded-full object-cover border-2 border-primary"
          />
          <div>
            <span className="text-xs bg-primary/20 text-primary px-3 py-1 rounded-full">
              Rifa Solidária
            </span>
            <h1 className="md:text-4xl font-bold mt-1 leading-tight text-2xl">
              101 Dias de Fé: O Jiu-Jitsu que Transforma Corumbau
            </h1>
          </div>
        </div>
      </div>
    </header>

    <main className="max-w-4xl mx-auto px-6 pt-6 pb-12 space-y-10">
      {/* Subtítulo */}
      <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
        Uma jornada de persistência e propósito, onde uma comunidade isolada provou que o esporte transforma vidas — mesmo longe de tudo.
      </p>

      {/* Seção 1 – O Cenário */}
      <section>
        <h2 className="text-2xl font-bold mb-4">
          🌊 Corumbau, Onde o Mundo Parece Parar
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4 text-justify">
          Corumbau é um vilarejo de pescadores no extremo sul da Bahia, cercado por praias intocadas e uma comunidade que vive em ritmo próprio. Longe dos grandes centros, o acesso a oportunidades esportivas e educacionais é um desafio diário para crianças e adolescentes da região.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-6 text-justify">
          Foi nesse cenário que o Corumbau BJJ Team, liderado pelo professor Diego Oliveira, se ergueu como um farol. Mais do que um projeto de jiu-jitsu, é uma estrutura de disciplina, respeito e cidadania que acolhe dezenas de jovens locais.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <img
            src={teamImg1}
            alt="Atletas do Corumbau BJJ Team com medalhas após campeonato"
            className="w-full h-auto rounded-2xl object-cover border border-border"
            loading="lazy"
          />
          <img
            src={teamImg2}
            alt="Equipe do Corumbau BJJ posando com o professor Diego Oliveira"
            className="w-full h-auto rounded-2xl object-cover border border-border"
            loading="lazy"
          />
        </div>
      </section>

      {/* Seção 2 – O Desafio Narrativo */}
      <section>
        <h2 className="text-2xl font-bold mb-4">
          🥋 O Desafio: Captar Recursos a 101 Dias do Sonho
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4 text-justify">
          O projeto vivia da boa vontade da comunidade e de doações pontuais. Para garantir continuidade, materiais e a participação dos atletas em campeonatos, era preciso algo maior: uma campanha estruturada, com narrativa forte e execução profissional.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-6 text-justify">
          A rifa solidária nasceu como resposta a esse desafio. Foram 101 dias de campanha, persistência e fé — uma maratona de comunicação, mobilização e gestão para transformar cada bilhete em impacto real.
        </p>
      </section>

      {/* Seção 3 – Estratégia Digital */}
      <section>
        <h2 className="text-2xl font-bold mb-4">
          📊 A Estratégia Digital e o Resultado Financeiro
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4 text-justify">
          A campanha combinou narrativa autêntica com execução técnica de marketing digital. Cada peça de conteúdo foi pensada para conectar o apoiador com a realidade do projeto e mostrar o impacto direto de cada contribuição.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-6 text-justify">
          O resultado prova que, mesmo a partir de uma comunidade isolada, é possível construir uma campanha de alcance nacional quando estratégia, propósito e gestão caminham juntos.
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
            Total arrecadado para o projeto
          </p>
          <p className="text-5xl md:text-6xl font-bold text-primary">
            R$ 159.493,60
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-3">
            Prestação de Contas
          </h3>
          <p className="text-muted-foreground leading-relaxed text-justify">
            Cada centavo arrecadado foi documentado e direcionado para sustentar as atividades do Corumbau BJJ Team. Transparência e responsabilidade foram pilares dessa campanha do início ao fim.
          </p>
        </div>
      </section>

      {/* Seção 4 – Impacto Real */}
      <section>
        <h2 className="text-2xl font-bold mb-4">
          🏅 O Impacto Real: Sonhos que se Tornaram Realidade
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-6 text-justify">
          Os recursos arrecadados se traduziram em ação imediata na vida dos atletas do projeto:
        </p>
        <ul className="space-y-3 mb-6">
          {[
            {
              icon: "🥋",
              title: "Sustentação do Projeto",
              text: "Garantia de continuidade das atividades do Corumbau BJJ Team por um período expressivo.",
            },
            {
              icon: "🛡️",
              title: "Equipamento e Estrutura",
              text: "Aquisição de novos kimonos, materiais de treino e melhorias na estrutura do espaço.",
            },
            {
              icon: "✨",
              title: "Formação Cidadã",
              text: "Reforço do papel do jiu-jitsu como ferramenta de transformação social e desenvolvimento pessoal.",
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
      </section>

      {/* Seção 5 – Conclusão */}
      <section>
        <h2 className="text-2xl font-bold mb-4">
          🚀 Conclusão e Oportunidade
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4 text-justify">
          A Rifa Solidária do Corumbau BJJ não foi apenas uma campanha de arrecadação; foi a prova de que persistência, fé e estratégia constroem resultados extraordinários — mesmo nos lugares mais distantes.
        </p>
        <p className="text-muted-foreground leading-relaxed text-justify">
          Este é apenas o começo. O tatame está pronto para receber novos alunos, e nossos atletas estão prontos para novos desafios no mundo todo.
        </p>
      </section>
    </main>

    {/* CTA */}
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
          Se o Corumbau BJJ te inspirou, imagine o que podemos construir pelo seu projeto. Vamos transformar sua história em uma campanha que mobiliza, emociona e arrecada.
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

export default CorumbauBjj;
