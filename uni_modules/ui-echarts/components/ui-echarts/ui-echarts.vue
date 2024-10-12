<template>
	<view class="ui-echarts" :class="[customClass]" :style="wrapStyle">
	<!-- #ifndef APP-NVUE -->
		<!-- #ifdef MP-WEIXIN || MP-TOUTIAO -->
		<canvas class="ui-echarts_canvas" :style="wrapStyle" :canvas-id="canvasId" :id="canvasId" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd" type="2d" />
		<!-- #endif -->
		<!-- #ifndef MP-WEIXIN || MP-TOUTIAO -->
		<canvas class="ui-echarts_canvas" :style="wrapStyle" :canvas-id="canvasId" :id="canvasId" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd" />
		<!-- #endif -->
	<!-- #endif -->
	<!-- #ifdef APP-NVUE -->
		<web-view ref="webview" class="ui-echarts_webview"
			src="/uni_modules/ui-echarts/static/index.html"
			:style="wrapStyle" 
			:id="canvasId"
			@onPostMessage="onPostMessage">
		</web-view>
	<!-- #endif -->
	</view>
</template>
<script>
	import * as echarts from '../../static/echarts.min.js';
	import * as ecStat from '../../static/ecStat.min.js';
	import WxCanvas from '../../static/wxcanvas.js';
	
	let chartList = {};
	
	function wrapTouch(event) {
		for (let i = 0; i < event.touches.length; ++i) {
			const touch = event.touches[i];
			touch.offsetX = touch.x;
			touch.offsetY = touch.y;
		}
		return event;
	}
	/**
	 * Echart 图表工具
	 * @description 通过折叠面板收纳内容区域（搭配ui-collapse使用）
	 * @tutorial https://echarts.apache.org/zh/api.html#echarts
	 * @property {String}			option 						图表配置
	 * @property {String | Number}	width						宽度，默认100%
	 * @property {String | Number}	height						高度，默认300px
	 * @property {Boolean}			exportBase64=[base64] 		输出类型, 默认false
	 * @example
	 */
	export default {
		name: 'ui-echarts',
		mixins: [uni.$ui.mixin],
		// #ifdef MP-WEIXIN
		// 将自定义节点设置成虚拟的，更加接近Vue组件的表现，能更好的使用flex属性
		options: {
		    virtualHost: true
		},
		// #endif
		props: {
			option: {
				type: Object,
				default: () => {
					return {}
				}
			},
			width: {
				type: [String, Number],
				default: '100%',
			},
			height: {
				type: [String, Number],
				default: '600rpx'
			},
			// 输出类型, base64输出base64, H5无效。
			exportBase64: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				canvasId: `canvas_${uni.$ui.guid(10)}`,
				ctx: null,
				// 网页初始化就绪。用于NVUE
				webviewReady: false,
				// 图表初始化就绪。用于NVUE
				webviewChart: false,
				// 图表导出图片临时文件
				webviewCallback: null
			}
		},
		computed: {
			wrapStyle () {
				const { width, height } = this;
				const { addUnit, addStyle } = uni.$ui;
				return addStyle({width: addUnit(width), height: addUnit(height)}, 'string')
			}
		},
		watch: {
			option(newValue, oldValue) {
				if(newValue.series){
					this.initChart(newValue)
				}
			},
			// #ifdef APP-NVUE
			webviewReady(state) {
				this.initChart(this.option);
			}
			// #endif
		},
		methods: {
			getCanvasAttr2d() {
				return new Promise((resolve, reject) => {
					const query = uni.createSelectorQuery().in(this)
					query
						.select('#' + this.canvasId)
						.fields({
							node: true,
							size: true
						})
						.exec(res => {
							const canvasNode = res[0].node
							this.canvasNode = canvasNode
							const canvasDpr = uni.getSystemInfoSync().pixelRatio
							const canvasWidth = res[0].width
							const canvasHeight = res[0].height
							this.ctx = canvasNode.getContext('2d')
			
							const canvas = new WxCanvas(this.ctx, this.canvasId, true, canvasNode)
							echarts.setCanvasCreator(() => {
								return canvas
							})
							resolve({
								canvas,
								canvasWidth,
								canvasHeight,
								canvasDpr
							})
						})
				});
			},
			getCanvasAttr() {
				return new Promise((resolve, reject) => {
					this.ctx = uni.createCanvasContext(this.canvasId, this);
					var canvas = new WxCanvas(this.ctx, this.canvasId, false);
					echarts.setCanvasCreator(() => {
						return canvas;
					});
					const canvasDpr = 1
					var query = uni.createSelectorQuery()
						// #ifndef MP-ALIPAY
						.in(this)
					// #endif
					query.select('#' + this.canvasId).boundingClientRect(res => {
						const canvasWidth = res.width
						const canvasHeight = res.height
						resolve({
							canvas,
							canvasWidth,
							canvasHeight,
							canvasDpr
						})
					}).exec();
				});
			},
			// #ifdef H5
			//H5绘制图表
			initChart(option) {
				this.ctx = uni.createCanvasContext(this.canvasId, this);
				chartList[this.canvasId] = echarts.init(document.getElementById(this.canvasId));
				chartList[this.canvasId].setOption(option?option:this.option);
			},
			//H5生成图片
			toImageFile(opt) {
				const base64 = chartList[this.canvasId].getDataURL()
				opt.success && opt.success({tempFilePath: base64, base64 })
			},
			// #endif
			// #ifndef H5
			//绘制图表
			async initChart(option) {
				// #ifdef APP-NVUE
				this.chartInitOption(option);
				return;
				// #endif
				// #ifdef MP-WEIXIN || MP-TOUTIAO 
				const canvasAttr = await this.getCanvasAttr2d();
				// #endif
				// #ifndef MP-WEIXIN || MP-TOUTIAO
				const canvasAttr = await this.getCanvasAttr();
				// #endif
				const {
					canvas,
					canvasWidth,
					canvasHeight,
					canvasDpr
				} = canvasAttr
				chartList[this.canvasId] = echarts.init(canvas, null, {
					width: canvasWidth,
					height: canvasHeight,
					devicePixelRatio: canvasDpr // new
				});
				canvas.setChart(chartList[this.canvasId]);
				chartList[this.canvasId].setOption(option?option:this.option);
			},
			//生成图片
			toImageFile(opt) {
				const self = this;
				// #ifdef APP-NVUE
				this.chartToImage(opt);
				return;
				// #endif
				// #ifdef MP-WEIXIN || MP-TOUTIAO
				var query = uni.createSelectorQuery()
					// #ifndef MP-ALIPAY
						.in(this)
					// #endif
				query.select('#' + this.canvasId).fields({ node: true, size: true }).exec(res => {
					const canvasNode = res[0].node
					opt.canvas = canvasNode
					self.toImageFileHandle(opt)
					// uni.canvasToTempFilePath(opt, this)
				})
				// #endif
				// #ifndef MP-WEIXIN || MP-TOUTIAO
				if (!opt.canvasId) {
					opt.canvasId = this.canvasId;
				}
				this.ctx.draw(true, () => {
					self.toImageFileHandle(opt)
					// uni.canvasToTempFilePath(opt, this);
				});
				// #endif
			},
			toImageFileHandle (opt) {
				if (!this.exportBase64) {
					uni.canvasToTempFilePath(opt, this);
				} else {
					const { success, fail, complete, ...rest } = opt;
					uni.canvasToTempFilePath({
						...rest,
						success: async (res) => {
							const tempFilePath = res.tempFilePath;
							const base64Str = await uni.$ui.base64.pathToBase64(tempFilePath);
							success && success({ errMsg: res.errMsg, tempFilePath, base64: base64Str })
						},
						fail: (res) => {
							fail && fail(res)
						},
						complete: (res) => {
							complete && complete(res)
						}
					})
				}
			},
			// #endif
			touchStart(e) {
				if (chartList[this.canvasId] && e.touches.length > 0) {
					var touch = e.touches[0];
					var handler = chartList[this.canvasId].getZr().handler;
					handler.dispatch('mousedown', {
						zrX: touch.x,
						zrY: touch.y
					});
					handler.dispatch('mousemove', {
						zrX: touch.x,
						zrY: touch.y
					});
					handler.processGesture(wrapTouch(e), 'start');
				}
			},
			touchMove(e) {
				if (chartList[this.canvasId] && e.touches.length > 0) {
					var touch = e.touches[0];
					var handler = chartList[this.canvasId].getZr().handler;
					handler.dispatch('mousemove', {
						zrX: touch.x,
						zrY: touch.y
					});
					handler.processGesture(wrapTouch(e), 'change');
				}
			},
			touchEnd(e) {
				if (chartList[this.canvasId]) {
					const touch = e.changedTouches ? e.changedTouches[0] : {};
					var handler = chartList[this.canvasId].getZr().handler;
					handler.dispatch('mouseup', {
						zrX: touch.x,
						zrY: touch.y
					});
					handler.dispatch('click', {
						zrX: touch.x,
						zrY: touch.y
					});
					handler.processGesture(wrapTouch(e), 'end');
				}
			},
			// #ifdef APP-NVUE
			chartInitOption (option) {
				this.webviewReady && this.$refs.webview.evalJs(`setOption(${JSON.stringify(option)})`);
			},
			chartToImage (opt) {
				this.webviewCallback = opt;
				this.webviewReady && this.webviewChart && this.$refs.webview.evalJs(`toImage()`);
			},
			chartClear () {
				this.webviewReady && this.webviewChart && this.$refs.webview.evalJs(`clearChart()`);
			},
			async onPostMessage (evt) {
				/**
				 * 1: 准备就绪（webview）
				 * 2: 初始化echarts
				 * 3: 设置echarts option
				 * 4: 导出图片
				 * 5: 销毁echarts实例
				 * */
				const res = evt?.detail?.data[0] || { state: 0 };
				if (res.state === 1) {
					this.webviewReady = true;
				} else if (res.state === 2) {
					this.webviewChart = true;
				} else if (res.state === 3) {
					// option 更新成功
				} else if (res.state === 4) {
					const opt = { ...this.webviewCallback };
					const filePath = await uni.$ui.base64.base64ToPath(res.base64);
					opt.success && opt.success({ errMsg: 'ok', tempFilePath: filePath, base64: res.base64 });
				}
			},
			// #endif
			clearChart () {
				// #ifdef APP-NVUE
				this.chartClear();
				return;
				// #endif
				if (chartList[this.canvasId]) {
					chartList[this.canvasId].clear()
				}
			}
		},
		beforeDestroy() {
			this.clearChart();
		},
		mounted() {
			// Disable prograssive because drawImage doesn't support DOM as parameter
			// See https://developers.weixin.qq.com/miniprogram/dev/api/canvas/CanvasContext.drawImage.html
			echarts.registerPreprocessor(option => {
				if (option && option.series) {
					if (option.series.length > 0) {
						option.series.forEach(series => {
							series.progressive = 0;
						});
					} else if (typeof option.series === 'object') {
						option.series.progressive = 0;
					}
				}
			});
		}
	}
</script>
<style lang="scss" scoped>
	.ui-echarts {
		flex: 1;
		
		&_canvas {
			width: 100%;
			height: 100%;
		}
	}
</style>
