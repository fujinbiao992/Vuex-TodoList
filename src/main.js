import Vue from 'vue'
import App from './App.vue'

// 导入组件库
import Antd from 'ant-design-vue'
// 导入组件样式库
import 'ant-design-vue/dist/antd.css'

import store from './store.js'

Vue.config.productionTip = false

Vue.use(Antd)

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
