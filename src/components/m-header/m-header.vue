<template>
  <div :class="$style.mHeader">
    <!-- <div :class="$style.icon"></div> -->
    <h1 :class="$style.text">Chicken Music</h1>
    <router-link tag="div" :class="$style.mine" to="/use">
      <i class="icon-mine"></i>
    </router-link>
  </div>
</template>
<script>
export default {
  data() {
    return {
      
    }
  },
}
</script>
<style lang="scss" module>
@import '~common/scss/variable.scss';
@import '~common/scss/mixin.scss';
  .mHeader{ 
    position: relative;
    height: 88px;
    text-align: center;
    color: $color-theme;
    font-size: 0;
    z-index: 1;
    background: $color-background;
    .icon{
      display: inline-block;
      vertical-align: top;
      margin-top: 12px;
      width: 50px;
      height: 54px;
      margin-left: 18px;
      // border: 1px solid red;
      background: url(../../common/image/logo@2x.png);
      background-size: 50px 54px;
    }
    .text{
      display: inline-block;
      vertical-align: top;
      line-height: 88px;
      font-size: 32px;
    }
    .mine{
      position: absolute;
      top: 0;
      right: 0;
      
    }
  }
</style>
<style lang="scss" scope>
@import '~common/scss/variable.scss';
@import '~common/scss/mixin.scss';
  .icon-mine{
    display: block;
    padding: 24px;
    font-size: 40px;
    color: $color-theme;
  }
</style>



