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
	 *  今天办理入住订单
	 */
	getOrderListByCheckIn(hotel_id,st) {
	    let startTime = new Date(new Date(st).Format("yyyy/MM/dd 14:00:00")).getTime();
	    let jql = `hotel_id=='${hotel_id}'&&orderStatus!=10&&checkInStartDateTimeStamp==${startTime}`;
	    return this.DB.getCollection("hm-order", jql);
	}
    /**
	 *  今天住客订单
	 */
	getOrderListToday(hotel_id) {
	    let startTime = new Date(new Date().Format("yyyy/MM/dd 14:00:00")).getTime();
        const s0 =  `hotel_id=='${hotel_id}'&&orderStatus!=10`
        const s1 = `${startTime}>=checkInStartDateTimeStamp&&${startTime}<checkInEndDateTimeStamp`;
	    let jql = `${s0}&&${s1}`;
	    return this.DB.getCollection("hm-order", jql);
	}
    /**
     *  根据日期范围查找订单
     */
     
    getOrderListByCondition(hotel_id,st,et) {
        console.log(arguments);
        let startTime = new Date(new Date(st).Format("yyyy/MM/dd 14:00:00")).getTime();
        let endTime = new Date(new Date(et).Format("yyyy/MM/dd 12:00:00")).getTime();
		const s1=`checkInStartDateTimeStamp<${startTime}&&checkInEndDateTimeStamp>${startTime}`;
		const s2=`checkInStartDateTimeStamp>=${startTime}&&checkInEndDateTimeStamp<=${endTime}`;
		const s3=`checkInStartDateTimeStamp<${endTime}&&checkInStartDateTimeStamp>=${startTime}&&checkInEndDateTimeStamp>=${endTime}`
        const s4=`checkInStartDateTimeStamp<=${startTime}&&checkInEndDateTimeStamp>=${endTime}`;
		
		let jql =
            `hotel_id=='${hotel_id}'&&orderStatus!=10&&(${s1}||${s2}||${s3}||${s4})`;
        return this.DB.getCollectionGroupBy("hm-order", jql,"checkInStartDateTimeStamp asc");
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
    return   this.DB.getCollectionGroupBy("hm-order", jql,"checkInStartDateTimeStamp asc");
   
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