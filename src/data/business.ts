/**
 * Dados de negócio ainda NÃO fornecidos pelo Giovanni (dono da Trevizzo).
 *
 * REGRA CENTRAL: todo campo abaixo que estiver vazio/undefined deve ser
 * OMITIDO do JSON-LD gerado em `src/data/schema.ts` — nunca preenchido com
 * um placeholder ou valor inventado (endereço, CEP, telefone, horário ou
 * perfil social fictício desqualifica o Google Business Profile depois e
 * pode ser tratado como spam de dados estruturados). Os builders em
 * `schema.ts` usam um helper de "strip" para remover chaves vazias — não
 * adicione condicionais espalhados nos builders para compensar um campo
 * preenchido aqui com string vazia.
 *
 * ---------------------------------------------------------------------
 * ATENÇÃO — NÚMERO DE WHATSAPP PRECISA DE CONFIRMAÇÃO DO GIOVANNI
 * ---------------------------------------------------------------------
 * `WHATSAPP_NUMBER` em `src/data/config.ts` é `553183336890`: 12 dígitos,
 * ou seja `55` (Brasil) + `31` (DDD de Belo Horizonte) + 8 dígitos de
 * assinante. Um celular brasileiro em E.164 completo tem 13 dígitos (o
 * nono dígito faz parte do número de assinante). Duas hipóteses:
 *   1. É um número de WhatsApp Business vinculado a uma linha fixa (BH
 *      aceita WhatsApp em fixo) — nesse caso 12 dígitos está correto; OU
 *   2. Está faltando o dígito "9" do celular, e o link `wa.me` "funciona"
 *      mesmo incompleto por coincidência de roteamento — o que passaria
 *      despercebido justamente porque ninguém nota um wa.me quebrado.
 * NÃO usar este número como `telephone` em nenhum schema (Organization ou
 * ProfessionalService) até o Giovanni confirmar qual dos dois casos é.
 * ---------------------------------------------------------------------
 */

export interface LocationData {
  /** Rua e número. Vazio é válido — NUNCA inventar. Omitir do JSON-LD se vazio. */
  streetAddress?: string;
  /** Cidade — já conhecida, preenchida abaixo. */
  addressLocality: string;
  /** UF — já conhecida, preenchida abaixo. */
  addressRegion: string;
  /** CEP. Vazio até o Giovanni confirmar. */
  postalCode?: string;
  /**
   * Telefone em E.164 (ex: "+553183336890"). Depende da confirmação do
   * WhatsApp acima — não copiar WHATSAPP_NUMBER para cá sem checar.
   */
  telephone?: string;
}

export interface BusinessData {
  locations: {
    barueri: LocationData;
    bh: LocationData;
  };
  /** E-mail comercial. Não existe nenhum e-mail no repositório hoje — também
   * é uma lacuna de LGPD, pois politica-de-privacidade.astro só oferece o
   * WhatsApp como canal para pedidos de titular de dados. */
  email?: string;
  /** Horário de atendimento, formato schema.org `openingHours` (ex: "Mo-Fr 09:00-18:00"). */
  openingHours?: string;
  /** URLs de perfis sociais (Instagram, LinkedIn, Facebook, etc.) para `sameAs`. */
  sameAs: string[];
}

export const business: BusinessData = {
  locations: {
    barueri: {
      streetAddress: undefined,
      addressLocality: 'Barueri',
      addressRegion: 'SP',
      postalCode: undefined,
      telephone: undefined,
    },
    bh: {
      streetAddress: undefined,
      addressLocality: 'Belo Horizonte',
      addressRegion: 'MG',
      postalCode: undefined,
      telephone: undefined,
    },
  },
  email: undefined,
  openingHours: undefined,
  sameAs: [],
};
