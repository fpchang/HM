<template>
  <view>
    <scroll-view :scroll-y="true" :scroll-x="false" class="scroll-view" style="">
			<addEmployeeComponent @closePopup="closePopup" :type="type" :em="em" v-if="em"></addEmployeeComponent>
		</scroll-view>
  </view>
</template>

<script>
import addEmployeeComponent from "../components/addEmployeeComponent"
export default({
  components: {
    addEmployeeComponent
  },
  data() {
    return {
      em:null,
      type:0
    }
  },
  computed: {},
  methods: {
    closePopup(){
				uni.navigateBack();
			}
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad(obj) {
    console.log("参数传递",obj);
    try {
      this.type= obj.type;
      this.em = JSON.parse(obj.em);
      uni.setNavigationBarTitle({title:obj.type=="1"?"修改员工信息":"新增员工",})
    } catch (error) {
      this.type=0;
      this.em={}
    }
    
  },
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {},
  // 页面周期函数--监听页面隐藏
  onHide() {},
  // 页面周期函数--监听页面卸载
  onUnload() {},
  // 页面处理函数--监听用户下拉动作
  // onPullDownRefresh() { uni.stopPullDownRefresh(); },
  // 页面处理函数--监听用户上拉触底
  // onReachBottom() {},
  // 页面处理函数--监听页面滚动(not-nvue)
  // onPageScroll(event) {},
  // 页面处理函数--用户点击右上角分享
  // onShareAppMessage(options) {},
}) 
</script>

<style>
.scroll-view {
	padding: 20px 15px;
	box-sizing: border-box;
	height:100vh;
}
</style>