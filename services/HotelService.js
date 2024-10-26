import DB from '../api/DB';
class HotelService{
	constructor(){
        this.DB=DB;
    }

    
    /**
     *
     *
     * @param {*} hotelObj
     * @return {*} 
     * @memberof HotelService
     */
    createHotel(hotelObj){
      return   DB.callFunction("hm_createHotel",{hotelObj});
    }
    updateHotel(hotel_id,hotelObj){
      return   DB.callFunction("hm_updateHotel",{hotel_id,hotelObj});
    }
    /** 
     * 获取当前用户酒店列表
    */
      getHotelList(){
            return DB.callFunction("hm_getHotelList");
         
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