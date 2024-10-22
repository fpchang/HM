<template>
  <view>
    <view class="add-content-style">
     <view class="control-panal">
     <u-icon
        name="plus-circle-fill"
        color="#000"
        size="22"
        label="添加景点"
        labelPos="bottom"
        labelSize="12px"
        @click="addScenicSpot"
      ></u-icon>
      <u-icon
        name="share-fill"
        color="#000"
        size="22"
        label="分享至微信"
        labelPos="bottom"
        labelSize="12px"
        @click="shareWx"
      ></u-icon>
    </view>
    </view>
    <view style="display: flex;justify-content:center">
    
        <view class="card-container" :style="{width:`${cardContainerWidth}px`}"> 
          <view class="card" v-for="item of scenicSpotList" :style="{width:`${cardWidth}px`}">
            <view class="card-item">
              <scenicSpotCardComponent :scenicSpot="item" @editScenicSpot="editScenicSpot"></scenicSpotCardComponent>
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
        return this.$store.state.scenicSpotStore.scenicSpotList
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
      return  Math.min(375+ (ys/count),450)
    },
    cardContainerWidth(){
      let count =Math.max(Math.floor(this.viewWidth/this.cardWidth),1) ;
      return this.cardWidth * count
    },
    isPcShow(){
				return this.$store.state.isPcShow;
			}
  },
  async created(){
    await this.$store.dispatch("getScenicSpotList",this.hotel_id);
  },
  methods: {
	  shareWx(){},
    addScenicSpot(item={}){
      if(!this.$store.state.permissionStore.permissionList.includes('SCENICSPOT_CREATE')){
					 this.$alert.alertNoPermisson();
					return;
				}
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
	editScenicSpot(item={}){
    if(!this.$store.state.permissionStore.permissionList.includes('SCENICSPOT_UPDATE')){
					 this.$alert.alertNoPermisson();
					return;
				}
	  this.type=1;
    this.targetObj =item;
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
  watch: {
	  async hotel_id(){
		  await this.$store.dispatch("getScenicSpotList",this.hotel_id);
	  }
  },

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

.card-container{
  display:flex;
  flex-wrap:wrap;
  min-width:375px ;
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