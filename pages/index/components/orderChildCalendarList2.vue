<template>
	<view style="display: flex;">
		<view class="left-table-style">
			<view class="th-style"><text>房间号</text></view>
			<view class="td-style" v-for="item in roomTypeList">
				<text>
					{{item.name_Zn}}
				</text>
			</view>
		</view>
		<view class="checkInTable-style" style="flex: 1;">
			<view class="checkIntable-content">
				<view>
					<view class="checkIntable-h-list">
						<view class=" th-style checkIntable-h-list-h" style="background-color: #eee;"
							v-for="item in orderDateRangeFormat">
							<view style="display: flex;flex-direction: column;">
								<text>{{item.de}}</text>
								<text>{{item.dy}}</text>
							</view>

						</view>
					</view>
					<view class="checkIntable-h-list" v-for="it in checkInOrderListFormat">
						<view :class="['checkIntable-h-list-h','td-style',1?'isContinueCheckIn':'']"
							v-for="i in it" @click="showDetail">{{i.userName?i.userName:''}}
						</view>
					</view>

				</view>
			</view>
			<view class="checkIntable-h-head" style="flex-direction: column;">

			</view>
		</view>
	</view>
</template>

<script>
	export
	default {
		props: {},
		data() {
			return {
				roomIdList: ["t1", "t2", "t3", "t4", "t5"],
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
							roomTypeArray: ["t1", "t2","t3", "t4"],
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
		mounted() {
			console.log(122222, this.testdate())
		},
		computed: {
			dateTabList() {
				let curDateTimeStamp = new Date().getTime();
				let dateList = [];
				for (let i = 0; i < 100; i++) {
					dateList.push(curDateTimeStamp + i * 1000 * 60 * 60 * 24)
				}
				return dateList
			},

			orderDateRange() {
				let rangeDate = [];
				let minTime = Math.min(...this.checkInOrderList.map(item => item.checkInStartDateTimeStamp));
				let maxTime = Math.max(...this.checkInOrderList.map(item => item.checkInEndDateTimeStamp));
				console.log("222", minTime, maxTime)
				for (let i = minTime; i <= maxTime; i = (i + 1000 * 60 * 60 * 24)) {
					rangeDate.push(i);
				}
				return rangeDate;
			},
			orderDateRangeFormat() {

				let dyStr = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
				return this.orderDateRange.map((item) => {
					return {
						de: new Date(item).Format("MM-dd"),
						dy: dyStr[new Date(item).getDay()]
					}
				})
			},
			checkInOrderListFormat() {
				let result = [];
				let or = this.orderDateRange;
				let checkInOrderList = this.checkInOrderList;
				for (let i = 0; i < this.roomTypeList.length; i++) {


					let roomType = this.roomTypeList[i].name;
					result.push(fillRoomType(roomType));
				}

				function fillRoomType(t) {
					let fillArray = [];
					for (let j = 0; j < or.length; j++) {
						let obj = checkInOrderList.find(item => {
							return item.roomTypeArray.includes(t) && (or[j] >= item.checkInStartDateTimeStamp &&
								or[j] < item.checkInEndDateTimeStamp)
						})
						fillArray.push(obj || []);
					}
					return fillArray;
				}
				return result;
			}


		},
		methods: {
			testdate() {
				let result = [];
				let or = this.orderDateRange;
				let checkInOrderList = this.checkInOrderList;
				for (let i = 0; i < this.roomTypeList.length; i++) {


					let roomType = this.roomTypeList[i].name;
					result.push(fillRoomType(roomType));
				}

				function fillRoomType(t) {
					let fillArray = [];
					for (let j = 0; j < or.length; j++) {
						let obj = checkInOrderList.find(item => {
							return item.roomTypeArray.includes(t) && (or[j] >= item.checkInStartDateTimeStamp &&
								or[j] < item.checkInEndDateTimeStamp)
						})
						fillArray.push(obj || []);
					}
					return fillArray;
				}
				return result;
			}
		}
	}
</script>

<style lang="scss">
	/* pages/management/checkIn/checkIn.wxss */
	.checkIntable-content {
		display: flex;
		width: calc(100vw - 120px);
		overflow-x: scroll;
		flex-direction: row;
		font-size: $uni-font-size-lg;
	}

	.left-table-style {
		width: 120px;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		border-right: 1px solid #eee;
	}

	.th-style {
		height: 75px;
		text-align: center;
		font-weight: bold;
		display: flex;
		align-items: center;
		font-size: $uni-font-size-base;
		justify-content: center;
		letter-spacing: 2px;
	}

	.td-style {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 80px;
		text-align: center;
		font-size: $uni-font-size-base;
		margin-bottom: 10px;
	}

	.isContinueCheckIn {
		background-color: rgba(238, 187, 187, 0.5);
	}

	.left-table-style .td-style {
		font-weight: bold;

	}

	.checkIntable-h-list {
		display: flex;
		flex-flow: row;
		white-space: nowrap;

	}

	.checkIntable-h-list .checkIntable-h-list-h {
		width: 80px;
		overflow: hidden;
		vertical-align: center;
		justify-content: center;
		text-align: center;
		text-overflow: ellipsis;
		white-space: nowrap;

	}
</style>