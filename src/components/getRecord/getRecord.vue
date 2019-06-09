<template>
  <div :class="$style.content">
    <Panel fanhui="icon-huise" title="农场果园>>领种记录" >
    </Panel>
    <section :class="$style.aliment">
      <div :class="$style.alimentBottom">
        <div :class="$style.alimentItem" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
          <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" @bottom-status-change="handleBottomChange" ref="loadmore">
            <div :class="$style.alimentList" v-for="(list,index) in lists" :key="index">
              <div>编号：{{list.id}}</div>
              <div>
                <h4>{{list.title}}</h4>
                <p>种子编号：{{list.seed_id}}</p>
                <p>价值：{{list.price}}</p>
                <p>智能合约收益：{{list.contract}}</p>
                <p>{{list.createtime}}</p>
              </div>
            </div>
          </mt-loadmore>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import Panel from '../core/panel.vue'
export default {
  name: 'getRecord',
  components: {
    Panel
  },
  data() {
    return {
      page: 1,
      pageNum: '', // 总页数
      lists: [],

      bottomStatus: '',
      wrapperHeight: 0,
      allLoaded: false
    }
  },
  created() {
    this._getRecord(1)
  },
  mounted() {
    setTimeout(() => {
      this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().bottom - this.$refs.wrapper.getBoundingClientRect().top
      console.log(this.wrapperHeight)
    }, 100)
  },
  methods: {
    _getRecord(page) {
      this.$axios({
        method: 'post',
        url: `${this.$URL}/app/index.php?i=143&c=entry&do=ws_orchard&m=sz_yi&p=ws_receive_log`,
        params: {
          page: page
        }
      }).then((res) => {
        console.log(res)
        // if (status == 1) {
        if (res.data.status == 1) {
          this.r_code = res.data.result.r_code
          // this.lists = res.data.result.list
          this.pageNum = res.data.result.page_num

          this.lists = this.lists.concat(res.data.result.list)
        }
        // }
      }).catch((err) => {
        console.log(err)
      })
    },
    handleBottomChange(status) {
      this.bottomStatus = status
    },
    loadBottom() {
      if (this.page < this.pageNum) {
        this.page++
        this._aliment(this.page)
      } else {
        this.allLoaded = true
      }
      this.$refs.loadmore.onBottomLoaded()
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
  .aliment{
    color: #999999;
    width: 100%;
    .alimentBottom{
     .alimentItem{
       margin-bottom: 130px;
       overflow-y: scroll;
        .alimentList{
           margin-top: 20px;
           background: #ffffff;
          @include flex(row);
          // justify-content: space-between;
          // align-items: center;
          padding: 20px 20px;
          box-sizing: border-box;
          position: relative;
          div:first-child{
            width: 100%;
            line-height: 50px;
            
          }
          &::after{
            position: absolute;
            top: 70px;
            left: 0;
            content: '';
            width: 100%;
            height: 0;
            border-bottom:1px solid #999999;
          }
          div:last-child{
            h4{
              line-height: 40px;
              color: #000000;
            }
            p{
              line-height: 40px;
            }
          }
        }
      }
    }
  }
}
</style>




