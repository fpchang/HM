
import DB from '../../api/DB'
import MenuService from '../../services/MenuService';


//Vuex.Store 构造器选项
export default{
	state: { //存放状态
		menuList:[]
	},

	mutations: {
		//调用 this.$store.commit('updateHotelList',[])
		updateMenuList(state, list) {
			state.menuList = list;
		}
	},
  actions:{
     getMenuList(context,hotel_id){
      console.log("刷新getMenuList列表");
      return  MenuService.getMenuList(hotel_id).then(res=>{
        context.commit('updateMenuList', res.result.data);
      })
    }
  }
}