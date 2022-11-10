import { createApp } from 'vue'
import '@/assets/css/normalize.css'
import App from '@/App.vue'
import router from '@/router/index'
import {
    // create naive ui
    create,
    // component
    NButton,
    NCarousel,
    NCarouselItem,
    NIcon
} from 'naive-ui'

const naive = create({
    components: [
        NButton,
        NCarousel,
        NCarouselItem,
        NIcon
    ]
})
const app = createApp(App);

app.use(router)
app.use(naive)

app.mount('#app')