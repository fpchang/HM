import DB from '../api/DB';
class HotelService{
	constructor(){
        this.DB=DB;
    }
    /** 
     * 获取当前用户酒店列表
    */
      getHotelList(phone){
        if(!phone){
            console.log("error,phone is not valid");
            return new Promise((resolve,reject)=>{reject({
                code:"1002",
                text:"手机号无效"
            })});
        }
            const dbCmd = uniCloud.database().command;
              return DB.getCollection("hm-hotel",dbCmd.or([
                {
                    belong:phone
                 },
                 {
                    employee: dbCmd.elemMatch({
                        "phone":phone
                    })
                 }
              ]));
         
    }
    /** 
     * 获取当前酒店房型信息
    */
     getRoomType(hotel_id){
           return DB.callFunction(
                "hm_getRoomType",
                {hotel_id}
            );
            let obj = res.result.data.length?res.result.data:[];
           return obj;
     
   }
      /** 
     * 获取当前酒店合作景点信息
    */
//        getScenicSpotList(hotel_id){
//         console.log("hotelService,getScenicSpotList",hotel_id);
//         const db = uniCloud.database();
//         const ss=   db.collection("hm-scenicSpot").where({hotel_id}).getTemp();
//         const ssd =  db.collection("hm-scenicSpotPriceDetail").getTemp();
//        return   db.collection(ss,ssd).get();
  
// }
  /** 
     * 获取当前酒店今天以后的订单信息
    */
//   getOrderListTodayAfter(hotel_id) {
//     let startTime = new Date(new Date().Format("yyyy/MM/dd 14:00:00")).getTime();
//     let endTime = new Date(new Date().Format("yyyy/MM/dd 12:00:00")).getTime();
//     let jql =
//         `hotel_id=='${hotel_id}'&&orderStatus!=10&&(checkInStartDateTimeStamp>=${startTime} ||` +
//         `(${endTime}<checkInEndDateTimeStamp && ${endTime}>checkInStartDateTimeStamp))`;
//     return   this.DB.getCollection("hm-order", jql);
   
// }
}
module.exports =new HotelService();