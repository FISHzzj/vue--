<template>
  <div :class="$style.content">
    <Panel fanhui="icon-huise" title="投诉结果" >
    </Panel>
    <section :class="$style.complanint">
      <div>
        <h2>投诉建议</h2>
        <p>的弗兰克的；弗兰克的数据库了肯定是克服了好借好还立刻就看看大多数所发生的</p>
      </div>
      <div>
        <h2>相关截图</h2>
        <p ref="defaultImg" @click="bigImg($event)">
          <img src="../../common/image/default.png" alt="" >
        </p>
      </div>
      <div>
         <h2>投诉回复：</h2>
        <p>
         打发大的大师傅的的发的分手大师发的发斯蒂芬发的三大
        </p>
      </div>
       <div>
         <h2>投诉结果：<strong>已受理</strong></h2>
      </div>
    </section>
    <div :class="$style.bigImg" v-if="imgShow"><img src="" alt="" ref="bigImg" ></div>
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
      imgShow: false
    }
  },
  created() {
    console.log(this.$route.params.id)
    this._complaintResults(1)
  },
  methods: {
    bigImg(e) {
      console.log(e.target.src)
      this.$refs.bigImg.src = e.target.src
      this.imgShow = true
    },
    _complaintResults(page) {
      this.$axios({
        method: 'post',
        url: `${this.$URL}/app/index.php?i=143&c=entry&do=ws_orchard&m=sz_yi&p=ws_message`,
        params: {
          page: page
        }
      }).then((res) => {
        console.log(res)
        // this.r_code = res.data.result.r_code
        this.lists = res.data.result.list
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
  background: #f6f6f3;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  font-size: 24px;
  height: 100%;
  .complanint{
    color: #999999;
    width: 100%;
    padding: 20px 20px;
    box-sizing: border-box;
    div:nth-child(1){
      >h2{
        font-size: 28px;
        line-height: 50px;
      }
      >p{
        font-size: 26px;
        line-height: 40px;
        background: #ffffff;
        width: 100%;
        padding: 10px 10px;
        box-sizing: border-box;
      }
    }
    div:nth-child(2){
      >h2{
        font-size: 28px;
        line-height: 50px;
      }
      >p{
        font-size: 26px;
        line-height: 40px;
        background: #ffffff;
        width: 100%;
        padding: 10px 10px;
        box-sizing: border-box;
      }
    }
    div:nth-child(3){
      >h2{
        font-size: 28px;
        line-height: 50px;
      }
      >p{
        font-size: 26px;
        line-height: 40px;
        background: #ffffff;
        width: 100%;
        padding: 10px 10px;
        box-sizing: border-box;
      }
    }
    div:nth-child(4){
      background: #ffffff;
      margin-top: 10px;
      >h2{
        font-size: 28px;
        line-height: 50px;
        >strong{
          color: #33d696;
        }
      }
    }
  }
  .bigImg{
    position: fixed;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #000;
    // display: none;
    >img{
      width: 100%;
      height: 100%;
    }
  }
}
</style>

<style lang="scss" scoped>
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
  .icon-liuyan{
    font-size: 100px;
    color: #33d696;
  }
</style>


