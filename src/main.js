import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css' // 引入Element UI的样式
import router from './router'

import store from './store/store'
Vue.config.productionTip = false
// 使用 Element UI
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
