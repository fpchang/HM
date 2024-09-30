import DB from '../api/DB';
class scenicSpotService{
    constructor(){
        this.DB=DB
    }
    /*
    *获取景点列表
    */
    getScenicSpotList(hotel_id){
        console.log("hotelService,getScenicSpotList",hotel_id);
        const db = uniCloud.database();
        const ss=   db.collection("hm-scenicSpot").where({hotel_id}).getTemp();
        const ssd =  db.collection("hm-scenicSpotPriceDetail").getTemp();
       return   db.collection(ss,ssd).get();
  
    }
      /*
    *删除景点
    */
    removeScenicSpot(scenicSpot_id){
        console.log("scenicSpotService removeScenicSpot ",scenicSpot_id)
        return this.DB.callFunction("hm_deleteScenicSpot",{_id:scenicSpot_id})
    }
      /*
    *删除景点价格详情
    */
    removeScenicSpotDetail(scenicSpotDetail_id){
        return this.DB.callFunction("hm_deleteScenicSpotDetail",{_id:scenicSpotDetail_id})
    }

}
module.exports =new scenicSpotService();