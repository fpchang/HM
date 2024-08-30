<template>
	<view class="h5-show-style">
		<view  style="box-sizing: border-box;display: flex;flex-wrap: wrap;">
	
			<view style="width: 240px;padding:0 10px">
				<uni-section class="mb-10" title="日期选择:">
					<uni-datetime-picker v-model="selectCondition.dateRangeArray" type="daterange"
						@change="getOrderListByCondition()" />
				</uni-section>
			</view>

			<view style="width: 130px;padding:0 10px">
				<uni-section class="mb-10" title="用户名:">
					<uni-easyinput class="uni-mt-5" suffixIcon="search" v-model="value" placeholder="右侧图标" @iconClick="iconClick"></uni-easyinput>
				</uni-section>
			</view>
		</view>
		<uni-table border stripe emptyText="暂无更多数据">
			<!-- 表头行 -->
			<uni-tr>
				<uni-th align="center">入住日期</uni-th>
				<uni-th align="center">截止日期</uni-th>
				<uni-th align="center">姓名</uni-th>
				<uni-th align="center">房型</uni-th>
				<uni-th align="center">天数</uni-th>
				<uni-th align="center">定餐</uni-th>
				<uni-th align="center">操作</uni-th>
			</uni-tr>
			<!-- 表格数据行 -->
			<uni-tr v-for="item of checkInOrderList">
				<uni-td>{{item.checkInStartDate}}</uni-td>
				<uni-td>{{item.checkInEndDate}}</uni-td>
				<uni-td>{{item.userName}}</uni-td>
				<uni-td>{{item.roomTypeArray | roomType_Zn(roomTypeList)}}</uni-td>
	
				<uni-td>
					<text
						style="color: red;font-weight: bold;letter-spacing: 3px;">{{"" | dayNum([item.checkInStartDateTimeStamp,item.checkInEndDateTimeStamp])}}</text><text>晚</text></uni-td>
				<uni-td align="center"><u-icon name="more-dot-fill" label="566元" labelPos="top"
						labelColor="red" color="blue"></u-icon></uni-td>
				<uni-td>
	
					<view class="uni-group">
						<button class="uni-button" size="mini" type="primary">修改</button>
						<button class="uni-button" size="mini" type="warn">删除</button>
					</view>
				</uni-td>
			</uni-tr>
	
	
		</uni-table>
	</view>
	
</template>

<script>
	import dataBase from '../../../api/dataBase.js';
	export default {
		data(){
			return {
				selectCondition: {
					dateRangeArray: [new Date().getTime(), new Date().getTime() + (1000 * 60 * 60 * 24 * 30)], //默认30天
					userName: ''
				},
				
				roomTypeList:dataBase.roomTypeList,
				checkInOrderList: [{
						createTime: 111,
						roomTypeArray: ["t1", "t2"],
						userName: "张三",
						checkInStartDateTimeStamp: 1724824800000,
						checkInEndDateTimeStamp: 1724904000000,
						checkInStartDate: "2024-08-28 14:00:00",
						checkInEndDate: "2024-08-29 12:00:00",
						phone: "13900991112",
						orderSource: 0,
						orderSouce_Zn: "携程",
						orderStatus: 0
					},
					{
						createTime: 111,
						roomTypeArray: ["t1", "t2", "t3", "t4"],
						userName: "张234",
						checkInStartDateTimeStamp: 1725256800000,
						checkInEndDateTimeStamp: 1725508800000,
						checkInStartDate: "2024-09-02 14:00:00",
						checkInEndDate: "2024-09-05 12:00:00",
						phone: "13900991112",
						orderSource: 0,
						orderSouce_Zn: "携程",
						orderStatus: 0
					},
					{
						createTime: 111,
						roomTypeArray: ["t3", "t4"],
						userName: "李4",
						checkInStartDateTimeStamp: 1726034400000,
						checkInEndDateTimeStamp: 1726113600000,
						checkInStartDate: "2024-09-11 14:00:00",
						checkInEndDate: "2024-09-12 12:00:00",
						phone: "13900991112",
						orderSource: 0,
						orderSouce_Zn: "携程",
						orderStatus: 0
					},
				
				
				]
				
			}
		},
		filters: {
			roomType_Zn(valArray, roomTypeList) {
				let newArray = valArray.map(item => {
					let obj = roomTypeList.find(it => {
						return it.name == item
					});
					return `【${obj.name_Zn}】`;
				})
				return newArray.join(',');
			},
			dayNum(val, params) {
				return Math.ceil((params[1] - params[0]) / (1000 * 60 * 60 * 24))
			}
		},
		mounted() {
			this.testData(['t1', 't2'])
		},
		methods: {
			getOrderListByCondition() {
				this.$parent.getOrderList();
			},
			testData(valArray) {
				let item = this.checkInOrderList[0]
				for (let i = 3; i < 100; i++) {
					this.checkInOrderList.push(item)
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
</style>