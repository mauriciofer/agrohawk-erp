// eslint-disable-next-line no-undef
const pkg = require('./package')

// eslint-disable-next-line no-undef
const isDev = process.env.NODE_ENV === 'development'
const useEmulators = true // manually change if emulators needed

// eslint-disable-next-line no-undef
module.exports = {
  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    title: 'Agrohawk-erp',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    // CSS file in the project
    '@/assets/css/main.css',
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    {src: '~plugins/vee-validate.js', mode: 'client'},
    {src: '~plugins/vue-the-mask.js', mode: 'client'}
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    '@nuxtjs/vuetify',
    '@nuxtjs/firebase'
  ],

  /*
  ** Firebase module configuration
  */
  firebase: {
    config: {
      apiKey: "AIzaSyBcMlRvGeFQV5TwvuRQ3LmC1X5p7jgYEN0",
      authDomain: "agrohawk-system.firebaseapp.com",
      databaseURL: "https://agrohawk-system.firebaseio.com",
      projectId: "agrohawk-system",
      storageBucket: "agrohawk-system.appspot.com",
      messagingSenderId: "1077176651961",
      appId: "1:1077176651961:web:559e675c6ee009d4098b68",
      measurementId: "G-WFKZPB6631",
    },
    services: {
      auth: true,
      firestore: {
        emulatorPort: 8080
      },
      functions: true
    }
  },

  firestore: {
    memoryOnly: false,
    enablePersistence: true,
    emulatorPort: isDev && useEmulators ? 4000 : undefined,
  },

  vuetify: {
    theme: {
      light: true,  //you don't actually need this line as it's for default
      themes: {
        light: {
          primary: '#8bc34a',
          secondary: '#cddc39',
          accent: '#795548',
          error: '#ff5722',
          warning: '#ffeb3b',
          info: '#03a9f4',
          success: '#4caf50',
          selected: '#F1F8EA'
        }
      }
    }
  },


  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    extend(config, ctx) {
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
      }
    }
  }
}
