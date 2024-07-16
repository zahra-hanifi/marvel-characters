// https://nuxt.com/docs/api/configuration/nuxt-config

import { config } from 'dotenv'

config()
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@nuxt/image', '@nuxtjs/tailwindcss'],
  image: {
    // Options
  },
  runtimeConfig: {
    public: {
      marvelPublicKey: process.env.MARVEL_PUBLIC_KEY,
      baseURL: process.env.BASE_URL
    },
    marvelPrivateKey: process.env.MARVEL_PRIVATE_KEY,
  }
})