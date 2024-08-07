<template>

	<uni-drawer ref="showLeft" mode="left">
		<scroll-view style="height: 100%;" scroll-y="true">
			 <uni-list>
			 	
			 	<uni-list-item  v-for="item in hotelList" :key="item.id" :title="item.name" :note="item.subName"  :thumb="item.logoSrc"
			 	 thumb-size="lg" :class="[item._id==activeHotle._id?'activeHotelItemSelect':'']" clickable="true" showArrow  @click="checkHotel(item)"></uni-list-item>
			</uni-list>
		</scroll-view>
	</uni-drawer>
	<view>
 
	</view>




</template>

<script>
	export default {
		data() {
			return {
				activeHotle:{
					_id:"002",
					name:"见山舍",
					name_Zn:"",
					subName:"1店",
					logoSrc:"https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
				},
				hotelList:[{
					_id:"001",
					name:"见山舍",
					name_Zn:"",
					subName:"1店",
					logoSrc:"https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
				},
				{
					_id:"002",
					name:"见山舍2",
					name_Zn:"",
					subName:"2店",
					logoSrc:"https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
				}],

				name: "",
				href: 'https://uniapp.dcloud.io/component/README?id=uniui'
			}
		},
		onLoad() {

		},

		onReady() {

			//this.getData();
			this.getOpenId();


		},
		onNavigationBarButtonTap(e) {
			console.log("www", e);
			this.showDrawer();
		},
		methods: {
			getOpenId() {
				uniCloud.callFunction({
					name: "getOpenId",
					data: {
						code: "0b1ZSx000bQFtS1KFv100pGTCU2ZSx01",
						secret: "845eff40726dc3624688c347dab12bce",
						appId: "wxb0704bf984581410"
					}
				}).then(res => {
					console.log("获取的openid.....", res)
				})
			},
			getData() {
				const db = uniCloud.database();

				db.collection('order').where("checkInEndDateTimeStamp<22222222222222222&&checkInStartDateTimeStamp>111111")
					.get().then(res => {
						console.log("11111", res)

					})
			},
			showDrawer() {
				this.$refs.showLeft.open();
			},
			closeDrawer() {
				this.$refs.showLeft.close();
			},
			checkHotel(item){
				let {_id,name}=item;
				console.log("222",item)
			}
		}
	}
</script>

<style lang="scss">
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
	}

	.con {
		background-color: red;
		width: 600rpx;
		height: 400rpx;
	}
	.activeHotelItemSelect{
		background-color: #ddd!important;
		/*border:2rpx solid blue;*/
	}
</style>