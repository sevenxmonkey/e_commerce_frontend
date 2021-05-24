import axios from 'axios';

const API_KEY = 'KMsTP0PLStuLhUfdZz9MGjqb';

const instance = axios.create({
    baseURL: 'https://api.bestbuy.com/v1/',
    timeout: 5000,
});

const http = {};
http.get = (url, options) => {
    return new Promise((resolve, reject) => {
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

export default {
    product:{
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
                switch(filter){
                    case 0:
                        req.params.sort = 'salePrice.asc';
                        break;
                    case 1:
                        req.params.sort = 'salePrice.dsc';
                        break;
                    case 2:
                        req.params.sort = 'customerReviewAverage.dsc';
                        break;
                    case 4:
                        req.params.sort = 'customerReviewCount.dsc'
                }
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
    },
}
