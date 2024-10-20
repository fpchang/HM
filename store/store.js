// 页面路径：store/index.js 
import Vue from 'vue';
import Vuex from 'vuex';
import DB from '../api/DB'
import hotelService from '../services/HotelService';
Vue.use(Vuex); //vue的插件机制

//Vuex.Store 构造器选项
const store = new Vuex.Store({
	namespace:true,
	state: { //存放状态
		"isPcShow": false,
		"user": {},
		"hotelList": [],
		"employeeList":[],
		"hotel_id": "",
		"roomType":{}
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
		updateEmployeeList(state, list) {
			console.warn("store updateEmployeeList",list)
			state.employeeList = list;			
		},
		updateRoomType(state, obj) {
			state.roomType = obj;
		},
		checkHotel(state, hotel_id) {
			state.hotel_id = hotel_id;
			uni.setStorageSync("hotel_id", hotel_id);
			console.log("33333333",state.user.phone)
			//this.$permissionStore.commit("getPermissionList",hotel_id,this.user.phone);
			store.dispatch('permissionSore/getPermissionList', {hotel_id:hotel_id,phone:state.user.phone}, {root: true})
		},
		updateScenicSpot(state, list) {
			state.scenicSpotList = list;
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
			store.dispatch("getRoomType");
			
		}
	},
	actions:{
		 getHotelList(context){
			return hotelService.getHotelList(context.state.user.phone).then(res=>{
				context.commit('updateHotelList', res.data);
			})
			

		},
		 getRoomType(context){
				return  hotelService.getRoomType(context.state.hotel_id).then(res=>{
					let obj = res.result.data.length?res.result.data:[];
					context.commit("updateRoomType",obj);
				})
			 	
		}
	}
})
export default store;