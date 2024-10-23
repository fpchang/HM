'use strict';
const tokenEvent = require('tokenEvent');
const errorEvent = require('errorEvent');
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const dbJQL = uniCloud.databaseForJQL({
		event,context
	});
	try{
		const {$token} = event;
		if(!$token){
			throw errorEvent.getTokenError();
		}
		
		const verifT = tokenEvent.verifyToken($token,tokenEvent.getSecret());
		if(!verifT){
			throw errorEvent.getTokenError("token已过有效期");
		}
		const {phone} = verifT.value;
		const userRes = await dbJQL.collection("hm-user").where({phone}).get();
		if(userRes.data[0]['hm_token']!=$token){
				throw errorEvent.getTokenError();		
		}
		return {code:0,msg:""};
	}catch(e){
			throw errorEvent.getTokenError();
	}
	//返回数据给客户端
	//return event
};
