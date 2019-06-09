<template>
    <section :class="$style.content" :style="{height:h+'px'}">
      <div :class="$style.loginImg"><img src="../../common/image/loge.png" alt=""></div>
      <div :class="$style.uname"><label for="uname">用户名：<input type="text" id="uname" v-model="uname"></label></div>
      <div :class="$style.upwd"><label for="upwd">登录密码：<input type="password" id="upwd" v-model="upwd"></label></div>
      <div :class="$style.code">
        <input type="text" class="topAlign" id="verify" name="verify" v-model="verify" required>
        <canvas width="100" height="40" id="verifyCanvas"></canvas>
        <img id="code_img" @click="codeImg">
      </div>
      <div :class="$style.login" @click="login">立即登录</div>
      <div :class="$style.register">
        <router-link tag="span" to="/register"> 注册</router-link>
        <router-link tag="span" to="/forgetPwd"> 忘记密码？</router-link>
      </div>
    </section>
</template>
<script>
import { Toast } from 'mint-ui'
import '../../common/js/jquery-1.11.1.min.js'
export default {
  name: 'login',
  data() {
    return {
      h: '',
      uname: '',
      upwd: '',
      nums: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
        'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x',
        'y', 'z'],
      c: '', // 验证码
      verify: '' // 输入的验证码

    }
  },
  created() {
    this.h = document.documentElement.clientHeight || document.body.clientHeight

    this.$emit('footer', false)
  },
  mounted() {
    this.codeImg()
  },
  methods: {
    drawCode() {
      var canvas = document.getElementById('verifyCanvas')  // 获取HTML端画布
      var context = canvas.getContext('2d')                 // 获取画布2D上下文
      context.fillStyle = 'cornflowerblue'                  // 画布填充色
      context.fillRect(0, 0, canvas.width, canvas.height)   // 清空画布
      context.fillStyle = 'white'                           // 设置字体颜色
      context.font = '25px Arial'                           // 设置字体
      var rand = new Array()
      var x = new Array()
      var y = new Array()
      for (var i = 0; i < 5; i++) {
        rand[i] = this.nums[Math.floor(Math.random() * this.nums.length)]
        x[i] = i * 16 + 10
        y[i] = Math.random() * 20 + 20
        context.fillText(rand[i], x[i], y[i])
      }
      // alert(rand)
      // console.log(rand)
      this.c = rand.join('') // abcde
      console.log(this.c)
      // 画3条随机线
      for (var i = 0; i < 3; i++) {
        this.drawline(canvas, context)
      }

        // 画30个随机点
      for (var i = 0; i < 30; i++) {
        this.drawDot(canvas, context)
      }
      this.convertCanvasToImage(canvas)
    },
     // 随机线
    drawline(canvas, context) {
      context.moveTo(Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.height))             // 随机线的起点x坐标是画布x坐标0位置，y坐标是画布高度的随机数
      context.lineTo(Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.height))  // 随机线的终点x坐标是画布宽度，y坐标是画布高度的随机数
      context.lineWidth = 0.5                                                  // 随机线宽
      context.strokeStyle = 'rgba(50,50,50,0.3)'                               // 随机线描边属性
      context.stroke()                                                         // 描边，即起点描到终点
    },
    // 随机点(所谓画点其实就是画1px像素的线，方法不再赘述)
    drawDot(canvas, context) {
      var px = Math.floor(Math.random() * canvas.width)
      var py = Math.floor(Math.random() * canvas.height)
      context.moveTo(px, py)
      context.lineTo(px + 1, py + 1)
      context.lineWidth = 0.2
      context.stroke()
    },
    // 绘制图片
    convertCanvasToImage(canvas) {
      document.getElementById('verifyCanvas').style.display = 'none'
      var image = document.getElementById('code_img')
      image.src = canvas.toDataURL('image/png')
      return image
    },
    codeImg() {
      $('#verifyCanvas').remove()
      $('#verify').after('<canvas width="100" height="40" id="verifyCanvas"></canvas>')
      this.drawCode()
    },
    login() {
      if (this.uname == '') {
        Toast({
          message: '用户名不能为空',
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
      if (this.verify == '') {
        Toast({
          message: '验证码不能为空',
          position: 'bottom',
          duration: 1000
        })
        return
      }
      if (this.verify.toUpperCase() != this.c.toUpperCase()) {
        Toast({
          message: '验证码不正确',
          position: 'bottom',
          duration: 1000
        })
        return
      }
      let postData = this.$qs.stringify({
        op: 'login',
        username: this.uname,
        password: this.upwd
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
  .mint-toast-text{
    font-size: 28px;
  }
  .content{
    font-size: 30px;
    width: 100%;
    height: 100%;
    background: #ffffff;
    color: #000;
    .loginImg{
      width: 100%;
      text-align: center;
      img{
        width: 160px;
        height: 160px;
        border-radius: 10px;
        margin:50px auto;
        text-align: center;
      }
    }
    .uname,.upwd,.code{
      padding: 30px 30px;
      box-sizing: border-box;
      position: relative;
      input{
        border: 0;
        width: 400px;
        height: 50px;
        outline:none；
      }
      &:after{
        position: absolute;
        content: '';
        width: 90%;
        height: 0;
        border-bottom: 1px solid rgba($color: #000000, $alpha: .4);
        bottom: 0;
        left: 30px;
        right: 30px;
      }
    }
    .login{
      width: 90%;
      margin: 20px auto;
      height: 80px;
      text-align: center;
      background: #89e0be;
      border-radius: 10px;
      line-height: 80px;
      color: #ffffff;
      margin-top: 40px;
    }
    .register{
      @include flex(row);
      justify-content: space-between;
      padding: 10px 30px;
      span:first-child{
        color: #89e0be;
      }
    }
    
  }
</style>
<style lang="scss" scoped>
#verify {
    height: 70px;
    vertical-align: top;
    font-size: 40px;
    width: 350px;
    border: 1px solid #eeeeee;
}

#code_img {
    width: 150px;
    height: 70px;
    cursor: pointer;
    vertical-align: top;
    margin-left: 35px;
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


