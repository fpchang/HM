<template>
  <view>
    <uni-forms
      ref="employeeRef"
      :modelValue="employeeForm"
      :rules="employeeFormRules"
      label-width="90px"
    >
      <uni-forms-item label="用户名" required name="userName">
        <uni-easyinput
          v-model="employeeForm.userName"
          placeholder="请输入员工名"
        />
      </uni-forms-item>
      <uni-forms-item label="手机号" name="phone">
        <u-input
          maxlength="11"
          type="number"
          placeholder="请输入手机号"
          border="surround"
          v-model="employeeForm.phone"
          clearable
          shape="circle"
          class="inputStyle"
        >
        </u-input>
      </uni-forms-item>
      <uni-forms-item label="角色">
        <uni-data-checkbox
          v-model="employeeForm.role"
          :localdata="roleItems"
        ></uni-data-checkbox>
      </uni-forms-item>
    </uni-forms>
    <u-button
      type="success"
      text="保存"
      color="#007aff"
      @click="submitForm()"
      :disabled="submitDisabled"
      :loading="submitLoading"
    ></u-button>
  </view>
</template>

<script>
import DB from "../../../api/DB.js";
export default {
  name: "addEmployeeComponent",
  props: {
	
	type:0 // 0 新增，1编辑
  },
  data() {
    return {
      submitLoading: false,
      //hotelList:getApp().globalData.hotelList,
	  employeeForm: {
        userName: "",
        phone: "",
        role: "normal",
      },
      roleItems: [
        {
          value: "manager",
          text: "管理员",
        },
        {
          value: "normal",
          text: "员工",
        },
      ],
      employeeFormRules: {
        // 对name字段进行必填验证
        phone: {
          rules: [
            {
              required: true,
              errorMessage: "请输入手机号"
            },
			{
				pattern: "^[1][3,4,5,6,7,8,9][0-9]{9}$",
				errorMessage: "手机号不正确"

			},
            {
              validateFunction: (rule, value, data, callback) => {
                let obj = this.hotel.employee.find((item) => {
                  return item.phone == value;
                });
                if (obj) {
                  callback("已存在相同手机号");
                }
                if (value == this.hotel.blong) {
                  callback("此用户为超级管理员");
                }
                return true;
              },
            },
          ],
        },
      },
    };
  },
  computed: {
    hotel_id() {
      return this.$store.state.hotel_id;
    },

    hotel() {
      return this.$store.state.hotelList.find(
        (item) => item._id == this.hotel_id
      );
    },
    submitDisabled() {
      return !this.employeeForm.phone;
    },
  },
  methods: {
    submitForm() {
      this.$refs.employeeRef.validate().then((res) => {
        console.log(this.employeeForm);

        uni.showLoading();
        this.submitLoading = true;

        DB.callFunction("hm_addEmployee", {
          _id: this.hotel_id,
          employeeObj: this.employeeForm,
        })
          .then((res) => {
            console.log("添加成功");
            this.$store.commit("getHotelList");
            this.$emit("closePopup");
            uni.hideLoading();
          })
          .catch((er) => {
            console.log("添加失败", er);
            this.submitLoading = false;
            uni.hideLoading();
            uni.showModal({
              content: "系统异常，请稍候再试！",
              confirmText: "确认",
            });
          });
      });
    },
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
};
</script>

<style></style>
