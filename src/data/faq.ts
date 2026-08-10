export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

export const faqItems: FAQItem[] = [
  {
    category: 'Início',
    question: 'Como começa um projeto com a Trevizzo?',
    answer:
      'Pelo diagnóstico. Em uma conversa entendemos o cenário, as prioridades e os objetivos. Depois disso você recebe uma recomendação de caminho e uma proposta com escopo definido.',
  },
  {
    category: 'Investimento',
    question: 'Quanto custa?',
    answer:
      'Depende do escopo. Como as soluções variam entre presença digital, automação e sistemas sob medida, o valor é apresentado na proposta, após o diagnóstico, com o que será desenvolvido e entregue descrito de forma clara.',
  },
  {
    category: 'Prazo',
    question: 'Quanto tempo leva?',
    answer:
      'O prazo é definido junto com o escopo. Projetos de presença digital são mais curtos que sistemas e plataformas, e o cronograma é combinado antes do início do desenvolvimento.',
  },
  {
    category: 'Tecnologia',
    question: 'Vocês escolhem a tecnologia antes ou depois?',
    answer:
      'Depois. A solução é definida pelo problema, não pelo nome da tecnologia. A escolha técnica acontece na etapa de recomendação, considerando a relação entre valor e esforço.',
  },
  {
    category: 'IA',
    question: 'Como a inteligência artificial entra nos projetos?',
    answer:
      'Como ferramenta, em pontos onde reduz trabalho repetitivo: organização de informações, respostas iniciais consistentes e fluxos automáticos. As decisões seguem com as pessoas.',
  },
  {
    category: 'Continuidade',
    question: 'O que acontece depois da entrega?',
    answer:
      'A entrega é acompanhada, com revisão, testes e ajustes antes da publicação. A continuidade, quando necessária, é combinada no escopo: hospedagem, manutenção e suporte.',
  },
];
