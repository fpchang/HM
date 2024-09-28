<template>
  <view>
  <view class="header-style">
    <view class="tit-style"><text style="">大穿越漂流</text></view>
    <view style="flex:1;display:flex;justify-content:flex-end;gap:15px"> 
      <u-icon name="edit-pen-fill" color="#000" size="28" label="编辑" labelPos="bottom" labelSize="12px"></u-icon>    
      <u-icon name="checkmark-circle-fill" color="#000" v-if="isEdit" size="28" label="保存" labelPos="bottom" labelSize="12px"></u-icon>    
      <u-icon name="eye-fill" color="#000" size="28"  label="预览" labelPos="bottom" labelSize="12px"></u-icon>           
      <u-icon name="share-fill" color="#000" size="28" label="分享" labelPos="bottom" labelSize="12px"></u-icon>            
       </view>
  </view>
    
    <uni-section class="mb-10" title="价目表" sub-title="" type="line"></uni-section>
    <view v-for="item in 10"> 
      <uni-row class="uni-row" >
        <uni-col :span="10" class="col-pa">
          <view>
              <text>  
                单人周末价格
              </text>
          </view>
       </uni-col>
        <uni-col :span="10" class="col-pa">
         <view>官方价：<text style="text-decoration:line-through">40元/人</text></view> 
         <view>结算价：<text>40元/人</text></view> 
         <view>出售价：<text>40元/人</text></view> 
        </uni-col>
        <uni-col :span="4" class="col-pa">
          <view class="icon-area">
            <u-icon name="edit-pen-fill" color="#000" size="20" label="" labelPos="bottom" labelSize="12px"></u-icon>
            <u-icon name="trash-fill" color="#000" size="20" label="" labelPos="bottom" labelSize="12px"></u-icon>
          </view>
          
          
        </uni-col>
      </uni-row>
      <u-line></u-line>
    </view>
    
  </view>
</template>
<script>
import Vue from 'vue';
export default Vue.extend({
  name: "scenicSpotCardComponent",
  props: {},
  data() {
    return {
      isEdit:false
    }
  },
  computed: {},
  methods: {},
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
  }
  .icon-area{
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

}
</style>