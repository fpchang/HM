<template>
  <view>
    <scroll-view
      :scroll-y="true"
      :scroll-x="false"
      class="scroll-view"
      style=""
    >
      <createHotelComponent
        v-if="targetObj"
		:targetObj="targetObj"
		:type="type"
        @closePopup="closePopup"
      ></createHotelComponent>
    </scroll-view>
  </view>
</template>

<script>
import createHotelComponent from "../components/createHotelComponent";
export default {
  components: {
    createHotelComponent,
  },
  data() {
    return {
      targetObj: null,
	  type:0
    };
  },
  onLoad(obj) {
    console.log("参数传递", obj);
    try {
      this.type = obj.type;
      this.targetObj = JSON.parse(obj.targetObj);
      uni.setNavigationBarTitle({
        title: obj.type == "1" ? "修改酒店信息" : "新增酒店",
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
  },
};
</script>

<style>
.scroll-view {
  padding: 20px 15px;
  box-sizing: border-box;
  height: 100vh;
}
</style>
