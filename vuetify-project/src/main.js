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
    clientId: '608372389845-k6s6i8sau0ed5i898qhle4n6tuheqd2v.apps.googleusercontent.com',
    
  }) 
registerPlugins(app)
app.mount('#app')
