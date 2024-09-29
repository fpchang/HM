<template>
  <view>
  <view class="header-style">
    <view class="tit-style"><text style="">{{scenicSpot.scenicSport_name}}</text></view>
    <view style="flex:1;display:flex;justify-content:flex-end;gap:15px"> 
      
      <u-icon name="plus-circle-fill" color="#000" size="22" label="添加" labelPos="bottom" labelSize="12px" @click="addScenicSpotDetail"></u-icon> 
      <u-icon name="trash-fill" color="#000" size="22" label="删除" labelPos="bottom" labelSize="12px"></u-icon>   
      <u-icon name="edit-pen-fill" color="#000" size="22" label="编辑" labelPos="bottom" labelSize="12px"></u-icon>    
      <u-icon name="checkmark-circle-fill" color="#000" v-if="isEdit" size="22" label="保存" labelPos="bottom" labelSize="12px"></u-icon>    
      <u-icon name="eye-fill" color="#000" size="22"  label="预览" labelPos="bottom" labelSize="12px"></u-icon>           
      <u-icon name="share-fill" color="#000" size="22" label="分享" labelPos="bottom" labelSize="12px"></u-icon>            
     
    </view>
  </view>
    <uni-section class="mb-10" title="价目表" sub-title="" type="line"></uni-section>
    <view v-for="item of scenicSpot._id['hm-scenicSpotPriceDetail']"> 
      <uni-row class="uni-row" >
        <uni-col :span="10" class="col-pa">
          <view>
              <text>  
                {{ item.package_name }}
              </text>
          </view>
       </uni-col>
        <uni-col :span="10" class="col-pa">
         <view class="pr-item">官方价：<text style="text-decoration:line-through">{{item.scenicSpot_price}}元</text></view> 
         <view class="pr-item">结算价：<text>{{item.settlement_price}}元</text></view> 
         <view class="pr-item">出售价：<text>{{item.offering_price}}元</text></view> 
        </uni-col>
        <uni-col :span="4" class="col-pa" v-if="isEdit">
          <view class="icon-area" >
            <u-icon name="edit-pen-fill" color="#000" size="20" label="" labelPos="bottom" labelSize="12px"></u-icon>
            <u-icon name="trash-fill" color="#000" size="20" label="" labelPos="bottom" labelSize="12px"></u-icon>
          </view>         
        </uni-col>
      </uni-row>
      <u-line></u-line>
    </view>
    <uni-popup ref="popupScenicSpotDetail" background-color="transprant">
			<view class="popup-content">
				<view class="create-order-title-style">{{type==1?"修改套餐":"创建套餐"}}</view>
				<view class="comContent">				
					 <addScenicSpotDetailComponent  @closePopup="closePopup" :type="type" :scenicSpot="scenicSpot"></addScenicSpotDetailComponent> 
				</view>

			</view>
		</uni-popup>
  </view>
</template>
<script>
import addScenicSpotDetailComponent from './addScenicSpotDetailComponent'
export default({
  name: "scenicSpotCardComponent",
  props: {
    scenicSpot:Object
  },
  components:{
    addScenicSpotDetailComponent
  },
  inject:["getSS"],
  data() {
    return {
      type:0,
      isEdit:false
    }
  },
  computed: {
    scenicSpot_id(){
      return this.scenicSpot._id
    }
  },
  
  watch: {
    scenicSpot_id(){
     
    }
  },
  methods: {
    addScenicSpotDetail(targetObj){
      this.type=0;
      this.targetObj=targetObj;
      if(this.$store.state.isPcShow){
					this.$refs.popupScenicSpotDetail.open();
					return;
				}
					
				
				uni.navigateTo({
					url:'/pages/scenicSpot/addSencicSpotDetail'
				})
    },
    editScenicSpotDetail(targetObj){
      this.type=1;
      this.targetObj=targetObj;
    },
    closePopup(){   
      if(this.$store.state.isPcShow){
        this.$refs.popupScenicSpotDetail.close();
        return;
        
      }
      uni.navigateBack()
    }
  },
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
.header-style{
  display:flex;align-items:center;justify-content:space-between;
  .tit-style{
    font-weight:bold;
    color:$uni-color-title
  }
};
.uni-row{
  display: flex;
  align-items: center;
  min-height: 35px;
  padding: 10px 0;
  .col-pa{
    font-size: 12px;
    .pr-item{
      padding:5px 0;
      &:nth-child(1){
        color: #d1d0d0;
      }
      &:nth-child(2){
        color: #9d2525;
      }
      &:nth-child(3){
        color: #265c34;
      }
    }
  }
  .icon-area{
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

}
</style>