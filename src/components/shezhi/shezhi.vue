<template>
  <div :class="$style.content">
    <Panel fanhui="icon-huise" title="个人资料" >
    </Panel>
    <section :class="$style.shezhi">
      <div><span>用户名</span><span>{{realname}}</span></div>
      <div><span>当前账户</span><span>{{username}}</span></div>
      <div @click="loginpwd"><span>登录密码</span><span>****</span></div>
      <div @click="paypwd"><span>支付密码</span><span>****</span></div>
      <div><span>关于我们</span><span></span></div>
    </section>
  </div>
</template>
<script>
import Panel from '../core/panel.vue'
export default {
  components: {
    Panel
  },
  data() {
    return {
      mobile: '',
      realname: '',
      username: ''
    }
  },
  created() {
    this.shezhi()
  },

  methods: {
    loginpwd() {
      this.$router.push({
        path: '/loginpwd',
        query: {
          mobile: this.mobile,
          username: this.username
        }
      })
    },
    paypwd() {
      this.$router.push({
        path: '/loginpwd',
        query: {
          mobile: this.mobile,
          username: this.username,
          type: 'pay_pwd'
        }
      })
    },
    shezhi() {
      this.$axios({
        method: 'post',
        url: `${this.$URL}/app/index.php?i=143&c=entry&do=ws_orchard&m=sz_yi&p=ws_setting`
      }).then((res) => {
        console.log(res)
        if (res.data.status == 1) {
          this.mobile = res.data.result.list.mobile
          this.realname = res.data.result.list.realname
          this.username = res.data.result.list.username
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
  font-size: 28px;
  height: 100%;
  .shezhi{
    color: #201f1f;
    width: 100%;
    >div{
      @include flex(row);
      justify-content: space-between;
      padding: 30px 20px;
      box-sizing: border-box;
      border-bottom: 1px solid #999;
      background: #ffffff;
    }
    >div:nth-child(3){
      margin-top: 20px;
    }
    >div:nth-child(5){
      margin-top: 20px;
    }
  }
}
</style>




