<template>
    <div :class="$style.content" >
      <Panel fanhui="icon-huise" title="财务管理>>货币转账"></Panel>
      <div :class="$style.register" v-for="(list,index) in lists" :key="index">
        <div :class="$style.uname"><label for="uname">转账选择：{{list.title}}</label></div>
        <div :class="$style.uphone"><label for="uphone">转出账户：{{list.turnout_account}}</label></div>
        <div :class="$style.verifi"><label for="verifi">账户余额：{{list.balance}}</label></div>
        <div :class="$style.upwd"><label for="upwd">转入账户：{{list.turnout_account}}</label></div>
        <div :class="$style.qupwd"><label for="qupwd">转账类型：{{list.turnout_type}}</label></div>
        <div :class="$style.cardId"><label for="cardId">网络限定：{{list.turnout_limit}}</label></div>
        <div :class="$style.username"><label for="username">转入用户名：<input type="text" v-model="username" id="username"></label></div>
        <div :class="$style.referCode"><label for="referCode">转账金额：<input type="text" v-model="price" id="referCode"></label></div>
        <div :class="$style.paypwd"><label for="paypwd">备注：<input type="text" v-model="remarks" id="paypwd"></label></div>
      </div>
       <div :class="$style.onceRegister" @click="onceRegister" >确定</div>
    </div>

</template>
<script>
import Panel from '../core/panel.vue'
// eslint-disable-next-line standard/object-curly-even-spacing
import {MessageBox, Toast } from 'mint-ui'
export default {
  name: 'rollOut',
  components: {
    Panel
  },
  data() {
    return {
      username: '',
      price: '',
      paypwd: '',
      qpaypwd: '',
      lists: [],
      remarks: ''
    }
  },
  created() {
    this._rollOut()
  },
  methods: {
    _rollOut() {
      this.$axios({
        method: 'post',
        url: `${this.$URL}/app/index.php?i=143&c=entry&do=ws_orchard&m=sz_yi&p=ws_nourishment`,
        params: {
          op: 'turnout'
        }
      }).then(res => {
        console.log(res)
        if (res.data.status == 1) {
          this.lists.push(res.data.result.list)
        } else {
          Toast({
            message: res.data.result.list,
            position: 'bottom',
            duration: 2000
          })
          setTimeout(() => {
            this.$router.back()
          }, 2000)
        }
      })
    },
    onceRegister() {
      if (this.username == '') {
        Toast({
          message: '转入用户名不能为空',
          position: 'bottom',
          duration: 2000
        })
        return
      }
      if (this.price == '') {
        Toast({
          message: '转账金额不能为空',
          position: 'bottom',
          duration: 2000
        })
        return
      }
      MessageBox.prompt('请输入支付密码').then(({ value, action }) => {
        // console.log(value)
        if (value == '') {
          return
        }
        this.$axios({
          method: 'post',
          url: `${this.$URL}/app/index.php?i=143&c=entry&do=ws_orchard&m=sz_yi&p=ws_nourishment`,
          params: {
            op: 'turnoutPay',
            username: this.username,
            price: this.price,
            remarks: this.remarks,
            pay_password: value
          }
        }).then(res => {
          console.log(res)
          if (res.data.status == 1) {
            alert(res.data.result.list)
            this.$router.go(-1)// 返回上一层
          } else {
            Toast({
              message: res.data.result.list,
              position: 'bottom',
              duration: 2000
            })
          }
        })
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
          border-bottom: 1px solid #999999;
          bottom: 0;
          left: 30px;
          right: 30px;
        }
      }
      .verifi{
        // @include flex(row);
        // flex-wrap: nowrap;
        // justify-content: center;
        // align-items: center;
      
        // input{
        //    width: 240px;
        // }
        >span{
          white-space: nowrap;
          color: #89e0be;
          position: relative;
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
         input{
           width: 300px;
           height: 50px;
           line-height: 50px;
        }
      }
      .qpaypwd{
        input{
           width: 30px;
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
.mint-msgbox-input input{
  height: 70px;
  font-size: 40px;
}
// Toast
.mint-toast-text{
  font-size: 28px;
}
</style>

