<template>
	<view class="container">
		<view class="panel">
			<view class="title">欢迎使用 [民宿管理系统]</view>
			<view class="subtitle">手机号快捷登录/注册</view>
			<view style="height: 80px;"></view>
			<u-form labelPosition="left" :model="userForm" :rules="rules" errorType="none" ref="uForm">
				<u-form-item label="" prop="phone" ref="item1">
					<u-input maxlength="11" type="number" placeholder="请输入手机号" border="surround"
						v-model="userForm.phone" clearable shape="circle" class="inputStyle">
						<u-text text="+86" slot="prefix" margin="0 6px 0 0" type="tips"></u-text>
					</u-input>
				</u-form-item>

				<u-form-item label="" prop="smsCode" ref="item2">
					<u-input maxlength="4" type="number" placeholder="请输入验证码" shape="circle" border="bottom" class="inputStyle"
						v-model="userForm.smsCode">

						<template slot="suffix">
							<u-code ref="uCode" :keepRunning="true"  seconds="20"
								changeText="XS"></u-code>
							<text :class="['smstext',sendSmsDisabled?'smstext-disable':'']" style=""
								@click="getCode">{{tips}}</text>
						</template>

					</u-input>
				</u-form-item>
				<u-form-item label="" ref="item1">
					<u-button type="primary" shape="circle" :disabled="submitDisabled" @click="submit" :loading="submitLoading">登录</u-button>
				</u-form-item>
			</u-form>
			<view style="height: 80px;"></view>
		</view>
	</view>
</template>

<script>
import DB from '../../api/DB';
	export default {
		data() {
			return {
				submitLoading:false,
				tips: '获取验证码',
				value: '',
				phone: '',
				userForm: {
					smsCode: '1234',
					phone: '18516285834'
				},
				rules: {
					
					phone: [{
							required: true,
							message: '请输入手机号',
							trigger: ['blur'],
						},
						{
							// 自定义验证函数，见上说明
							validator: (rule, value, callback) => {
								// 上面有说，返回true表示校验通过，返回false表示不通过
								// uni.$u.test.phone()就是返回true或者false的
								return uni.$u.test.phone(value);
							},
							message: '手机号码不正确',
							// 触发器可以同时用blur和change
							trigger: ['blur'],
						}
					]
				}
			};
		},
		computed: {
			sendSmsDisabled() {
				return this.userForm.phone.length != 11;
			},
			submitDisabled() {
				return  this.userForm.phone.length != 11||this.userForm.smsCode.length != 4;
			}
		},
		onload(){
			
		},
		methods: {

			codeChange(text) {
				this.tips = text;
			},
			getCode1(){
				const uniIdCo = uniCloud.importObject("uni-id-co", {
					customUI: true
				})
				console.log('sendSmsCode',{
					"phone": this.phone,
					"scene": "login-by-sms",
					"captcha": ""
				});
				uniIdCo.sendSmsCode({
					"phone": "18516285834",
					"scene": "login-by-sms",
					"captcha": ""
				}).then(result => {
					uni.showToast({
						title: "短信验证码发送成功",
						icon: 'none',
						duration: 3000
					});
					this.reverseNumber = Number(this.count);
					console.log(result)
					//this.getCode();
				}).catch(e => {
					console.log(e)
					if (e.code == "uni-id-invalid-sms-template-id") {
						this.modelValue = "123456"
						uni.showToast({
							title: '已启动测试模式,详情【控制台信息】',
							icon: 'none',
							duration: 3000
						});
						console.warn(e.message);
					} else {
						//this.getImageCaptcha()
						this.captcha = ""
						uni.showToast({
							title: e.message,
							icon: 'none',
							duration: 3000
						});
					}
				})
			},
			getCode() {
				this.$refs.uForm.validateField('phone', (err) => {
					if (err && err.length) {
						console.log("手机号不正确");
						return;
					}
					if (this.$refs.uCode.canGetCode) {
						// 模拟向后端请求验证码
						
						uni.showLoading({
							title: '正在获取验证码'
						})
						// setTimeout(() => {
						// 	uni.hideLoading();
						// 	// 这里此提示会被this.start()方法中的提示覆盖
						// 	uni.$u.toast('验证码已发送');
						// 	// 通知验证码组件内部开始倒计时
						// 	this.$refs.uCode.start();
						// }, 2000);
						uniCloud.callFunction({
							name:"hm-sendSms",
							data:{
								phone:this.userForm.phone,
								templateId:"100"
							}
						}).then(res=>{
							console.log("sendsms value",res)
						})
					} else {
						uni.$u.toast('倒计时结束后再发送');
					}
				})


			},
			submit1(){

			},
			submit(){
				this.$refs.uForm.validate().then(async res => {
					console.log("2222222222")
					this.submitLoading=true;
					DB.callFunction('hm_login',{userForm:this.userForm}).then(res=>{
						console.log("login result----",res)
						
						//if(res.result.errCode==0){
							console.log("登录成功");
							uni.setStorageSync("hm_token",res.result);
							 this.getUserInfo();
						
						
					}).catch(error=>{
						console.error("登录注册失败",error);
						this.submitLoading=false;
					})
					
				}).catch(errors => {
					uni.$u.toast('校验失败',errors)
				})
			},
			async getUserInfo(){
				console.log(this.userForm.phone);
				const db = uniCloud.database();
				const userRes = await db.collection("hm-user").where(`phone=='${this.userForm.phone}'`).get();
				console.log("更新userInfo",userRes.result.data[0]);
				uni.setStorageSync('user',userRes.result.data[0]);
				this.$store.commit("setUser",userRes.result.data[0]);
				uni.reLaunch({
					url:'/pages/index/index'
				})
			}
		}
	}
</script>

<style lang="scss">
	.inputStyle {
		background-color: #eee;
		height: 34px;
		padding-left: 18px !important;
	}

	.sms-btn {
		border: 0 !important;
		color: #06c;
		background-color: transparent;
		outline: none !important;

	}

	.smstext {
		color: #06c;
		margin-right: 6px;
		cursor: pointer;
	}

	.smstext-disable {
		color: #bbb;
	}

	.container {
		width: 100vw;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;

		.panel {
			width: 300px;

			.title {
				font-size: 25px;
				padding: 15px 0;
			}

			.subtitle {
				font-size: 16px;
				color: #aaa;
			}

		}
	}
</style>