<template>
  <div :class="$style.content">
    <Panel fanhui="icon-huise" title="推广二维码" >
    </Panel>
    <section :class="$style.qrcode">
      <div id="qrcode">二维码位置</div>   
    </section>
  </div>
</template>
<script>
import Panel from '../core/panel.vue'
import QRCode from 'qrcodejs2'
export default {
  name: 'qrCode',
  components: {
    Panel
  },
  data() {
    return {
      rCode: ''
    }
  },
  created() {
    console.log(this.$route.query.rCode)
    this.rCode = this.$route.query.rCode
  },
  mounted() {
    this.qrcode()
  },
  methods: {
    qrcode () {
      let rcode = `${this.$URL}/dist/index.html#/register?rCode=${this.rCode}`
      let qrcode = new QRCode('qrcode', {
        width: 800,
        height: 800, // 高度
        text: rcode // 二维码内容
        // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
        // background: '#f0f'
        // foreground: '#ff0'
      })
      console.log(qrcode)
    }
  }
}

</script>


<style lang="scss" module>
@import "~common/scss/mixin.scss";
@import "~common/scss/element.scss";

.content{
  // background: #f6f6f3;
  font-size: 24px;
  height: 100%;
  .qrcode{
    img{
      width: 400px;
    }
  }
}

</style>
<style lang="scss" scoped>
#qrcode{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    color: #89e0be;
  }
</style>





