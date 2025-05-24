// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  runtimeConfig: {
    CurseforgeAPIKey: process.env.CURSEFORGE_API_KEY,
    public: {
      VersioningFileName: process.env.VERSIONING_FILE_NAME
    }
  },
  devtools: { enabled: false },
  modules: [
    '@nuxt/icon',
    'shadcn-nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/image',
  ],
  colorMode: {
    classSuffix: ''
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  },
  css: ['~/assets/css/tailwind.css'],
  vite: {
  plugins: [
    tailwindcss(),
  ],
  
},
})