export default defineNuxtConfig({
  devtools: { enabled: true },
    css: ['vuetify/lib/styles/main.sass','@mdi/font/css/materialdesignicons.min.css'],
    build: {
      transpile: ['vuetify'],
    },
    imports: {
      dirs: ['stores'],
    },
    vite: {
      define: {
        'process.env.DEBUG': false,
      },
    },
    runtimeConfig: {
      public: {
        PORT: process.env.PORT
      }
    }   
  })

