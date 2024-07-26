<template>
	<view style="padding:20rpx 60rpx;">
		<uni-section>
		<uni-forms>
			
			<uni-forms-item label="手机号" >
				<uni-easyinput v-model="baseFormData.phone" placeholder="请输入手机号" />
			</uni-forms-item>
			<uni-forms-item label="验证码" >
				<uni-easyinput v-model="baseFormData.smsCode" placeholder="请输入验证码" />
			</uni-forms-item>
			<uni-forms-item>
			<!-- 带选择框的隐私政策协议组件 -->
			<checkbox :checked="isAgree" style="transform: scale(0.5);margin-right: -6px;border-radius: 3px;"  class="circleCheckbox"/>
			<text>同意用户服务协议与隐私协议</text>
			</uni-forms-item>
			<uni-forms-item>
			<button size="default" type="default"
				style="color:#ffffff;backgroundColor:#1AAD19;borderColor:#1AAD19"
				hover-class="is-hover">按钮</button>
				</uni-forms-item>
		</uni-forms>
		</uni-section>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				baseFormData:{
					phone:'',
					smsCode:'',
					ifAgree:0
					
				},
				isAgree:false
			}
		},
		methods: {
			
		}
	}
</script>

<style>
.circleCheckbox ::v-deep .uni-checkbox-input{
		border-radius: 100%;
	}
</style>
