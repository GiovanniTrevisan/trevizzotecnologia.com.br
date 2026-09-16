export const WHATSAPP_NUMBER = '553183336890';
export const WHATSAPP_MESSAGE =
  'Olá! Vim pelo site da Trevizzo e gostaria de entender qual solução faz sentido para a minha empresa.';
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
// No trailing slash — must stay in sync with `site` in astro.config.mjs.
export const SITE_URL = 'https://trevizzosolucoes.com.br';
export const SITE_NAME = 'Trevizzo Soluções';
export const COMPANY_LEGAL_NAME = 'Trevizzo Tecnologia e Consultoria em Informática LTDA';
export const COMPANY_CNPJ = '48.676.032/0001-38';

/**
 * Resolves a path against SITE_URL, always producing an absolute URL.
 * Use this instead of string-concatenating `${SITE_URL}...` — that pattern
 * silently depended on SITE_URL carrying a trailing slash.
 */
export const abs = (p: string) => new URL(p, SITE_URL + '/').href;

/**
 * Chave de acesso do Web3Forms, usada para gravar o lead do formulário de
 * diagnóstico num destino durável antes de abrir o WhatsApp.
 *
 * POR QUE ISSO EXISTE: o formulário só chamava `window.open('https://wa.me/…')`.
 * Se um bloqueador de pop-up impedisse a abertura — ou se a aba fosse fechada
 * antes do envio — o lead sumia sem registro nenhum, do lado do site e do lado
 * da empresa. Não havia como sequer saber que ele existiu.
 *
 * COMO ATIVAR: pegue uma chave gratuita em https://web3forms.com (informe o
 * e-mail que deve receber os leads; a chave chega por e-mail) e cole abaixo.
 * Cada envio passa a chegar nesse e-mail além de abrir o WhatsApp.
 *
 * Enquanto estiver vazia, o envio se comporta exatamente como antes: nenhuma
 * requisição é feita, nenhum erro aparece. O fallback de pop-up bloqueado
 * funciona independentemente desta chave.
 *
 * Não é segredo: chaves do Web3Forms são públicas por design (o formulário é
 * client-side) e só servem para entregar no e-mail cadastrado.
 */
export const LEAD_FORM_KEY = '';
