<template>
  <view>
    <view style="display:flex;justify-content:flex-end;gap:15px"> 
      <u-icon name="edit-pen-fill" color="#000" size="28" label="编辑" labelPos="bottom" labelSize="12px"></u-icon>    
      <u-icon name="checkmark-circle-fill" color="#000" v-if="isEdit" size="28" label="保存" labelPos="bottom" labelSize="12px"></u-icon>    
      <u-icon name="eye-fill" color="#000" size="28"  label="预览" labelPos="bottom" labelSize="12px"></u-icon>           
      <u-icon name="share-fill" color="#000" size="28" label="分享" labelPos="bottom" labelSize="12px"></u-icon>       
      
       </view>
    <uni-section class="mb-10" title="特色菜" sub-title="" type="line"></uni-section>
    <uni-row class="uni-row">
      <uni-col :span="12" v-for="(index,item) in 30" class="col-pa">
        <view class="uni-col-item">
          <view style="flex:1">
            <view class="menu-label-style">
              <text style="font-size:14px">土豆丝{{index}}</text>
              <text>30元</text>
            </view>
            <view class="control-style" v-if="isEdit">               
              <view>
                <uni-data-checkbox multiple   :localdata=" [{
                  text: '暂停供应',
                  value: 1
                }]" ></uni-data-checkbox>
              </view>
              <view><text>删除</text></view>
            </view>
            
          </view>
          
        </view>
      </uni-col>
   
    </uni-row>
  </view>
</template>

<script>
export default({
  name: "menuComponent",
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

<style lang="scss">
.uni-row{
  .col-pa{
    .uni-col-item{
      min-height:35px ;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding: 0 10px;
     
      .menu-label-style{
        display:flex;align-items:center;justify-content: space-between;
        font-size: 14px;
        font-weight: bold
      };
      .control-style{
        display:flex;align-items:center;justify-content: space-between;
        font-size: 12px;
        padding: 10px 0;
        color: $font-color-control;
      }
      
    };
    &:nth-child(odd){
      .uni-col-item{
        padding-right: 20px;
      }
    };
    &:nth-child(even){
      .uni-col-item{
        padding-right: 20px;
      }
    }
  }

}
</style>