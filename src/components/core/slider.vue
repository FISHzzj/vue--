<template>
  <section :class="cname">
    <swiper :options="options" >
      <!-- slides -->
      <swiper-slide v-for="(item,index) in items" :key="index">
        <router-link to="item.linkUrl">
          <img :src="item.picUrl" alt=""/>
        </router-link>
      </swiper-slide>
      <div class="swiper-pagination" v-if="options.pagination" slot="pagination"></div>
    </swiper>
  </section>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css';
export default {
  props:{
    cname:{
      type:String,
      default:''
    },
    options:{
      type:Object,
      default:function(){
        return {
          autoplay: true,
          loop: true,
          autoplayStopOnLast:false,
          pagination: {
            el: ".swiper-pagination"
          }
        }
      }
    },
    items:{
      type:Array,
      default:function(){
        return []
      }
    }
  },
  methods: {
    
  },
  components:{
    swiper,
    swiperSlide
  }
}
</script>
<style lang="css">
/* @import "../../../node_modules/swiper/dist/css/swiper.css"; */
</style>


