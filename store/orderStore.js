// 页面路径：store/index.js 
import Vue from 'vue';
import Vuex from 'vuex';
import DB from '../api/DB'
import OrderService from '../services/OrderService';
Vue.use(Vuex); //vue的插件机制

//Vuex.Store 构造器选项
const store = new Vuex.Store({
	state: { //存放状态
        orderListTodayAfter:[]
	},

	mutations: {
        updateOrderListTodayAfter(state,list) {
			state.orderListTodayAfter = list;
		}
    },
    actions:{
        	//获取当天开始的订单
		 getOrderListTodayAfter(context,hotel_id) {
			return OrderService.getOrderListTodayAfter(hotel_id).then(res=>{
				context.commit("updateOrderListTodayAfter", res.data);
			})
		}
    }
});
export default store;