<template>

	<view class="order-component">
		<!-- <uni-fab ref="fab" :popMenu="false" :pattern="pattern" horizontal="right" vertical="top" @createOrderEvent="createOrderEvent" /> -->
		<view class="tbs-style">
			<view class="uni-padding-wrap uni-common-mt" style="flex:1;">
				<view style="max-width:450px;padding:0 20px">
					<uni-data-checkbox v-model="tabRadioVal" :localdata="tabitems"></uni-data-checkbox>
					<!-- <uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" /> -->
				</view>

			</view>
			<view class="tbs-c-btn"><button class="uni-button" size="mini" type="primary"
					@click="createOrderEvent">创建订单</button></view>
		</view>

		<view style="height: 15px;"></view>
		<view class="content">
			<!-- <keep-alive> -->
			<view v-if="tabRadioVal===0">

				<orderChildCalendarList :disHeightVal="disHeightVal" ref="orderChildCalendarListRef">
				</orderChildCalendarList>
			</view>
			<!-- </keep-alive> -->

			<view v-if="tabRadioVal===1">
				<orderChildList ref="orderChildListRef"></orderChildList>

			</view>
			<!-- <keep-alive> -->
			<view v-if="tabRadioVal===2">
				<orderChildTableList ref="orderChildTableListRef"></orderChildTableList>
			</view>
			<!-- </keep-alive> -->


		</view>
		<uni-popup ref="popup" background-color="transprant">
			<view class="popup-content">
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
	import CreateOrder from '../createOrder/createOrder'
import orderChildCalendarList from './orderChildCalendarList2';
	import orderChildTableList from './orderChildTableList';
	import createOrderComponent from './createOrderComponent';
	import orderChildList from './orderChildList.vue';
	import dataBase from '../../../api/dataBase.js';
	export default {
		components: {
    CreateOrder,
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
				tabRadioVal:this.$store.state.isPcShow?2:0,
				tabitems: [{
					value:0,
					text:'日历'
				}, {
					value:1,
					text:'列表'
				},{
					value:2,
					text:'表格'
				}],
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
				}
				//roomTypeList: dataBase.roomTypeList,

			}
		},
		computed: {
			hotel_id(){
				return this.$store.state.hotel_id;
			},
			roomTypeList() {
				return this.$store.state.roomTypeList;
			}
		},
		watch:{
			hotel_id(){
				this.$store.commit("getOrderListTodayAfter");

		}},
		created() {
			console.log('orderComponent create');
			this.$store.commit("getOrderListTodayAfter");

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
				console.log(e)
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex
				}
			},
			createOrderEvent() {
				if (!this.$store.state.isPcShow) {
					uni.navigateTo({
						url: '/pages/order/createOrder/createOrder'
					})
					return;
				}
				this.$refs.popup.open();

			},
			closePopup() {
				try {
					this.$refs.popup.close();
					this.$refs.orderChildTableListRef.getOrderListByCondition();
					this.$refs.orderChildCalendarList.getOrderList();
					this.$refs.orderChildListRef.getOrderList();
				} catch (e) {
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

.tbs-style {
	display: flex;
	align-items: center;

	.tbs-c-btn {
		width: 92px;
		display: flex;
		align-items: center;
	}
}
</style>