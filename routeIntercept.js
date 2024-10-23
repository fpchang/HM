
let unneedLogin = [
  "/pages/index/index"
]
let list =["request"];// ["navigateTo", "redirectTo", "reLaunch", "switchTab","request"];
// list.forEach(item => { //用遍历的方式分别为,uni.navigateTo,uni.redirectTo,uni.reLaunch,uni.switchTab这4个路由方法添加拦截器
//   console.log(item, 'router list item');

// })

// uni.addInterceptor("request", {
//   invoke(args) { // 调用前拦截
//     const needLoginFunctionArray=['hm_getHotelList']
//     const token = uni.getStorageSync("hm_token");
//     const  urlArray= args.url.split("cloudfunctions/");
//     console.log("拦截token",urlArray);
//     if(!token && needLoginFunctionArray.includes(urlArray[1])){
//       console.log("转到登录")
//       uni.reLaunch({
//          	url: '/pages/login/login'
//        	});
//         return false;
//     }
//     return true;
//   },
//   returnValue(){
// 	  throw new Error("1111")
//   },
//   fail(err) {
//     console.log("失败拦截",err);
// 	throw new Error("222222")
// 	uni.hideLoading();
// 	return false;
//   },
// })