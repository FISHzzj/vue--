<template>
  <div :class="$style.content">
    <Panel fanhui="icon-huise" :title="title" >
    </Panel>
    <section :class="$style.shezhi">
      <div><p>*为确保账号安全，需要验证当前手机</p><p>当前绑定手机号码：<strong>{{mobile}}</strong></p></div>
      <div><span>短信验证</span><input type="text" v-model="number" placeholder="请输入短信验证码"><span :class="$style.getList" @click="getList" ref="verifihandle">获取短信</span></div>
      <div><span>输入旧密码</span><input type="text" v-model="quePhone" placeholder="请输入新密码"></div>
      <div><span>确认新密码</span><input type="text" v-model="newPhone" placeholder="请再输入新密码"></div>
    </section>
    <div :class="$style.upLoad" @click="upLoad">确认提交</div>
  </div>
</template>
<script>
import Panel from '../core/panel.vue'
import { Toast } from 'mint-ui'
export default {
  name: 'loginpwd',
  components: {
    Panel
  },
  data() {
    return {
      number: '',
      newPhone: '',
      quePhone: '',
      sendCodeNum: 60,
      pay_pwd: '',
      title: '修改登录密码',
      type: 'login_pwd'

    }
  },
  created() {
    // console.log(this.$route.query)

    this.mobile = this.$route.query.mobile
    this.username = this.$route.query.username
    if (this.$route.query.type == 'pay_pwd') {
      this.pay_pwd = this.$route.query.pay_pwd
      this.title = '修改支付密码'
      this.type = 'pay_pwd'
    }
  },

  methods: {
    loginpwd() {
      this.$router.push({
        path: '/loginpwd'
      })
    },
    getList() {
      this.$axios({
        method: 'post',
        url: `${this.$URL}/app/index.php?i=143&c=entry&do=member&m=sz_yi&p=sendcode`,
        params: {
          op: 'update_pwd',
          mobile: this.mobile,
          username: this.username
        }
      }).then((res) => {
        console.log(res)
        if (res.data.status == 0) {
          var timer = setInterval(() => {
            // console.log(this.sendCodeNum)
            if (this.sendCodeNum == 0) {
              clearInterval(timer)
              this.$refs.verifihandle.innerHTML = '获取验证码'
              this.sendCodeNum = 60
              return
            }
            this.sendCodeNum = this.sendCodeNum - 1
            this.$refs.verifihandle.innerHTML = `${this.sendCodeNum}s`
          }, 1000)
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    upLoad() {
      this.$axios({
        method: 'post',
        url: `${this.$URL}/app/index.php?i=143&c=entry&do=ws_orchard&m=sz_yi&p=ws_setting`,
        params: {
          op: 'update_pwd',
          type: this.type,
          m_code: this.number,
          pwd: this.quePhone,
          new_pwd: this.newPhone
        }
      }).then((res) => {
        console.log(res)
        if (res.data.status == 1) {
          Toast({
            message: res.data.result.list,
            position: 'bottom',
            duration: 2000
          })
          setTimeout(() => {
            this.$router.push({
              path: '/center'
            })
          }, 2000)
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}

</script>


<style lang="scss" module>
@import "~common/scss/mixin.scss";
@import "~common/scss/element.scss";

.content{
  // background: #ffffff;
  font-size: 27px;
  height: 100%;
  .shezhi{
    color: #201f1f;
    width: 100%;
    >div{
      @include flex(row);
      align-items: center;
      padding: 30px 20px;
      box-sizing: border-box;
      border-bottom: 1px solid #999;
      background: #ffffff;
      >input{
        margin-left: 15px;
        color: #999;
        font-size: 26px;
      }
      .getList{
        // border:1px solid #000;
        padding: 10px 20px;
        box-sizing: border-box;
        border-radius: 10px;
        background: #89e0be;
        color: #ffffff;
      }
    }
    >div:nth-child(1){
      >p:nth-child(1){
        font-size: 24px;
        line-height: 60px;
        color: #999;
      }
    }
    >div:nth-child(2){
      flex-wrap: nowrap;
      >span{
        white-space: nowrap
      }
    }
  }
  .upLoad{
    background: #31c78d;
    text-align: center;
    margin: 20px;
    line-height: 80px;
    border-radius: 20px;

  }
}
</style>
<style lang="scss" >
  .mint-toast-text{
    font-size: 28px;
  }
</style>




