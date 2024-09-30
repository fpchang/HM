<template>
  <view>
    <view class="add-content-style" style="">
			<view><button class="uni-button" size="mini" type="primary" @click="addScenicSpot()">添加景点</button></view>
		</view>
    <view style="display: flex;justify-content:center">
    
        <view class="card-container" :style="{width:`${cardContainerWidth}px`}"> 
          <view class="card" v-for="item of scenicSpotList" :style="{width:`${cardWidth}px`}">
            <view class="card-item">
              <scenicSpotCardComponent :scenicSpot="item" ></scenicSpotCardComponent>
            </view>
            
           </view>
        </view> 
    </view>
    <uni-popup ref="popupScenicSpot" background-color="transprant">
			<view class="popup-content">
				<view class="create-order-title-style">{{type==1?"修改景点":"创建景点"}}</view>
				<view class="comContent">				
					 <addScenicSpotComponent  @closePopup="closePopup" :type="type" :targetObj="targetObj"></addScenicSpotComponent> 
				</view>

			</view>
		</uni-popup>
   </view>
</template>

<script>
import scenicSpotCardComponent from "./scenicSpotCardComponent.vue";
import addScenicSpotComponent from "./addScenicSpotComponent.vue";
import HotelService from '../../../services/HotelService';
export default({
  name: "scenicSpotList",
  components:{
    scenicSpotCardComponent,
    addScenicSpotComponent
  },
  props: {},
  data() {
    return {
      widthTemp:0,
      type:0,
      targetObj:{}

    }
  },
  computed: {
    hotel_id(){
				return this.$store.state.hotel_id;
			},
      scenicSpotList(){
        return this.$scenicSpotStore.state.scenicSpotList
      },
      viewWidth(){
        let viewWidth=uni.getSystemInfoSync().windowWidth||uni.getSystemInfoSync().screenWidth
        return  viewWidth +this.widthTemp-this.widthTemp
    },
   
    cardWidth(){
      let windowWidth = this.viewWidth - 20;//-20 为pc端滚动条宽度
      let count = Math.floor(windowWidth/375);
      if(count==0){
        return windowWidth;
      }
      let ys= windowWidth % 375
      return 375+ (ys/count)
    },
    cardContainerWidth(){
      let count =Math.floor(this.viewWidth/375);
      return this.cardWidth * count
    },
    isPcShow(){
				return this.$store.state.isPcShow;
			}
  },
  created(){
    this.$scenicSpotStore.commit("getScenicSpotList",this.hotel_id);
  },
  methods: {
    addScenicSpot(item={}){
      this.type=0;
				if(this.$store.state.isPcShow){
					this.$refs.popupScenicSpot.open();
					return;
				}
					
				
				uni.navigateTo({
					url:`/pages/scenicSpot/addScenicSpot/addScenicSpot?type=${
          this.type}&&targetObj=${JSON.stringify(item)}`
				})
    },
    closePopup(){
      if(this.$store.state.isPcShow){
        this.$refs.popupScenicSpot.close();
					return;
				}
     uni.navigateBack();
    }
  },
  watch: {},

  // 组件周期函数--监听组件挂载完毕
  mounted() {
    if(window){
      window.onresize=()=>{
      this.widthTemp=Math.random(10);
    }
    }
   
  },
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

.card-container{
  display:flex;
  flex-wrap:wrap;

  .card{
    min-width:375px ;
    max-width: 450px;
    padding:10px;
    box-sizing:border-box;
    .card-item{
      height: 100%;
      box-sizing: border-box;
      background: #fff;
      padding: 10px 20px;
      box-shadow: 0 0 4px 4px #e4e0e0;
      border-radius: 8px;

    }
  }
}

</style>