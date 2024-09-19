import DB from '../api/DB';
class HotelService{
	constructor(){
        this.DB=DB;
    }
    /** 
     * 获取当前用户酒店列表
    */
      getHotelList(mobile){
              return DB.getCollection("hm-hotel", {
                    blongUserId:mobile
                 });
         
    }
    /** 
     * 获取当前酒店房型信息
    */
     getRoomType(hotel_id){
           return uniCloud.callFunction({
                name:"hm_getRoomType",
                data:{hotel_id}
            });
            let obj = res.result.data.length?res.result.data[0]:{};
           return obj;
     
       
    //    .then(res=>{				
    //        console.log("酒店房型",res);
    //        let obj = res.result.data.length?res.result.data[0]:{};
    //        store.commit("updateRoomType",obj);
           
    //    })
   }

  getOrderListTodayAfter(hotel_id) {
    let startTime = new Date(new Date().Format("yyyy/MM/dd 14:00:00")).getTime();
    let endTime = new Date(new Date().Format("yyyy/MM/dd 12:00:00")).getTime();
    let jql =
        `hotel_id=='${hotel_id}'&&orderStatus!=10&&(checkInStartDateTimeStamp>=${startTime} ||` +
        `(${endTime}<checkInEndDateTimeStamp && ${endTime}>checkInStartDateTimeStamp))`;
    return   this.DB.getCollection("hm-order", jql);
   
        
    //  .then(res => {
    //     console.log("获取的列表", res);
    //     store.commit("updateOrderListTodayAfter", res.data);

    // }).catch(error => {
    //     console.log(error);
    // })
}
}
module.exports =new HotelService();