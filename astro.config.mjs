import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // Must stay in sync with SITE_URL in src/data/config.ts.
  site: 'https://trevizzosolucoes.com.br',
  // Declares the trailing-slash convention as a contract instead of letting
  // it stay emergent behavior — canonical URLs, the sitemap and every
  // internal link already assume `/path/`.
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [
    // Left bare on purpose:
    // - no changefreq/priority: this integration only supports one global
    //   value applied to every URL, and Google has said publicly it ignores
    //   both signals — don't let anyone "fix" this into a fake per-page value.
    // - no lastmod: same global-only limitation. `new Date()` would stamp
    //   every URL with the build time on every deploy, which is exactly the
    //   unreliable-lastmod pattern Google discounts.
    // - no filter: the integration already excludes 404/500 on its own via
    //   isStatusCodePage.
    sitemap(),
  ],
});
