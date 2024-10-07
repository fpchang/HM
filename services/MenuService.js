import DB from '../api/DB';
class MenuService{
    constructor(){
        this.DB=DB
    }
    /*
    *获取菜单列表
    */
    getMenuList(hotel_id){
        const db = uniCloud.database();
        const mt=   db.collection("hm-menuType").where({hotel_id}).getTemp();
        const mtd =  db.collection("hm-menuDetail").getTemp();
       return   db.collection(mt,mtd).get();
  
    }
	/*
	*添加菜单分类
	*/
	addMenuType(menuTypeObj){
	    return this.DB.callFunction("hm_addMenuType",{menuTypeObj})
	}
      /*
    *删除菜单分类
    */
    removeMenuType(MenuType_id){
        return this.DB.callFunction("hm_deleteMenuType",{_id:menuType_id})
    }
	/**
	 * 编辑价格分类
	 * @param {*} obj 
	 * @returns 
	 */
	editMenuType(_id,menuTypeObj){
	  return  DB.callFunction("hm_editMenuType", {  _id, menuTypeObj})
	}
      /*
    *删除菜单详情
    */
    removeMenuDetail(menuDetail_id){
        return this.DB.callFunction("hm_deleteMenuDetail",{_id:menuDetail_id})
    }
    /**
     * 添加价格条目
     * @param {*} MenuDetailObj 
     * @returns 
     */
    addMenuDetail(menuDetailObj){
        return  DB.callFunction("hm_addMenuDetail", {
                menuDetailObj,
            })
    }
    /**
     * 编辑价格条目
     * @param {*} obj 
     * @returns 
     */
    editMenuDetail(_id,menuDetail){
      return  DB.callFunction("hm_editMenuDetail", {
		  _id,menuDetail
	  })
    }
}
module.exports =new MenuService();