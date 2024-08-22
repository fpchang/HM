<script>
	import uniIdPageInit from '@/uni_modules/uni-id-pages/init.js';
 
	export default {
		onLaunch: function() {
			console.log('App Launch')
			if(this.globalData.systemInfo.deviceType=='pc'){
				uni.hideTabBar({
					success:()=>{
						console.log("隐藏成功")
					}
				});
			}
			let user = uni.getStorageSync("user");
			if(user){
				this.globalData.user=user;
				return;
			}
			uni.reLaunch({
				url:'/pages/login/login'
			});
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		globalData:{
			systemInfo:uni.getSystemInfoSync(),
			user:null
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
</style>
