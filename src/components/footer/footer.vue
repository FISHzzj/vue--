<template>
  <div :class="$style.list">
    <router-link tag="div" to="/market" :class="$style.footerli" >
      <div><i class="iconfont icon-shichang"></i></div>
      <div class="itemLink">市场</div>
    </router-link>
    <router-link tag="div" to="/orchard"  :class="$style.footerli">
      <div><i class="iconfont icon-wodeguoyuan"></i></div>
      <div class="itemLink">我的果园</div>
    </router-link>  
    <router-link tag="div" to="/center"  :class="$style.footerli">
      <div><i class="iconfont icon-icon-test2"></i></div>
      <div class="itemLink">个人中心</div> 
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
.list{
  @include list(row);
  justify-content: space-around;
  font-size: 24px;
  // line-height: 10px;
  height: 100px;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  background: $color-background-f;
  color: #9a9a9a;
  border-top: 1px solid #d4d0d0;
}
.footerli{
   @include list(column);
   align-items: center;
  justify-content: center;
}
</style>
<style lang="scss" scoped>
@import '~common/scss/variable.scss';
  .itemLink{
    padding-bottom: 5px;
    color: $color-text-l;
    padding-top:5px;
    box-sizing:border-box;
    
  }
  .iconfont{
    font-size:28px;
  }
 .router-link-active{
    .itemLink{
      color:$color-theme;
    }
    .iconfont{
      color:$color-theme;
      font-size:28px;
    }
  }
</style>



