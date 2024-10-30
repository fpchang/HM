<template>
  <view>
    <view class="header-style">
      <view class="tit-style"
        ><text style="">{{ menuItem.name }}</text></view
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
          @click="addMenuDetail"
        ></u-icon>
        <u-icon
        v-if="isEdit"
          name="trash-fill"
          color="#000"
          size="22"
          label="删除"
          labelPos="bottom"
          labelSize="12px"
          @click="deleteMenuType"
        ></u-icon>
        <u-icon
        v-if="isEdit"
          name="edit-pen-fill"
          color="#000"
          size="22"
          label="编辑"
          labelPos="bottom"
          labelSize="12px"
          @click="editMenuType"
        ></u-icon>
        <!-- <u-icon
        
          name="checkmark-circle-fill"
          color="#000"
          v-if="isEdit"
          size="22"
          label="保存"
          labelPos="bottom"
          labelSize="12px"
        ></u-icon> -->
        <!-- <u-icon
          name="eye-fill"
          color="#000"
          size="22"
          label="预览"
          labelPos="bottom"
          labelSize="12px"
        ></u-icon> -->
        <!-- <u-icon
          name="share-fill"
          color="#000"
          size="22"
          label="分享"
          labelPos="bottom"
          labelSize="12px"
          @click="shareWx"
        ></u-icon> -->
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
      </view>
    </view>
    <!-- <uni-section class="mb-10" title="价目表" type="line"></uni-section> -->
     <view style="height:10px"></view>
    <view  class="menu-detail-content" >
      <view class="menu-detail-content-item" v-for="item of menuItem._id['hm-menuDetail']" >
        <text class="itx-n">{{item.name}}</text>
        <view style="display: flex;"> 
          <text class="itx-p">{{item.price}}</text>
          <text>￥</text>
          <view class="icon-area">
            <!-- <u-icon
            v-if="isEdit"
              name="edit-pen-fill"
              color="#000"
              size="24"
              labelPos="bottom"
              labelSize="12px"
              @click="editMenuDetail(item)"
            ></u-icon>
            <u-icon
            v-if="isEdit"
              name="trash-fill"
              color="#000"
              size="24"
              labelPos="bottom"
              labelSize="12px"
              @click="deleteMenuDetail(item)"
            ></u-icon> -->
            <text v-if="isEdit" class="edit-style" @click="editMenuDetail(item)">修改</text>
            <text v-if="isEdit" class="edit-style" @click="deleteMenuDetail(item)">删除</text>
          </view>
        </view>
        
            
      </view>
       
    </view>
    
 
    <uni-popup ref="popupMenuDetail" background-color="transprant">
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
    </uni-popup>
  </view>
</template>
<script>
import addMenuDetailComponent from "./addMenuDetailComponent";
import MenuService from "../../../services/MenuService";
export default {
  name: "menuCardComponent",
  props: {
    menuItem: Object,
  },
  components: {
    addMenuDetailComponent,
  },
  data() {
    return {
      type: 0,
      isEdit: false,
      targetObj: {},
    };
  },
  computed: {
    menuType_id() {
      return this.menuItem._id._value;
    },
    hotel_id(){
      return this.$store.state.hotel_id;
    }
  },
created(){
  console.log("menucardcomponent created",this.menuItem,)
},
  watch: {
    menuType_id() {},
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
      if(!this.$store.state.permissionStore.permissionList.includes('MENU_UPDATE')){
					 this.$alert.alertNoPermisson();
					return;
				}
      this.type = 0;
      this.targetObj = this.menuItem;
      if (this.$store.state.isPcShow) {
        this.$refs.popupMenuDetail.open();
        return;
      }
      uni.navigateTo({
        url: `/pages/catering/addMenuDetail/addMenuDetail?type=${
          this.type
        }&&targetObj=${JSON.stringify(this.menuItem)}`,
      });
    },
    editMenuDetail(item) {
      if(!this.$store.state.permissionStore.permissionList.includes('MENU_UPDATE')){
					 this.$alert.alertNoPermisson();
					return;
				}
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
      if(!this.$store.state.permissionStore.permissionList.includes('MENU_DELETE')){
					 this.$alert.alertNoPermisson();
					return;
				}
      if (!this.menuType_id) {
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
      //uni.showLoading();
      try {
        const res = await MenuService.removeMenuDetail(item._id);
        console.log("删除成功");
        this.$store.dispatch("getMenuList", this.hotel_id);
      } catch (error) {
        console.log("删除失败", error);
      }
    },
    editMenuType() {
      this.$emit("editMenuType", this.menuItem);
    },

    // editMenuTypeDetail(){
    //   this.type=1;
    //   if(this.$store.state.isPcShow){
    // 			this.$refs.popupMenuTypeDetail.open();
    // 			return;
    // 		}
    //     uni.navigateTo({
    // 			url:`/pages/menuItem/addMenuDetail/addMenuDetail?type=${
    //       this.type}&&targetObj=${JSON.stringify(this.menuItem)}`
    // 		})
    // },
    async deleteMenuType() {
      if (!this.$store.state.permissionStore.permissionList.includes('MENU_DELETE')) {
					this.$alert.alertNoPermisson();
					return;
				}
        console.log(this.menuType_id,this.menuItem)
      if (!this.menuType_id) {
        return;
      }
      const conf = await uni.showModal({
        title: "确认删除菜单",
        content: "删除后将同步删除所有价格信息，并且无法恢复,确认删除吗?",
        cancelText: "取消",
        confirmText: "确认",
      });
      if (conf["cancel"]) {
        return;
      }
      //uni.showLoading();
      try {
        const res = await MenuService.removeMenuType(this.menuType_id);
        console.log("删除成功");
        this.$store.dispatch("getMenuList", this.hotel_id);
      } catch (error) {
        console.log("删除失败", error);
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
  padding-left: 12px;
  gap:12px;
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
    border-bottom: 1px dotted #bbbbbb47;
    .edit-style{
      color: $font-color-control;
      font-size: 12px;
    }
    /**&:nth-child(odd){
      
        padding-right: 20px;
      
    };
    &:nth-child(even){
      
        padding-left: 20px;
      
    };**/
  }
}




</style>
