<template>
  <!-- <transition name="slide"> -->
    <div :class="$style.content">
      <Panel fanhui="icon-huise" title="查看规则" >
      </Panel>
      <section :class="$style.examine">
        <div :class="$style.headerList">
          <h1>{{title}}</h1>
          <p>发布时间：{{createtime}}</p>
        </div>
        <p :class="$style.examinetxt"  ref="examinetxt" v-html="remarks" >
       
        </p>
      </section>

    </div>
  <!-- </transition> -->
</template>
<script>
import Panel from '../core/panel.vue'
export default {
  components: {
    Panel
  },
  data() {
    return {
      title: '',
      createtime: '',
      remarks: ''
    }
  },
  created() {
    let id = this.$route.params.id
    this._examine(id)
  },
  methods: {
    _examine(id) {
      this.$axios({
        method: 'post',
        url: `${this.$URL}/app/index.php?i=143&c=entry&do=ws_orchard&m=sz_yi&p=ws_customer_service`,
        params: {
          op: 'inspect',
          id: id
        }
      }).then((res) => {
        console.log(res)
        if (res.data.status == 1) {
          this.title = res.data.result.list.title
          this.createtime = res.data.result.list.createtime
          this.remarks = this.htmldecode(res.data.result.list.remarks)
          // console.log(this.remarks)
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    htmldecode(s) {
      var div = document.createElement('div')
      div.innerHTML = s
      return div.innerText || div.textContent
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
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: #000;
  .examine{
    .headerList{
       padding: 0px 20px;
      box-sizing: border-box;
      >h1{
        line-height: 60px;
      }
      >p{
        // line-height: 60px;
      }
    }
    .examinetxt{
      padding: 20px 20px;
      box-sizing: border-box;
      >p{
        line-height: 40px;
      }
    }
  }

}
</style>
<style lang="scss" scoped>
.slide-enter-active,.slide-leave-active{
  transition:all 0.3s;
}
.slide-enter,.slide-leave-to{
  transform: translate3d( 100% , 0 , 0);
}
</style>





