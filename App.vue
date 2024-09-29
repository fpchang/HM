<script>
	import uniIdPageInit from '@/uni_modules/uni-id-pages/init.js';
 
	export default {
		onLaunch: function() {
			console.log('App Launch XXXXXXXXXX',uni.getSystemInfoSync())
			this.initData();
			let user = uni.getStorageSync("user");
			if(user){
				this.globalData.user=user;
				this.$store.commit("setUser",user);
				return;
			}
			uni.reLaunch({
				url:'/pages/login/login'
			});
			// uni.reLaunch({
			// 	url:'/uni_modules/uni-id-pages/pages/login/login-smscode-hm?phoneNumber=18516285834',
				
			// })
		},
		onShow: function() {
			console.log('App Show');
			this.initData();
		},
		onHide: function() {
			console.log('App Hide')
		},
		onPullDownRefresh() {
			console.log("app veu refrush");
		},
		methods:{
			initData(){
				if(this.globalData.systemInfo.deviceType=='pc' ||this.globalData.systemInfo.windowWidth>750){
					uni.hideTabBar({
						success:()=>{
							console.log("隐藏成功")
						}
					});
					this.globalData.isPcShow=true;
					this.$store.commit("setPcShow",true);
				}
			}
		},
		globalData:{
			systemInfo:uni.getSystemInfoSync(),
			appId:"",
			secret:"****"
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
</style>
