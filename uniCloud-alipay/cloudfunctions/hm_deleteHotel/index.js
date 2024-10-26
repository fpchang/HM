'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const {hotel_id}=event;
	const dbJQL = uniCloud.databaseForJQL({
			event,
			context
		});
		try{
			await dbJQL.collection("hm-hotel").doc(hotel_id).update({dataStatus:10});
		}catch(e){
			throw new Error(e)
		}

};
