import App from './App';
import store from './store/store';
import './routeIntercept.js';
import alert from "./alert";

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor';
import uView from '@/uni_modules/uview-ui';
import {CF} from './static/utils/CF';
//import uiEcharts from '@/uni_modules/ui-echarts';

//Vue.use(uiEcharts);
Vue.use(uView);
Vue.prototype.$store = store;
Vue.prototype.$alert = alert;
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif
Vue.prototype.staticDir = 'https://www.xxxxxxxx.com.cn/wx/static/'; 
Vue.prototype.getStaticFilePath = function (url) {
    return Vue.prototype.staticDir + url;  
}

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif