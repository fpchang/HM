<template>
	<view class="mobile-show-style" style="max-width: 450px;">
		<uni-collapse v-model="accordionVal" >

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
							<view class="list-item-c"><text>定单来源：</text><text>{{item.orderSouce_Zn}}</text></view>
							
						</view>
						<view class="list-item">
							<view class="list-item-c"><text>入住日期：</text><text>{{item.checkInStartDate}}</text></view>
							
						</view>
						<view  class="list-item">
							<view class="list-item-c"><text>退房日期：</text><text>{{item.checkInEndDate}}</text></view>
						</view>
						<view class="list-item">
							<view class="list-item-c"><text>创建人：</text><text>{{item.createrPhone}}【{{item.createrName}}】</text></view>
							
						</view>
						<view  class="list-item">
							<view class="list-item-c"><text>创建日期：</text><text>{{new Date(item.createTime).Format("yyyy/MM/dd HH:mm:ss")}}</text></view>
						</view>
						<view class="list-item">
							<view class="list-item-c"><text>房型：</text><text v-for="it of item.roomTypeArray">【{{it.name}}】* <text
								:class="[it.count>1?'strongText':'']">{{it.count}}</text></text></view>
							
						</view>
						<view class="list-item">
							<view class="list-item-c"><text>定金：</text><text class="num-style">{{item.downPayment}}</text>元</view>
							
						</view>
						<view class="list-item">
							<view class="list-item-c"><text>总金额：</text><text class="num-style">{{item.totalAmount}}</text>元</view>
							
						</view>
						<view class="list-item">
							<view class="list-item-c"><text>欠款：</text><text class="num-style" :style="{color:item.totalAmount - item.downPayment>0?'#e64340':''}">{{item.totalAmount - item.downPayment}}</text>元</view>
							
						</view>
						<view class="list-item" style="justify-content:flex-end">
							<view class="list-item-c">
								<u-icon
			   name="trash-fill"
			   color="#e64340"
			   labelColor="#e64340"
			   size="22"
			   label="撤消订单"
			   labelPos="bottom"
			   labelSize="12px"
			   @click="deleteOrder(item)"
			 ></u-icon>
								 <!-- <button class="uni-button" size="mini" type="warn"
								@click="deleteOrder(item)">撤消订单</button> -->
							
							</view>
						</view>
					</view>

				</view>
			</uni-collapse-item>

		</uni-collapse>
	</view>
</template>

<script>
	import OrderService from "../../../services/OrderService";
	export default {
		data() {
			return {
				accordionVal: '0'
			}
		},
		onLoad() {
			
		},
		created() {
			this.getOrderList();
		},
		computed:{
			hotel_id(){
				return this.$store.state.hotel_id;
			},
			checkInOrderList(){
				return this.$store.state.orderStore.orderListTodayAfter ||[];
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
			async getOrderList() {
				//uni.showLoading();
				try {
					await  this.$store.dispatch("getOrderListTodayAfter",this.hotel_id);
				} catch (error) {
					
				}
				uni.hideLoading();
			},
			async deleteOrder(item) {
				if(!this.$store.state.permissionStore.permissionList.includes('ORDER_DELETE')){
					this.$alert.alertNoPermisson();
					return;
				}
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
				//uni.showLoading();
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
	.num-style{
		padding-right: 8px;
		font-weight: bold;
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