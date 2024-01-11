/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import { mdiCheckCircleOutline, mdiCloseCircleOutline, mdiCached, mdiPlus, mdiMinus, mdiEye, mdiEyeOff, mdiArrowLeft, mdiArrowRight, mdiMagnify, mdiAlertOctagramOutline, mdiGoogle, mdiAlertCircleOutline } from '@mdi/js'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#1867C0',
          secondary: '#5CBBF6',
        },
      },
    },
  },
  icons: {
    defaultSet: 'mdi',
    aliases: {
      ...aliases,
      eye: mdiEye,
      eyeOff: mdiEyeOff,
      minus: mdiMinus,
      plus: mdiPlus,
      check: mdiCheckCircleOutline,
      close: mdiCloseCircleOutline,
      refresh: mdiCached,
      arrowLeft: mdiArrowLeft,
      arrowRight: mdiArrowRight,
      magnify: mdiMagnify,
      alertOctogram: mdiAlertOctagramOutline,
      google : mdiGoogle,
      alert: mdiAlertCircleOutline
    },
    sets: {
      mdi,
    },
  },
})
