
class DB{
  constructor(){
	  this.db=uniCloud.database();
  }
  callFunction(name,data={}){
	return  uniCloud.callFunction({
	  	name:name,
	  	data:Object.assign(data,{
        $user:uni.getStorageSync('user'),
        $token:uni.getStorageSync('hm_token'),
        $secret:getApp().globalData.secret
      })
	  })
  }
   getCollection(dbName,w={}){
    return  new Promise((resolve,reject)=>{
      if(!dbName){
       reject("dbName is invalid")
      }
     
      this.db.collection(dbName).where(w).limit(100).get().then(res=>{
        resolve(res.result)
      }).catch(err=>{
		    reject(err)
      })
    });
  
  }
  getCollectionGroupBy(dbName,w={},groupBy="_id asc"){
    return new Promise((resolve,reject)=>{
      if(!dbName){
       reject("dbName is invalid")
      }
     
      this.db.collection(dbName).where(w).orderBy(groupBy).get().then(res=>{
        resolve(res.result)
      }).catch(err=>{
      })
    })
  }
  insertData(dbName,r={}){
    if(!dbName){
       return "dbName is invalid"
     }
    return this.db.collection(dbName).add(r);

  }
  add(dbName,r={}){
    const db = uniCloud.Vs.database();
      return db.collection(dbName).add(r)  
  }
  update(dbName,_id="",data={}){
    return this.db.collection(dbName).doc(_id).update(data);
  }
}
module.exports = new DB();