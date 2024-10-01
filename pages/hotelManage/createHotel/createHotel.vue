<template>
	<view>
		
		<scroll-view :scroll-y="true" :scroll-x="false" class="scroll-view" style="">
				<createHotelComponent></createHotelComponent>
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
		methods: {
			
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
