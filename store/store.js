// 页面路径：store/index.js 
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);//vue的插件机制

//Vuex.Store 构造器选项
const store = new Vuex.Store({
	state:{//存放状态
		"user":{},
		"hotelList":[],
		"hotel_id":"",
		"roomTypeList":[]
	},
	
	mutations:{
		setUser(state,user){
			state.user=user;
		},
		//调用 this.$store.commit('updateHotelList',[])
		updateHotelList(state,list){
			state.hotelList=list;
		},
		updateRoomTypeList(state,roomTypeList){
			state.roomTypeList=roomTypeList;
		},
		checkHotel(state,hotel_id){
			state.hotel_id=hotel_id;
			uni.setStorageSync("hotel_id",hotel_id);
		}
	}
})
export default store;