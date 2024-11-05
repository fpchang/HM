<template>
	<view class="gather">
		<!-- <uni-section class="mb-10" title="待办" type="line"></uni-section> -->

		<view style="display: flex; justify-content: center">
			<view class="card-container" :style="{width: `${cardContainerWidth}px`}">
				<view class="card" v-for="(item,index) of dataList" :style="{width:`${cardWidth}px`}">
					<view class="card-item">
						<gatherCardComponent :targetObj="item" :numCount="item.numCount">
							<template v-slot:content>
								<view>
									<uni-section class="mb-10" title="详情" type="line"></uni-section>
									<view v-if="index==0" class="c-list">
										<view class="c-list-item" v-for="it of item.list">
											<text>{{it.userName}}</text>
											<view>
												<text
													style="color: red;font-weight: bold;letter-spacing: 3px;">{{"" | dayNum([it.checkInStartDateTimeStamp,it.checkInEndDateTimeStamp])}}</text><text>晚</text>
											</view>
										</view>
									</view>
									<view v-if="index==1" class="c-list">
										<view class="c-list-item" v-for="it of item.list">
											<text>{{it.userName}}</text>
											<view>
												<text
													style="color: red;font-weight: bold;letter-spacing: 3px;">{{it | roomNum}}</text><text>间</text>
											</view>
										</view>
									</view>
									<view v-if="index==2" class="c-list">
										<view class="c-list-item" v-for="it of item.list">
											<text>{{it.userName}}</text>
											<view>
												<text
													style="color: red;font-weight: bold;">{{it.mealType=='lunch'?'午餐':'晚餐'}}</text>
											</view>
										</view>
									</view>
								</view>


							</template>
						</gatherCardComponent>
					</view>
				</view>

			</view>
		</view>
		<!-- <uni-section class="mb-10" title="统计" type="line"></uni-section> -->
		<!-- <view>
      <ui-echarts ref="chart" :option="option" exportBase64></ui-echarts>
      <image v-if="image" :src="image"></image>
      <button type="primary" size="mini" @click="toImage">导出图片</button>
    </view> -->
	</view>
</template>

<script>
	import gatherCardComponent from './gatherCardComponent.vue';
	import OrderService from '../../../services/OrderService';
	import MenuService from '../../../services/MenuService';
	export default {
		components: {
			gatherCardComponent
		},
		props: {

		},
		data() {
			return {
				widthTemp: 0,
				todayCheckInOrderList: [],
				// dataList:[
				// 	{
				// 	title:"今日办理入住",
				//   numCount:0,
				// 	list:[]

				// 	},{
				// 		title:"今日入住房间数",
				//     numCount:0,
				// 		list:[]
				// 	}
				//   ,{
				// 		title:"今日餐饮订单",
				//     numCount:0,
				// 		list:[]
				// 	}
				// 	],
				chartList: [{
					title: "一个月内入住率",

					OrderList: []
				}, {
					title: "今年入住率",

					OrderList: []
				}],
				image: "",
				option: {}
			}
		},

		computed: {
			hotel_id() {
				return this.$store.state.hotel_id;
			},
			hotelList() {
				return this.$store.state.hotelList;
			},
			user() {
				return this.$store.state.user;
			},
			//今日办理入住的订单
			orderListByCheckInToday() {
				return this.$store.state.orderStore.orderListByCheckInToday;
			},
			orderListByCheckInToday_format() {
				return {
					title: "今日办理入住",
					list: this.orderListByCheckInToday,
					numCount: this.orderListByCheckInToday.length
				}
			},
			//今日住客订单
			orderListToday() {
				return this.$store.state.orderStore.orderListToday;
			},
			orderListToday_format() {
				let numCount = 0;
				this.orderListToday.map(item => {
					let num = 0;
					item.roomTypeArray.map(it => {
						num += it.count;
					});
					numCount += num;
				})
				return {
					title: "今日入住房间数",
					list: this.orderListToday,
					numCount: numCount
				}
			},
			//今日餐饮订单
			orderDishesToday() {
				return this.$store.state.menuStore.orderDishesToday;
			},
			orderDishesToday_format() {
				return {
					title: "今日餐饮订单",
					list: this.orderDishesToday,
					numCount: this.orderDishesToday.length,
				}
			},
			dataList() {
				return [this.orderListByCheckInToday_format, this.orderListToday_format, this.orderDishesToday_format]
			},
			isPc() {
				try {
					return (
						uni.getSystemInfoSync().deviceType == "pc" ||
						uni.getDeviceInfo().deviceType == "pc"
					);
				} catch (e) {
					return false;
				}
			},
			viewWidth() {
				let viewWidth = uni.getWindowInfo().windowWidth || uni.getWindowInfo().screenWidth;
				let scrollWidth = this.isPc ? 20 : 0;
				return viewWidth + this.widthTemp - this.widthTemp - scrollWidth;
			},

			cardWidth() {
				let windowWidth = this.viewWidth; //-20 为pc端滚动条宽度
				let count = Math.floor(windowWidth / 320);
				if (count == 0) {
					return windowWidth;
				}
				let ys = windowWidth % 320
				return Math.min(320 + (ys / count), 450)
			},
			cardContainerWidth() {
				let count = Math.max(Math.floor(this.viewWidth / this.cardWidth), 1);
				return this.cardWidth * count
			},
			isPcShow() {
				return this.$store.state.isPcShow;
			}

		},
		watch: {
			hotel_id() {
				this.initData();
			}
		},
		filters: {
			dayNum(val, params) {
				return Math.ceil((params[1] - params[0]) / (1000 * 60 * 60 * 24))
			},
			//今日客房数量
			roomNum(it) {
				let num = 0;
				it.roomTypeArray.map(item => {
					num += item.count;
				})
				return num
			}
		},

		mounted() {
			
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
			this.initData();
		},
		onLoad: function() {
			console.log('gatherComponent Show')
		},
		 created() {
			// this.getOrderListByCheckInToday();
			// this.getOrderListToday();
			//this.getOrderDishesToday();
			
		},
	
		methods: {
			async initData() {
				if (!this.hotel_id) {
					return;
				}
				await this.$store.dispatch("getOrderListByCheckInToday", this.hotel_id);
				await this.$store.dispatch("getOrderListToday", this.hotel_id);
				await this.$store.dispatch("getOrderDishesToday", this.hotel_id);



			},
			//获取今日入住
			async getOrderListByCheckInToday() {
				// try {
				//   const res = await OrderService.getOrderListByCheckIn(this.hotel_id,new Date());
				//   console.log("today checkin ",res.data);
				//  this.dataList[0].list=res.data;
				//  this.dataList[0].numCount=res.data.length;
				// } catch (error) {

				// }
			},
			//今日住客
			async getOrderListToday() {
				try {
					const res = await OrderService.getOrderListToday(this.hotel_id);
					// this.todayCheckInOrderList = res.data;
					if (res.data.length < 1) {
						return;
					}
					let numCount = 0;
					res.data.map(item => {
						let num = 0;
						item.roomTypeArray.map(it => {
							num += it.count;
						});
						numCount += num;
					})
					this.dataList[1].list = res.data;
					this.dataList[1].numCount = numCount;
				} catch (error) {
					console.error(error)
				}
			},
			//获取今日定餐
			async getOrderDishesToday() {
				try {
					let w = {
						hotel_id: this.hotel_id,
						mealDate: new Date().Format("yyyy-MM-dd")
					}
					const res = await MenuService.getOrderDishesListByCondition(w);
					console.log("today getOrderDishesToday ", res.data);
					// this.todayCheckInOrderList = res.data;
					this.dataList[2].list = res.data;
				} catch (error) {

				}
				await OrderService.getOrderListByCheckIn(this.hotel_id, new Date());
			},
			toImage() {
				this.$refs?.chart.toImageFile({
					/**
					 * tempFilePath 图片路径, H5导出也是base64
					 * base64 图片base64
					 */
					success: ({
						tempFilePath,
						base64
					}) => {
						this.image = base64;
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.gather {}

	.card-container {
		display: flex;
		flex-wrap: wrap;
		min-width: 320px;

		.card {
			min-width: 320px;
			max-width: 450px;
			padding: 10px;
			box-sizing: border-box;

			.card-item {
				height: 100%;
				box-sizing: border-box;
				background: #fff;
				padding: 10px 20px;
				box-shadow: 0 0 4px 4px #e4e0e0;
				border-radius: 8px;

			}
		}
	}

	.c-list {
		.c-list-item {
			display: flex;
			justify-content: space-between;
			padding: 8px 10px;
			font-size: 13px;

		}
	}
</style>