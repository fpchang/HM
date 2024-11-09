<template>
  <view>
    <uni-forms ref="scenicSpotDetailRef" :modelValue="scenicSpotDetailForm" :rules="scenicSpotDetailRules" label-width="120px">

      <uni-forms-item label="套餐名称"  type="textarea" required name="package_name">
        <uni-easyinput  v-model="scenicSpotDetailForm.package_name" type="textarea" placeholder="套餐名称" />
      </uni-forms-item>

      <uni-forms-item label="官方价格" name="scenicSpot_price">
        <uni-easyinput type="digit" v-model="scenicSpotDetailForm.scenicSpot_price" placeholder="官方价格" />
      </uni-forms-item>
      <uni-forms-item label="结算价格" name="settlement_price">
        <uni-easyinput type="digit" v-model="scenicSpotDetailForm.settlement_price" placeholder="结算价格" />
      </uni-forms-item>
      <uni-forms-item label="销售价格" name="offering_price">
        <uni-easyinput type="digit" v-model="scenicSpotDetailForm.offering_price" placeholder="销售价格" />
      </uni-forms-item>
      <uni-forms-item label="备注" name="mark">
        <uni-easyinput  v-model="scenicSpotDetailForm.mark" type="textarea"  />
      </uni-forms-item>


    </uni-forms>
    <u-button type="success" text="保存" color="#007aff" @click="submitForm()" :disabled="submitDisabled"
      :loading="submitLoading"></u-button>
  </view>
</template>

<script>
import DB from "../../../api/DB.js";
import ScenicSpotService from '../../../services/ScenicSpotService';
export default({
  name: "addScenicSport",
  props: {
    type:0,
    targetObj:{} //新增加为scenicport 数据，修改为scenicportdetail 数据
  },
  //inject:["getSS"],
  data() {
    return {
      submitLoading: false,
      scenicSpotList:[],
      scenicSpotDetailForm:this.type==1?{
        "package_name": this.targetObj.package_name,
        "scenicSpot_price": this.targetObj.scenicSpot_price,
        "settlement_price":this.targetObj.settlement_price,
        "offering_price":this.targetObj.offering_price,
        "mark":this.targetObj.mark
      }:{
        "package_name": "",
        "scenicSpot_price": "",
        "settlement_price":"",
        "offering_price":"",
        "mark":""
      },
      scenicSpotDetailRules:{
        // 对name字段进行必填验证
        package_name: {
          rules: [
            {
              required: true,
              errorMessage: "请输入景点名称",
            }
            
          ]
        },
        settlement_price:{
          rules: [
            {
              validateFunction: (rule, value, data, callback) => {
                if (Number(value)>Number(this.scenicSpotDetailForm.scenicSpot_price)) {
                  callback("结算价不能大于官方价格");
                }
                return true;
              }
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
			},
      scenicSpotDetailFormParse(){
        let {package_name,scenicSpot_price,settlement_price,offering_price,mark}= this.scenicSpotDetailForm;
     
        try {
          return {
        scenicSpot_id:this.targetObj._id._value,
        package_name:package_name,
        scenicSpot_price:Number(scenicSpot_price),
        settlement_price:Number(settlement_price),
        offering_price:Number(offering_price),
        mark:mark
       }
        } catch (error) {
          
        }
       
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
    getScenicSpotList(){
      DB.getCollection("hm-scenicSpot", {
        hotel_id: this.hotel_id,
      })
        .then((res) => {
          this.scenicSpotList= res.result.data;
          uni.hideLoading();
         // this.$emit("closePopup");
         
        })
        .catch((err) => {
          uni.hideLoading();
          uni.showModal({
            content: "系统异常，请稍候再试！",
            confirmText: "确认",
          });
        });
    },
    submitForm(){
      this.$refs.scenicSpotDetailRef.validate().then((res) => {
        //uni.showLoading();
        this.submitLoading = true;
        this.scenicSpotDetailForm.scenicSpot_id = this.targetObj._id;
        if(this.type==1){
          this.editScenicSpotDetail();
          return;
        }
       this.addScenicSpotDetail();
      });
    },
    addScenicSpotDetail(){
      ScenicSpotService.addScenicSpotDetail(this.scenicSpotDetailFormParse)
          .then(async (res) => {
            console.log("添加成功");
           await this.$store.dispatch("getScenicSpotList",this.hotel_id);
            this.$emit("closePopup");
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
    editScenicSpotDetail(){
      ScenicSpotService.editScenicSpotDetail({
        _id:this.targetObj._id,
        scenicSpotPriceDetail:this.scenicSpotDetailFormParse
      })
          .then(async (res) => {
            console.log("修改成功");
           await this.$store.dispatch("getScenicSpotList",this.hotel_id);
            this.$emit("closePopup");
            this.submitLoading = false;
            uni.hideLoading();
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