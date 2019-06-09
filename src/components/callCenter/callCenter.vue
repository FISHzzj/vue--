<template>
  <div :class="$style.content">
    <Panel fanhui="icon-huise" title="信息管理>>公众管理" >
    </Panel>
    <section :class="$style.aliment">
      <div :class="$style.alimentBottom">
        <div :class="$style.alimentItem">
          <div :class="$style.alimentList" v-for="(list,index) in lists" :key="index">
            <div><p v-html="list.title">DGY释放规则</p><p @click="examine(list.id)">查看</p></div>
            <div>
              <div><i class="iconfont icon-shengyin"></i></div>
              <div>
                <p>操作：<strong @click="examine(list.id)">查看</strong></p>
                <p>创建时间：2019-05-23 12:24:23</p>
              </div>
            </div>
          </div>
      
        </div>
      </div>
    </section>
    <router-view></router-view>
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
      page: '',
      lists: []
    }
  },
  created() {
    this._callCenter(1)
  },

  methods: {
    examine(id) {
      console.log(id)
      this.$router.push({
        path: `/callCenter/${id}`
      })
    },
    _callCenter(page) {
      this.$axios({
        method: 'post',
        url: `${this.$URL}/app/index.php?i=143&c=entry&do=ws_orchard&m=sz_yi&p=ws_customer_service`,
        params: {
          page: page
        }
      }).then((res) => {
        console.log(res)
        if (res.data.status == 1) {
          // this.r_code = res.data.result.r_code
          this.lists = res.data.result.list
        }
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
  font-size: 24px;
  height: 100%;
  .aliment{
    color: #999999;
    width: 100%;
    .alimentBottom{
     .alimentItem{
       margin-bottom: 130px;
        .alimentList{
           margin-top: 20px;
           background: #ffffff;
          @include flex(row);
          // justify-content: space-between;
          // align-items: center;
          padding: 20px 20px;
          box-sizing: border-box;
          position: relative;
          >div:first-child{
            width: 100%;
            line-height: 60px;
            @include flex(row);
            justify-content: space-between;
            align-items: center;
            height: 80px;
            position: relative;
            &::after{
              position: absolute;
              // top: 70px;
              left: 0;
              bottom: 0;
              content: '';
              width: 100%;
              height: 0;
              border-bottom:1px solid #999999;
            }
            p:last-child{
              background: #4BC7AA;
              border-radius: 10px;
              padding: 0 20px;
              color: #ffffff;
              box-sizing: border-box;
              font-size: 24px;
            }
          }
          
          >div:last-child{
            width: 100%;
            @include flex(row);
            // justify-content: center;
            align-items: center;
            flex-wrap: nowrap;
            padding: 30px 20px;
            box-sizing: border-box;
            >div:last-child{
              margin-left: 20px;
              >p{
                >strong{
                  color: #4BC7AA;
                }
                line-height: 40px;
                font-size: 26px;
              }
            }

          }
        }
      }
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
  .icon-shengyin{
    font-size: 120px;
    color: #33d696;
  }
</style>


