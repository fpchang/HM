import DB from '../api/DB';
class MineService{
	constructor(){
        this.DB=DB;
    }
    //添加意见反馈
    add(feedbackObj){
       return  DB.callFunction("hm_addFeedback",{feedbackObj});
    }
   
}
module.exports =new MineService();