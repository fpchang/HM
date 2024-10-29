<template>
	<view>
		<scroll-view :scroll-y="true" style="height:100vh"> 
			<view class="header-title" style=""><text>【{{hotel.hotelName}}】景点票价</text></view>
			<view style="display: flex;justify-content:center">
				<view class="card-container" :style="{width:`${cardContainerWidth}px`}">
					<view class="card" v-for="item of scenicSpotList" :style="{width:`${cardWidth}px`}">
						<view class="card-item">
							<scenicSpotShowCardComponent :scenicSpot="item"></scenicSpotShowCardComponent>
						</view>
	
					</view>
				</view>
			</view>
		</scroll-view>
	
	</view>
</template>

<script>
	import scenicSpotShowCardComponent from './scenicSpotShowCardComponent.vue';
	import ScenicSpotService from '../../../services/ScenicSpotService';
	import HotelService from '../../../services/HotelService';
	export default ({
		name: "showscenicSpotList",
		components: {
			scenicSpotShowCardComponent
		},
		props: {},
		data() {
			return {
				widthTemp: 0,
				type: 0,
				targetObj: {},
				hotel:{}

			}
		},
		computed: {
			hotel_id() {
				return this.$store.state.hotel_id;
			},
			scenicSpotList(){
				return this.$store.state.scenicSpotStore.scenicSpotList;
			},
			viewWidth() {
				let viewWidth = uni.getSystemInfoSync().windowWidth || uni.getSystemInfoSync().screenWidth
				return viewWidth + this.widthTemp - this.widthTemp
			},

			cardWidth() {
				let windowWidth = this.viewWidth - 20; //-20 为pc端滚动条宽度
				let count = Math.floor(windowWidth / 375);
				if (count == 0) {
					return windowWidth;
				}
				let ys = windowWidth % 375
				return Math.min(375 + (ys / count), 450)
			},
			cardContainerWidth() {
				let count = Math.max(Math.floor(this.viewWidth / this.cardWidth), 1);
				return this.cardWidth * count
			},
			isPcShow() {
				return this.$store.state.isPcShow;
			}
		},
		watch: {
			hotel_id(){
				console.error("vvvvv")
				this.initData();
			}
			},
		async created() {
			console.log("ffff",this.$store.state);
			// http://localhost:8080/#/pages/scenicSpot/showScenicSpot/showScenicSpot?hotel_id=66f4d677e4ec9dbeca1f8ff9
			this.initData();

		},
		methods: {
			async initData(){
				if(!this.hotel_id){
					console.log("没有hotel_id");
					return;
				}
				console.log(1233);
				const hotelRes = await HotelService.getHotelInfoById(this.hotel_id);
				this.hotel = hotelRes.result.data[0];
				await this.$store.dispatch("getScenicSpotList",this.hotel_id);
			
		

		},
	},

		// 组件周期函数--监听组件挂载完毕
		mounted() {
			if (window) {
				window.onresize = () => {
					this.widthTemp = Math.random(10);
					
				}
			}

		},
		// 组件周期函数--监听组件数据更新之前
		beforeUpdate() {},
		// 组件周期函数--监听组件数据更新之后
		updated() {},
		// 组件周期函数--监听组件激活(显示)
		activated() {},
		// 组件周期函数--监听组件停用(隐藏)
		deactivated() {},
		// 组件周期函数--监听组件销毁之前
		beforeDestroy() {},
	})
</script>

<style scoped lang="scss">
.header-title {
	display: flex;
	font-size: 22px;
	height: 55px;
	justify-content: center;
	align-items: center;
}
	.card-container {
		display: flex;
		flex-wrap: wrap;
		min-width: 375px;

		.card {
			min-width: 375px;
			max-width: 450px;
			padding: 10px;
			box-sizing: border-box;

			.card-item {
				height: 100%;
				box-sizing: border-box;
				background: #fff;
				padding: 10px 20px;
				box-shadow: 0 0 4px 4px #e4e0e0;
				border-radius: 8px;

			}
		}
	}
</style>