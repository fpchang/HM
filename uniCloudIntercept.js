uniCloud.addInterceptor('callFunction', {
  invoke(param) {
    // param为拦截Api的参数 例 {name: 'functionName', data: {'functionParam1': 1, 'functionParam2': 2}}
    // 此处返回错误可终止api执行
  },
  success(res) {
    // res为callFunction的返回值，此处可以对返回值进行修改
    console.warn("拦截res:",res)
    if(res.errCode==0){
      //成功
      
    }
  },
  fail(err) {
    // err为callFunction抛出的错误
    //return Promise.reject(err);
  },
  complete(res){
    // complete内res为上面的res或err
  }
});
uniCloud.addInterceptor('database', {
  invoke(param) {
    // param为拦截Api的参数 例 {name: 'functionName', data: {'functionParam1': 1, 'functionParam2': 2}}
    // 此处返回错误可终止api执行
  },
  success(res) {
    // res为callFunction的返回值，此处可以对返回值进行修改
    res=1111111111;
    console.log(res)
  },
  fail(err) {
    // err为callFunction抛出的错误
  },
  complete(res){
    // complete内res为上面的res或err
  }
});
uniCloud.addInterceptor('uploadFile', {
  invoke(param) {
    // param为拦截Api的参数 例 {name: 'functionName', data: {'functionParam1': 1, 'functionParam2': 2}}
    // 此处返回错误可终止api执行
  },
  success(res) {
    // res为callFunction的返回值，此处可以对返回值进行修改
  },
  fail(err) {
    // err为callFunction抛出的错误
  },
  complete(res){
    // complete内res为上面的res或err
  }
})