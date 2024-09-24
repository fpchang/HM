'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	let {
		_id,
		employee
	} = event;
	console.log("hm_deleteREmployee", event);
	const db = uniCloud.database();
	const dCmd = db.command;
	let updateObj= {
			employee: dCmd.pull({
				phone: employee.phone
			})
		}

	
	const result = await db.collection('hm-hotel').doc(_id).update(updateObj);
	return result;
};