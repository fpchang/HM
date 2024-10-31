<script> 
import AccountService from "./services/AccountService";
	export default {
		onLoad(e) {
			console.log("APP onload 参数信息",e)
		},
		onLaunch: async function(ob) {
			console.log("参数信息",ob)
			console.log('App Launch XXXXXXXXXX',uni.getSystemInfoSync());
			try {
				let {hotel_id} = ob.query;
			if(hotel_id){
				console.log("cccc",hotel_id)
				this.$store.commit("checkHotel",hotel_id);
			}
			} catch (error) {
				
			}
		
			this.getEnv();
			this.initData();
			this.setConfig();
			
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
			async setConfig(){
				try {
					const res = await AccountService.getConfig();
					console.log("配置信息",res);
					this.$store.commit("setConfig",res.result)
				} catch (error) {
					
				}
			},
			 initData(){
				console.log("init...",uni.getSystemInfoSync().deviceType=='pc')
				if(uni.getSystemInfoSync().deviceType=='pc' ||uni.getWindowInfo().windowWidth>740){
					uni.hideTabBar({
						success:()=>{
							console.log("隐藏成功")
						}
					});
					console.log("ispcshow====")
					this.globalData.isPcShow=true;
					this.$store.commit("setPcShow",true);
					this.$store.commit("updateUser");
				}
			
				
				
			},
			getEnv(){
				if (process.env.NODE_ENV === 'development') {
				this.globalData.env="development"
				} else {
					console.log('生产环境');
					this.globalData.env="product"
					}
			}
		},
		globalData:{
			systemInfo:uni.getSystemInfoSync(),
			appId:"",
			env:"development",
			secret:"****"
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
</style>
