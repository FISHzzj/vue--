<template>
  <transition name="slide">
    <div :class="$style.content">
      <Panel fanhui="icon-huise" title="交易记录" ></Panel>
      <section :class="$style.detail" v-for="(list,index) in lists " :key="index">
        <div :class="$style.detailContent">
          <p>种子名称：{{list.title}}<p>
          <p>种子编号：{{list.seed_id}}</p>
          <p>种子价值：{{list.price}}</p>
          <p>智能合约收益：{{list.profit}}</p>
          <p>挂单时间：{{list.mature_time}}</p>
          <p>付款时间：{{list.createtime1}}</p>
          <p>转让方：{{list.sell_out_name}}</p>
          <p>转让方紧急电话：{{list.sell_out_mobile}}</p>
          <p>领养方：{{list.purchase_name}}</p>
          <p>领养方紧急电话：{{list.purchase_mobile}}</p>
          <p>收益状态：{{list.status}}</p>
        </div>
        <div :class="$style.perNumer" v-if="status==1" >
          <h4>转让方收款账号</h4>
          <div v-for="(item,index) in list.payment" :key="index">
            <img :src="item.thumb" alt="">
            <div>
              <p>账户名称：{{item.realname}}</p>
              <p>账号：{{item.username}}</p>
              <p>账户类型：{{item.payment_name}}</p>
            </div>
          </div>
          <!-- <div>
            <img src="../../common/image/default.png" alt="">
            <div>
              <p>账户名称：祥总</p>
              <p>账号：祥总</p>
              <p>账户类型：农行支付</p>
              <p>支行名称：广州支行</p>
            </div>
          </div> -->
        </div>
        <InputFile title="付款凭证" @selectpic="selectImage" :thumb="list.thumb" :status="status" :status2="list.status2" ></InputFile>
        <div :class="$style.up" @click="upLoad" v-if="list.status2 == 0 || list.status1 ==0">确认</div> 
        <div :class="$style.up" @click="apply" v-if="status == 2 && list.status2 == 0">申诉</div> 

      </section>
    </div>
  </transition>

</template>
<script>
import Panel from '../core/panel.vue'
import InputFile from '../core/inputFile.vue'
export default {
  name: 'lookOver',
  components: {
    Panel,
    InputFile
  },
  data() {
    return {
      tagIndex: 1,
      lists: [],
      id: '',
      status: '',
      thumb: ''
    }
  },
  created() {
    // console.log(this.$route.query.id)
    this.$nextTick(() => {
      this.id = String(this.$route.query.id)
      this.status = String(this.$route.query.status)
      console.log(this.status)
      this._lookOver(this.id, this.status)
    })
  },
  methods: {
    tag(index) {
      this.tagIndex = index
    },
    selectImage(e) {
      console.log(e)
      this.thumb = e
    },
    _lookOver(id, status) {
      // console.log(id)
      this.$axios({
        method: 'post',
        url: `${this.$URL}/app/index.php?i=143&c=entry&do=ws_orchard&m=sz_yi&p=ws_appointment_log`,
        params: {
          op: 'upload',
          logid: id,
          status: status
        }
      }).then(res => {
        console.log(res)
        this.lists.push(res.data.result.list)
        // console.log(this.lists)
      })
    },
    upLoad() {
      if (this.status == 1) {
        if (this.thumb == '') {
          alert('付款凭证不能为空')
          return
        }
      }

      let postData = this.$qs.stringify({
        op: 'payment',
        logid: this.id,
        status: this.status,
        thumb: this.thumb
      })
      this.$axios({
        method: 'post',
        url: `${this.$URL}/app/index.php?i=143&c=entry&do=ws_orchard&m=sz_yi&p=ws_appointment_log`,
        data: postData
      }).then(res => {
        console.log(res)
        if (res.data.status == 1) {
          alert('提交成功')
          this.$router.go(-1)// 返回上一层
        } else {
          alert('鬼知道哪里错了')
        }
      })
    },
    apply() {
      this.$router.push({
        path: '/inform',
        query: {
          logid: this.id
        }
      })
    }
  }
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




