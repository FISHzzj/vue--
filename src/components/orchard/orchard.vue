<template>
    <div :class="$style.content">
      <Panel  title="农场果园>>我的果园" >
        <div :class="$style.aliment">养料：<strong>{{nourishment}}</strong></div>
      </Panel>
      <section :class="$style.orchard">
        <div :class="$style.langNum">
          <div @click="tag(1)" :class="{btnActive : tagIndex==1}">1号地</div>
          <div @click="tag(2)" :class="{btnActive : tagIndex==2}">2号地</div>
          <div @click="tag(3)" :class="{btnActive : tagIndex==3}">3号地</div>
          <div @click="tag(4)" :class="{btnActive : tagIndex==4}">4号地</div>
        </div>
        <!--绿地-->
        <div class="hs-farm-land">
            <div class="hs-farm-land-svg f-relative" >
                <!-- <svg version="1.1" id="id_1" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="-90 50 800.281 301.445" enable-background="new 0 0 595.281 301.445" xml:space="preserve" style="pointer-events:auto;"> -->
                <svg version="1.1" id="id_1" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="-250 40 850.281 281.445" enable-background="new 0 0 595.281 301.445" xml:space="preserve" style="pointer-events:auto;">
                    <defs class="tudi_body"> 
                     <!--開始土地-->    
                      <g :id="`tudi_${list.land}_${list.land_num}`" :class="`tudi_${list.land}green`" v-for="(list,index) in lists" :key="index">
                          <g style="position:relative;" >
                              <image class="img-tudi"  width="265" height="123.26"  xlink:href="../../common/image/newTudi.png" alt=""></image>
                          </g>
                      </g>
                      <!--結束土地--> 
                      <g :id="`tudi_${list.land}`" v-for="list in lists" :key="`tudi_${list.land}`" >
                          <g style="position:relative;" v-if="list.status==1"  >
                            <!-- 种子 -->
                            <image v-if="!list.eStatus && list.stage==1" class="img-tudi" x="70" y="-50" width="135" height="139.05"   xlink:href="../../common/image/seed_ener.png" :alt="list.id"  ></image>
                            <image v-else-if="list.eStatus && list.stage==1" class="img-tudi" x="70" y="-50" width="135" height="139.05"   xlink:href="../../common/image/seed.png" :alt="list.id"  ></image>
                            <!-- 成长 --><!-- 成熟 -->
                            <image v-if="list.stage==2 || list.stage==3" class="img-tudi" x="70" :y="-70"  width="135" height="139.05"   :xlink:href="list.thumb" :alt="list.id"  ></image>
                            
                          </g>
                      </g>

                    </defs>
                    <!-- 1 -->
                    <use class="treeHarvestclick" xlink:href="#tudi_1_1" data-id="#tudi_1_2s" transform="translate(0,0)" @click="funLang(1,1)" >&nbps;</use>
                    <use class="treeHarvestclick" xlink:href="#tudi_1_2" data-id="#tudi_1_2s" transform="translate(0,0)" @click="funLang(2,1)" >&nbps;</use>
                    <use class="treeHarvestclick" xlink:href="#tudi_1_3" data-id="#tudi_1_2s" transform="translate(0,0)" @click="funLang(3,1)" >&nbps;</use>
                    <use class="treeHarvestclick" xlink:href="#tudi_1_4" data-id="#tudi_1_2s" transform="translate(0,0)" @click="funLang(4,1)" >&nbps;</use>

                    <use xlink:href="#tudi_1" class="backpackshow" data-id="1" transform="translate(0,0)" @click="seedimg('#tudi_1')"  >&nbps;</use>
                    <!-- 2 -->
                    <use  class="treeHarvestclick" xlink:href="#tudi_2_1" data-id="#tudi_2_2s" transform="translate(-120,60)" @click="funLang(1,2)">&nbps;</use>
                    <use class="treeHarvestclick" xlink:href="#tudi_2_2" data-id="#tudi_2_2s" transform="translate(-120,60)" @click="funLang(2,2)" >&nbps;</use>
                    <use class="treeHarvestclick" xlink:href="#tudi_2_3" data-id="#tudi_2_2s" transform="translate(-120,60)" @click="funLang(3,2)" >&nbps;</use>
                    <use class="treeHarvestclick" xlink:href="#tudi_2_4" data-id="#tudi_2_2s" transform="translate(-120,60)" @click="funLang(4,2)" >&nbps;</use>
                    
                    <use xlink:href="#tudi_2" class="backpackshow" data-id="2" transform="translate(-120,60)" @click="seedimg('#tudi_2')"  >&nbps;</use>

                    <!-- 3 -->
                    <use class="treeHarvestclick" xlink:href="#tudi_3_1" data-id="#tudi_3_2s" transform="translate(-230,125)" @click="funLang(1,3)">&nbps;</use>
                    <use class="treeHarvestclick" xlink:href="#tudi_3_2" data-id="#tudi_3_2s" transform="translate(-230,125)" @click="funLang(2,3)">&nbps;</use>
                    <use class="treeHarvestclick" xlink:href="#tudi_3_3" data-id="#tudi_3_2s" transform="translate(-230,125)" @click="funLang(3,3)">&nbps;</use>
                    <use class="treeHarvestclick" xlink:href="#tudi_3_4" data-id="#tudi_3_2s" transform="translate(-230,125)" @click="funLang(4,3)">&nbps;</use>

                    <use xlink:href="#tudi_3" class="backpackshow" data-id="3"  transform="translate(-230,125)" @click="seedimg('#tudi_3')" >&nbps;</use>

                    <!-- 4 -->
                    <use class="treeHarvestclick" xlink:href="#tudi_4_1" data-id="#tudi_4_2s" transform="translate(125,65)" @click="funLang(1,4)">&nbps;</use>
                    <use class="treeHarvestclick" xlink:href="#tudi_4_2" data-id="#tudi_4_2s" transform="translate(125,65)" @click="funLang(2,4)">&nbps;</use>
                    <use class="treeHarvestclick" xlink:href="#tudi_4_3" data-id="#tudi_4_2s" transform="translate(125,65)" @click="funLang(3,4)">&nbps;</use>
                    <use class="treeHarvestclick" xlink:href="#tudi_4_4" data-id="#tudi_4_2s" transform="translate(125,65)" @click="funLang(4,4)">&nbps;</use>

                    <use xlink:href="#tudi_4" class="backpackshow" data-id="4"  transform="translate(125,65)" @click="seedimg('#tudi_4')" >&nbps;</use>

                    <!-- 5 -->
                    <use class="treeHarvestclick" xlink:href="#tudi_5_1" data-id="#tudi_5_2s" transform="translate(5,125)" @click="funLang(1,5)">&nbps;</use>
                    <use class="treeHarvestclick" xlink:href="#tudi_5_2" data-id="#tudi_5_2s" transform="translate(5,125)" @click="funLang(2,5)">&nbps;</use>
                    <use class="treeHarvestclick" xlink:href="#tudi_5_3" data-id="#tudi_5_2s" transform="translate(5,125)" @click="funLang(3,5)">&nbps;</use>
                    <use class="treeHarvestclick" xlink:href="#tudi_5_4" data-id="#tudi_5_2s" transform="translate(5,125)" @click="funLang(4,5)">&nbps;</use>

                    <use xlink:href="#tudi_5" class="backpackshow" data-id="5"  transform="translate(5,125)" @click="seedimg('#tudi_5')" >&nbps;</use>
                    
                    <!-- 6 -->
                    <use class="treeHarvestclick" xlink:href="#tudi_6_1" data-id="#tudi_6_2s" transform="translate(-105,190)" @click="funLang(1,6)">&nbps;</use>
                    <use class="treeHarvestclick" xlink:href="#tudi_6_2" data-id="#tudi_6_2s" transform="translate(-105,190)" @click="funLang(2,6)">&nbps;</use>
                    <use class="treeHarvestclick" xlink:href="#tudi_6_3" data-id="#tudi_6_2s" transform="translate(-105,190)" @click="funLang(3,6)">&nbps;</use>
                    <use class="treeHarvestclick" xlink:href="#tudi_6_4" data-id="#tudi_6_2s" transform="translate(-105,190)" @click="funLang(4,6)">&nbps;</use>

                    <use xlink:href="#tudi_6" class="backpackshow" data-id="6"  transform="translate(-105,190)" @click="seedimg('#tudi_6')" >&nbps;</use>

                    <!-- 7 -->
                    <use class="treeHarvestclick" xlink:href="#tudi_7_1" data-id="#tudi_7_2s" transform="translate(250,130)" @click="funLang(1,7)">&nbps;</use>
                    <use class="treeHarvestclick" xlink:href="#tudi_7_2" data-id="#tudi_7_2s" transform="translate(250,130)" @click="funLang(2,7)">&nbps;</use>
                    <use class="treeHarvestclick" xlink:href="#tudi_7_3" data-id="#tudi_7_2s" transform="translate(250,130)" @click="funLang(3,7)">&nbps;</use>
                    <use class="treeHarvestclick" xlink:href="#tudi_7_4" data-id="#tudi_7_2s" transform="translate(250,130)" @click="funLang(4,7)">&nbps;</use>

                    <use xlink:href="#tudi_7"  class="backpackshow" data-id="7" transform="translate(250,130)" @click="seedimg('#tudi_7')" >&nbps;</use>
                   
                    <!-- 8 -->
                    <use class="treeHarvestclick" xlink:href="#tudi_8_1" data-id="#tudi_8_2s" transform="translate(130,190)" @click="funLang(1,8)">&nbps;</use>
                    <use class="treeHarvestclick" xlink:href="#tudi_8_2" data-id="#tudi_8_2s" transform="translate(130,190)" @click="funLang(2,8)">&nbps;</use>
                    <use class="treeHarvestclick" xlink:href="#tudi_8_3" data-id="#tudi_8_2s" transform="translate(130,190)" @click="funLang(3,8)">&nbps;</use>
                    <use class="treeHarvestclick" xlink:href="#tudi_8_4" data-id="#tudi_8_2s" transform="translate(130,190)" @click="funLang(4,8)">&nbps;</use>

                    <use xlink:href="#tudi_8" class="backpackshow" data-id="8"  transform="translate(130,190)" @click="seedimg('#tudi_8')" >&nbps;</use>
                   
                    <!-- 9 -->
                    <use class="treeHarvestclick" xlink:href="#tudi_9_1" data-id="#tudi_9_2s" transform="translate(20,255)" @click="funLang(1,9)">&nbps;</use>
                    <use class="treeHarvestclick" xlink:href="#tudi_9_2" data-id="#tudi_9_2s" transform="translate(20,255)" @click="funLang(2,9)">&nbps;</use>
                    <use class="treeHarvestclick" xlink:href="#tudi_9_3" data-id="#tudi_9_2s" transform="translate(20,255)" @click="funLang(3,9)">&nbps;</use>
                    <use class="treeHarvestclick" xlink:href="#tudi_9_4" data-id="#tudi_9_2s" transform="translate(20,255)" @click="funLang(4,9)">&nbps;</use>

                    <use xlink:href="#tudi_9" class="backpackshow" data-id="9"  transform="translate(20,255)" @click="seedimg('#tudi_9')" >&nbps;</use>
                  
                    <!-- 10 -->
                    <use class="treeHarvestclick" xlink:href="#tudi_10_1" data-id="#tudi_10_2s" transform="translate(370,200)" @click="funLang(1,10)">&nbps;</use>
                    <use class="treeHarvestclick" xlink:href="#tudi_10_2" data-id="#tudi_10_2s" transform="translate(370,200)" @click="funLang(2,10)">&nbps;</use>
                    <use class="treeHarvestclick" xlink:href="#tudi_10_3" data-id="#tudi_10_2s" transform="translate(370,200)" @click="funLang(3,10)">&nbps;</use>
                    <use class="treeHarvestclick" xlink:href="#tudi_10_4" data-id="#tudi_10_2s" transform="translate(370,200)" @click="funLang(4,10)">&nbps;</use>

                    <use xlink:href="#tudi_10" class="backpackshow" data-id="10"  transform="translate(370,200)" @click="seedimg('#tudi_10')" >&nbps;</use>

                    <!-- 11 -->
                    <use class="treeHarvestclick" xlink:href="#tudi_11_1" data-id="#tudi_11_2s" transform="translate(250,260)" @click="funLang(1,11)">&nbps;</use>
                    <use class="treeHarvestclick" xlink:href="#tudi_11_2" data-id="#tudi_11_2s" transform="translate(250,260)" @click="funLang(2,11)">&nbps;</use>
                    <use class="treeHarvestclick" xlink:href="#tudi_11_3" data-id="#tudi_11_2s" transform="translate(250,260)" @click="funLang(3,11)">&nbps;</use>
                    <use class="treeHarvestclick" xlink:href="#tudi_11_4" data-id="#tudi_11_2s" transform="translate(250,260)" @click="funLang(4,11)">&nbps;</use>

                    <use xlink:href="#tudi_11" class="backpackshow" data-id="11"  transform="translate(250,260)" @click="seedimg('#tudi_11')" >&nbps;</use>
                    
                    <!-- 12 -->
                    <use class="treeHarvestclick" xlink:href="#tudi_12_1" data-id="#tudi_12_2s" transform="translate(135,325)" @click="funLang(1,12)">&nbps;</use>
                    <use class="treeHarvestclick" xlink:href="#tudi_12_2" data-id="#tudi_12_2s" transform="translate(135,325)" @click="funLang(2,12)">&nbps;</use>
                    <use class="treeHarvestclick" xlink:href="#tudi_12_3" data-id="#tudi_12_2s" transform="translate(135,325)" @click="funLang(3,12)">&nbps;</use>
                    <use class="treeHarvestclick" xlink:href="#tudi_12_4" data-id="#tudi_12_2s" transform="translate(135,325)" @click="funLang(4,12)">&nbps;</use>

                    <use xlink:href="#tudi_12" class="backpackshow" data-id="12"  transform="translate(135,325)" @click="seedimg('#tudi_12')">&nbps;</use>               

                </svg>
            </div>
        </div>
      </section>
      <!-- 种植记录 -->
      <div :class="$style.plantRecord">
        <h4>种子记录</h4>
        <div :class="$style.record" v-for="(list,index) in lists" :key="index" >
          <div :class="$style.data" v-if="list.status==1">
            <img v-if="!list.eStatus && list.stage==1"  src="../../common/image/seed_ener.png" alt="">
            <img v-else  :src="list.thumb" alt="">

            <div>
              <h4>{{list.title}}&nbsp;<strong>(赋能消耗{{list.consume_nourishment}})</strong></h4>
              <div>
                <p>成本：&nbsp;<span :class="$style.cost"></span> &nbsp; {{list.price}}</p>
                <p>赋能：&nbsp;<span :class="$style.progressbar">
                          <span :class="$style.fill" :style="{ width: list.empowerment_num/list.cycles*100 + '%' }"></span>
                        </span>&nbsp; {{list.empowerment_num}}/{{list.cycles}}</p>
                <p>收益：&nbsp;<span :class="$style.progressbar">
                          <span :class="$style.fill" :style="{ width: list.current_income/list.contract_revenue*100 + '%' }" ></span>
                        </span>&nbsp; {{list.current_income}}%/{{list.contract_revenue}}%</p>
                <p>果期：&nbsp;<span :class="$style.progressbar">
                          <span :class="$style.fill" :style="{ width: (list.stage/3)*100 + '%' }"></span>
                        </span>&nbsp; {{list.stage/3*24}}/{{list.cycles*24}}</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
      <!--种子钱包的种子数据-->
      <div :class="$style.seedData" v-if="mtRadio">
        <div :class="$style.listData">
          <p>选择要种植在土地7的种子</p>
          <p class="radioMt">
            <mt-radio
              v-model="valueChoose"
              :options="options"
            >
            </mt-radio>
          </p>
          <p :class="$style.affirm" @click="affirm">确认</p>
        </div>
      </div>
    </div>
</template>
<script>
import Panel from '../core/panel.vue'
import '../../common/js/jquery-1.11.1.min.js'
import { Toast } from 'mint-ui'
export default {
  name: 'orchard',
  components: {
    Panel

  },
  data() {
    return {
      tagIndex: 1,
      lists: [],
      valueChoose: '',      // 存放所选选项（字符串）
      mtRadio: false,
      options: [],
      landNum: '', // 第几号土地
      land: '', // 第几块土地
      nourishment: '',
      countdown:0,
      refreshStatus:0,
    }
  },
  created() {
    this._ws_orchard(1)
  },
  mounted() {

  },
  methods: {
    tag(index) {
      this.tagIndex = index
      if (index == 1) {
        this._ws_orchard(index)
      } else if (index == 2) {
        this._ws_orchard(index)
      } else if (index == 3) {
        this._ws_orchard(index)
      } else if (index == 4) {
        this._ws_orchard(index)
      }
    },
      // 渲染数据：土地数据
    _ws_orchard(index) {
      let postData = this.$qs.stringify({
        land_num: index
      })
      this.$axios({
        method: 'post',
        url: `${this.$URL}/app/index.php?i=143&c=entry&do=ws_orchard&m=sz_yi&p=ws_orchard`,
        data: postData
      }).then((res) => {
        // console.log(res)
        this.nourishment = res.data.result.nourishment
        this.lists = res.data.result.list
        let lists = JSON.parse(JSON.stringify(this.lists))
        // console.log(Object(lists))
        for (const key in lists) {
          if (lists.hasOwnProperty(key)) {
            const element = lists[key];
            // console.log(element)
            let time1 = element.cycles*8*60*60*element.stage;
            let tmp  = new Date(new Date()) / 1000 - element.plant_time;
            let time2 = time1-tmp;

            if(this.countdown > 0){
              if(time2 < this.countdown){
                this.countdown = time2;
              }
            }else{
              if(time2 > 0){
                this.countdown = time2;
                this.refreshStatus = 1; //1 开启倒计时 0 不开启
              }
              
            }
          }
        }
        console.log(this.refreshStatus);
        // if(this.refreshStatus == 1){
        //   var timer = setInterval(()=>{
        //     this.countdown = this.countdown - 1;
        //     console.log(this.countdown)
        //     if(this.countdown<=0 ){
        //       this.refreshStatus = 0;
        //       this.countdown = 0;
        //       // this._ws_orchard(this.tagIndex)
              
        //     }
        //   },1000)
        // }else{
        //   clearInterval(timer)
        // }
        
      })
    },
      // 点击土地：
    funLang(landNum, land) {
      this.landNum = landNum
      this.land = land
      let getSeed = this.$qs.stringify({
        op: 'getSeed'
      })
      this.$axios({
        method: 'post',
        url: `${this.$URL}/app/index.php?i=143&c=entry&do=ws_orchard&m=sz_yi&p=ws_orchard`,
        data: getSeed
      }).then((res) => {
        console.log(res)
        if (res.data.status == 1) {
          res.data.result.list.forEach((value, index) => {
            let titlePrice = `${value.title}(价值：${value.price})`
            this.options.push({
              label: titlePrice,
              value: value.id
            })
          })
          // let land = res.data.result.list.land
          // console.log(land)
          // this.lists[land] = res.data.result.list
          // console.log(this.lists)
            // this.options=res.data.result.list;
          this.mtRadio = true
        } else {
          alert('没有种子!')
        }
      })
    },
      // 确认
    affirm() {
      // console.log(this.lists)
      if (this.valueChoose == '') {
        Toast({
          message: '没有选择种子',
          position: 'bottom',
          duration: 2000
        })
        return
      }
        // 選中種子
      // eslint-disable-next-line no-unreachable
      let dataqs = this.$qs.stringify({
        op: 'plant',
        land_num: this.landNum,
        land: this.land,
        seed_id: this.valueChoose
      })
      this.$axios({
        method: 'post',
        url: `${this.$URL}/app/index.php?i=143&c=entry&do=ws_orchard&m=sz_yi&p=ws_orchard`,
        data: dataqs
      }).then((res) => {
        // console.log(res)
        // let land = res.data.result.list.land
        // console.log(this.lists)
        // this.lists[land] = res.data.result.list
        if (res.data.status == 1) {
          // 再次请求，更新数据
          this._ws_orchard(this.tagIndex)
          this.options = []
          this.mtRadio = false
          alert('种植成功')
        } else {
          Toast({
            message: res.data.result.list,
            position: 'bottom',
            duration: 2000
          })
        }
      })
    },
      // 给种子赋能
    seedimg(id) {
      // eslint-disable-next-line no-undef
      let seedId = $(id).find('image').attr('alt')
      let seedqs = this.$qs.stringify({
        op: 'empowerment',
        seed_id: seedId

      })
      this.$axios({
        method: 'post',
        url: `${this.$URL}/app/index.php?i=143&c=entry&do=ws_orchard&m=sz_yi&p=ws_orchard`,
        data: seedqs
      }).then((res) => {
        console.log(res)
        if (res.data.status == 0) {
          alert(res.data.result.list)
        } else {
          alert('赋能成功！')
          let land = res.data.result.list.land
          this.lists[land] = res.data.result.list
        }
      })
    }

  },
  watch: {
    valueChoose (val) {
      console.log('val', val)
    },
    lists(newVal, oldVal) {
      console.log('lists', newVal)
    },
    refreshStatus(newVal){

    }
  }
}
</script>



<style lang="scss" module>
@import "~common/scss/mixin.scss";
@import "~common/scss/element.scss";
.content{
  // position: fixed;
  // top: 0;
  // left: 0;
  background: #ffffff;
  // height: 93%;
  width: 100%;
  font-size: 24px;
  color: #000000;
  // overflow-y: scroll;
  .aliment{
    width:100%;
    height:60px;
    line-height:60px;
    text-align:center;
    background:#ffffff;
    color:#000;
    font-weight:600;
    strong{
      color:#D8AB36;
    }
  }
  .orchard{
      background: #fff url(../../common/image/back0.jpg) top left no-repeat;
      background-size: 100% 100%;
      position: relative;
      width: 100%;
      height:100%;
      overflow: hidden;
      .langNum{
        position: relative;
        top:40px;
        left:10px;
        @include flex(row);
        div{
          background:  url(../../common/image/max.png) top left no-repeat;
          background-size: 100% 100%;
          width:135px;
          height:70px;
          // margin-left:10px;
          text-align:center;
          line-height:70px;
          color:#ffffff;
          font-weight:550;
        }
      }
  }
  .plantRecord{
    position: relative;
    bottom: 80px;
    left: 0;
    width: 100%;
    height:auto;
    background: #9AE6B9;
    h4{
      color: #246F50;
      font-weight: 600;
      text-align: center;
      width: 100%;
      font-size: 35px;
      line-height: 50px;
    }
    .record{
      margin: 20px 0;
      .data{
        @include flex(row);
        justify-content:flex-start;
        align-items: center;
        flex-wrap: nowrap;
        background: #fff;
        padding: 20px 20px;
        box-sizing: border-box;
        margin:20px 20px;
        >img{
          // width: 130px!important;
          height: 120px;
        }
        >div{
          margin-left: 20px;
          >h4{
            text-align: left;
            >strong{
              font-size: 26px;
              color: #000;
            }
          }
          >div{
            p:nth-child(1){
              @include flex(row);
              align-items: center;
              line-height: 50px;
              .cost{
                width: 250px;
                height: 15px;
                border-radius: 30px;
                background: #42C3A3;
                display: inline-block;
              }
            }
            p:nth-child(2){
              @include flex(row);
              align-items: center;
              line-height: 50px;
              .progressbar{
                width: 250px;
                height: 15px;
                border-radius: 30px;
                background: #9FE8B5;
                display: inline-block;
                position: relative;
                .fill{
                  position: absolute;
                  top:0;
                  left: 0;
                  width: 33.33%;
                  height: 15px;
                  border-radius: 30px;
                  background: #F6AD06;
                  display: inline-block;
                }
              }
            }
            p:nth-child(3){
              @include flex(row);
              align-items: center;
              flex-wrap: nowrap;
              line-height: 50px;
              white-space: nowrap;
              .progressbar{
                width: 250px;
                height: 15px;
                border-radius: 30px;
                background: #9FE8B5;
                display: inline-block;
                position: relative;
                .fill{
                  position: absolute;
                  top:0;
                  left: 0;
                  width: 33.33%;
                  height: 15px;
                  border-radius: 30px;
                  background: #F6AD06;
                  display: inline-block;
                }
              }
            }
            p:nth-child(4){
              @include flex(row);
              align-items: center;
              line-height: 50px;
              .progressbar{
                width: 250px;
                height: 15px;
                border-radius: 30px;
                background: #9FE8B5;
                display: inline-block;
                position: relative;
                .fill{
                  position: absolute;
                  top:0;
                  left: 0;
                  width: 0%;
                  height: 15px;
                  border-radius: 30px;
                  background: #F6AD06;
                  display: inline-block;
                }
              }
            }
            
          }
        }
      }
    }
  }
  .seedData{
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background:rgba(0,0,0,.2);
    .listData{
      background:#000;
      width:90%;
      height:500px;
      border-radius:10px;
      background:#fff;
      margin:0 auto;
      position:absolute;
      top:50%;
      left:50%;
      transform:translate(-50%,-50%);
      p:nth-child(1){
        text-align:center;
        line-height:80px;
        color:#000;
      }
      p:nth-child(2){
        overflow-y:scroll;
        height:300px;
        margin:0 auto;
     
      }
      .affirm{
        width:90%;
        margin:10px auto;
        background:#3ECC9D;
        height:60px;
        line-height:60px;
        text-align:center;
        color:#fff;
        border-radius:10px;
      }
    }
  }
}

</style>
<style lang="scss" scoped>

  .hs-farm-land { 
    position:relative;
    top: 4.15rem;
    width: 100%;
    height: 100%;
    .hs-farm-land-svg {
      position: relative; 
      margin: 0 auto; 
      overflow: hidden;
      top: 10px;
      width: 650px;
      height: 1360px;
      left: -30px;
      transform:rotate(2deg);
      -ms-transform:rotate(2deg);   /* IE 9 */
      -moz-transform:rotate(2deg);  /* Firefox */
      -webkit-transform:rotate(2deg); /* Safari 和 Chrome */
      -o-transform:rotate(2deg);
    }
  }
  .btnActive{
    height:85px!important;
    line-height:85px!important;
  }
  .iconfont{
    font-size: 50px;
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
<style lang="scss">
  .radioMt{
    width:90%;
    border:0;
    .mint-radiolist{
      margin-top: 0rem;
      .mint-cell-wrapper{
        font-size: 28px;
        line-height:2;
      }
      .mint-radio-core{
          width: 30px;
          height: 30px;
        &::after{
          top: 6px;
          left: 6px;
          width: 16px;
          height: 16px;
        }
      }
    }
   
  }
  .mint-toast-text{
    font-size: 28px;
  }
  

</style>




