<template>
  <view>
	<scroll-view :scroll-y="true" :scroll-x="false" class="scroll-view" style="">
    <addMenuTypeComponent
      v-if="targetObj"
      @closePopup="closePopup"
      :type="type"
      :targetObj="targetObj"
    ></addMenuTypeComponent>
</scroll-view>
  </view>
</template>

<script>
import addMenuTypeComponent from "../components/addMenuTypeComponent.vue";
export default {
  components: {
    addMenuTypeComponent,
  },
  data() {
    return {
		    type:0,
      	targetObj:null
	};
  },
//   provide(){
//     return{
//       getSS:()=>{
//        this.getMenuTypeList()
//     }
//     }
//   },
  onLoad(obj) {
    console.log("参数传递", obj);
    try {
      this.type = obj.type;
      this.targetObj = JSON.parse(obj.targetObj);
      uni.setNavigationBarTitle({
        title: obj.type == "1" ? "修改菜单分类" : "新增菜单分类",
      });
    } catch (error) {
      this.type = 0;
      this.targetObj={}
    }
  },
  methods: {
    closePopup() {
		uni.navigateBack();
	},
	async getMenuTypeList(){
      console.log("刷新getMenuTypeList列表");
      try {
        const res = await   HotelService.getMenuTypeList(this.hotel_id);
        console.log("景点列表",res)
        this.menuTypeList=res.result.data;
        uni.hideLoading();
       // this.$emit("closePopup");
      } catch (error) {
        console.error(error);
        uni.hideLoading();
          uni.showModal({
            content: "系统异常，请稍候再试！",
            confirmText: "确认",
          });
      }
    }
  },
};
</script>

<style>
.scroll-view {
	padding: 20px 15px;
	box-sizing: border-box;
	height:100vh
}
</style>
