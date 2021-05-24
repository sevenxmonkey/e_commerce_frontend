<template>
  <div class="card" @click="onClickCard">
    <div class="img-wrapper">
      <img :src="this.item.image" />
    </div>
    <div class="content">
        <div class="t-name">{{ this.item.name }}</div>
        <div class="t-price"
            v-if="this.item.salePrice === this.item.regularPrice"
            >${{ this.item.salePrice}}</div>
        <div v-else>
            <span class="t-price-sale">${{this.item.salePrice}}</span>
            <span class="t-price-regu">${{this.item.regularPrice}}</span>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    props:{
        item: Object
    },
    methods:{
      async onClickCard(){
        this.$router.push('/product/' + this.item.sku);
      }
    }
};
</script>

<style scoped>
.card {
  width: 300px;
  height: 420px;
  margin: 10px 5px;
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-sizing: border-box;
}

.card:hover{
    cursor: pointer;
    box-shadow: 3px 3px 6px rgba(44, 43, 60, 0.1);
}

.card .img-wrapper {
  background-color: #f3f3f3;
}

.card .img-wrapper:hover {
  cursor: pointer;
  background-color: #f8f6f4;
}

.card .img-wrapper img {
  width: 270px;
  height: 270px;
  object-fit: scale-down;
  mix-blend-mode: multiply;
  padding: 15px;
}

.card .content{
    padding: 15px 10px;
}

.t-name{
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 4px;
}

.t-price{
    font-size: 0.875rem;
    font-weight: 700;
    color: #000;
}

.t-price-sale{
    font-size: 0.875rem;
    font-weight: 700;
    color: #dc3545;
}

.t-price-regu{
    margin-left: 5px;
    font-size: 0.875rem;
    color: rgba(0, 0, 0, 0.5);
    text-decoration: line-through;
}
</style>