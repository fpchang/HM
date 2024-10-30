<template>
	<view class="h5-show-style">
		<view class="cond-c">

			<view style="display: flex;" class="cond-item-style">
				<!-- <uni-section class="mb-10" title="日期选择:"> -->
				<view>日期：</view>
				<view style="width: 240px;padding:0 10px;"><uni-datetime-picker v-model="selectCondition.dateRangeArray"
						type="daterange" @change="getOrderListByCondition()" /></view>

				<!-- </uni-section> -->
			</view>

			<view style="display: flex;" class="cond-item-style" v-if="0">
				<!-- <uni-section class="mb-10" title="用户名:"> -->
				<view>用户名：</view>
				<view style="width: 130px;padding:0 10px;">
					<uni-easyinput class="uni-mt-5" suffixIcon="search" v-model="selectCondition.userName"
						 @iconClick="getOrderListByCondition()"></uni-easyinput>
				</view>

				<!-- </uni-section> -->
			</view>
			<view style="padding:0 10px">

			</view>
		</view>
		<view style="height: 10px;"></view>
		<uni-table border stripe emptyText="暂无更多数据">
			<!-- 表头行 -->
			<uni-tr>
				
				<uni-th align="center">订单来源</uni-th>
				<uni-th align="center">入住日期</uni-th>
				<uni-th align="center">截止日期</uni-th>
				<uni-th align="center">姓名</uni-th>
				<uni-th align="center">房型</uni-th>
				<uni-th align="center">联系电话</uni-th>
				<uni-th align="center">创建人</uni-th>
				<uni-th align="center">天数</uni-th>
				<!-- <uni-th align="center">定餐</uni-th> -->
				<uni-th align="center">操作</uni-th>
			</uni-tr>
			<!-- 表格数据行 -->
			<uni-tr v-for="item of fitlerUserNameOrderList">
				
				<uni-td>{{item.orderSouce_Zn}}</uni-td>
				<uni-td>{{item.checkInStartDate}} <uni-tag size="mini" :circle="true" v-if="showNewTag(item.createTime)"
						style="margin-left: 5px;" text="New" type="success" /></uni-td>
				<uni-td>{{item.checkInEndDate}}</uni-td>
				<uni-td>{{item.userName}}</uni-td>
				<uni-td>
					<text v-for="it of item.roomTypeArray">【{{it.name}}】* <text
							:class="[it.count>1?'strongText':'']">{{it.count}}</text></text>
				</uni-td>

				<uni-td>{{item.phone}}</uni-td>
				<uni-td>{{item.createrPhone}}【{{ item.createrName }}】</uni-td>
				<uni-td>
					<text
						style="color: red;font-weight: bold;letter-spacing: 3px;">{{"" | dayNum([item.checkInStartDateTimeStamp,item.checkInEndDateTimeStamp])}}</text><text>晚</text></uni-td>
				<uni-td>

					<view class="uni-group" v-if="item.checkInEndDateTimeStamp > new Date().getTime()">
						<!-- <button class="uni-button" size="mini" type="primary">修改</button> -->
						<!-- <button  class="uni-button" size="mini" type="warn" @click="deleteOrder(item)">撤销</button> -->
						<!-- <u-icon name="trash-fill" color="#e64340" labelColor="#e64340" size="22" label="撤销"
						labelPos="bottom" labelSize="12px" @click="deleteOrder(item)"></u-icon> -->
						<text  class="edit-text-btn-style" @click="deleteOrder(item)">撤销</text>
					</view>
				</uni-td>
			</uni-tr>


		</uni-table>
	</view>

</template>

<script>
	import dataBase from '../../../api/dataBase.js';
	import DB from '../../../api/DB';
	import OrderService from '../../../services/OrderService.js';
	export default {
		data() {
			return {
				selectCondition: {
					dateRangeArray: [new Date().getTime(), new Date().getTime() + (1000 * 60 * 60 * 24 * 30)], //默认30天
					userName: ''
				},
				checkInOrderList: []
			}
		},
		computed: {
			hotel_id(){
				return this.$store.state.hotel_id;
			},
			roomTypeList(){
				return this.$store.state.roomTypeList;
			},
			permissionList(){
				return this.$store.state.permissionStore.permissionList;
			},
			fitlerUserNameOrderList() {
				
				return this.checkInOrderList.filter(item => {
					return item.userName.includes(this.selectCondition.userName)
				})
			}
		},
		watch:{
			hotel_id(newval,oldval){
				this.getOrderListByCondition();
			}
		},
		filters: {
			roomType_Zn(valArray) {
				// let newArray = valArray.map(item => {
				// 	let obj = roomTypeList.find(it => {
				// 		return it.value == item.value
				// 	});
				//	return `【${obj.name} X ${obj.count}】`;
				//})
				////return newArray.join('');
			},
			dayNum(val, params) {
				return Math.ceil((params[1] - params[0]) / (1000 * 60 * 60 * 24))
			}
		},
		async created() {
			 this.getOrderListByCondition();

		},
		activated() {
			console.log("tableList active....");
		},
		mounted() {
			this.testData(['t1', 't2'])
		},
		methods: {
			showNewTag(timeStamp) {
				return (new Date().getTime() - timeStamp) < 1000 * 60 * 60 * 2
			},
			async getOrderListByCondition() {
				 //uni.showLoading();
				 if(!this.hotel_id){
					return;
				 }
				 console.log(1111)
				 let date = this.selectCondition.dateRangeArray;
				try {
					const res = await OrderService.getOrderListByCondition(this.hotel_id,date[0],date[1]);
					console.log("res",res);
					this.checkInOrderList = res.data||[];			
				} catch (error) {
					console.error("获取订单列表失败",error);
				}
				uni.hideLoading();
			},
			async deleteOrder(item) {
				if(!this.permissionList.includes('ORDER_DELETE')){
					 this.$alert.alertNoPermisson();
					return;
				}			
				let order_id = item._id;
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
				try {
				const res = await OrderService.deleteOrder(order_id);					
				this.getOrderListByCondition();
				} catch (error) {
					console.error("系统异常，删除订单失败")
				}
			
				
			},
			testData(valArray) {
				let item = this.checkInOrderList[0]
				for (let i = 3; i < 100; i++) {
					//	this.checkInOrderList.push(item)
				}

			}
		}
	}
</script>

<style lang="scss">
	.uni-group {
		display: flex;
		align-items: center;
		justify-content: space-around;
	}

	.uni-button {
		white-space: nowrap;
	}

	.strongText {
		color: red;
		font-weight: bold;
	}

	.cond-c {
		box-sizing: border-box;
		display: flex;
		flex-wrap: wrap;
		padding: 0 20px;
	}

	.cond-item-style {
		display: flex;
		justify-content: center;
		align-items: center;
		padding-right: 20px;
	}
</style>