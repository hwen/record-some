import Vue from 'vue';
import logSome from 'sme-log';
import flexible from 'src/utils/flexible';

import App from './App';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
window.ilog = logSome('dev', 'error');

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
