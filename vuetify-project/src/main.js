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

// Styles
import '@/styles/colors.css'
import '@/styles/mystyle.css'
import '@/styles/buttons.css'

const app = createApp(App)

registerPlugins(app)

app.mount('#app')
