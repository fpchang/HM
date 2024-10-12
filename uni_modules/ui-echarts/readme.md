# ui-echarts

基于百度开源的echarts封装的uni-app跨端可视化图表库, 兼容App、H5、小程序等平台

# 平台兼容

| App | H5  | 微信小程序 |
| --- | --- | --------- |
| √   | √   | √         |

其它平台未测试。

### main.js
```js
import uiEcharts from '@/uni_modules/ui-echarts'
Vue.use(uiEcharts)
```


### 用法
```html
<view>
	<ui-echarts ref="chart" :option="option" exportBase64></ui-echarts>
	<image v-if="image" :src="image"></image>
	<button type="primary" size="mini" @click="toImage">导出图片</button>
</view>
```

```js
export default {
	data () {
		return {
			image: null,
			option: {}
		}
	},
	onReady() {
		this.option = {
			grid: {
				right: 20
			},
			xAxis: {
				type: 'category',
				data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
			},
			yAxis: {
				type: 'value'
			},
			series: [{
				data: [150, 230, 224, 218, 135, 147, 260],
				type: 'line'
			}]
		}
	},
	methods: {
		toImage () {
			this.$refs?.chart.toImageFile({
				/**
				 * tempFilePath 图片路径, H5导出也是base64
				 * base64 图片base64
				 */
				success: ({ tempFilePath, base64 }) => {
					this.image = base64;
				}
			})
		}
	}
}
```

### Props

| 参数             | 说明                           | 类型             | 默认值        |
| --------------- | --------                       | -------          | ------------ |
| option          | 图表配置项                      | Object           | -            |
| width           | 图表宽度                        | String, Number   | '100%'       |
| height          | 图表高度                        | String, Number   | '600rpx'     |
| exportBase64    | 是否转换image本地文件为base64    | Boolean          | false        |
