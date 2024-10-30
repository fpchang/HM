<template>
  <view>
    <scroll-view
      :scroll-y="true"
      :scroll-x="false"
      class="scroll-view"
      style=""
    >
      <createRoomTypeComponent
        @closePopup="closePopup"
        :type="type"
        :rt="targetObj"
        v-if="targetObj"
      ></createRoomTypeComponent>
    </scroll-view>
  </view>
</template>

<script>
import createRoomTypeComponent from "../components/createRoomTypeComponent.vue";
export default {
  components: {
    createRoomTypeComponent,
  },
  data() {
    return {
      type: 0,
      targetObj: null,
    };
  },
  onLoad(obj) {
    console.log("参数传递", obj);
    try {
      this.type = obj.type;
      this.targetObj = JSON.parse(obj.rt);
      uni.setNavigationBarTitle({
        title: obj.type == "1" ? "修改房型" : "创建房型",
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
  height: calc(100vh - 44px);
}
</style>
