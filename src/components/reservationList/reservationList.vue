<template>
    <div :class="$style.content">
      <Panel fanhui="icon-huise" title="预约列表"  txt="上传凭证" @tranfer="lookOver" >
      </Panel>
      <div :class="$style.backList">
        <div :class="$style.cardtxt" v-for="(list,index) in lists" :key="index">
          <img :src="list.thumb" alt="">
          <div>
            <p>账户名称：{{list.username}}</p>
            <p>账户：{{list.realname}}</p>
            <p>账户类型：{{list.payment_name}}</p>
          </div>
        </div>
      </div>
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
      lists: []
    }
  },
  created() {
    this._addBank()
  },
  methods: {
    lookOver(data) {
      this.$router.push({
        path: '/lookOver'
      })
    },
    _addBank() {
      this.$axios({
        method: 'post',
        url: `${this.$URL}/app/index.php?i=143&c=entry&do=ws_orchard&m=sz_yi&p=ws_payment_method`
      }).then(res => {
        // console.log(res)
        this.lists = res.data.result.list
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
      // >div:last-child{
      //   @include btn($size:28px, $color:#fff, $bgcolor:rgb(165, 103, 108), $padding:10px, $radius:10px);
      //   margin-left: 130px;
      // }
    }
  }
}
</style>
