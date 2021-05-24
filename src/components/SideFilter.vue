<template>
  <div class="sidebar-container">

    <div class="t-filter-title">filters</div>
    
    <div class="filter-btn" :class="index === 0 ? 'active' : ''" @click="onClickFilter(0)">Price: Low to High</div>
    <div class="filter-btn" :class="index === 1 ? 'active' : ''" @click="onClickFilter(1)">Price: High to Low</div>
    <div class="filter-btn" :class="index === 2 ? 'active' : ''" @click="onClickFilter(2)">Ave. Customer Reviews</div>
    <div class="filter-btn" :class="index === 3 ? 'active' : ''" @click="onClickFilter(3)">Most Reviews</div>

    <!-- TODO: implement more filters if I have time -->
  </div>
</template>

<script>
export default {
  props:{
    index: Number
  },
  methods:{
    onClickFilter(index){
      if(this.index === index){
        this.$emit('onFilterChange', -1);
      }else{
        this.$emit('onFilterChange', index);
      }
    }
  }
}
</script>

<style scoped>
.sidebar-container{
  min-width: 260px;
  background-color: white;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  margin: 10px;
}

.filter-btn{
  cursor: pointer;
  margin-bottom: 10px;
  width: 200px;
  padding: 10px 0 10px 20px;
  border-radius: 50px;
  border: 1px solid rgba(0, 0, 0, 0.2);

  transition: all .2s;
  transition-delay: .1s;
}

.active{
  color: white;
  background-color: black;
}

.filter-btn:hover{
 box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
}

.t-filter-title{
  font-size: 20px;
  padding: 10px 0 10px 20px;
}

</style>