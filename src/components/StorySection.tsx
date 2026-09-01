import story4 from "@/assets/story-4.webp";
import story10 from "@/assets/story-10.webp";
import story11 from "@/assets/story-11.webp";
import caOmbros from "@/assets/ca-ombros.webp";
import caKombi from "@/assets/ca-kombi.webp";
import caFlashMenino from "@/assets/ca-flash-menino.webp";
import caFlashMicrofone from "@/assets/ca-flash-microfone.webp";
import caraivaPicole from "@/assets/caraiva-picole.webp";

const photos = [
  { src: story10, position: "center 25%" },
  { src: caOmbros, position: "center 30%" },
  { src: story4, position: "center 25%" },
  { src: caFlashMenino, position: "center 35%" },
  { src: caKombi, position: "center" },
  { src: story11, position: "center 25%" },
  { src: caraivaPicole, position: "center 35%" },
  { src: caFlashMicrofone, position: "center 35%" },
];

const tags = [
  "Estratégia",
  "Mobilização",
  "Storytelling",
  "Captação de Recursos",
  "Impacto Social",
];

const StorySection = () => (
  <section className="max-w-5xl mx-auto px-6 py-16 scroll-mt-24" id="historia">
    {/* muro de quadrados: oito fotos do mesmo tamanho, em duas fileiras */}
    <div className="mb-10 grid grid-cols-2 gap-2 md:grid-cols-4">
      {photos.map((photo, i) => (
        <div key={i} className="aspect-square overflow-hidden rounded-xl">
          <img
            src={photo.src}
            alt={`Mateus Tafuri - foto ${i + 1}`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
            style={{ objectPosition: photo.position }}
          />
        </div>
      ))}
    </div>
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
        Minha história
      </p>
      <h3 className="font-display text-2xl font-bold mb-4 leading-snug">
        Da inquietação ao impacto
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed mb-3">
        Nascido e criado no interior de Goiás, filho de professores,{" "}
        <strong className="text-foreground">
          cresci inquieto com a ideia de gerar impacto positivo no mundo
        </strong>
        . Hoje, atuo na captação de recursos combinando estratégia, mobilização
        e narrativa para{" "}
        <strong className="text-foreground">
          transformar causas sociais em campanhas
        </strong>{" "}
        que movem pessoas e geram resultados concretos.
      </p>
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
        Ao longo da minha trajetória, conheci diferentes realidades pelo Brasil,
        o que{" "}
        <strong className="text-foreground">
          ampliou minha visão sobre impacto e acesso a recursos
        </strong>
        . Nesse caminho, ajudei projetos a mobilizar{" "}
        <strong className="text-foreground">
          mais de <span className="text-primary">R$ 410 mil</span> por meio de
          rifas solidárias
        </strong>{" "}
        e campanhas bem estruturadas.
      </p>
      <div className="flex flex-wrap gap-2">
        {tags.map((t) => (
          <span
            key={t}
            className="text-xs bg-secondary text-secondary-foreground px-3 py-1 rounded-full"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  </section>
);

export default StorySection;
