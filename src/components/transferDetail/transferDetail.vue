<template>
  <transition name="slide">
    <div :class="$style.content">
      <Panel fanhui="icon-huise" title="果园详情" ></Panel>
      <section :class="$style.detail">
        <div :class="$style.detailContent">
          <p>种子名称：蓝莓<p>
          <p>种子编号：1011921</p>
          <p>种子价值：5773.03</p>
          <p>智能合约收益：120小时/12.50%</p>
          <p>挂单时间：2019-05-04 10:26:27</p>
          <p>付款时间：2019-05-04 10:26:27</p>
          <p>转让方：ppp444</p>
          <p>转让方紧急电话：13811111111</p>
          <p>领养方：祥仔</p>
          <p>领养方紧急电话：13811111111</p>
          <p>收益状态：等待收益</p>
        </div>
        <div :class="$style.perNumer">
          <h4>转让方收款账号</h4>
          <div>
            <img src="../../common/image/default.png" alt="">
            <div>
              <p>账户名称：祥总</p>
              <p>账号：祥总</p>
              <p>账户类型：微信支付</p>
            </div>
          </div>
          <div>
            <img src="../../common/image/default.png" alt="">
            <div>
              <p>账户名称：祥总</p>
              <p>账号：祥总</p>
              <p>账户类型：农行支付</p>
              <p>支行名称：广州支行</p>
            </div>
          </div>
        </div>
        <InputFile title="付款凭证" @selectpic="selectImage"></InputFile>
        <div :class="$style.up">确认提交</div>
      </section>
    </div>
  </transition>

</template>
<script>
import Panel from '../core/panel.vue'
import InputFile from '../core/inputFile.vue'
export default {
    components:{
      Panel,
      InputFile
    },
    data() {
      return {
        tagIndex:1
      }
    },
    methods: {
      tag(index){
        this.tagIndex=index; 
      },
      selectImage(e){
        console.log(e)
      },
      fileup(){

      }
    },
}
</script>



<style lang="scss" module>
@import "~common/scss/mixin.scss";
@import "~common/scss/element.scss";
.content{
  position: fixed;
  top: 0;
  left: 0;
  background: #ffffff;
  height: 93%;
  width: 100%;
  font-size: 24px;
  color: #000000;
  overflow-y: scroll;
  .detail{
    padding: 20px 20px;
    .detailContent{

      p{
        line-height: 40px;
      }
    }
    .perNumer{
      margin-top: 30px;
      >h4{
        color: #000000;
        font-size: 30px;
        font-weight: 600;
        line-height: 50px;
      }
      >div{
        @include flex(row);
        align-items: center;
        margin-top:20px;
        >img{
          width: 150px;
          height: 150px;
        }
        >div{
          margin-left: 30px;
          p{
            line-height: 40px;
          }
        }
      }
    }
    .up{
      width: 90%;
      margin: 20px auto;
      height: 50px;
      background: #89e0be;
      border-radius: 10px;
      text-align: center;
      line-height: 50px;
      color: #ffffff;
      margin-bottom: 40px;
    }
  }
}

</style>
<style lang="scss" scoped>
  .iconfont{
    font-size: 50px;
  }

  html,body{
    background: #f5f5f5;
  }
  .slide-enter-active, .slide-leave-active {
    transition: all 1s ease;
  }
  .slide-enter, .slide-leave-to {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  .active{
    position: relative;
    &::after{
      content: "";
      width: 100px;
      height: 0;
      border:2px solid #33d696;
      position: absolute;
      bottom: -1px;
      left: -14px;

    }
  }
</style>




