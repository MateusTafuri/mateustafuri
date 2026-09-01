import ConteudoRifa from "@/components/ConteudoRifa";
import { useSeo } from "@/lib/seo";

/* A página é o conteúdo inteiro; a home reaproveita o mesmo bloco. */
const RifaSolidaria = () => {
  useSeo({
    titulo: "Rifa Solidária: o método completo em cinco etapas | Mateus Tafuri",
    descricao:
      "A metodologia aberta e gratuita para financiar um projeto social com rifa: sonhar, ofertar, contar, escalar e retribuir. Com casos reais e números de cada campanha.",
    path: "/rifa-solidaria",
  });

  return <ConteudoRifa />;
};

export default RifaSolidaria;
