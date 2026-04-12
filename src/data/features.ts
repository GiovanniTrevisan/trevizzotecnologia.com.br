export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export const features: Feature[] = [
  {
    icon: 'palette',
    title: 'Design Profissional',
    description: 'Layout moderno, limpo e otimizado para converter visitantes em clientes.',
  },
  {
    icon: 'search',
    title: 'SEO Completo',
    description: 'Técnicas avançadas para seu negócio aparecer nas buscas do Google.',
  },
  {
    icon: 'map-pin',
    title: 'Google Meu Negócio',
    description: 'Configuração e otimização do perfil para buscas locais na sua região.',
  },
  {
    icon: 'globe',
    title: 'Domínio + Hospedagem',
    description: 'Seu endereço na internet com hospedagem rápida e segura inclusos.',
  },
  {
    icon: 'headphones',
    title: 'Suporte 12 Meses',
    description: 'Alterações de texto, imagens e ajustes via WhatsApp por 1 ano.',
  },
  {
    icon: 'smartphone',
    title: 'Site Responsivo',
    description: 'Funciona perfeitamente no celular, tablet e computador.',
  },
];
