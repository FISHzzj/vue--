<template>
  <div id="app">
    <keep-alive :exclude="exclude">
      <router-view  @footer="footer"></router-view>
    </keep-alive>
    <Footer v-if="tabFooter"></Footer>
  </div>
</template>

<script>
import MHeader from 'components/m-header/m-header'
import Tab from 'components/tab/tab'
import Footer from 'components/footer/footer'
export default {
  components: {
    MHeader,
    Tab,
    Footer
  },
  data() {
    return {
      // 不被缓存的组件
      exclude: ['login', 'market', 'orchard', 'center', 'getAccount', 'account', 'lookOver', 'transfer', 'appointment', 'inform', 'rechange', 'customer', 'loginpwd', 'addCard', 'walletDetails', 'aliment', 'dgyrollout', 'rollOut', 'exchange', 'qrCode', 'getRecord'],
      tabFooter: true
    }
  },
  methods: {
    // 是否显示底部
    footer(bool) {
      this.tabFooter = bool
    }
  },
  watch: {

  }

}
</script>

<style lang="scss" scoped>
#app{
  height: 100%;
}
</style>
<style lang="scss">
.vc-switch{
  font-size: 28px!important;
}
</style>


