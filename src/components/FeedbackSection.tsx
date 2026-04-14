import feedbackCorumbau from "@/assets/feedback-corumbau.jpg";
import feedbackCaraiva from "@/assets/feedback-caraiva.jpg";
import feedbackBonete from "@/assets/feedback-bonete.jpg";
import { Quote } from "lucide-react";

const feedbacks = [
  {
    project: "Corumbau BJJ",
    image: feedbackCorumbau,
    text: `Contar com o apoio e suporte da rifa solidária através do empenho, atenção e profissionalismo do Mateus nos fez acreditar ainda mais que estamos em um caminho correto e que o nosso trabalho vai além dos tatames... Conseguimos alcançar e captar recursos, valores e conexões com pessoas que durante a campanha, esteve presente e torceu pelas nossas crianças e pelo nosso primeiro espaço esportivo e cultural de Corumbau. Algo além de inteiramente necessário, tornará se histórico na nossa comunidade. Pudemos apresentar o nosso projeto para o Brasil inteiro e alguns países a fora também: Incrível como foi possível conectar as crianças em cada filmagem, roteiro e experiências diversas durante a campanha inteira, foi uma verdadeira aventura, de aprendizado, superação e vontade de vencer através dos nossos esforços e merecimento... Isso fez toda a diferença. Somos inteiramente gratos por tudo e a todos que fizeram parte dessa rifa solidária...`,
    author: "Diego Oliveira",
    role: "Líder do projeto Corumbau BJJ",
  },
  {
    project: "Dojo Caraíva",
    image: feedbackCaraiva,
    text: `Antes da Rifa o projeto era mantido através de pequenas doações e vendas de camisetas. Todo campeonato, graduação, manutenção do local lá ia eu fazer vakinha on line pra levantar dinheiro, o que me tomava um tempão e nem sempre atingíamos nossos objetivos.\n\nAtravés da verba arrecadada pela Rifa Solidária conseguimos organizar melhor nossos eventos anuais e colocar nossos objetivos em prática com facilidade. Compramos kimonos novos e roupas de ballet para as crianças, faixas e diplomas para a graduação, camisetas e adesivos para a divulgação, levamos muitos atletas para vários campeonatos (Baianos, Nacionais e internacionais). Trouxemos 3 campeões mundiais de Jiu Jitsu para a Aldeia Xandó. Foi realmente incrível o que fizemos juntos.\n\nMe senti apoiada financeiramente na nossa missão pela primeira vez! Fizemos mais e por mais pessoas.\n\nFoi uma grande surpresa encontrar o Mateus e essa ideia pelo caminho. Deus mandou uma ajuda e tanto.\n\nNós do Dojo Caraiva agradecemos por toda ajuda!`,
    author: "Suellen Thomaz Boni",
    role: "Professora e Líder do projeto Social Dojo Caraíva",
  },
  {
    project: "Dojo Bonete",
    image: feedbackBonete,
    text: "",
    author: "",
    role: "",
    placeholder: true,
  },
];

const FeedbackSection = () => {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16" id="feedbacks">
      <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
        Depoimentos
      </p>
      <h2 className="text-2xl md:text-3xl font-bold mb-10">
        O que dizem os projetos
      </h2>
      <div className="space-y-12">
        {feedbacks.map((f) => (
          <div
            key={f.project}
            className="rounded-2xl border border-border bg-card overflow-hidden"
          >
            <div className="flex flex-col md:flex-row">
              <div className="md:w-64 shrink-0">
                <img
                  src={f.image}
                  alt={f.project}
                  className="w-full h-64 md:h-full object-cover object-top"
                  loading="lazy"
                />
              </div>
              <div className="p-6 md:p-8 flex flex-col justify-center flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <Quote size={20} className="text-primary shrink-0" />
                  <span className="text-sm font-bold text-primary">{f.project}</span>
                </div>
                {f.placeholder ? (
                  <p className="text-sm text-muted-foreground/50 italic">
                    Depoimento em breve...
                  </p>
                ) : (
                  <>
                    <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line mb-4">
                      {f.text}
                    </p>
                    <div className="mt-auto">
                      <p className="text-sm font-semibold">{f.author}</p>
                      <p className="text-xs text-muted-foreground">{f.role}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeedbackSection;
