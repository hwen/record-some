import Vue from 'vue'

import App from './App'
import router from './router'
import store from './store'
import { logSome } from './utils'

Vue.config.productionTip = false

window.logSome = logSome

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
