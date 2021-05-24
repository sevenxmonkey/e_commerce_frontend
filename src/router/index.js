import Vue from 'vue';
import VueRouter from "vue-router";

const Index = () => import('@/pages/Index');
const ProductDetail = () => import('@/pages/ProductDetail');
Vue.use(VueRouter);

export default new VueRouter({
    mode: "history",
    base: '/',
    routes: [
        {
            path: '/', 
            redirect: 'search'
        },{
            path: '/search',
            component: Index,
            name: 'Index'
        },{
            path: '/product/:sku',
            component: ProductDetail,
            name: 'ProductDetail'
        }
    ]
})