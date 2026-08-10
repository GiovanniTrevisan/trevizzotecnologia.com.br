export interface NavItem {
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  { label: 'Cenário', href: '#cenario' },
  { label: 'Serviços', href: '#solucoes' },
  { label: 'Processo', href: '#processo' },
  { label: 'Experiência', href: '#experiencia' },
];

export const heroIndex = [
  { n: '01', label: 'Presença digital' },
  { n: '02', label: 'Automação e IA' },
  { n: '03', label: 'Sistemas sob medida' },
  { n: '04', label: 'Software por assinatura' },
];

export const scenario = [
  { n: '01', title: 'Pouca visibilidade', desc: 'O cliente procura, mas não encontra uma presença digital confiável.' },
  { n: '02', title: 'Atendimento lento', desc: 'Perguntas repetidas ocupam tempo e atrasam novas oportunidades.' },
  { n: '03', title: 'Trabalho manual', desc: 'Processos simples dependem de planilhas, mensagens e retrabalho.' },
  { n: '04', title: 'Ferramentas limitadas', desc: 'Soluções prontas não acompanham a forma real de operar.' },
];

export const helpRows = [
  { n: '01', title: 'Ser encontrado', desc: 'Sites, landing pages, lojas, catálogos e presença no Google.', href: '#presenca' },
  { n: '02', title: 'Atender melhor', desc: 'Automações e inteligência artificial para respostas e organização.', href: '#automacao' },
  { n: '03', title: 'Operar melhor', desc: 'Sistemas e plataformas que centralizam informações e processos.', href: '#sob-medida' },
  { n: '04', title: 'Criar um produto', desc: 'Soluções online que podem gerar receita recorrente e escalar.', href: '#sob-medida' },
];

export const presence = [
  { title: 'Sites, landing pages, lojas e catálogos', desc: 'Estrutura responsiva e alinhada à identidade do negócio.' },
  { title: 'SEO e presença no Google', desc: 'Base técnica para aumentar a capacidade de ser encontrado.' },
  { title: 'Hospedagem, manutenção e suporte', desc: 'Acompanhamento para a solução continuar funcionando.' },
];

export const automation = [
  { from: 'De respostas repetidas', title: 'Para atendimento mais ágil', desc: 'Informações iniciais podem ser organizadas e respondidas com consistência.' },
  { from: 'De dados espalhados', title: 'Para uma visão organizada', desc: 'Registros, pedidos e etapas deixam de depender de várias ferramentas.' },
  { from: 'De tarefas manuais', title: 'Para fluxos automáticos', desc: 'A equipe ganha tempo para as atividades que realmente exigem decisão.' },
];

export const custom = [
  { n: '01', title: 'Sistema personalizado', desc: 'Uma ferramenta criada para o fluxo real da sua empresa.' },
  { n: '02', title: 'Plataforma online', desc: 'Equipe e clientes acessam informações e serviços onde estiverem.' },
  { n: '03', title: 'Software por assinatura', desc: 'Uma solução digital que pode ser comercializada por assinatura.' },
];

export const processPhases = [
  {
    phase: 'Fase 01 · Entender',
    steps: [
      { n: '01', title: 'Diagnóstico', desc: 'Entendimento do cenário, das prioridades e dos objetivos.' },
      { n: '02', title: 'Recomendação', desc: 'Escolha do caminho com melhor relação entre valor e esforço.' },
    ],
  },
  {
    phase: 'Fase 02 · Construir',
    steps: [
      { n: '03', title: 'Escopo', desc: 'Definição clara do que será desenvolvido e entregue.' },
      { n: '04', title: 'Desenvolvimento', desc: 'Construção da solução com acompanhamento próximo.' },
      { n: '05', title: 'Validação', desc: 'Revisão, testes e ajustes antes da publicação.' },
    ],
  },
  {
    phase: 'Fase 03 · Sustentar',
    steps: [
      { n: '06', title: 'Suporte', desc: 'Entrega acompanhada e continuidade quando necessário.' },
    ],
  },
];

export interface Project {
  name: string;
  domain: string;
  href?: string;
  img: string;
  pos: string;
  alt: string;
  solution: string;
  status: string;
  tone: 'green' | 'orange';
  cta: string;
  tags: string[];
  bullets: string[];
}

export const projects: Project[] = [
  {
    name: 'VW Suplementos',
    domain: 'vwsuplementosbh.com.br',
    href: 'https://vwsuplementosbh.com.br',
    img: '/images/case-vw-suplementos.png',
    pos: 'center top',
    alt: 'Site publicado da VW Suplementos BH',
    solution: 'Presença digital para apresentar a marca, os produtos e facilitar o contato com o público.',
    status: 'No ar',
    tone: 'green',
    cta: 'Ver o site',
    tags: ['Site institucional', 'Catálogo', 'WhatsApp', 'Responsivo'],
    bullets: ['Apresentação da marca e dos produtos', 'Contato direto por WhatsApp', 'Publicado e em operação'],
  },
  {
    name: 'Lead Scraper',
    domain: 'Ferramenta interna',
    img: '/images/proto-lead-scraper.png',
    pos: 'left top',
    alt: 'Dashboard do Lead Scraper',
    solution: 'Automação de prospecção e triagem de oportunidades, com pontuação por IA e integração ao ClickUp.',
    status: 'Interno',
    tone: 'orange',
    cta: 'Uso interno',
    tags: ['Node.js', 'React', 'PostgreSQL', 'IA'],
    bullets: ['Prospecção automatizada de negócios locais', 'Pontuação de oportunidades por IA', 'Integração com o ClickUp'],
  },
  {
    name: 'Job Hunter',
    domain: 'trevizzo-job-hunter-web.vercel.app',
    href: 'https://trevizzo-job-hunter-web.vercel.app/',
    img: '/images/proto-job-hunter.png',
    pos: 'left top',
    alt: 'Dashboard do Job Hunter',
    solution: 'Garimpo multi-board de vagas com painel de triagem, score de aderência por IA e acompanhamento de candidaturas.',
    status: 'Interno',
    tone: 'orange',
    cta: 'Ver protótipo',
    tags: ['Node.js', 'React', 'PostgreSQL', 'IA'],
    bullets: ['Garimpo multi-board de vagas', 'Score de aderência por IA', 'Acompanhamento de candidaturas'],
  },
];

export const diagnosisQuestions = [
  { n: '01', text: 'Onde sua empresa está perdendo oportunidades hoje?' },
  { n: '02', text: 'O que consome tempo e poderia ser automatizado?' },
  { n: '03', text: 'Qual solução precisa existir para o negócio avançar?' },
];

export const cities = ['Barueri / Alphaville, SP', 'São Paulo, SP', 'Belo Horizonte, MG', 'Outra cidade'];

export const needOptions = ['Ser encontrado', 'Atender melhor', 'Operar melhor', 'Criar um produto digital', 'Ainda não sei'];

export const footerCols = [
  {
    title: 'Soluções',
    links: [
      { label: 'Presença digital', href: '/#presenca' },
      { label: 'Automação e IA', href: '/#automacao' },
      { label: 'Soluções sob medida', href: '/#sob-medida' },
      { label: 'Nosso processo', href: '/#processo' },
    ],
  },
  {
    title: 'Empresa',
    links: [
      { label: 'Experiência', href: '/#experiencia' },
      { label: 'Perguntas frequentes', href: '/#faq' },
      { label: 'Política de Privacidade', href: '/politica-de-privacidade' },
      { label: 'Termos de Serviço', href: '/termos-de-servico' },
    ],
  },
];

export const locations = [
  { title: 'Barueri / Alphaville', sub: 'São Paulo, SP' },
  { title: 'Belo Horizonte', sub: 'Minas Gerais, MG' },
  { title: 'Atendimento remoto', sub: 'Todo o Brasil' },
];
