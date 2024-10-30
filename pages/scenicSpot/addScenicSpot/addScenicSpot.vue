<template>
  <view>
	<scroll-view :scroll-y="true" :scroll-x="false" class="scroll-view" style="">
    <addScenicSpotComponent
      v-if="targetObj"
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
    targetObj:null
	};
  },

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
      this.targetObj={}
    }
  },
  methods: {
    closePopup() {
		uni.navigateBack();
	}
  }
};
</script>

<style>
.scroll-view {
	padding: 20px 15px;
	box-sizing: border-box;
	height:100vh;
}
</style>
