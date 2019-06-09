<template>
  <div :class="$style.content">
    <Panel fanhui="icon-huise" title="添加银行卡"  >
    </Panel>
    <section :class="$style.account">
        <div :class="$style.selectPay">
          <h4>银行</h4>
          <div :class="$style.select">
            <select  v-model="select2" @change="getValue">
              <option value="">--请选择--</option>
              <option v-for='(item,index) in optionList' :key="index" :value="item.value" >{{item.name}}</option>
            </select>
          </div>
        </div>
        <div v-for="(list,index) in lists" :key="index">
           <div :class="$style.accountTxt" ref="accountTxt"  v-if="list.id==select2">
            <div :class="$style.accountname" v-if="list.subbranch==1">
              <h4>支行名称：</h4>
              <input type="text" v-model="subBranch" placeholder="支行名称">
            </div>
            <div :class="$style.accountname" v-if="list.bank_name==1" >
              <h4>银行名称：</h4>
              <input type="text" v-model="bankName" placeholder="银行名称">
            </div>
            <div :class="$style.accountnumber">
              <h4>账号名称：</h4>
              <input type="text" v-model="accountName" placeholder="账户名称,须和实名信息一致(真实姓名)">
            </div>
            <div :class="$style.accountnumber">
              <h4>收款账号：</h4>
              <input type="text" v-model="shoukuanNum"  placeholder="账号">
            </div>
            <div v-if="list.qcode==1">
              <InputFile title="收款二位码"  @selectpic="selectImage"></InputFile>
            </div>
          </div>
        </div>
       
        <!-- <div :class="$style.accountTxt" v-else>
          <div :class="$style.accountname" >
            <h4>银行名称：</h4>
            <input type="text" placeholder="账户名称,须和实名信息一致(真实姓名)">
          </div>
          <div :class="$style.accountnumber">
            <h4>账号：</h4>
            <input type="text" placeholder="账户名称,须和实名信息一致(真实姓名)">
          </div>
          <div>
            <InputFile title="收款二位码" @selectpic="selectImage"></InputFile>
          </div>
        </div> -->

        <div :class="$style.verify">
          <div>
            <h4>手机验证码：</h4>
            <div><input type="text" v-model="code" placeholder="请输入验证码"><div @click="getCode" ref="verifihandle">获取验证码</div></div>
          </div>
          <div @click="addCard">确认添加</div>
        </div>
    </section>
  </div>
</template>
<script>
import Panel from '../core/panel.vue'
import InputFile from '../core/inputFile.vue'

export default {
  name: 'account',
  components: {
    Panel,
    InputFile

  },
  data() {
    return {
      select2: '',
      optionList: [],
      lists: [],
      subBranch: '', // 支行名称
      bankName: '',
      accountName: '', // 账号名称
      shoukuanNum: '', // 收款账户
      erWeiMa: '',
      sendCodeNum: 60,
      mobile: '',
      username: '',
      code: '' // 验证码
    }
  },
  created() {
    this._addCount()
    this.mobile = this.$route.query.mobile
    this.username = this.$route.query.username
  },
  methods: {
    selectImage(e) {
      console.log(e)
      this.erWeiMa = e
    },
    getValue() {
      console.log(this.select2)
    },
    addCard() {
      let postData = this.$qs.stringify({
        op: 'update',
        type: this.select2, // 收款方式
        qcode: this.erWeiMa, // 二维码
        bank_name: this.bankName, // 银行名称
        username: this.shoukuanNum, // 收款账户
        subbranch: this.subBranch, // 支行名称
        accountName: this.accountName, // 账户名
        status: this.status, // 开启1
        m_code: this.code
      })
      this.$axios({
        method: 'post',
        url: `${this.$URL}/app/index.php?i=143&c=entry&do=ws_orchard&m=sz_yi&p=ws_payment_method`,
        data: postData
      }).then(res => {
        console.log(res)
        if (res.data.status == 0) {
          alert(res.data.result.list)
          return
        } else {
          alert(res.data.result.list)
          this.$router.push({
            path: '/addCard'
          })
        }
      })
    },
    _addCount() {
      this.$axios({
        method: 'post',
        url: `${this.$URL}/app/index.php?i=143&c=entry&do=ws_orchard&m=sz_yi&p=ws_payment_method`,
        params: {
          op: 'add'
        }
      }).then((res) => {
        console.log(res)
        this.lists = res.data.result.list
        this.lists.forEach((v) => {
          this.optionList.push({
            value: v.id,
            name: v.payment_name
          })
        })
      })
    },
    getCode() {
      this.$axios({
        method: 'post',
        url: `${this.$URL}/app/index.php?i=143&c=entry&do=member&m=sz_yi&p=sendcode`,
        params: {
          op: 'update_pwd',
          mobile: this.mobile,
          username: this.username
        }
      }).then((res) => {
        console.log(res)
        var timer = setInterval(() => {
            // console.log(this.sendCodeNum)
          if (this.sendCodeNum == 0) {
            clearInterval(timer)
            this.$refs.verifihandle.innerHTML = '获取验证码'
            this.sendCodeNum = 60
            return
          }
          this.sendCodeNum = this.sendCodeNum - 1
          this.$refs.verifihandle.innerHTML = `${this.sendCodeNum}s`
        }, 1000)
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
  .account{
    padding: 20px 20px;
    .selectPay{
      h4{
        color: #000;
        line-height: 50px;
      }
      .select{
        display: inline-block;
        width: 600px;
        position: relative;
        vertical-align: middle;
        padding: 0;
        overflow: hidden;
        background-color: #fff;
        color: #555;
        border: 1px solid #aaa;
        text-shadow: none;
        border-radius: 8px;	
        transition: box-shadow 0.25s ease;
        z-index: 2;
        line-height: 60px;
        margin:20px 0;
        &:hover {
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
        }
        &:before {
            content: "";
            position: absolute;
            width: 0;
            height: 0;
            border: 20px solid transparent;
            border-top-color: #ccc;
            top: 20px;
            right: 20px;
            cursor: pointer;
            z-index: -2;
        }
        >select{
          cursor: pointer;
          padding: 10px;
          width: 100%;
          border: none;
          background: transparent;
          background-image: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          font-size: 28px;
          &:focus {
            outline: none;
          }
          option{
            font-size: 18px;
          }
        }
      }
     
    }
    .accountTxt{
      .accountname{
        >h4{
          color: #000;
          line-height: 50px;
        }
        >input{
          border: 1px solid #999;
          width:100%;
          line-height: 60px;
          border-radius: 10px;
          padding: 0 10px;
          box-sizing: border-box;
        }
      }
      .accountnumber{
        >h4{
          color: #000;
          line-height: 50px;
        }
        >input{
          border: 1px solid #999;
          width:100%;
          line-height: 60px;
          border-radius: 10px;
          padding: 0 10px;
          box-sizing: border-box;
        }
      }
    }
    .verify{
      margin-bottom: 100px;
      >div:first-child{
        h4{
          color: #000;
          line-height: 50px;
        }
        >div{
          >input{
            width: 400px;
            height: 60px;
            border: 1px solid #999;
            line-height: 60px;
            border-radius: 10px;
            padding: 0 10px;
            box-sizing: border-box;
          }
          >div{
            display: inline-block;
            margin-left: 20px;
            width: 150px;
            height: 60px;
            border: 1px solid #999;
            line-height: 60px;
            border-radius: 10px;
            text-align: center;
            box-sizing: border-box;
            color: #999;
          }
        }

      }
      >div:last-child{
        margin-top: 20px;
        // border: 1px solid #999;
        width:100%;
        line-height: 60px;
        border-radius: 10px;
        text-align: center;
        box-sizing: border-box;
        color: #ffffff;
        background: #89e0be;
        
      }
    }
  }
}

</style>

<style lang="scss" scoped>
  html,body{
    background: #f6f6f3;
  }
  .iconfont{
    font-size: 50px;
  
  }

</style>


