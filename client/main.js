import Vue from 'vue';
import logSome from 'sme-log';
import 'c-swipe/dist/swipe.css';
import { Swipe, SwipeItem } from 'c-swipe';
import PrettyCheckbox from 'pretty-checkbox-vue';
import 'pretty-checkbox/dist/pretty-checkbox.min.css';

import flexible from 'src/utils/flexible';

import App from './App';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
window.ilog = logSome('dev', 'error');

Vue.use(PrettyCheckbox);
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
