<template>
	<view style="display: flex;">
		<view></view>
		<view class="left-table-style">
			<view class="th-style">房间号</view>
			<view class="td-style" v-for="item in roomIdList">{{item}}</view>
		</view>
		<view class="checkInTable-style" style="flex: 1;">
			<view class="checkIntable-content">
				<view>
					<view class="checkIntable-h-list">
						<view class=" th-style checkIntable-h-list-h" style="line-height: 37px;background-color: #eee;"
							v-for="item in dateTabListFormat">
							<view>{{item.de}}</view>
							<view >{{item.dy}}</view>
						</view>
					</view>
<!-- 					<view class="checkIntable-h-list" v-for="it in roomIdList">
						<view :class="[checkIntable-h-list-h,td-style,it.isBalancePayment?'isContinueCheckIn':'']"
							v-for="i in getFormatTableList[item]" @click="showDetail">{{it.userName?it.userName:''}}
						</view>
					</view> -->

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
				roomIdList: ["201", "202", "203", "204", "301", "302", "303"],
				checkInOrderList: [{
						createTime: 111,
						romeId: "201",
						roomArray: ["201", "202"],
						userName: "张三",
						checkInStartDateTimeStamp: 1720108800000,
						checkInEndDateTimeStamp: 1720281600000,
						checkInStartDate: "2024-07-05",
						checkInEndDate: "2024-07-07",
						phone: "13900991112",
						orderSource: 1,
						orderSouce_Zn: "携程",
						orderStatus: 0
					},
					{
						createTime: 222,
						romeId: "202",
						roomArray: ["203", "204"],
						userName: "sbli",
						checkInStartDateTimeStamp: 1720368000000,
						checkInEndDateTimeStamp: 1720454400000,
						checkInStartDate: "2024-07-08",
						checkInEndDate: "2024-07-09",
						phone: "13900991112",
						orderSource: 1,
						orderSouce_Zn: "携程",
						orderStatus: 0
					}

				]
			}

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
			dateTabListFormat() {
				
				      let dyStr=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
				      return this.dateTabList.map((item) =>{
				        return {de:new Date(item).Format("MM-dd"),dy:dyStr[new Date(item).getDay()]}
				      } )
				    }
			
		}
	}
</script>

<style lang="scss">
	/* pages/management/checkIn/checkIn.wxss */
	.checkIntable-content {
		display: flex;
		width: 80vw;
		overflow-x: scroll;
		flex-direction: row;
		font-size: 16px;
	}

	.left-table-style {
		width: 20vw;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		border-right: 1px solid #eee;
	}

	.th-style {
		height: 75px;
		text-align: center;
		line-height: 75px;
		font-weight: bold;
	}

	.td-style {
		height: 80px;
		text-align: center;
		line-height: 80px;
		font-size: 18px;
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
		line-height: 35px;

	}

	.checkIntable-h-list .checkIntable-h-list-h {
		width: 20vw;
		overflow: hidden;
		vertical-align: center;
		justify-content: center;
		text-align: center;
		text-overflow: ellipsis;
		white-space: nowrap;

	}
</style>