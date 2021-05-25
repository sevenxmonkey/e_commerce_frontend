<template>
  <div class="sidebar-container">
    <div class="t-filter-title">filters</div>

    <div class="filter-btn" 
      v-for="btn of btns" :key="btn.index"
      :class="sortIndex === btn.index ? 'active' : ''"
      @click="onClickFilter(btn.index)"
      >
      {{btn.text}}
    </div>

  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["sortIndex", "keyword"]),
  },
  data(){
    return {
      btns:[
        { index: 0, text: 'Price: Low to High' },
        { index: 1, text: 'Price: High to Low' },
        { index: 2, text: 'Ave. Customer Reviews' },
        { index: 3, text: 'Most Reviews' }
      ]
    }
  },
  methods: {
    onClickFilter(index) {
      let pathIndex = -1;
      if (this.sortIndex != index) {
        pathIndex = index;
      }
      const path =
        this.$route.path +
        "?key=" + this.keyword +
        "&sort=" + pathIndex +
        "&page=1";
      if (this.$route.fullPath !== path) {
        this.$router.push(path);
      }
    },
  },
};
</script>

<style scoped>
.sidebar-container {
  min-width: 260px;
  background-color: white;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  margin: 10px;
}

.filter-btn {
  cursor: pointer;
  margin-bottom: 10px;
  width: 200px;
  padding: 10px 0 10px 20px;
  border-radius: 50px;
  border: 1px solid rgba(0, 0, 0, 0.2);

  transition: all 0.2s;
  transition-delay: 0.1s;
}

.active {
  color: white;
  background-color: black;
}

.filter-btn:hover {
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
}

.t-filter-title {
  font-size: 20px;
  padding: 10px 0 10px 20px;
}
</style>