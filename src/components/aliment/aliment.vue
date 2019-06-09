<template>
  <div :class="$style.content">
    <Panel fanhui="icon-huise" title="财务管理>>养料明细" txt="转出" @tranfer="rollOut" >
    </Panel>
    <section :class="$style.aliment">
      <div :class="$style.alimentTop">
        <div><i class="iconfont icon-wenhao" style="color: #89e0be;"></i></div>
        <h1>{{nourishment}}</h1>
        <p>当前养料</p>
      </div>
      <div :class="$style.alimentBottom">
        <div :class="$style.alimentHead">
          <div :class="{active : tagIndex==1}" @click="tag(1)">全部</div>
          <div :class="{active : tagIndex==2}" @click="tag(2)">收入</div>
          <div :class="{active : tagIndex==3}" @click="tag(3)">支出</div>
        </div>
        <div :class="$style.alimentItem" ref="wrapper" v-if="tagIndex==1"  >
          <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" @bottom-status-change="handleBottomChange" ref="loadmore">
            <div :class="$style.alimentList" v-for="(list,index) in lists" :key="index">
              <div>
                <h4>{{list.title}}</h4>
                <p>{{list.createtime}}</p>
                <!--<p>来源用户：pp4444</p> -->
              </div>
              <div>{{list.money}}</div>
            </div>
          </mt-loadmore>
        </div>
         <div :class="$style.alimentItem" ref="wrapper" v-if="tagIndex==3"  >
          <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" @bottom-status-change="handleBottomChange" ref="loadmore">
            <div :class="$style.alimentList" v-for="(list,index) in lists" :key="index">
              <div>
                <h4>{{list.title}}</h4>
                <p>{{list.createtime}}</p>
                <!--<p>来源用户：pp4444</p> -->
              </div>
              <div>{{list.money}}</div>
            </div>
          </mt-loadmore>
        </div>
        <div :class="$style.alimentItem" ref="wrapper"  v-if="tagIndex==2" >
          <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" @bottom-status-change="handleBottomChange" ref="loadmore">
            <div :class="$style.alimentList" v-for="(list,index) in incomeList" :key="index">
              <div>
                <h4>{{list.remarks}}</h4>
                <p>{{list.createtime}}</p>
                <!--<p>来源用户：pp4444</p> -->
              </div>
              <div>{{list.money}}</div>
            </div>
            <div slot="bottom" class="mint-loadmore-bottom">
              <span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
              <span v-show="bottomStatus === 'loading'">
                <mt-spinner type="snake"></mt-spinner>
              </span>
            </div>
          </mt-loadmore>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import Panel from '../core/panel.vue'

export default {
  name: 'aliment',
  components: {
    Panel

  },
  data() {
    return {
      tagIndex: 1,
      page: 1, // 页码
      pageNum: '', // 总页数
      lists: [],
      nourishment: '',
      incomeList: [], // 收入列表

      bottomStatus: '',
      wrapperHeight: 0,
      allLoaded: false
    }
  },
  created() {
    this._aliment(this.page)
  },
  mounted() {

  },
  methods: {
    tag(index) {
      this.tagIndex = index
      // 全部
      if (index == 1) {
        this.lists = []
        this._aliment(1)
      } else if (index == 2) {
        this.lists = []
        this._income(1)
      } else if (index == 3) {
        this.lists = []
        this._expend(1)
      }
    },
    rollOut() {
      this.$router.push({
        path: '/rollOut'
      })
    },
    _aliment(page) {
      this.$axios({
        method: 'post',
        url: `${this.$URL}/app/index.php?i=143&c=entry&do=ws_orchard&m=sz_yi&p=ws_nourishment`,
        params: {
          page: page
        }
      }).then(res => {
        // console.log(res);
        this.pageNum = res.data.result.page_num
        this.nourishment = res.data.result.nourishment
        this.lists = this.lists.concat(res.data.result.list)
      })
    },
    // 收入
    _income(page) {
      this.$axios({
        method: 'post',
        url: `${this.$URL}/app/index.php?i=143&c=entry&do=ws_orchard&m=sz_yi&p=ws_nourishment`,
        params: {
          page: page,
          status: 1
        }
      }).then(res => {
        console.log(res)
        this.incomeList = res.data.result.list
        this.pageNum = res.data.result.page_num
        this.nourishment = res.data.result.nourishment
        this.lists = this.lists.concat(res.data.result.list)
      })
    },
     // 支出
    _expend(page) {
      this.$axios({
        method: 'post',
        url: `${this.$URL}/app/index.php?i=143&c=entry&do=ws_orchard&m=sz_yi&p=ws_nourishment`,
        params: {
          page: page,
          status: 2
        }
      }).then(res => {
        console.log(res)
        this.pageNum = res.data.result.page_num
        this.nourishment = res.data.result.nourishment
        this.lists = this.lists.concat(res.data.result.list)
      })
    },
    handleBottomChange(status) {
      this.bottomStatus = status
    },
    loadBottom() {
      if (this.page < this.pageNum) {
        this.page++
        this._aliment(this.page)
      } else {
        this.allLoaded = true
      }
      this.$refs.loadmore.onBottomLoaded()
    }
  }
}
</script>


<style lang="scss" module>
@import "~common/scss/mixin.scss";
@import "~common/scss/element.scss";

.content{
  background: #f6f6f3;
  font-size: 24px;
  .aliment{
    color: #999999;
    width: 100%;
    .alimentTop{
      text-align: center;
      background: #ffffff;
      margin: 20px 10px;
      box-sizing: border-box;
      height: 200px;
      border-radius: 10px;
      div:first-child{
        text-align: right;
        line-height: 60px;
      }
      h1{
        line-height: 40px;
        font-size: 50px;
        font-weight: 600;
        color: #89e0be;
      }
      p{
        color: #000000;
        line-height: 40px;
      }
    }
    .alimentBottom{
      background: #ffffff;
     .alimentHead{
       @include flex(row);
       justify-content: space-around;
       align-items: center;
       height: 84px;
       line-height: 84px;
       border-bottom: 1px solid #999999;

     }
     .alimentItem{
        margin-bottom: 100px;
        overflow: scroll;
        .alimentList{
          @include flex(row);
          justify-content: space-between;
          align-items: center;
          padding: 20px 20px;
          box-sizing: border-box;
          div:first-child{
            h4{
              line-height: 40px;
              color: #000000;
            }
            p{
              line-height: 40px;
            }
          }
          div:last-child{
            color: #33d696;
            font-size: 40px;
          }
        }
      }
    }
  }
}

</style>

<style lang="scss" scoped>
  html,body{
    background: #f6f6f3;
  }
  .iconfont{
    font-size: 50px;
  
  }
  .active{
    position: relative;
    &::after{
      content: "";
      width: 100px;
      height: 0;
      border:2px solid #33d696;
      position: absolute;
      bottom: -1px;
      left: -28px;

    }
  }
</style>
<style lang="scss">
// loadmore
.icon-lingdang{
  font-size: 40px;
    color: #89e0be;
}
.mint-loadmore-bottom span {
    display: inline-block;
    -webkit-transition: .2s linear;
    transition: .2s linear;
    vertical-align: middle
}

.mint-loadmore-bottom span.is-rotate {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg)
}
</style>



