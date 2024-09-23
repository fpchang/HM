// 页面路径：store/index.js 
import Vue from 'vue';
import Vuex from 'vuex';
import DB from '../api/DB'
import hotelService from '../services/HotelService';
Vue.use(Vuex); //vue的插件机制

//Vuex.Store 构造器选项
const store = new Vuex.Store({
	state: { //存放状态
		"isPcShow": false,
		"user": {},
		"hotelList": [],
		"hotel_id": "",
		"roomType":{},
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
			store.commit("setDefaultHotel");
		},
		async getHotelList(state){
			console.log("store get hotel list===",state);
			const res = await hotelService.getHotelList( store.state.user.phone);
			store.commit('updateHotelList', res.data);

		},
		updateRoomType(state, obj) {
			state.roomType = obj;
		},
		async getRoomType(state){
			const res  = await hotelService.getRoomType(state.hotel_id);
			 	let obj = res.result.data.length?res.result.data[0]:{};
			 	store.commit("updateRoomType",obj);
			//  uniCloud.callFunction({
			// 	name:"hm_getRoomType",
			// 	data:{hotel_id:state.hotel_id}
			// }).then(res=>{				
			// 	console.log("酒店房型",res);
			// 	let obj = res.result.data.length?res.result.data[0]:{};
			// 	store.commit("updateRoomType",obj);
				
			// })
		},
		updateOrderListTodayAfter(state, list) {
			state.orderListTodayAfter = list;
		},
		//获取当天开始的订单
		async getOrderListTodayAfter(state) {
			const res  =await hotelService.getOrderListTodayAfter(state.hotel_id);	
			console.log("store-getOrderListTodayAfter",res.data)	
			store.commit("updateOrderListTodayAfter", res.data);
			// let startTime = new Date(new Date().Format("yyyy/MM/dd 14:00:00")).getTime();
			// let endTime = new Date(new Date().Format("yyyy/MM/dd 12:00:00")).getTime();
			// let jql =
			// 	`hotel_id=='${state.hotel_id}'&&orderStatus!=10&&(checkInStartDateTimeStamp>=${startTime} ||` +
			// 	`(${endTime}<checkInEndDateTimeStamp && ${endTime}>checkInStartDateTimeStamp))`;
			//  DB.getCollection("hm-order", jql).then(res => {
			// 	console.log("获取的列表", res);
			// 	store.commit("updateOrderListTodayAfter", res.data);

			// }).catch(error => {
			// 	console.log(error);
			// })
		},
		checkHotel(state, hotel_id) {
			state.hotel_id = hotel_id;
			uni.setStorageSync("hotel_id", hotel_id);
		},
		setDefaultHotel(state) {
			console.log("setDefaultHotle");
			if (!state.hotelList.length) {
				return;
			}
			let _hotel_id = uni.getStorageSync("hotel_id");
			
			let h = state.hotelList.find(item => {
				return item._id == _hotel_id
			});
			let n_hotel_id = h?_hotel_id:state.hotelList[0]._id;
			if(n_hotel_id==state.hotel_id){
				console.warn("与旧hotel_id相同，无需重置");
				return;
			}
			store.commit('checkHotel', n_hotel_id);
			store.commit("getRoomType");
			
		}
	}
})
export default store;