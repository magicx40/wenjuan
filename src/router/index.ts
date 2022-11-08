import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/pages/Home.vue'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: Home
    }
];

const Router = createRouter({
    history: createWebHistory(),
    routes
})

export default Router;