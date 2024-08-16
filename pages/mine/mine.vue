<template>
	<view>
		<u-button @click="login">login</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onShow() {
			console.log("2222",uni.getStorageInfoSync())
		},
		methods: {
			login(){
				console.log("111");
				uni.navigateTo({
					url:"/uni_modules/uni-id-pages/pages/login/login-smscode?phoneNumber=18516285834"
					
				})
			}
		}
	}
</script>

<style>

</style>
