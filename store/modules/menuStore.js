
import DB from '../../api/DB'
import MenuService from '../../services/MenuService';


//Vuex.Store 构造器选项
export default{
	state: { //存放状态
		menuList:null,
		orderDishesToday:[] //今日预定的餐饮订单
	},

	mutations: {
		//调用 this.$store.commit('updateHotelList',[])
		updateMenuList(state, list=[]) {
			state.menuList = list;
		},
		updateOrderDishesToday(state,list=[]){
			state.orderDishesToday = list;
		}
	},
  actions:{
     getMenuList(context,hotel_id){
		return new Promise((resolve,reject)=>{
			MenuService.getMenuList(hotel_id).then(res=>{
				console.log("菜单列表",res.result.data)
				context.commit('updateMenuList', res.result.data);
				resolve();
			  }).catch(e=>{
				reject(e)
			  })
		})
     
    },
	 getOrderDishesToday(context,hotel_id){
		
		  let w ={
			hotel_id:hotel_id,
			mealDate: new Date().Format("yyyy-MM-dd")
		  }
		  return MenuService.getOrderDishesListByCondition(w).then(res=>{
			context.commit("updateOrderDishesToday",res.data)
		  })
		}

  }
}