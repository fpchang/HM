// 引入全局mixin
import mixin from './libs/mixin/mixin.js'

// 规则检验
import test from './libs/util/test.js'
// 规则检验
import base64 from './libs/util/base64.js'
// 公共文件写入的方法
import index from './libs/util/index.js'

const $ui = {
    date: index.timeFormat, // 另名date
    test,
	base64,
    mixin,
    ...index
}

// $ui挂载到uni对象上
uni.$ui = $ui

const install = (Vue) => {
    // 时间格式化，同时两个名称，date和timeFormat
    Vue.filter('timeFormat', (timestamp, format) => uni.$ui.timeFormat(timestamp, format))
    Vue.filter('date', (timestamp, format) => uni.$ui.timeFormat(timestamp, format))
    // 将多久以前的方法，注入到全局过滤器
    Vue.filter('timeFrom', (timestamp, format) => uni.$ui.timeFrom(timestamp, format))
    // 同时挂载到uni和Vue.prototype中
    // #ifndef APP-NVUE
    // 只有vue，挂载到Vue.prototype才有意义，因为nvue中全局Vue.prototype和Vue.mixin是无效的
    Vue.prototype.$ui = $ui
    Vue.mixin(mixin)
    // #endif
}

export default {
    install
}
