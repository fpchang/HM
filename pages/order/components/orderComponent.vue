<template>
	
	<view class="order-component">
		<uni-fab ref="fab" :popMenu="false" :pattern="pattern" horizontal="right" vertical="top" @fabClick="fabClick" />
		<view class="uni-padding-wrap uni-common-mt" style="max-width: 450px;padding:0 15px">
			<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" />
		</view>
		<view style="height: 15px;"></view>
		<view class="content">
			<!-- <keep-alive> -->
				<view v-if="current === 0">
					
					<orderChildCalendarList :disHeightVal="disHeightVal" ref="orderChildCalendarListRef"></orderChildCalendarList>
				</view>
			<!-- </keep-alive> -->
			
			<view v-if="current === 1">
				<orderChildList ref="orderChildListRef"></orderChildList>

			</view>
			<!-- <keep-alive> -->
				<view v-if="current === 2">
					<orderChildTableList ref="orderChildTableListRef"></orderChildTableList>
				</view>
			<!-- </keep-alive> -->
			

		</view>
		<uni-popup ref="popup" background-color="transprant" >
			<view class="popup-content" >
				<view class="create-order-title-style">创建订单</view>
				<view class="comContent">
					<!-- <keep-alive> -->
						<createOrderComponent @closePopup="closePopup"></createOrderComponent>
					<!-- </keep-alive> -->
					
					</view>
				
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import orderChildCalendarList from './orderChildCalendarList2';
	import orderChildTableList from './orderChildTableList';
	import createOrderComponent from './createOrderComponent';
	import orderChildList from './orderChildList.vue';
	import dataBase from '../../../api/dataBase.js';
	export default {
		components: {
			createOrderComponent,
			orderChildCalendarList,
			orderChildTableList,
			orderChildList
		},
		props: ['disHeightVal'],
		data() {
			return {
				ss: 15868865907,
				current: 2,
				items: ['日历', '列表', '表格'],
				selectCondition: {
					dateRangeArray: [new Date().getTime(), new Date().getTime() + (1000 * 60 * 60 * 24 * 30)], //默认30天
					userName: ''
				},
				pattern: {
					color: '#7A7E83',
					backgroundColor: 'rgba(255,255,255,0)',
					selectedColor: '#007AFF',
					buttonColor: 'rgba(41, 121, 255,1)',
					iconColor: '#fff'
				},
				roomTypeList: dataBase.roomTypeList,

			}
		},
		computed: {},

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
			getOrderList() {
				console.log(this.selectCondition.dateRangeArray)

			},
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex
				}
			},
			fabClick() {
				if(getApp().globalData.systemInfo.deviceType=="phone"){
					uni.navigateTo({
						url:'/pages/order/createOrder/createOrder'
					})
					return;
				}
				this.$refs.popup.open();
				
			},
			 closePopup(){
				 try{
				 	this.$refs.popup.close();
				 	 this.$refs.orderChildTableListRef.getOrderListByCondition();
				 	 this.$refs.orderChildCalendarList.getOrderList();
					 this.$refs.orderChildListRef.getOrderList();
				 }catch(e){
				 	//TODO handle the exception
				 }
				
			},
			testData(valArray) {

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
	.popup-content{
		width: 500px;
		background-color: #fff;
		border-radius: 12px;
		max-height:calc(100vh - 130px) ;
		
		box-sizing: border-box;
		overflow-x: hidden;
		overflow-y: auto;
		.comContent{
			padding:20px 30px;
		}
		.create-order-title-style{
			height: 35px;
			line-height: 36px;
			padding-top: 20px;
			font-weight: bold;
			text-align: center;
		}
		
	}
</style>