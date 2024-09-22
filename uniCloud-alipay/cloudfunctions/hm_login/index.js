'use strict';
const dateFormat = require('dateFormat');
const jwt = require('../node_modules/jsonwebtoken');
const tokenEvent = require('tokenEvent');
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	let {
		
		userForm,
		token
	} = event;
	let {smsCode,mobile}=userForm;
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
		const dbJQL = uniCloud.databaseForJQL({ // 获取JQL database引用，此处需要传入云函数的event和context，必传
			event,
			context
		})
	const user = await dbJQL.collection('hm-user').where(`mobile=='${mobile}'`).get();
	if(user.data.length>0){
		return user;
	}
	
	//添加新用记到数据表hm-user
	const res = await uniCloud.callFunction({
		name:'hm-addUser',
		data:{userInfo:getUser(mobile)}
	})
	return res;
	
};

function getUser(mobile,token) {
	let vipStartDateStamp = new Date().getTime();
	let vipEndDateStamp = new Date().getTime()+ 7*1000*60*60*24;
	return  {
		"idCard": "",
		"vipStartDateStamp": vipStartDateStamp,
		"isVip": true,
		"nickName": "",
		"mobile": mobile,
		"userId": mobile,
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