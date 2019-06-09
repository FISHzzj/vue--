/* eslint-disable eqeqeq */
<template>
    <div :class="$style.content">
      <Panel  title="农场果园>>果园市场"  >
      </Panel>
      <div :class="$style.notice"><i class="iconfont icon-lingdang"></i><strong>公告：</strong><b>新公告</b></div>
      <div :class="$style.backList" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
        <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" @bottom-status-change="handleBottomChange" ref="loadmore">
           <div :class="$style.cardtxt" v-for="(list,index) in lists" :key="index">
            <img v-lazy="list.thumb" alt="">
            <div>
              <h4>{{list.title}}</h4>
              <p>区块价值：<strong>{{list.block_min}}-{{list.block_max}}</strong></p>
              <p>领养时间：<strong>{{list.start_time}}-{{list.end_time}}</strong></p>
              <p>预约消耗花肥：<strong>{{list.consume_nourishment}}</strong></p>
              <p>智能合约收益：<strong>{{list.cycles}}天/{{list.profits}}%</strong></p>
              <p>赋能消耗花肥：<strong>{{list.consume_nourishment_day}}</strong></p>
            </div>
            <div v-if="list.status==1 || list.status==0 || list.status==3" >{{list.statusd}}</div>
            <div v-if="list.status==2 " @click="appoint(list.id)">{{list.statusd}}</div>
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
</template>
<script>
import Panel from '../core/panel.vue'
import { MessageBox, Toast } from 'mint-ui'
export default {
  name: 'market',
  components: {
    Panel
  },
  data() {
    return {
      lists: [],
      page: 1, // 页码
      pageNum: '', // 总页数

      bottomStatus: '',
      wrapperHeight: 0,
      allLoaded: false

    }
  },
  created() {
    this._market(this.page)
  },
  mounted() {
    console.log(this.$refs.wrapper.getBoundingClientRect().top)
    console.log(document.documentElement.clientHeight)
    console.log(this.$refs.wrapper.getBoundingClientRect().bottom)
    setTimeout(() => {
      this.wrapperHeight = document.documentElement.clientHeight
    }, 100)
  },
  methods: {
    _market(page) {
      this.$axios({
        method: 'get',
        url: `${this.$URL}/app/index.php?i=143&c=entry&do=ws_orchard&m=sz_yi&p=ws_market`,
        params: {
          page: page
        }
      }).then((res) => {
        console.log(res)
        // eslint-disable-next-line eqeqeq
        if (res.data.status == 1) {
          console.log(res.data.result.list)
          this.pageNum = res.data.result.page_num
          this.lists = this.lists.concat(res.data.result.list)
        }
      })
    },
    _appontMarket(page) {
      this.$axios({
        method: 'get',
        url: `${this.$URL}/app/index.php?i=143&c=entry&do=ws_orchard&m=sz_yi&p=ws_market`,
        params: {
          page: page
        }
      }).then((res) => {
        console.log(res)
        // eslint-disable-next-line eqeqeq
        if (res.data.status == 1) {
          console.log(res.data.result.list)
          this.lists = res.data.result.list
        }
      })
    },
    appoint(id) {
      this.$axios({
        method: 'post',
        url: `${this.$URL}/app/index.php?i=143&c=entry&do=ws_orchard&m=sz_yi&p=ws_market`,
        params: {
          op: 'appointment',
          id: id
        }
      }).then((res) => {
        console.log(res)
        // eslint-disable-next-line eqeqeq
        if (res.data.status == 1) {
          let listId = res.data.result.list.id
          MessageBox.alert(res.data.result.list.message).then(action => {
            // MessageBox.prompt('请输入支付密码').then(({ value, action }) => {
            //   console.log(value);

            this.$axios({
              method: 'post',
              url: `${this.$URL}/app/index.php?i=143&c=entry&do=ws_orchard&m=sz_yi&p=ws_market`,
              params: {
                op: 'payment',
                id: listId
                  // pay_password : value
              }
            }).then((data) => {
              Toast({
                message: data.data.result.list,
                position: 'bottom',
                duration: 1000
              })
              this._appontMarket()
              console.log(data)
            })
            // });
          })
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
        console.log(this.page)
        this._market(this.page)
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
  // background: #ffffff;
  font-size: 24px;
  height: 100%;
  color: #ffffff;
  .notice{
    background: #ffffff;
    color: #999;
    padding: 20px 20px;
    @include flex(row);
    align-items: center;
    strong{
      color: #000000;
      font-weight: 600;
    }
    b{
      color: #cfbd56;
    }
  }
  .backList{
    margin-bottom: 140px;
      overflow: scroll;
    .cardtxt{
      margin:20px 20px;
      background: #ffffff;
      border-radius: 20px;
      @include flex(row);
      justify-content:flex-start;
      padding: 20px 20px;
      align-items: center;
      // height: 240px;
      box-sizing: border-box;
      position: relative;
      // border-bottom: 1px solid #999999;
      >img{
        width: 100px;
        height: 100px;
        border-radius: 10px;
      }
      div:nth-child(2){
        h4{
          color: #89e0be;
          font-size: 30px;
          font-weight: 600;
          line-height: 40px;
        }
        margin-left: 20px;
        p{
          color: #999;
          line-height: 40px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          strong{
            // color: #000000;
            font-weight: 600;
          }
        }
      }
      >div:last-child{
        @include btn($size:28px, $color:#fff, $bgcolor:#4ebd92, $padding:10px, $radius:20px);
        position: absolute;
        right: 20px;
        height: 100%;
        text-align: center;
        // line-height: 3;
        box-sizing: border-box;
        border-bottom-left-radius: initial;
        border-top-left-radius: initial;
        border: 0;
        top: 0;
        // width: 60px;
        // writing-mode:vertical-lr;  //垂直方向，从左向右
        -webkit-writing-mode: vertical-rl;
        writing-mode: vertical-rl;
      }
    }
  }
}
</style>

<style lang="scss" >
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
// MessageBox
.mint-msgbox{
  font-size: 26px;
}
.mint-msgbox-title{
  font-size: 26px;
}
.mint-msgbox-content{
      min-height: 100px;
}
.mint-msgbox-message{
      line-height: 100px;
}
.mint-msgbox-btns{
    height: 80px;
    line-height: 80px;
}
.mint-msgbox-btn{
  font-size: 26px;
}

// Toast
  .mint-toast-text{
    font-size: 28px;
  }
</style>

