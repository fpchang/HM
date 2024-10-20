<template>
  <view>
    <uni-forms ref="scenicSpotRef" :modelValue="scenicSpotForm" :rules="scenicSpotRules" label-width="120px">
      <uni-forms-item label="景点名称" required name="scenicSport_name">
        <uni-easyinput v-model="scenicSpotForm.scenicSport_name" placeholder="景点名称" />
      </uni-forms-item>
      <uni-forms-item label="景点地址" name="scenicSport_address">
        <uni-easyinput v-model="scenicSpotForm.scenicSport_address" placeholder="景点地址" />
      </uni-forms-item>
      <uni-forms-item label="景点联系人" name="scenicSport_user">
        <uni-easyinput v-model="scenicSpotForm.scenicSport_user" placeholder="景点联系人" />
      </uni-forms-item>
      <uni-forms-item label="景点联系电话" name="scenicSport_phone">
        <uni-easyinput  maxlength="11" type="number" v-model="scenicSpotForm.scenicSport_phone" placeholder="景点联系电话" />
      </uni-forms-item>
      <uni-forms-item label="备注" name="scenicSport_mark">
        <uni-easyinput v-model="scenicSpotForm.scenicSport_mark" type="textarea" placeholder="" />
      </uni-forms-item>


    </uni-forms>
    <u-button type="success" text="保存" color="#007aff" @click="submitForm()" :disabled="submitDisabled"
      :loading="submitLoading"></u-button>
  </view>
</template>
</template>

<script>
import DB from "../../../api/DB.js";
export default({
  name: "addScenicSport",
  //inject:['getSS'],
  props: {
    type:0,
    targetObj:{}
  },
  data() {
    return {
      submitLoading: false,
      scenicSpotList:[],
      scenicSpotForm:this.type==1?{
        "scenicSport_name": this.targetObj.scenicSport_name,
        "scenicSport_address": this.targetObj.scenicSport_address,
        "scenicSport_user":this.targetObj.scenicSport_user,
        "scenicSport_phone":this.targetObj.scenicSport_phone,
        "scenicSport_mark":this.targetObj.scenicSport_mark
      }:{
        "scenicSport_name": "",
        "scenicSport_address": "",
        "scenicSport_user":"",
        "scenicSport_phone":"",
        "scenicSport_mark":""
      },
      scenicSpotRules:{
        // 对name字段进行必填验证
        scenicSport_name: {
          rules: [
            {
              required: true,
              errorMessage: "请输入景点名称",
            }
            
          ]
        }
      }
    }
   
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

  watch: {},
  created(){

  },
// 组件周期函数--监听组件挂载完毕
mounted() {},
// 组件周期函数--监听组件数据更新之前
beforeUpdate() {},
// 组件周期函数--监听组件数据更新之后
updated() {},
// 组件周期函数--监听组件激活(显示)
activated() {},
// 组件周期函数--监听组件停用(隐藏)
deactivated() {},
// 组件周期函数--监听组件销毁之前
beforeDestroy() {},
  methods: {
    submitForm(){
      this.$refs.scenicSpotRef.validate().then((res) => {
        uni.showLoading();
        this.submitLoading = true;
        this.scenicSpotForm.hotel_id = this.hotel_id;
        if(this.type==1){
          this.editScenicSpot();
          return;
        }
       this.addScenicSpot();
      });
    },
    addScenicSpot(){
      DB.callFunction("hm_addScenicSpot", {
        scenicSpotObj: this.scenicSpotForm,
        })
          .then(async (res) => {
            console.log("添加成功");
            this.$emit("closePopup");
            await this.$scenicSpotStore.dispatch("getScenicSpotList",this.hotel_id);
            this.submitLoading = false;
            uni.hideLoading();
          })
          .catch((er) => {
            console.log("添加失败", er);
            this.submitLoading = false;
            uni.hideLoading();
            uni.showModal({
              content: "系统异常，请稍候再试！",
              confirmText: "确认",
            });
          });
    },
    editScenicSpot(){
      DB.callFunction("hm_editScenicSpot", {
          _id:this.targetObj._id._value,
          scenicSpotObj: this.scenicSpotForm
        })
          .then(async (res) => {
            console.log("修改成功");
            await this.$scenicSpotStore.dispatch("getScenicSpotList",this.hotel_id);
            this.submitLoading = false;
            uni.hideLoading();
            this.$emit("closePopup");
          })
          .catch((er) => {
            console.log("修改失败", er);
            this.submitLoading = false;
            uni.hideLoading();
            uni.showModal({
              content: "系统异常，请稍候再试！",
              confirmText: "确认",
            });
          });
    }
  }
 
}) 
</script>

<style scoped></style>