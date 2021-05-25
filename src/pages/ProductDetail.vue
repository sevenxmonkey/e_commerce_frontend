<template>
    <div>
        <div v-if="!loading" class="productDetail-container">
            <div class="col left">
                <div class="img-wrapper">
                    <img :src="images[imgId]" />
                    <div class="sm-imgs">
                        <div class="sm-img-wrapper"
                            v-for="(img, index) of images" :key="index"
                            :class="imgId === index ? 'active' : ''" 
                            @click="imgId = index;">
                            <img :src="img" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="col right">
                <div class="t-manufacturer">{{manufacturer}}</div>
                <div class="t-name">{{name}}</div>
                <div class="t-productTemplate">{{productTemplate}}</div>
                <div class="row">
                    <div class="t-orderable">Orderable: {{orderable}}</div>
                    <div>Price: <span class="t-price">${{salePrice}}</span> 
                    <span v-if="salePrice !== regularPrice" class="t-regular-price">{{regularPrice}}</span></div>
                </div>
                <div class="detail">
                    <div class="manu">
                        <div class="manu-tab" @click="tabId = 0;" :class="tabId === 0 ? 'active':''">Overview</div>
                        <div class="manu-tab" @click="tabId = 1;"  :class="tabId === 1 ? 'active':''">Details</div>
                    </div>
                    <div v-if="tabId === 0" class="overview">
                        <div class="t-description">{{longDescription}}</div>
                    </div>
                    <div v-if="tabId === 1" class="detailList">
                        <div class="detail-item" v-for="(item, index) of detailList" :key="index">
                            <div class="t-detail-title">{{item[0]}}</div> {{item[1]}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from '../apis/products'
export default {
    name:"ProductDetail",
    data(){
        return {
            sku: '',
            product: {},

            manufacturer: '',
            name: '',
            productTemplate: '',
            regularPrice: 0,
            salePrice: 0,
            orderable: '',

            longDescription: '',
            detailList: [],

            images: [],

            //UI controller
            loading: false,
            imgId: 0,
            tabId: 0,
        }
    },
    async mounted(){
        this.sku = this.$route.params.sku;
        await this.renderProduct();
    },
    methods:{
        async renderProduct(){
            this.loading = true;
            const res = await api.getBySku(this.sku);
            console.log(res);
            this.name = res.name;
            this.manufacturer = res.manufacturer;
            this.productTemplate = res.productTemplate.split('_').join(' ')
            this.regularPrice = res.regularPrice;
            this.salePrice = res.salePrice;
            this.orderable = res.orderable;

            this.longDescription = res.longDescription;

            const detailList = [];
            if(res.depth) detailList.push(['Depth', res.depth]);
            if(res.height) detailList.push(['Height', res.height]);
            if(res.width) detailList.push(['Width', res.width]);
            if(res.weight) detailList.push(['Weight', res.weight]);
            if(res.color) detailList.push(['Coloc', res.color]);
            if(res.condition) detailList.push(['Condition', res.condition]);
            if(res.includedItemList && res.includedItemList.length){
                const buildStr = res.includedItemList.map(x => x.includedItem).join(',')
                detailList.push(['Included Item(s)', buildStr])
            }
            if(res.warrantyLabor && res.warrantyLabor!=='N/A') detailList.push(['Warranty Labor', res.warrantyLabor]);
            if(res.warrantyParts  && res.warrantyParts!=='N/A') detailList.push(['Warranty Parts', res.warrantyParts]);
            this.detailList = detailList;


            this.images = res.images.filter(x => {
                return (x.width >= 500)
            }).map(x => x.href);

            this.loading = false;
        }
    }
}
</script>

<style scoped>
.productDetail-container{
    margin: 80px 10vw 0 10vw;
    display: flex;
}

.row{
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
}

.col{
    flex-grow: 1;
}

.left{
    max-width: 600px;
}

.img-wrapper{
    width: 600px;
    height: 600px;
    background-color: #f3f3f3;
}

.img-wrapper img{
    width: 550px;
    height: 550px;
    object-fit: scale-down;
    mix-blend-mode: multiply;
    padding: 25px;
}


.sm-imgs{
    position: relative;
    top: 120px;
    /* display: flex;
    overflow: scroll; */
    height: 100%;
    width: 120px;
    overflow: scroll;

    transform: rotate(-90deg);
    transform-origin: left top;
}

.sm-img-wrapper{
    margin: 5px;
    height: 100px;
    width: 100px;
    background-color: #f3f3f3;
    box-sizing: border-box;
    opacity: 0.7;

    transform: rotate(90deg);
}

.sm-img-wrapper img{
    padding: 0;
    height: 90px;
    width: 90px;
    object-fit: scale-down;
    mix-blend-mode: multiply;
    padding: 5px;
}

.sm-imgs .active{
    opacity: 1;
    border-bottom: 2px solid black;
}

.sm-img-wrapper:hover{
    opacity: 1;
    cursor: pointer;
    background-color: #f8f6f4;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.sm-imgs::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.sm-imgs {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.right {
    min-width: 300px;
    max-width: 600px;
    margin-left: 30px;
}

.detail{
    margin-top: 50px;
}

.detail .manu{
    display: flex;
    justify-content: space-evenly;
}

.manu-tab{
    width: 100%;
    padding: 10px;
    text-align: center;
    border-bottom: 1px solid black;
    margin: 10px 0;
}

.manu-tab:hover, .manu .active{
    cursor: pointer;
    font-weight: 500;
    border-bottom: 2px solid black;
}

/* text styling */
.t-manufacturer, .t-productTemplate{
    color: rgba(0, 0, 0, 0.4);
    line-height: 2;
}

.t-name{
    font-size: 32px;
    font-weight: 800;
}

.t-price{
    font-size: 24px;
    font-weight: 500;
    color: brown;
}

.t-regular-price{
    color: rgba(0, 0, 0, 0.4);
    font-weight: 500;
    text-decoration: line-through;
}
.detailList{
    line-height: 1.5;
}
.detail-item{
    margin: 10px;
}
.t-detail-title{
    font-weight: 500;
}


</style>