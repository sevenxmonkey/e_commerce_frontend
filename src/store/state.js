export default {
    /**
    * Product list
    */
    products: [],

    /**
     * Searching keyword
     */
    keyword: 'oven stainless steel', 

    /**
     * Sorting
     * 0: salePrice.asc
     * 1: salePrice.dsc'
     * 2: customerReviewAverage.dsc
     * 3: customerReviewCount.dsc
     * -1: Default Order
     */
    sortIndex: -1,

    /**
     * Pagination
     */
    PAGE_SIZE: 12,
    page: 1,
    pagination: { 
        from: 0, 
        to: 0, 
        total: 0, 
        totalPages: 0
    },
}