<template>
  <view class="menuOrderCardComponent">
    <view class="header-style">
      <view class="tit-style"
        ><text style="">{{ orderDishesItem.userName }} </text></view
      >
      <view
        style="flex: 1; display: flex; justify-content: flex-end; gap: 15px"
      >
      
        <u-icon
          name="trash-fill"
          color="#000"
          size="22"
          label="撤销订单"
          labelPos="bottom"
          labelSize="12px"
          @click="deleteOrderDishes"
        ></u-icon>

      </view>
    </view>
    <!-- <uni-section class="mb-10" title="价目表" type="line"></uni-section> -->
    <view class="card-nav">
      <view class="card-nav-item">
        <view class="tit"><text>就餐日期:</text></view
        ><view style="flex: 1" class="text-overflow-ellipsis"
          ><text class="add-text-style" >{{ orderDishesItem.mealDate }}</text></view
        ></view
      >
      <view class="card-nav-item">
        <view class="tit"> <text>联系电话:</text></view>
        <view style="flex: 1" class="text-overflow-ellipsis">
          【
          <text
            @click="makePhoneCallEvent(orderDishesItem.phone)"
            class="phone-style"
            >{{ orderDishesItem.phone }}</text
          >】
        </view>
      </view>
    </view>
    <view  class="menu-detail-content" >
      <view class="menu-detail-content-item" v-for="item of orderDishesItem.checkMenuList" >
        <text class="itx-n">{{item.name}}<text v-if="item.checkCount>1">（{{item.checkCount}}）</text></text>
        <view style="display: flex;"> 
          <text class="itx-p">￥{{item.price *item.checkCount}} </text>
   
          <view class="icon-area">
            <u-icon
            v-if="isEdit"
              name="edit-pen-fill"
              color="#000"
              size="22"
              labelPos="bottom"
              labelSize="12px"
              @click="editMenuDetail(item)"
            ></u-icon>
            <u-icon
            v-if="isEdit"
              name="trash-fill"
              color="#000"
              size="22"
              labelPos="bottom"
              labelSize="12px"
              @click="deleteMenuDetail(item)"
            ></u-icon>
          </view>
        </view>
        
            
      </view>
       
    </view>
    <view class="card-bottom">
      <view class="priceTotal"> <text style="font-weight:bold">总价:</text> <text style="color:#ff0000;padding:0 8px">￥{{totalPrice}}</text></view>
     
    </view>
 
    <!-- <uni-popup ref="popupMenuDetail" background-color="transprant">
      <view class="popup-content">
        <view class="create-order-title-style">{{
          type == 1 ? "修改菜单" : "创建菜单"
        }}</view>
        <view class="comContent">
          <addMenuDetailComponent
            @closePopup="closePopup"
            :type="type"
            :targetObj="targetObj"
          ></addMenuDetailComponent>
        </view>
      </view>
    </uni-popup> -->
  </view>
</template>
<script>
//import addMenuDetailComponent from "./addMenuDetailComponent";
import MenuService from "../../../services/MenuService";
export default {
  name: "menuOrderCardComponent",
  props: {
    orderDishesItem: Object,
  },
  components: {
   // addMenuDetailComponent,
  },
  data() {
    return {
      submitLoading:false,
      type: 0,
      isEdit: false,
      targetObj: {},
    };
  },
  computed: {
    order_id() {
      return this.orderDishesItem._id;
    },
    totalPrice(){
      let totalprice=0;
      try {
        this.orderDishesItem.checkMenuList.map(item=>{
        totalprice+= (item.price * item.checkCount)
      });
      return totalprice;
      } catch (error) {
        return 0;
      }
      
    }
  },

  watch: {
    order_id() {},
  },
  filter:{
    formatMealType(val){
      return val=='lunch'?'午餐':'晚餐';
    }
  },
  methods: {
    shareWx() {
      uni.share({
        provider: "weixin", //分享服务提供商（即weixin|qq|sinaweibo）
        type: 0, //图文
        scene: "WXSceneSession", //provider 为 weixin 时必选 WXSceneSession分享到聊天界面，WXSceneTimeline分享到朋友圈，WXSceneFavorite分享到微信收藏
        title: "民宿点菜", //分享内容的标题
        summary: "点菜内容", //分享内容的摘要
        href: "https://env-00jxh1m2dpmq-static.normal.cloudstatic.cn/index.html#/pages/catering/orderDishes/orderDishes?user=123", //跳转链接，type 为 0 时必选
        imageUrl: "", //图片地址，type 为 0、2、5 时必选
        success(res) {
          //成功返回的参数
          console.log(res);
        },
        fail(err) {
          //失败返回的参数
          console.log(err);
        },
      });
    },
    moreControl(){
      this.isEdit = !this.isEdit
    },
    addMenuDetail() {
      this.type = 0;
      this.targetObj = this.orderDishesItem;
      if (this.$store.state.isPcShow) {
        this.$refs.popupMenuDetail.open();
        return;
      }
      uni.navigateTo({
        url: `/pages/catering/addMenuDetail/addMenuDetail?type=${
          this.type
        }&&targetObj=${JSON.stringify(this.orderDishesItem)}`,
      });
    },
    editMenuDetail(item) {
      this.type = 1;
      this.targetObj = item;
      if (this.$store.state.isPcShow) {
        this.$refs.popupMenuDetail.open();
        return;
      }
      uni.navigateTo({
        url: `/pages/catering/addMenuDetail/addMenuDetail?type=${
          this.type
        }&&targetObj=${JSON.stringify(item)}`,
      });
    },
    async deleteMenuDetail(item) {
      console.log(item);
      if (!this.order_id) {
        return;
      }
      const conf = await uni.showModal({
        title: "确认删除菜名",
        content: "删除后无法恢复,确认删除吗?",
        cancelText: "取消",
        confirmText: "确认",
      });
      if (conf["cancel"]) {
        return;
      }
      uni.showLoading();
      try {
        const res = await MenuService.removeMenuDetail(item._id);
        console.log("删除成功");
        this.$menuStore.commit("getMenuList", this.hotel_id);
      } catch (error) {
        console.log("删除失败", error);
      }
    },
    editMenuType() {
      this.$emit("editMenuType", this.orderDishesItem);
    },

    // editMenuTypeDetail(){
    //   this.type=1;
    //   if(this.$store.state.isPcShow){
    // 			this.$refs.popupMenuTypeDetail.open();
    // 			return;
    // 		}
    //     uni.navigateTo({
    // 			url:`/pages/orderDishesItem/addMenuDetail/addMenuDetail?type=${
    //       this.type}&&targetObj=${JSON.stringify(this.orderDishesItem)}`
    // 		})
    // },
    async deleteOrderDishes() {
      if (!this.order_id) {
        return;
      }
      const conf = await uni.showModal({
        title: "确认删除订单",
        content: "删除后无法恢复,确认删除吗?",
        cancelText: "取消",
        confirmText: "确认",
      });
      if (conf["cancel"]) {
        return;
      }
      uni.showLoading();
      this.submitLoading = true;
      try {
        const res = await MenuService.removeOrderDishes(
          this.order_id
        );
        console.log("删除成功");
        this.submitLoading = false;
        this.$emit("getOrderDishesList")
      } catch (error) {
        console.log("添加失败", er);
            this.submitLoading = false;
            uni.hideLoading();
          //   uni.showModal({
          //     content: "系统异常，请稍候再试！",
          //     confirmText: "确认",
          //   });
          // });
      }
    },
    closePopup() {
      if (this.$store.state.isPcShow) {
        this.$refs.popupMenuDetail.close();
        return;
      }
      uni.navigateBack();
    },
    addressEvent(address){
      uni.setClipboardData({
        data: address,
        success: function () {
          console.log("success");
        },
      });
    },
    //手机则拨打电话，其它设备复制
    makePhoneCallEvent(phone) {
      

      let deviceType = uni.getSystemInfoSync().deviceType;
      if (deviceType == "phone") {
        uni.makePhoneCall({
          phoneNumber: phone, //仅为示例
          success: (success) => {
            console.log("调用成功", success);
          },
        });
        return;
      }
      uni.setClipboardData({
        data: phone,
        success: function () {
          console.log("success");
        },
      });
    },
  },
  // 组件周期函数--监听组件挂载完毕
  mounted() {
   
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
};
</script>

<style scoped lang="scss">
.menuOrderCardComponent{
  height: 100%;
  display: flex;
  flex-direction: column;
}
.header-style {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .tit-style {
    font-weight: bold;
    color: $uni-color-title;
  }
}
.card-bottom{
  flex: 1;
  display: flex;
  align-items: end;
}
.card-nav{
  .card-nav-item {
    height: 30px;
    display: flex;
    align-items: center;
    font-size: $uni-font-size-base;
    .tit {
      width: 60px;
      font-weight: bold;
      padding-right: 12px;
    }
    .add-text-style{
      color: $font-color-control;
      &:hover {
        color: $font-color-control-hover;
      }
    };
    .phone-style {
      color: $font-color-control;
      &:hover {
        color: $font-color-control-hover;
      }
    }
  }
}
.uni-row {
  display: flex;
  align-items: center;
  min-height: 35px;
  padding: 10px 0;
}
.icon-area {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-left: 12px;
  gap:10px;
}
.pr-item {
  font-size: 12px;
  padding: 5px 0;
  &:nth-child(1) {
    color: #d1d0d0;
  }
  &:nth-child(2) {
    color: #9d2525;
  }
  &:nth-child(3) {
    color: #265c34;
  }
}
.menu-detail-content{
  
  .menu-detail-content-item{
    display:flex;justify-content:space-between;
    align-items: center;
    min-height: 35px;
    font-size: 14px;
    font-weight: 500;
    box-sizing: border-box;
    /**&:nth-child(odd){
      
        padding-right: 20px;
      
    };
    &:nth-child(even){
      
        padding-left: 20px;
      
    };**/
  }
}

.priceTotal{
  flex: 1;
  display: flex;
  justify-content: end;
}


</style>
