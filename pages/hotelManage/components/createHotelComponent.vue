<template>
	<view>
		<uni-forms ref="hotelFormRef" :modelValue="hotelForm" :rules="hotelFormRules">

			<uni-forms-item label="酒店名" required name="hotelName">
				<uni-easyinput v-model="hotelForm.hotelName" placeholder="请输入酒店名称" />
			</uni-forms-item>
			<uni-forms-item label="酒店地址" name="hotelAdress">
				<uni-easyinput v-model="hotelForm.hotelAdress" placeholder="请输入酒店地址" />
			</uni-forms-item>
			<uni-forms-item label="备注">
				<uni-easyinput type="textarea" v-model="hotelForm.hotelIntroduction" placeholder="备注内容"></uni-easyinput>

			</uni-forms-item>
			<uni-forms-item>
				<u-button type="success" text="保存" color="#007aff" @click="submitForm()" :disabled="submitDisabled"
					:loading="submitLoading"></u-button>
			</uni-forms-item>
		</uni-forms>
	</view>
</template>

<script>
	import DB from "../../../api/DB";
	export default {
		data() {
			return {
				submitLoading: false,
				hotelList:getApp().globalData.hotelList,
				hotelForm: {
					blongUserId: getApp().globalData.user.mobile,
					hotelName: "",
					hotelAdress: "",
					hotelCoordinate: [],
					hotelIntroduction: "简介"
				},
				hotelFormRules: {
					// 对name字段进行必填验证
					hotelName: {
						rules: [{
								required: true,
								errorMessage: '请输入酒店名',
							},
							{
								validateFunction: (rule, value,data,callback)=> {									
									let obj = this.hotelList.find(item=>{ return item.name==value});
									if(obj){
										callback('已存在酒店名')
									}
									return true;
								}
							}
						],
					}
				}


			};
		},
		created() {
			console.log("user", getApp().globalData.user)
		},
		computed: {
			submitDisabled() {
				return false
			}
		},
		methods: {

			submitForm() {
				
				this.$refs.hotelFormRef.validate().then(res => {
					uni.showLoading();
					this.submitLoading = true;
					let obj = {}
					console.log(this.hotelForm);
					DB.insertData("hm-hotel", this.hotelForm).then(res => {
						console.log("添加成功");
						uni.hideLoading();
						uni.reLaunch({
							url:"/pages/index/index"
						})
					}).catch(er => {
						console.log("添加失败",er);
						this.submitLoading = true;
						uni.hideLoading();
						uni.showModal({
							content:"系统异常，请稍候再试！",
							confirmText:"确认"
						});
					})
				});


			}
		},
	};
</script>

<style lang="scss">
	.uni-list-cell {
		justify-content: flex-start
	}

	.disabled-style {
		color: #bbb;
	}
</style>