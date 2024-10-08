import App from './App';
import store from './store/store';
import scenicSpotStore from './store/scenicSpotStore';
import menuStore from './store/menuStore';
import orderStore from './store/orderStore';
import './routeIntercept.js'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor';
import uView from '@/uni_modules/uview-ui';
import {CF} from './static/utils/CF';
Vue.use(uView);
Vue.prototype.$store = store;
Vue.prototype.$orderStore= orderStore;
Vue.prototype.$scenicSpotStore = scenicSpotStore;
Vue.prototype.$menuStore = menuStore;
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif