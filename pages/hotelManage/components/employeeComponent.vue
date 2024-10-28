<template>
  <view class="employee-component">
    <!-- <view class="add-content-style" style="">
      <view>
       
        <button
          class="uni-button"
          size="mini"
          type="primary"
          @click="addEmployee()"
        >
          添加员工
        </button>
        </view>
    </view> -->
    <view class="add-content-style">
			<view class="control-panal">
			<u-icon
			   name="plus-circle-fill"
			   color="#000"
			   size="22"
			   label="添加员工"
			   labelPos="bottom"
			   labelSize="12px"
			   @click="addEmployee"
			 ></u-icon>
		   </view>
		   </view>
    <view v-if="isPcShow">
      <uni-table border stripe emptyText="暂无更多数据">
        <!-- 表头行 -->
        <uni-tr>
          <uni-th align="center">用户手机</uni-th>
          <uni-th align="center">员工名称</uni-th>
          <uni-th align="center">角色</uni-th>
          <uni-th align="center" width="200px">操作</uni-th>
        </uni-tr>
        <!-- 表格数据行 -->
        <uni-tr v-for="item of employeeList">
          <uni-td>{{ item.phone }}</uni-td>
          <uni-td>{{ item.employee_name }}</uni-td>
          <uni-td>{{ item.role | roleFormat }}</uni-td>
          <uni-td align="center">
            <view class="uni-group" style="justify-content:space-around">
              <text  class="edit-text-btn-style" @click="editEmployee(item)">修改</text>
            	<text v-if="item.role!='administrator'" class="edit-text-btn-style" @click="deleteEmployee(item)">删除</text>
              <!-- <button
                class="uni-button"
                @click="editEmployee(item)"
                size="mini"
                type="primary"
              >
                修改
              </button>
              <button
                class="uni-button"
                size="mini"
                type="warn"
                @click="deleteEmployee(item)"
                :loading="submitLoading"
              >
                删除
              </button> -->
            </view>
          </uni-td>
        </uni-tr>
      </uni-table>
    </view>
    <view class="phone-show-style" style="max-width: 450px" v-if="!isPcShow">
      <uni-collapse v-model="accordionVal">
        <uni-collapse-item v-for="item of employeeList">
          <template v-slot:title>
            <uni-section
              class="mb-10"
              :title="item.employee_name"
              type="circle"
              :sub-title="item.phone"
            >
              <template v-slot:right>
                <text style="font-weight: bold">{{
                  item.role == "manager" ? "管理员" : "员工"
                }}</text>
              </template>
            </uni-section>
          </template>
          <view class="col-content">
            <view class="list">
              <view class="list-item">
                <view class="list-item-c"
                  ><text>员工姓名：</text><text>{{ item.employee_name }}</text></view
                >
              </view>
              <view class="list-item">
                <view class="list-item-c"
                  ><text>角色：</text
                  ><text style="font-weight: bold">{{
                    item.role == "manager" ? "管理员" : "员工"
                  }}</text></view
                >
              </view>
              <view class="list-item" style="justify-content: flex-end">
                <view class="list-item-c" style="width: 130px">
                  <button
                    class="uni-button"
                    size="mini"
                    type="primary"
                    @click="editEmployee(item)"
                  >
                    修改
                  </button>
                  <button
                    class="uni-button"
                    size="mini"
                    type="warn"
                    @click="deleteEmployee(item)"
                    :loading="submitLoading"
                  >
                    删除
                  </button>
                </view>
              </view>
            </view>
          </view>
        </uni-collapse-item>
      </uni-collapse>
    </view>
    <uni-popup ref="popupCreateRoomType" background-color="transprant">
      <view class="popup-content">
        <view class="create-order-title-style">{{
          type == 1 ? "修改员工信息" : "新增员工"
        }}</view>
        <view class="comContent">
          <addEmployeeComponent
            @closePopup="closePopup"
            :type="type"
            :em="emObj"
          ></addEmployeeComponent>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
import addEmployeeComponent from "./addEmployeeComponent";
import DB from "../../../api/DB";
import HotelService from "../../../services/HotelService";
export default {
  components: {
    addEmployeeComponent,
  },
  data() {
    return {
      submitLoading: false,
      accordionVal: "0",
      type: 0,
      emObj: {}
    };
  },
  computed: {
    isPcShow() {
      return this.$store.state.isPcShow;
    },
    hotel_id() {
      return this.$store.state.hotel_id;
    },
    hotel() {
      return this.$store.state.hotelList.find(
        (item) => item._id == this.hotel_id
      );
    },
    employeeList() {
      return this.$store.state.employeeList;
    },
  },
  filters:{
    roleFormat(key){
      const m={
        "administrator":"超级管理员",
        "manager":"管理员",
        "normal":"员工"
      }
     return  m[key]
    }
  },
  created() {
    console.log("employeeComponent>>>>>");

    this.getEmployeeList();
  },
  watch: {
    hotel_id() {
      this.getEmployeeList();
    },
  },
  methods: {
    sortRoomList(list) {},
    getEmployeeList() {
      //uni.showLoading();
      HotelService.getEmployeeList(this.hotel_id)
        .then((res) => {
          this.$store.commit("updateEmployeeList", res.data);
          uni.hideLoading();
        })
        .catch((err) => {
          console.error(err);
          uni.hideLoading();
        });
    },
    editEmployee(em) {
      if(!this.$store.state.permissionStore.permissionList.includes('EMPLOYEE_UPDATE')){
					 this.$alert.alertNoPermisson();
					return;
				}
      this.emObj = em;
      this.type = 1;
      if (this.$store.state.isPcShow) {
        this.$refs.popupCreateRoomType.open();
        return;
      }

      uni.navigateTo({
        url: `/pages/hotelManage/addEmployee/addEmployee?type=${
          this.type
        }&&em=${JSON.stringify(this.emObj)}`,
      });
    },
    addEmployee() {
      if(!this.$store.state.permissionStore.permissionList.includes('EMPLOYEE_CREATE')){
					 this.$alert.alertNoPermisson();
					return;
				}
      this.type = 0;
      if (this.$store.state.isPcShow) {
        this.$refs.popupCreateRoomType.open();
        return;
      }

      uni.navigateTo({
        url: `/pages/hotelManage/addEmployee/addEmployee`,
      });
    },
    async deleteEmployee(em) {
      if(!this.$store.state.permissionStore.permissionList.includes('EMPLOYEE_DELETE')){
					 this.$alert.alertNoPermisson();
					return;
				}
      const conf = await uni.showModal({
        title: "确认删除房型",
        content: "删除后将无法恢复,确认删除吗?",
        cancelText: "取消",
        confirmText: "确认",
      });
      if (conf["cancel"]) {
        return;
      }
      this.submitLoading = true;
      //uni.showLoading();
      DB.callFunction("hm_deleteEmployee", {
        _id: em._id,
        employee: em,
      })
        .then((res) => {
          console.log("删除成功");
          this.$store.dispatch("getHotelList");
          this.submitLoading = false;
          this.getEmployeeList();
          
        })
        .catch((er) => {
          console.log("删除失败", er);
          this.submitLoading = false;
          uni.hideLoading();
          uni.showModal({
            content: "系统异常，请稍候再试！",
            confirmText: "确认",
          });
        });
    },
    closePopup() {
      this.$refs.popupCreateRoomType.close();
    },
    // getRoomTypeList(){
    // 	return uniCloud.callFunction({
    // 		name:"hm_getRoomType",
    // 		data:{hotel_id:this.hotel_id}
    // 	}).then(res=>{

    // 		if(res.result.data.length){
    // 			this.$store.commit("updateRoomTypeList",res.result.data[0].roomTypeList);
    // 		}
    // 	})
    // }
  },
};
</script>

<style lang="scss">
.add-content-style {
  display: flex;
  justify-content: flex-end;
  padding: 0 20px;
  box-sizing: border-box;
}

.uni-group {
  display: flex;
  justify-content: space-between;
}

.col-content {
  /* background: linear-gradient(to bottom, #FFF, #EEF); */
  border-radius: 4px;
  padding: 0 20px;

  .list {
    display: flex;
    flex-direction: column;

    .list-item {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 10px 0;

      .list-item-c {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
}
</style>
