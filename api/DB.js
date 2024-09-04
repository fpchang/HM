
class DB{
  constructor(){}
  callFunction(name,data){
	return  uniCloud.callFunction({
	  	name:name,
	  	data:Object.assign(data,{$_user:uni.getStorageSync('user')})
	  })
  }
   getCollection(dbName,w={}){
     
    return new Promise((resolve,reject)=>{
      if(!dbName){
       reject("dbName is invalid")
      }
      console.log(dbName);
      const db = uniCloud.database();
     // wx.cloud.database()
      db.collection(dbName).where(w).get().then(res=>{
        console.log(res.result);
        resolve(res.result)
      }).catch(err=>{
      })
    })
  }
  getCollectionGroupBy(dbName,w={},groupBy="_id asc"){
    return new Promise((resolve,reject)=>{
      if(!dbName){
       reject("dbName is invalid")
      }
      console.log(dbName);
      const db = uniCloud.Vs.database();
      db.collection(dbName).where(w).orderBy(groupBy).get().then(res=>{
        console.log(res.result);
        resolve(res.result)
      }).catch(err=>{
      })
    })
  }
  insertData(dbName,r={}){
    return new Promise((resolve,reject)=>{
      if(!dbName){
       reject("dbName is invalid")
      }
      const db = uniCloud.Vs.database();
      db.collection(dbName).add(r).then(res=>{
        resolve(res.result);
      }).catch(er=>{
        console.error(er);
        reject(er)
      })
    });
  }
  add(dbName,r={}){
    const db = uniCloud.Vs.database();
      return db.collection(dbName).add(r)  
  }
  update(dbName,_id="",data={}){
    const db = uniCloud.Vs.database();
    console.log(arguments)
    return db.collection(dbName).doc(_id).update(data);
  }
}
module.exports = new DB();