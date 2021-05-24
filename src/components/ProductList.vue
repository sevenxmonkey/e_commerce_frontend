<template>
  <div class="productlist-container">
    <!-- Top info -->
    <div v-show="!this.loading" class="page-top">
      <div class="t-key">{{ key }}</div>
      <div>
        <span >Viewing <b>{{ from }}</b>-<b>{{ to }}</b> of <b>{{ total }}</b> products</span>
      </div>
    </div>

    <!-- Products -->
    <div v-show="!loading" class="items">
      <ProductCard v-for="item of items" :key="item.sku" :item="item" />
    </div>

    <!-- Pagination -->
    <div v-show="!this.loading" class="pagination">
        <div class="btn-pagenav" @click="onClickPage(currentPage - 1)">Prev</div>
        <div class="pages">
            <div class="btn-page" v-if="currentPage > 3"
                @click="onClickPage(1)">1</div>
            <div v-if="currentPage > 4">...</div>

            <div class="btn-page"
                v-for="pageId of pages" :key="pageId"
                :class="pageId === currentPage ? 'active' : ''"
                @click="onClickPage(pageId)">{{pageId}}</div>

            <div v-if="totalPages > 5 && currentPage + 2 < totalPages">...</div>
            <div class="btn-page" v-if="totalPages > 5 && currentPage + 2 < totalPages"
                :class="totalPages === currentPage ? 'active' : ''"
                @click="onClickPage(totalPages)">{{totalPages}}</div>
        </div>
        <div class="btn-pagenav" @click="onClickPage(currentPage + 1)">Next</div>
    </div>

    <div v-show="loading">loading</div>
  </div>
</template>

<script>
import ProductCard from "../components/ProductCard";

export default {
  name: "ProductList",
  components: { ProductCard },
  props:{
    loading: Boolean
  },
  data() {
    return {
      key: "",
      items: [],
      from: 0,
      to: 0,
      total: 0,
      currentPage: 1,
      totalPages: 0,

      pages: [],
    };
  },
  mounted() {},
  methods: {
    renderItems(items, key) {
      this.items = items;
      this.key = key;
    },
    renderPagination(from, to, total, currentPage, totalPages) {
      this.from = from;
      this.to = to;
      this.total = total;
      this.currentPage = currentPage;
      this.totalPages = totalPages;

      //Build pagination by neareat 5 pages
      this.pages = [];
      if(totalPages <= 5){
          for(let i = 0; i < totalPages; i++){
              this.pages.push(i + 1);
          }
      }else{
          let init = Math.max(1, this.currentPage - 2);
          for(let i = 0; i < 5; i++){
              if(init + i > this.totalPages) break;
              this.pages.push(init + i);
          }
      }
    },

    onClickPage(pageId){
        if(pageId === this.currentPage || 
            pageId <= 0 || 
            pageId > this.totalPages){
            return;
        }
        this.$emit("onPageChange", pageId)
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