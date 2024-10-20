// 页面路径：store/index.js 
import Vue from 'vue';
import Vuex from 'vuex';
import DB from '../api/DB'
import PermissionService from '../services/PermissionService';
Vue.use(Vuex); //vue的插件机制

//Vuex.Store 构造器选项
const store = new Vuex.Store({
	namespace:true,
	state: { //存放状态
		permissionList:[]
	},

	mutations: {
	setPermissionList(state,list=[]){
   		 state.permissionList = list;
 	 },
	  async getPermissionList(state,hotel_id,phone){
		const res = await PermissionService.getPermissionList(hotel_id,phone);
		console.log("获取的权限列表为---",res)
		store.commit('setPermissionList', res.data);

	}
	}
})
export default store;