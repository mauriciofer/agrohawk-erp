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
    {src: '~plugins/vee-validate.js', mode: 'client'}
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
    /*config: {
      apiKey: "AIzaSyBcMlRvGeFQV5TwvuRQ3LmC1X5p7jgYEN0",
      authDomain: "agrohawk-system.firebaseapp.com",
      databaseURL: "https://agrohawk-system.firebaseio.com",
      projectId: "agrohawk-system",
      storageBucket: "agrohawk-system.appspot.com",
      messagingSenderId: "1077176651961",
      appId: "1:1077176651961:web:559e675c6ee009d4098b68",
      measurementId: "G-WFKZPB6631",
    }, */
    config: {
      apiKey: "AIzaSyC47If7TQS_n8y8lrr7BkPHYXCwFZ13VrI",
      authDomain: "agrohawk-68b5c.firebaseapp.com",
      databaseURL: "https://agrohawk-68b5c.firebaseio.com",
      projectId: "agrohawk-68b5c",
      storageBucket: "agrohawk-68b5c.appspot.com",
      messagingSenderId: "233414458883",
      appId: "1:1077176651961:web:559e675c6ee009d4098b68",
      measurementId: "G-WFKZPB6631",
    },
    services: {
      auth: true,
      firestore: true,
      functions: true
    }
  },
  
  firestore: {
    memoryOnly: false, // default
    chunkName: process.env.NODE_ENV !== 'production' ? 'firebase-auth' : '[id]', // default
    enablePersistence: true,
    emulatorPort: 8080,
    emulatorHost: 'localhost',
    settings: {
      // Firestore Settings - currently only works in SPA mode
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
