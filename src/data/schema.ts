import { SITE_URL, SITE_NAME, COMPANY_LEGAL_NAME, COMPANY_CNPJ, abs } from '@/data/config';
import { business } from '@/data/business';
import type { FAQItem } from '@/data/faq';

/**
 * Stable @id values so the graph reconciles into one entity per node
 * instead of Google treating each <script> as a disconnected blob.
 */
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const BUSINESS_ID = {
  bh: `${SITE_URL}/#business-bh`,
  barueri: `${SITE_URL}/#business-barueri`,
} as const;

/**
 * Recursively removes undefined/null/empty-string/empty-array values from
 * an object so builders never emit an invented or placeholder field. This
 * is the single place that enforces "empty in business.ts => omitted from
 * JSON-LD" instead of sprinkling `if (x)` through every builder.
 */
function stripEmpty<T>(value: T): T {
  if (Array.isArray(value)) {
    const arr = value.map((v) => stripEmpty(v)).filter((v) => v !== undefined);
    return (arr.length ? arr : undefined) as unknown as T;
  }
  if (value !== null && typeof value === 'object') {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      const cleaned = stripEmpty(v);
      if (cleaned === undefined || cleaned === null || cleaned === '') continue;
      out[k] = cleaned;
    }
    return out as T;
  }
  return value;
}

type City = 'bh' | 'barueri';

const CITY_LABEL: Record<City, string> = {
  bh: 'Belo Horizonte',
  barueri: 'Barueri / Alphaville',
};

const CITY_AREA_SERVED: Record<City, Record<string, unknown>[]> = {
  bh: [
    { '@type': 'City', name: 'Belo Horizonte' },
    { '@type': 'AdministrativeArea', name: 'Minas Gerais' },
  ],
  barueri: [
    { '@type': 'City', name: 'Barueri' },
    { '@type': 'AdministrativeArea', name: 'São Paulo' },
  ],
};

/**
 * OfferCatalog for the three service lines. Lives on the Organization (not
 * on a ProfessionalService — see localBusiness()). Each Service already
 * points at its future page URL; those pages (`/criacao-de-sites/`,
 * `/automacao-e-ia/`, `/sistemas-sob-medida/`) don't exist yet — Package C
 * creates them. That is intentional: the URL is stable ahead of the page.
 */
export function offerCatalog() {
  return {
    '@type': 'OfferCatalog',
    name: 'Soluções digitais',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Criação de sites',
          description: 'Sites, landing pages, lojas, catálogos, SEO e presença no Google.',
          url: abs('criacao-de-sites/'),
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Automação e IA',
          description: 'Automações e inteligência artificial aplicadas a atendimento e organização de informações.',
          url: abs('automacao-e-ia/'),
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Sistemas sob medida',
          description: 'Sistemas e plataformas desenvolvidos para o fluxo real da empresa.',
          url: abs('sistemas-sob-medida/'),
        },
      },
    ],
  };
}

/**
 * Organization node. Pass `includeOfferCatalog: true` only on pages where
 * the offer catalog content actually renders (home, future service pages).
 */
export function organization(opts: { includeOfferCatalog?: boolean } = {}) {
  // Only build a contactPoint when there is an actual contact field to put
  // in it — a bare {'@type':'ContactPoint'} with nothing else is noise, not
  // data, and stripEmpty() alone wouldn't catch that (the @type key itself
  // is never empty).
  const contactPoint = business.email
    ? stripEmpty({
        '@type': 'ContactPoint',
        email: business.email,
        telephone: business.locations.bh.telephone,
        contactType: 'customer service',
        availableLanguage: 'Portuguese',
      })
    : undefined;

  return stripEmpty({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE_NAME,
    legalName: COMPANY_LEGAL_NAME,
    url: SITE_URL,
    // Raster, not the SVG — better support in the Knowledge Panel at >=112px.
    logo: abs('images/icon-512.png'),
    taxID: COMPANY_CNPJ,
    foundingDate: '2026-04',
    parentOrganization: { '@type': 'Organization', name: 'Grupo Yuzan' },
    sameAs: business.sameAs,
    contactPoint,
    subOrganization: [{ '@id': BUSINESS_ID.bh }, { '@id': BUSINESS_ID.barueri }],
    hasOfferCatalog: opts.includeOfferCatalog ? offerCatalog() : undefined,
  });
}

/**
 * One ProfessionalService node per city, each with exactly ONE address —
 * the previous single entity with two PostalAddress objects in one
 * `address` array was invalid modeling. No `description` (would leak the
 * calling page's description — see the Layout.astro bug this replaces), no
 * `priceRange` (deprecated for rich results) and no `geo` (no real address
 * to derive coordinates from; inventing them is worse than omitting).
 */
export function localBusiness(city: City) {
  const loc = business.locations[city];
  const address = stripEmpty({
    '@type': 'PostalAddress',
    streetAddress: loc.streetAddress,
    addressLocality: loc.addressLocality,
    addressRegion: loc.addressRegion,
    postalCode: loc.postalCode,
    addressCountry: 'BR',
  });

  return stripEmpty({
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': BUSINESS_ID[city],
    name: `${SITE_NAME} — ${CITY_LABEL[city]}`,
    url: SITE_URL,
    parentOrganization: { '@id': ORG_ID },
    address,
    telephone: loc.telephone,
    email: business.email,
    areaServed: CITY_AREA_SERVED[city],
    // Precisa bater com o horário declarado no Google Business Profile —
    // divergência de NAP prejudica o sinal de consistência na busca local.
    openingHoursSpecification: business.openingHours?.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.dayOfWeek,
      opens: h.opens,
      closes: h.closes,
    })),
  });
}

/**
 * WebSite node, home page only. No potentialAction/SearchAction — Google
 * removed the sitelinks searchbox in 2024.
 */
export function website() {
  return stripEmpty({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: SITE_NAME,
    url: SITE_URL,
    publisher: { '@id': ORG_ID },
    inLanguage: 'pt-BR',
  });
}

export function webPage(opts: { url: string; name: string; description: string; breadcrumbId?: string }) {
  return stripEmpty({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${opts.url}#webpage`,
    url: opts.url,
    name: opts.name,
    description: opts.description,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORG_ID },
    inLanguage: 'pt-BR',
    breadcrumb: opts.breadcrumbId ? { '@id': opts.breadcrumbId } : undefined,
  });
}

export function faqPage(items: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

export function breadcrumb(trail: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Service node for the future `/criacao-de-sites/`, `/automacao-e-ia/` and
 * `/sistemas-sob-medida/` pages (Package C). Exported now, unused until
 * those pages exist.
 */
export function service(opts: { name: string; description: string; url: string; serviceType?: string }) {
  return stripEmpty({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: opts.name,
    description: opts.description,
    url: opts.url,
    serviceType: opts.serviceType,
    provider: { '@id': ORG_ID },
  });
}
