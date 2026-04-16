import storyImg from "@/assets/story.webp";

const tags = ["Estratégia", "Mobilização", "Storytelling", "Captação de Recursos", "Impacto Social"];

const StorySection = () => {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16" id="historia">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <img
          src={storyImg}
          alt="Mateus Tafuri"
          loading="lazy"
          width={800}
          height={1000}
          className="w-full rounded-2xl object-cover h-[400px]"
        />
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
