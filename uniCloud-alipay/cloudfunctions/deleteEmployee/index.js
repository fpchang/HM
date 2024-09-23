'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	let {
		_id,
		type,
		employee
	} = event;
	if(!['manage','employee'].includes(type)){
		return new Promise((resolve,reject)=>{
			reject({errCode:"100",msg:"type 参数不正确"})
		})
	}
	console.log("hm_deleteREmployee", event);
	const db = uniCloud.database();
	const dCmd = db.command;
	let updateObj;
	if (type == 'manage') {
		updateObj = {
			manager: dCmd.pull({
				mobile: employee.mobile
			})
		}
	}else{
		updateObj = {
			employee: dCmd.pull({
				mobile: employee.mobile
			})
		}
	}
	
	const result = await db.collection('hm-hotel').doc(_id).update(updateObj);
	return result;
};