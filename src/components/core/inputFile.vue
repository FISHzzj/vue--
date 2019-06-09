<template>
  <div :class="$style.voucher">
    <h4>{{title}}</h4>
    <div :class="$style.changeImg">
        <i class="iconfont icon-jiahao1"></i>
        <img :src="thumb" alt ref="headerImg" >
        <!-- <input type="file" accept="image/*" @change="selectImg($event)"/> -->
        <input  name='inputFile' type='file' multiple='mutiple' accept="image/*;capture=camera" @change="selectImg($event)" v-if="status!=2 && status2!=1">
    </div>
  </div>
</template>
<script>
export default {
  components: {

  },
  props: {
    title: {
      type: String,
      default: ''
    },
    thumb: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      default: ''
    },
    status2: {
      type: String,
      default: ''
    }
  },
  methods: {
    selectImg(e) {
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
            self.$emit('selectpic', self.headerImage)
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
    }
  }
}
</script>
<style lang="scss" module>
.voucher{
    margin-top: 30px;
  h4{
    color: #000000;
    font-size: 30px;
    font-weight: 600;
    line-height: 50px;
  }
  .changeImg{
    position: relative;
    width: 95%;
    margin: 10px auto;
    border: 1px solid #999;
    height: 250px;
    border-radius: 10px;
    >img{
      position: absolute;
      width: 100%;
      height: 100%;
    }
    >input{
      position: absolute;
      opacity: 0;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
<style lang="scss" scoped>
  .icon-jiahao1{
    position: absolute;
    font-size:200px;
    top:50%;
    left: 50%;
    transform:translate(-50%,-50%);
    color:#000;

  }
</style>



