// 页面路径：store/index.js 
import Vue from 'vue';
import Vuex from 'vuex';
import DB from '../../api/DB'
import PermissionService from '../../services/PermissionService';
export default{
	namespace:true,
	state: { //存放状态
		permissionList:[]
	},

	mutations: {
	setPermissionList(state,list=[]){
   		 state.permissionList = list;
 	 }
	},
	actions:{
		getPermissionList(context,params){
			console.log(33445,arguments)
			const {phone,hotel_id} = params;
			return  PermissionService.getPermissionList(hotel_id,phone).then(res=>{
				console.log("权限列表为==",res.data)
				context.commit('setPermissionList', res.data)
			})
		}
	}
}