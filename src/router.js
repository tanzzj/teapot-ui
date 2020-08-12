import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '@views/index/index.vue'
import login from '@views/login/login.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'index',
        component: index,
    },
    {
        path: "/login",
        name: login,
        component: login
    }
]

const router = new VueRouter({
    mode: 'history',
    base: '',
    routes
})

export default router