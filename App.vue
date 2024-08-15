<script>
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
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		globalData:{
			systemInfo:uni.getSystemInfoSync()
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
</style>
