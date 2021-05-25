require('dotenv').config({ path: '../../.env'})
import axios from 'axios';

const API_KEY = process.env.VUE_APP_API_KEY;
const BASE_URL = process.env.VUE_APP_BESTBUY_API_URL;

const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
});

const http = {};
http.get = (url, options) => {
    return new Promise((resolve, reject) => {
        console.log(BASE_URL)
        instance.get(url, options)
        .then(response => {
            if(response.status === 200){
                resolve(response.data);
            }else{
                reject(response.message);
            }
        }).catch(e => {
            console.log(e);
        })
    })
}

const FILTERS = [
    'salePrice.asc', 
    'salePrice.dsc', 
    'customerReviewAverage.dsc', 
    'customerReviewCount.dsc'
]

export default {
    /**
     * Search products
     * @param {String} str input string
     * @return {Object} HTTP response
     */
    search(str, page, pageSize, filter){
        let query = '';
        if(str){
            const queryBuilder = str.split(' ').map(x => 
                'search=' + String(x.toLowerCase().trim())).join('&');
            query = `products(${queryBuilder})`;
        }
        const req = {
            params: {
                format: 'json',
                show: "image,name,salePrice,regularPrice,sku",
                apiKey: API_KEY,
                page: page,
                pageSize: pageSize
            }
        };
        if(filter >= 0){
            req.params.sort = FILTERS[filter];
        }
        return http.get(query, req);
    },

    /**
     * Returns the product document by sku
     * @param {String} sku 
     * @return {Object} HTTP response
     */
    getBySku(sku){
        return http.get(`products/${sku}.json?apiKey=${API_KEY}`);
    }
}
