<template>
	
	<view>
		<scroll-view :scroll-y="true" :scroll-x="false" class="scroll-view" style="">
			<createRoomTypeComponent></createRoomTypeComponent>
		</scroll-view>
		
	</view>
</template>

<script>
import createRoomTypeComponent from '../components/createRoomTypeComponent.vue';
	export default {
		components:{
			createRoomTypeComponent
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
