import TerserPlugin from 'terser-webpack-plugin'

module.exports = {
  modules: [
    '@nuxtjs/onesignal',
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    '@nuxtjs/bulma',
    '@nuxtjs/pwa',
    '@nuxtjs/vuetify',
  ],
  oneSignal: {
    init: {
      appId: "1dc91fb3-db09-4248-b48c-71285960f03f",
      allowLocalhostAsSecureOrigin: true,
      welcomeNotification: {
        disable: true
      }
    }
  },
  axios: {
    // baseURL: "https://sujecookie.xyz/api/",
    baseURL: "http://localhost:8080/api/"
  },
  // pwa: {
  //   manifest: {
  //     name: 'Nerly',
  //   },
  //   workbox: {
  //     importScripts: [
  //       'custom-sw.js'
  //     ],
  //   }

  // },
  /*
  ** Headers of the page
  */
  head: {
    title: '널리',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          cache: true,
          parallel: false
        })
      ]
    },
    /*
    ** Run ESLint on save
    */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

