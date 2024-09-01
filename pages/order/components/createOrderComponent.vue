<template>
	<view>		
		<uni-forms ref="baseForm" :modelValue="orderForm">
			<uni-forms-item label="来源" >
				<uni-data-checkbox v-model="orderForm.orderSource" :mode="modeSource" :multiple="false" :localdata="sourceFormat" />
			</uni-forms-item>
			<uni-forms-item label="日期时间">
				<uni-datetime-picker v-model="orderForm.dateRangeArray" type="daterange" />
			</uni-forms-item>
			<uni-forms-item label="房型" required>
				<uni-data-checkbox v-model="orderForm.roomTypeArray" mode="list"  multiple :localdata="roomTypeListFormat" />
			</uni-forms-item>
			<uni-forms-item label="用户名" >
				<uni-easyinput v-model="orderForm.name" placeholder="请输入用户名" />
			</uni-forms-item>
			<uni-forms-item label="手机号" >
				<uni-easyinput v-model="orderForm.phone" placeholder="请输入手机号" />
			</uni-forms-item>
			<uni-forms-item label="微信号" >
				<uni-easyinput v-model="orderForm.wxName" placeholder="请输入微信号" />
			</uni-forms-item>
			<uni-forms-item>
				<u-button type="success" text="保存" @click="submit"></u-button>
			</uni-forms-item>
		</uni-forms>
	</view>
</template>

<script>
	export default {
		data() {
			return {
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
				}, {
					name: 'downline',
					name_Zn: '线下',
					value: 10
				}],
				roomTypeList: [{
					name: 't1',
					name_Zn: "大床房",
					count:5
				}, {
					name: 't2',
					name_Zn: "商务大床房",
					count:2
				}, {
					name: 't3',
					name_Zn: "标间",
					count:4
				}, {
					name: 't4',
					name_Zn: "商务标间",
					count:3
				}],
				orderForm: {
					//createTime: 1725090732098,
					roomTypeArray: ["t1", "t2"],
					dateRangeArray: [],
					userName: "张三",
					// checkInStartDateTimeStamp: 1724824800000,
					// checkInEndDateTimeStamp: 1724904000000,
					// checkInStartDate: "2024-08-28 14:00:00",
					// checkInEndDate: "2024-08-29 12:00:00",
					phone: "13900991112",
					orderSource: 0,
					wxName:'',
					//orderSouce_Zn: "携程",
					//orderStatus: 0,
				},
			};
		},
		computed: {
			sourceFormat(){
				return this.source.map(item=>{
					return {text:item.name_Zn,value:item.value};
					
				});
			},
			roomTypeListFormat(){
				return this.roomTypeList.map(item=>{
					return {text:item.name_Zn,value:item.name};
				})
			}
		},
		method: {
			getValidOrder() {

			},
			submit() {},
		},
	};
</script>

<style></style>