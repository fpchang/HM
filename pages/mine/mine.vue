<template>
	<view>
		

		<uni-section title="双标题卡片" type="line" >
			<uni-card :title="user.userName" :sub-title="user.phone" extra="" :thumbnail="avatar" @click="onClick">
				<!-- <text class="uni-body">这是一个带头像和双标题的基础卡片，此示例展示了一个完整的卡片。</text> -->
				
				<uni-list>
					<uni-list-item title="使用说明书" showArrow></uni-list-item>
					<uni-list-item title="意见反馈" showArrow></uni-list-item>
				</uni-list>
			</uni-card>
		</uni-section>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				avatar: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png',
				
			}
		},
		computed:{
			user(){
				return this.$store.state.user;
			}
		},
		onShow() {
			console.log("2222",uni.getStorageInfoSync(),this.user)
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
