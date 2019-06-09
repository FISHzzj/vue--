<template>
  <div :class="$style.content">
    <Panel title="个人中心" shezhi="icon-shezhizhuanhuan" @tranferset="shezhi">
      <section :class="$style.personalInfo" v-for="(list,index) in lists" :key="index">
        <img src="../../common/image/center.png" alt="">
        <div :class="$style.message">
          <div><strong>{{list.realname}}</strong>&nbsp;(正式会员) &nbsp;({{list.is_activation}})</div>
          <p>ID/手机号：&nbsp;<strong>{{list.username}}/{{list.mobile}}</strong></p>
          <p>团队数量：&nbsp;<strong>{{list.team_num}}人</strong></p>
          <p>管理级别：&nbsp;<strong>({{list.team_level}})</strong></p>
        </div>
      </section>
    </Panel>
    <div :class="$style.center" v-for="(list,index) in lists" :key="index">
      <div :class="$style.bgCenter">
        <div>
          <span>MGY</span>
          <span :class="$style.btn" @click="dgyRollOut">转出</span>
          <span :class="$style.btncha" @click="walletDetails">查看</span>
        </div>
        <p>{{list.DGY}}</p>
      </div>
      <div :class="$style.bgCenter">
        <div>
          <span>花肥</span>
          <span :class="$style.btn" @click="rechange">充值</span>
          <span :class="$style.btncha" @click="alimentexam">查看</span>
        </div>
        <p>{{list.nourishment}}</p>
      </div>
    </div> 
    <div :class="$style.earnings" v-for="list in lists" :key="list.id">
      <div>
        <p>{{list.contract_revenue}}</p>
        <p>合约收益</p>
      </div>
       <div>
        <p>{{list.extension}}</p>
        <p>推广收益</p>
      </div>
       <div>
        <p>{{list.team_extension}}</p>
        <p>团队收益</p>
      </div>
    </div>
    <div :class="$style.record">
      <router-link tag="div" to="/getRecord">
        <i class="iconfont icon-qunfengdianjilingqu" style="color:#5a62f4;"></i>
        <p>领取记录</p>
      </router-link>
      <router-link tag="div" to="/transfer">
        <i class="iconfont icon-zhuanhuan1" style="color:#41b3f9;"></i>
        <p>转让记录</p>
      </router-link>
      <router-link tag="div" to="/appointment">
        <i class="iconfont icon-huabanfuben" style="color:#ffae1a;"></i>
        <p>预约记录</p>
      </router-link>
       <router-link tag="div" to="/customer">
        <i class="iconfont icon-kefu" style="color:#ffa6c2;"></i>
        <p>邀请好友</p>
      </router-link>
       
      <router-link tag="div" to="/addCard">
        <i class="iconfont icon-querenshoukuan" style="color:#f9aa1a;"></i>
        <p>收款账户</p>
      </router-link>
      <router-link tag="div" to="/callCenter">
        <i class="iconfont icon-kefu" style="color:#4fd7a2;"></i>
        <p>客服中心</p>
      </router-link>
      <router-link tag="div" to="/informant">
        <i class="iconfont icon-xinxi" style="color:#6298eb;"></i>
        <p>信息</p>
     </router-link>
    </div>
    <div :class="$style.outLogin" @click="outLogin" >退出登录</div>
  </div>
</template>
<script>
import Panel from '../core/panel.vue'
import { Toast } from 'mint-ui'
export default {
  name: 'center',
  components: {
    Panel
  },
  data() {
    return {
      lists: []
    }
  },
  created() {
    this.$emit('footer', true)
    this._center()
  },
  methods: {
    alimentexam() {
      this.$router.push({
        path: '/aliment'
      })
    },
    walletDetails() {
      this.$router.push({
        path: '/walletDetails'
      })
    },
    rechange() {
      this.$router.push({
        path: '/rechange'
      })
    },
    outLogin() {
      this.$axios({
        method: 'get',
        url: `${this.$URL}/app/index.php?i=143&c=entry&do=ws_orchard&m=sz_yi&p=ws_loginout`
      }).then(res => {
        console.log(res)
        Toast({
          message: '退出登录',
          position: 'bottom',
          duration: 1000
        })
        setTimeout(() => {
          this.$router.push({
            path: '/login'
          })
        }, 1000)
      })
    },
    _center() {
      this.$axios({
        method: 'post',
        url: `${this.$URL}/app/index.php?i=143&c=entry&do=ws_orchard&m=sz_yi&p=ws_center`
      }).then(res => {
        console.log(res)
        this.lists.push(res.data.result.list)
      })
    },
    dgyRollOut() {
      this.$router.push({
        path: '/dgyrollout'
      })
    },
    shezhi(msg) {
      console.log(msg)
      this.$router.push({
        path: '/shezhi'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .iconfont{
    font-size: 50px;
  }
  html,body{
    background: #89e0be;
  }
</style>

<style lang="scss" module>
@import "~common/scss/mixin.scss";
@import "~common/scss/element.scss";

.content{
  font-size: 24px;
  .personalInfo{
    @include flex(row);
    flex-wrap: nowrap;
    padding-left: 40px;
    box-sizing: border-box;
    font-size: 24px;
    margin-bottom: 40px;
    >img{
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
    .message{
      padding-left: 20px;
      box-sizing: border-box;
      color: #078040;
      >div{
        line-height: 40px;
        strong{
          color: #207344;
          font-size: 30px;
          font-weight: 700;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      p{
        line-height: 40px;
        strong{
          color: #207344;
          font-size: 28px;
          font-weight: 700;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
  .center{
    width: 100%;
    @include flex(row);
    justify-content: space-around;
    margin-bottom: 30px;
    .bgCenter{
      width: 270px;
      height: 118px;;
      border-radius: 10px;
      background: #55b389;
      padding: 10px 10px;
      box-sizing: border-box;
      position: relative;
      div{
        position: relative;
        >span:first-child{
          position: absolute;
          left: 0;
          top: 10px;
        }
        .btn{
          @include btn($bgcolor:#f5faf8,$color:#55b389,$size:24px,$radius:20px,$padding:8px 18px);
          position: absolute;
          right: 85px;
        }
        .btncha{
          @include btn($bgcolor:#f5faf8,$color:#55b389,$size:24px,$radius:20px,$padding:8px 18px);
          border-bottom-right-radius: inherit;
          border-top-right-radius: inherit;
          position: absolute;
          right: -10px;
          box-sizing: border-box;
        }
      }
      >p{
        position: absolute;
        bottom: 20px;
        font-size: 28px;
        font-weight: 600;
    
      }
    }
  }
  .earnings{
    width: 100%;
    @include flex(row);
    justify-content: space-around;
    background: #f5faf8;
    height: 120px;
    align-items: center;
    div{
      p:first-child{
        font-weight: 600;
        color: #000000;
        font-size: 30px;
        line-height: 40px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: center;
      }
      p:last-child{
        color: #999999;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      position: relative;
      &:after{
        content: '';
        width: 1px;
        height: 70px;
        position: absolute;
        right: -45px;
        top: 0;
        border:1px solid #55b389;
      }
    }
  }
  .record{
     @include flex(row);
     padding: 20px 20px;
     box-sizing: border-box;
     background: #f5faf8;
     color: #000000;
     border-radius: 10px;
     align-items: center;
     width: 95%;
     margin: 20px auto;
    margin-bottom:120px;
    
    div{
      width: 185px;
      height: 185px;
      text-align: center;
      @include flex();
      align-items: center;
      justify-content: center;
      border-right:1px solid #999999;
      border-bottom:1px solid #999999;
      p{
        line-height:60px;
      }
    }
    div:nth-child(3n){
      border-right:0;
    }
  }
  .outLogin{
    text-align: center;
    background: #55b389;
    width:90%;
    margin: 0 auto 150px;
    border-radius: 10px;
    height: 80px;
    line-height: 80px;
  }
}

</style>
<style lang="scss">
  // Toast
  .mint-toast-text{
    font-size: 28px;
  }
</style>

