export interface Testimonial {
  name: string;
  business: string;
  location: string;
  quote: string;
  avatarColor: string;
}

export const testimonials: Testimonial[] = [
  {
    name: 'Dona Márcia',
    business: 'Salão de Beleza',
    location: 'Barueri, SP',
    quote: 'Antes eu dependia só de indicação. Agora clientes me acham no Google e ligam direto. Melhor investimento!',
    avatarColor: '#DDD6FE',
  },
  {
    name: 'Seu Carlos',
    business: 'Mat. de Construção',
    location: 'BH, MG',
    quote: 'Meu filho vivia dizendo que eu precisava de um site. A Trevizzo fez tudo — nem precisei mexer no computador.',
    avatarColor: '#FED7AA',
  },
  {
    name: 'Rafaela',
    business: 'Confeitaria',
    location: 'Alphaville, SP',
    quote: 'Eu já vendia pelo Instagram, mas quando apareci no Google as encomendas dobraram. Em 7 dias!',
    avatarColor: '#FBCFE8',
  },
];
