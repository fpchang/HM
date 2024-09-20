<template>
    <view>
		<uni-forms ref="roomTypeRef" :modelValue="roomTypeForm" :rules="roomTypeRules">

			<uni-forms-item label="房型名称" required name="name">
				<uni-easyinput v-model="roomTypeForm.name" placeholder="请输入房型名称" />
			</uni-forms-item>
			<uni-forms-item label="房型数量" name="count">
				<view><uni-number-box v-model="roomTypeForm.count" min="1"
                     @change="rnumchange()" /></view>
			</uni-forms-item>
			<uni-forms-item>
				<u-button type="success" text="保存" color="#007aff" @click="submitForm()" :disabled="submitDisabled"
					:loading="submitLoading"></u-button>
			</uni-forms-item>
		</uni-forms>
	</view>
</template>

<script>
import DB from "../../../api/DB.js";
export default {
    
		data() {
			return {
				submitLoading: false,
				//hotelList:getApp().globalData.hotelList,
				roomTypeForm: {
                    
                    "count": 5,
                    "name": "大床房",
                    "state": 1,
                    "value": "t1"
                
				},
				roomTypeRules: {
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
			hotel_id(){
				return this.$store.state.hotel_id;
			},
			hotelList(){
				return this.$store.state.hotelList;
			},
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

<style>

</style>