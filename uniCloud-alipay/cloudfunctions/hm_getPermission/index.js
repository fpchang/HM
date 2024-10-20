'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	//根据手机号，店铺id 获取用户权限
	console.log('event : ', event)
	const {phone,hotel_id} =event;
	// const db = uniCloud.database();
	 const dbJQL = uniCloud.databaseForJQL({
	 		event,
	 		context
	 	})
	 //获取角色
	 try{
	 	const roleObj = await dbJQL.collection("hm-employee").where({hotel_id,phone}).get();
	 	const role_name = roleObj.data[0]['role']
		if(role_name=="administrator"){
			const resper = await dbJQL.collection("hm-permission").field("permission_name").get();
			let perArr = resper.data.map(item=>item.permission_name);
			return perArr
		}
	 	const permission_select  = dbJQL.collection("hm-permission").getTemp();
	 	const role_permission_select = dbJQL.collection("hm-role-permission").where( {role_name}).getTemp();
	 	const res = await dbJQL.collection(role_permission_select,permission_select).get(); 
	 	return  formatPermissionToArray(res.data);
	 }catch(e){
	 	throw new Error(e)
	 }
	 
	
};
  function formatPermissionToArray(list=[]){
        let arr =[];
        list.map(item=>{
          arr.push(item.permission_id[0].permission_name);  
        })
        return arr;
    }