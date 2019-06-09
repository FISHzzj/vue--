<template>
  <div :class="$style.content">
    <phone-list :data="singers" @emitSelect="selectId"></phone-list>
    <router-view></router-view>
  </div>
</template>
<script>
import {getSingerList} from 'api/singer.js'
import {ERR_OK} from 'api/config.js'
import {createSinger} from 'common/js/SingerClass.js'
import PhoneList from '../core/phoneList.vue'

const HOT_TITLE = '热门'
const HOT_NUM = 10
export default {
  components: {
    PhoneList
  },
  data() {
    return {
      singers: []
    }
  },
  created() {
    this._getSingerList()
  },
  methods: {
    _getSingerList() {
      getSingerList().then((res) => {
        // this.items = res.data.list;
        if (res.code == ERR_OK) {
          //  console.log(res);
          this.singers = this._formatSingers(res.data.list)
        }
      })
    },
    // 重组 res.data.list 数据
    _formatSingers(list) {
      // console.log(list);
      // 热门歌手
      let map = {
        hot: {
          title: HOT_TITLE,
          items: []
        }
      }
      // 填充歌手数据
      list.forEach((item, index) => {
        // console.log(item)
        if (index < HOT_NUM) {
          // 填充热门歌手数据
          map.hot.items.push(createSinger(item))
        }
        // 填充 a-z 字母
        let key = item.Findex
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        // 填充对应字母歌手数据
        map[key].items.push(createSinger(item))
      })
      // console.log(map);
      // 得到有序列表
      let hot = []
      let other = []
      for (let key in map) {
        let val = map[key]
        if (val.title.match(/[a-zA-Z]/)) {
          other.push(val)
        } else if (val.title == HOT_TITLE) {
          hot.push(val)
        }
      }
      other.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      console.log(hot.concat(other))
      return hot.concat(other)
    },
    selectId(singer) {
      console.log(singer)
      this.$router.push({
        path: `/singer/${singer}`
      })
    }
  }
}
</script>
<style lang="scss" module>
@import "~common/scss/element.scss";
@import "~common/scss/variable.scss";
.content{
    position: fixed;
    top: 142px;
    bottom: 0;
    width: 100%;
  .hot{  
    line-height: 44px;
    font-size: 24px;
    width: 100%;
    background: #3c3a3a;
    padding-left: 15px;
  }
  .singerlist{
    .item{
      @include flex(row);
      align-self: center;
      height: 120px;
      line-height: 120px;
      // border: 1px solid $color-text-d;
      >img{
        width: 90px;
        height: 90px;
        border-radius: 50%;
        margin-top: 15px;
        margin-left: 20px;
      }
      >p{
        font-size: 24px;
        color: $color-text-d;
        padding-left: 20px;
      }
    }
  }
  .offside{
    position: fixed;
    top: 260px;
    right: 0;
    font-size: 22px;
    height: 30px;
    line-height: 30px;
    >li{
      display: flex;
      align-self: center;
    }
  }
}
</style>


