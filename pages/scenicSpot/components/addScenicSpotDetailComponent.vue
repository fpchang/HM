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
      <uni-forms-item label="备注" name="scenicSport_mark">
        <uni-easyinput  v-model="scenicSpotDetailForm.scenicSport_mark" type="textarea" placeholder="" />
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
  props: {
    type:0,
    scenicSpot:{}
  },
  //inject:["getSS"],
  data() {
    return {
      submitLoading: false,
      scenicSpotList:[],
      scenicSpotDetailForm:this.type==1?{
        "package_name": targetOjb.package_name,
        "scenicSpot_price": targetOjb.scenicSpot_price,
        "settlement_price":targetOjb.settlement_price,
        "offering_price":targetOjb.offering_price,
        "mark":targetOjb.scenicSport_mark
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
       return {
        scenicSpot_id:this.scenicSpot._id._value,
        package_name:package_name,
        scenicSpot_price:Number(scenicSpot_price),
        settlement_price:Number(settlement_price),
        offering_price:Number(offering_price),
        mark:mark
       }
      }
   
  },

  watch: {},
  created(){
    //this.getScenicSpotList();
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
          console.log("ree>>>>", res);
          this.scenicSpotList= res.data;
          uni.hideLoading();
         // this.$emit("closePopup");
         
        })
        .catch((err) => {
          console.error(err);
          uni.hideLoading();
          uni.showModal({
            content: "系统异常，请稍候再试！",
            confirmText: "确认",
          });
        });
    },
    submitForm(){
      this.$refs.scenicSpotDetailRef.validate().then((res) => {
        console.log(this.scenicSpotDetailForm);
        uni.showLoading();
        this.submitLoading = true;
        this.scenicSpotDetailForm.scenicSpot_id = this.scenicSpot._id;
        
       console.log("222",this.scenicSpotDetailFormParse,this.scenicSpot)
        if(this.type==1){
         // this.editScenicSpot();
          return;
        }
       this.addScenicSpotDetail();
      });
    },
    addScenicSpotDetail(){
      DB.callFunction("hm_addScenicSpotDetail", {
        scenicSpotDetailObj: this.scenicSpotDetailFormParse,
        })
          .then((res) => {
            console.log("添加成功");
            this.$scenicSpotStore.commit("getScenicSpotList",this.hotel_id);
            this.$emit("closePopup");
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
          _id:this.em._id,
          employeeObj: this.employeeForm,
        })
          .then((res) => {
            console.log("修改成功");
            this.getScenicSpotList();
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