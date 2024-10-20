import DB from '../api/DB';
class HotelService{
	constructor(){
        this.DB=DB;
    }
    /** 创建酒店*/
    createHotel(hotelObj){
      return   DB.callFunction("hm_createHotel",{hotelObj});
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
     * 根据id获取酒店信息
     */
    getHotelInfoById(hotel_id){
        return this.DB.getCollection("hm-hotel",{_id:hotel_id})
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
   /** get employeeList */
   getEmployeeList(hotel_id){
    return DB.getCollectionGroupBy("hm-employee",{hotel_id},"role asc")
   }
}
module.exports =new HotelService();