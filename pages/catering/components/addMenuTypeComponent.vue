<template>
  <view>
    <uni-forms ref="scenicSpotRef" :modelValue="menuTypeForm" :rules="scenicSpotRules" label-width="120px">
      <uni-forms-item label="分类名称" required name="name">
        <uni-easyinput v-model="menuTypeForm.name" placeholder="菜单名称" />
      </uni-forms-item>
     
      <uni-forms-item label="备注" name="mark">
        <uni-easyinput v-model="menuTypeForm.mark" type="textarea"  />
      </uni-forms-item>


    </uni-forms>
    <u-button type="success" text="保存" color="#007aff" @click="submitForm()" :disabled="submitDisabled"
      :loading="submitLoading"></u-button>
  </view>
</template>
</template>

<script>
import MenuService from "../../../services/MenuService.js"
export default({
  name: "addMenuType",
  //inject:['getSS'],
  props: {
    type:0,
    targetObj:{}
  },
  data() {
    return {
      submitLoading: false,
      scenicSpotList:[],
      menuTypeForm:this.type==1?{
        "name": this.targetObj.name,
        "mark": this.targetObj.mark,
      }:{
        "name": ""
      },
      scenicSpotRules:{
        // 对name字段进行必填验证
        name: {
          rules: [
            {
              required: true,
              errorMessage: "请输入分类名称",
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
	 // console.log("111111",this.targetObj)
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
        console.log(this.menuTypeForm);
        //uni.showLoading();
        this.submitLoading = true;
        this.menuTypeForm.hotel_id = this.hotel_id;
        if(this.type==1){
          this.editMenuType();
          return;
        }
       this.addMenuType();
      });
    },
    addMenuType(){
      MenuService.addMenuType(this.menuTypeForm)
          .then((res) => {
            console.log("添加成功");
            this.$emit("closePopup");
            this.$store.commit("getMenuList");
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
    editMenuType(){
      MenuService.editMenuType(this.targetObj._id._value,this.menuTypeForm)
          .then((res) => {
            console.log("修改成功");
            this.$store.menuStorecommit("getMenuList",this.hotel_id);
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