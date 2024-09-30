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
		},
        async getScenicSpotList(state,hotel_id){
            console.log("刷新getScenicSpotList列表");
            
            try {
                uni.showLoading();
              const res = await   ScenicSpotService.getScenicSpotList(hotel_id);
              console.log("景点列表",res)
              store.commit('updateScenicSpotList', res.result.data);
              uni.hideLoading();
            } catch (error) {
              console.error(error);
              uni.hideLoading();
                uni.showModal({
                  content: "系统异常，请稍候再试！",
                  confirmText: "确认",
                });
            }
          }
	}
})
export default store;