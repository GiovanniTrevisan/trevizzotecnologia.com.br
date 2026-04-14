import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://trevizzosolucoes.com.br',
  integrations: [sitemap()],
});
