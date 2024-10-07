<template>
  <view>
    <uni-forms ref="menuDetailRef" :modelValue="menuDetailForm" :rules="menuDetailRules" label-width="120px">

      <uni-forms-item label="菜名"  type="textarea" required name="name">
        <uni-easyinput  v-model="menuDetailForm.name" type="textarea" placeholder="菜名" />
      </uni-forms-item>

      <uni-forms-item label="价格" name="price">
        <uni-easyinput type="digit" v-model="menuDetailForm.price" placeholder="价格" />
      </uni-forms-item>
      <uni-forms-item label="正常供应" name="isOffer">
        <!-- <checkbox @change="isOfferChange()" :checked="menuDetailForm.isOffer" />正常供应 -->
         <view style="display:flex;align-items:center;height:100%"> 
          <radio-group @change="isOfferChange">
            <radio value="1" :checked="menuDetailForm.isOffer" /><text style="padding-right:10px">是</text>
            <radio value="0" :checked="!menuDetailForm.isOffer" /><text style="padding-right:10px">否</text>
          </radio-group>
         </view>
        
      </uni-forms-item>
      <uni-forms-item label="备注" name="mark">
        <uni-easyinput  v-model="menuDetailForm.mark" type="textarea" placeholder="" />
      </uni-forms-item>


    </uni-forms>
    <u-button type="success" text="保存" color="#007aff" @click="submitForm()" :disabled="submitDisabled"
      :loading="submitLoading"></u-button>
  </view>
</template>
</template>

<script>
import MenuService from '../../../services/MenuService';
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
      menuList:[],
      menuDetailForm:this.type==1?{
       // "menuType_id":this.targetObj.menuType_id,
        "name": this.targetObj.name,
        "price": this.targetObj.price,
        "isOffer":this.targetObj.isOffer,
        "mark":this.targetObj.mark
      }:{
        "name": "",
        "price": "",
        "isOffer":true,
        "mark":""
      },
      menuDetailRules:{
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
                if (Number(value)>Number(this.menuDetailForm.price)) {
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
      menuDetailFormParse(){
        let {name,price,isOffer,mark}= this.menuDetailForm;
       return {
        menuType_id:this.targetObj._id._value,
        name:name,
        isOffer:isOffer,
        price:Number(price),
        mark:mark
       }
      }
   
  },

  watch: {},
  created(){
    //this.getMenuTypeList();
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
    isOfferChange(e){
      console.log(e)
      let {value} = e.detail;
      this.menuDetailForm.isOffer = value==1?true:false;
    },
    submitForm(){
      this.$refs.menuDetailRef.validate().then((res) => {
        uni.showLoading();
        this.submitLoading = true;
        this.menuDetailForm.menuType_id = this.targetObj._id;
        
       console.log("222",this.menuDetailFormParse,this.targetObj)
        if(this.type==1){
          this.editMenuDetail();
          return;
        }
       this.addMenuDetail();
      });
    },
    addMenuDetail(){
     
      MenuService.addMenuDetail(this.menuDetailFormParse)
          .then((res) => {
            console.log("添加成功");
            this.$menuStore.commit("getMenuList",this.hotel_id);
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
    editMenuDetail(){
      MenuService.editMenuTypeDetail({
        _id:this.targetObj._id,
        menuDetail:this.menuDetailFormParse
      })
          .then((res) => {
            console.log("修改成功");
            this.$menuStore.commit("getMenuList",this.hotel_id);
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