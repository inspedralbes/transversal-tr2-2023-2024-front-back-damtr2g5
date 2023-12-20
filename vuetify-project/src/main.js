/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'
import vue3GoogleLogin from 'vue3-google-login'

// Styles
import '@/styles/colors.css'
import '@/styles/mystyle.css'
import '@/styles/buttons.css'

const app = createApp(App)
app.use(vue3GoogleLogin, {
    clientId: '623367203604-11shkn3cp83canks96p23oo7j9v23dkf.apps.googleusercontent.com'
  }) 
registerPlugins(app)
app.mount('#app')
