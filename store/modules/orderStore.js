
import DB from '../../api/DB'
import OrderService from '../../services/OrderService';

export default{
	state: { //存放状态
        orderListTodayAfter:[],//今天及以后的订单
		orderListByCheckInToday:[], //今天办理入住的订单
		orderListToday:[]//今天住宿订单

	},

	mutations: {
        updateOrderListTodayAfter(state,list=[]) {
			state.orderListTodayAfter = list;
		},
		updateOrderListByCheckInToday(state,list=[]){
			state.orderListByCheckInToday= list;
		},
		updateOrderListToday(state,list=[]){
			state.orderListToday=list;
		}

    },
    actions:{
        	//获取当天开始的订单
		 getOrderListTodayAfter(context,hotel_id) {
			return OrderService.getOrderListTodayAfter(hotel_id).then(res=>{
				context.commit("updateOrderListTodayAfter", res.data);
			})
		},
		//今日办理入住的客户
		getOrderListByCheckInToday(context,hotel_id){
			return OrderService.getOrderListByCheckIn(hotel_id,new Date()).then(res=>{
				context.commit("updateOrderListByCheckInToday",res.data);
			})	
		  },
		  getOrderListToday(context,hotel_id){			
			 return OrderService.getOrderListToday(hotel_id).then(res=>{
				context.commit("updateOrderListToday",res.data);
			 })
			}
    }
}
