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
	//import DB from "../../../api/DB";
	import HotelService from "../../../services/HotelService";
	export default {
		props:{
			type:0,
			rt:{}
		},
		data() {
			return {
				submitLoading: false,
				//hotelList:getApp().globalData.hotelList,
				hotelForm: this.type==1?{
					belong: this.rt.belong,
					hotelName: this.rt.hotelName,
					hotelAdress: this.rt.hotelAdress,
					hotelCoordinate: this.rt.hotelCoordinate,
					hotelIntroduction: this.rt.hotelIntroduction
				}: {
					belong: "",
					hotelName: "",
					hotelAdress: "",
					hotelCoordinate: [],
					hotelIntroduction: ""
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
									let obj = this.hotelList.find(item=>{ return item.hotelName==value});
									if(obj&&this.type==0){
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
			user(){
				return this.$store.state.user
			},
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
					//uni.showLoading();
					this.submitLoading = true;
					let obj = {}
					console.log(this.hotelForm);
					if(this.type==1){
						this.updateHotel();
						return ;
					}
					this.addHotel();

				
				});


			},
			addHotel(){
				this.hotelForm.belong=this.user.phone;
					HotelService.createHotel(this.hotelForm).then(async res => {
						console.log("添加成功");
						uni.hideLoading();
						this.submitLoading = false;
						// uni.reLaunch({
						// 	url:"/pages/index/index"
						// })
						await this.$store.dispatch("getHotelList");
						this.$emit('closePopup');
					}).catch(er => {
						console.log("添加失败",er);						
						uni.hideLoading();
						uni.showToast({
							title: '数据异常，请稍候再试',
							icon: 'error'
						})
						this.submitLoading = false;
					})
			},
			async updateHotel(){
				try {
					await HotelService.updateHotel(this.hotel_id,this.hotelForm);
					await this.$store.dispatch("getHotelList");
					this.$emit('closePopup');
				} catch (error) {
					uni.hideLoading();
						uni.showToast({
							title: '更新失败，请稍候再试',
							icon: 'error'
						})
						this.submitLoading = false;
				}
				
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