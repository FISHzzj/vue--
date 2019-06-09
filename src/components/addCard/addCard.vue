<template>
    <div :class="$style.content">
      <Panel fanhui="icon-huise" title="我的银行卡"  txt="添加" @tranfer="addcard" >
      </Panel>
      <div :class="$style.backList">
        <div :class="$style.cardtxt" v-for="(list,index) in lists" :key="index">
          <img :src="list.thumb" alt="">
          <div>
            <p>账户名称：{{list.username}}</p>
            <p>账户：{{list.realname}}</p>
            <p>账户类型：{{list.payment_name}}</p>
          </div>
          <div  v-if="list.status==0" @click="btnClick($event,1,list.id)">开启</div>
          <div v-else @click="btnClick($event,0,list.id)">关闭</div>
        </div>
        <Loadimg v-if="lists.length==0" title="没有数据"></Loadimg>
      </div>
    </div>
</template>
<script>
import Panel from '../core/panel.vue'
import Loadimg from '../core/loading.vue'
export default {
  name: 'addCard',
  components: {
    Panel,
    Loadimg
  },
  data() {
    return {
      lists: [],
      mobile: '',
      username: ''
    }
  },
  created() {
    this._addBank()
  },
  methods: {
    addcard(data) {
      this.$router.push({
        path: '/account',
        query: {
          mobile: this.mobile,
          username: this.username
        }
      })
    },
    _addBank() {
      this.$axios({
        method: 'post',
        url: `${this.$URL}/app/index.php?i=143&c=entry&do=ws_orchard&m=sz_yi&p=ws_payment_method`
      }).then(res => {
        console.log(res)
        if (res.data.status == 1) {
          this.lists = res.data.result.list
          this.mobile = res.data.result.mobile
          this.username = res.data.result.username
        }
      })
    },
    btnClick(e, status, id) {
      console.log(status)
      console.log(e)
      this.$axios({
        method: 'post',
        url: `${this.$URL}/app/index.php?i=143&c=entry&do=ws_orchard&m=sz_yi&p=ws_payment_method`,
        params: {
          op: 'switch',
          id: id,
          status: status
        }
      }).then(res => {
        // console.log(res)
        // console.log(e.target)
        if (status == 0) {
          e.target.innerHTML = '开启'
        } else {
          e.target.innerHTML = '关闭'
        }
        location.reload()
      })
    }
  }

}
</script>
<style lang="scss" module>
@import "~common/scss/mixin.scss";
@import "~common/scss/element.scss";
.content{
  background: #ffffff;
  font-size: 24px;
  height: 100%;
  color: #ffffff;
  .backList{
    .cardtxt{
      @include flex(row);
      justify-content:flex-start;
      flex-wrap: nowrap;
      padding: 20px 20px;
      align-items: center;
      border-bottom: 1px solid #999999;
      >img{
        width: 100px;
        height: 100px;
        border-radius: 10px;
      }
      div:nth-child(2){
        margin-left: 40px;
        >p{
          color: #999;
          line-height: 40px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 250px;
        }
      }
      >div:last-child{
        @include btn($size:28px, $color:#fff, $bgcolor:rgb(165, 103, 108), $padding:10px, $radius:10px);
        margin-left: 130px;
      }
    }
  }
}
</style>
