'use strict';
const dateFormat = require('dateFormat');
//计算剩余房型数据
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event);
	let {
		hotel_id,
		startTime,
		endTime
	} = event;
	startTime = new Date(dateFormat(new Date(startTime), "yyyy/MM/dd") + " 14:00:00").getTime();
	endTime = new Date(dateFormat(new Date(endTime), "yyyy/MM/dd") + " 12:00:00").getTime();
	//console.log("sss",new Date(dateFormat(new Date(startTime), "yyyy/MM/dd")),new Date(dateFormat(new Date(startTime), "yyyy/MM/dd")+" 13:00:00"));
	let jql =`hotel_id=='${hotel_id}'&&orderStatus!=10&&(`+
		`${endTime}<=checkInEndDateTimeStamp&&${endTime}>checkInStartDateTimeStamp||` +
		`${startTime}>=checkInStartDateTimeStamp&&${endTime}<=checkInEndDateTimeStamp||` +
		`${startTime}>=checkInStartDateTimeStamp&&${startTime}<checkInEndDateTimeStamp||` +
		`${startTime}<=checkInStartDateTimeStamp&&${endTime}>=checkInEndDateTimeStamp)`;
	console.log("参数jql", jql)
	const dbJQL = uniCloud.databaseForJQL({
		event,
		context
	})
	let result;
	const roomTypeListRes = await uniCloud.callFunction({
		name: 'hm_getRoomType',
		data: {
			hotel_id
		}
	})
	
	let roomTypeList = roomTypeListRes.result.data;
	console.log("YYYY11",roomTypeList);
	const usedListRes= await dbJQL.collection('hm-order').where(jql).get();
	let userRoomList=usedListRes.data;
	console.log("yyyy2",userRoomList)
	let remainList=roomTypeList.map(item=>{
		let sumCount =0;
		for(const it of userRoomList){
			let is = it.roomTypeArray.find(i=>{return i.roomType_id==item._id});
			if(is){
				sumCount+=is.count
				continue;
			}
			
		}
		item.remainCount=Math.max(item.count-sumCount,0);
		return item;
	})
	console.log("yyy222",remainList);
	return remainList.filter(item=>item.remainCount>0);
};