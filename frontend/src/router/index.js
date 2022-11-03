import { createRouter, createWebHistory } from 'vue-router';
import homePage from '../views/homePage.vue';
import orderDetailsPage from '../views/orderDetailsPage.vue';
import ordersPage from '../views/ordersPage.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: homePage
    },
    {
        path: '/tilaukset',
        name: 'Orders',
        component: ordersPage
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router