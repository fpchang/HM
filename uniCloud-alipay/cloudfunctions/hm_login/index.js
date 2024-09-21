'use strict';
const dateFormat = require('dateFormat');
const jwt = require('jsonwebtoken');
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	let {
		smsCode,
		mobile
	} = event;
	const secret = "****";
	const newToken = getToken({name:"123"},secret);
	const verifT = verifyToken(newToken,secret);
	console.log("token----",new Date(verifT.exp));

	// 	const dbJQL = uniCloud.databaseForJQL({ // 获取JQL database引用，此处需要传入云函数的event和context，必传
	// 		event,
	// 		context
	// 	})
	// const user = await dbJQL.collection('hm-user').where(`mobile=='${mobile}'`).get();
	// if(user.data.length>0){
	// 	return user;
	// }
	
	// //添加新用记到数据表hm-user
	// const res = await uniCloud.callFunction({
	// 	name:'hm-addUser',
	// 	data:{userInfo:getUser(mobile)}
	// })
//	return res;
	
};
//生成token,过期时间设置为7天

function getToken(value,secret){
	return jwt.sign({value},secret,{expiresIn:new Date().getTime()+1000*60*60*24*7})
}
//解密token
// iat签名时间，exp 过期时间1726994855 new Date(1726994855)
function verifyToken(token,secret){
	try {
		return jwt.verify(token,secret);
	} catch (error) {
		
	}
}
function getUser(mobile) {
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
		"blongEmployment": []
	}
}