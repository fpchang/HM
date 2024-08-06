"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      name: "",
      href: "https://uniapp.dcloud.io/component/README?id=uniui"
    };
  },
  onReady() {
    this.getOpenId();
  },
  methods: {
    getOpenId() {
      common_vendor.Vs.callFunction({
        name: "getOpenId",
        data: {
          code: "0b1ZSx000bQFtS1KFv100pGTCU2ZSx01",
          secret: "845eff40726dc3624688c347dab12bce",
          appId: "wxb0704bf984581410"
        }
      }).then((res) => {
        console.log("获取的openid.....", res);
      });
    },
    getData() {
      const db = common_vendor.Vs.database();
      db.collection("order").where("checkInEndDateTimeStamp<22222222222222222&&checkInStartDateTimeStamp>111111").get().then((res) => {
        console.log("11111", res);
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_list_chat2 = common_vendor.resolveComponent("uni-list-chat");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  (_easycom_uni_list_chat2 + _easycom_uni_icons2 + _easycom_uni_list2)();
}
const _easycom_uni_list_chat = () => "../../uni_modules/uni-list/components/uni-list-chat/uni-list-chat.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
if (!Math) {
  (_easycom_uni_list_chat + _easycom_uni_icons + _easycom_uni_list)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      ["avatar-circle"]: true,
      title: "uni-app",
      avatar: "https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png",
      note: "您收到一条新的消息",
      time: "2020-02-02 20:20"
    }),
    b: common_vendor.p({
      title: "uni-app",
      avatar: "https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png",
      note: "您收到一条新的消息",
      time: "2020-02-02 20:20",
      ["badge-text"]: "12"
    }),
    c: common_vendor.p({
      title: "uni-app",
      avatar: "https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png",
      note: "您收到一条新的消息",
      time: "2020-02-02 20:20",
      ["badge-positon"]: "left",
      ["badge-text"]: "dot"
    }),
    d: common_vendor.p({
      title: "uni-app",
      avatar: "https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png",
      note: "您收到一条新的消息",
      time: "2020-02-02 20:20",
      ["badge-positon"]: "left",
      ["badge-text"]: "99"
    }),
    e: common_vendor.p({
      title: "uni-app",
      ["avatar-list"]: _ctx.avatarList,
      note: "您收到一条新的消息",
      time: "2020-02-02 20:20",
      ["badge-positon"]: "left",
      ["badge-text"]: "dot"
    }),
    f: common_vendor.p({
      type: "star-filled",
      color: "#999",
      size: "18"
    }),
    g: common_vendor.p({
      title: "uni-app",
      ["avatar-list"]: _ctx.avatarList,
      note: "您收到一条新的消息",
      time: "2020-02-02 20:20",
      ["badge-positon"]: "left",
      ["badge-text"]: "dot"
    }),
    h: common_vendor.p({
      border: true
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
