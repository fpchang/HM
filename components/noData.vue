<template>
  <view class="noData">
    <view><image src="https://env-00jxhfhjd231.normal.cloudstatic.cn/HM/images/data.png" /> </view>

      <view class="flex-center">
        <text style="color:#bbb">{{ text_content_foramt}}</text>
        <view class="flex-center control" v-if="showControl" @click="Event_one"> 
          <uni-icons type="plusempty" size="30" color='$font-color-control'></uni-icons>
          <text>{{text_control_add_fromat}}</text>
        </view>
         
        </view>
  </view>
</template>

<script>
export default({
  name: "noData",
  props: {
    text_content:String,
    showControl:Boolean,
    text_control_add:String
  },
  data() {
    return {
      
    }
  },
  computed: {
    text_content_foramt(){
      return this.text_content?this.text_content:"没有数据";
    },
    text_control_add_fromat(){
      return this.text_control_add?this.text_control_add:"创建新的";
    }
  },
  methods: {
    Event_one(){
      this.$emit("Event_one");
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
.noData{
  width: 100%;
  height: 100%;
  min-height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .control{
    padding-left: 20px;
    color:$font-color-control;
    &:hover{
      color:$font-color-control-hover;
      cursor: pointer;
    }
  }
}
</style>