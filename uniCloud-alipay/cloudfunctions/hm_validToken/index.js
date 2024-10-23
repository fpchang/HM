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
			throw new Error("参数token无效")
		}
		
		const verifT = tokenEvent.verifyToken($token,tokenEvent.getSecret());
		if(!verifT){
			//throw errorEvent.getTokenError("token已过有效期");
			return {code:9990,msg:"token已过有效期"}
		}
		const {phone} = verifT.value;
		const userRes = await dbJQL.collection("hm-user").where({phone}).get();
		if(userRes.data[0]['hm_token']!=$token){
				//throw errorEvent.getTokenError();	
			return {code:9991,msg:"账号已在别外登录"}
		}
		return {code:0,msg:""};
	}catch(e){
			// throw errorEvent.getTokenError();
			throw new Error("数据异常")
	}
	//返回数据给客户端
	//return event
};
