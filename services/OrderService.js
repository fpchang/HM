import DB from '../api/DB';
class OrderService{
    constructor(){
        this.DB=DB
    }
    /**
     * 创建订单
     */
    addOrder(orderObj){
        return this.DB.callFunction("hm_addOrder",{orderObj});
    }
    /**
     *  根据日期范围查找订单
     */
     
    getOrderListByCondition(hotel_id,st,et) {
        let startTime = new Date(new Date(st).Format("yyyy/MM/dd 14:00:00")).getTime();
        let endTime = new Date(new Date(et).Format("yyyy/MM/dd 12:00:00")).getTime();
        let jql =
            `hotel_id=='${hotel_id}'&&orderStatus!=10&&(checkInStartDateTimeStamp>=${startTime} ||` +
            `(${endTime}<checkInEndDateTimeStamp && ${endTime}>checkInStartDateTimeStamp))`;
        return this.DB.getCollection("hm-order", jql);
    }
      /** 
     * 获取当前酒店今天以后的订单信息
    */
  getOrderListTodayAfter(hotel_id) {
    let startTime = new Date(new Date().Format("yyyy/MM/dd 14:00:00")).getTime();
    let endTime = new Date(new Date().Format("yyyy/MM/dd 12:00:00")).getTime();
    let jql =
        `hotel_id=='${hotel_id}'&&orderStatus!=10&&(checkInStartDateTimeStamp>=${startTime} ||` +
        `(${endTime}<checkInEndDateTimeStamp && ${endTime}>checkInStartDateTimeStamp))`;
    return   this.DB.getCollection("hm-order", jql);
   
}
/**
 * 
 * @returns 删除订单
 */
deleteOrder(_id){
   return  this.DB.callFunction( 'hm-deleteOrder',{ _id});
}
}
module.exports =new OrderService();