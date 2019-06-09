<template>
  <div :class="$style.content">
    <Panel fanhui="icon-huise" title="农场果园>>花肥充值" >
    </Panel>
    <section :class="$style.exchange" ref="exchange" :style="{ height: wrapperHeight + 'px' }">
      <div>当前的MGY余额 <p>{{recharge}}</p></div>
      <div >充值花肥 <label for="valueChoose"><input type="text" id="valueChoose" v-model="valueChoose"></label></div>
      <div :class="$style.exchangebtn" @click="exchangebtn" >充值</div>
    </section>
  </div>
</template>
<script>
import Panel from '../core/panel.vue'
import { Toast } from 'mint-ui'
export default {
  name: 'rechange',
  components: {
    Panel
  },
  data() {
    return {
      wrapperHeight: '',
      valueChoose: '',
      recharge: ''
    }
  },
  created() {
    this._rechang()
  },
  mounted() {
    this.wrapperHeight = document.documentElement.clientHeight - this.$refs.exchange.getBoundingClientRect().top
  },
  methods: {
    _rechang() {
      this.$axios({
        method: 'post',
        url: `${this.$URL}/app/index.php?i=143&c=entry&do=ws_orchard&m=sz_yi&p=ws_nourishment`,
        params: {
          op: 'recharge'
        }
      }).then((res) => {
        // console.log(res)
        this.recharge = res.data.result.profit
        setTimeout(() => {
          alert(res.data.result.list)
        }, 1000)
      }).catch((err) => {
        console.log(err)
      })
    },
    exchangebtn() {
      if (this.valueChoose == '') {
        Toast({
          message: '充值花肥不能为空！',
          position: 'bottom',
          duration: 2000
        })
        return
      }
      // this.$axios({
      //   method: 'post',
      //   url: `${this.$URL}/app/index.php?i=143&c=entry&do=ws_orchard&m=sz_yi&p=ws_nourishment`,
      //   params: {
      //     op: 'recharge'
      //   }
      // }).then(res => {
      //   console.log(res)
      // if (res.data.status == 1) {
      // MessageBox.confirm(res.data.result.list).then(action => {
            // console.log(1111)
      this.$axios({
        method: 'post',
        url: `${this.$URL}/app/index.php?i=143&c=entry&do=ws_orchard&m=sz_yi&p=ws_nourishment`,
        params: {
          op: 'payment',
          nourishment: this.valueChoose
        }
      }).then((res) => {
        console.log(res)
        if (res.data.status == 1) {
          alert(res.data.result.list)
          this.valueChoose = ''
          this.$router.go(-1)
        } else {
          alert(res.data.result.list)
          this.valueChoose = ''
        }
      }).catch((err) => {
        console.log(err)
      })
      // })
      // }
      // })
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
  color: #000000;
  .exchange{
    margin-top: 100px;
    background: #F4F2F5;
    div:first-child{
      @include flex(row);
      align-items: center;
      width: 100%;
      height: 80px;
      line-height: 80px;
      font-size: 30px;
      padding: 20px 40px;
      box-sizing: border-box;
      background: #ddd;
      >p{
        margin-left: 40px;
        color: #3ECC9F;
      }
    }
    div:nth-child(2){
      @include flex(row);
      flex-wrap: nowrap;
      white-space: nowrap;
      align-items: center;
      width: 100%;
      height: 80px;
      line-height: 80px;
      font-size: 30px;
      padding: 20px 40px;
      box-sizing: border-box;
      background: #ddd;
      input{
        background:#ddd;
        padding:10px 20px;
        color: #3ECC9F;
      }
    }
    .exchangebtn{
      width: 90%;
      line-height: 80px;
      height: 80px;
      border-radius: 10px;
      margin: 20px auto;
      text-align: center;
      background-color: #3ECC9F;
      color: #FEFCFF;
      font-size: 30px;
    }
  }
  .mtRadio{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
  }
}

</style>
<style lang="scss">
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
  .is-placebottom{
    padding: 20px!important;
  }
  .mint-toast-text{
    font-size: 28px;
  }
</style>


