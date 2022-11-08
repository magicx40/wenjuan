import { createApp } from 'vue'
import '@/assets/css/normalize.css'
import App from '@/App.vue'
import Router from '@/router/index'

const app = createApp(App);

app.use(Router)

app.mount('#app')