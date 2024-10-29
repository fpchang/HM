<template>
	<view class="content">
		<scroll-view :scroll-y="true" :scroll-x="false" class="scroll-view" style="">
			<createOrderComponent @closePopup="closePopup"></createOrderComponent>
		</scroll-view>

	</view>
</template>

<script>
	import createOrderComponent from '../components/createOrderComponent';
	export default {
		components: {
			createOrderComponent
		},
		data() {
			return {

			}
		},

		methods: {
			closePopup(){
				uni.navigateBack();
			}
		}
	}
</script>

<style lang="scss">
	.scroll-view {
		padding: 20px 15px;
		box-sizing: border-box;
		height:100vh;
	}
</style>