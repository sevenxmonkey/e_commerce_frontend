import Vue from 'vue';
import VueRouter from "vue-router";
Vue.use(VueRouter);

const Index = () => import('@/pages/Index');
const ProductDetail = () => import('@/pages/ProductDetail');

export default new VueRouter({
    mode: "history",
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