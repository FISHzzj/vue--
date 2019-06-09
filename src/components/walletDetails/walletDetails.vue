<template>
  <div :class="$style.content">
    <Panel fanhui="icon-huise" title="财务管理>>大果园钱包明细" txt="兑换" @tranfer="exchange" >
    </Panel>
    <section :class="$style.aliment">
      <div :class="$style.alimentTop">
        <div><i class="iconfont icon-wenhao" style="color: #89e0be;"></i></div>
        <h1>{{DGY}}</h1>
        <p>当前大果园钱包</p>
      </div>
      <div :class="$style.alimentBottom">
        <div :class="$style.alimentHead">
          <div :class="{active : tagIndex==1}" @click="tag(1)">全部</div>
          <div :class="{active : tagIndex==2}" @click="tag(2)">收入</div>
          <div :class="{active : tagIndex==3}" @click="tag(3)">支出</div>
        </div>
        <div :class="$style.alimentItem" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
          <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" @bottom-status-change="handleBottomChange" ref="loadmore">
            <div :class="$style.alimentList" v-for="(list,index) in lists" :key="index">
              <div>
                <h4>{{list.title}}</h4>
                <p>{{list.createtime}}</p>
              </div>
              <div>{{list.money}}</div>
            </div>
          </mt-loadmore>
        </div>
       
      </div>
    </section>
  </div>
</template>
<script>
import Panel from '../core/panel.vue'
import { Toast } from 'mint-ui'
export default {
  name: 'walletDetails',
  components: {
    Panel

  },
  data() {
    return {
      tagIndex: 1,
      lists: [],
      page: 1,
      pageNum: '', // 总页数
      total: '',
      DGY: '',

      bottomStatus: '',
      wrapperHeight: 0,
      allLoaded: false
    }
  },
  created() {
    this._walletDetails(1)
  },
  mounted() {
    setTimeout(() => {
      this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top
      console.log(this.wrapperHeight)
    }, 100)
  },
  methods: {
    tag(index) {
      this.tagIndex = index
      if (index == 1) {
        this.lists = []
        this._walletDetails(1)
      } else if (index == 2) {
        // 收入
        this.lists = []
        this._walletDetails(1, 1)
      } else if (index == 3) {
        // 支出
        this.lists = []
        this._walletDetails(1, 2)
      }
    },
    exchange(msg) {
      this.$router.push({
        path: '/exchange'
      })
    },
      // 全部记录
    _walletDetails(page, status) {
      this.$axios({
        method: 'post',
        url: `${this.$URL}/app/index.php?i=143&c=entry&do=ws_orchard&m=sz_yi&p=ws_dgy`,
        params: {
          page: page,
          status: status
        }
      }).then(res => {
        if (res.data.status == 1) {
          console.log(res)
          console.log(res.data.result.list)
          this.pageNum = res.data.result.page_num
          this.total = res.data.result.total
          this.DGY = res.data.result.MGY
          this.lists = this.lists.concat(res.data.result.list)
        } else {
          Toast({
            message: res.data.result.list,
            position: 'bottom',
            duration: 1000
          })
        }
      })
    },
    handleBottomChange(status) {
      this.bottomStatus = status
    },
    loadBottom() {
      console.log(2222)
      if (this.page < this.pageNum) {
        this.page++
        this._walletDetails(this.page)
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
        overflow-y: scroll;
        .alimentList{
          @include flex(row);
          justify-content: space-between;
          align-items: center;
          padding: 20px 20px;
          box-sizing: border-box;
          border-bottom: 1px solid #999999;
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
  .active{
    position: relative;
    &::after{
      content: "";
      width: 100px;
      height: 0;
      border:2px solid #33d696;
      position: absolute;
      bottom: -1px;
      left: -14px;

    }
  }

</style>
<style lang="scss">
  // Toast
  .mint-toast-text{
    font-size: 28px;
  }
</style>



