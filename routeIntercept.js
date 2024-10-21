
let unneedLogin = [
  "/pages/index/index"
]
let list =["request"];// ["navigateTo", "redirectTo", "reLaunch", "switchTab","request"];
// list.forEach(item => { //用遍历的方式分别为,uni.navigateTo,uni.redirectTo,uni.reLaunch,uni.switchTab这4个路由方法添加拦截器
//   console.log(item, 'router list item');

// })

uni.addInterceptor("request", {
  invoke(args) { // 调用前拦截
   // console.log(this.$store.state)
    //获取用户的token
    //console.log(args)
    const needLoginFunctionArray=['hm_getHotelList']
    const token = uni.getStorageSync("hm_token");
    const  urlArray= args.url.split("cloudfunctions/");
   // console.log("拦截token",token,urlArray);
    if(!token && needLoginFunctionArray.includes(urlArray[1])){
      uni.reLaunch({
         		url: '/pages/login/login'
       	});
        return false;
    }
    //args.data.param
    return true;
  },
  fail(err) { // 失败回调拦截
    console.log(err);
  },
})