<script>
	import uniIdPageInit from '@/uni_modules/uni-id-pages/init.js';
 
	export default {
		onLoad(e) {
			console.log("APP onload 参数信息",e)
		},
		onLaunch: function(ob) {
			console.log("参数信息",ob)
			console.log('App Launch XXXXXXXXXX',uni.getSystemInfoSync())
			this.initData();
			
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
