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
import gAuthPlugin from 'vue3-google-oauth2';

let client_id = '623367203604-5gso6i27u38v9n6m7spkij5cqklq8toq.apps.googleusercontent.com'
  

const app = createApp(App)

registerPlugins(app)
app.use(gAuthPlugin, {
    clientId: client_id,
    scope:'email',
    prompt:'consent'
})
app.mount('#app')
