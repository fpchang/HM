<template>
	<view style="padding:20rpx 60rpx;">
		<uni-section>
		<uni-forms ref="valiForm" :rules="rules" :modelValue="baseFormData">
			
			<uni-forms-item label="手机号" name="phone">
				<uni-easyinput v-model="baseFormData.phone" required placeholder="请输入手机号" />
			</uni-forms-item>
			<uni-forms-item label="验证码" >
			<view style="height:100%;padding:0 10rpx;background-color: #eee;display: flex;justify-content: space-between;align-items: center;">
				<input class="uni-input" style="font-size: 24rpx;" type="number"  v-model="baseFormData.smsCode" placeholder="请输入验证码" />
				<text @click="sendSms()" style="font-size: 24rpx;color: blue;cursor: pointer;">发送验证码</text>
			</view>
			
			</uni-forms-item>
			<uni-forms-item>
			<!-- 带选择框的隐私政策协议组件 -->
			<checkbox :checked="isAgree" style="transform: scale(0.5);margin-right: -6px;border-radius: 3px;"  class="circleCheckbox"/>
			<text>同意用户服务协议与隐私协议</text>
			</uni-forms-item>
			<uni-forms-item>
			<button size="default" type="default"
				style="color:#ffffff;backgroundColor:#1AAD19;borderColor:#1AAD19"
				hover-class="is-hover" @click="submit('valiForm')">按钮</button>
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
				isAgree:false,
				valiFormData: {
					phone: ''
				},
				// 校验规则
				rules: {
					name: {
						rules: [{
							required: true,
							errorMessage: '姓名不能为空'
						}]
					},
					phone: {
						rules: [
							{
								required: true,
								errorMessage: '手机号不能为空'
							},{
							format:'number',
							errorMessage: '手机号能输入数字'
						}]
					}
				},
			}
		},
		methods: {
			sendSms(){
				console.log(this.baseFormData.phone);
			},
			submit(ref){
				console.log(this.baseFormData);
				this.$refs[ref].validate().then(res => {
									console.log('success', res);
									uni.showToast({
										title: `校验通过`
									})
								}).catch(err => {
									console.log('err', err);
								})
			}
		}
	}
</script>

<style>
.circleCheckbox ::v-deep .uni-checkbox-input{
		border-radius: 100%;
	}
</style>
