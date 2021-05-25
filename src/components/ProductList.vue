<template>
  <div class="productlist-container">
    <!-- Top info -->
    <div v-show="!loading" class="page-top">
      <div class="t-key">{{ keyword }}</div>
      <div>
        <span >Viewing 
          <b>{{ pagination.from }}</b>-
          <b>{{ pagination.to }}</b> of 
          <b>{{ pagination.total }}</b> products
        </span>
      </div>
    </div>

    <!-- Products -->
    <div v-show="!loading" class="items">
      <ProductCard v-for="item of products" :key="item.sku" :item="item" />
    </div>

    <!-- Pagination -->
    <div v-show="!loading" class="pagination">
        <div class="btn-pagenav" @click="onClickPage(page - 1)">Prev</div>
        <div class="pages">
            <div class="btn-page" v-if="page > 3"
                @click="onClickPage(1)">1</div>
            <div v-if="page > 4">...</div>

            <div class="btn-page"
                v-for="pageId of pages" :key="pageId"
                :class="pageId === page ? 'active' : ''"
                @click="onClickPage(pageId)">{{pageId}}</div>

            <div v-if="pagination.totalPages > 5 && page + 2 < pagination.totalPages">...</div>
            <div class="btn-page" v-if="pagination.totalPages > 5 && page + 2 < pagination.totalPages"
                :class="pagination.totalPages === page ? 'active' : ''"
                @click="onClickPage(pagination.totalPages)">{{pagination.totalPages}}</div>
        </div>
        <div class="btn-pagenav" @click="onClickPage(page + 1)">Next</div>
    </div>

    <div v-show="loading">loading</div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ProductCard from "../components/ProductCard";

export default {
  name: "ProductList",
  components: { ProductCard },
  computed:{
    ...mapState([
      'products', 
      'keyword', 
      'sortIndex', 
      'page', 
      'pagination', 
      'loading'
    ]),
    pages(){
      let pages = [];
      let totalPages = Number(this.pagination.totalPages);
      let page = Number(this.page);
      if(totalPages <= 5){
        for(let i = 0; i < totalPages; i++){
          pages.push(i + 1);
        }
      }else{
        let init = Math.max(1, page - 2);
        for(let i = 0; i < 5; i++){
          if(init + i > totalPages) break;
          pages.push(init + i);
        }
      }
      return pages;
    }
  },
  methods: {
    onClickPage(pageId){
        if(pageId === this.pagination.currentPage || 
            pageId <= 0 || 
            pageId > this.pagination.totalPages){
            return;
        }
        const path = this.$route.path 
                + '?key=' + this.keyword 
                + '&sort=' + this.sortIndex
                + '&page=' + pageId;
        if (this.$route.fullPath !== path) {
            this.$router.push(path);
        }
    }
  },
};
</script>

<style scoped>
.productlist-container {
  margin: 10px;
}

.page-top, .pagination {
  width: 1200px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-wrap: wrap;
}

.pagination{
    margin: 30px 0;
}

.pages{
    display: flex;
}

.btn-pagenav, .btn-page{
    cursor: pointer;
    height: 20px;
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 50px;
    padding: 5px;
    text-align: center;
    transition: all .2s;
}

.btn-pagenav:hover, .btn-page:hover{
    background-color: rgba(0, 0, 0, 0.2);
}

.pages .active{
    color: white;
    background-color: rgba(0, 0, 0, 0.9);
}

.btn-pagenav{
    width: 50px;
}

.btn-page{
    min-width: 20px;
    margin: 0 3px;
}

.t-key {
  font-size: 32px;
  font-weight: 700;
}

.items {
  display: flex;
  flex-wrap: wrap;
}

@media only screen and (max-width: 1730px) {
  .page-top, .pagination {
    width: 900px;
  }
}


@media only screen and (max-width: 1400px) {
  .page-top, .pagination {
    width: 600px;
  }
}

@media only screen and (max-width: 1060px) {
  .page-top, .pagination {
    width: 300px;
  }
}
</style>