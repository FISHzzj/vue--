<template>
  <div :class="$style.content">
    <Panel fanhui="icon-huise" title="农场果园>>预约记录" >
    </Panel>
    <!-- <div :class="$style.outscroll"> -->
        <!-- <Scroll :class="$style.appointment"> -->
          <section :class="$style.appoint" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
            <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" @bottom-status-change="handleBottomChange" ref="loadmore">
              <div :class="$style.item" v-for="(list,index) in lists" :key="index">
                <div :class="$style.left">
                  <h4>{{list.title}}</h4>
                  <p>{{list.createtime}}</p>
                  <p v-if="list.id != null">卖家手机号：{{list.from_mobile}}</p>
                  <p v-if="list.id != null">卖家编号：{{list.from_username}}</p>
                </div>
                <div :class="$style.right">
                  <h4>{{list.consume}}</h4>
                  <p v-if="list.id != null">{{list.m_status}}| {{list.a_status}}<b @click="lookOver(list.id,1)">(查看)</b></p>
                  <p style="color:#4c95cc" v-else>| {{list.status}}</p>
                </div>
              </div>
              <div slot="bottom" class="mint-loadmore-bottom">
                <span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
                <span v-show="bottomStatus === 'loading'">
                  <mt-spinner type="snake"></mt-spinner>
                </span>
              </div>
            </mt-loadmore>
          </section>
        <!-- </Scroll> -->
      <!-- </div> -->

  </div>
</template>
<script>
import Panel from '../core/panel.vue'

export default {
  name: 'appointment',
  components: {
    Panel

  },
  data() {
    return {
      lists: [],
      page: 1, // 页码
      pageNum: '', // 总页数
      total: '',

      bottomStatus: '',
      wrapperHeight: 0,
      allLoaded: false
    }
  },
  created() {
    this._appointment(this.page)
  },
  mounted() {
    setTimeout(() => {
      this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().bottom - this.$refs.wrapper.getBoundingClientRect().top
      console.log(this.wrapperHeight)
    }, 100)
  },
  methods: {
    lookOver(id, status) {
      this.$router.push({
        path: '/lookOver',
        query: {
          id: id,
          status: status
        }
      })
    },
    _appointment(page) {
      this.$axios({
        method: 'post',
        url: `${this.$URL}/app/index.php?i=143&c=entry&do=ws_orchard&m=sz_yi&p=ws_appointment_log`,
        params: {
          page: page
        }
      }).then(res => {
        console.log(res)
        if (res.data.status == 1) {
          this.pageNum = res.data.result.page_num
          this.total = res.data.result.total
          this.lists = this.lists.concat(res.data.result.list)
        }
      })
    },
    handleBottomChange(status) {
      this.bottomStatus = status
    },
    loadBottom() {
      console.log(2222)
      if (this.page < this.pageNum) {
        this.page++
        this._appointment(this.page)
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
  font-size: 24px;
  background: #ffffff;
  height: 100%;
  // .outscroll{
  //   position: fixed;
  //   left: 0;
  //   top: 80px;
  //   // overflow: hidden;
  //   width: 100%;
  //   height: 100%;
  //   bottom: 50px;
    // .appointment{
    //   background: #ffffff;
    //   position: relative;
    //   width: 100%;
    //   height: 100%;
    //   overflow: hidden;
      .appoint{
        width:100%;
        overflow-y: scroll;
        .item{
          @include flex(row);
          justify-content: space-between;
          align-items: center;
          padding: 20px 10px;
          border-bottom: 1px solid #999;
          .left{
            >h4{
              color:#000000;
              font-weight: 600;
              line-height: 40px;
            }
            p{
              line-height: 35px;
              color: #999;
            }
          }
          .right{
            >h4{
              color: #e0b746;
              font-weight: 600;
              line-height: 40px;
            }
            p{
              color: #000000;
              line-height: 30px;
              b{
                color: #999;
              }
            }
          }

        }
      }
    // }
  // }


}

</style>



