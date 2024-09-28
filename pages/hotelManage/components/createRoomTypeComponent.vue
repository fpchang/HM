<template>
    <view>
        <uni-forms ref="roomTypeRef" :modelValue="roomTypeForm" :rules="roomTypeRules" label-width="90px">

            <uni-forms-item label="房型名称" required name="name">
                <uni-easyinput v-model="roomTypeForm.name" placeholder="请输入房型名称" />
            </uni-forms-item>
            <uni-forms-item label="房型数量" name="count">
                <view>
                    <!-- <uni-number-box v-model="roomTypeForm.count" :min="1" :width="120"
                    @change="roomTypeCountChange" @blur="roomTypeCountChange" /> -->
                    <u-number-box :min="1" integer v-model="roomTypeForm.count">

                        <input slot="input" style="width: 100px;text-align: center;" class="input"
                            v-model="roomTypeForm.count"></input>
                    </u-number-box>


                </view>
            </uni-forms-item>

        </uni-forms>
        <u-button type="success" text="保存" color="#007aff" @click="submitForm()" :disabled="submitDisabled"
            :loading="submitLoading"></u-button>
    </view>
</template>

<script>
import DB from "../../../api/DB.js";
export default {
		props:{
			type:0,
			rt:{}
		},
		data() {
			return {
				submitLoading: false,
				//hotelList:getApp().globalData.hotelList,
				roomTypeForm: this.type==1?{
                    "count": this.rt.count,
                    "name": this.rt.name,
                    "roomList":this.rt.roomList
				}: {
                    "count": 1,
                    "name": "",
                    "roomList":[]
                
				},
				roomTypeRules: {
					// 对name字段进行必填验证
					name: {
						rules: [{
								required: true,
								errorMessage: '请输入房型名称',
							},
							{
								validateFunction: (rule, value,data,callback)=> {									
									let obj = this.roomType.find(item=>{ return item.name==value});
									if(this.type==1){
										 obj = this.roomType.find(item=>{ return item.name==value && item._id !=this.rt._id});
									}
									if(obj){
										callback('已存在相同房型名称')
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
			
		},
		computed: {
			hotel_id(){
				return this.$store.state.hotel_id;
			},
			hotelList(){
				return this.$store.state.hotelList;
			},
            roomType() {
				return this.$store.state.roomType;
			},          
			submitDisabled() {
				return false
			}
		},
		methods: {
            roomTypeCountChange(val){
                console.log(val)
            },
			submitForm() {
				this.roomTypeForm.hotel_id=this.hotel_id;
				this.$refs.roomTypeRef.validate().then(res => {
					uni.showLoading();
					this.submitLoading = true;
            
					if(this.type==1){
						this.updateRoomType();
						return ;
					}
					this.addRoomType();

			})
		},
		addRoomType(){
			DB.callFunction(
							"hm_addRoomType",
							{
                                roomTypeObj:this.roomTypeForm
							}
						).then(res=>{
                            console.log("添加成功");
                        this.$store.commit("getRoomType");
                        this.$emit('closePopup');
						uni.hideLoading();
							
				}).catch(er => {
						console.log("添加失败",er);
						this.submitLoading = false;
						uni.hideLoading();
						uni.showModal({
							content:"系统异常，请稍候再试！",
							confirmText:"确认"
						});
					})
		},
		updateRoomType(){
			DB.callFunction(
							"hm_updateRoomType",
							{
								_id:this.rt._id,
                                roomTypeObj:this.roomTypeForm
							}
						).then(res=>{
                            console.log("修改成功");
                        this.$store.commit("getRoomType");
                        this.$emit('closePopup');
						uni.hideLoading();
							
				}).catch(er => {
						console.log("修改失败",er);
						this.submitLoading = false;
						uni.hideLoading();
						uni.showModal({
							content:"系统异常，请稍候再试！",
							confirmText:"确认"
						});
					})
		}
	}
}

</script>

<style></style>