'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event,context);
	let {appid,phone,templateId='uni_sms_test'} =event;
	const {appId} =context;
	console.log("1111>>>>",vv)
	return {}
	  try {
		  const smsCode =randomSms();
	    const res = await uniCloud.sendSms({
	      appid:appId,
	      phone: phone,
	      templateId: templateId, // 请替换为自己申请的模板id
	      data: {
	        name: 'DCloud',
	        code: smsCode,
	        expMinute: '3',
	      }
	    })
	    // 调用成功，请注意这时不代表发送成功
	    return res;
	  } catch(err) {
	    // 调用失败
	    console.log(err.errCode)
	    console.log(err.errMsg)
	    return {
	      code: err.errCode,
	      msg: err.errMsg
	    }
	  }
	
};
//随机6位短信验证码
function randomSms() {
	let res = '';
	for(var i = 0; i < 6; i++) res += Math.floor(Math.random()*10);
	return res;
}