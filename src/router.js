import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '@views/index/index.vue'
import login from '@views/login/login.vue'
import database from '@views/database/database.vue'
import orders from '@views/orders/orders.vue'
import projects from '@views/projects/projects.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'index',
        component: index,
        children: [{
            path: '/database',
            name: 'database',
            component: database
        },{
            path: '/orders',
            name: 'orders',
            component: orders
        },{
            path: '/projects',
            name: 'projects',
            component: projects
        }]
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