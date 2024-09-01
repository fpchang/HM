<template>
	<view>
		<view class="top-container">
			<view class="scroll-content">
				<view :style="{height:styleObj.navTopHeight}"></view>
				<view :class="['top-area',isSticky?'sticky-style':'']">
					<view class="title-area" :style="{opacity:opacityVal}">
						<view class="check-area" @click="showCheckHotel">
							<text class="$uni-font-size-lg">见山舍民宿</text>
							<u-icon name="arrow-down-fill" color="#000" size="20px" top="2"></u-icon>
						</view>
						<view class="add-area">
							<u-icon name="plus-circle" color="#000" size="20px" label="" top="2"></u-icon>
						</view>
					</view>
					<view class="navbar">
						<view class="nav-content">
							<u-tabs @click="clickTab" @change="checkTab" :list="tabList" lineWidth="0"
								lineColor="#f56c6c" :current="currentTab_index" :activeStyle="{
								    color: '#303133',
								    fontWeight: 'bold',
									fontSize:'18px',
								    transform: 'scale(1.15)'
								}" :inactiveStyle="{
								    color: '#606266',
									fontSize:'18px',
								    transform: 'scale(1)'
								}" itemStyle="padding-left: 15px; padding-right: 15px; height: 34px;">
							</u-tabs>
						</view>

					</view>

				</view>
			</view>
		</view>

		<swiper :style="{height:scrollHeight}" :current="currentTab_index" @change="swiperContentEvent">
			<swiper-item v-for="item in tabList">
				<scroll-view :scroll-y="true" show-scrollbar="false" :scroll-top="0" :style="{height:scrollHeight}">
					<view>
						<keep-alive>
							<gatherComponent :disHeightVal="disHeightVal" v-if="item.ComponentName=='gatherComponent'">
							</gatherComponent>
							<orderComponent :disHeightVal="disHeightVal" v-if="item.ComponentName=='orderComponent'">
							</orderComponent>

							<createComponent :disHeightVal="disHeightVal" v-if="item.ComponentName=='createComponent'">
							</createComponent>
						</keep-alive>

					</view>
				</scroll-view>
			</swiper-item>

		</swiper>

		<u-popup :show="showDrawer" mode="left" @close="closeDrawerEvent" @open="showDrawerEvent"
			:closeOnClickOverlay="true">
			<u-list style="margin-top: 60px;width: 40vw;">
				<u-list-item v-for="(item, index) in hotelList" :key="index">
					<u-cell :title="`${item.subName}`">
						<u-avatar slot="icon" shape="square" size="35" :src="item.logoSrc"
							customStyle="margin: -3px 5px -3px 0"></u-avatar>
					</u-cell>
				</u-list-item>
			</u-list>
		</u-popup>
	</view>

</template>

<script>
	import gatherComponent from './components/gatherComponent.vue';
	import orderComponent from '../order/components/orderComponent';
	import createOrderComponent from '../order/components/createOrderComponent';
	export default {
		components: {
			gatherComponent,
			orderComponent,
			createOrderComponent
		},
		data() {
			return {
				title: 'Hello',
				styleObj: {
					navTopHeight: getApp().globalData.systemInfo.deviceType == 'pc' ? 0 : '60px'
				},
				isSticky: false,
				opacityVal: 1,
				currentTab_index: 1,
				showDrawer: false,

				tabList: [{
					name: '关注',
					ComponentName: "gatherComponent"
				}, {
					name: '订房管理',
					ComponentName: "orderComponent"
				}, {
					name: '合作景点',
					ComponentName: "createComponent"
				}, {
					name: '水单',
					ComponentName: "orderComponent4"
				}, {
					name: '发票',
					ComponentName: "orderComponent5"
				}, {
					name: '菜单管理',
					ComponentName: "orderComponent2"
				}, {
					name: '房型管理',
					ComponentName: "orderComponent2"
				}, {
					name: '人员管理',
					ComponentName: "orderComponent3"
				}],
				slelectHotelvalue: "",
				activeHotle: {
					_id: "002",
					name: "见山舍",
					name_Zn: "",
					subName: "1店",
					logoSrc: "https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
				},
				hotelList: [{
						_id: "001",
						name: "见山舍",
						name_Zn: "",
						subName: "1店",
						logoSrc: "https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
					},
					{
						_id: "002",
						name: "见山舍2",
						name_Zn: "",
						subName: "2店",
						logoSrc: "https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
					}
				]

			}
		},
		onLoad() {
			console.log(111, getApp().globalData.systemInfo);
			// uni.redirectTo({
			// 	url:"/pages/login/login"
			// })
		},
		computed: {
			disHeightVal() {
				let deviceType = getApp().globalData.systemInfo.deviceType;
				return (deviceType == 'pc' ? '130px' : '190px')

			},
			scrollHeight() {
				return `calc(100vh - ${this.disHeightVal})`;
			}
		},
		methods: {
			showCheckHotel() {
				this.showDrawerEvent();
			},
			checkHotel(item) {
				let {
					_id,
					name
				} = item;
				console.log("222", item)

			},
			showDrawerEvent() {
				this.showDrawer = true
			},
			closeDrawerEvent() {
				this.showDrawer = false
			},
			clickTab(e) {
				console.log("clickTab", e)
				this.currentTab_index = e.index;
			},
			checkTab(e) {
				//console.log("checkTab", e)
			},
			scrollEvent(e) {
				let {
					scrollTop
				} = e.detail;
				//	this.opacityVal = 1 - (Math.min(scrollTop / 60, 1));
				//	this.isSticky = (scrollTop >= 60 ? true : false);
			},
			swiperContentEvent(e) {
				console.log(e)
				this.currentTab_index = e.detail.current;
			}
		}
	}
</script>

<style lang="scss">
	.top-container {

		display: flex;
		flex-direction: column;
		font-size: $uni-font-size-lgs;
	}

	.scroll-content {}

	.scroll-content .top-area {

		height: 130px;
		box-sizing: border-box;
		z-index: 999;
		background-color: #fff;

		.title-area {
			height: 70px;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			padding: 0 20px;

			.check-area {
				height: 24px;
				display: flex;
				flex-direction: row;
				text-align: center;
				overflow: hidden;


			}
		}

		;

		.navbar {
			width: 100%;
			height: 60px;
			display: flex;
			justify-content: center;
			align-items: center;


			background-color: #fff;

			.nav-content {
				padding: 0 15px;
				width: 100%;
				box-sizing: border-box;


			}

		}
	}



	.sticky-style {
		width: 100vw;
		position: fixed;
		top: 0px;
		left: 0;
	}

	.content-area {
		min-height: calc(100vh - 130px);
		height: 120vh;
		background-color: #eee;
	}

	.activeHotelItemSelect {
		background-color: #ddd !important;
		/*border:2rpx solid blue;*/
	}
</style>