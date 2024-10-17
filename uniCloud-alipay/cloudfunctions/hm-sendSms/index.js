'use strict';
const { networkInterfaces } = require('os');
const tokenEvent = require('tokenEvent');
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event,context);
	let {appid,phone,templateId='uni_sms_test'} =event;
	 const smsCode =randomSms();
	const newToken = tokenEvent.getToken({phone:phone,smsCode:smsCode},"****",(new Date().getTime()+1000*60*10));
	console.log("生成。。。",newToken)
	return {code:0,tk:newToken};
	const {appId} =context;
	  try {
		 
	    const res = await uniCloud.sendSms({
	      appid:appId,
	      phone: phone,
	      templateId: 'uni_sms_test', // 请替换为自己申请的模板id
	      data: {
	        name: 'DCloud',
	        code: smsCode,
	        expMinute: '3',
	      }
	    });
		const newToken = tokenEvent.getToken({phone:phone},"****",(new Date().getTime()+1000*60*10));
		console.log("生成。。。",newToken)
		return {code:0,tk:newToken};
	    // 调用成功，请注意这时不代表发送成功
	  } catch(err) {
	    // 调用失败
	    console.log(err)
	    console.log(err)
	    return {
	      code: err.errCode,
	      msg: err.errMsg
	    }
	  }
	
};
//随机6位短信验证码
function randomSms() {
	let res = '';
	for(var i = 0; i < 4; i++) res += Math.floor(Math.random()*10);
	return res;
}