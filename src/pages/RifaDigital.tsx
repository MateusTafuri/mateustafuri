import { useEffect } from "react";
import {
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  Check,
  Clock,
  ListChecks,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useSeo } from "@/lib/seo";
import { Voltar } from "@/components/Voltar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { WHATSAPP } from "@/data/rifaSolidaria";

import logoBonete from "@/assets/logo-bonete.webp";
import logoCaraiva from "@/assets/logo-caraiva.webp";
import logoCorumbau from "@/assets/logo-corumbau.webp";

/* Guia longo "Como estruturar a sua rifa solidária no digital".
   É a página de conteúdo do site: existe para ser achada na busca e para
   ensinar o método inteiro de graça. Cada etapa fecha com um case real. */

const PETROLEO = "hsl(176 39% 14%)";
const PETROLEO_MEDIO = "hsl(178 36% 22%)";
const CORAL = "hsl(15 65% 56%)";

const INDICE = [
  { id: "o-que-e", label: "O que é uma rifa solidária" },
  { id: "antes", label: "Antes de começar" },
  { id: "etapa-1", label: "1. Sonhar: meta e transformação" },
  { id: "etapa-2", label: "2. Ofertar: prêmio e parceiros" },
  { id: "etapa-3", label: "3. Contar: narrativa e conteúdo" },
  { id: "etapa-4", label: "4. Escalar: página e tráfego" },
  { id: "etapa-5", label: "5. Retribuir: sorteio e prestação de contas" },
  { id: "cronograma", label: "Cronograma de 90 dias" },
  { id: "contas", label: "Quanto custa e para onde vai o dinheiro" },
  { id: "erros", label: "Os erros que matam uma campanha" },
  { id: "faq", label: "Perguntas frequentes" },
];

type Etapa = {
  id: string;
  n: string;
  titulo: string;
  pergunta: string;
  objetivo: string;
  paragrafos: string[];
  decisoes: { titulo: string; texto: string; exemplo: string }[];
  erros: string[];
  checklist: string[];
  case: {
    nome: string;
    logo: string;
    path: string;
    texto: string;
    numeros: { v: string; l: string }[];
  };
};

const ETAPAS: Etapa[] = [
  {
    id: "etapa-1",
    n: "01",
    titulo: "Sonhar",
    pergunta: "O que queremos alcançar, e por quê?",
    objetivo:
      "Sair do “precisamos arrecadar dinheiro” e chegar a uma meta clara, alcançável e amarrada a uma transformação que dá para mostrar em foto.",
    paragrafos: [
      "Toda campanha que fracassa fracassa aqui, semanas antes de o primeiro bilhete existir. A organização decide que precisa de dinheiro, escolhe um valor redondo e sai vendendo. Quando alguém de fora pergunta “para que serve?”, a resposta é vaga, e uma resposta vaga não vende bilhete nenhum.",
      "A etapa 1 troca o valor redondo por uma conta. Não é “queremos R$ 50 mil”, é “a cobertura da quadra custa R$ 32 mil de material e R$ 8 mil de mão de obra, e a plataforma mais a mídia levam mais uns 20%”. Quem enxerga a conta acredita na meta, e quem acredita na meta compra.",
      "O segundo trabalho da etapa é achar a transformação: a frase que descreve o que muda no dia seguinte. Ela precisa ser fotografável. “Melhorar a estrutura” não é fotografável. “A turma sai de 60 para 100 crianças porque a sala passa a funcionar na chuva” é, e vai virar a foto da prestação de contas lá na etapa 5.",
    ],
    decisoes: [
      {
        titulo: "O porquê",
        texto:
          "Qual problema real esse dinheiro resolve. Escreva pensando em quem nunca ouviu falar da sua organização, não no seu conselho.",
        exemplo:
          "As aulas acontecem num galpão sem cobertura. Quando chove, 60 crianças ficam sem atividade.",
      },
      {
        titulo: "A meta",
        texto:
          "Quanto precisa entrar e o que exatamente esse valor cobre, item por item. Some os custos da campanha, não só os da obra.",
        exemplo: "R$ 30 mil: R$ 22 mil de material e R$ 8 mil de mão de obra.",
      },
      {
        titulo: "A transformação",
        texto:
          "O que muda na prática quando a meta for batida. Precisa ser algo que dá para fotografar no mesmo ângulo do antes.",
        exemplo:
          "Sala coberta e com piso, aberta o ano inteiro, e a turma passa de 60 para 100 crianças.",
      },
    ],
    erros: [
      "Meta aspiracional. Se a conta pede R$ 30 mil, a campanha não nasce pedindo R$ 100 mil para “aproveitar o esforço”.",
      "Objetivo genérico. “Manutenção do projeto” não emociona ninguém de fora da sua cidade.",
      "Esquecer os custos da própria campanha na conta: taxa de plataforma, mídia, impostos e o prêmio, quando ele não é doado.",
    ],
    checklist: [
      "Objetivo e meta escritos, com a conta aberta item por item",
      "Transformação desenhada em uma frase fotografável",
      "Briefing alinhado com toda a equipe da organização, não só com a diretoria",
    ],
    case: {
      nome: "Corumbau BJJ",
      logo: logoCorumbau,
      path: "/corumbau-bjj",
      texto:
        "O projeto já tinha o lote e a planta da sede na mão. A meta não era “arrecadar para o projeto”, era erguer a primeira sede cultural e esportiva da vila, com o desenho pronto para mostrar. É a diferença entre pedir dinheiro e pedir por uma coisa que existe no papel.",
      numeros: [
        { v: "R$ 159,5 mil", l: "arrecadados" },
        { v: "101 dias", l: "de campanha" },
      ],
    },
  },
  {
    id: "etapa-2",
    n: "02",
    titulo: "Ofertar",
    pergunta: "Qual experiência vamos sortear, e quem entra como parceiro?",
    objetivo:
      "Montar uma oferta desejável para quem não conhece a sua causa e construir parcerias com troca real de valor, em que o parceiro recebe mídia de volta.",
    paragrafos: [
      "Aqui está a virada que faz a rifa solidária funcionar no digital: o prêmio não é um brinde da sua causa, é o motivo de alguém que nunca ouviu falar de você parar o dedo na tela. A causa faz a pessoa se sentir bem; o prêmio faz ela comprar. As duas coisas juntas fazem a campanha sair da sua cidade.",
      "Experiência ganha de produto na maior parte das vezes. Uma viagem de quatro dias com hospedagem, passeio e comida rende conteúdo por semanas, tem cara de sonho e custa zero para a organização quando vem de parceiros. Um celular, ao contrário, compete com o mercado inteiro e não conta história nenhuma.",
      "Parceiro não é doador. Parceiro é uma troca: ele entra com a diária, o passeio ou o jantar, e leva o nome dele no vídeo de lançamento, nos posts, na página de venda e na live do sorteio. Chegue na conversa com esse pacote fechado e escrito, porque a pergunta que ele vai fazer é “o que eu ganho com isso?”.",
      "Fechada a oferta, monte a conta do bilhete: preço vezes quantidade tem que bater a meta da etapa 1, com folga para os custos. Bilhete barato demais exige um volume que a sua audiência não tem; caro demais trava a compra por impulso. Entre R$ 20 e R$ 50 costuma ser a faixa que funciona.",
    ],
    decisoes: [
      {
        titulo: "O prêmio",
        texto:
          "Que prêmio faria alguém participar mesmo sem conhecer o projeto. Escolha entre uma experiência única e vários ganhadores menores.",
        exemplo:
          "Um fim de semana para duas pessoas, com hospedagem, passeio de barco e jantar.",
      },
      {
        titulo: "Os parceiros",
        texto:
          "Quem entra e o que leva de volta. Prefira parceiros com audiência local e credibilidade: eles divulgam junto.",
        exemplo:
          "A pousada doa 2 diárias e aparece nos posts, no vídeo de lançamento e no sorteio.",
      },
      {
        titulo: "O bilhete",
        texto:
          "Quanto custa e quantos precisam ser vendidos para bater a meta. Faça a conta antes de anunciar o preço.",
        exemplo: "Bilhete de R$ 25, 1.200 vendidos para chegar nos R$ 30 mil.",
      },
    ],
    erros: [
      "Comprar o prêmio com o dinheiro da própria campanha. Além de comer a margem, isso inviabiliza a autorização legal.",
      "Prêmio que só interessa a quem já conhece o projeto. Ele precisa funcionar para o estranho.",
      "Parceria combinada na conversa e nunca escrita. Documente o que cada lado entrega, com datas.",
    ],
    checklist: [
      "Prêmio definido e garantido por escrito com cada parceiro",
      "Contrapartidas de mídia acordadas, com onde e quando cada parceiro aparece",
      "Preço do bilhete e quantidade fechando a meta da etapa 1",
    ],
    case: {
      nome: "Dojo Caraíva",
      logo: logoCaraiva,
      path: "/dojo-caraiva",
      texto:
        "A oferta foi montada com parceiros da própria vila e bilhete de R$ 20, o preço de uma compra por impulso. Com o ticket baixo, o volume veio de gente de fora: 3.183 apoiadores garantiram um ano inteiro de projeto.",
      numeros: [
        { v: "R$ 20", l: "por bilhete" },
        { v: "3.183", l: "apoiadores" },
      ],
    },
  },
  {
    id: "etapa-3",
    n: "03",
    titulo: "Contar",
    pergunta: "Como vamos contar essa história?",
    objetivo:
      "Transformar a história real da organização em roteiro, peças e um calendário que sustenta semanas de conteúdo antes de a venda abrir.",
    paragrafos: [
      "Uma causa boa que ninguém conhece não arrecada. A etapa 3 é a que transforma o trabalho da sua organização em algo que uma pessoa a mil quilômetros de distância entende em quarenta segundos.",
      "Comece pela pessoa, não pelo número. “Atendemos 60 crianças” é estatística; a coordenadora contando por que abriu o projeto na garagem de casa é história. Escolha um protagonista real e grave ele falando, sem decorar. O celular resolve: luz natural, cara no meio da tela, áudio limpo.",
      "De um roteiro bom saem muitas peças. Um vídeo de dois minutos vira três reels, um carrossel, o flyer do prêmio e os destaques do perfil. Você não precisa de dez ideias, precisa de uma boa história cortada de dez jeitos.",
      "E precisa existir uma pré-campanha. Duas semanas antes de abrir a venda, o perfil já deve estar falando disso: bastidores, contagem regressiva, o parceiro aparecendo, a explicação do prêmio. Campanha que estreia junto com a venda perde o efeito de acúmulo, e o dia do lançamento é o de maior venda quando tem gente esperando.",
    ],
    decisoes: [
      {
        titulo: "O protagonista",
        texto:
          "Quem é o rosto que carrega a campanha. Uma pessoa só, real, que aparece do começo ao fim.",
        exemplo:
          "A coordenadora que fundou o projeto, com duas famílias atendidas contando a rotina.",
      },
      {
        titulo: "O formato",
        texto:
          "O roteiro do vídeo de lançamento e as peças que saem dele. Reels conecta mais que material produzido demais.",
        exemplo:
          "Vídeo de 2 min com a história da coordenadora. Dele saem 3 reels, 1 carrossel e o flyer do prêmio.",
      },
      {
        titulo: "O calendário",
        texto:
          "O que sai em cada semana, antes e durante. Precisa sustentar conteúdo até o dia do sorteio, sem buraco no meio.",
        exemplo:
          "Semana 1: bastidores e contagem regressiva. Semana 2: vídeo de lançamento. Depois, 3 posts por semana até o sorteio.",
      },
    ],
    erros: [
      "Falar de estrutura e de números em vez de falar de gente.",
      "Gastar semanas atrás de um vídeo perfeito. O que converte é verdade, não produção.",
      "Sumir no meio da campanha. O silêncio de uma semana derruba a venda e ela não volta sozinha.",
    ],
    checklist: [
      "História encontrada e roteirizada, com um protagonista definido",
      "Vídeo de lançamento e peças de apoio produzidos antes da venda abrir",
      "Calendário de duas semanas de pré-campanha, com posts, destaques e bio ajustados",
    ],
    case: {
      nome: "Dojo Bonete",
      logo: logoBonete,
      path: "/dojo-bonete",
      texto:
        "O Bonete é uma comunidade sem estrada, onde tudo chega de barco. A narrativa não precisou de invenção: as crianças carregando tijolo na areia da praia contam sozinhas por que aquele dojo importava. O conteúdo rendeu 1,2 milhão de visualizações.",
      numeros: [
        { v: "1,2 mi", l: "de alcance" },
        { v: "104 dias", l: "de campanha" },
      ],
    },
  },
  {
    id: "etapa-4",
    n: "04",
    titulo: "Escalar",
    pergunta: "Como levamos isso para mais gente?",
    objetivo:
      "Colocar no ar uma página que converte e um investimento em mídia que se paga com as próprias vendas da campanha.",
    paragrafos: [
      "É aqui que a campanha sai do grupo da família e chega no Brasil inteiro. E é aqui que a maior parte das organizações trava, porque envolve duas coisas que parecem de outro mundo: página de venda e tráfego pago.",
      "A página tem uma função só, que é transformar visita em bilhete vendido. Isso quer dizer compra em poucos cliques, Pix e cartão, sem cadastro, sem login, sem formulário longo. Acima do primeiro rolar precisa estar o prêmio, o preço, o botão e a causa em uma linha. Todo passo a mais derruba a conversão.",
      "O tráfego pago funciona porque a rifa tem uma coisa rara no terceiro setor: ela devolve dinheiro no mesmo dia. Você começa pequeno, algo como R$ 50 por dia em três criativos diferentes, olha qual deles vende bilhete mais barato e joga o dinheiro que entrou de volta só no que está funcionando. A campanha financia a própria mídia.",
      "Acompanhe poucos números, todo dia: quanto entrou, quanto saiu em anúncio, quanto custou cada bilhete vendido e quantos dias faltam. Se o custo por bilhete passa da margem, você corta o criativo, não aumenta o orçamento. O orgânico entra junto: influenciadores que já visitaram o projeto, o jornal da cidade, os grupos de WhatsApp do bairro. O que vem de quem já confia em você converte mais barato que qualquer anúncio.",
    ],
    decisoes: [
      {
        titulo: "A plataforma",
        texto:
          "Onde o bilhete é vendido. Compra em uma etapa, Pix e cartão, sem cadastro. Confira a taxa antes de fechar.",
        exemplo: "Página própria, compra em uma etapa, Pix e cartão, sem cadastro.",
      },
      {
        titulo: "O alcance orgânico",
        texto:
          "Quais parceiros e perfis abraçam a causa de graça. Vale mais quem já esteve no projeto do que quem tem mais seguidores.",
        exemplo:
          "4 perfis locais que já visitaram o projeto, o jornal da cidade e 2 grupos de WhatsApp.",
      },
      {
        titulo: "O tráfego pago",
        texto:
          "Quanto investir por dia e qual o teto de custo por bilhete. Escale só o criativo que vende abaixo desse teto.",
        exemplo:
          "R$ 50 por dia em 3 criativos, escalando só o que vender bilhete abaixo de R$ 30.",
      },
    ],
    erros: [
      "Vender só pelo direct e pelo WhatsApp. Isso limita a campanha ao tamanho da sua rede.",
      "Colocar todo o orçamento de mídia no primeiro dia, antes de saber qual criativo funciona.",
      "Página bonita com compra difícil. Cada clique a mais entre a vontade e o Pix custa bilhete.",
    ],
    checklist: [
      "Página de venda no ar, com compra em passo único e Pix",
      "Divulgação orgânica ativada, com os parceiros avisados da data",
      "Tráfego pago rodando, com teto de custo por bilhete definido e acompanhado todo dia",
    ],
    case: {
      nome: "Corumbau BJJ",
      logo: logoCorumbau,
      path: "/corumbau-bjj",
      texto:
        "R$ 56 mil investidos em anúncios devolveram R$ 159,5 mil em bilhetes, um retorno de 2,85x. Nenhuma vila isolada arrecada isso com a rede dela: o dinheiro veio do país inteiro, e a mídia se pagou com as primeiras vendas.",
      numeros: [
        { v: "2,85x", l: "de retorno" },
        { v: "4.377", l: "apoiadores" },
      ],
    },
  },
  {
    id: "etapa-5",
    n: "05",
    titulo: "Retribuir",
    pergunta: "Como prestamos contas e agradecemos a quem apoiou?",
    objetivo:
      "Fechar o ciclo com credibilidade: quem apoiou precisa ver o sorteio, a entrega do prêmio e o resultado que ajudou a construir.",
    paragrafos: [
      "A campanha não termina no sorteio. Ela termina quando quem comprou bilhete viu, com os próprios olhos, o que o dinheiro dele construiu. É essa etapa que faz o apoiador de hoje ser o apoiador da próxima, e é a que quase todo mundo pula.",
      "O sorteio precisa ser público e sem sombra de dúvida. Ao vivo, com regra explicada antes, e amarrado a um resultado que a sua organização não controla, que na prática quer dizer a extração da Loteria Federal. Aplicativo de sorteio e roleta em live geram desconfiança e, no caso do sorteio filantrópico autorizado, não valem legalmente.",
      "Depois vem a entrega do prêmio, documentada. Foto, vídeo, o ganhador falando. É o conteúdo que responde de graça à pergunta que todo mundo faz na próxima campanha: “será que essa rifa é de verdade?”.",
      "E por último a prestação de contas: quanto entrou, quanto saiu em taxa, mídia e imposto, e o que virou obra. Publique a foto da transformação no mesmo ângulo da foto do problema, lá da etapa 1. Guarde a lista de quem comprou bilhete, porque ela é o ativo mais valioso que a campanha deixa.",
    ],
    decisoes: [
      {
        titulo: "A transparência",
        texto:
          "Como o sorteio e a entrega vão ser públicos. Regra clara antes, resultado que você não controla, tudo gravado.",
        exemplo:
          "Sorteio ao vivo no Instagram pela Loteria Federal, com a entrega do prêmio gravada e postada.",
      },
      {
        titulo: "A prova do resultado",
        texto:
          "Que foto, vídeo ou documento prova que a meta virou realidade. É a transformação da etapa 1, agora em imagem.",
        exemplo:
          "Foto da sala coberta com a turma dentro, no mesmo ângulo da foto do galpão vazio.",
      },
      {
        titulo: "O relacionamento",
        texto:
          "Como manter contato com quem apoiou. Essa lista é o que faz a segunda campanha custar menos que a primeira.",
        exemplo:
          "Lista de transmissão com quem comprou bilhete e um post de prestação de contas por trimestre.",
      },
    ],
    erros: [
      "Sumir depois do sorteio. O silêncio no fim queima a confiança que a campanha inteira construiu.",
      "Prestar contas só para o conselho. Quem pagou o bilhete também é dono da informação.",
      "Perder a lista de apoiadores. Sem ela, a próxima campanha recomeça do zero.",
    ],
    checklist: [
      "Sorteio realizado ao vivo, com regras publicadas antes",
      "Entrega do prêmio documentada e publicada",
      "Prestação de contas no ar e lista de apoiadores organizada para a próxima",
    ],
    case: {
      nome: "Dojo Bonete",
      logo: logoBonete,
      path: "/dojo-bonete",
      texto:
        "O sorteio aconteceu no dia da inauguração, diante da comunidade que carregou cada tijolo. Dos R$ 155,7 mil arrecadados, R$ 102,5 mil ficaram líquidos para a obra, e a prestação de contas foi feita com a foto do dojo pronto.",
      numeros: [
        { v: "R$ 102,5 mil", l: "líquidos para o projeto" },
        { v: "2.077", l: "apoiadores" },
      ],
    },
  },
];

const CRONOGRAMA = [
  {
    quando: "Semanas 1 e 2",
    titulo: "Meta, conta e equipe",
    texto: "Etapa 1 inteira. Ninguém procura prêmio antes de a conta fechar.",
  },
  {
    quando: "Semanas 3 a 5",
    titulo: "Prêmio e parceiros",
    texto:
      "Etapa 2. É a fase mais lenta, porque depende da agenda dos outros. Comece por aqui se for pedir autorização.",
  },
  {
    quando: "Semanas 6 e 7",
    titulo: "Gravação e peças",
    texto: "Etapa 3. Vídeo de lançamento, cortes, flyer e calendário prontos antes de abrir a venda.",
  },
  {
    quando: "Semana 8",
    titulo: "Pré-campanha",
    texto: "O perfil já fala da rifa, sem vender ainda. Página no ar e testada.",
  },
  {
    quando: "Semanas 9 a 16",
    titulo: "Venda e mídia",
    texto:
      "Etapa 4. Lançamento, tráfego rodando, números olhados todo dia. Entre 60 e 100 dias de venda é o intervalo que funciona.",
  },
  {
    quando: "Semanas 17 e 18",
    titulo: "Sorteio e contas",
    texto: "Etapa 5. Sorteio ao vivo, entrega do prêmio e prestação de contas publicada.",
  },
];

const CONTAS = [
  ["Taxa da plataforma de venda", "varia por plataforma", "Sai de cada bilhete vendido"],
  ["Mídia paga", "20% a 35% do arrecadado", "Durante a venda, financiada pelas vendas"],
  ["Prêmio", "R$ 0 quando é doado", "Fechado antes do lançamento"],
  ["Produção de conteúdo", "baixa, se for interna", "Antes do lançamento"],
  ["Impostos e taxas legais", "conforme a autorização", "Antes e depois do sorteio"],
  ["Sobra para a causa", "o que resta, a maior parte", "Depois da prestação de contas"],
];

const ERROS_GERAIS = [
  {
    titulo: "Começar pelo prêmio",
    texto:
      "O prêmio é a etapa 2. Quem começa por ele monta uma oferta que não fecha a conta de uma meta que ainda não existe.",
  },
  {
    titulo: "Vender só para a própria rede",
    texto:
      "A rede da organização esgota na primeira semana. O que faz a campanha crescer é chegar em quem nunca ouviu falar de você.",
  },
  {
    titulo: "Rifa sem autorização",
    texto:
      "No Brasil a rifa é proibida, com uma exceção: o sorteio filantrópico autorizado pelo governo federal. Não existe “rifa pequena que pode”.",
  },
  {
    titulo: "Campanha longa demais",
    texto:
      "Passou de uns 100 dias, o assunto cansa e a venda cai. Prazo curto demais, por outro lado, não dá tempo de a mídia aprender.",
  },
  {
    titulo: "Não medir nada",
    texto:
      "Sem custo por bilhete você não sabe se o anúncio está dando lucro ou queimando o dinheiro da obra.",
  },
  {
    titulo: "Sumir depois do sorteio",
    texto:
      "A prestação de contas é o que permite fazer a segunda campanha. Sem ela, a primeira vira a única.",
  },
];

const FAQ = [
  {
    p: "Rifa solidária é legal no Brasil?",
    r: "Rifa é proibida, e existe uma exceção com nome próprio: o sorteio filantrópico, feito por organização da sociedade civil com autorização prévia do Ministério da Fazenda. O tamanho da campanha não muda isso. Escrevi o caminho inteiro da autorização, do CNPJ à prestação de contas, no guia de legalização.",
  },
  {
    p: "Quanto tempo leva para montar uma rifa solidária?",
    r: "Da primeira reunião ao sorteio, entre quatro e cinco meses. São cerca de sete semanas de preparação, de 60 a 100 dias de venda e duas semanas de encerramento. Se a campanha for pedir autorização federal, o protocolo precisa acontecer entre 40 e 120 dias antes do sorteio, então some esse prazo ao começo.",
  },
  {
    p: "Qual o preço ideal do bilhete?",
    r: "Entre R$ 20 e R$ 50, na maior parte dos casos. O preço certo é o que fecha a meta com um número de bilhetes que a sua audiência consegue comprar. Bilhete barato exige volume alto; bilhete caro trava a compra por impulso. Faça a conta antes de anunciar.",
  },
  {
    p: "Preciso investir em anúncios?",
    r: "Se a meta for maior que o alcance da sua rede, sim. A rifa é uma das poucas ações do terceiro setor em que o anúncio devolve dinheiro no mesmo dia, o que permite começar com pouco e reinvestir só o que está vendendo. Nas campanhas que conduzi, a mídia ficou entre 20% e 35% do arrecadado, com retorno de 2,8 a 3,8 vezes.",
  },
  {
    p: "Qual prêmio funciona melhor?",
    r: "Experiência costuma ganhar de produto. Uma viagem com hospedagem, passeio e comida rende conteúdo por semanas, tem cara de sonho e sai de graça quando vem de parceiros. Produto eletrônico compete com o mercado inteiro e não conta história.",
  },
  {
    p: "A organização pode comprar o prêmio?",
    r: "No sorteio filantrópico autorizado, não: o bem precisa ser doado por um terceiro, com termo registrado em cartório. Fora isso, comprar o prêmio come a margem da campanha, que é justamente o dinheiro que deveria virar obra.",
  },
  {
    p: "Onde vender os bilhetes?",
    r: "Em uma página em que a compra aconteça em poucos cliques, com Pix e cartão, sem cadastro. Pode ser plataforma de rifa ou página própria. O que decide não é a marca, é a taxa cobrada e o número de passos entre a vontade e o pagamento.",
  },
  {
    p: "Como fazer o sorteio com credibilidade?",
    r: "Ao vivo, com as regras publicadas antes e o resultado amarrado a algo que a sua organização não controla, que na prática é a extração da Loteria Federal. Grave o sorteio e a entrega do prêmio, e publique os dois.",
  },
  {
    p: "Dá para fazer sem equipe grande?",
    r: "Dá. As campanhas que conduzi foram tocadas por equipes de duas ou três pessoas somadas a voluntários. O que não dá é fazer sem método: sem as cinco etapas na ordem, o trabalho triplica e a arrecadação cai.",
  },
  {
    p: "E se a campanha não bater a meta?",
    r: "Ela ainda arrecada, e a lista de apoiadores fica. A meta serve para dimensionar a oferta e a mídia, não para ser um tudo ou nada. O que não pode faltar, batendo a meta ou não, é a prestação de contas.",
  },
];

const CASES = [
  {
    nome: "Dojo Bonete",
    local: "Ilhabela · SP",
    valor: "R$ 155,7 mil",
    frase: "Uma comunidade sem estrada que ergueu o próprio dojo",
    logo: logoBonete,
    path: "/dojo-bonete",
  },
  {
    nome: "Dojo Caraíva",
    local: "Caraíva · BA",
    valor: "R$ 100 mil",
    frase: "Um ano inteiro de projeto garantido com bilhete de R$ 20",
    logo: logoCaraiva,
    path: "/dojo-caraiva",
  },
  {
    nome: "Corumbau BJJ",
    local: "Corumbau · BA",
    valor: "R$ 159,5 mil",
    frase: "A primeira sede cultural e esportiva da vila",
    logo: logoCorumbau,
    path: "/corumbau-bjj",
  },
];

const URL = "https://mateustafuri.com.br/como-estruturar-rifa-solidaria-digital";

const SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": `${URL}#article`,
      headline: "Como estruturar a sua rifa solidária no digital",
      description:
        "Guia completo das cinco etapas da Rifa Solidária: meta, prêmio e parceiros, narrativa, página e tráfego, sorteio e prestação de contas.",
      inLanguage: "pt-BR",
      author: { "@type": "Person", name: "Mateus Tafuri", url: "https://mateustafuri.com.br/sobre" },
      publisher: { "@type": "Person", name: "Mateus Tafuri" },
      mainEntityOfPage: URL,
      about: "Captação de recursos para projetos sociais com rifa solidária",
    },
    {
      "@type": "FAQPage",
      "@id": `${URL}#faq`,
      mainEntity: FAQ.map((f) => ({
        "@type": "Question",
        name: f.p,
        acceptedAnswer: { "@type": "Answer", text: f.r },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: "https://mateustafuri.com.br/" },
        {
          "@type": "ListItem",
          position: 2,
          name: "Rifa Solidária",
          item: "https://mateustafuri.com.br/rifa-solidaria",
        },
        { "@type": "ListItem", position: 3, name: "Como estruturar no digital", item: URL },
      ],
    },
  ],
};

const Bullet = ({ children }: { children: React.ReactNode }) => (
  <li className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground">
    <Check size={16} className="mt-0.5 shrink-0" style={{ color: CORAL }} />
    <span>{children}</span>
  </li>
);

const SecaoEtapa = ({ e }: { e: Etapa }) => (
  <section id={e.id} className="scroll-mt-24 border-t border-border pt-14">
    <div className="flex items-baseline gap-3">
      <span className="font-display text-4xl font-extrabold" style={{ color: CORAL }}>
        {e.n}
      </span>
      <h2 className="font-display text-3xl font-bold md:text-4xl">{e.titulo}</h2>
    </div>
    <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
      {e.pergunta}
    </p>

    <p className="mt-6 rounded-xl bg-muted p-5 leading-relaxed">
      <strong className="font-semibold">Objetivo da etapa:</strong> {e.objetivo}
    </p>

    <div className="mt-6 space-y-4">
      {e.paragrafos.map((p) => (
        <p key={p.slice(0, 30)} className="leading-relaxed text-muted-foreground">
          {p}
        </p>
      ))}
    </div>

    <h3 className="mt-10 font-display text-xl font-bold">As três decisões desta etapa</h3>
    <div className="mt-4 space-y-4">
      {e.decisoes.map((d) => (
        <div key={d.titulo} className="rounded-xl border border-border bg-card p-5">
          <p className="font-display text-base font-bold">{d.titulo}</p>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{d.texto}</p>
          <p className="mt-3 border-l-2 pl-3 text-sm italic leading-relaxed text-foreground/70" style={{ borderColor: CORAL }}>
            {d.exemplo}
          </p>
        </div>
      ))}
    </div>

    <h3 className="mt-10 font-display text-xl font-bold">Os erros mais comuns</h3>
    <ul className="mt-4 space-y-3">
      {e.erros.map((er) => (
        <li key={er} className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground">
          <AlertTriangle size={16} className="mt-0.5 shrink-0 text-destructive" />
          <span>{er}</span>
        </li>
      ))}
    </ul>

    <div className="mt-10 overflow-hidden rounded-2xl" style={{ background: PETROLEO_MEDIO }}>
      <div className="p-6 md:p-7">
        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/45">
          Como foi na prática
        </p>
        <div className="mt-3 flex items-center gap-3">
          <img src={e.case.logo} alt="" className="h-10 w-10 rounded-full object-cover" />
          <p className="font-display text-lg font-bold text-white">{e.case.nome}</p>
        </div>
        <p className="mt-3 leading-relaxed text-white/70">{e.case.texto}</p>
        <div className="mt-5 flex flex-wrap gap-6">
          {e.case.numeros.map((n) => (
            <div key={n.l}>
              <p className="font-display text-xl font-extrabold" style={{ color: CORAL }}>
                {n.v}
              </p>
              <p className="text-xs text-white/45">{n.l}</p>
            </div>
          ))}
        </div>
        <Link
          to={e.case.path}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-green-dark no-underline transition-opacity hover:opacity-90"
        >
          Ver o case completo <ArrowUpRight size={15} />
        </Link>
      </div>
    </div>

    <div className="mt-8 rounded-xl border p-5" style={{ borderColor: "hsl(15 65% 56% / 0.35)" }}>
      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest" style={{ color: CORAL }}>
        <ListChecks size={15} /> Checklist da etapa {e.n}
      </p>
      <ul className="mt-3 space-y-2">
        {e.checklist.map((c) => (
          <Bullet key={c}>{c}</Bullet>
        ))}
      </ul>
    </div>
  </section>
);

const RifaDigital = () => {
  useSeo({
    titulo: "Como estruturar a sua rifa solidária no digital | Mateus Tafuri",
    descricao:
      "Guia completo e gratuito da Rifa Solidária: as cinco etapas, o que decidir em cada uma, os erros mais comuns e o checklist para tirar a campanha do papel.",
    path: "/como-estruturar-rifa-solidaria-digital",
  });

  useEffect(() => {

    /* o React 18 não renderiza <script> dentro do JSX, então o dado
       estruturado entra no head na mão e sai quando a página sai */
    const tag = document.createElement("script");
    tag.type = "application/ld+json";
    tag.textContent = JSON.stringify(SCHEMA);
    document.head.appendChild(tag);
    return () => tag.remove();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <header className="relative overflow-hidden" style={{ background: PETROLEO }}>
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-32 h-[460px] w-[460px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(245,77,43,0.18), transparent 70%)" }}
        />
        <div className="relative mx-auto max-w-3xl px-6 pb-14 pt-28 md:pt-32">
          <Voltar
            fallback="/rifa-solidaria"
            className="inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
          />

          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: CORAL }}>
            Guia completo e gratuito
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold leading-[1.1] text-white md:text-[3.25rem]">
            Como estruturar a sua rifa solidária no digital
          </h1>
          <p className="mt-4 text-lg text-white/65">
            As cinco etapas, destrinchadas, com os números de três campanhas reais.
          </p>

          <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-5 border-t border-dashed border-white/20 pt-6">
            {[
              { r: "O método", v: "Cinco etapas" },
              { r: "Do começo ao sorteio", v: "4 a 5 meses" },
              { r: "Testado em", v: "+10 campanhas" },
              { r: "Mobilizados", v: "+R$ 500 mil" },
            ].map((f) => (
              <div key={f.r}>
                <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
                  {f.r}
                </dt>
                <dd className="mt-1 text-sm font-semibold text-white">{f.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-16">
        {/* índice */}
        <nav aria-label="Índice do guia" className="rounded-2xl bg-muted p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            O que tem neste guia
          </p>
          <ol className="mt-4 space-y-2">
            {INDICE.map((i, n) => (
              <li key={i.id} className="text-sm">
                <a href={`#${i.id}`} className="group flex gap-3 py-2 no-underline">
                  <span className="w-5 shrink-0 tabular-nums text-muted-foreground/60">
                    {String(n + 1).padStart(2, "0")}
                  </span>
                  <span className="text-foreground/80 underline-offset-4 group-hover:underline">
                    {i.label}
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <section id="o-que-e" className="mt-16 scroll-mt-24">
          <h2 className="font-display text-2xl font-bold md:text-3xl">
            O que é uma rifa solidária
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Rifa solidária é uma campanha em que a sua organização sorteia um prêmio, quase sempre
            doado por parceiros, e usa o dinheiro dos bilhetes para financiar um objetivo concreto.
            Ela existe há décadas no talão de papel da porta da igreja. O que mudou é onde ela
            acontece.
          </p>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            No digital, a mesma rifa deixa de depender da rede de conhecidos e passa a alcançar o
            país inteiro. Isso muda tudo para quem trabalha longe dos grandes centros: uma vila
            isolada não arrecada R$ 159 mil vendendo para os vizinhos, mas arrecada quando o
            prêmio é desejável, a história é bem contada e existe mídia levando as duas coisas para
            quem nunca ouviu falar do projeto.
          </p>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            É por isso que a rifa virou método aqui. Ela é uma das poucas ferramentas de captação em
            que o investimento volta no mesmo dia, o que permite escalar com pouco dinheiro em caixa.
            Este guia abre as cinco etapas que aplico em toda campanha, na ordem em que elas precisam
            acontecer.
          </p>
        </section>

        <section id="antes" className="mt-16 scroll-mt-24">
          <h2 className="font-display text-2xl font-bold md:text-3xl">Antes de começar</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Duas coisas precisam estar resolvidas antes da etapa 1, e nenhuma delas é criativa.
          </p>

          <div className="mt-6 rounded-xl border p-6" style={{ borderColor: "hsl(15 65% 56% / 0.35)" }}>
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: CORAL }}>
              A parte legal
            </p>
            <p className="mt-2 leading-relaxed">
              No Brasil, rifa é proibida. A exceção é o sorteio filantrópico, feito por organização
              da sociedade civil com autorização prévia do governo federal. Não existe rifa pequena
              que pode: existe rifa autorizada e rifa ilegal. O pedido leva meses e tem janela de
              prazo, então ele começa antes de tudo.
            </p>
            <Link
              to="/como-legalizar-a-rifa"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold no-underline hover:underline"
              style={{ color: CORAL }}
            >
              Ler o guia de legalização, do CNPJ à prestação de contas <ArrowRight size={15} />
            </Link>
          </div>

          <h3 className="mt-8 font-display text-xl font-bold">O que a organização precisa ter</h3>
          <ul className="mt-4 space-y-2.5">
            <Bullet>CNPJ ativo e estatuto registrado, porque quem faz a campanha é a organização</Bullet>
            <Bullet>Uma pessoa responsável pela campanha, com tempo reservado para ela</Bullet>
            <Bullet>Um perfil em rede social vivo, mesmo que pequeno</Bullet>
            <Bullet>Conta bancária da organização, separada de qualquer conta pessoal</Bullet>
            <Bullet>Fotos e vídeos do trabalho, mesmo feitos no celular</Bullet>
          </ul>
        </section>

        <div className="mt-16 space-y-16">
          {ETAPAS.map((e) => (
            <SecaoEtapa key={e.id} e={e} />
          ))}
        </div>

        <section id="cronograma" className="mt-16 scroll-mt-24 border-t border-border pt-14">
          <h2 className="font-display text-2xl font-bold md:text-3xl">Cronograma de 90 dias</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Uma campanha inteira leva de quatro a cinco meses, da primeira reunião à prestação de
            contas. Este é o desenho que uso. Se a campanha for pedir autorização federal, some o
            prazo do protocolo, que precisa acontecer entre 40 e 120 dias antes do sorteio.
          </p>

          <ol className="mt-8 space-y-5">
            {CRONOGRAMA.map((c) => (
              <li key={c.quando} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <span
                    className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ background: CORAL }}
                  />
                  <span className="mt-1 w-px flex-1 bg-border" />
                </div>
                <div className="pb-1">
                  <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    <Clock size={13} /> {c.quando}
                  </p>
                  <p className="mt-1 font-display text-base font-bold">{c.titulo}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{c.texto}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section id="contas" className="mt-16 scroll-mt-24 border-t border-border pt-14">
          <h2 className="font-display text-2xl font-bold md:text-3xl">
            Quanto custa e para onde vai o dinheiro
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            O valor que aparece na página de venda não é o valor que chega na obra. Monte esta conta
            na etapa 1, antes de definir a meta, para não descobrir no fim que a campanha bateu o
            número e mesmo assim faltou dinheiro.
          </p>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[520px] text-sm">
              <thead>
                <tr className="border-b border-border">
                  {["Para onde vai", "Quanto costuma pesar", "Quando sai"].map((c) => (
                    <th
                      key={c}
                      className="pb-2 text-left text-xs font-semibold uppercase tracking-wider"
                      style={{ color: CORAL }}
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CONTAS.map(([a, b, c]) => (
                  <tr key={a} className="border-b border-border/60 last:border-0">
                    <td className="py-2.5 pr-4 font-medium">{a}</td>
                    <td className="py-2.5 pr-4 text-muted-foreground">{b}</td>
                    <td className="py-2.5 text-muted-foreground">{c}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            Nas três campanhas abertas aqui no site, a mídia ficou entre 20% e 35% do arrecadado e
            devolveu de 2,8 a 3,8 vezes o que consumiu. É o gasto que mais assusta a diretoria e o
            que mais decide o tamanho do resultado.
          </p>
        </section>

        <section id="erros" className="mt-16 scroll-mt-24 border-t border-border pt-14">
          <h2 className="font-display text-2xl font-bold md:text-3xl">
            Os erros que matam uma campanha
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {ERROS_GERAIS.map((e) => (
              <li key={e.titulo} className="rounded-xl border border-border bg-card p-5">
                <p className="flex items-center gap-2 font-display text-base font-bold">
                  <AlertTriangle size={16} className="shrink-0 text-destructive" />
                  {e.titulo}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{e.texto}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="faq" className="mt-16 scroll-mt-24 border-t border-border pt-14">
          <h2 className="font-display text-2xl font-bold md:text-3xl">Perguntas frequentes</h2>
          <div className="mt-6 divide-y divide-border">
            {FAQ.map((f) => (
              <details key={f.p} className="group py-4">
                <summary className="cursor-pointer list-none font-display text-base font-bold marker:hidden">
                  <span className="flex items-start justify-between gap-4">
                    {f.p}
                    <span
                      className="mt-1 shrink-0 text-lg leading-none transition-transform group-open:rotate-45"
                      style={{ color: CORAL }}
                    >
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.r}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-16 border-t border-border pt-14">
          <h2 className="font-display text-2xl font-bold md:text-3xl">
            As campanhas que originaram o método
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Cada uma delas aplicou as mesmas cinco etapas em uma realidade diferente. Os números,
            as peças e o processo inteiro estão abertos.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {CASES.map((c) => (
              <Link
                key={c.path}
                to={c.path}
                className="group rounded-2xl border border-border bg-card p-5 no-underline transition-colors hover:border-foreground/20"
              >
                <div className="flex items-center gap-3">
                  <img src={c.logo} alt="" className="h-9 w-9 rounded-full object-cover" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{c.nome}</p>
                    <p className="text-xs text-muted-foreground">{c.local}</p>
                  </div>
                  <ArrowUpRight
                    size={16}
                    className="ml-auto shrink-0 text-muted-foreground/50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </div>
                <p className="mt-4 font-display text-2xl font-extrabold" style={{ color: CORAL }}>
                  {c.valor}
                </p>
                <p className="mt-1 text-xs leading-snug text-muted-foreground">{c.frase}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-16 rounded-2xl p-8 text-center md:p-10" style={{ background: PETROLEO }}>
          <h2 className="font-display text-2xl font-bold text-white md:text-3xl">
            Agora monte a sua
          </h2>
          <p className="mx-auto mt-3 max-w-xl leading-relaxed text-white/70">
            As 15 perguntas do método em um formulário só, de graça e sem cadastro. Você responde no
            seu ritmo e sai com a campanha desenhada em PDF.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              to="/mapeamento-rifa-solidaria"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white no-underline transition-opacity hover:opacity-90"
              style={{ background: CORAL }}
            >
              Abrir o mapeamento <ArrowRight size={16} />
            </Link>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-sm font-semibold text-white no-underline transition-colors hover:bg-white/10"
            >
              Falar comigo no WhatsApp
            </a>
          </div>
        </section>

        <p className="mt-10 text-xs leading-relaxed text-muted-foreground/70">
          Escrito por Mateus Tafuri, que conduziu mais de dez campanhas de Rifa Solidária em
          comunidades isoladas do Brasil. Os números citados são das campanhas do Dojo Bonete, do
          Dojo Caraíva e do Corumbau BJJ, abertas nas páginas de case. Conteúdo revisado em agosto de
          2026.
        </p>
      </main>

      <Footer />
    </div>
  );
};

export default RifaDigital;
