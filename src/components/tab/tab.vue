<template>
  <div :class="$style.list">
    <router-link tag="div" to="/recommend" >
      <span class="itemLink">推荐</span>
    </router-link>
    <router-link tag="div" to="/singer" >
      <span class="itemLink">歌手</span>
    </router-link>
    <router-link tag="div" to="/rank" >
      <span class="itemLink">排行</span> 
    </router-link>
    <router-link tag="div" to="/search" >
      <span class="itemLink">搜索</span> 
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
  font-size: 28px;
  line-height: 44px;
  height: 44px;
  position: relative;
  z-index: 1;
  background: $color-background;
}
</style>
<style lang="scss">
@import '~common/scss/variable.scss';
  .itemLink{
    padding-bottom: 5px;
    color: $color-text-l;
  }
 .router-link-active{
    .itemLink{
      color:$color-theme;
      border-bottom: 2px solid $color-theme;
    }
  }
</style>



