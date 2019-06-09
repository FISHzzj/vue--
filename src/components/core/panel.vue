<template>
  <section :class="[panelClass,cname]">
    <div>
      <i :class="[iconfont,fanhui]" @click="$router.back()"></i>
      <h4>{{title}}</h4>
      <i :class="[iconfont,shezhi]" v-if="shezhi" @click="sheClick"></i>
      <span v-else @click="txtClick">{{txt}}</span>
    </div>
    <slot></slot>
  </section>
</template>
<script>
export default {
  props: {
    cname: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    fanhui: {
      type: String,
      default: ''
    },
    shezhi: {
      type: String,
      default: ''
    },
    txt: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      panelClass: 'panel',
      iconfont: 'iconfont'

    }
  },
  methods: {
    txtClick() {
      this.$emit('tranfer', '跳转')
    },
    sheClick() {
      this.$emit('tranferset', '跳转')
    }

  }
}
</script>
<style lang="scss" scoped>
@import '~common/scss/element.scss';
.panel{
  @include panel;
  
}
.iconfont{
  font-size:30px;
  color:#ffffff;
}

</style>


