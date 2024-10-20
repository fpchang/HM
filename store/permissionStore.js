// 页面路径：store/index.js 
import Vue from 'vue';
import Vuex from 'vuex';
import DB from '../api/DB'
import PermissionService from '../services/PermissionService';
Vue.use(Vuex); //vue的插件机制

//Vuex.Store 构造器选项
const store = new Vuex.Store({
	state: { //存放状态
		permissionList:[]
	},

	mutations: {
	setPermissionList(state,list=[]){
    state.permissionList = list;
  }
		
	}
})
export default store;