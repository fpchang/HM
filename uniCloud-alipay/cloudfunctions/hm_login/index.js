'use strict';
const dateFormat = require('dateFormat');
const jwt = require('jsonwebtoken');
const tokenEvent = require('tokenEvent');
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event);
	const starttime = new Date().getTime();
	let {
		
		userForm,
		token
	} = event;
	let {smsCode,phone}=userForm;
	const secret = "****";
	const newToken = tokenEvent.getToken({name:"123"},secret,new Date().getTime());
	const verifT = tokenEvent.verifyToken(newToken,secret);
	console.log("token----",verifT.exp);
// if(token){
// 	const verifT = verifyToken(newToken,secret);
// 	if(new Date().getTime()>verifT.exp){
// 		retrn 
// 	}
// }
console.warn("1111", new Date().getTime()-starttime);
		const db = uniCloud.database();
		const dbJQL = uniCloud.databaseForJQL({ // 获取JQL database引用，此处需要传入云函数的event和context，必传
			event,
			context
		})
		try{
			console.warn("2222", new Date().getTime()-starttime);
			const user = await dbJQL.collection('hm-user').where(`phone=='${phone}'`).get();
			//const user = await db.collection('hm-user').where({"phone":phone}).get();
			console.warn("3333",user, new Date().getTime()-starttime);
			if(user.data.length>0){
				return user;
			}
			//添加新用记到数据表hm-user
			const res = await uniCloud.callFunction({
				name:'hm-addUser',
				data:{userInfo:getUser(phone)}
			})
			console.warn("4444", new Date().getTime()-starttime);
			return res;
		}catch(e){
			console.error("login error",e)
		}
	
	
	
	
	
};

function getUser(phone,token) {
	let vipStartDateStamp = new Date().getTime();
	let vipEndDateStamp = new Date().getTime()+ 7*1000*60*60*24;
	return  {
		"idCard": "",
		"vipStartDateStamp": vipStartDateStamp,
		"isVip": true,
		"nickName": "",
		"phone": phone,
		"userId": phone,
		"userName": "",
		"vipEndDate": dateFormat(new Date(vipEndDateStamp),"yyyy-MM-dd HH:mm:ss"),
		"vipEndDateStamp":vipEndDateStamp,
		"vipStartDate": dateFormat(new Date(vipStartDateStamp),"yyyy-MM-dd HH:mm:ss"),
		"wxNickName": "",
		"wxOpenId": "",
		"token":token,
		"blongEmployment": []
	}
}