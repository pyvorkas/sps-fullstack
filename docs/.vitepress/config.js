// Změna na ESM formát
export default {
  title: 'AutoRent Dokumentace',
  description: 'Dokumentace pro aplikaci správy autopůjčovny',
  themeConfig: {
    nav: [
      { text: 'Domů', link: '/' },
      { text: 'Aplikace', link: 'https://github.com/username/sps-fullstack' }
    ],
    sidebar: [
      {
        text: 'Úvod',
        items: [
          { text: 'O aplikaci', link: '/' },
          { text: 'Instalace a spuštění', link: '/instalace' }
        ]
      },
      {
        text: 'API Dokumentace',
        items: [
          { text: 'Přehled API', link: '/api/' },
          { text: 'Auta', link: '/api/cars' },
          { text: 'Zákazníci', link: '/api/customers' },
          { text: 'Výpůjčky', link: '/api/rentals' }
        ]
      },
      {
        text: 'Architektura',
        items: [
          { text: 'Struktura projektu', link: '/architektura/struktura' },
          { text: 'ER Diagram', link: '/architektura/er-diagram' },
          { text: 'Frontend', link: '/architektura/frontend' },
          { text: 'Backend', link: '/architektura/backend' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/username/sps-fullstack' }
    ],
    footer: {
      message: 'Vytvořeno pomocí VitePress',
      copyright: '© 2023 Martin Rývora'
    }
  }
}
