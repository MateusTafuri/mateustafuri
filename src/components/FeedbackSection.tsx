import { useState, useCallback, useEffect } from "react";
import feedbackCorumbau from "@/assets/feedback-corumbau.jpg";
import feedbackCaraiva from "@/assets/feedback-caraiva.webp";
import feedbackBonete from "@/assets/feedback-bonete.jpg";
import { Quote } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";

const feedbacks = [
  {
    project: "Projeto Social l Dojo Caraíva",
    image: feedbackCaraiva,
    text: `Antes da Rifa o projeto era mantido através de pequenas doações e vendas de camisetas. Todo campeonato, graduação, manutenção do local lá ia eu fazer vakinha on line pra levantar dinheiro, o que me tomava um tempão e nem sempre atingíamos nossos objetivos.\n\nAtravés da verba arrecadada pela Rifa Solidária conseguimos organizar melhor nossos eventos anuais e colocar nossos objetivos em prática com facilidade. Compramos kimonos novos e roupas de ballet para as crianças, faixas e diplomas para a graduação, camisetas e adesivos para a divulgação, levamos muitos atletas para vários campeonatos (Baianos, Nacionais e internacionais). Trouxemos 3 campeões mundiais de Jiu Jitsu para a Aldeia Xandó. Foi realmente incrível o que fizemos juntos.\n\nMe senti apoiada financeiramente na nossa missão pela primeira vez! Fizemos mais e por mais pessoas. Foi uma grande surpresa encontrar o Mateus e essa ideia pelo caminho. Deus mandou uma ajuda e tanto. Nós do Dojo Caraiva agradecemos por toda ajuda!`,
    author: "Suellen Thomaz Boni",
    role: "Líder do projeto Social Dojo Caraíva",
  },
  {
    project: "Projeto Social l Corumbau BJJ",
    image: feedbackCorumbau,
    text: `Contar com o apoio e suporte da Rifa Solidária, através do empenho, atenção e profissionalismo do Mateus, nos fez acreditar ainda mais que estamos em um caminho correto e que o nosso trabalho vai além dos tatames... \n\nConseguimos alcançar e captar recursos, valores e conexões com pessoas que, durante a campanha, estiveram presentes e torceram pelas nossas crianças e pelo nosso primeiro espaço esportivo e cultural de Corumbau. Algo além de inteiramente necessário, tornará-se histórico na nossa comunidade. \n\nPudemos apresentar o nosso projeto para o Brasil inteiro e alguns países afora também. Incrível como foi possível conectar as crianças em cada filmagem, roteiro e experiências diversas durante a campanha inteira. Foi uma verdadeira aventura de aprendizado, superação e vontade de vencer através dos nossos esforços e merecimento...\n\nIsso fez toda a diferença. Somos inteiramente gratos por tudo e a todos que fizeram parte dessa Rifa Solidária.`,
    author: "Diego Oliveira",
    role: "Líder do projeto social Corumbau BJJ",
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
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const onSelect = useCallback(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
  }, [api]);

  useEffect(() => {
    if (!api) return;
    onSelect();
    api.on("select", onSelect);
    return () => { api.off("select", onSelect); };
  }, [api, onSelect]);

  return (
    <section className="max-w-5xl mx-auto px-6 py-16 scroll-mt-24" id="feedbacks">
      <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
        Depoimentos
      </p>
      <h2 className="text-2xl md:text-3xl font-bold mb-10">
        O que dizem das minhas campanhas
      </h2>

      <Carousel opts={{ loop: true }} setApi={setApi} className="w-full">
        <CarouselContent>
          {feedbacks.map((f) => (
            <CarouselItem key={f.project}>
              <div className="rounded-2xl border border-border bg-card overflow-hidden">
                <div className="flex flex-col md:flex-row md:items-center">
                  <div className="md:w-80 h-64 md:h-auto md:self-stretch shrink-0">
                    <img
                      src={f.image}
                      alt={f.project}
                      className="w-full h-full object-cover object-[center_30%]"
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
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="flex items-center justify-center gap-4 mt-6">
          <CarouselPrevious className="static translate-y-0" />
          <div className="flex gap-2">
            {feedbacks.map((_, i) => (
              <button
                key={i}
                onClick={() => api?.scrollTo(i)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  i === current ? "bg-primary" : "bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>
          <CarouselNext className="static translate-y-0" />
        </div>
      </Carousel>
    </section>
  );
};

export default FeedbackSection;
