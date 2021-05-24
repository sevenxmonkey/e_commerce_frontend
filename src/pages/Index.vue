<template>
    <div class="container">
        <SideFilter :index="filterIndex" @onFilterChange="onFilterChange"/>
        <ProductList ref="product_list"
            :loading="loading"
            @onPageChange="onPageChange"
        />
    </div>
</template>

<script>
import api from '../apis/interfaces'
import ProductList from '../components/ProductList'
import SideFilter from '../components/SideFilter'

export default {
    name: "Index",
    components:{
        ProductList,
        SideFilter
    },
    data(){
        return {
            //Queries
            event: 'SEARCH',
            key: 'oven stainless steel',
            filterIndex: -1,

            //Paginations
            pageSize: 12,
            page: 1,

            //Loading
            loading: false
        }
    },
    mounted(){
        this.key = this.$route.query.key ? this.$route.query.key : this.key;
        if(this.$route.query.page){
            this.page = this.$route.query.page;
        }
        if(this.$route.query.filter){
            this.filterIndex = Number(this.$route.query.filter);
        }
        this.onSearch();
    },
    methods:{
        async onSearch(){
            this.loading = true;
            this.scrollToTop();
            const res = await api.product.search(this.key, this.page, this.pageSize, this.filterIndex);
            this.$refs['product_list'].renderItems(res.products, this.key);
            this.$refs['product_list'].renderPagination(res.from, res.to, res.total, res.currentPage, res.totalPages);
            this.loading = false;
        },

        async onConfirmSearch(input){
            this.key = input;
            this.page = 1;
            this.onSearch();
        },

        scrollToTop(){
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        },
        onPageChange(pageId){
            const path = this.$route.path 
                + '?key=' + this.key 
                + '&filter=' + this.filterIndex
                + '&page=' + pageId;
            if (this.$route.fullPath !== path) {
                this.$router.push(path);
            }
        },
        onFilterChange(index){
            const path = this.$route.path 
                + '?key=' + this.key 
                + '&filter=' + index
                + '&page=1';
            if (this.$route.fullPath !== path) {
                this.$router.push(path);
            }
        }
    }
}
</script>

<style scoped>
.container{
    margin: 80px 5vw 0 5vw;
    display: flex;
}

</style>