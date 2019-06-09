<template>
  <Scroll :data="data" 
          ref="scrollRef"
          :probeType="probeType"
          :listen-scroll="listenScroll"
          class="my-phone-list"
          @scroll = "scroll"
  >
    <!-- 左侧歌手列表 -->
    <ul>
      <li ref="leftRef" v-for="(item,index) in data" :key="index" class="list-group" >
        <h2 class="list-group-title">{{ item.title }}</h2>
        <ul >
          <li v-for="(list,index) in item.items" :key="index" class="list-group-item" @click="select(list.id)">
            <img v-lazy="list.avatar" class="avatar">
            <span class="name">{{ list.name }}</span>
          </li>
        </ul>
      </li> 
    </ul>
     <!-- 右侧字母列表 -->
    
    <ul class="offside" 
        @touchstart = "onShortcutTouchstart"
        @touchmove.stop.prevent = "onShortcutTouchmove"
    >
      <li v-for="(group,index) in shortcut" :key="index" :data-index="index" :class="{'current' : currentIndex == index}" >{{group}}</li>
    </ul>
    <!-- 滚动固定标题实现 -->
    <div ref="fixedTitleRef" class="list-fixed" v-show="fixedTitle">
      <h1 class="fixed-title">{{fixedTitle}}</h1>
    </div>
    <div v-if="!data.length" class="loading-container">
      <Loading></Loading>
    </div>
    
  </Scroll>
</template>
<script>
import Scroll from '@/components/core/scroll.vue'
import { myDOM } from '@/common/js/utils.js' 
import Loading from '@/components/core/loading.vue'

const RIGHT_ONEWORD_HEIGHT = 18
const TITLE_HEIGHT = 40

export default {
  components:{
    Scroll,
    Loading
  },
  data(){
    return{
      scrollY:-1,
      currentIndex:0,
      //标题上推y值(热门标题 - A 标题)
      diff:-1
    }
  },
  props:{
    data:{
      type:Array,
      default:[]
    }
  },
  watch: {
    data(){
      setTimeout(()=>{
        this._caclHeight()
      },20)
    },
    // 监听scrollY落在leftListHeight的哪个区间，实现高亮联动
    scrollY(newY){
      // console.log(newY)
      const leftListHeight = this.leftListHeight;
      // console.log(leftListHeight);
      //当滚动到顶部，newY > 0
      if(newY>0){
        this.currentIndex = 0;
        return
      }
      //在中间部分滚动
      for(let i = 0;i<leftListHeight.length - 1;i++){
        let height1 = leftListHeight[i];
        let height2 = leftListHeight[i+1];
        if(-newY >= height1 && -newY <height2){
          this.currentIndex = i;
          this.diff = height2 + newY;
          return
        }
      }
      //当滚动到底部，且-newY大于最后一个元素的上限
      this.currentIndex = leftListHeight.length - 2;
    },
    diff(newVal){
      // console.log(newVal);
      let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0

      this.fixedTop = fixedTop
      this.$refs.fixedTitleRef.style.transform = `translate3d(0,${fixedTop}px,0)`
    }
  },
  methods: {
    //对父亲提供的刷新 better-scroll 方法
    refresh(){
      this.$refs.scrollRef.refresh()
    },
    _scrollTo(index){
      // console.log(index);
      // console.log(this.leftListHeight.length)
      // 超过范围不能点击不能拖动
      if(!index){
        return
      }
      if(index<0){
        index = 0
      }else if(index > this.leftListHeight.length - 2){
        index = this.leftListHeight.length - 2
      }
      
      this.currentIndex = Number(index)
      this.$refs.scrollRef.scrollToElement(this.$refs.leftRef[index],0)
    },
    // 计算leftListHeight的高度
    _caclHeight(){
      //初始化
      let height = 0;
      this.leftListHeight = [];
      this.leftListHeight.push(height);

      let list = this.$refs.leftRef
      // console.log(list);
      for(let i = 0 ; i<list.length; i++){
        height += list[i].clientHeight
        this.leftListHeight.push(height)
      }
      // console.log(this.leftListHeight);
      //(24) [0, 1100, 1500, 2000, 2600, 2800, 3100, 3600, 4000, 4500, 4700, 5800, 6500, 6900, 7200, 7500, 7900, 8200, 8800, 9500, 10300, 11100, 11600, 13200]
    },
    //点击右侧，左侧联动
    onShortcutTouchstart(e){
      // console.log(e);
      // console.log(e.target)
      // console.log(e.touches)
      let nowTouch = e.touches[0];
      this.touch.y1 = nowTouch.pageY;
      let nowIndex = myDOM.customAttribute(e.target,'index');
      // console.log(nowIndex);
      this.touch.nowIndex = nowIndex;
      this._scrollTo(nowIndex);
    },
    //滑动右侧，左侧联动，与左侧共享touch对象
    onShortcutTouchmove(e){
      let nowTouch = e.touches[0];
      this.touch.y2 = nowTouch.pageY;
      //两次 touch y轴偏移
      let offset = Math.floor((this.touch.y2 - this.touch.y1)/ RIGHT_ONEWORD_HEIGHT)
      // console.log(offset)
      let nowIndex = Number(this.touch.nowIndex) + offset
      // console.log(nowIndex)

      this._scrollTo(nowIndex)
    },
    scroll(pos) {
      this.scrollY = pos.y
      // console.log(this.scrollY);
    },
    select(item){
      // console.log(item)
      this.$emit('emitSelect',item)
    }
  },
  computed: {
     // 快速入口排列数组  
    shortcut(){
      return this.data.map((group)=>{
        // console.log(group)
        return group.title.substr(0,1)
      })
    },
    fixedTitle(){
      // console.log(this.scrollY)
      if(this.scrollY>0){
        return ''
      }
      return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
    }
  },
  created(){
    this.touch = {};
     this.listenScroll = true
    this.leftListHeight = [];
    this.probeType = 3 // better-scroll 滚动组件 不截留
  },
  mounted(){
    // this.shortcut();
  },
  updated() {

  },

}
</script>
<style lang="scss" >
@import "~common/scss/element.scss";
@import "~common/scss/variable.scss";
html{
  overflow: hidden;
}
.my-phone-list {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: $color-background;
  .list-group {
    padding-bottom: 50px;
    .list-group-title {
      height: 50px;
      line-height: 50px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }
    .list-group-item {
      display: flex;
      align-items: center;
      padding: 20px 0 0 30px;
      .avatar {
        width: 80px;
        height: 80px;
        border-radius: 50%;
      }
      .name {
        margin-left: 20px;
        color: $color-text-l;
        font-size: $font-size-medium;
      }
    }
  }
  .offside{
    position: absolute;
    z-index:30;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    font-size: 22px;
    width: 30px;
    padding: 20px 0;
    border-radius: 20px;
    text-align: center;
    background: $color-background-d;
    font-family: Helvetica;
    >li{
      padding: 3px;
      line-height: 1;
      color: $color-text-l;
      font-size: $font-size-small;
      &.current {
        color: $color-theme;
      }
    }
  }


  .list-fixed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    .fixed-title {
      height: 40px;
      line-height: 40px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }
  }
  // 垂直居中
  .loading-container {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}
// .scrollcontent{
//   width:100%;
//   background: $color-background;
  // .content{
  //   margin-top: 20px;
  //   box-sizing: border-box;
  //   height: 100%;
  //   .hot{
  //     line-height: 44px;
  //     font-size: 24px;
  //     width: 100%;
  //     background: #3c3a3a;
  //     padding-left: 15px;
  //   }
  //   .singerlist{
  //     .item{
  //       @include flex(row);
  //       align-self: center;
  //       height: 120px;
  //       line-height: 120px;
  //       // border: 1px solid $color-text-d;
  //       >img{
  //         width: 90px;
  //         height: 90px;
  //         border-radius: 50%;
  //         margin-top: 15px;
  //         margin-left: 20px;
  //       }
  //       >p{
  //         font-size: 24px;
  //         color: $color-text-d;
  //         padding-left: 20px;
  //       }
  //     }
  //   }
  
// }
</style>


