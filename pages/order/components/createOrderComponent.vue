<template>
	<view>		
		<uni-forms ref="baseForm" :modelValue="orderForm">
			<uni-forms-item label="来源" >
				<uni-data-checkbox v-model="orderForm.orderSource" mode="default" :multiple="false" :localdata="sourceFormat" />
			</uni-forms-item>
			<uni-forms-item label="日期时间">
				<uni-datetime-picker v-model="orderForm.dateRangeArray" type="daterange" />
			</uni-forms-item>
			<uni-forms-item label="房型" required>
				<!-- <uni-data-checkbox v-model="orderForm.roomTypeArray" mode="list"  multiple :localdata="roomTypeListFormat">1111</uni-data-checkbox> -->
			<view class="uni-list">
						<checkbox-group @change="checkboxChange">
							<view class="" style="display: flex;" v-for="item in roomTypeList" :key="item.value">
								<view>
									<checkbox :value="item.value" :checked="item.checked" />
								</view>
								<view style="display: flex;flex:1">{{item.name}}</view>
								<view><uni-number-box /></view>
							</view>
						</checkbox-group>
					</view>
			
			</uni-forms-item>
			<uni-forms-item label="客户名"   required>
				<uni-easyinput v-model="orderForm.userName" placeholder="请输入用户名" />
			</uni-forms-item>
			<uni-forms-item label="手机号" >
				<uni-easyinput v-model="orderForm.phone"   placeholder="请输入手机号" />
			</uni-forms-item>
			<uni-forms-item label="微信号" >
				<uni-easyinput v-model="orderForm.wxNickName" placeholder="请输入微信号" />
			</uni-forms-item>
			<uni-forms-item>
				<u-button type="success" text="保存" @click="submitForm()" :disabled="submitDisabled" :loading="submitLoading"></u-button>
			</uni-forms-item>
		</uni-forms>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				submitLoading:false,
				modeSource:getApp().globalData.systemInfo.deviceType=="phone"?'list':'default',
				source: [{
					name: 'xiechen',
					name_Zn: '携程',
					value: 0
				}, {
					name: 'meituan',
					name_Zn: '美团',
					value: 1
				}, {
					name: 'meituanminsu',
					name_Zn: '美团民宿',
					value: 2
				},  {
					name: 'meituanminsu',
					name_Zn: '途牛',
					value: 3
				}, {
					name: 'meituanminsu',
					name_Zn: '途家',
					value: 4
				}, {
					name: 'meituanminsu',
					name_Zn: '客栈',
					value: 5
				},{
					name: 'downline',
					name_Zn: '线下',
					value: 10
				}],
				roomTypeList: [{
					value: 't1',
					name: "大床房",
					count:5
				}, {
					value: 't2',
					name: "商务大床房",
					count:2
				}, {
					value: 't3',
					name: "标间",
					count:4
				}, {
					value: 't4',
					name: "商务标间",
					count:3
				}],
				orderForm: {
					orderSource:0,
					roomTypeArray: ["t1"],
					dateRangeArray: [new Date().Format('yyyy-MM-dd'),new Date().Format('yyyy/MM/dd')],
					userName: "",
					// checkInStartDateTimeStamp: 1724824800000,
					// checkInEndDateTimeStamp: 1724904000000,
					// checkInStartDate: "2024-08-28 14:00:00",
					// checkInEndDate: "2024-08-29 12:00:00",
					phone: "",
					wxNickName:'',
					//orderSouce_Zn: "携程",
					//orderStatus: 0,
				},
			};
		},
		created() {
			this.orderForm.dateRangeArray= this.formatStartAndEndDateTimeToArray(new Date(),new Date().getTime()+(1000*60*60*24));
		},
		computed: {
			
			sourceFormat(){
				return this.source.map(item=>{
					return {text:item.name_Zn,value:item.value};
					
				});
			},
			roomTypeListFormat(){
				return this.roomTypeList.map(item=>{
					return {name:item.name_Zn,value:item.name,count:item.count};
				})
			},
			submitDisabled(){
				let condition = (this.orderForm.dateRangeArray.length<1 ||
				 this.orderForm.roomTypeArray.length<1 ||
				 (this.orderForm.userName==""&&this.orderForm.phone=="")
				 );
				return condition;
			}
		},
		methods: {
			formatStartAndEndDateTimeToArray(startDate,endDate){
				let startDateTime = new Date(new Date(startDate).Format('yyyy/MM/dd') +' 14:00:00').getTime();
				let endDateTime = new Date(new Date(endDate).Format('yyyy/MM/dd') +' 12:00:00').getTime();
				return [startDateTime,endDateTime]
				
			},
			getValidOrder() {

			},
			submitForm() {
				let dateRange = this.formatStartAndEndDateTimeToArray(this.orderForm.dateRangeArray[0],this.orderForm.dateRangeArray[1])
				let obj ={
				createTime: new Date().getTime(),
				roomTypeArray: this.orderForm.roomTypeArray,
				userName: this.orderForm.userName,
				checkInStartDateTimeStamp: dateRange[0],
				checkInEndDateTimeStamp: dateRange[1],
				checkInStartDate:new Date(dateRange[0]).Format("yyyy/MM/dd HH:mm:ss") ,
				checkInEndDate: new Date(dateRange[1]).Format("yyyy/MM/dd HH:mm:ss") ,
				phone: this.orderForm.phone,
				orderSource: 0,
				wxNickName:this.orderForm.wxNickName,
				orderSouce_Zn: this.orderForm.orderSource,
				orderStatus: 0,
				}
				console.log(obj);
				//this.submitLoading=true;
			}
		},
	};
</script>

<style lang="scss">
	.uni-list-cell {
		justify-content: flex-start
	}

</style>