<template>
  <div :class="$style.content">
    <Panel fanhui="icon-huise" title="农场果园>>收款账户" txt="添加"  @tranfer="add" >
    </Panel>
    <div :class="$style.accountNum">
      <div :class="$style.accountList" >
        <img src="../../common/image/default.png" alt>
        <div :class="$style.message">
          <p>微信(微信) <Strong>(启用中)</Strong> </p>
          <p>13611111111</p>
        </div>
        <div :class="$style.btnList">
          <div>查看</div>
          <div>关闭</div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import Panel from '../core/panel.vue'
export default {
  name: 'getAccount',
  components: {
    Panel
  },
  data() {
    return {
      lists: []
    }
  },
  created() {
    this._pagment()
  },
  mounted() {

  },
  methods: {
    add() {
      this.$router.push({
        path: '/account'
      })
    },
    _pagment() {
      this.$axios({
        method: 'post',
        url: `${this.$URL}/app/index.php?i=143&c=entry&do=ws_orchard&m=sz_yi&p=ws_payment_method`
      }).then(res => {
        console.log(res)
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
  font-size: 26px;
  .accountNum{
    .accountList{
      @include flex(row);
      flex-wrap: nowrap;
      align-items: center;
      background: #4caf50;
      border-radius: 10px;
      margin:20px 20px;
      padding: 20px 20px;
      box-sizing: border-box;
      >img{
        width: 100px;
        height: 100px;
        border-radius: 50%;
      }
      .message{
        margin-left: 20px;
        >p{
          line-height: 40px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      .btnList{
        @include flex(row);
        flex-wrap: nowrap;
        justify-content: flex-end;
        margin-left: 30px;
        >div{
          border: 1px solid #ffffff;
          border-radius: 5px;
          padding: 5px 15px;
          box-sizing: border-box;
          margin-left: 10px;
          white-space: nowrap;
        }
      }
    }
  }


}

</style>




