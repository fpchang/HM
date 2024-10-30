<template>
	<view>
		<view class="card-list">
			<view class="card" style="padding: 15px">
				<view style="display:flex;">
					<view class="flex-center">
						<uni-icons  fontFamily="iconfont" size="60">	
							{{ '&#xe62c;'}}				
						 </uni-icons>
						
					</view>
					<view class="flx-column name-style" style="flex:1">
						<view class="flex-left"> 
							<text style="padding:4px 8px;min-width:100px;cursor:pointer" @click="openNameUpdate">{{user.userName|| '--'}}</text>
							<uni-icons type="forward"></uni-icons>
						</view>
						
						<text style="padding:4px 8px">{{user.phone}}</text>

					</view>


				</view>
				<view>
					<view class="flex-between vip-style" style="padding:12px 8px 0 0" @click="vipRecharge">
						<view><uni-icons type="vip-filled" color="gold"></uni-icons>
							<text >订阅期：<text style="color:gold">{{user.vipEndDateStamp | vipDate}}</text></text>
						</view>

						<view class="flex-center">
							<uni-icons type="forward"></uni-icons>
						</view>

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
						<view class="icon-area flex-center">
							 <uni-icons  fontFamily="iconfont" size="24">	
								{{ item.unicode }}				
							 </uni-icons>
						</view>
						<view class="content-area">
							<text>{{item.title}}</text>
							<uni-icons v-if="item.showArrow" type="forward" size="22"></uni-icons>
						</view>
					</view>
				</view>
			</view>
		</view>

		<uni-popup ref="popupFeedback" background-color="transprant">
			<view class="popup-content">
				<view class="create-order-title-style">意见与反馈</view>
				<view class="comContent">
					<feedback></feedback>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="nameDialog" type="dialog">
			<uni-popup-dialog ref="inputClose" before-close  mode="input" title="更改名称" value=""
				placeholder="请输入名称" @close="closeNameUpdate" @confirm="submitNameUpdate"></uni-popup-dialog>
		</uni-popup>
		<!-- <uni-popup ref="popupfeedbackCreate" background-color="transprant">
			<view class="popup-content">
			  <view class="create-order-title-style">反馈与建议</view>
			  <view class="comContent">
				
			  </view>
			</view>
		  </uni-popup>  -->
	</view>
</template>

<script>

	import feedback from "./feedback/feedback";
	import AccountService from "../../services/AccountService";
	export default {
		components: {
			feedback
		},
		data() {
			return {
				avatar: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png',
				menuList: [
					// {
					// 	key: "faq",
					// 	unicode: "\ue8cc",
					// 	title: "使用说明",
					// 	showArrow: true
					// },
					
					{
						key: "feedback",
						unicode: '\ue6c0',
						title: "意见反馈",
						showArrow: true
					},
					{
						key: "loginOut",
						unicode: "\ue625",
						title: "退出登录",
						showArrow: true
					}
				]
			}
		},
		computed: {
			isPcShow() {
				return this.$store.state.isPcShow;
			},
			hotel_id() {
				return this.$store.state.hotel_id;
			},
			user() {
				//return uni.getStorageSync("user");
				return this.$store.state.user||uni.getStorageSync("user");
			}
		},
		filters:{
			vipDate(d){
				if(!d){
					return '--';
				}
				return new Date(d).Format("yyyy-MM-dd");
			}
		},
		onShow() {
		},
		methods: {
			login() {
				uni.navigateTo({
					url: "/uni_modules/uni-id-pages/pages/login/login-smscode?phoneNumber=18516285834"

				})
			},
			closeNameUpdate(){
				this.$refs.nameDialog.close()
			},
			openNameUpdate(){
				this.$refs.nameDialog.open()
			},
			async submitNameUpdate(val){
				console.log(val)
				if(!val){
					return;
				}
				uni.showLoading();
				try {
					const res = await AccountService.updateUserName(this.user._id,val);
					
				console.log("修改成功");
				this.closeNameUpdate();
				uni.hideLoading();
				uni.showToast({title:"修改成功",icon:"success"})
				} catch (error) {
					console.log("修改失败",error);
					uni.hideLoading();
					uni.showToast({title:"修改失败",icon:"error"})
				}
				await this.$store.dispatch("getUser");

			},
			menuEvent(key) {
				switch (key) {
					case "loginOut":
						this.loginOut();
						break;
					case "feedback":
						if (this.isPcShow) {
							this.$refs.popupFeedback.open()
							break;
						}
						const a = {
							name: 111
						}
						uni.navigateTo({
							url: `/pages/mine/feedback/feedback`
						});
						break;

				}
			},
			async loginOut() {
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
			},
			vipRecharge() {
				return;
				let options = {
					total_fee: 1, // 支付金额，单位分 100 = 1元
					type: "recharge", // 支付回调类型
					order_no: "20221027011000101001010", // 业务系统订单号
					//out_trade_no: "2022102701100010100101001", // 插件支付单号
					description: "vip订阅充值", // 支付描述
				};
				let optionsStr = encodeURI(JSON.stringify(options));
				uni.navigateTo({
					url: `/uni_modules/uni-pay/pages/pay-desk/pay-desk?options=${optionsStr}`
				});
			}
		}
	}
</script>

<style lang="scss">
	.card-list {
		display: flex;
		flex-direction: column;
		padding: 15px;
		box-sizing: border-box;

		.card {
			height: 100%;
			box-sizing: border-box;
			background: #fff;
			padding: 0 15px;
			box-shadow: 0 0 6px 0px #e4e0e0;
			border-radius: 8px;
			margin-bottom: 15px;
			display: flex;
			flex-direction: column;

			.name-style {
				color: #909399;
			}
		}
	}

	.menu-list {
		.menu-list-item {
			min-height: 44px;
			display: flex;
			justify-content: space-between;

			.icon-area {
				padding-right: 12px;

			}

			.content-area {
				display: flex;
				flex: 1;
				align-items: center;
				justify-content: space-between;
				border-bottom: 1px solid #d5d4d4;
				box-sizing: border-box;
				font-size: 14px;

			}

			&:last-child {
				.content-area {
					border-width: 0;
				}
			}
		}
	}

	.vip-style {
		font-size: 13px;
	}
	@font-face {
		font-family: 'iconfont';  /* Project id 4630870 */
		src: url('../../static/iconfont.ttf')
	}
 
</style>