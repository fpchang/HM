<template>
	<view style="display: flex;">
		<view class="left-table-style">
			<view class="th-style"><text>房间号</text></view>
			<view class="td-style" v-for="item in roomTypeList">
				<text>
					{{item.name}}
				</text>
			</view>
		</view>
		<view class="checkInTable-style" style="flex: 1;">
			<scroll-view class="checkIntable-content-scroll" :scroll-y="false" :scroll-x="true">
				<view class="checkIntable-content">
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
							v-for="i in it" @click="showDetail">
							<text class="tx">{{i.userName?i.userName:''}}</text>
						</view>
					</view>

				</view>
			</scroll-view>
			<view class="checkIntable-h-head" style="flex-direction: column;">

			</view>
		</view>
	</view>
</template>

<script>
	import DB from '../../../api/DB';
	export
	default {
		props: {},
		data() {
			return {
				
		
				//checkInOrderList:[]
		
			}

		},
		async created() {
				// console.log("calendarList start");
				// uni.showLoading();				
				// await this.getRoomTypeList();
				// await	this.getOrderList();
				// uni.hideLoading();
		},
		activated() {
				console.log("calendarList active....");
		},
		mounted() {
			
		},
		computed: {
			hotel_id(){
				return this.$store.state.hotel_id;
			},
			roomType(){
				return this.$store.state.roomType ||{};
			},
			roomTypeList(){
					return this.roomType.roomTypeList || [];
			},
			checkInOrderList(){
				return this.$store.state.orderListTodayAfter ||[];
			},
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
				if(this.checkInOrderList.length<1 ||this.roomTypeList.length<1){
					return [];
				}
				let result = [];
				let or = this.orderDateRange;
				let checkInOrderList = this.checkInOrderList;
				for (let i = 0; i < this.roomTypeList.length; i++) {


					let t = this.roomTypeList[i].value;
					result.push(fillRoomType(t));
				}

				function fillRoomType(t) {
					let fillArray = [];
					for (let j = 0; j < or.length; j++) {
						let obj = checkInOrderList.find(item => {
								let o = item.roomTypeArray.find(is=>is.value==t);
							return o && (or[j] >= item.checkInStartDateTimeStamp &&
								or[j] < item.checkInEndDateTimeStamp)
						})
						fillArray.push(obj || []);
					}
					return fillArray;
				}
				return result;
			}


		},
		watch:{
			hotel_id(newval,oldval){
				console.warn("切换酒店了")
				this.$store.commit("getOrderListTodayAfter");
			}
		},
		methods: {
			getRoomTypeList(){
				return uniCloud.callFunction({
					name:"hm_getRoomType",
					data:{hotel_id:this.hotel_id}
				}).then(res=>{
					
					console.log("酒店列表",res);
					//this.roomTypeList = res.result.data[0].roomType;
					if(res.result.data.length){
						this.$store.commit("updateRoomTypeList",res.result.data[0].roomTypeList);
					}
				})
			},
			getOrderList(){
				let startTime = new Date(new Date().Format("yyyy/MM/dd 14:00:00")).getTime();
				let endTime = new Date(new Date().Format("yyyy/MM/dd 12:00:00")).getTime();
				let jql =
					`hotel_id=='${this.hotel_id}'&&orderStatus!=10&&(checkInStartDateTimeStamp>=${startTime} ||` +
					`(${endTime}<checkInEndDateTimeStamp && ${endTime}>checkInStartDateTimeStamp))`;
				return DB.getCollection("hm-order",jql).then(res=>{
					console.log("获取的列表",res);
					this.$store.commit("updateOrderListTodayAfter",res.data);
					
				}).catch(error=>{
					console.log(error);
				})
			},
			testdate() {
				let result = [];
				let or = this.orderDateRange;
				let checkInOrderList = this.checkInOrderList;
				for (let i = 0; i < this.roomTypeList.length; i++) {


					let roomType = this.roomTypeList[i].value;
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
	.checkIntable-content-scroll{
		width: calc(100vw - 120px);
		height: 100%;
	}
	.checkIntable-content {
		width: fit-content;
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
		.tx{
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			padding:0 4px;
		}
	}
</style>