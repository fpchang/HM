// 页面路径：store/index.js 
import Vue from 'vue';
import Vuex from 'vuex';
import DB from '../api/DB'
import menuStore from "./modules/menuStore";
import orderStore from "./modules/orderStore";
import permissionStore from "./modules/permissionStore";
import scenicSpotStore from "./modules/scenicSpotStore";
import hotelService from '../services/HotelService';
import AccountService from '../services/AccountService';
Vue.use(Vuex); //vue的插件机制

const store = new Vuex.Store({
	modules:{
		menuStore,orderStore,permissionStore,scenicSpotStore
	},
	state: { //存放状态
		"shareObj":{},
		"baseDatahasLoad":false,//基本数据准备完毕
		"topHeight":110,
		"tabHeight":44,
		"isPcShow": false,
		"user": "",
		"hotelList": [],
		"employeeList":[],
		"hotel_id": "",
		"roomType":{}
		
	},

	mutations: {
		setShareObj(state,obj){
			state.shareObj = obj;
		},
		setBaseDatahasLoad(state, flag) {
			state.baseDatahasLoad = flag;
		},
		setPcShow(state, flag) {
			state.isPcShow = flag;
		},
		setUser(state, user) {
			state.user = user;
		},
		setHotelId(state,hotel_id){
			state.hotel_id = hotel_id;
		},
		checkHotel(state, hotel_id) {
			console.log("checkhotel>>>>>")
			uni.setStorageSync("hotel_id", hotel_id);
			store.commit("setHotelId",hotel_id);												
		},
		//调用 this.$store.commit('updateHotelList',[])
		updateHotelList(state, list) {
			state.hotelList = list;
			store.commit("setDefaultHotel");
		},
		updateEmployeeList(state, list) {
			state.employeeList = list;			
		},
		updateRoomType(state, obj) {
			state.roomType = obj;
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
			
		},
		updateUser(state){
			const user = uni.getStorageSync("user");
			if(user){
				store.commit("setUser",user);
			}
		}
	},
	actions:{
		getUser(context){
			return new Promise( (resolve,reject)=>{
				 AccountService.getuserByToken().then(res=>{					
					if(res.result.data[0]){
						uni.setStorageSync("user",res.result.data[0]);
						context.commit("setUser",res.result.data[0]);
						
					}
					resolve()
				}).catch(e=>{
					reject(e)
				})
			})
			
		},
		 getHotelList(context){			
			return hotelService.getHotelList().then(res=>{
				console.log("当前用户酒店列表",res);
				context.commit('updateHotelList', res.result);

			})
			

		},
		 getRoomType(context){
				return  hotelService.getRoomType(context.state.hotel_id).then(res=>{
					let obj = res.result.data.length?res.result.data:[];
					context.commit("updateRoomType",obj);
				})
			 	
		},
		errorEvent(context,error){
			try {
				const {code,msg}=error;
				if(code==9999){
					context.dispatch("loginOut");
				}
			} catch (error) {
				
			}
			
		},
		loginOut(context){
			uni.clearStorageSync();
			context.commit("setUser",{});
			context.commit("setHotelId","");
			uni.reLaunch({
				url: "/pages/login/login",
			  });
			
			
		}
	},
	getters: {
		hotelObj: state => {
			return state.hotelList.find(item=>item._id == state.hotel_id);
		}
	}
})
export default store;