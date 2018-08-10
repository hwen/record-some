import Hammer from 'hammerjs';
import Vue from 'vue';

export const Touch = {
  config: {},
  customEvents: {},
  install() {
    Vue.directive('touch', {
      bind: (el, binding, vnode) => {},
      unbind: (el, binding, vnode) => {},
      inserted: (el, binding, vnode) => {},
      update: (el, binding, vnode) => {},
      componentUpdated: (el, binding, vnode) => {}
    });
  }
};
