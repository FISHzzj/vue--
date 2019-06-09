<template>
  <div :class="$style.content" v-if="items.length">
    <div :class="$style.item" v-for="item in items" :key="item.id">
      <router-link to="/rank" tag="div" :class="$style.topic_media">
        <img :src="item.picUrl" alt="">
        <span :class="$style.listen_count">
          <i class="iconfont icon-erji"></i>
          1950.5万
        </span>
      </router-link>
      <div :class="$style.topic_info">
        <div :class="$style.topic_cont">
          <h3>巅峰榜·流行指数</h3>
          <p>1 <span :class="$style.text_name">有一种悲伤</span>- A-Lin</p>
          <p>2 <span :class="$style.text_name">绿色</span>- 陈雪凝</p>
          <p>3 <span :class="$style.text_name">只是太爱你</span>- 张敬轩</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {getRank} from 'api/recommend.js'
export default {
  data() {
    return {
      items:[],
    }
  },
  created(){
    this._getRank();
  },
  methods: {
    _getRank(){
      getRank().then((res)=>{
        console.log(res);
        this.items=res.data.topList;
      })
    }
  },
}
</script>
<style lang="scss" module>
@import '~common/scss/element.scss';

.content{
  margin: 20px;
  padding-bottom: 110px;
  .item{
    @include flex(row);
    margin-bottom: 20px;
    background: #000;
    .topic_media{
      width: 200px; 
      position: relative;
      img{
        width: 200px;
        height: 200px;
      }
      .listen_count{
        position: absolute;
        left: 10px;
        bottom: 14px;
        line-height: 24px;
        color: #fff;
        opacity: .6;
        font-size: 18px;
        z-index: 10;
      }
    }
    .topic_info{
      position: relative;
      display: flex;
      align-self: center;
      .topic_cont{
        margin: 0 20px 0 30px;
        h3{
          font-size: 32px;
          font-weight: 400;
          margin-bottom: 10px;
          color: #ffffff;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        p{
          font-size: 28px;
          color: rgba($color: #ffffff, $alpha: 0.5);
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          line-height: 35px;
          .text_name{
            color: #ffffff;
            margin-left: 16px;
            margin-right: 10px;
          }
        }
      }
    }
  }
}
</style>

