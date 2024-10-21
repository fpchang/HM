'use strict';
const tokenEvent = require('tokenEvent');
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event);
	const db =uniCloud.database();
	const dbJQL = uniCloud.databaseForJQL({
		event,
		context
	})
	try{
		const {$token} = event;
		const verifyTokenObj =tokenEvent.verifyToken($token,"****");
		 
		 const {phone} = verifyTokenObj.value;
		 console.log(">>>",phone);
		const emTemp = dbJQL.collection("hm-employee").where({phone}).getTemp();
		const hoTemp = dbJQL.collection("hm-hotel").getTemp();
		const res = await dbJQL.collection(emTemp,hoTemp).get();
		
		return formatHotelToArray(res.data)
	}catch(e){
		throw new Error(e)
	}
	
};
  function formatHotelToArray(list=[]){
        let arr =[];
        list.map(item=>{
          arr.push(item.hotel_id[0]);  
        })
        return arr;
    }