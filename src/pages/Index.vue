<template>
    <div class="container">
        <SideFilter />
        <ProductList />
    </div>
</template>

<script>
import { mapMutations, mapActions} from 'vuex'
import ProductList from '../components/ProductList'
import SideFilter from '../components/SideFilter'

export default {
    name: "Index",
    components:{ ProductList, SideFilter },
    async mounted(){
        this.setKeyword(this.$route.query.key ? this.$route.query.key : 'oven stainless steel');
        this.setPage(this.$route.query.page ? this.$route.query.page: 1);
        this.setSort(this.$route.query.sort ? Number(this.$route.query.sort): -1);
        await this.search();
    },
    methods:{
        ...mapMutations([
            'setProducts', 
            'setKeyword',
            'setPage',
            'setSort'
        ]),

        ...mapActions(['search']),
    }
}
</script>

<style scoped>
.container{
    margin: 80px 5vw 0 5vw;
    display: flex;
}

</style>