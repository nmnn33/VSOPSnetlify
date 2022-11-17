import { createRouter, createWebHistory } from 'vue-router';
import homePage from '../views/homePage.vue';
import orderDetailsPage from '../views/orderDetailsPage.vue';
import ordersPage from '../views/ordersPage.vue';
import dbQueryResultPage from '../views/dbQueryResultPage.vue'

//Tämän alle pistetään ne reitit. Mukaan polku, reitin nimi ja komponentti. Reittien välillä liikkuminen tapahtuu RouterLink komponenteilla.
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
    },
    {
        path: '/tilaukset/:id',
        name: 'Order Details',
        component: orderDetailsPage,
        props: true,
    },
    {
        path: '/hakutulos/:firstName',
        name: 'dbQueryResult',
        component: dbQueryResultPage
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router