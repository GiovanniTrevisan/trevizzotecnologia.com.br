import type { FAQItem } from '@/data/faq';
import { projects, type Project } from '@/data/site';

/**
 * One body-copy subsection of a service page: either a pair of flowing
 * paragraphs, or a short "term + description" list (the copy's bolded
 * lead-ins, e.g. "Site institucional. Para empresas que...").
 */
export interface ServiceBodySection {
  heading: string;
  paragraphs?: string[];
  items?: { term: string; desc: string }[];
}

export interface ServiceDef {
  slug: 'criacao-de-sites' | 'automacao-e-ia' | 'sistemas-sob-medida';
  /** Nav / footer / cross-link label. */
  navLabel: string;
  title: string;
  description: string;
  kicker: string;
  heroWords: string[];
  accentFrom: number;
  lead: string;
  /** Background theme for the new ServiceBody copy block — alternates
   * against whichever existing homepage section (dark or light) is reused
   * right below it, so the page keeps the same light/dark rhythm as the
   * homepage instead of stacking three dark sections in a row. */
  bodyTheme: 'light' | 'dark';
  sections: ServiceBodySection[];
  /** id of the reused homepage section rendered on this page (PresencaDigital
   * -> #presenca, AutomacaoIA -> #automacao, SobMedida -> #sob-medida). Used
   * for the hero's secondary CTA so it doesn't point at the homepage-only
   * `#solucoes` anchor. */
  ctaSecondary: { label: string; href: string };
  faqSpecific: FAQItem[];
  /** faq.ts `category` values to pull in alongside the page-specific
   * questions. Chosen so the six generic questions are spread across the
   * three service pages instead of all six repeating on every page. */
  faqGenericCategories: string[];
  experienceItems: Project[];
}

const vwSuplementos = projects.find((p) => p.domain === 'vwsuplementosbh.com.br')!;
const leadScraper = projects.find((p) => p.name === 'Lead Scraper')!;
const jobHunter = projects.find((p) => p.name === 'Job Hunter')!;

export const services: ServiceDef[] = [
  {
    slug: 'criacao-de-sites',
    navLabel: 'Criação de sites',
    title: 'Criação de sites para empresas | Trevizzo Soluções',
    description:
      'Criação de sites, landing pages, lojas e catálogos para empresas. Estrutura responsiva, base técnica de SEO e hospedagem com suporte. Comece pelo diagnóstico.',
    kicker: 'Presença digital',
    heroWords: ['Criação', 'de', 'sites', 'que', 'o', 'cliente', 'encontra', 'e', 'entende.'],
    accentFrom: 6,
    lead: 'Sites, landing pages, lojas e catálogos construídos para que o próximo passo do cliente seja simples.',
    bodyTheme: 'light',
    ctaSecondary: { label: 'Ver o que construímos', href: '#presenca' },
    sections: [
      {
        heading: 'Quando um site precisa existir',
        paragraphs: [
          'Boa parte das empresas não perde cliente por falta de qualidade. Perde porque, no momento em que alguém procura, não encontra nada confiável para olhar. Um telefone sem contexto, um perfil parado, uma página de terceiros com informação desatualizada. A decisão acontece antes do primeiro contato, e acontece com quem tem o que mostrar.',
          'Criar um site é resolver isso de forma direta: um endereço próprio, com a informação certa, que funciona no celular e que o Google consegue ler.',
        ],
      },
      {
        heading: 'O que construímos',
        items: [
          {
            term: 'Site institucional.',
            desc: 'Para empresas que precisam apresentar o que fazem, para quem, e como serem contactadas. É a base — e para a maioria dos negócios, é o suficiente.',
          },
          {
            term: 'Landing page.',
            desc: 'Uma página só, com um objetivo só. Usada quando existe uma campanha, um serviço específico ou um público definido a converter.',
          },
          {
            term: 'Loja e catálogo.',
            desc: 'Quando os produtos precisam ser navegados, comparados e pedidos. O catálogo resolve a apresentação; a loja resolve a venda. Nem todo negócio precisa da segunda.',
          },
          {
            term: 'Base técnica de SEO.',
            desc: 'Estrutura de títulos, dados estruturados, sitemap, tempo de carregamento e versão mobile. Não é promessa de primeira posição — é a condição para disputar a posição.',
          },
        ],
      },
      {
        heading: 'Como funciona',
        paragraphs: [
          'O projeto começa por um diagnóstico gratuito, não por um orçamento. Antes de falar em páginas e prazos, entendemos onde a empresa está perdendo oportunidade hoje. Às vezes a resposta é um site. Às vezes é outra coisa, e dizemos isso.',
          'Depois do diagnóstico você recebe uma recomendação de caminho e uma proposta com escopo definido: o que será construído, o que será entregue, em quanto tempo. Sem escopo aberto.',
        ],
      },
      {
        heading: 'Depois da publicação',
        paragraphs: [
          'Hospedagem, manutenção e suporte entram no escopo quando fazem sentido. Um site publicado e abandonado volta a ser o problema que ele resolveu — links quebram, informação envelhece, certificado expira. A continuidade é combinada antes, não improvisada depois.',
          // Not in the approved copy doc verbatim — added to satisfy the plan's
          // §2.4/§2.1 requirement that Barueri live as a paragraph here and
          // that the BH page be linked from somewhere other than the footer.
          // Kept to one factual, unembellished sentence in the same voice.
          'Atendemos empresas de Barueri, Alphaville e da região metropolitana de Belo Horizonte, com o mesmo processo remoto. Veja o case de uma empresa de BH em criação de sites em Belo Horizonte.',
        ],
      },
    ],
    faqSpecific: [
      {
        category: 'Criação de sites',
        question: 'Vocês usam WordPress ou constroem do zero?',
        answer:
          'Depende do que a empresa precisa manter sozinha depois. A escolha técnica acontece na recomendação, considerando quem vai operar o site no dia a dia.',
      },
      {
        category: 'Criação de sites',
        question: 'Meu site atual pode ser aproveitado?',
        answer:
          'Às vezes sim. No diagnóstico avaliamos se vale reformar ou refazer; reformar costuma ser mais caro quando a base está comprometida.',
      },
      {
        category: 'Criação de sites',
        question: 'O site já vem preparado para aparecer no Google?',
        answer:
          'Vem com a base técnica pronta. Aparecer bem depende também de conteúdo e de tempo — indexação não é instantânea.',
      },
    ],
    faqGenericCategories: ['Início', 'Continuidade'],
    experienceItems: [vwSuplementos],
  },
  {
    slug: 'automacao-e-ia',
    navLabel: 'Automação e IA',
    title: 'Automação de atendimento e IA para empresas | Trevizzo',
    description:
      'Automação de atendimento no WhatsApp, organização de informações e fluxos automáticos com inteligência artificial aplicada ao processo real da empresa.',
    kicker: 'Automação e IA',
    heroWords: ['Automação', 'e', 'IA', 'para', 'devolver', 'tempo', 'ao', 'seu', 'time.'],
    // accentFrom=3 ("para…") mirrors sistemas-sob-medida's identical
    // "X para Y" grammar, so the accented clause is the full benefit clause,
    // not just its back half.
    accentFrom: 3,
    lead: 'Respostas repetidas, dados espalhados e tarefas manuais deixam de ocupar quem deveria estar decidindo.',
    bodyTheme: 'dark',
    ctaSecondary: { label: 'Ver onde a automação entra', href: '#automacao' },
    sections: [
      {
        heading: 'O custo do trabalho repetido',
        paragraphs: [
          'Toda empresa tem um conjunto de perguntas que se repete. Horário, preço, prazo, disponibilidade, "vocês atendem na minha região". Responder é necessário. Responder manualmente, cinquenta vezes por semana, é o que trava a operação.',
          'O mesmo vale para o que acontece depois: pedidos anotados em um lugar, contatos em outro, o acompanhamento em uma planilha que só uma pessoa entende.',
        ],
      },
      {
        heading: 'Onde a automação entra',
        items: [
          {
            term: 'Atendimento inicial.',
            desc: 'As perguntas previsíveis passam a ser respondidas com consistência, no mesmo canal em que o cliente já está. O que exige decisão continua chegando a uma pessoa — com contexto, não do zero.',
          },
          {
            term: 'Organização de informações.',
            desc: 'Registros, pedidos e etapas param de depender de várias ferramentas desconectadas. Uma visão só, atualizada pelo próprio fluxo de trabalho.',
          },
          {
            term: 'Fluxos automáticos.',
            desc: 'O que hoje é "depois eu passo isso para a planilha" vira uma etapa que acontece sozinha. Menos retrabalho, menos informação perdida no caminho.',
          },
        ],
      },
      {
        heading: 'Onde a IA entra — e onde não entra',
        paragraphs: [
          'A inteligência artificial entra como ferramenta, em pontos onde reduz trabalho repetitivo: interpretar uma mensagem em texto livre, classificar um pedido, resumir um histórico, organizar informação que chegou desestruturada.',
          'Não entra como substituto de decisão. Aprovar, negociar, atender um caso fora do padrão — isso segue com as pessoas. Uma automação que decide sozinha o que não deveria custa mais caro que o trabalho manual que ela substituiu.',
        ],
      },
      {
        heading: 'Como começa',
        paragraphs: [
          'Pelo diagnóstico. Antes de automatizar, é preciso saber o que consome tempo de verdade — e a resposta quase nunca é o que parece de fora. Automatizar um processo mal desenhado só faz o erro acontecer mais rápido.',
        ],
      },
    ],
    faqSpecific: [
      {
        category: 'Automação e IA',
        question: 'Isso substitui minha equipe?',
        answer:
          'Não. Substitui a parte repetitiva do que sua equipe faz, para que o tempo dela vá para o que exige julgamento.',
      },
      {
        category: 'Automação e IA',
        question: 'Funciona no WhatsApp que já uso?',
        answer: 'Na maioria dos casos sim. O canal existente costuma ser o ponto de partida, não algo a ser trocado.',
      },
      {
        category: 'Automação e IA',
        question: 'E se a automação responder errado?',
        answer:
          'O escopo define o que ela pode e não pode responder. Fora desse limite, a conversa vai para uma pessoa em vez de arriscar uma resposta.',
      },
    ],
    faqGenericCategories: ['IA', 'Tecnologia'],
    experienceItems: [leadScraper, jobHunter],
  },
  {
    slug: 'sistemas-sob-medida',
    navLabel: 'Sistemas sob medida',
    title: 'Sistemas sob medida e desenvolvimento de software | Trevizzo',
    description:
      'Desenvolvimento de sistemas e plataformas sob medida para o fluxo real da empresa, incluindo produtos digitais que podem ser comercializados por assinatura.',
    kicker: 'Sistemas sob medida',
    heroWords: ['Sistemas', 'sob', 'medida', 'para', 'o', 'jeito', 'que', 'você', 'opera.'],
    accentFrom: 3,
    lead: 'Quando a ferramenta pronta obriga a empresa a mudar o processo, o problema deixou de ser de configuração.',
    bodyTheme: 'light',
    ctaSecondary: { label: 'Ver o que desenvolvemos', href: '#sob-medida' },
    sections: [
      {
        heading: 'O limite da ferramenta pronta',
        paragraphs: [
          'Software de prateleira resolve o caso médio. É por isso que ele é barato e é por isso que, a partir de certo ponto, ele para de servir: a empresa começa a adaptar a operação à ferramenta, em vez do contrário. Aparecem as planilhas paralelas, os campos usados para outra coisa, o processo que "todo mundo sabe" mas não está em lugar nenhum.',
          'O sinal é sempre o mesmo — o trabalho de verdade acontece fora do sistema.',
        ],
      },
      {
        heading: 'O que desenvolvemos',
        items: [
          {
            term: 'Sistema interno.',
            desc: 'Uma ferramenta construída para o fluxo que a empresa já tem, em vez de um fluxo genérico que ela precisa adotar. Cadastros, etapas, permissões e relatórios conforme a operação real.',
          },
          {
            term: 'Plataforma online.',
            desc: 'Quando equipe, clientes ou parceiros precisam acessar informação e serviços de onde estiverem, com níveis de acesso diferentes.',
          },
          {
            term: 'Software por assinatura.',
            desc: 'Quando a solução que resolve o problema da sua empresa também resolve o de outras, ela pode deixar de ser custo e virar produto — com receita recorrente e capacidade de escalar. Esse caminho é avaliado no diagnóstico, não presumido.',
          },
        ],
      },
      {
        heading: 'Tecnologia vem depois',
        paragraphs: [
          'A escolha técnica acontece na etapa de recomendação, depois de entender o problema. Um sistema definido pelo nome da tecnologia antes de existir escopo costuma custar duas vezes: uma para construir, outra para refazer.',
        ],
      },
      {
        heading: 'Construção acompanhada',
        paragraphs: [
          'O desenvolvimento acontece em etapas, com acompanhamento próximo — escopo, construção, validação. Revisão, testes e ajustes vêm antes da publicação, não depois do problema aparecer em produção.',
          'Quando faz sentido, a continuidade entra no escopo: manutenção, evolução e suporte. Um sistema interno tende a crescer junto com a empresa; isso é previsto desde o início.',
        ],
      },
    ],
    faqSpecific: [
      {
        category: 'Sistemas sob medida',
        question: 'Quanto tempo leva um sistema?',
        answer:
          'Mais que um site, e o prazo é definido junto com o escopo. Projetos grandes são divididos em entregas, não em uma entrega única no fim.',
      },
      {
        category: 'Sistemas sob medida',
        question: 'O código fica comigo?',
        answer:
          // The approved copy links "Termos de Serviço" inline; FAQ.astro renders
          // item.answer as plain text (no set:html) and is on the do-not-touch
          // list, so the link is spelled out as plain text instead of markup.
          'A propriedade intelectual é tratada no contrato. Ver os Termos de Serviço, em /termos-de-servico/.',
      },
      {
        category: 'Sistemas sob medida',
        question: 'Posso começar pequeno?',
        answer:
          'É o recomendado. Um escopo inicial enxuto que entra em uso valida mais do que um sistema completo que demora a existir.',
      },
    ],
    faqGenericCategories: ['Investimento', 'Prazo'],
    experienceItems: [leadScraper, jobHunter],
  },
];

export function getService(slug: ServiceDef['slug']): ServiceDef {
  const found = services.find((s) => s.slug === slug);
  if (!found) throw new Error(`Unknown service slug: ${slug}`);
  return found;
}
