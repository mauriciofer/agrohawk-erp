const pkg = require('./package')

module.exports = {
  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
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
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
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
      firestore: true,
      functions: true
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
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      
    }
  }
}
