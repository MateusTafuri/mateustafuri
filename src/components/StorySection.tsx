import { useState, useEffect, useCallback } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";

import story2 from "@/assets/story-2.jpg";
import story4 from "@/assets/story-4.png";
import story9 from "@/assets/story-9.jpg";
import story10 from "@/assets/story-10.jpg";
import story11 from "@/assets/story-11.jpg";
import story13 from "@/assets/story-13.jpg";
import story14 from "@/assets/story-14.jpg";
import story15 from "@/assets/story-15.jpg";
import story16 from "@/assets/story-16.jpg";
import story17 from "@/assets/story-17.jpg";
import story18 from "@/assets/story-18.jpg";
import story19 from "@/assets/story-19.webp";
import story20 from "@/assets/story-20.webp";
import story21 from "@/assets/story-21.jpg";

const photos = [
  { src: story10, position: "center 25%" },
  { src: story11, position: "center 25%" },
  { src: story2, position: "center 25%" },
  { src: story4, position: "center 25%" },
  { src: story9, position: "center 25%" },
  { src: story13, position: "center 25%" },
  { src: story15, position: "center 70%" },
  { src: story16, position: "center 70%" },
  { src: story18, position: "center 25%" },
  { src: story19, position: "center 60%", zoom: 1.3 },
  { src: story20, position: "center 60%", zoom: 1.4 },
  { src: story21, position: "center 25%" },
];

const tags = ["Estratégia", "Mobilização", "Storytelling", "Captação de Recursos", "Impacto Social"];

const StorySection = () => {
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
    <section className="max-w-5xl mx-auto px-6 py-16 scroll-mt-24" id="historia">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="relative">
          <Carousel setApi={setApi} opts={{ loop: true }} className="w-full">
            <CarouselContent>
              {photos.map((photo, i) => (
                <CarouselItem key={i}>
                  <div className="w-full rounded-2xl overflow-hidden h-[420px]">
                    <img
                      src={photo.src}
                      alt={`Mateus Tafuri - foto ${i + 1}`}
                      loading="lazy"
                      className="w-full h-full object-cover"
                      style={{
                        objectPosition: photo.position,
                        transform: photo.zoom ? `scale(${photo.zoom})` : undefined,
                        transformOrigin: photo.position,
                      }}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
          <div className="flex justify-center gap-1.5 mt-3">
            {photos.map((_, i) => (
              <button
                key={i}
                onClick={() => api?.scrollTo(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === current ? "bg-primary w-4" : "bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">Minha história</p>
          <h3 className="text-2xl font-bold mb-4 leading-snug">Do storytelling ao impacto real</h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            Nascido e criado no interior de Goiás, filho de professores, cresci inquieto com a ideia de gerar impacto positivo no mundo. Hoje, atuo na captação de recursos combinando estratégia, mobilização e narrativa para transformar causas sociais em campanhas que movem pessoas e geram resultados concretos.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            Ao longo da minha trajetória, conheci diferentes realidades pelo Brasil, o que ampliou minha visão sobre impacto e acesso a recursos. Nesse caminho, ajudei projetos a mobilizar mais de{" "}
            <strong className="text-primary">R$ 410 mil</strong> por meio de rifas solidárias e campanhas bem estruturadas.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          </p>
          <div className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <span key={t} className="text-xs bg-secondary text-secondary-foreground px-3 py-1 rounded-full">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
