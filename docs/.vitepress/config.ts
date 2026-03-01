import { defineConfig } from 'vitepress'
import kroki from '@kazumatu981/markdown-it-kroki'
import mark from 'markdown-it-mark'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "My SmartHub",
  description: "My smart home ecosystem, for my connected house.",
  markdown: {
    config: (md) => {
      md.use(kroki, {
        entrypoint: process.env.KROKI_ENDPOINT ?? 'https://kroki.io',
        imageFormat: 'png',
        useImg: true
      })

      md.use(mark)
    }
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Le projet', link: '/projet/' },
      { text: 'Infrastructure', link: '/infrastructure/' },
    ],

    // Sidebar contextuelle (par préfixe d’URL)
    // Configuration volontairement simple (déclarative).
    sidebar: {
      '/infrastructure/': [
        {
          text: 'Infrastructure',
          items: [{ text: 'Vue d’ensemble', link: '/infrastructure/' }]
        }
      ],
      '/projet/': [
        {
          text: 'Projet',
          items: [
            { text: 'Vue d’ensemble', link: '/projet/' },
            { text: 'Inspiration', link: '/projet/inspiration' },
            {
              text: 'Guide de conception',
              items: [
                { text: 'Principe directeur', link: '/projet/design-guide/' },
                {
                  text: 'ADR',
                  collapsed: true,
                  items: [
                    { text: 'Liste des ADR', link: '/projet/design-guide/adr/' },
                    {
                      text: 'ADR-0001 : Type d\'installation Home Assistant',
                      link: '/projet/design-guide/adr/adr-0001-installation-home-assistant-stack-docker'
                    },
                    {
                      text: 'ADR-0002 : Segmentation réseau',
                      link: '/projet/design-guide/adr/adr-0002-segmentation-reseau-vlans-iot'
                    },
                    {
                      text: 'ADR-0003 : Zigbee dongle SLZB-06M',
                      link: '/projet/design-guide/adr/adr-0003-zigbee-dongle-sm-light-slzb-06m-poe'
                    },
                    {
                      text: 'ADR-0004 : Accès distant (Nabu Casa)',
                      link: '/projet/design-guide/adr/adr-0004-acces-distant-home-assistant-cloud-nabu-casa'
                    },
                    {
                      text: 'ADR-0005 : Sauvegarde et restauration',
                      link: '/projet/design-guide/adr/adr-0005-sauvegarde-restauration-nas-synology'
                    },
                    {
                      text: 'ADR-0006 : Mises à jour via Renovate',
                      link: '/projet/design-guide/adr/adr-0006-gestion-mises-a-jour-docker-renovate'
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      '/': [
        {
          text: 'Accueil',
          items: [{ text: 'Mon SmartHub', link: '/' }]
        },
        {
          text: 'Projet',
          items: [
            { text: 'Vue d’ensemble', link: '/projet/' },
            { text: 'Inspiration', link: '/projet/inspiration' },
            {
              text: 'Guide de conception',
              items: [
                { text: 'Principe directeur', link: '/projet/design-guide/' },
                {
                  text: 'ADR',
                  collapsed: true,
                  items: [
                    { text: 'Liste des ADR', link: '/projet/design-guide/adr/' },
                    {
                      text: 'ADR-0001 : Type Installation Home Assistant',
                      link: '/projet/design-guide/adr/adr-0001-installation-home-assistant-stack-docker'
                    },
                    {
                      text: 'ADR-0002 : Segmentation réseau',
                      link: '/projet/design-guide/adr/adr-0002-segmentation-reseau-vlans-iot'
                    },
                    {
                      text: 'ADR-0003 : Zigbee dongle SLZB-06M',
                      link: '/projet/design-guide/adr/adr-0003-zigbee-dongle-sm-light-slzb-06m-poe'
                    },
                    {
                      text: 'ADR-0004 : Accès distant (Nabu Casa)',
                      link: '/projet/design-guide/adr/adr-0004-acces-distant-home-assistant-cloud-nabu-casa'
                    },
                    {
                      text: 'ADR-0005 : Sauvegarde et restauration',
                      link: '/projet/design-guide/adr/adr-0005-sauvegarde-restauration-nas-synology'
                    },
                    {
                      text: 'ADR-0006 : Mises à jour via Renovate',
                      link: '/projet/design-guide/adr/adr-0006-gestion-mises-a-jour-docker-renovate'
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },

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
