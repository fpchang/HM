<template>
	<view style="display: flex;">
		<view class="left-table-style">
			<view class="th-style"><text>房间号</text></view>
			<view class="td-style" v-for="item in roomType">
				<text>
					{{item.name}}
				</text>
			</view>
		</view>
		<view class="checkInTable-style" style="flex: 1;">
			<scroll-view class="checkIntable-content-scroll" :scroll-y="false" :scroll-x="true">
				<view class="checkIntable-content">
					<view class="checkIntable-h-list">
						<view class=" th-style checkIntable-h-list-h" style="background-color: #f4f4f4;"
							v-for="item in orderDateRangeFormat">
							<view style="display: flex;flex-direction: column;">
								<text>{{item.de}}</text>
								<text>{{item.dy}}</text>
							</view>

						</view>
					</view>
					<view class="checkIntable-h-list" v-for="it in checkInOrderListFormat">
						 <view class="checkIntable-h-list-h td-style"
							v-for="i in it" @click="showDetail(i)">
								<view v-for="is in i.orderList" class="tx-content">
									<text  class="tx">{{is.userName?is.userName:''}}</text>
								</view>
								<view v-if="i.orderList.length>4"> 
									<text class="tx">...</text>
								</view> 
							<uni-badge  :text="i.count" style="position: absolute; top:2px;right:2px"/>							
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
import OrderService from '../../../services/OrderService';
	export
	default {
		props: {},
		data() {
			return {
			}

		},
	 created() {
		this.getOrderList();
		},
		activated() {
				
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
			checkInOrderList(){
				return this.$store.state.orderStore.orderListTodayAfter ||[];
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
				if(this.checkInOrderList.length<1 ||this.roomType.length<1){
					return [];
				}
				let result = [];
				let or = this.orderDateRange;
				let checkInOrderList = this.checkInOrderList;
				for (let i = 0; i < this.roomType.length; i++) {


					let roomType_id = this.roomType[i]._id;
					result.push(fillRoomType(roomType_id));
				}
		
				function fillRoomType(roomType_id) {
					let fillArray = [];
					//let fillObj ={orderList:[],count:0}
					for (let j = 0; j < or.length; j++) {
						let countT= 0;
						let objArray = checkInOrderList.filter(item => {
								let o = item.roomTypeArray.find(is=>is.roomType_id==roomType_id);
								let flag = o && (or[j] >= item.checkInStartDateTimeStamp &&
								or[j] < item.checkInEndDateTimeStamp);
								if(flag){
									countT+=o.count;
								}
							return flag;
						})
						let obt= {orderList:objArray,count:countT}
						fillArray.push(obt);
						//fillObj.orderList.push(objArray || []);
						
					}
					//fillObj.orderList=fillArray;
					return fillArray;
				}
			
				return result;
			}


		},
		watch:{
			hotel_id(newval,oldval){
				this.$store.dispatch("getOrderListTodayAfter",this.hotel_id);
			}
		},
		methods: {
			showDetail(arr){
			
			},
			async getOrderList() {
				//uni.showLoading();
				try {
					//const res  =await OrderService.getOrderListTodayAfter(this.hotel_id);	
               		//this.$orderStore.commit("updateOrderListTodayAfter", res.data);

					await  this.$store.dispatch("getOrderListTodayAfter",this.hotel_id);
				} catch (error) {
					
				}
				uni.hideLoading();
			},
			numRoom(arr=[]){
			
				if(!arr.length){
					return 0
				}
				
				return 33
			}
		}
	}
</script>

<style lang="scss">
	/* pages/management/checkIn/checkIn.wxss */
	.checkIntable-content-scroll{
		width: calc(100vw - 100px);
		height: 100%;
	}
	.checkIntable-content {
		width: fit-content;
		font-size: $uni-font-size-lg;
	}

	.left-table-style {
		width: 100px;
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
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 80px;
		text-align: center;
		font-size: $uni-font-size-base;
		position: relative;
		box-sizing: border-box;
		border:1px solid #b3b3b338;
		border-left-width: 0;
		border-top-width: 0;
	}

	.isContinueCheckIn {
		font-weight: bold;
		
	}

	.left-table-style .td-style {
		font-weight: 500;

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
		/**&:nth-child(even){
			background-color: #f0efef
		};*/
		.tx-content{
			&:nth-child(n+4){
				display: none;
			};
			.tx{
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				padding:0 4px;
				
			}
		}
		
	}
</style>