<template>
    <div :class="$style.content" >
      <Panel fanhui="icon-huise" title="注册"></Panel>
      <div :class="$style.register">
        <div :class="$style.uname"><label for="uname">用户名：<input type="text" id="uname" v-model="uname"></label></div>
        <div :class="$style.uphone"><label for="uphone">手机号：<input type="text" id="uphone" v-model="uphone"></label></div>
        <div :class="$style.verifi"><label for="verifi">手机验证码：<input type="text" id="verifi" v-model="verifi"></label><span ref="verifihandle" @click="verifihandle">获取验证码</span></div>
        <div :class="$style.upwd"><label for="upwd">登录密码：<input type="password" id="upwd" v-model="upwd"></label></div>
        <div :class="$style.qupwd"><label for="qupwd">确认登录密码：<input type="password" id="qupwd" v-model="qupwd"></label></div>
        <div :class="$style.cardId"><label for="cardId">身份证号：<input type="text" id="cardId" v-model="cardId"></label></div>
        <div :class="$style.username"><label for="username">姓名：<input type="text" id="username" v-model="username" ></label></div>
        <div :class="$style.referCode"><label for="referCode">推荐码：<input type="text" id="referCode" v-model="referCode"></label></div>
        <div :class="$style.paypwd"><label for="paypwd">支付密码：<input type="password" id="paypwd" v-model="paypwd"></label></div>
        <div :class="$style.qpaypwd"><label for="qpaypwd">确认支付密码：<input type="password" id="qpaypwd" v-model="qpaypwd"></label></div>
      </div>
       <div :class="$style.onceRegister" @click="register">立即注册</div>
    </div>

</template>
<script>
import Panel from '../core/panel.vue'
import { Toast } from 'mint-ui'
export default {
  name: 'register',
  components: {
    Panel
  },
  data() {
    return {
      uname: '',
      uphone: '',
      verifi: '', // 手机验证码：
      upwd: '',
      qupwd: '',
      cardId: '',
      username: '',
      referCode: '', // 推荐码
      paypwd: '',
      qpaypwd: '',
      sendCodeNum: 60
    }
  },
  created() {
    this.$emit('footer', false)
    if (this.$route.query.rCode) {
      this.referCode = this.$route.query.rCode
      document.getElementById('referCode').setAttribute('readonly', 'readonly')
    }
  },
  methods: {
    verifihandle() {
      if (this.uphone == '') {
        Toast({
          message: '手机号不能为空',
          position: 'bottom',
          duration: 1000
        })
        return
      }
      // console.log(`${this.$URL}/app/index.php?i=143&c=entry&do=member&m=sz_yi&p=sendcode`)
      let postData = this.$qs.stringify({
        op: 'sendcode',
        mobile: this.uphone
      })
      // alert(11122)
      this.$axios({
        method: 'post',
        url: `${this.$URL}/app/index.php?i=143&c=entry&do=member&m=sz_yi&p=sendcode`,
        data: postData
      }).then((res) => {
        // alert(111)
        // console.log(res)
        // console.log(2222)
        var timer = setInterval(() => {
          console.log(this.sendCodeNum)
          if (this.sendCodeNum == 0) {
            clearInterval(timer)
            this.$refs.verifihandle.innerHTML = '获取验证码'
            this.sendCodeNum = 60
            return
          }
          this.sendCodeNum = this.sendCodeNum - 1
          this.$refs.verifihandle.innerHTML = `${this.sendCodeNum}s`
        }, 1000)
      })
    },
    register() {
      if (this.uname == '') {
        Toast({
          message: '用户名不能为空',
          position: 'bottom',
          duration: 1000
        })
        return
      }
      if (this.uphone == '') {
        Toast({
          message: '手机号不能为空',
          position: 'bottom',
          duration: 1000
        })
        return
      }
      if (this.verifi == '') {
        Toast({
          message: '手机验证码不能为空',
          position: 'bottom',
          duration: 1000
        })
        return
      }
      if (this.upwd == '') {
        Toast({
          message: '密码不能为空',
          position: 'bottom',
          duration: 1000
        })
        return
      }
      if (this.qupwd == '' && this.upwd == this.qupwd) {
        Toast({
          message: '确认密码不能为空',
          position: 'bottom',
          duration: 1000
        })
        return
      }
      if (this.cardId == '') {
        Toast({
          message: '身份证号不能为空',
          position: 'bottom',
          duration: 1000
        })
        return
      }
      if (this.username == '') {
        Toast({
          message: '姓名不能为空',
          position: 'bottom',
          duration: 1000
        })
        return
      }
      if (this.referCode == '') {
        Toast({
          message: '推荐码不能为空',
          position: 'bottom',
          duration: 1000
        })
        return
      }
      if (this.paypwd == '') {
        Toast({
          message: '支付密码不能为空',
          position: 'bottom',
          duration: 1000
        })
        return
      }
      if (this.qpaypwd == '' && this.qpaypwd == this.paypwd) {
        Toast({
          message: '确认支付密码不能为空',
          position: 'bottom',
          duration: 1000
        })
        return
      }
      let postData = this.$qs.stringify({
        op: 'register',
        type: 'add',
        mobile: this.uphone,
        username: this.uname,
        password: this.upwd,
        pay_password: this.paypwd,
        id_card: this.cardId,
        realname: this.username,
        r_code: this.referCode, // 推荐码
        m_code: this.verifi // 手机验证码
      })
      this.$axios({
        method: 'post',
        url: `${this.$URL}/app/index.php?i=143&c=entry&do=ws_orchard&m=sz_yi&p=ws_login`,
        data: postData
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
        } else {
          Toast({
            message: res.data.result.list,
            position: 'bottom',
            duration: 2000
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" module>
@import "~common/scss/element.scss";

  .content{
     background: #ffffff;
     padding-bottom: 100px;
    .register{
      font-size: 30px;
      width: 100%;
      height: 100%;
      background: #ffffff;
      color: #000;
      .uname,.uphone,.verifi,.upwd,.qupwd,.cardId,.username,.referCode,.paypwd,.qpaypwd{
        padding: 20px 30px;
        box-sizing: border-box;
        position: relative;
        >input{
          border: 0;
          width: 500px;
          height: 50px;
          outline:none；
        }
        &:after{
          position: absolute;
          content: '';
          width: 90%;
          height: 0;
          border-bottom: 1px solid #999999;
          bottom: 0;
          left: 30px;
          right: 30px;
        }
      }
      .verifi{
        @include flex(row);
        flex-wrap: nowrap;
        justify-content: center;
        align-items: center;
      
        input{
           width: 240px;
        }
        >span{
          white-space: nowrap;
          color: #89e0be;
          position: relative;
          width: 160px;
          text-align: center;
          &::after{
            position: absolute;
            content: '';
            width: 1px;
            height: 60px;
            border-right: 1px solid rgba($color: #000000, $alpha: .4);
            right: 160px;
            top: -15px;
          }
        }
      }
      .qupwd{
         >input{
           width: 300px;
           height: 50px;
           line-height: 50px;
        }
      }
      .qpaypwd{
        input{
           width: 300px;
        }
      }
    }
    .onceRegister{
        width: 90%;
        margin: 20px auto;
        height: 80px;
        text-align: center;
        background: #89e0be;
        border-radius: 10px;
        line-height: 80px;
        color: #ffffff;
        margin-top: 40px;
        margin-bottom: 100px;
        font-size: 28px;
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

