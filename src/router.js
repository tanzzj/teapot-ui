import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '@views/index/index.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'index',
        component: index
    }
]

const router = new VueRouter({
    mode: 'history',
    base: '',
    routes
})

export default router