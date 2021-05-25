export default {
    /**
     * DATA from API(s)
     */
    setProducts: (state, payload) => { state.products = payload },
    setKeyword: (state, payload) => { state.keyword = payload },
    setPage: (state, payload) => { state.page = payload },
    setSort: (state, payload) => { state.sortIndex = payload },
    setPagination: (state, payload) => { state.pagination = payload },

    /**
     * UI controllers
     */
    loading: state => { state.loading = true },
    unloading: state => { state.loading = false },
}