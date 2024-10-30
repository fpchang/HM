<template>
  <view>
    <view class="header-style">
      <view class="tit-style"
        ><text style="">{{ scenicSpot.scenicSport_name }}</text></view
      >
      <view
        style="flex: 1; display: flex; justify-content: flex-end; gap: 15px"
      >
        <u-icon
        v-if="isEdit"
          name="plus-circle-fill"
          color="#000"
          size="22"
          label="添加"
          labelPos="bottom"
          labelSize="12px"
          @click="addScenicSpotDetail"
        ></u-icon>
        <u-icon
        v-if="isEdit"
          name="trash-fill"
          color="#000"
          size="22"
          label="删除"
          labelPos="bottom"
          labelSize="12px"
          @click="deleteScenicSpot"
        ></u-icon>
        <u-icon
          v-if="isEdit"
          name="edit-pen-fill"
          color="#000"
          size="22"
          label="编辑"
          labelPos="bottom"
          labelSize="12px"
          @click="editScenicSpot"
        ></u-icon>
        <u-icon
        name="grid-fill"
        :color="isEdit?'#06c':'#000'"
        size="22"
        label="编辑模式"
        :labelColor="isEdit?'#06c':'#000'"
        labelPos="bottom"
        labelSize="12px"
        @click="moreControl"
      ></u-icon>
        <!-- <u-icon
          name="share-fill"
          color="#000"
          size="22"
          label="分享"
          labelPos="bottom"
          labelSize="12px"
          @click="shareWx"
        ></u-icon> -->
      </view>
    </view>
    <view class="scenicSpot-content-style">
      <view class="sc-item">
        <view class="tit"><text>地址:</text></view
        ><view style="flex: 1" class="text-overflow-ellipsis"
          ><text class="add-text-style" @click="addressEvent(scenicSpot.scenicSport_address)">{{ scenicSpot.scenicSport_address }}</text></view
        ></view
      >
      <view class="sc-item">
        <view class="tit"> <text>联系人:</text></view>
        <view style="flex: 1" class="text-overflow-ellipsis">
          <text>{{ scenicSpot.scenicSport_user }}</text
          >【
          <text
            @click="makePhoneCallEvent(scenicSpot.scenicSport_phone)"
            class="phone-style"
            >{{ scenicSpot.scenicSport_phone }}</text
          >】
        </view>
      </view>
    </view>
    <uni-section class="mb-10" title="价目表" type="line"></uni-section>
    <view v-for="item of scenicSpot._id['hm-scenicSpotPriceDetail']">
      <uni-row class="uni-row">
        <uni-col :span="10" class="col-pa">
          <view>
            <text>
              {{ item.package_name }}
            </text>
          </view>
        </uni-col>
        <uni-col :span="10" class="col-pa">
          <view class="pr-item"
            >官方价：<text style="text-decoration: line-through"
              >{{ item.scenicSpot_price }}元</text
            ></view
          >
          <view class="pr-item"
            >结算价：<text>{{ item.settlement_price }}元</text></view
          >
          <view class="pr-item"
            >出售价：<text>{{ item.offering_price }}元</text></view
          >
        </uni-col>
        <uni-col :span="4" class="col-pa">
          <view class="icon-area">
            <!-- <u-icon
            v-if="isEdit"
              name="edit-pen-fill"
              color="#000"
              size="20"
              labelPos="bottom"
              labelSize="12px"
              @click="editScenicSportPrice(item)"
            ></u-icon>
            <u-icon
            v-if="isEdit"
              name="trash-fill"
              color="#000"
              size="20"
              labelPos="bottom"
              labelSize="12px"
              @click="deleteScenicSportPrice(item)"
            ></u-icon> -->
            <text class="edit-text-btn-style" @click="editScenicSportPrice(item)">修改</text>
            <text class="edit-text-btn-style" @click="deleteScenicSportPrice(item)">删除</text>
          </view>
        </uni-col>
      </uni-row>
      <u-line></u-line>
    </view>
    <uni-popup ref="popupScenicSpotDetail" background-color="transprant">
      <view class="popup-content">
        <view class="create-order-title-style">{{
          type == 1 ? "修改套餐" : "创建套餐"
        }}</view>
        <view class="comContent">
          <addScenicSpotDetailComponent
            @closePopup="closePopup"
            :type="type"
            :targetObj="targetObj"
          ></addScenicSpotDetailComponent>
        </view>
      </view>
    </uni-popup>
  </view>
</template>
<script>
import addScenicSpotDetailComponent from "./addScenicSpotDetailComponent";
import ScenicSpotService from "../../../services/ScenicSpotService";
export default {
  name: "scenicSpotCardComponent",
  props: {
    scenicSpot: Object,
  },
  components: {
    addScenicSpotDetailComponent,
  },
  //inject:["getSS"],
  data() {
    return {
      type: 0,
      isEdit: false,
      targetObj: {},
    };
  },
  computed: {
    scenicSpot_id() {
      return this.scenicSpot._id._value;
    },
    hotel_id(){
      return this.$store.state.hotel_id;
    }
  },

  watch: {
    scenicSpot_id() {},
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
    addScenicSpotDetail() {
      if(!this.$store.state.permissionStore.permissionList.includes('SCENICSPOT_PRICE__UPDATE')){
					 this.$alert.alertNoPermisson();
					return;
				}
      this.type = 0;
      this.targetObj = this.scenicSpot;
      if (this.$store.state.isPcShow) {
        this.$refs.popupScenicSpotDetail.open();
        return;
      }
      uni.navigateTo({
        url: `/pages/scenicSpot/addSencicSpotDetail/addSencicSpotDetail?type=${
          this.type
        }&&targetObj=${JSON.stringify(this.scenicSpot)}`,
      });
    },
    editScenicSportPrice(item) {
      if(!this.$store.state.permissionStore.permissionList.includes('SCENICSPOT_PRICE__UPDATE')){
					 this.$alert.alertNoPermisson();
					return;
				}
      this.type = 1;
      this.targetObj = item;
      if (this.$store.state.isPcShow) {
        this.$refs.popupScenicSpotDetail.open();
        return;
      }
      uni.navigateTo({
        url: `/pages/scenicSpot/addSencicSpotDetail/addSencicSpotDetail?type=${
          this.type
        }&&targetObj=${JSON.stringify(item)}`,
      });
    },
    async deleteScenicSportPrice(item) {
      if(!this.$store.state.permissionStore.permissionList.includes('SCENICSPOT_PRICE__UPDATE')){
					 this.$alert.alertNoPermisson();
					return;
				}
      console.log(item);
      if (!this.scenicSpot_id) {
        return;
      }
      const conf = await uni.showModal({
        title: "确认删除价格信息",
        content: "删除后将无法恢复,确认删除吗?",
        cancelText: "取消",
        confirmText: "确认",
      });
      if (conf["cancel"]) {
        return;
      }
      //uni.showLoading();
      try {
        const res = await ScenicSpotService.removeScenicSpotDetail(item._id);
        console.log("删除成功");
        await this.$store.dispatch("getScenicSpotList",this.hotel_id);
        this.submitLoading = false;
            uni.hideLoading();
      } catch (error) {
        console.log("删除失败", error);
        this.submitLoading = false;
            uni.hideLoading();
      }
    },
    editScenicSpot() {
         this.$emit("editScenicSpot", this.scenicSpot);
    },
    async deleteScenicSpot() {
      if(!this.$store.state.permissionStore.permissionList.includes('SCENICSPOT_DELETE')){
					 this.$alert.alertNoPermisson();
					return;
				}
      if (!this.scenicSpot_id) {
        return;
      }
      const conf = await uni.showModal({
        title: "确认删除景点",
        content: "删除后将同步删除所有价格信息，并且无法恢复,确认删除吗?",
        cancelText: "取消",
        confirmText: "确认",
      });
      if (conf["cancel"]) {
        return;
      }
      //uni.showLoading();
      try {
        const res = await ScenicSpotService.removeScenicSpot(
          this.scenicSpot_id
        );
        console.log("删除成功");
        await this.$store.dispatch("getScenicSpotList",this.hotel_id);
        this.submitLoading = false;
            uni.hideLoading();
      } catch (error) {
        console.log("删除失败", error);
        this.submitLoading = false;
            uni.hideLoading();
      }
    },
    closePopup() {
      if (this.$store.state.isPcShow) {
        this.$refs.popupScenicSpotDetail.close();
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
    },
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
};
</script>

<style scoped lang="scss">
.header-style {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .tit-style {
    font-weight: bold;
    color: $uni-color-title;
  }
}
.scenicSpot-content-style {
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
  justify-content: space-between;

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
</style>
