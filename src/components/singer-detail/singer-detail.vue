<template>
  <transition name="slide">
    <div class="singer-detail">
      111111111111111111111111
    </div>
  </transition>
</template>
<script>
export default {

}
</script>
<style lang="scss" scoped>
@import '~common/scss/variable.scss';

.singer-detail{
  position:fixed;
  top: 0;
  left: 0;
  right: 0;
  background: $color-background;
}
.slide-enter-active,.slide-leave-active{
  transition:all 0.3s;
}
.slide-enter,.slide-leave-to{
  transform: translate3d( 100% , 0 , 0);
}

</style>


