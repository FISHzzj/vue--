<template>
  <div :class="$style.content">
    <Panel fanhui="icon-huise" title="农场果园>>种子兑换" >
    </Panel>
    <section :class="$style.exchange" ref="exchange" :style="{ height: wrapperHeight + 'px' }">
      <div>MGY余额 <p>{{dgy}}</p></div>
      <div @click="exchangefruit">兑换水果 <p>{{valueVal}}</p></div>
      <div :class="$style.exchangebtn" @click="exchangebtn"  >兑换</div>
    </section>
    <div :class="$style.mtRadio" v-if="mtRadio">
      <mt-radio
        v-model="valueChoose"
        :options="options"
       >
      </mt-radio>
    </div>
  </div>
</template>
<script>
import Panel from '../core/panel.vue'
import { Toast } from 'mint-ui'
export default {
  name: 'exchange',
  components: {
    Panel
  },
  data() {
    return {
      wrapperHeight: '',
      valueChoose: '',      // 存放所选选项（字符串）
      valueVal: '',
      mtRadio: false,
      options: [],
      dgy: '',
      canSave: true
    }
  },
  created() {
    this._exchange()
  },
  mounted() {
    this.wrapperHeight = document.documentElement.clientHeight - this.$refs.exchange.getBoundingClientRect().top
  },
  methods: {
    _exchange() {
      this.$axios({
        method: 'post',
        url: `${this.$URL}/app/index.php?i=143&c=entry&do=ws_orchard&m=sz_yi&p=ws_dgy`,
        params: {
          op: 'exchange'
        }
      }).then((res) => {
        if (res.data.status == 1) {
          console.log(res)
          this.dgy = res.data.result.MGY
          res.data.result.list.forEach((value, index) => {
            let titlePrice = `${value.title}(价值：${value.block_min})`
            this.options.push({
              label: titlePrice,
              value: value.id
            })
          })
          console.log(this.options)
        } else {
          alert(res.data.result.list)
          this.$router.back()
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    exchangefruit() {
      // this._exchange()
      this.mtRadio = true
    },
    exchangebtn() {
      if (!this.canSave) {
        return
      }
      this.canSave = false
      this.$axios({
        method: 'post',
        url: `${this.$URL}/app/index.php?i=143&c=entry&do=ws_orchard&m=sz_yi&p=ws_dgy`,
        params: {
          op: 'payment',
          seed_id: this.valueChoose
        }
      }).then((res) => {
        if (res.data.status == 1) {
          console.log(res)
          // alert(res.data.result.list)
          Toast({
            message: res.data.result.list,
            position: 'bottom',
            duration: 1000
          })
          setTimeout(() => {
            this.canSave = true
            this.$router.back()
          }, 2000)
        } else {
          // alert(res.data.result.list)
          Toast({
            message: res.data.result.list,
            position: 'bottom',
            duration: 2000
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    }

  },
  watch: {
    valueChoose (val) {
      console.log('val', val)
      // console.log(this.options)
      this.options.forEach((value, index) => {
        if (value.value == val) {
          this.valueVal = value.label
        }
      })
      this.mtRadio = false
      // this.options = []
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
      align-items: center;
      width: 100%;
      height: 80px;
      line-height: 80px;
      font-size: 30px;
      padding: 20px 40px;
      box-sizing: border-box;
      background: #ddd;
      >p{
        color: #000000;
        font-weight: 600;
         margin-left: 40px;
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
.mint-cell-wrapper{
  font-size: 28px;
  line-height: 3
}
.mint-radio-core{
    width: 30px;
    height: 30px;
  &::after{
    top: 6px;
    left: 6px;
    width: 16px;
    height: 16px;
  }
}
.mint-radiolist{
  margin-top: 200px;
  width: 90%;
  margin: 200px auto;
}

.mint-toast-text{
  font-size: 28px;
}
</style>



