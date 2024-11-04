<template>
  <view>
    <view class="header-style">
      <view class="tit-style"
        ><text style="">{{ targetObj.title }}</text>【<text :style="{'color':numCount?'#ff0000':''}">{{numCount}}</text>】</view
      >
      <view
        style="flex: 1; display: flex; justify-content: flex-end; gap: 15px"
      >
      
      
        
      </view>
    </view>
    <slot name="content"></slot>
    
   
    
 
    <uni-popup ref="popupMenuDetail" background-color="transprant">
      <view class="popup-content">
        <view class="create-order-title-style">{{
          type == 1 ? "修改菜单" : "创建菜单"
        }}</view>
        <view class="comContent">
          <!-- <addMenuDetailComponent
            @closePopup="closePopup"
            :type="type"
            :targetObj="targetObj"
          ></addMenuDetailComponent> -->
        </view>
      </view>
    </uni-popup>
  </view>
</template>
<script>

import MenuService from "../../../services/MenuService";
export default {
  name: "gatherCardComponent",
  props: {
    targetObj: Object,
    numCount:Number
  },
  components: {
   
  },
  data() {
    return {
      type: 0,
      isEdit: true,
     
    };
  },
  computed: {
   
  },

  watch: {
   
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
      console.log(phone, uni.getSystemInfoSync());

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
    }
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
.c-list{background:red}
.header-style {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .tit-style {
    font-weight: bold;
    color: $uni-color-title;
  }
}
.menuItem-content-style {
  .sc-item {
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
  padding-left: 8px;
}
.pr-item {
  font-size: $uni-font-size-base;
  font-weight: bold;
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





</style>
