<template>
	<view class="container">
		<view class="panel">
			<view class="title">欢迎使用 [民宿管理系统]</view>
			<view class="subtitle">手机号快捷登录/注册</view>
			<view style="height: 80px;"></view>
			<u-form labelPosition="left" :model="model1" :rules="rules" ref="uForm">
				<u-form-item label="" prop="userInfo.name" borderBottom ref="item1">
					<u-input placeholder="请输入手机号" border="surround" v-model="value" @change="change" clearable
						shape="circle" class="inputStyle">
						<u--text text="+86" slot="prefix" margin="0 6px 0 0" type="tips"></u--text>
					</u-input>
				</u-form-item>

				<u-form-item label="" prop="userInfo.name" borderBottom ref="item1">
					<u-input placeholder="请输入验证码" shape="circle" border="bottom" class="inputStyle">

						<template slot="suffix">
							<u-code ref="uCode" :keepRunning="true" @change="codeChange" seconds="20"
								changeText="X秒重新获取"></u-code>
							<u-tex style="color: #06c;margin-right: 6px;cursor: pointer;"
								@click="getCode">{{tips}}</u-tex>
						</template>

					</u-input>
				</u-form-item>
				<u-form-item label="" prop="userInfo.name" ref="item1">
					<u-button type="primary" shape="circle" :disabled="submitDisabled">登录</u-button>
				</u-form-item>
			</u-form>
			<view style="height: 80px;"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tips: '获取验证码',
				value: ''
			};
		},
		computed: {
			submitDisabled() {
				return false;
			}
		},
		methods: {
			codeChange(text) {
				this.tips = text;
			},
			getCode() {
				if (this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码'
					})
					setTimeout(() => {
						uni.hideLoading();
						// 这里此提示会被this.start()方法中的提示覆盖
						uni.$u.toast('验证码已发送');
						// 通知验证码组件内部开始倒计时
						this.$refs.uCode.start();
					}, 2000);
				} else {
					uni.$u.toast('倒计时结束后再发送');
				}
			},
		}
	}
</script>

<style lang="scss">
	.inputStyle {
		background-color: #eee;
		height: 34px;
	}

	.sms-btn {
		border: 0 !important;
		color: #06c;
		background-color: transparent;
		outline: none !important;

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