<template>
	<view>
		<view class="card-list">
			<view class="card" style="padding: 15px">
				<view style="display:flex;"> 
					<view class="flex-center">
						<image style="width: 50px; height: 50px; background-color: #eeeeee;"  :src="avatar"></image>
					</view>
					<view class="flx-column name-style"> 
						<text style="padding:4px 8px">{{user.userName}}</text>
						<text style="padding:4px 8px">{{user.phone}}</text>
					</view>

				</view>
				
			</view>
			<view class="card">
				<!-- <uni-list>
				<uni-list-item title="使用说明书" showArrow></uni-list-item>
				<uni-list-item title="注销" showArrow @click="loginOut"></uni-list-item>
				<navigator url="/pages/mine/feedback/feedback">
					<uni-list-item title="意见反馈" showArrow></uni-list-item>
				</navigator>
				
			</uni-list> -->
			<view class="menu-list">
				<view class="menu-list-item" v-for="item in menuList" @click="menuEvent(item.key)">
					<view class="icon-area flex-center"> <uni-icons :type="item.iconVal" size="30"></uni-icons></view>
					<view class="content-area">
						<text>{{item.title}}</text>
						<uni-icons v-if="item.showArrow" type="forward" size="22"></uni-icons>
					</view>
				</view>
			</view>
		</view>
		</view>
			<!-- <uni-card :title="user.userName" :is-shadow="false" :border="false" :sub-title="user.phone" extra="" :thumbnail="avatar" @click="onClick">	
			</uni-card> xtst2023@outlook.com-->
			

	</view>
</template>

<script>
	export default {
		data() {
			return {
				avatar: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png',
				menuList:[
					{
						key:"faq",
						iconVal:"help-filled",
						title:"使用说明",
						showArrow:true
					},
					{
						key:"loginOut",
						iconVal:"help-filled",
						title:"退出登录",
						showArrow:true
					}
				]
			}
		},
		computed:{
			user(){
				return uni.getStorageSync("user");
			}
		},
		onShow() {
			console.log(this.user)
		},
		methods: {
			login(){
				console.log("111");
				uni.navigateTo({
					url:"/uni_modules/uni-id-pages/pages/login/login-smscode?phoneNumber=18516285834"
					
				})
			},
			menuEvent(key){
				switch(key){
					case "loginOut":
						this.loginOut();
					break;
				}
			},
			async loginOut(){
				console.log("loginout")
				const conf = await uni.showModal({
					title: '确认登出',
					content: '是否确认退出登录',
					showCancel: true,
					cancelText: '取消',
					confirmText: '确认'
				});
				if (conf["cancel"]) {
       			 return;
     			 }
				 this.$store.dispatch("loginOut");
			}
		}
	}
</script>

<style lang="scss">
	.card-list{
		display: flex;
		flex-direction: column;
		padding:15px;
		box-sizing: border-box;
		.card{
			height: 100%;
			box-sizing: border-box;
			background: #fff;
			padding: 0 15px;
			box-shadow: 0 0 6px 0px #e4e0e0;
			border-radius: 8px;
			margin-bottom: 15px;
			display: flex;
			flex-direction: column;
			.name-style{
				color:#909399;
			}
		}
	}
.menu-list{
	.menu-list-item{
		min-height: 40px;
		display: flex;
		justify-content: space-between;
		.icon-area{
			padding-right:12px;

		}
		.content-area{
			display: flex;
			flex: 1;
			align-items: center;
			justify-content: space-between;
			border-bottom: 1px solid #bbb;
			box-sizing: border-box;
			font-size: 14px;

		}
		&:last-child{
			.content-area{border-width: 0;}
		}
	}
}
</style>
