// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import FastClick from 'fastclick'
import 'common/scss/index.scss'
import axios from 'axios'
import qs from 'qs'
import VueLazyload from 'vue-lazyload'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
// eslint-disable-next-line no-duplicate-imports
import { Button, Loadmore, Spinner, Radio } from 'mint-ui'
import URL from './url.conf'
// 复制到粘贴板功能
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

// 移动端调试工具，在移动端输出日志
/* eslint-disable no-unused-vars */
// import vConsole from 'vconsole'
// console.log('Hello world')

// 消除 click 移动浏览器300ms延迟
// eslint-disable-next-line no-duplicate-imports
import attachFastClick from 'fastclick'
attachFastClick.attach(document.body)

Vue.use(Mint)
Vue.config.productionTip = false
Vue.prototype.$axios = axios    // 全局注册，使用方法为:this.$axios
Vue.prototype.$URL = URL // 全局注册 使用方法为:this.URL
Vue.prototype.$qs = qs // 全局注册，使用方法为:this.$qs
FastClick.attach(document.body)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: require('./common/image/default.png'),
  attempt: 1
})

Vue.component(Button.name, Button)
Vue.component(Loadmore.name, Loadmore)
Vue.component(Spinner.name, Spinner)
Vue.component(Radio.name, Radio)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // components: {
  //   App
  // },
  // template: '<App/>'
  render: h => h(App)
})
