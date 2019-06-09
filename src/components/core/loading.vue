<template>
  <div :class="$style.content">
    <img src="../../common/image/emptyImg.png" alt="">
    <p>{{title}}</p>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: '正在加载中..'
    }
  }
}
</script>
<style lang="scss" module>
.content{
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  img{
    width: 90px;
    height: 90px;
  }
  p{
    margin-top: 20px;
    font-size: 24px;
    color: #999;
  }
}
</style>


