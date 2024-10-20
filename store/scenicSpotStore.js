// 页面路径：store/index.js 
import Vue from 'vue';
import Vuex from 'vuex';
import DB from '../api/DB'
import ScenicSpotService from '../services/ScenicSpotService';
Vue.use(Vuex); //vue的插件机制

//Vuex.Store 构造器选项
const store = new Vuex.Store({
	state: { //存放状态
		scenicSpotList:[]
	},

	mutations: {
		setPcShow(state, flag) {
			state.isPcShow = flag;
		},
		setUser(state, user) {
			state.user = user;
		},
		//调用 this.$store.commit('updateHotelList',[])
		updateScenicSpotList(state, list) {
			state.scenicSpotList = list;
		}
        
	},
  actions:{
     getScenicSpotList(context,hotel_id){
      ScenicSpotService.getScenicSpotList(hotel_id).then(res=>{
        console.log("景点列表",res)
        context.commit('updateScenicSpotList', res.result.data);
      })
    }
  }
})
export default store;