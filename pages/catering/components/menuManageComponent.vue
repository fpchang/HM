<template>
 <view>
  <view class="h5" style="padding:40px">
    <view class="menuCard">
     <menuComponent></menuComponent>
    </view>
   
  </view>
 
 </view>
</template>

<script>
import menuComponent from "./menuComponent"
export default({
  name: "menuManageComponent",
  components:{
    menuComponent
  },
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

<style lang="scss" scoped>

.menuCard{
  max-width: 375px;
  background: #fff;
  padding: 20px 30px;
  box-shadow: 0 0 4px 4px #e4e0e0;
  border-radius: 8px;
  box-sizing:border-box;
}

</style>