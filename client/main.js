import Vue from 'vue';
import logSome from 'sme-log';
import 'c-swipe/dist/swipe.css';
import { Swipe, SwipeItem } from 'c-swipe';

import flexible from 'src/utils/flexible';

import App from './App';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
window.ilog = logSome('dev', 'error');

Vue.component('swipe', Swipe);
Vue.component('swipe-item', SwipeItem);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
