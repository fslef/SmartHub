import { defineConfig } from 'vitepress'
import kroki from '@kazumatu981/markdown-it-kroki'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "My SmartHub",
  description: "My smart home ecosystem, for my connected house.",
  markdown: {
    config: (md) => {
      md.use(kroki, {
        entrypoint: process.env.KROKI_ENDPOINT ?? 'https://kroki.io',
        imageFormat: 'svg',
        useImg: true
      })
    }
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Infrastructure', link: '/infrastructure/' },
    ],

    sidebar: [
      {
        text: 'Le projet',
        items: [
          { text: 'Mon besoin', link: '/projet' },
          { text: 'Mes sources d\'inspiration', link: '/projet/inspiration' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/fslef/smarthub' }
    ],

    search: {
      provider: 'local'
    }
  },
  locales: {
    root: {
      label: 'French',
      lang: 'fr'
    },
    fr: {
      label: 'English',
      lang: 'en', // optional, will be added  as `lang` attribute on `html` tag
      link: '/en/'

      // other locale specific properties...
    }
  }
})
