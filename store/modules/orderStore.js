
import DB from '../../api/DB'
import OrderService from '../../services/OrderService';

export default{
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
}