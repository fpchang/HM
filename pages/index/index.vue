<template>
  <view>
    <view class="top-container">
      <view class="scroll-content">
        <view :style="{height: styleObj.navTopHeight}"></view>
        <view :class="['top-area', isSticky? 'sticky-style':'']">
          <view class="title-area" :style="{opacity: opacityVal}">
            <!-- 	<view class="check-area" @click="showCheckHotel">
							<text class="$uni-font-size-lg"
								style="white-space: nowrap;text-overflow: ellipsis; overflow: hidden;">见山舍民宿</text>
							<u-icon name="arrow-down-fill" color="#000" size="20px" top="2"></u-icon>
							<view class="check-panal">
								<view>11111111</view>
							</view>
						</view> -->

            <view style="display: flex; align-items: center">
              <view style="width: 200px">
                <uni-data-select :value="hotel_id" :localdata="hotelListFormat" @change="checkHotel"
                  :clear="false"></uni-data-select>
              </view>

              <!-- <u-icon name="arrow-down-fill" color="#000" size="20px" top="2"></u-icon> -->
            </view>

            <view class="add-area">
              <u-icon name="plus-circle" color="#007aff" label-color="#007aff" size="20px" label="新增店面" top="2"
                class="add-icon-style" @click="addNewHotel"></u-icon>
            </view>
          </view>
          <view class="navbar">
            <view class="nav-content">
              <u-tabs @click="clickTab" :list="tabList" lineWidth="0" lineColor="#f56c6c" :current="currentTab_index"
                :activeStyle="{
                  color: '#303133',
                  fontWeight: 'bold',
                  fontSize: '18px',
                  transform: 'scale(1.15)',
                }" :inactiveStyle="{
                  color: '#606266',
                  fontSize: '18px',
                  transform: 'scale(1)',
                }" itemStyle="padding-left: 15px; padding-right: 15px; height: 34px;">
              </u-tabs>
            </view>
          </view>
        </view>
      </view>
    </view>

    <swiper :style="{height: scrollHeight}" :current="currentTab_index" :disable-touch="true"
      @change="swiperContentEvent">
      <swiper-item v-for="item in tabList">
        <scroll-view :scroll-y="true" show-scrollbar="false" :scroll-top="0" :style="{height: scrollHeight}">
          <view v-if="dataHasRead">
            <!-- 	<keep-alive :id="new Date().getTime()"> -->
            <share_app_to_weechat v-if="item.ComponentName=='share_app_to_weechat'"></share_app_to_weechat>
            <gatherComponent :key="item.time" :createTime="item.time" :disHeightVal="disHeightVal"
              v-if="item.ComponentName=='gatherComponent'">
            </gatherComponent>
            <orderComponent :key="item.time" :createTime="item.time" :disHeightVal="disHeightVal"
              v-if="item.ComponentName=='orderComponent'">
            </orderComponent>

            <hotelSetComponent :key="item.time" :createTime="item.time" :disHeightVal="disHeightVal"
              v-if="item.ComponentName=='hotelSetComponent'">
            </hotelSetComponent>
            <roomTypeListComponent :key="item.time" :createTime="item.time"
              v-if="item.ComponentName=='roomTypeListComponent'">
            </roomTypeListComponent>
            <employeeConmponent :key="item.time" :createTime="item.time"
              v-if="item.ComponentName=='employeeConmponent'"></employeeConmponent>
            <menuListComponent :key="item.time" :createTime="item.time"
              v-if="item.ComponentName=='menuListComponent'"></menuListComponent>
            <scenicSpotListComponent :key="item.time" :createTime="item.time"
              v-if="item.ComponentName=='scenicSpotListComponent'"></scenicSpotListComponent>
            <!-- </keep-alive> -->
          </view>
        </scroll-view>
      </swiper-item>
    </swiper>

    <u-popup :show="showDrawer" mode="left" @close="closeDrawerEvent" @open="showDrawerEvent"
      :closeOnClickOverlay="true">
      <u-list style="margin-top: 60px; width: 40vw">
        <u-list-item v-for="(item, index) in hotelList" :key="index">
          <u-cell :title="`${item.subName}`">
            <u-avatar slot="icon" shape="square" size="35" :src="item.logoSrc"
              customStyle="margin: -3px 5px -3px 0"></u-avatar>
          </u-cell>
        </u-list-item>
      </u-list>
    </u-popup>
    <uni-popup ref="popupHotelCreate" background-color="transprant">
      <view class="popup-content">
        <view class="create-order-title-style">创建酒店</view>
        <view class="comContent">
          <!-- <keep-alive> -->
          <createHotelComponent @closePopup="closePopup"></createHotelComponent>
          <!-- </keep-alive> -->
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
import gatherComponent from "../gather/components/gatherComponent";
import orderComponent from "../order/components/orderComponent";
import hotelSetComponent from "./components/hotelSetComponent";
import createHotelComponent from "../hotelManage/components/createHotelComponent";
import roomTypeListComponent from "../hotelManage/components/roomTypeListComponent.vue";
import employeeConmponent from "../hotelManage/components/employeeConmponent.vue";
import menuListComponent from "../catering/components/menuListComponent.vue";
import scenicSpotListComponent from "../scenicSpot/components/scenicSpotListComponent";
import AccountService from "../../services/AccountService";
import DB from "../../api/DB";
export default {
  components: {
    gatherComponent,
    orderComponent,
    hotelSetComponent,
    createHotelComponent,
    roomTypeListComponent,
    employeeConmponent,
    menuListComponent,
    scenicSpotListComponent,
  },

  data() {
    return {
      title: "Hello",
      styleObj: {
        navTopHeight:
          getApp().globalData.systemInfo.deviceType == "pc" ? 0 : "60px",
      },

      isSticky: false,
      opacityVal: 1,
      currentTab_index: 0,
      showDrawer: false,
      clickTime: 0,
      tabList: [],
      slelectHotelvalue: "",
      activeHotle: {
        _id: "002",
        name: "见山舍",
        name_Zn: "",
        subName: "1店",
        logoSrc:
          "https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png",
      },
      //hotelList: []
    };
  },
  onLoad(e) {},
  created() {
    this.vaildToken(()=>{
      this.initData();
    });
    
  },
  onShow() {
    console.log("index onshow");
    this.vaildToken();
  },
  mounted() {},
  onPullDownRefresh() {
    console.log("index veu refrush");
    this.vaildToken(()=>{
      this.initData();
    });
    uni.stopPullDownRefresh();
  },
  computed: {
    isPcShow() {
      return this.$store.state.isPcShow;
    },
    hotel_id() {
      return this.$store.state.hotel_id;
    },
    user() {
      return this.$store.state.user;
    },
    hotelList() {
      return this.$store.state.hotelList;
    },
    permissionList() {
      return this.$store.state.permissionStore.permissionList;
    },
    dataHasRead() {
      return this.hotelList.length && this.hotel_id;
    },
    hotelListFormat() {
      return this.hotelList.map((item) => {
        return {
          text: item.hotelName,
          value: item._id,
        };
      });
    },
    disHeightVal() {
      let deviceType = getApp().globalData.systemInfo.deviceType;
      return this.isPcshow ? "110px" : "170px";
    },
    scrollHeight() {
      return `calc(100vh - ${this.disHeightVal})`;
    },
  },
  watch: {
    hotelList(narr, oarr) {
      //this.setDefaultHotel()
    },
    permissionList() {
      this.initTabMenu();
    },
  },
  methods: {
    async vaildToken(callback) {
	  try {
     const res= await AccountService.validToken();
	 if(res.result.code){
		 uni.showToast({
		       title:res.result.msg,
		       duration: 2000,
		       icon: "error",
		     });
		 return;
	 }
   console.log("token验证通过")
      callback&&callback();
	  } catch (error) {
      console.error(error)
     // this.$store.dispatch("errorEvent",error);
		 
	  }
    },
    async initData() {
      //检验token合法有效性性

      try {
        const res = "";
        await this.$store.dispatch("getHotelList");
        this.initTabMenu();
        uni.hideLoading();
      } catch (error) {
        console.log("initData .....error,", error);
        uni.hideLoading();
      }
    },
    initTabMenu() {
      if (this.permissionList.length < 1) {
        console.error("没有权限列表");
        return;
      }
      let arr = [
        {
          index: 0,
          name: "关注",
          time: 0,
          permission: "MENU_GATHER",
          ComponentName: "gatherComponent",
        },
        {
          index: 1,
          name: "订房管理",
          time: 0,
          permission: "MENU_ORDER",
          ComponentName: "orderComponent",
        },
        {
          index: 2,
          name: "合作景点",
          time: 0,
          permission: "MENU_SCENICSPOT",
          ComponentName: "scenicSpotListComponent",
        },
        {
          index: 3,
          name: "订餐",
          time: 0,
          permission: "MENU_CATERING",
          ComponentName: "menuListComponent",
        },
        {
          index: 4,
          name: "发票",
          time: 0,
          permission: "MENU_TICKET",
          ComponentName: "",
        },
        {
          index: 5,
          name: "房型管理",
          time: 0,
          permission: "MENU_ROOMTYPE",
          ComponentName: "roomTypeListComponent",
        },
        {
          index: 6,
          name: "人员管理",
          time: 0,
          permission: "MENU_EMPLOYEE",
          ComponentName: "employeeConmponent",
        },
      ];
      this.tabList = arr.filter((item) => {
        return this.permissionList.includes(item.permission);
      });
    },
    showCheckHotel() {
      this.showDrawerEvent();
    },
    checkHotel(hotel_id) {
      if (hotel_id == this.hotel_id) {
        return;
      }
      this.$store.dispatch("checkHotel", hotel_id);
    },
    showDrawerEvent() {
      this.showDrawer = true;
    },
    closeDrawerEvent() {
      this.showDrawer = false;
    },
    clickTab(e) {
      if (this.currentTab_index == e.index) {
        //只触发刷新
        this.tabList[e.index].time = new Date().getTime();
        return;
      }
      this.currentTab_index = e.index;
    },
    checkTab(e) {
      //console.log("checkTab", e)
    },
    scrollEvent(e) {
      let { scrollTop } = e.detail;
      //	this.opacityVal = 1 - (Math.min(scrollTop / 60, 1));
      //	this.isSticky = (scrollTop >= 60 ? true : false);
    },
    swiperContentEvent(e) {
      if (e.detail["current"]) {
        this.currentTab_index = e.detail.current;
      }
    },
    addNewHotel() {
      if (!this.isPcShow) {
        uni.navigateTo({
          url: "/pages/hotelManage/createHotel/createHotel",
        });
        return;
      }
      this.$refs.popupHotelCreate.open();
    },
    closePopup() {
      try {
        this.$refs.popupHotelCreate.close();
        //  this.$refs.orderChildTableListRef.getOrderListByCondition();
        //  this.$refs.orderChildCalendarList.getOrderList();
        // this.$refs.orderChildListRef.getOrderList();
      } catch (e) {
        //TODO handle the exception
      }
    },
    // getHotelList() {
    // 	return DB.getCollection("hm-hotel", {
    // 		blongUserId: this.$store.state.user.phone
    // 	}).then(res => {
    // 		this.hotelList = res.data;
    // 		this.$store.commit('updateHotelList', res.data);
    // 		console.log("33322dd", this.hotelList)
    // 	})
    // },
  },
};
</script>

<style lang="scss">
.top-container {
  display: flex;
  flex-direction: column;
  font-size: $uni-font-size-lgs;
}

.add-icon-style {
  cursor: pointer;
}

.add-icon-style:hover {
  color: #ff0000;
}

.scroll-content {}

.scroll-content .top-area {
  height: 110px;
  box-sizing: border-box;
  z-index: 999;
  background-color: #fff;

  .title-area {
    position: relative;
    height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;

    .check-area {
      max-width: 200px;

      height: 24px;
      display: flex;
      flex-direction: row;
      text-align: center;

      .check-panal {
        width: 120px;
        max-width: 200px;
        padding: 10px 0;
        position: absolute;
        top: 50px;
        left: 20px;
        background-color: #ddd;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 20px;
        z-index: 999;
        font-size: $uni-font-size-lg;
      }
    }
  }

  .navbar {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: #fff;

    .nav-content {
      padding: 0 15px;
      width: 100%;
      box-sizing: border-box;
    }
  }
}

.sticky-style {
  width: 100vw;
  position: fixed;
  top: 0px;
  left: 0;
}

.content-area {
  min-height: calc(100vh - 110px);
  height: 120vh;
  background-color: #eee;
}

.activeHotelItemSelect {
  background-color: #ddd !important;
  /*border:2rpx solid blue;*/
}
</style>
