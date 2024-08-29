<template>
	<view class="order-component">
		<view class="uni-padding-wrap uni-common-mt" style="max-width: 450px;padding:0 15px">
			<uni-segmented-control :current="current" :values="items" :style-type="styleType"
				:active-color="activeColor" @clickItem="onClickItem" />
		</view>
		<view class="content">
			<view v-if="current === 0">
				<orderChildCalendarList :disHeightVal="disHeightVal"></orderChildCalendarList>
			</view>
			<view v-if="current === 1">
				<view class="mobile-show-style" style="max-width: 450px;">
					<uni-collapse accordion v-model="accordionVal" @change="change">
						<uni-collapse-item title="手风琴效果">
							<view class="content">
								<text class="text">手风琴效果同时只会保留一个组件的打开状态，其余组件会自动关闭。</text>
							</view>
						</uni-collapse-item>
						<uni-collapse-item title="手风琴效果">
							<view class="content">
								<text class="text">手风琴效果同时只会保留一个组件的打开状态，其余组件会自动关闭。</text>
							</view>
						</uni-collapse-item>
						<uni-collapse-item title="手风琴效果">
							<view class="content">
								<text class="text">手风琴效果同时只会保留一个组件的打开状态，其余组件会自动关闭。</text>
							</view>
						</uni-collapse-item>
					</uni-collapse>
				</view>

			</view>
			<view v-if="current === 2">
				<view class="h5-show-style">
					<view style="display: flex;padding:20px;box-sizing: border-box;">
						
						<view style="width: 260px;">
							<uni-section class="mb-10" title="日期选择:">
								<uni-datetime-picker v-model="range" type="daterange" @maskClick="maskClick" />
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
							<uni-td align="center">查看</uni-td>
							<uni-td>
								
								<view class="uni-group">
									<button class="uni-button" size="mini" type="primary">修改</button>
									<button class="uni-button" size="mini" type="warn">删除</button>
								</view>
							</uni-td>
						</uni-tr>


					</uni-table>
				</view>

			</view>

		</view>

	</view>

</template>

<script>
	import orderChildCalendarList from './orderChildCalendarList2'
	export default {
		components: {
			orderChildCalendarList
		},
		props: ['disHeightVal'],
		data() {
			return {
				ss: 15868865907,
				current: 2,
				items: ['日历', '列表', '表格'],
				roomTypeList: [{
					name: 't1',
					name_Zn: "大床房"
				}, {
					name: 't2',
					name_Zn: "商务大床房"
				}, {
					name: 't3',
					name_Zn: "标间"
				}, {
					name: 't4',
					name_Zn: "商务标间"
				}],
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
		computed: {},
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
				console.log("dayNumber", params)
				return Math.ceil((params[1] - params[0]) / (1000 * 60 * 60 * 24))
			}
		},
		created() {
			console.log('orderComponent create');

		},
		onLoad: function() {
			console.log('orderComponent Show')
		},
		mounted() {
			this.testData(['t1', 't2'])
		},
		methods: {
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex
				}
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
	.order-component {
		box-sizing: border-box;
	}

	.uni-group {
		display: flex;
		align-items: center;
	}

	.uni-button {
		white-space: nowrap;
	}
</style>