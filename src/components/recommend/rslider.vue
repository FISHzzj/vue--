<template>
  <section :class="$style.content">
    <Scroll :data="songLists" :class="$style.songLists" ref="scroll">
      <div>
        <Slider :cname="$style.slider"  :items="items"></Slider>
        <Panel title="热门歌单推荐" :class="$style.panel">
          <section :class="$style.songlist" v-if="songLists.length" >
            <div :class="$style.item" v-for="list in songLists" :key="list.id">
              <img v-lazy="list.imgurl" alt="">
              <p>{{list.creator.name}}</p>
              <p>{{list.dissname}}</p>
            </div>
          </section>
        </Panel>
      </div>
      <div :class="$style.loadingContainer">
         <Loading v-if="!songLists.length"></Loading>
      </div>
    </Scroll>
  </section>
</template>
<script>
import Slider from '../core/slider.vue'
import Panel from '../core/panel.vue'
import Scroll from '../core/scroll.vue'
import Loading from '../core/loading.vue'
import {getRecommend,getList} from "api/recommend.js"
import {ERR_OK} from 'api/config.js'
export default {
  components:{
    Slider,
    Panel,
    Scroll,
    Loading
  },
  data() {
    return {
      items:[],
      songLists:[],
    }
  },
  created(){
    this._getRecommend();
    this._getList();
  },
  methods:{
    _getRecommend(){
      // 异步请求后端数据，
      getRecommend().then((res)=>{
        // console.log(res);
        if(res.code==ERR_OK){
          this.items = res.data.slider;
          // this.songLists = res.data.songList;
        }
      });
    },
    _getList(){
      getList().then((res)=>{
        // console.log(res);
        this.songLists=res.data.list;
      })
    }
  },
  mounted(){
  
  }
}
</script>
<style lang="scss" module>
@import '~common/scss/variable.scss';
@import '~common/scss/mixin.scss';
.content{
  position: fixed;
  width: 100%;
  top: 100px;
  bottom: 0;
  z-index: -1;
  .songLists{
    height: 100%;
    overflow: hidden;
    .loadingContainer{
      position:absolute;
      width: 100%;
      top: 65%;
      transform: translateY(-65%)
    }
  }
  .slider{
    margin-top: 40px;
    height: 320px;
    img{
      width: 100%;
      height: 320px;
    }
  }
  .panel{
    background: $color-background-d !important;
    h4{
      color:$color-theme !important;
      font-size: 28px;
    }
    .songlist{
      // height: 120px;
      height: 100%;
      display: flex;
      align-self:center;
      flex-direction: row;
      flex-wrap: wrap;
      .item{
        margin: 20px;
        box-sizing: border-box;
        width: 100%;
        img{
          width: 90px;
          height: 90px;
          float: left;
        }
        p{
          font-size: 24px;
          height: 44px;
          line-height: 44px;
          margin-left: 110px;
          &:last-child{
            color: #999999;
          }
        }

      }
    }
  }
}
</style>


