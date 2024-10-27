<template>
	<view>
		
		<scroll-view :scroll-y="true" :scroll-x="false" class="scroll-view" style="">
				<createHotelComponent @closePopup="closePopup"></createHotelComponent>
			</scroll-view>
		
	</view>
</template>

<script>
	import createHotelComponent from '../components/createHotelComponent'
	export default {
		components:{
			createHotelComponent
		},
		data() {
			return {
				
			}
		},
		onLoad(obj){
			console.log("参数传递",obj);
    try {
      this.type= obj.type;
      this.em = JSON.parse(obj.em);
      uni.setNavigationBarTitle({title:obj.type=="1"?"修改酒店信息":"新增酒店",})
    } catch (error) {
      this.type=0;
    }
		},
		methods: {
			closePopup(){
				uni.navigateBack();
			}
		}
	}
</script>

<style>
.scroll-view {
	padding: 20px 15px;
	box-sizing: border-box;
	height: calc(100vh - 44px)
}
</style>
