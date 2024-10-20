
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
      
      // try {
      //     uni.showLoading();
      //   const res = await   MenuService.getMenuList(hotel_id);
      //   console.log("菜单列表",res)
      //   store.commit('updateMenuList', res.result.data);
      //   uni.hideLoading();
      // } catch (error) {
      //   console.error(error);
      //   uni.hideLoading();
      //     uni.showModal({
      //       content: "系统异常，请稍候再试！",
      //       confirmText: "确认",
      //     });
      // }
    }
  }
}