'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	let {
		smsCode,
		mobile
	} = event;
		const dbJQL = uniCloud.databaseForJQL({ // 获取JQL database引用，此处需要传入云函数的event和context，必传
			event,
			context
		})
	const user = await dbJQL.collection('hm-user').where(`mobile=='${mobile}'`).get();
	return user
};

function getUserItem(mobile) {
	let userItem = {
		"idCard": "",
		"ipStartDateStamp": "",
		"isVip": true,
		"nickName": "",
		"mobile": mobile,
		"userId": mobile,
		"userName": "",
		"vipEndDate": "",
		"vipEndDateStamp": "",
		"vipStartDate": "",
		"wxNickName": "",
		"wxOpenId": "",
		"blongEmployment": []
	}
}