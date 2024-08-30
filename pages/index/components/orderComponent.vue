<template>
	<view class="order-component">
		<view class="uni-padding-wrap uni-common-mt" style="max-width: 450px;padding:0 15px">
			<uni-segmented-control :current="current" :values="items" 
				 @clickItem="onClickItem" />
		</view>
		<view class="content">
			<view v-if="current === 0">
				<orderChildCalendarList :disHeightVal="disHeightVal"></orderChildCalendarList>
			</view>
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
			<view v-if="current === 2">
				<orderChildTableList></orderChildTableList>
			</view>

		</view>

	</view>

</template>

<script>
	import orderChildCalendarList from './orderChildCalendarList2';
	import orderChildTableList from './orderChildTableList';
	import dataBase from '../../../api/dataBase.js';
	export default {
		components: {
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

				roomTypeList:dataBase.roomTypeList,
				
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
</style>