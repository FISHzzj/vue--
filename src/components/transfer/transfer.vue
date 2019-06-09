<template>
  <div :class="$style.content">
    <Panel fanhui="icon-huise" title="农场果园>>转入记录" >
    </Panel>
    <section :class="$style.aliment">
      <div :class="$style.alimentBottom">
        <div :class="$style.alimentHead">
          <div :class="{active : tagIndex==1}" @click="tag(1)">待转让</div>
          <div :class="{active : tagIndex==2}" @click="tag(2)">转让中</div>
          <div :class="{active : tagIndex==3}" @click="tag(3)">已完成</div>
          <div :class="{active : tagIndex==4}" @click="tag(4)">取消/申诉</div>
        </div>
        <div :class="$style.alimentItem" v-if="tagIndex!=1" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
          <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" @bottom-status-change="handleBottomChange" ref="loadmore">
            <div :class="$style.alimentList" v-for="(list,index) in lists" :key="index">
              <div>用户：{{list.username}}</div>
              <div  @click="lookOver(list.id,2)">
                <h4>{{list.title}}</h4>
                <p>种子编号：{{list.seed_id}}</p>
                <p>价值：{{list.money}}</p>
                <p>智能合约收益：{{list.profit}}</p>
                <p>挂单时间：{{list.mature_time}}</p>
                <p style="color:red;" v-if="list.status1 == 1 && list.status2 == 0">已上传凭证</p>
              </div>
              <p :class="$style.quxiao" v-if="tagIndex==4" @click="quxiao(list.id)">取消</p>
            </div>
            <Loading title="没有数据了" v-if="lists.length==0"></Loading>
            <div slot="bottom" class="mint-loadmore-bottom">
              <span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
              <span v-show="bottomStatus === 'loading'">
                <mt-spinner type="snake"></mt-spinner>
              </span>
            </div>
          </mt-loadmore>

        </div>
        <div :class="$style.alimentItem" v-else ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
          <mt-loadmore :bottom-method="loadBottomOne" :bottom-all-loaded="allLoadedOne" @bottom-status-change="handleBottomChangeOne" ref="loadmore">
            <div :class="$style.alimentList" v-for="(list,index) in lists" :key="index">
              <div>用户：{{list.username}}</div>
              <div>
                <h4>{{list.title}}</h4>
                <p>种子编号：{{list.seed_id}}</p>
                <p>价值：{{list.price}}</p>
                <p>智能合约收益：{{list.contract_revenue}}</p>
                <p>挂单时间：{{list.mature_time}}</p>
              </div>
            </div>
            <Loading title="没有数据了" v-if="lists.length==0"></Loading>
            <div slot="bottom" class="mint-loadmore-bottom">
              <span v-show="bottomStatusOne !== 'loading'" :class="{ 'is-rotate': bottomStatusOne === 'drop' }">↑</span>
              <span v-show="bottomStatusOne === 'loading'">
                <mt-spinner type="snake"></mt-spinner>
              </span>
            </div>
          </mt-loadmore>
        </div>

      </div>
    </section>


  </div>
</template>
<script>
import Panel from '../core/panel.vue'
import Loading from '../core/loading.vue'
export default {
  name: 'transfer',
  components: {
    Panel,
    Loading
  },
  data() {
    return {
      tagIndex: 1,
      page: 1,
      lists: [],
      pageNum: '', // 总页数
      total: '',

      bottomStatus: '',
      wrapperHeight: 0,
      allLoaded: false,
      bottomStatusOne: '',
      allLoadedOne: false
    }
  },
  created() {
    this._transfer(1)
  },
  mounted() {
    setTimeout(() => {
      this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().bottom - this.$refs.wrapper.getBoundingClientRect().top
      console.log(this.wrapperHeight)
    }, 100)
  },
  methods: {
    tag(index) {
      this.tagIndex = index
      if (index == 1) {
        this._transfer(1)
      } else if (index == 2) {
        this._transferreds(1, 2)
      } else if (index == 3) {
        this._transferreds(1, 3)
      } else if (index == 4) {
        this._transferreds(1, 4)
      }
    },
    lookOver(id, status) {
      this.$router.push({
        path: '/lookOver',
        query: {
          id: id,
          status: status
        }
      })
    },
    // 待转让
    _transfer(page) {
      this.$axios({
        method: 'post',
        url: `${this.$URL}/app/index.php?i=143&c=entry&do=ws_orchard&m=sz_yi&p=ws_appointment_log`,
        params: {
          op: 'transferred',
          page: page
        }
      }).then(res => {
        console.log(res)
        if (res.data.status == 1) {
          // this.lists = res.data.result.list
          this.pageNum = res.data.result.page_num
          this.total = res.data.result.total
          this.lists = this.lists.concat(res.data.result.list)
        }
      })
    },
    // 转让中、已完成、申诉
    _transferreds(page, status) {
      this.$axios({
        method: 'post',
        url: `${this.$URL}/app/index.php?i=143&c=entry&do=ws_orchard&m=sz_yi&p=ws_appointment_log`,
        params: {
          op: 'transferreds',
          page: page,
          status: status
        }
      }).then(res => {
        console.log(res)
        // this.lists = res.data.result.list
        this.pageNum = res.data.result.page_num
        this.total = res.data.result.total
        this.lists = res.data.result.list
      })
    },
    quxiao(id) {
      console.log(id)
      let postData = this.$qs.stringify({
        op: 'appeal',
        status: 2, // 取消
        logid: id
      })
      // eslint-disable-next-line no-unreachable
      this.$axios({
        method: 'post',
        url: `${this.$URL}/app/index.php?i=143&c=entry&do=ws_orchard&m=sz_yi&p=ws_appointment_log`,
        data: postData
      }).then(res => {
        console.log(res)
        if (res.data.status == 1) {
          alert('提交成功！')
          this.$router.go(-1)
        }
        // this.lists.push(res.data.result.list)
        // console.log(this.lists)
      })
    },
    handleBottomChange(status) {
      this.bottomStatus = status
    },
    loadBottom() {
      console.log(2222)
      if (this.page < this.pageNum) {
        this.page++
        this._transfer(this.page)
      } else {
        this.allLoaded = true
      }
      this.$refs.loadmore.onBottomLoaded()
    },
    handleBottomChangeOne(status) {
      this.bottomStatus = status
    },
    loadBottomOne() {
      console.log(2222)
      if (this.page < this.pageNum) {
        this.page++
        this._transferreds(this.page)
      } else {
        this.allLoadedOne = true
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
     
     .alimentHead{
       @include flex(row);
       justify-content: space-around;
       align-items: center;
       height: 84px;
       line-height: 84px;
       border-bottom: 1px solid #999999;
        background: #ffffff;

     }
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
          div:nth-child(2){
            width: 100%;
            >h4{
              line-height: 40px;
              color: #000000;
            }
            >p{
              line-height: 40px;
            }
           
          }
          .quxiao{
            border:1px solid #33d696;
            background: #33d696;
            width: 80px;
            height: 50px;
            text-align: center;
            line-height: 50px;
            color: #ffffff;
            border-radius: 10px;
            position: absolute;
            right: 20px;
            bottom: 21px;
          }
        }
      }
    }
  }
}
</style>

<style lang="scss" scoped>
  html,body{
    background: #f5f5f5;
  }
  .iconfont{
    font-size: 50px;
  
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


