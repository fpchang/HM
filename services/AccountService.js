import DB from '../api/DB';
class AccountService{
	constructor(){
        this.DB=DB;
    }

    
  validToken(){
    const token = uni.getStorageSync('hm_token');
    return new Promise(async (resolve,reject)=>{
      if(!token){
        reject({code:100,msg:"无效的token"});
      }
      try {
        const res = await DB.callFunction("hm_validToken");
        if(res.result.code==0){
          resolve();
          return;
        }
        reject({code:100,msg:"无效的token"})
      } catch (error) {
        reject(error);
      }
      
        
    })
  }
}
module.exports =new AccountService();