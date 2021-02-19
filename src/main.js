import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import './plugins/element.js'

import axios from 'axios'
axios.defaults.withCredentials=true
Vue.prototype.HOST = 'http://localhost:3000'
Vue.prototype.$http=axios
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
import 'element-ui/lib/theme-chalk/index.css'

 

//自己写的样式
import './style/theme.css'
import './style/character.css'

Vue.config.productionTip = false

Vue.use(ElementUI)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
