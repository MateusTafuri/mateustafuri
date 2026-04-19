import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import logo from "@/assets/logo-caraiva.webp";
import logoTafuri from "@/assets/logo-tafuri.webp";
import heroImg from "@/assets/caraiva-hero.jpg";
import socialImg from "@/assets/caraiva-social.jpg";
import kidsImg from "@/assets/caraiva-kids.jpg";
import bastidores1 from "@/assets/caraiva-bastidores-1.png";
import bastidores2 from "@/assets/caraiva-bastidores-2.jpg";
import bastidores2New from "@/assets/caraiva-bastidores-2-new.jpg";
import pousada1 from "@/assets/caraiva-pousada-1-new.jpg";
import pousada2 from "@/assets/caraiva-pousada-2.jpg";
import pousada3 from "@/assets/caraiva-pousada-3-new.jpg";
import pousada4 from "@/assets/caraiva-pousada-4-new.jpg";
import sorteio1 from "@/assets/caraiva-sorteio-1.jpg";
import sorteio2 from "@/assets/caraiva-sorteio-2.jpg";
import sorteio3 from "@/assets/caraiva-sorteio-3.jpg";
import sorteio4 from "@/assets/caraiva-sorteio-4.jpg";
import impacto1 from "@/assets/caraiva-impacto-1.jpg";
import impacto2 from "@/assets/caraiva-impacto-2.jpg";
import impacto3 from "@/assets/caraiva-impacto-3.jpg";
import impacto4 from "@/assets/caraiva-impacto-4.jpg";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  { label: "Novos Apoiadores", value: "3.183" },
  { label: "Faturamento Bruto", value: "R$ 100.000,00" },
  { label: "Investimento em Tráfego", value: "R$ 21.500,00" },
];

const DojoCaraiva = () => (
  <div className="min-h-screen bg-background text-foreground">
    <Navbar />

    {/* Hero */}
    <header className="relative w-full h-[55vh] md:h-[60vh] overflow-hidden">
      <img
        src={heroImg}
        alt="Crianças do Dojo Caraíva treinando jiu-jitsu na vila de Caraíva, Bahia"
        className="w-full h-full object-cover object-[75%_20%] md:object-center"
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
            alt="Logo Dojo Caraíva"
            className="w-14 h-14 rounded-full object-cover border-2 border-primary"
          />
          <div>
            <span className="text-xs bg-primary/20 text-primary px-3 py-1 rounded-full">
              Rifa Solidária
            </span>
            <h1 className="md:text-4xl font-bold mt-1 leading-tight text-2xl">
              A União de uma Vila: Transformando Vidas através do Esporte
            </h1>
          </div>
        </div>
      </div>
    </header>

    <main className="max-w-4xl mx-auto px-6 pt-6 pb-12 space-y-10">
      {/* Subtítulo */}
      <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
        Uma jornada pelos bastidores de um sonho coletivo, onde o carinho da comunidade e o poder de contar histórias abriram novos caminhos para o futuro do esporte.
      </p>

      {/* Seção 1 – O Cenário */}
      <section>
        <h2 className="text-2xl font-bold mb-4">
          🌊 Caraíva, Além do Turismo
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4 text-justify">
          Caraíva é um refúgio de belezas naturais, conhecido por suas ruas de areia e o encontro mágico do rio com o mar. Mas, longe dos holofotes turísticos, existe uma comunidade vibrante que enfrenta desafios reais. O acesso limitado e a falta de oportunidades para os jovens são questões presentes no dia a dia da vila.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-6 text-justify">
          Foi nesse contexto que o Dojo Caraíva nasceu. O projeto social não entrega apenas aulas de Jiu-Jitsu, ele oferece uma estrutura de disciplina, respeito e cidadania para dezenas de crianças e adolescentes locais. Sob a orientação da mestre Suellen Boni o tatame tornou-se um porto seguro e um trampolim para sonhos maiores.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <img
            src={socialImg}
            alt="Vila de Caraíva, sul da Bahia"
            className="w-full rounded-2xl object-cover h-72"
            loading="lazy"
          />
          <img
            src={kidsImg}
            alt="Crianças do Dojo Caraíva no tatame"
            className="w-full rounded-2xl object-cover h-72"
            loading="lazy"
          />
        </div>
      </section>

      {/* Seção 2 – O Desafio Narrativo */}
      <section>
        <h2 className="text-2xl font-bold mb-4">
          🥋 O Desafio Narrativo: Conectando Propósito com Desejo
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4 text-justify">
          O Dojo Caraíva foi erguido na Aldeia Xandó em 2019, fruto de doações e do esforço comunitário. Durante anos, a estrutura foi mantida por meio de vaquinhas pontuais que, embora fundamentais, limitavam o planejamento a longo prazo. O desafio era constante: manter o tatame vivo em uma realidade de recursos escassos.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-6 text-justify">
          A rifa solidária surgiu uma ideia audaciosa para romper esse ciclo. O objetivo era captar recursos suficientes para custear o projeto por um ano inteiro, garantindo segurança e continuidade para o projeto.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <img
            src={bastidores1}
            alt="Mateus Tafuri fixando cartaz da Rifa Solidária no Dojo Caraíva"
            className="w-full rounded-2xl object-cover h-72 object-[center_25%]"
            loading="lazy"
          />
          <img
            src={bastidores2New}
            alt="Mateus Tafuri apresentando a rifa para aluna do Dojo Caraíva"
            className="w-full rounded-2xl object-cover h-72 object-[center_25%]"
            loading="lazy"
          />
        </div>
      </section>

      {/* Seção 3 – Bastidores */}
      <section>
        <h2 className="text-2xl font-bold mb-4">
          ✨ Bastidores de um Dia Especial: O Dia da Gravação
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4 text-justify">
          Para comunicar essa campanha, fomos além do "compre um número". Trouxemos as estrelas do projeto para serem os porta-vozes. Durante um treino kids, os alunos Pérola, Arlison, Atxuhi e Helena tiveram a oportunidade de conhecer o prêmio que ajudariam a rifar.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4 text-justify">
          A pureza das perguntas: "Vai ter piscina, tio?" e o entusiasmo de Arlison: "Eu quero ser famoso, tio!", deram o tom. Assim que entenderam que o objetivo da rifa era trazer mais recursos para o projeto, eles abraçaram a ideia com a alegria e a resiliência que o jiu-jitsu ensina.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-6 text-justify">
          Foi emocionante ver o empenho deles em cada take da gravação. Queriam melhorar a fala, a postura, o cenário, demonstrando a determinação que aprendem no tatame. Recebidos com carinho pela equipe da pousada, aproveitaram cada detalhe: batata frita, suco, piscina, brincadeiras. Eles não eram apenas "crianças do projeto", eram as verdadeiras estrelas de Caraíva. Essa autenticidade foi o pilar da nossa comunicação, mostrando que cada bilhete de R$20 era um passo real na transformação dessas vidas.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <img
            src={pousada1}
            alt="Alunos do Dojo Caraíva conhecendo a Pousada Vila do Mar"
            className="w-full rounded-2xl object-cover h-72"
            loading="lazy"
          />
          <img
            src={pousada2}
            alt="Bastidores da gravação da rifa solidária do Dojo Caraíva"
            className="w-full rounded-2xl object-cover h-72"
            loading="lazy"
          />
        </div>
      </section>

      {/* Seção 4 – Estratégia Digital */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <img
            src={pousada3}
            alt="Mateus Tafuri com aluna do Dojo Caraíva apresentando a Rifa Solidária"
            className="w-full rounded-2xl object-cover h-72"
            loading="lazy"
          />
          <img
            src={pousada4}
            alt="Aluna do Dojo Caraíva à beira da piscina da pousada"
            className="w-full rounded-2xl object-cover h-72"
            loading="lazy"
          />
        </div>
        <h2 className="text-2xl font-bold mb-4">
          📊 A Estratégia Digital e o Resultado Financeiro
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4 text-justify">
          A campanha não foi movida apenas por emoção, mas por uma execução técnica de marketing digital voltada para a conversão. Para escalar o alcance da história e atrair os 3.183 compradores, investimos estrategicamente em tráfego pago nas redes sociais.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-6 text-justify">
          A narrativa empática das crianças, combinada com a segmentação inteligente para pessoas que amam Caraíva ou o jiu-jitsu social, gerou um ROI (Retorno sobre o Investimento) de 3,77.
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
            R$ 67.431,74
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-3">
            Prestação de Contas
          </h3>
          <p className="text-muted-foreground leading-relaxed text-justify">
            Este resultado é a prova de que quando a comunicação autêntica se une à gestão profissional e transparente, os resultados são extraordinários. Cada centavo arrecadado foi documentado e direcionado para a transformação dos jovens atletas de Caraíva.
          </p>
        </div>

        <div className="mt-10">
          <h3 className="text-2xl font-bold mb-4">
            🎉 Dia do Sorteio
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-6 text-justify">
            O dia do sorteio foi uma celebração coletiva. Reunimos a comunidade, os alunos e os apoiadores para entregar os prêmios e agradecer por cada bilhete vendido. A alegria nos rostos das crianças e o brilho de quem fez parte dessa jornada provam que essa rifa foi muito mais do que números: foi um movimento de amor pelo Dojo Caraíva.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img src={sorteio1} alt="Aluna do Dojo Caraíva no dia do sorteio da rifa solidária" className="w-full rounded-2xl object-cover h-72 object-[center_5%]" loading="lazy" />
            <img src={sorteio2} alt="Mestre Suellen, Mateus Tafuri e aluno premiado no sorteio do Dojo Caraíva" className="w-full rounded-2xl object-cover h-72 object-[center_30%]" loading="lazy" />
            <img src={sorteio3} alt="Aluno premiado com a mestre Suellen no dia do sorteio" className="w-full rounded-2xl object-cover h-72 object-[center_25%]" loading="lazy" />
            <img src={sorteio4} alt="Mateus Tafuri entregando prêmio para aluno do Dojo Caraíva" className="w-full rounded-2xl object-cover h-72 object-[center_25%]" loading="lazy" />
          </div>
        </div>
      </section>

      {/* Seção 5 – Impacto Real */}
      <section>
        <h2 className="text-2xl font-bold mb-4">
          🏅 O Impacto Real: Sonhos que se Tornaram Realidade
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-6 text-justify">
          Os R$ 67.431,74 arrecadados não foram apenas dinheiro em caixa. Eles se traduziram imediatamente em ação e transformação na vida dos nossos atletas:
        </p>
        <ul className="space-y-3 mb-6">
          {[
            {
              icon: "🥋",
              title: "Presença em Campeonatos",
              text: "Inscrições e custos garantidos para competições cruciais, incluindo o Campeonato Baiano e o Mundial da CBJJE.",
            },
            {
              icon: "🛡️",
              title: "Equipamento",
              text: "Aquisição de novos kimonos, sapatilhas e figurinos do projeto parceiro de ballet, além de equipamentos de segurança essenciais para treinos seguros.",
            },
            {
              icon: "✨",
              title: "Infraestrutura e Uniforme",
              text: "Confecção de novas camisetas da equipe e um grande evento de sorteio da rifa cheio de alegria e união.",
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
        <div className="grid grid-cols-2 gap-4">
          <img src={impacto1} alt="Alunos do Dojo Caraíva em travessia de barco para competição" className="w-full rounded-2xl object-cover h-72" loading="lazy" />
          <img src={impacto2} alt="Equipe do Dojo Caraíva reunida antes do campeonato" className="w-full rounded-2xl object-cover h-72 object-[center_70%]" loading="lazy" />
          <img src={impacto3} alt="Atletas do Dojo Caraíva acompanhando lutas no campeonato" className="w-full rounded-2xl object-cover h-72" loading="lazy" />
          <img src={impacto4} alt="Mateus Tafuri com atletas do Dojo Caraíva no campeonato" className="w-full rounded-2xl object-cover h-72" loading="lazy" />
        </div>
      </section>

      {/* Seção 6 – Conclusão */}
      <section>
        <h2 className="text-2xl font-bold mb-4">
          🚀 Conclusão e Oportunidade
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4 text-justify">
          A Rifa Solidária do Dojo Caraíva não foi apenas uma campanha de arrecadação de fundos; foi uma demonstração do poder da comunidade e da eficácia de uma comunicação estratégica e empática. Ela validou o modelo de gestão e captação do projeto.
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
          Se o Dojo Caraíva te inspirou, imagine o que podemos construir pelo seu projeto. Vamos transformar sua história em uma campanha que mobiliza, emociona e arrecada.
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

export default DojoCaraiva;
