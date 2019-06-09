<template>
    <div :class="$style.content" ref="customer" >
      <Panel fanhui="icon-huise" title="邀请好友"></Panel>
      <div :class="$style.customer" >
        <div :class="$style.invitatCode">
          <h1>{{r_code}}</h1>
          <p>我的邀请码</p>
        </div>
        <div :class="$style.poster">
          <p  v-clipboard:copy="r_code"
              v-clipboard:success="onCopy"
              v-clipboard:error="onError">复制邀请码</p>
          <p @click="qrcode">生成二维码海报</p>
        </div>
      </div>
      <div :class="$style.invitedRecord" >
        <div :class="$style.record"><i class="iconfont icon-jiludanzilishijilu"></i> &nbsp;邀请记录</div>
        <div :class="$style.navigation">
          <div @click="tag(1)" :class="{one : indexData==1}">全部</div>
          <div @click="tag(2)" :class="{two : indexData==2}">激活用户</div>
          <div @click="tag(3)" :class="{two : indexData==3}">未激活用户</div>
        </div>
        <div :class="$style.recodeAll" ref="wrapper" :style="{ height: wrapperHeight + 'px' }" >
          <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" @bottom-status-change="handleBottomChange" ref="loadmore">
            <div :class="$style.recodeNnm" v-for="(list,index) in lists" :key="index"><p>{{list.username}}</p><p>{{list.createtime}}</p></div>
            <div slot="bottom" class="mint-loadmore-bottom">
              <span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
              <span v-show="bottomStatus === 'loading'">
                <mt-spinner type="snake"></mt-spinner>
              </span>
            </div>
          </mt-loadmore>
        </div>

      </div>
    </div>

</template>
<script>
import Panel from '../core/panel.vue'
// eslint-disable-next-line no-unused-vars
import { Toast } from 'mint-ui'
export default {
  name: 'customer',
  components: {
    Panel
  },
  data() {
    return {
      indexData: 1,
      page: 1,
      pageNum: '', // 总页数
      lists: [],
      r_code: '',

      bottomStatus: '',
      wrapperHeight: 0,
      allLoaded: false
    }
  },
  created() {
    this.$nextTick(() => {
      this._custimer(1, 1)
      // console.log(this.$refs.wrapper.getBoundingClientRect().top)
      // console.log(document.documentElement.clientHeight)
      // console.log(this.$refs.wrapper.getBoundingClientRect().bottom)
      setTimeout(() => {
        this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top
        // console.log(this.wrapperHeight)
      }, 100)
    })
  },
  methods: {
    tag(index) {
      this.indexData = index
      if (index == 1) {
        this.lists = []
        this._custimer(1, 1)
        this.$refs.loadmore.onBottomLoaded()
      } else if (index == 2) {
        this.lists = []
        this._custimer(1, 2)
      } else if (index == 3) {
        this.lists = []
        this._custimer(1, 3)
      }
    },
    _custimer(page, status) {
      this.$axios({
        method: 'post',
        url: `${this.$URL}/app/index.php?i=143&c=entry&do=ws_orchard&m=sz_yi&p=ws_invitation`,
        params: {
          page: page,
          status: status
        }
      }).then((res) => {
        console.log(res)
        // if (status == 1) {
        if (res.data.status == 1) {
          this.r_code = res.data.result.r_code
          // this.lists = res.data.result.list
          this.pageNum = res.data.result.page_num

          this.lists = this.lists.concat(res.data.result.list)
        } else {
          alert(res.data.result.list)
        }
        // }
      }).catch((err) => {
        console.log(err)
      })
    },
     // 复制成功
    onCopy(e) {
      console.log(e.text)
      alert('复制成功')
    },
    // 复制失败
    onError(e) {
      alert('失败')
    },
    qrcode() {
      this.$router.push({
        path: '/qrCode',
        query: {
          rCode: this.r_code
        }
      })
    },
    handleBottomChange(status) {
      this.bottomStatus = status
    },
    loadBottom() {
      console.log(222)
      if (this.page < this.pageNum) {
        this.page++
        this._custimer(this.page, this.indexData)
      } else {
        this.allLoaded = true
      }
      this.$refs.loadmore.onBottomLoaded()
    }

  }
}
</script>
<style lang="scss" module>
@import "~common/scss/element.scss";

  .content{
    background: #F5F5F5;
    padding-bottom: 100px;
    color: #000;
    .customer{
      .invitatCode{
        @include flex();
        justify-content: center;
        background: #3ED39C;
        height: 220px;
        text-align: center;
        color:#ffffff;
        margin: 20px 20px 0 20px;
        border-radius: 10px;
        h1{
          font-size: 60px;
          font-weight: 600px;
          line-height: 80px;
        }
        >p{
          font-size: 28px;
        }
      }
      .poster{
        @include flex();
        justify-content: center;
        align-items: center;
        background: #ffffff;
        height: 240px;
        text-align: center;
        color:#000;
        margin: 0 20px 20px 20px;
        border-radius: 10px;
        box-sizing: border-box;
        >p{
          font-size: 28px;
          background: #3ED39C;
          border-radius: 10px;
          text-align: center;
          height: 80px;
          line-height: 80px;
          color: #ffffff;
          width: 540px;

        }
        >p:nth-child(2){
          margin-top: 20px;
          background: #FDBA29;
        }
      }
    }
    .invitedRecord{
      background: #ffffff;
      color:#000;
      margin: 20px 20px 20px 20px;
      border-radius: 10px;
      .record{
        font-size: 28px;
        padding: 20px 20px;
        box-sizing: border-box;
      }
      .navigation{
        @include flex(row);
        justify-content: space-between;
        font-size: 26px;
        height: 80px;
        line-height: 80px;
        border-bottom: 1px solid #999;
        padding: 0 50px;
        box-sizing: border-box;
      }
      .recodeAll{
        overflow-y: scroll;
        .recodeNnm{
          @include flex(row);
          justify-content: space-between;
          align-items: center;
          padding: 40px 20px;
          box-sizing: border-box;
          border-bottom: 1px solid #cac3c3;
          >p:nth-child(1){
            color:#000;
            font-size: 28px;
          }
          >p:nth-child(2){
            color:#999;
            font-size: 26px;
          }
        }
      }
    } 
  }
 
</style>
<style lang="scss" >

  .is-placebottom{
    padding: 20px!important;
  }
  .mint-toast-text{
    font-size: 28px;
  }
  
</style>
<style lang="scss" scoped>
  .icon-jiludanzilishijilu{
    font-size: 28px!important;
    color: #3ED39C;
  }
 .one{
    position: relative;
    &::after{
      content: "";
      width:100px;
      height: 0;
      border:1px solid #37D59B;
      position: absolute;
      bottom: 0;
      left: -25px;
    }
  }
  .two{
    position: relative;
    &::after{
      content: "";
      width:100px;
      height: 0;
      border:1px solid #37D59B;
      position: absolute;
      bottom: 0;
      left: 0;
    }
  }

</style>


