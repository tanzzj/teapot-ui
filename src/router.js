import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '@views/index/index.vue'
import login from '@views/login/login.vue'
import database from '@views/database/database.vue'
import orders from '@views/orders/orders.vue'
import projects from '@views/projects/projects.vue'
import projectOrders from '@views/projects/orders/orders.vue'
import projectDatabase from '@views/projects/database/database.vue'

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
        }, {
            path: '/orders',
            name: 'orders',
            component: orders
        }, {
            path: '/projects',
            name: 'projects',
            component: projects,
            children: [
                {
                    path: '/orders',
                    name: 'projectOrders',
                    component: projectOrders
                },
                {
                    path: '/database',
                    name: 'projectDatabase',
                    component: projectDatabase
                }]
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