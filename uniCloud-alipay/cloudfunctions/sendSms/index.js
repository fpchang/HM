'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const {appid,phone}=event;
	try {
	    const res = await uniCloud.sendSms({
	      appid: appid,
	      phone: phone,
	      templateId: '100**', // 请替换为自己申请的模板id
	      data: {
	        name: 'DCloud',
	        code: '123456',
	        expMinute: '3',
	      }
	    })
	    // 调用成功，请注意这时不代表发送成功
	    return res
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
