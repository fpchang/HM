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
    this.getData();
    common_vendor.Vs.callFunction({
      name: "getOpenId",
      data: {
        code: 1,
        secret: "845eff40726dc3624688c347dab12bce",
        appId: "wxb0704bf984581410"
      }
    }).then((res) => {
      console.log(re);
    });
  },
  methods: {
    getData() {
      const db = common_vendor.Vs.database();
      db.collection("order").where("checkInEndDateTimeStamp<22222222222222222&&checkInStartDateTimeStamp>111111").get().then((res) => {
        console.log("11111", res);
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_link2 = common_vendor.resolveComponent("uni-link");
  _easycom_uni_link2();
}
const _easycom_uni_link = () => "../../uni_modules/uni-link/components/uni-link/uni-link.js";
if (!Math) {
  _easycom_uni_link();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      href: $data.href,
      text: $data.href
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
