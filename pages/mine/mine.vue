<template>
	<view>
		<view class="card-list">
			<view class="card">
				<view style="display:flex;"> 
					<view class="flex-center">
						<image style="width: 50px; height: 50px; background-color: #eeeeee;"  :src="avatar"
							@error="imageError"></image>
					</view>
					<view class="flx-column name-style"> 
						<text style="padding:4px 8px">{{user.userName}}</text>
						<text style="padding:4px 8px">{{user.phone}}</text>
					</view>

				</view>
				
			</view>
			<view class="card"><uni-list>
				<uni-list-item title="使用说明书" showArrow></uni-list-item>
				<navigator url="/pages/mine/feedback/feedback">
					<uni-list-item title="意见反馈" showArrow></uni-list-item>
				</navigator>
				
			</uni-list>
		</view>
		</view>
			<!-- <uni-card :title="user.userName" :is-shadow="false" :border="false" :sub-title="user.phone" extra="" :thumbnail="avatar" @click="onClick">	
			</uni-card> -->
			

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

<style lang="scss">
	.card-list{
		display: flex;
		flex-direction: column;
		padding:20px;
		box-sizing: border-box;
		.card{
			height: 100%;
			box-sizing: border-box;
			background: #fff;
			padding:  20px;
			box-shadow: 0 0 6px 0px #e4e0e0;
			border-radius: 8px;
			margin-bottom: 20px;
			display: flex;
			flex-direction: column;
			.name-style{
				color:#909399;
			}
		}
	}

</style>
