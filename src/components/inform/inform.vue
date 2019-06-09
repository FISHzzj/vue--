<template>
  <div :class="$style.content">
    <Panel fanhui="icon-huise"  title="申诉" >
    </Panel>
    <div :class="$style.inform">
      <!-- <div :class="$style.headline">
        <label for="title">标题：<input type="text" id="title" v-model="remarks" value="" placeholder="填写标题"></label>
      </div> -->
      <div :class="$style.upload">
        <i class="iconfont icon-jiahao1"></i>
        <img src="" alt ref="headerImg">
        <!-- <input type="file" accept="image/*" @change="selectImg($event)"/> -->
        <input  name='inputFile' type='file' multiple='mutiple' accept="image/*;capture=camera" @change="uploadImg($event)">
      </div>
      <div :class="$style.contentText">内容：<textarea name="contentText" id="contentText" v-model="contentText" cols="30" rows="10" placeholder="请输入内容..."></textarea></div>
      <div :class="$style.btnup" @click="btnup">提交</div>
    </div>
  </div>
</template>
<script>
import Panel from '../core/panel.vue'
import { Toast } from 'mint-ui'
export default {
  name: 'inform',
  components: {
    Panel
  },
  data() {
    return {
      headerImage: '',
      id: '',
      contentText: ''
    }
  },
  created() {
    this.$nextTick(() => {
      this.id = this.$route.query.logid
    })
  },
  methods: {
    uploadImg(e) {
      console.log(e)
      let files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.picValue = files[0]
      this.imgPreview(this.picValue)
      console.log(this.picValue)
    },
    imgPreview (file) {
      let self = this
    // 看支持不支持FileReader
      if (!file || !window.FileReader) return
      if (/^image/.test(file.type)) {
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = function () {
          let result = this.result
          let img = new Image()
          img.src = result
          img.onload = function () {
            let data = self.compress(img)
            self.headerImage = data
            self.$refs.headerImg.src = self.headerImage
          }
        }
      }
    },
    // 压缩图片
    compress(img) {
      let canvas = document.createElement('canvas')
      let ctx = canvas.getContext('2d')
      let initSize = img.src.length
      let width = img.width
      let height = img.height
      canvas.width = width
      canvas.height = height
                // 铺底色
      ctx.fillStyle = '#fff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0, width, height)

                // 进行最小压缩
      let ndata = canvas.toDataURL('image/jpeg', 0.5)
                // console.log("*******压缩后的图片大小*******");
                // console.log(ndata)
                // console.log(ndata.length);
      return ndata
    },
    btnup() {
      if (this.headerImage == '') {
        Toast({
          message: '凭证不能为空',
          position: 'bottom',
          duration: 1000
        })
      }
      let postData = this.$qs.stringify({
        op: 'appeal',
        status: 1, // 申诉
        logid: this.id,
        thumb: this.headerImage,
        remarks: this.contentText
      })
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
    }
  }
}
</script>

<style lang="scss" module>
@import "~common/scss/mixin.scss";
@import "~common/scss/element.scss";

.content{
  font-size: 26px;
  background: #F5F5F5;
  .inform{
    background: #ffffff;
    color: #000;
    height: 100%;
    .headline{
      padding: 10px 20px;
      box-sizing: border-box;
      border-bottom: 1px solid #999;
      input{
        width: 460px;
        height: 60px;
        font-size: 26px;
      }
    }
    .upload{
      position: relative;
      height: 500px;
      @include flex();
      justify-content: center;
      align-items: center;
      >img{
          width: 400px;
          height: 400px;
          position: absolute;
          top: 30px;
      }
      >input{
        position: absolute;
        top: 30px;
        width: 400px;
        height: 400px;
        opacity: 0;
      }

    }
    .contentText{
      @include flex(row);
      justify-content: center;
      align-items: center;
      >textarea{
         width: 460px;
         height: 200px;
         border: 1px solid #999;
         font-size: 28px;
      }
    }
    .btnup{
      width: 90%;
      margin: 20px auto 160px;
      border-radius: 10px;
      background: #3FD09F;
      margin-bottom: 160px;
      height: 80px;
      line-height: 80px;
      color: #ffffff;
      text-align: center;
    }
  }
}

</style>
<style lang="scss" scoped>
.icon-jiahao1{
  font-size: 300px;
}
</style>
<style lang="scss">
// Toast
  .mint-toast-text{
    font-size: 28px;
  }
</style>



