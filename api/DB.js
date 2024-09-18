
class DB{
  constructor(){
	  this.db=uniCloud.database();
  }
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
     
      this.db.collection(dbName).where(w).limit(100).get().then(res=>{
        console.log(res.result);
        resolve(res.result)
      }).catch(err=>{
		  reject(err)
      })
    })
  }
  getCollectionGroupBy(dbName,w={},groupBy="_id asc"){
    return new Promise((resolve,reject)=>{
      if(!dbName){
       reject("dbName is invalid")
      }
     
      this.db.collection(dbName).where(w).orderBy(groupBy).get().then(res=>{
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
      this.db.collection(dbName).add(r).then(res=>{
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
    return this.db.collection(dbName).doc(_id).update(data);
  }
}
module.exports = new DB();