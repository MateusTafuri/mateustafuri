import {
  Calendar,
  CircleDollarSign,
  Camera,
  CircleDot,
  Eye,
  Flag,
  Handshake,
  Lightbulb,
  Megaphone,
  MousePointerClick,
  PlayCircle,
  RefreshCw,
  Ticket,
  Trophy,
  User,
  type LucideIcon,
} from "lucide-react";

export const WHATSAPP =
  "https://wa.me/5567998860067?text=Oi%20Mateus!%20Vim%20pela%20p%C3%A1gina%20da%20Rifa%20Solid%C3%A1ria%20e%20quero%20falar%20sobre%20a%20minha%20causa.";

export type BlocoCanvas = {
  icon: LucideIcon;
  emoji: string;
  title: string;
  pergunta: string;
  /* Vira o placeholder do campo: mostra o formato da resposta, nunca o conteúdo */
  exemplo: string;
  dica: string;
};

export type Etapa = {
  n: number;
  title: string;
  emoji: string;
  chamada: string;
  pergunta: string;
  objetivo: string;
  precisaTitulo: string;
  precisa: string[];
  aprender: string[];
  entregaveis: string[];
  canvas: BlocoCanvas[];
};

export const ETAPAS: Etapa[] = [
  {
    n: 1,
    title: "Sonhar",
    emoji: "⭐",
    chamada: "Antes de pensar em prêmio, defina onde você quer chegar.",
    pergunta: "O que queremos alcançar, e por quê?",
    objetivo:
      "Sair do “precisamos arrecadar dinheiro” e chegar a uma meta clara, alcançável e amarrada a uma transformação que dá pra mostrar.",
    precisaTitulo: "Uma causa que as pessoas queiram apoiar",
    precisa: [
      "Um objetivo claro: o que exatamente a campanha vai construir",
      "Uma transformação visível, que dá pra mostrar depois",
      "Uma meta financeira alcançável, não aspiracional",
    ],
    aprender: [
      "Como conduzir o briefing inicial e sair do “queremos arrecadar dinheiro”",
      "Como definir um objetivo claro e amarrado a um resultado concreto",
      "Como desenhar a transformação visível por trás da campanha",
      "Como chegar a uma meta realista para o tamanho da sua causa",
    ],
    entregaveis: [
      "Objetivo e meta da campanha definidos por escrito",
      "Transformação visível desenhada: o que muda e dá pra mostrar",
      "Briefing alinhado com toda a equipe da organização",
    ],
    canvas: [
      {
        icon: CircleDot,
        emoji: "❓",
        title: "Por quê",
        pergunta: "Qual problema real a organização quer resolver com esse dinheiro?",
        exemplo:
          "Ex.: as aulas acontecem num galpão sem cobertura. Quando chove, 60 crianças ficam sem atividade.",
        dica: "Seu porquê deve emocionar quem nunca ouviu falar de vocês.",
      },
      {
        icon: Flag,
        emoji: "🎯",
        title: "Meta",
        pergunta: "Quanto precisa ser arrecadado, e o que exatamente esse valor cobre?",
        exemplo: "Ex.: R$ 30 mil — R$ 22 mil de material e R$ 8 mil de mão de obra.",
        dica: "Sua meta deve ser alcançável.",
      },
      {
        icon: Lightbulb,
        emoji: "🌱",
        title: "Transformação",
        pergunta: "O que muda, na prática, quando a meta for batida?",
        exemplo:
          "Ex.: sala coberta e com piso, aberta o ano inteiro, e a turma passa de 60 para 100 crianças.",
        dica: "Deve ser algo que dá pra fotografar.",
      },
    ],
  },
  {
    n: 2,
    title: "Ofertar",
    emoji: "🎁",
    chamada: "O prêmio certo faz a pessoa querer participar, mesmo sem conhecer a sua causa.",
    pergunta: "Qual experiência inesquecível vamos sortear e quem serão os parceiros?",
    objetivo:
      "Montar uma oferta desejável e construir parcerias estratégicas com troca real de valor: o parceiro fortalece a causa e ganha mídia e visibilidade de volta.",
    precisaTitulo: "Uma oferta que faça a pessoa querer participar",
    precisa: [
      "Um prêmio desejável: uma experiência única ou vários ganhadores",
      "Parceiros estratégicos com credibilidade e audiência",
      "Uma troca de valor clara para cada parceiro",
    ],
    aprender: [
      "Como escolher a rota do prêmio: experiência única ou vários ganhadores",
      "Como mapear e escolher parceiros estratégicos a dedo",
      "Como apresentar a proposta e conduzir a conversa com o parceiro",
      "Como estruturar a troca de valor: o que cada parceiro ganha em mídia",
    ],
    entregaveis: [
      "Prêmio definido e garantido com os parceiros",
      "Parcerias fechadas e alinhadas, com contrapartidas claras",
      "Troca de valor acordada: o que cada parceiro ganha em visibilidade",
    ],
    canvas: [
      {
        icon: Handshake,
        emoji: "🤝",
        title: "Parceiro certo",
        pergunta: "Quem entra como parceiro, e o que ele leva de volta?",
        exemplo:
          "Ex.: a pousada da região doa 2 diárias e aparece nos posts, no vídeo de lançamento e no sorteio.",
        dica: "A troca precisa ser clara dos dois lados.",
      },
      {
        icon: Trophy,
        emoji: "🏆",
        title: "Prêmio",
        pergunta: "Que prêmio faria alguém participar mesmo sem conhecer o projeto?",
        exemplo:
          "Ex.: um fim de semana para duas pessoas, com hospedagem, passeio de barco e jantar.",
        dica: "Seu prêmio deve ser desejável.",
      },
      {
        icon: Ticket,
        emoji: "🎟️",
        title: "Bilhete",
        pergunta: "Quanto custa o bilhete e quantos precisam ser vendidos para bater a meta?",
        exemplo: "Ex.: bilhete de R$ 25, 1.200 vendidos para chegar nos R$ 30 mil.",
        dica: "Preço x bilhetes tem que fechar a meta da etapa 1.",
      },
    ],
  },
  {
    n: 3,
    title: "Contar",
    emoji: "📣",
    chamada: "Uma causa boa que ninguém conhece não arrecada. A narrativa resolve isso.",
    pergunta: "Como vamos contar essa história?",
    objetivo:
      "Transformar a história real da sua organização em roteiro, peças e um calendário que sustenta semanas de conteúdo antes do lançamento.",
    precisaTitulo: "Alcançar mais pessoas do que o seu círculo",
    precisa: [
      "Uma história real, com pessoas no centro",
      "Peças e criativos que traduzam a causa",
      "Um calendário de conteúdo antes do lançamento",
    ],
    aprender: [
      "Como encontrar a história por trás da campanha: pessoas, não números",
      "Como estruturar a narrativa e o roteiro do vídeo de lançamento",
      "Como produzir criativos com poucos recursos: gravação e edição",
      "Como montar o calendário de pré-campanha de 2 semanas",
    ],
    entregaveis: [
      "História da campanha encontrada e roteirizada",
      "Vídeo de lançamento e peças de apoio produzidos",
      "Calendário de pré-campanha pronto: posts, destaques e bio",
    ],
    canvas: [
      {
        icon: User,
        emoji: "🎤",
        title: "Protagonista",
        pergunta: "Quem é o rosto que carrega essa campanha?",
        exemplo:
          "Ex.: a coordenadora que fundou o projeto, com duas famílias atendidas contando a rotina.",
        dica: "Seu protagonista deve ser real.",
      },
      {
        icon: PlayCircle,
        emoji: "🎬",
        title: "Formato",
        pergunta: "Qual é o roteiro do vídeo e quais peças saem dele: reels, carrossel, flyer?",
        exemplo:
          "Ex.: vídeo de 2 min com a história da coordenadora. Dele saem 3 reels, 1 carrossel e o flyer do prêmio.",
        dica: "Um roteiro bom vira várias peças. Reels conecta mais que o produzido.",
      },
      {
        icon: Calendar,
        emoji: "📅",
        title: "Calendário",
        pergunta: "O que sai em cada semana, antes e durante a campanha?",
        exemplo:
          "Ex.: semana 1, bastidores e contagem regressiva. Semana 2, vídeo de lançamento. Depois, 3 posts por semana até o sorteio.",
        dica: "Precisa sustentar conteúdo da pré-campanha até o sorteio.",
      },
    ],
  },
  {
    n: 4,
    title: "Escalar",
    emoji: "🚀",
    chamada: "É aqui que a campanha sai do grupo da família e chega no Brasil inteiro.",
    pergunta: "Como levamos isso pra mais gente?",
    objetivo:
      "Colocar no ar uma página que converte e um investimento em mídia que se paga com as próprias vendas da campanha.",
    precisaTitulo: "Ganhar escala de verdade",
    precisa: [
      "Uma página de vendas que converte visitante em apoiador",
      "Investimento em tráfego que se paga com as primeiras vendas",
      "Números acompanhados de perto durante a campanha",
    ],
    aprender: [
      "Como montar a anatomia de uma boa página de vendas",
      "Como ativar a divulgação orgânica: influenciadores, imprensa e listas",
      "Como rodar tráfego pago e testar criativos até chegar na escala",
      "Quais números acompanhar todos os dias durante a campanha",
    ],
    entregaveis: [
      "Página de vendas no ar, com compra em passo único",
      "Divulgação orgânica ativada e rodando",
      "Tráfego pago otimizado, financiado pelas primeiras vendas",
    ],
    canvas: [
      {
        icon: MousePointerClick,
        emoji: "🛒",
        title: "Plataforma",
        pergunta: "Qual plataforma vai vender os bilhetes?",
        exemplo: "Ex.: página própria, compra em uma etapa, Pix e cartão, sem cadastro.",
        dica: "A compra precisa acontecer em poucos cliques.",
      },
      {
        icon: Megaphone,
        emoji: "🗣️",
        title: "Alcance orgânico",
        pergunta: "Quais influenciadores parceiros podem abraçar essa causa?",
        exemplo:
          "Ex.: 4 perfis locais que já visitaram o projeto, o jornal da cidade e 2 grupos de WhatsApp do bairro.",
        dica: "Deve vir de quem já confia em você.",
      },
      {
        icon: CircleDollarSign,
        emoji: "💰",
        title: "Tráfego pago",
        pergunta: "Qual será nossa estratégia de tráfego pago?",
        exemplo:
          "Ex.: começar com R$ 50 por dia em 3 criativos e escalar só o que vender bilhete abaixo de R$ 30.",
        dica: "Deve manter só o que der ROI.",
      },
    ],
  },
  {
    n: 5,
    title: "Retribuir",
    emoji: "❤️",
    chamada: "É a etapa que faz o apoiador de hoje virar o apoiador da próxima campanha.",
    pergunta: "Como prestamos contas e agradecemos a quem apoiou?",
    objetivo:
      "Fechar o ciclo com credibilidade: quem apoiou precisa ver o sorteio, a entrega do prêmio e o resultado que ajudou a construir.",
    precisaTitulo: "Retribuir a quem confiou: parceiros e apoiadores",
    precisa: [
      "Um sorteio conduzido com transparência",
      "A entrega do prêmio documentada",
      "Prestação de contas para apoiadores e parceiros",
    ],
    aprender: [
      "Como conduzir um sorteio ao vivo com credibilidade e regras claras",
      "Como documentar e comunicar o encerramento da campanha",
      "Como entregar o prêmio e dar suporte no pós-campanha",
      "Como retribuir os parceiros e prestar contas de todo o resultado",
    ],
    entregaveis: [
      "Sorteio realizado ao vivo, com regras claras",
      "Prêmio entregue e cada etapa documentada",
      "Prestação de contas publicada: o que o dinheiro construiu",
    ],
    canvas: [
      {
        icon: Eye,
        emoji: "👀",
        title: "Transparência",
        pergunta: "Como o sorteio e a entrega do prêmio vão ser públicos?",
        exemplo:
          "Ex.: sorteio ao vivo no Instagram pela Loteria Federal, com a entrega do prêmio gravada e postada.",
        dica: "Nem o resultado nem a entrega podem deixar dúvida.",
      },
      {
        icon: Camera,
        emoji: "📸",
        title: "Prova do resultado",
        pergunta: "Que foto, vídeo ou documento prova que a meta virou realidade?",
        exemplo:
          "Ex.: foto da sala coberta com a turma dentro, no mesmo ângulo da foto do galpão vazio.",
        dica: "É a transformação da etapa 1, agora em imagem.",
      },
      {
        icon: RefreshCw,
        emoji: "💌",
        title: "Relacionamento",
        pergunta: "Como mantemos contato com quem apoiou depois da campanha?",
        exemplo:
          "Ex.: lista de transmissão com quem comprou bilhete e um post de prestação de contas por trimestre.",
        dica: "Quem apoiou hoje é quem apoia a próxima.",
      },
    ],
  },
];

export const PALETA = {
  petroleo: "hsl(176 39% 14%)",
  petroleoMedio: "hsl(178 36% 22%)",
  coral: "hsl(15 65% 56%)",
};
