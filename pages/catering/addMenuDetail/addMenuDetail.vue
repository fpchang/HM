<template>
	<view>
		<scroll-view :scroll-y="true" :scroll-x="false" class="scroll-view" style="">

			<addMenuDetailComponent
			v-if="targetObj"
			@closePopup="closePopup"
			:type="type"
			:targetObj="targetObj"
		  ></addMenuDetailComponent>
		</scroll-view>
	</view>
</template>

<script>
import addMenuDetailComponent from '../components/addMenuDetailComponent.vue'
	export default {
		data() {
			return {
				type:0,
      			targetObj:null
			}
		},
		components:{
			addMenuDetailComponent
		},
		onLoad(obj) {
    console.log("参数传递", obj);
    try {
      this.type = obj.type;
      this.targetObj = JSON.parse(obj.targetObj);
	  console.log("解析",this.targetObj)
      uni.setNavigationBarTitle({
        title: obj.type == "1" ? "修改菜单" : "新增菜单",
      });
    } catch (error) {
		console.log(error)
      this.type = 0;
	  this.targetObj={}
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
	height:100vh;
}
</style>
