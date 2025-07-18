import { createApp } from 'vue'
import App from './App.vue'
import VueTheMask from 'vue-the-mask'
import '@/assets/styles/adaptive.css'

const app = createApp(App)

app.use(VueTheMask)

app.mount('#app')

