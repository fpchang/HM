"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      baseFormData: {
        phone: "",
        smsCode: "",
        ifAgree: 0
      },
      isAgree: false,
      valiFormData: {
        phone: ""
      },
      // 校验规则
      rules: {
        name: {
          rules: [{
            required: true,
            errorMessage: "姓名不能为空"
          }]
        },
        phone: {
          rules: [
            {
              required: true,
              errorMessage: "手机号不能为空"
            },
            {
              format: "number",
              errorMessage: "手机号能输入数字"
            }
          ]
        }
      }
    };
  },
  onReady() {
    common_vendor.index.setStorageSync("name", "cfp");
  },
  computed: {
    phoneValid() {
      return false;
    }
  },
  methods: {
    sendSms() {
      console.log(this.baseFormData.phone);
    },
    submit(ref) {
      common_vendor.index.setStorageSync("name", "cfp");
      console.log(this.baseFormData);
      this.$refs[ref].validate().then((res) => {
        console.log("success", res);
        common_vendor.index.showToast({
          title: `校验通过`
        });
      }).catch((err) => {
        console.log("err", err);
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_forms2 + _easycom_uni_section2)();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_forms + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $data.baseFormData.phone = $event),
    b: common_vendor.p({
      required: true,
      placeholder: "请输入手机号",
      modelValue: $data.baseFormData.phone
    }),
    c: common_vendor.p({
      label: "手机号",
      name: "phone"
    }),
    d: $data.baseFormData.smsCode,
    e: common_vendor.o(($event) => $data.baseFormData.smsCode = $event.detail.value),
    f: common_vendor.o(($event) => $options.sendSms()),
    g: common_vendor.p({
      label: "验证码"
    }),
    h: $data.isAgree,
    i: common_vendor.o(($event) => $options.submit("valiForm")),
    j: common_vendor.sr("valiForm", "37393109-1,37393109-0"),
    k: common_vendor.p({
      rules: $data.rules,
      modelValue: $data.baseFormData
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
