<template>
	<view>
		<uni-forms ref="baseForm" :modelValue="orderForm">
			<uni-forms-item label="来源">
				<uni-data-checkbox v-model="orderForm.orderSource" mode="default" :multiple="false"
					:localdata="sourceFormat" />
			</uni-forms-item>
			<uni-forms-item label="日期时间">
				
				<uni-datetime-picker v-model="orderForm.dateRangeArray" :start="new Date().getTime()" type="daterange" @change="initValidRoomTypeData" :clear-icon="false" />
			 
			
			</uni-forms-item>
			<uni-forms-item label="房型" required>
				<!-- <uni-data-checkbox v-model="orderForm.roomTypeArray" mode="list"  multiple :localdata="roomTypeListFormat">1111</uni-data-checkbox> -->
				<view class="uni-list">
					<checkbox-group @change="roomTypeCheckboxChange">
						<view class="disabled-style" style="display: flex;" v-for="item in remainRoomTypeList"
							:key="item.value">
							<view>
								<checkbox :value="item.value" emptyText="请先选择日期" :checked="item.checked" :disabled="noSelectDate" />
							</view>
							<view style="display: flex;flex:1">{{item.name}}</view>
							<view><uni-number-box v-model="item.selectCount" :max="item.remainCount"
									:disabled="(!item.checked||noSelectDate)" @change="numChange()" /></view>
						</view>
					</checkbox-group>
				</view>

			</uni-forms-item>
			<uni-forms-item label="客户名" required>
				<uni-easyinput v-model="orderForm.userName" placeholder="请输入用户名" />
			</uni-forms-item>
			<uni-forms-item label="手机号">
				<uni-easyinput v-model="orderForm.phone"  type="number" placeholder="请输入手机号" />
			</uni-forms-item>
			<uni-forms-item label="微信号">
				<uni-easyinput v-model="orderForm.wxNickName" placeholder="请输入微信号或昵称" />
			</uni-forms-item>
			<uni-forms-item label="备注">
				<uni-easyinput type="textarea" v-model="orderForm.mark" placeholder="备注内容"></uni-easyinput>
				
			</uni-forms-item>
			<uni-forms-item>
				<u-button type="success" text="保存" color="#007aff" @click="submitForm()" :disabled="submitDisabled"
					:loading="submitLoading"></u-button>
			</uni-forms-item>
		</uni-forms>
	</view>
</template>

<script>
	import DB from "../../../api/DB";
	export default {
		data() {
			return {
				submitLoading: false,
				modeSource: getApp().globalData.systemInfo.deviceType == "phone" ? 'list' : 'default',
				source: [{
					name: 'xiechen',
					name_Zn: '携程',
					value: 1
				}, {
					name: 'meituan',
					name_Zn: '美团',
					value: 2
				}, {
					name: 'meituanminsu',
					name_Zn: '美团民宿',
					value: 3
				}, {
					name: 'meituanminsu',
					name_Zn: '途牛',
					value: 4
				}, {
					name: 'meituanminsu',
					name_Zn: '途家',
					value: 5
				}, {
					name: 'meituanminsu',
					name_Zn: '客栈',
					value: 6
				}, {
					name: 'downline',
					name_Zn: '线下',
					value: 0
				}],
				roomTypeList: [{
					value: 't1',
					name: "大床房",
					count: 5
				}, {
					value: 't2',
					name: "商务大床房",
					count: 2
				}, {
					value: 't3',
					name: "标间",
					count: 4
				}, {
					value: 't4',
					name: "商务标间",
					count: 3
				}],
				remainRoomTypeList:[],
				orderForm: {
					orderSource: 0,
					
					dateRangeArray: [],
					userName: "",
					// checkInStartDateTimeStamp: 1724824800000,
					// checkInEndDateTimeStamp: 1724904000000,
					// checkInStartDate: "2024-08-28 14:00:00",
					// checkInEndDate: "2024-08-29 12:00:00",
					phone: "",
					mark:"",
					wxNickName: '',
					//orderSouce_Zn: "携程",
					//orderStatus: 0,
				},
			};
		},
		created() {
			
		},
		computed: {
			noSelectDate() {
				//return false;
				return  this.orderForm.dateRangeArray.length < 1;
			},
			sourceFormat() {
				return this.source.map(item => {
					return {
						text: item.name_Zn,
						value: item.value
					};

				});
			},
			dateRangeArrayFormat(){
				let startTime = new Date(new Date(this.orderForm.dateRangeArray[0]).Format("yyyy/MM/dd") + " 14:00:00").getTime();
				let endTime = new Date(new Date(this.orderForm.dateRangeArray[1]).Format("yyyy/MM/dd") + " 12:00:00").getTime();
				return [startTime,endTime]
			},
			
			roomTypeArray(){
				let list = this.remainRoomTypeList.filter(item=>{
					return item['checked'];
				});
				return list.map(item=>{
					return {value:item.value,count:item.selectCount,name:item.name}
				})
				
			},
			submitDisabled() {
				let condition = (this.orderForm.dateRangeArray.length < 1 ||
					this.roomTypeArray.length < 1 ||
					(this.orderForm.userName == "" && this.orderForm.phone == "")
				);
				return condition;
			}
		},
		methods: {
			
			//初始化可用的房型
			initValidRoomTypeData(){
				uni.showLoading();
				let startTime = this.dateRangeArrayFormat[0],endTime =this.dateRangeArrayFormat[1];			
				let hotel_id=getApp().globalData.hotel_id;
				uniCloud.callFunction({
					name:'hm_getRemainderRoomType',
					data:{
						hotel_id,
						startTime,
						endTime
					}
				}).then(res=>{
					console.log("前端数据",res)
					this.remainRoomTypeList = res.result;
					uni.hideLoading();
				})
				
			},
		
			//复选框事件
			roomTypeCheckboxChange(e) {
				let valArray = e.detail.value;				
				this.remainRoomTypeList=this.remainRoomTypeList.map(item=>{
					item.checked = valArray.includes(item.value);
					return item;
				})
				
			},
			numChange() {
				
			},
			
			getValidOrder() {

			},
			submitForm() {
				uni.showLoading();
				this.submitLoading=true;
				let dateRange = this.dateRangeArrayFormat;
				let sourceObj = this.source.find(item=>item.value==this.orderForm.orderSource);
				let obj = {
					hotel_id:getApp().globalData.hotel_id,
					createTime: new Date().getTime(),
					roomTypeArray: this.roomTypeArray,
					userName: this.orderForm.userName,
					checkInStartDateTimeStamp: dateRange[0],
					checkInEndDateTimeStamp: dateRange[1],
					checkInStartDate: new Date(dateRange[0]).Format("yyyy/MM/dd HH:mm:ss"),
					checkInEndDate: new Date(dateRange[1]).Format("yyyy/MM/dd HH:mm:ss"),
					phone: this.orderForm.phone,
					orderSource: Number(this.orderForm.orderSource) ,
					wxNickName: this.orderForm.wxNickName,
					orderSouce_Zn:sourceObj.name_Zn ,
					orderStatus: 0,
				}
				
				console.log(obj,this.roomTypeArray);
				DB.insertData("hm-order",obj).then(res=>{					
					uni.hideLoading();
					this.submitLoading=false;
					this.$emit('closePopup');
					
				})
				
			}
		},
	};
</script>

<style lang="scss">
	.uni-list-cell {
		justify-content: flex-start
	}

	.disabled-style {
		color: #bbb;
	}
</style>