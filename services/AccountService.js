import DB from '../api/DB';
class AccountService{
	constructor(){
        this.DB=DB;
        this.validTokenRequest=null;
    }

    
  validToken(){
    const token = uni.getStorageSync('hm_token');
    return DB.callFunction("hm_validToken") ;
  }
  login(userForm){    
    return DB.callFunction("hm_login", { userForm})
  }
  getuserByToken(){
    return DB.getCollection("hm-user",{hm_token:uni.getStorageSync("hm_token")});
  }
  updateUserName(_id,userName){
    return DB.update("hm-user",_id,{userName});
  }
}
module.exports =new AccountService();