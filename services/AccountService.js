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
}
module.exports =new AccountService();