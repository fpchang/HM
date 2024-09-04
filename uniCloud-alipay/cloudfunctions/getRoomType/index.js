'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	let {jql,$_user} =event;
	console.log("hm-getRoomType",event);
	const dbJQL = uniCloud.databaseForJQL({
			event,
			context
		})
		//jql=jql+`&&blongUserId=='${$_user.userId}'`;
		console.log(22222,jql)
	const result  = await dbJQL.collection('hm-roomType').where(jql).get();
	return result;
};
