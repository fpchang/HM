<template>
	<view class="mobile-show-style" style="max-width: 450px;">
		<uni-collapse v-model="accordionVal" :accordion="true">
			<uni-collapse-item v-for="item of checkInOrderList">
				<template v-slot:title>
					<uni-section class="mb-10" :title=" item.userName " :sub-title="item| formatDateTitle">
						<template v-slot:right>
							<text>{{item.roomTypeArray.length}}间-</text>
							<text>{{"" | dayNum([item.checkInStartDateTimeStamp,item.checkInEndDateTimeStamp])}}天</text>
						</template>
					</uni-section>
				</template>
				<view class="col-content">
					<view class="list">
						<view class="list-item">
							<view class="list-item-c"><text>入住日期：</text><text>{{item.checkInStartDate}}</text></view>
							<view class="list-item-c"><text>退房日期：</text><text>{{item.checkInEndDate}}</text></view>
						</view>
						<view class="list-item">`
							<view class="list-item-c"><text>房型：</text><text>大床房</text></view>
							<view class="list-item-c"><button class="uni-button" size="mini" type="warn"
									@click="deleteOrder(item)">撤消订单</button></view>
						</view>
					</view>

				</view>
			</uni-collapse-item>

		</uni-collapse>
	</view>
</template>

<script>
	import DB from '../../../api/DB';
	export default {
		data() {
			return {
				accordionVal: '0'
			}
		},
		onLoad() {
			console.log("orderChildList.....")
		},
		created() {
			//this.getOrderList();
			// if(this.checkInOrderList.length<1){
			// 	this.getOrderList();
			// }
		},
		computed:{
			hotel_id(){
				return this.$store.state.hotel_id;
			},
			checkInOrderList(){
				return this.$store.state.orderListTodayAfter;
			}
		},
		filters: {
			formatDateTitle(item) {
				return `${new Date(item.checkInStartDateTimeStamp).Format("MM-dd")}~${new Date(item.checkInEndDateTimeStamp).Format("MM-dd")}`;
			},
			dayNum(val, params) {
				return Math.ceil((params[1] - params[0]) / (1000 * 60 * 60 * 24))
			}
		},
		methods: {
			getOrderList() {
				uni.showLoading();
				let startTime = new Date(new Date().Format("yyyy/MM/dd 14:00:00")).getTime();
				let endTime = new Date(new Date().Format("yyyy/MM/dd 12:00:00")).getTime();
				let jql =
					`hotel_id=='${this.hotel_id}'&&orderStatus!=10&&(checkInStartDateTimeStamp>=${startTime} ||` +
					`(${endTime}<checkInEndDateTimeStamp && ${endTime}>checkInStartDateTimeStamp))`;

				return DB.getCollection("hm-order", jql).then(res => {
					//this.checkInOrderList = res.data;
					this.$store.commit("updateOrderListTodayAfter",res.data);
					uni.hideLoading();
				}).catch(err => {
					console.log(err)
					uni.hideLoading();
				})
			},
			async deleteOrder(item) {
				console.log(item)
				let _id = item._id;
				const conf = await uni.showModal({
					title: '确认取消订单',
					content: '取消后将无法恢复,需要重新创建订单',
					cancelText: '取消',
					confirmText: '确认'
				})
				if (conf['cancel']) {
					return;
				}
				uni.showLoading();
				const res = await uniCloud.callFunction({
					name: 'hm-deleteOrder',
					data: {
						_id
					}
				});
				uni.hideLoading();
				if (res.result.code == 0) {
					uni.showToast({
						title: '取消成功'
					});
				}

				console.log(res);
				this.getOrderList();
			}
		}
	}
</script>

<style lang="scss">
	.col-content {
		/* background: linear-gradient(to bottom, #FFF, #EEF); */
		border-radius: 4px;
		padding: 0 20px;

		.list {
			display: flex;
			flex-direction: column;

			.list-item {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				padding: 10px 0;

				.list-item-c {
					display: flex;
					justify-content: space-between;
					align-items: center;
				}
			}
		}
	}

	.wrap {
		padding: 12px;
	}

	.demo-layout {
		height: 50px;
		border-radius: 4px;
	}

	/* .bg-purple {
	        background: #CED7E1;
	    }
	
	    .bg-purple-light {
	        background: #e5e9f2;
	    }
	
	    .bg-purple-dark {
	        background: #99a9bf;
	    } */
</style>