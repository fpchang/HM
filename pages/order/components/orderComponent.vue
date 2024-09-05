<template>
	
	<view class="order-component">
		<uni-fab ref="fab" :popMenu="false" :pattern="pattern" horizontal="right" vertical="top" @fabClick="fabClick" />
		<view class="uni-padding-wrap uni-common-mt" style="max-width: 450px;padding:0 15px">
			<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" />
		</view>
		<view class="content">
			<keep-alive>
				<view v-if="current === 0">
					
					<orderChildCalendarList :disHeightVal="disHeightVal"></orderChildCalendarList>
				</view>
			</keep-alive>
			
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
			<keep-alive>
				<view v-if="current === 2">
					<orderChildTableList></orderChildTableList>
				</view>
			</keep-alive>
			

		</view>
		<uni-popup ref="popup" background-color="transprant" >
			<view class="popup-content" >
				<view class="create-order-title-style">创建订单</view>
				<view class="comContent">
					<keep-alive>
						<createOrder @closePopup="closePopup"></createOrder>
					</keep-alive>
					
					</view>
				
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import orderChildCalendarList from './orderChildCalendarList2';
	import orderChildTableList from './orderChildTableList';
	import createOrder from './createOrderComponent';
	import dataBase from '../../../api/dataBase.js';
	export default {
		components: {
			createOrder,
			orderChildCalendarList,
			orderChildTableList
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
				this.$refs.popup.close();
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