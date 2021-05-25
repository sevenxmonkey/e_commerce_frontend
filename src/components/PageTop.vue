<template>
  <div class="searchbar-container">
    <div class="search-bar">
      <input class="searchbar" type="text" maxlength="24" placeholder="Search..."
        v-model="input"/>
      <img
        @click="searchHandler"
        src="https://images-na.ssl-images-amazon.com/images/I/41gYkruZM2L.png"
        alt="Magnifying Glass"
        class="button"
      />
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      input: '',
    }
  },
  mounted(){
    let self = this;
    window.addEventListener('keydown', (e) => {
      if (e.key == 'Enter' && self.input) {
        self.searchHandler();
      }
    });
  },
  methods:{
    searchHandler(){
      if(this.input){
        const path = '/search?key=' + encodeURIComponent(this.input);
        if (this.$route.fullPath !== path) {
          this.$router.push(path);
        }
      }
    }
  }
};
</script>

<style scoped>
.searchbar-container{
  position: fixed;
  width: 100%;
  margin: 0;
  left: 0;
  top: 0;
  height: 60px;
  z-index: 10;
}
.search-bar{
  position: relative;
  width: 600px;
  margin: 5px auto;
}
input {
  border: none;
  outline: none;
  width: 600px;
  height: 50px;
  border-radius: 50px;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.2);
  padding: 5px 20px;

  box-sizing: border-box;

  transition: all .2s;
  transition-delay: .1s;
}

input:hover{
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
}

.button{
  cursor: pointer;
  height: 20px;
  position: absolute;
  top: 15px;
  right:15px;
}
</style>