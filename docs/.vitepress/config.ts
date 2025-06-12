import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "My SmartHub",
  description: "My smart home ecosystem, for my connected house.",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
    ],

    // sidebar: [
    //   {
    //     text: 'Le projet',
    //     items: [
    //       { text: 'Mon besoin', link: '/projet' },
    //       { text: 'Mes sources d\'inspiration', link: '/projet/inspiration' }
    //     ]
    //   }
    // ],

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
