export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

export const faqItems: FAQItem[] = [
  {
    category: 'Entrega',
    question: 'Quanto tempo leva para o site ficar pronto?',
    answer:
      'Até 7 dias úteis após o envio das informações do seu negócio. Em alguns casos entregamos antes — depende só de quão rápido você nos passa o material (fotos, textos, contato).',
  },
  {
    category: 'Operação',
    question: 'Preciso entender de tecnologia?',
    answer:
      'Não. A gente cuida 100% da parte técnica: design, programação, SEO, domínio, hospedagem e Google Meu Negócio. Você só precisa nos contar sobre o seu negócio em uma conversa de 30 minutos.',
  },
  {
    category: 'Contrato',
    question: 'O que acontece depois dos 12 meses?',
    answer:
      'Você pode renovar o suporte por um valor reduzido ou seguir só com o site funcionando. O domínio, a hospedagem e o site continuam seus para sempre. Sem fidelidade, sem multa.',
  },
  {
    category: 'Operação',
    question: 'Como funciona o suporte?',
    answer:
      'Suporte direto por WhatsApp com um dos sócios — sem ticket, sem fila, sem robô. Alterações de texto, troca de fotos, novos horários e pequenos ajustes estão inclusos durante os 12 meses.',
  },
  {
    category: 'Escopo',
    question: 'Vocês fazem sites com várias páginas ou e-commerce?',
    answer:
      'Nosso pacote principal é a landing page de alta conversão, otimizada para captar clientes locais. Para projetos maiores (várias páginas, catálogo, e-commerce), preparamos um orçamento personalizado — fala com a gente.',
  },
  {
    category: 'SEO',
    question: 'Meu site vai aparecer em primeiro no Google?',
    answer:
      'Posição depende de muitos fatores (concorrência, histórico, região). O que garantimos é aplicar todas as boas práticas de SEO técnico e local — schema, velocidade, Google Meu Negócio, conteúdo otimizado — para maximizar suas chances nos resultados locais.',
  },
  {
    category: 'Pagamento',
    question: 'Como é o pagamento?',
    answer:
      '12x de R$99,90 no cartão de crédito (sem juros) ou R$1.198,80 à vista no Pix com 5% de desconto. Tudo via plataforma de pagamento segura. A produção começa após a confirmação.',
  },
  {
    category: 'Garantia',
    question: 'E se eu não gostar do resultado?',
    answer:
      'Antes do site ir ao ar, você aprova layout, textos e fotos. Fazemos ajustes até estar 100% alinhado. Caso, mesmo após os ajustes, você desista nos primeiros 7 dias após o lançamento, devolvemos integralmente o valor pago.',
  },
];
