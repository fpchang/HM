// 页面路径：store/index.js 
import Vue from 'vue';
import Vuex from 'vuex';
import DB from '../api/DB'

Vue.use(Vuex); //vue的插件机制

//Vuex.Store 构造器选项
const store = new Vuex.Store({
	state: { //存放状态
		"isPcShow": false,
		"user": {},
		"hotelList": [],
		"hotel_id": "",
		"roomTypeList": [],
		"orderListTodayAfter": [] //今天至未来订单
	},

	mutations: {
		setPcShow(state, flag) {
			state.isPcShow = flag;
		},
		setUser(state, user) {
			state.user = user;
		},
		//调用 this.$store.commit('updateHotelList',[])
		updateHotelList(state, list) {
			state.hotelList = list;
		},
		getHotelList(){
			return DB.getCollection("hm-hotel", {
				blongUserId: this.$store.state.user.mobile
			}).then(res => {
				store.commit('updateHotelList', res.data);
				console.log("33322dd", this.hotelList)
			})
		},
		updateRoomTypeList(state, roomTypeList) {
			state.roomTypeList = roomTypeList;
		},
		getRoomTypeList(state){
			return uniCloud.callFunction({
				name:"hm_getRoomType",
				data:{hotel_id:store.state.hotel_id}
			}).then(res=>{
				
				console.log("酒店列表",res);
				//this.roomTypeList = res.result.data[0].roomType;
				if(res.result.data.length){
					store.commit("updateRoomTypeList",res.result.data[0].roomTypeList);
				}
			})
		},
		updateOrderListTodayAfter(state, list) {
			state.orderListTodayAfter = list;
		},

		getOrderListTodayAfter(state) {
			let startTime = new Date(new Date().Format("yyyy/MM/dd 14:00:00")).getTime();
			let endTime = new Date(new Date().Format("yyyy/MM/dd 12:00:00")).getTime();
			let jql =
				`hotel_id=='${this.hotel_id}'&&orderStatus!=10&&(checkInStartDateTimeStamp>=${startTime} ||` +
				`(${endTime}<checkInEndDateTimeStamp && ${endTime}>checkInStartDateTimeStamp))`;
			return DB.getCollection("hm-order", jql).then(res => {
				console.log("获取的列表", res);
				store.commit("updateOrderListTodayAfter", res.data);

			}).catch(error => {
				console.log(error);
			})
		},
		checkHotel(state, hotel_id) {
			state.hotel_id = hotel_id;
			uni.setStorageSync("hotel_id", hotel_id);
		}
	}
})
export default store;