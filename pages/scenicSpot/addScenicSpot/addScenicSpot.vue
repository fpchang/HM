<template>
  <view>
	<scroll-view :scroll-y="true" :scroll-x="false" class="scroll-view" style="">
    <addScenicSpotComponent
      @closePopup="closePopup"
      :type="type"
      :targetObj="targetObj"
    ></addScenicSpotComponent>
</scroll-view>
  </view>
</template>

<script>
import addScenicSpotComponent from "../components/addScenicSpotComponent.vue";
export default {
  components: {
    addScenicSpotComponent,
  },
  data() {
    return {
		type:0,
      	targetObj:{}
	};
  },
//   provide(){
//     return{
//       getSS:()=>{
//        this.getScenicSpotList()
//     }
//     }
//   },
  onLoad(obj) {
    console.log("参数传递", obj);
    try {
      this.type = obj.type;
      this.targetObj = JSON.parse(obj.targetObj);
      uni.setNavigationBarTitle({
        title: obj.type == "1" ? "修改景点信息" : "新增景点",
      });
    } catch (error) {
      this.type = 0;
    }
  },
  methods: {
    closePopup() {
		uni.navigateBack();
	},
	async getScenicSpotList(){
      console.log("刷新getScenicSpotList列表");
      try {
        const res = await   HotelService.getScenicSpotList(this.hotel_id);
        console.log("景点列表",res)
        this.scenicSpotList=res.result.data;
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
	height: calc(100vh - 44px)
}
</style>
