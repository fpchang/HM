<template>
	<view>
		<scroll-view :scroll-y="true" :scroll-x="false" class="scroll-view" style="">

			<addScenicSpotDetailComponent
			@closePopup="closePopup"
			:type="type"
			:scenicSpot="targetObj"
		  ></addScenicSpotDetailComponent>
		</scroll-view>
	</view>
</template>

<script>
import addScenicSpotDetailComponent from '../components/addScenicSpotDetailComponent.vue'
	export default {
		data() {
			return {
				type:0,
      			targetObj:{}
			}
		},
		components:{
			addScenicSpotDetailComponent
		},
		onLoad(obj) {
    console.log("参数传递", obj);
    try {
      this.type = obj.type;
      this.targetObj = JSON.parse(obj.targetObj);
      uni.setNavigationBarTitle({
        title: obj.type == "1" ? "修改景点价目" : "新增景点价目",
      });
    } catch (error) {
      this.type = 0;
    }
  },
		methods: {
			closePopup(){
				uni.navigateBack()
			}
		}
	}
</script>

<style>
.scroll-view {
	padding: 20px 15px;
	box-sizing: border-box;
	height: calc(100vh - 44px)
}
</style>
