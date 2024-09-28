<template>
  <view>
    <view class="add-content-style" style="">
			<view><button class="uni-button" size="mini" type="primary" @click="addScenicSpot()">添加景点</button></view>
		</view>
    <view class="h5" style="padding:40px">
      <view class="card">
       <scenicSpotCardComponent></scenicSpotCardComponent>
      </view>
     
    </view>
    <uni-popup ref="popupScenicSpot" background-color="transprant">
			<view class="popup-content">
				<view class="create-order-title-style">{{type==1?"修改景点":"创建景点"}}</view>
				<view class="comContent">
					
					 <addScenicSpotComponent @closePopup="closePopup" :type="type" :targetObj="targetObj"></addScenicSpotComponent> 
				

				</view>

			</view>
		</uni-popup>
   </view>
</template>

<script>
import scenicSpotCardComponent from "./scenicSpotCardComponent.vue";
import addScenicSpotComponent from "./addScenicSpotComponent.vue";
export default({
  name: "scenicSpotList",
  components:{
    scenicSpotCardComponent,
    addScenicSpotComponent
  },
  props: {},
  data() {
    return {
      type:0,
      targetObj:{}

    }
  },
  computed: {
    isPcShow(){
				return this.$store.state.isPcShow;
			}
  },
  methods: {
    addScenicSpot(){
      this.type=0;
				if(this.$store.state.isPcShow){
					this.$refs.popupScenicSpot.open();
					return;
				}
					
				
				uni.navigateTo({
					url:'/pages/hotelManage/createRoomType/createRoomType'
				})
    }
  },
  watch: {},

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
}) 
</script>

<style scoped lang="scss">
.add-content-style{
  display: flex;justify-content: flex-end;padding:0 20px;box-sizing: border-box;
}
.card{
  max-width: 375px;
  background: #fff;
  padding: 20px 30px;
  box-shadow: 0 0 4px 4px #e4e0e0;
  border-radius: 8px;
  box-sizing:border-box;
}
</style>