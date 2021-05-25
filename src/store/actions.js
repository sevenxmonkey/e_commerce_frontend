import api from '../apis/products';

export default {
    /**
     * Search products by router params
     * @param {Store.context}
     */
    async search({ commit, dispatch, state }) {
        commit('loading');
        try {
            //DATA
            const res = await api.search(state.keyword, state.page,
                state.PAGE_SIZE, state.sortIndex);
            const products = res.products;
            const pagination = {
                from: res.from, to: res.to, total: res.total,
                totalPages: res.totalPages, currentPage: res.currentPage
            };
            commit('setPage', res.currentPage);
            commit('setPagination', pagination);
            commit('setProducts', products);

            //UI
            dispatch('scrollToTop');
            commit('unloading');
        } catch (e) {
            console.log("search error");
        }
    },

    /**
     * Smooth scroll to window top
     */
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }
}
