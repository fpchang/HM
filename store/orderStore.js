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
        updateOrderListTodayAfter(state, list) {
			state.orderListTodayAfter = list;
		},
			//获取当天开始的订单
            async getOrderListTodayAfter(state,hotel_id) {
                const res  =await OrderService.getOrderListTodayAfter(hotel_id);	
                store.commit("updateOrderListTodayAfter", res.data);
            },
    }
});
export default store;