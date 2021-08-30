import { createRouter, createWebHistory, RouteRecordRaw, routerViewLocationKey } from 'vue-router'
import ContentPage from '../components/AdminPageComponents/content-page.vue'
import TemplateStore from '../components/templates/template-store.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: ContentPage
    },
    {
        path: '/:id',
        name: 'template-store',
        component: TemplateStore,
        props: true
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router