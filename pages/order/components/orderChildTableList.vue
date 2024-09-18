<template>
	<view class="h5-show-style">
		<view class="cond-c">

			<view style="display: flex;" class="cond-item-style">
				<!-- <uni-section class="mb-10" title="日期选择:"> -->
				<view>日期选择：</view>
				<view style="width: 240px;padding:0 10px;"><uni-datetime-picker v-model="selectCondition.dateRangeArray"
						type="daterange" @change="getOrderListByCondition()" /></view>

				<!-- </uni-section> -->
			</view>

			<view style="display: flex;" class="cond-item-style">
				<!-- <uni-section class="mb-10" title="用户名:"> -->
				<view>用户名：</view>
				<view style="width: 130px;padding:0 10px;">
					<uni-easyinput class="uni-mt-5" suffixIcon="search" v-model="selectCondition.userName"
						placeholder="" @iconClick="getOrderListByCondition()"></uni-easyinput>
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
				<uni-th align="center">入住日期</uni-th>
				<uni-th align="center">截止日期</uni-th>
				<uni-th align="center">姓名</uni-th>
				<uni-th align="center">房型</uni-th>
				<uni-th align="center">天数</uni-th>
				<!-- <uni-th align="center">定餐</uni-th> -->
				<uni-th align="center">操作</uni-th>
			</uni-tr>
			<!-- 表格数据行 -->
			<uni-tr v-for="item of fitlerUserNameOrderList">
				<uni-td>{{item.checkInStartDate}} <uni-tag size="mini" :circle="true" v-if="showNewTag(item.createTime)"
						style="margin-left: 5px;" text="New" type="success" /></uni-td>
				<uni-td>{{item.checkInEndDate}}</uni-td>
				<uni-td>{{item.userName}}</uni-td>
				<uni-td>
					<text v-for="it of item.roomTypeArray">【{{it.name}}】* <text
							:class="[it.count>1?'strongText':'']">{{it.count}}</text></text>
				</uni-td>

				<uni-td>
					<text
						style="color: red;font-weight: bold;letter-spacing: 3px;">{{"" | dayNum([item.checkInStartDateTimeStamp,item.checkInEndDateTimeStamp])}}</text><text>晚</text></uni-td>
				<!-- <uni-td align="center"><u-icon name="more-dot-fill" label="566元" labelPos="top" labelColor="red"
						color="blue"></u-icon>
				</uni-td> -->
				<uni-td>

					<view class="uni-group">
						<button class="uni-button" size="mini" type="primary">修改</button>
						<button class="uni-button" size="mini" type="warn" @click="deleteOrder(item)">撤销</button>
					</view>
				</uni-td>
			</uni-tr>


		</uni-table>
	</view>

</template>

<script>
	import dataBase from '../../../api/dataBase.js';
	import DB from '../../../api/DB';
	export default {
		data() {
			return {
				selectCondition: {
					dateRangeArray: [new Date().getTime(), new Date().getTime() + (1000 * 60 * 60 * 24 * 30)], //默认30天
					userName: ''
				},

				roomTypeList: dataBase.roomTypeList,
				checkInOrderList: []
				// checkInOrderList: [{
				// 		createTime: 1725090732098,
				// 		roomTypeArray: [{
				// 			value: 't1',
				// 			name: "大床房",
				// 			count: 1
				// 		}, {
				// 			value: 't2',
				// 			name: "商务大床房",
				// 			count: 2
				// 		}],
				// 		userName: "张三",
				// 		checkInStartDateTimeStamp: 1724824800000,
				// 		checkInEndDateTimeStamp: 1724904000000,
				// 		checkInStartDate: "2024-08-28 14:00:00",
				// 		checkInEndDate: "2024-08-29 12:00:00",
				// 		phone: "13900991112",
				// 		orderSource: 0,
				// 		orderSouce_Zn: "携程",
				// 		orderStatus: 0
				// 	},
				// 	{
				// 		createTime: 111,
				// 		roomTypeArray: [{
				// 			value: 't1',
				// 			name: "大床房",
				// 			count: 1
				// 		}, {
				// 			value: 't4',
				// 			name: "商务标间",
				// 			count: 1
				// 		}],
				// 		userName: "张234",
				// 		checkInStartDateTimeStamp: 1725256800000,
				// 		checkInEndDateTimeStamp: 1725508800000,
				// 		checkInStartDate: "2024-09-02 14:00:00",
				// 		checkInEndDate: "2024-09-05 12:00:00",
				// 		phone: "13900991112",
				// 		orderSource: 0,
				// 		orderSouce_Zn: "携程",
				// 		orderStatus: 0
				// 	},
				// 	{
				// 		createTime: 111,
				// 		roomTypeArray: [{
				// 			value: 't1',
				// 			name: "大床房",
				// 			count: 1
				// 		}, {
				// 			value: 't4',
				// 			name: "商务标间",
				// 			count: 1
				// 		}],
				// 		userName: "李4",
				// 		checkInStartDateTimeStamp: 1726034400000,
				// 		checkInEndDateTimeStamp: 1726113600000,
				// 		checkInStartDate: "2024-09-11 14:00:00",
				// 		checkInEndDate: "2024-09-12 12:00:00",
				// 		phone: "13900991112",
				// 		orderSource: 0,
				// 		orderSouce_Zn: "携程",
				// 		orderStatus: 0
				// 	},


				// ]

			}
		},
		computed: {
			hotel_id(){
				return this.$store.state.hotel_id;
			},
			fitlerUserNameOrderList() {
				return this.checkInOrderList.filter(item => {
					return item.userName.includes(this.selectCondition.userName)
				})
			}
		},
		watch:{
			hotel_id(newval,oldval){
				console.warn("XXXXXXX",newval,oldval);
				this.getOrderListByCondition();
			}
		},
		filters: {
			roomType_Zn(valArray) {
				console.log(12222, valArray)
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

			console.log("tableList start");
			await this.getOrderListByCondition();

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
			getOrderListByCondition() {
				uni.showLoading();
				let date = this.selectCondition.dateRangeArray;
				let startTime = new Date(new Date(date[0]).Format("yyyy/MM/dd 14:00:00")).getTime();
				let endTime = new Date(new Date(date[1]).Format("yyyy/MM/dd 12:00:00")).getTime();
				let jql =
					`hotel_id=='${this.hotel_id}'&&orderStatus!=10&&(checkInStartDateTimeStamp>=${startTime} ||` +
					`(${endTime}<checkInEndDateTimeStamp && ${endTime}>checkInStartDateTimeStamp))`;
				return DB.getCollection("hm-order", jql).then(res => {
					console.log("344", res)
					this.checkInOrderList = res.data;
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
				this.getOrderListByCondition();
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