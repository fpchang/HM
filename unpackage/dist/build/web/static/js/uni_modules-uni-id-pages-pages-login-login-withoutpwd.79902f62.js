(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["uni_modules-uni-id-pages-pages-login-login-withoutpwd"],{"0889":function(e,t,n){"use strict";n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return o})),n.d(t,"a",(function(){}));var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-uni-view",{staticClass:"uni-popup-dialog"},[n("v-uni-view",{staticClass:"uni-dialog-title"},[n("v-uni-text",{staticClass:"uni-dialog-title-text",class:["uni-popup__"+e.dialogType]},[e._v(e._s(e.titleText))])],1),"base"===e.mode?n("v-uni-view",{staticClass:"uni-dialog-content"},[e._t("default",[n("v-uni-text",{staticClass:"uni-dialog-content-text"},[e._v(e._s(e.content))])])],2):n("v-uni-view",{staticClass:"uni-dialog-content"},[e._t("default",["checkbox"===e.inputType?n("v-uni-input",{staticClass:"uni-dialog-input",attrs:{maxlength:e.maxlength,placeholder:e.placeholderText,focus:e.focus,type:"checkbox"},model:{value:e.val,callback:function(t){e.val=t},expression:"val"}}):"radio"===e.inputType?n("input",{directives:[{name:"model",rawName:"v-model",value:e.val,expression:"val"}],staticClass:"uni-dialog-input",attrs:{maxlength:e.maxlength,placeholder:e.placeholderText,focus:e.focus,type:"radio"},domProps:{checked:e._q(e.val,null)},on:{change:function(t){e.val=null}}}):n("input",{directives:[{name:"model",rawName:"v-model",value:e.val,expression:"val"}],staticClass:"uni-dialog-input",attrs:{maxlength:e.maxlength,placeholder:e.placeholderText,focus:e.focus,type:e.inputType},domProps:{value:e.val},on:{input:function(t){t.target.composing||(e.val=t.target.value)}}})])],2),n("v-uni-view",{staticClass:"uni-dialog-button-group"},[e.showClose?n("v-uni-view",{staticClass:"uni-dialog-button",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.closeDialog.apply(void 0,arguments)}}},[n("v-uni-text",{staticClass:"uni-dialog-button-text"},[e._v(e._s(e.closeText))])],1):e._e(),n("v-uni-view",{staticClass:"uni-dialog-button",class:e.showClose?"uni-border-left":"",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.onOk.apply(void 0,arguments)}}},[n("v-uni-text",{staticClass:"uni-dialog-button-text uni-button-color"},[e._v(e._s(e.okText))])],1)],1)],1)},o=[]},"10a0":function(e,t,n){"use strict";n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){return i}));var i={uniIdPagesAgreements:n("222b").default,uniEasyinput:n("2b5e").default,uniIdPagesFabLogin:n("baed").default},o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-uni-view",{staticClass:"uni-content"},[n("v-uni-view",{staticClass:"login-logo"},[n("v-uni-image",{attrs:{src:e.logo}})],1),n("v-uni-text",{staticClass:"title"},[e._v("请选择登录方式")]),["apple","weixin","weixinMobile"].includes(e.type)?[n("v-uni-text",{staticClass:"tip"},[e._v("将根据第三方账号服务平台的授权范围获取你的信息")]),n("v-uni-view",{staticClass:"quickLogin"},["weixinMobile"!==e.type?n("v-uni-image",{staticClass:"quickLoginBtn",attrs:{src:e.imgSrc,mode:"widthFix"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.quickLogin.apply(void 0,arguments)}}}):n("v-uni-button",{staticClass:"uni-btn",attrs:{type:"primary","open-type":"getPhoneNumber"},on:{getphonenumber:function(t){arguments[0]=t=e.$handleEvent(t),e.quickLogin.apply(void 0,arguments)}}},[e._v("微信授权手机号登录")]),n("uni-id-pages-agreements",{ref:"agreements",attrs:{scope:"register"}})],1)]:[n("v-uni-text",{staticClass:"tip"},[e._v("未注册的账号验证通过后将自动注册")]),n("v-uni-view",{staticClass:"phone-box"},[n("v-uni-view",{staticClass:"area",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.chooseArea.apply(void 0,arguments)}}},[e._v("+86")]),n("uni-easyinput",{staticClass:"input-box",attrs:{focus:e.focusPhone,type:"number",inputBorder:!1,maxlength:"11",placeholder:"请输入手机号"},on:{blur:function(t){arguments[0]=t=e.$handleEvent(t),e.focusPhone=!1}},model:{value:e.phone,callback:function(t){e.phone=t},expression:"phone"}})],1),n("uni-id-pages-agreements",{ref:"agreements",attrs:{scope:"register"}}),n("v-uni-button",{staticClass:"uni-btn",attrs:{type:"primary"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.toSmsPage.apply(void 0,arguments)}}},[e._v("获取验证码")])],n("uni-id-pages-fab-login",{ref:"uniFabLogin"})],2)},a=[]},"21cb":function(e,t,n){"use strict";n("6a54");var i=n("f5bd").default;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,n("64aa"),n("f7a5");var o=i(n("e22b")),a=n("d3b4"),r=i(n("8460")),u=(0,a.initVueI18n)(r.default),s=u.t,c={name:"uniPopupDialog",mixins:[o.default],emits:["confirm","close","update:modelValue","input"],props:{inputType:{type:String,default:"text"},showClose:{type:Boolean,default:!0},value:{type:[String,Number],default:""},placeholder:{type:[String,Number],default:""},type:{type:String,default:"error"},mode:{type:String,default:"base"},title:{type:String,default:""},content:{type:String,default:""},beforeClose:{type:Boolean,default:!1},cancelText:{type:String,default:""},confirmText:{type:String,default:""},maxlength:{type:Number,default:-1},focus:{type:Boolean,default:!0}},data:function(){return{dialogType:"error",val:""}},computed:{okText:function(){return this.confirmText||s("uni-popup.ok")},closeText:function(){return this.cancelText||s("uni-popup.cancel")},placeholderText:function(){return this.placeholder||s("uni-popup.placeholder")},titleText:function(){return this.title||s("uni-popup.title")}},watch:{type:function(e){this.dialogType=e},mode:function(e){"input"===e&&(this.dialogType="info")},value:function(e){-1!=this.maxlength&&"input"===this.mode?this.val=e.slice(0,this.maxlength):this.val=e},val:function(e){this.$emit("input",e)}},created:function(){this.popup.disableMask(),"input"===this.mode?(this.dialogType="info",this.val=this.value):this.dialogType=this.type},methods:{onOk:function(){"input"===this.mode?this.$emit("confirm",this.val):this.$emit("confirm"),this.beforeClose||this.popup.close()},closeDialog:function(){this.$emit("close"),this.beforeClose||this.popup.close()},close:function(){this.popup.close()}}};t.default=c},"222b":function(e,t,n){"use strict";n.r(t);var i=n("5d8e"),o=n("4c94");for(var a in o)["default"].indexOf(a)<0&&function(e){n.d(t,e,(function(){return o[e]}))}(a);n("2bf8");var r=n("828b"),u=Object(r["a"])(o["default"],i["b"],i["c"],!1,null,"63b69bf0",null,!1,i["a"],void 0);t["default"]=u.exports},"2bf8":function(e,t,n){"use strict";var i=n("57de"),o=n.n(i);o.a},3744:function(e,t,n){"use strict";(function(e){n("6a54");var i=n("f5bd").default;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,n("8f71"),n("bf0f"),n("4626"),n("5ac7"),n("2797"),n("aa9c"),n("5c47"),n("a1c1"),n("2c10"),n("c223"),n("0c26"),n("d4b5");var o=i(n("9b1b")),a=i(n("2634")),r=i(n("2fdc")),u=i(n("ac25")),s=n("f349"),c={computed:{agreements:function(){if(!u.default.agreements)return[];var e=u.default.agreements,t=e.serviceUrl,n=e.privacyUrl;return[{url:t,title:"用户服务协议"},{url:n,title:"隐私政策条款"}]},agree:{get:function(){return this.getParentComponent().agree},set:function(e){return this.getParentComponent().agree=e}}},data:function(){return{servicesList:[{id:"username",text:"账号登录",logo:"/uni_modules/uni-id-pages/static/login/uni-fab-login/user.png",path:"/uni_modules/uni-id-pages/pages/login/login-withpwd"},{id:"smsCode",text:"短信验证码",logo:"/uni_modules/uni-id-pages/static/login/uni-fab-login/sms.png",path:"/uni_modules/uni-id-pages/pages/login/login-withoutpwd?type=smsCode"},{id:"weixin",text:"微信登录",logo:"/uni_modules/uni-id-pages/static/login/uni-fab-login/weixin.png"},{id:"apple",text:"苹果登录",logo:"/uni_modules/uni-id-pages/static/app-plus/uni-fab-login/apple.png"},{id:"univerify",text:"一键登录",logo:"/uni_modules/uni-id-pages/static/app-plus/uni-fab-login/univerify.png"},{id:"taobao",text:"淘宝登录",logo:"/uni_modules/uni-id-pages/static/app-plus/uni-fab-login/taobao.png"},{id:"facebook",text:"脸书登录",logo:"/uni_modules/uni-id-pages/static/app-plus/uni-fab-login/facebook.png"},{id:"alipay",text:"支付宝登录",logo:"/uni_modules/uni-id-pages/static/app-plus/uni-fab-login/alipay.png"},{id:"qq",text:"QQ登录",logo:"/uni_modules/uni-id-pages/static/app-plus/uni-fab-login/qq.png"},{id:"google",text:"谷歌登录",logo:"/uni_modules/uni-id-pages/static/app-plus/uni-fab-login/google.png"},{id:"douyin",text:"抖音登录",logo:"/uni_modules/uni-id-pages/static/app-plus/uni-fab-login/douyin.png"},{id:"sinaweibo",text:"新浪微博",logo:"/uni_modules/uni-id-pages/static/app-plus/uni-fab-login/sinaweibo.png"}],univerifyStyle:{fullScreen:!0,backgroundColor:"#ffffff",buttons:{iconWidth:"45px",list:[]},privacyTerms:{defaultCheckBoxState:!1,textColor:"#BBBBBB",termsColor:"#5496E3",prefix:"我已阅读并同意",suffix:"并使用本机号码登录",privacyItems:[]}}}},watch:{agree:function(e){this.univerifyStyle.privacyTerms.defaultCheckBoxState=e}},created:function(){var e=this;return(0,r.default)((0,a.default)().mark((function t(){var n,i;return(0,a.default)().wrap((function(t){while(1)switch(t.prev=t.next){case 0:n=e.servicesList,i=u.default.loginTypes,n=n.filter((function(e){return"apple"!=e.id&&i.includes(e.id)})),i.includes("univerify")&&(e.univerifyStyle.privacyTerms.privacyItems=e.agreements,n.forEach((function(t){var n=t.id,i=t.logo,o=t.path;"univerify"!=n&&e.univerifyStyle.buttons.list.push({iconPath:i,provider:n,path:o})}))),e.servicesList=n.filter((function(t){var n=t.path?t.path.split("?")[0]:"";return n!=e.getRoute(1)}));case 5:case"end":return t.stop()}}),t)})))()},methods:{getParentComponent:function(){return this.$parent.$parent},setUserInfo:function(e){console.log("setUserInfo",e)},getRoute:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=getCurrentPages();return e>t.length?"":"/"+t[t.length-e].route},toPage:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;if(this.getRoute(1)==e.split("?")[0]&&"/uni_modules/uni-id-pages/pages/login/login-withoutpwd"==this.getRoute(1)){var n=e.split("?")[1].split("=")[1];uni.$emit("uni-id-pages-setLoginType",n)}else this.getRoute(2)==e?uni.navigateBack():this.getRoute(1)!=e?0===t?uni.navigateTo({url:e,animationType:"slide-in-left",complete:function(e){}}):uni.redirectTo({url:e,animationType:"slide-in-left",complete:function(e){}}):console.log("出乎意料的情况,path："+e)},login_before:function(e){var t=arguments,n=this;return(0,r.default)((0,a.default)().mark((function i(){var o,s,c,l,d,p,f,g,v,h,b;return(0,a.default)().wrap((function(i){while(1)switch(i.prev=i.next){case 0:if(s=!(t.length>1&&void 0!==t[1])||t[1],c=t.length>2&&void 0!==t[2]?t[2]:{},console.log(e),!["qq","xiaomi","sinaweibo","taobao","facebook","google","alipay","douyin"].includes(e)){i.next=5;break}return i.abrupt("return",uni.showToast({title:"该登录方式暂未实现，欢迎提交pr",icon:"none",duration:3e3}));case 5:if(!["univerify","apple"].includes(e)){i.next=7;break}return i.abrupt("return",uni.showToast({title:"当前设备不支持此登录，请选择其他登录方式",icon:"none",duration:3e3}));case 7:if(l=((null===u.default||void 0===u.default||null===(o=u.default.agreements)||void 0===o?void 0:o.scope)||[]).includes("register"),"univerify"==e||!l||n.agree){i.next=11;break}return d=n.getParentComponent().$refs.agreements,i.abrupt("return",d.popup((function(){n.login_before(e,s,c)})));case 11:if("weixin"!=e){i.next=20;break}if("/",p=location.protocol+"//"+location.host+"/".replace(/\/$/,"")+(window.location.href.includes("#")?"/#":"")+"/uni_modules/uni-id-pages/pages/login/login-withoutpwd?is_weixin_redirect=true&type=weixin",f=window.navigator.userAgent.toLowerCase(),"micromessenger"!=f.match(/MicroMessenger/i)){i.next=19;break}return i.abrupt("return",window.open("https://open.weixin.qq.com/connect/oauth2/authorize?\n\t\t\t\t\t\t\t\t\t\tappid=".concat(u.default.appid.weixin.h5,"\n\t\t\t\t\t\t\t\t\t\t&redirect_uri=").concat(encodeURIComponent(p),"\n\t\t\t\t\t\t\t\t\t\t&response_type=code\n\t\t\t\t\t\t\t\t\t\t&scope=snsapi_userinfo\n\t\t\t\t\t\t\t\t\t\t&state=STATE&connect_redirect=1#wechat_redirect")));case 19:return i.abrupt("return",location.href="https://open.weixin.qq.com/connect/qrconnect?appid=".concat(u.default.appid.weixin.web,"\n\t\t\t\t\t\t\t\t\t\t\t&redirect_uri=").concat(encodeURIComponent(p),"\n\t\t\t\t\t\t\t\t\t\t\t&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect"));case 20:if(uni.showLoading({mask:!0}),"univerify"!=e){i.next=28;break}return g=function(){uni.hideLoading(),v.close(),v.offButtonsClick(b)},v=uni.getUniverifyManager(),h=!1,b=function(){var e=(0,r.default)((0,a.default)().mark((function e(t){var i,o;return(0,a.default)().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return console.log("点击了第三方登录，provider：",t,t.provider,n.univerifyStyle.buttons.list),h=!0,e.next=4,uni.getCheckBoxState();case 4:i=e.sent,n.agree=i[1].state,o=n.univerifyStyle.buttons.list[t.index].path,o?(n.getRoute(1).includes("login-withoutpwd")&&o.includes("login-withoutpwd")&&n.getParentComponent().showCurrentWebview(),n.toPage(o,1),g()):n.agree?(g(),setTimeout((function(){n.login_before(t.provider)}),500)):uni.showToast({title:"你未同意隐私政策协议",icon:"none",duration:3e3});case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),v.onButtonsClick(b),i.abrupt("return",v.login({univerifyStyle:n.univerifyStyle,success:function(e){n.login(e.authResult,"univerify")},fail:function(e){console.log(e),h||uni.navigateBack()},complete:function(){var e=(0,r.default)((0,a.default)().mark((function e(t){return(0,a.default)().wrap((function(e){while(1)switch(e.prev=e.next){case 0:uni.hideLoading(),v.offButtonsClick(b);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()}));case 28:if("weixinMobile"!==e){i.next=30;break}return i.abrupt("return",n.login({phoneCode:c.phoneNumberCode},e));case 30:uni.login({provider:e,onlyAuthorize:!0,success:function(){var t=(0,r.default)((0,a.default)().mark((function t(i){var o;return(0,a.default)().wrap((function(t){while(1)switch(t.prev=t.next){case 0:if("apple"!=e){t.next=6;break}return t.next=3,n.getUserInfo({provider:"apple"});case 3:o=t.sent,Object.assign(i.authResult,o.userInfo),uni.hideLoading();case 6:n.login("weixin"==e?{code:i.code}:i.authResult,e);case 7:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),fail:function(){var e=(0,r.default)((0,a.default)().mark((function e(t){return(0,a.default)().wrap((function(e){while(1)switch(e.prev=e.next){case 0:console.log(t),uni.hideLoading();case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()});case 31:case"end":return i.stop()}}),i)})))()},login:function(t,n){console.log({params:t,type:n});var i="loginBy"+n.trim().replace(n[0],n[0].toUpperCase()),o=e.importObject("uni-id-co",{customUI:!0});o[i](t).then((function(e){uni.showToast({title:"登录成功",icon:"none",duration:2e3}),e.loginType=n,s.mutations.loginSuccess(e)})).catch((function(e){uni.showModal({content:e.message,confirmText:"知道了",showCancel:!1})})).finally((function(e){"univerify"==n&&uni.closeAuthView(),uni.hideLoading()}))},getUserInfo:function(e){return(0,r.default)((0,a.default)().mark((function t(){return(0,a.default)().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.abrupt("return",new Promise((function(t,n){uni.getUserInfo((0,o.default)((0,o.default)({},e),{},{success:function(e){t(e)},fail:function(e){uni.showModal({content:JSON.stringify(e),showCancel:!1}),n(e)}}))})));case 1:case"end":return t.stop()}}),t)})))()}}};t.default=c}).call(this,n("861b")["default"])},"4c94":function(e,t,n){"use strict";n.r(t);var i=n("bcf2e"),o=n.n(i);for(var a in i)["default"].indexOf(a)<0&&function(e){n.d(t,e,(function(){return i[e]}))}(a);t["default"]=o.a},"57de":function(e,t,n){var i=n("c0f8");i.__esModule&&(i=i.default),"string"===typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);var o=n("967d").default;o("184739bc",i,!0,{sourceMap:!1,shadowMode:!1})},"589a":function(e){e.exports=JSON.parse('{"uni-popup.cancel":"取消","uni-popup.ok":"確定","uni-popup.placeholder":"請輸入","uni-popup.title":"提示","uni-popup.shareTitle":"分享到"}')},"5d8e":function(e,t,n){"use strict";n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){return i}));var i={uniPopup:n("baf5").default,uniPopupDialog:n("672a").default},o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.agreements.length?n("v-uni-view",{staticClass:"root"},[e.needAgreements?[n("v-uni-checkbox-group",{on:{change:function(t){arguments[0]=t=e.$handleEvent(t),e.setAgree.apply(void 0,arguments)}}},[n("v-uni-label",{staticClass:"checkbox-box"},[n("v-uni-checkbox",{staticStyle:{transform:"scale(0.5)","margin-right":"-6px"},attrs:{checked:e.isAgree}}),n("v-uni-text",{staticClass:"text"},[e._v("同意")])],1)],1),n("v-uni-view",{staticClass:"content"},e._l(e.agreements,(function(t,i){return n("v-uni-view",{key:i,staticClass:"item"},[n("v-uni-text",{staticClass:"agreement text",on:{click:function(n){arguments[0]=n=e.$handleEvent(n),e.navigateTo(t)}}},[e._v(e._s(t.title))]),e.hasAnd(e.agreements,i)?n("v-uni-text",{staticClass:"text and",attrs:{space:"nbsp"}},[e._v("和")]):e._e()],1)})),1)]:e._e(),e.needAgreements||e.needPopupAgreements?n("uni-popup",{ref:"popupAgreement",attrs:{type:"center"}},[n("uni-popup-dialog",{attrs:{confirmText:"同意"},on:{confirm:function(t){arguments[0]=t=e.$handleEvent(t),e.popupConfirm.apply(void 0,arguments)}}},[n("v-uni-view",{staticClass:"content"},[n("v-uni-text",{staticClass:"text"},[e._v("请先阅读并同意")]),e._l(e.agreements,(function(t,i){return n("v-uni-view",{key:i,staticClass:"item"},[n("v-uni-text",{staticClass:"agreement text",on:{click:function(n){arguments[0]=n=e.$handleEvent(n),e.navigateTo(t)}}},[e._v(e._s(t.title))]),e.hasAnd(e.agreements,i)?n("v-uni-text",{staticClass:"text and",attrs:{space:"nbsp"}},[e._v("和")]):e._e()],1)}))],2)],1)],1):e._e()],2):e._e()},a=[]},"672a":function(e,t,n){"use strict";n.r(t);var i=n("0889"),o=n("e06a");for(var a in o)["default"].indexOf(a)<0&&function(e){n.d(t,e,(function(){return o[e]}))}(a);n("c419");var r=n("828b"),u=Object(r["a"])(o["default"],i["b"],i["c"],!1,null,"b2d7af54",null,!1,i["a"],void 0);t["default"]=u.exports},"68c0":function(e,t,n){var i=n("d0ffe");i.__esModule&&(i=i.default),"string"===typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);var o=n("967d").default;o("27785058",i,!0,{sourceMap:!1,shadowMode:!1})},"786b":function(e,t,n){var i=n("c86c");t=i(!1),t.push([e.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* uni.scss */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */\r\n/*操作文字颜色-蓝色*/.input-box[data-v-6b31aca0]  .uni-input-input[type="password"]::-ms-reveal{display:none}.uni-content[data-v-6b31aca0]{padding:0 %?60?%}.login-logo[data-v-6b31aca0]{display:none}@media screen and (min-width:690px){.uni-content[data-v-6b31aca0]{margin:0 auto;position:relative;top:100px;padding:30px 40px 80px 40px;max-width:450px;max-height:450px;border-radius:10px;box-shadow:0 0 20px #efefef;background-color:#fff}.login-logo[data-v-6b31aca0]{display:flex;justify-content:center}.login-logo uni-image[data-v-6b31aca0]{width:60px;height:60px}.register-back[data-v-6b31aca0]{display:none}uni-button[data-v-6b31aca0]{padding-bottom:1px}}.uni-content uni-view[data-v-6b31aca0]{box-sizing:border-box}.title[data-v-6b31aca0]{display:flex;padding:18px 0;font-weight:800;flex-direction:column}.tip[data-v-6b31aca0]{display:flex;color:#bdbdc0;font-size:11px;margin:6px 0}.uni-content[data-v-6b31aca0]  .uni-easyinput__content,\r\n.input-box[data-v-6b31aca0]{height:44px;background-color:#f8f8f8!important;border-radius:0;font-size:14px;display:flex;flex:1}.link[data-v-6b31aca0]{color:#04498c;cursor:pointer}.uni-content[data-v-6b31aca0]  .uni-forms-item__inner{padding-bottom:8px}.uni-btn[data-v-6b31aca0]{text-align:center;height:40px;line-height:40px;margin:15px 0 10px 0;color:#fff!important;border-radius:5px;font-size:16px}.uni-body.uni_modules-uni-id-pages-pages-login-login-withoutpwd[data-v-6b31aca0]{height:auto!important}@media screen and (min-width:690px){.uni-content[data-v-6b31aca0]{height:350px}}.uni-content[data-v-6b31aca0],\r\n.quickLogin[data-v-6b31aca0]{display:flex;flex-direction:column}.phone-box[data-v-6b31aca0]{position:relative;display:flex}.area[data-v-6b31aca0]{position:absolute;left:10px;z-index:9;top:12px;font-size:14px}.area[data-v-6b31aca0]::after{content:"";border:3px solid transparent;border-top-color:#000;top:12px;left:3px;position:relative}.input-box[data-v-6b31aca0]{box-sizing:border-box;flex:1;padding-left:45px;margin-bottom:10px;border-radius:0}.quickLogin[data-v-6b31aca0]{height:350px;align-items:center;justify-content:center}.quickLoginBtn[data-v-6b31aca0]{margin:20px 0;width:%?450?%;max-width:230px;height:%?82?%}.tip[data-v-6b31aca0]{margin-top:-15px;margin-bottom:20px}@media screen and (min-width:690px){.quickLogin[data-v-6b31aca0]{height:auto}}',""]),e.exports=t},8241:function(e,t,n){"use strict";var i=n("8903"),o=n.n(i);o.a},8460:function(e,t,n){"use strict";n("6a54");var i=n("f5bd").default;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=i(n("b18e")),a=i(n("a461")),r=i(n("589a")),u={en:o.default,"zh-Hans":a.default,"zh-Hant":r.default};t.default=u},8903:function(e,t,n){var i=n("f063");i.__esModule&&(i=i.default),"string"===typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);var o=n("967d").default;o("5e7f23bd",i,!0,{sourceMap:!1,shadowMode:!1})},"8b05":function(e,t,n){"use strict";n.r(t);var i=n("9047"),o=n.n(i);for(var a in i)["default"].indexOf(a)<0&&function(e){n.d(t,e,(function(){return i[e]}))}(a);t["default"]=o.a},9047:function(e,t,n){"use strict";n("6a54");var i=n("f5bd").default;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,n("5c47"),n("0506"),n("4626"),n("8f71"),n("bf0f");var o=i(n("2634")),a=i(n("2fdc")),r=i(n("ac25")),u=i(n("aee2")),s={mixins:[u.default],data:function(){return{type:"",phone:"",focusPhone:!1,logo:"/static/logo.png"}},computed:{loginTypes:function(){return(0,a.default)((0,o.default)().mark((function e(){return(0,o.default)().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",r.default.loginTypes);case 1:case"end":return e.stop()}}),e)})))()},isPhone:function(){return/^1\d{10}$/.test(this.phone)},imgSrc:function(){return"weixin"==this.type?"/uni_modules/uni-id-pages/static/login/weixin.png":"/uni_modules/uni-id-pages/static/app-plus/apple.png"}},onLoad:function(e){var t=this;return(0,a.default)((0,o.default)().mark((function n(){var i;return(0,o.default)().wrap((function(n){while(1)switch(n.prev=n.next){case 0:i=e.type||r.default.loginTypes[0],t.type=i,"univerify"!=i&&(t.focusPhone=!0),t.$nextTick((function(){["weixin","apple"].includes(i)&&(t.$refs.uniFabLogin.servicesList=t.$refs.uniFabLogin.servicesList.filter((function(e){return e.id!=i})))})),uni.$on("uni-id-pages-setLoginType",(function(e){t.type=e}));case 5:case"end":return n.stop()}}),n)})))()},onShow:function(){var e=this;document.onkeydown=function(t){var n=t||window.event;n&&13==n.keyCode&&e.toSmsPage()}},onUnload:function(){uni.$off("uni-id-pages-setLoginType")},onReady:function(){},methods:{showCurrentWebview:function(){(void 0).setStyle({top:0})},quickLogin:function(e){var t,n,i={};null!==(t=e.detail)&&void 0!==t&&t.code&&(i.phoneNumberCode=e.detail.code),("weixinMobile"!==this.type||null!==(n=e.detail)&&void 0!==n&&n.code)&&this.$refs.uniFabLogin.login_before(this.type,!0,i)},toSmsPage:function(){return this.isPhone?this.needAgreements&&!this.agree?this.$refs.agreements.popup(this.toSmsPage):void uni.navigateTo({url:"/uni_modules/uni-id-pages/pages/login/login-smscode?phoneNumber="+this.phone}):(this.focusPhone=!0,uni.showToast({title:"手机号码格式不正确",icon:"none",duration:3e3}))},toPwdLogin:function(){uni.navigateTo({url:"../login/password"})},chooseArea:function(){uni.showToast({title:"暂不支持其他国家",icon:"none",duration:3e3})}}};t.default=s},"9b3f":function(e,t,n){"use strict";n.r(t);var i=n("10a0"),o=n("8b05");for(var a in o)["default"].indexOf(a)<0&&function(e){n.d(t,e,(function(){return o[e]}))}(a);n("f4f5");var r=n("828b"),u=Object(r["a"])(o["default"],i["b"],i["c"],!1,null,"6b31aca0",null,!1,i["a"],void 0);t["default"]=u.exports},a461:function(e){e.exports=JSON.parse('{"uni-popup.cancel":"取消","uni-popup.ok":"确定","uni-popup.placeholder":"请输入","uni-popup.title":"提示","uni-popup.shareTitle":"分享到"}')},aa57:function(e,t,n){var i=n("786b");i.__esModule&&(i=i.default),"string"===typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);var o=n("967d").default;o("a6e77706",i,!0,{sourceMap:!1,shadowMode:!1})},ab5c:function(e,t,n){"use strict";n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return o})),n.d(t,"a",(function(){}));var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-uni-view",[n("v-uni-view",{staticClass:"fab-login-box"},e._l(e.servicesList,(function(t,i){return n("v-uni-view",{key:i,staticClass:"item",on:{click:function(n){arguments[0]=n=e.$handleEvent(n),t.path?e.toPage(t.path):e.login_before(t.id,!1)}}},[n("v-uni-image",{staticClass:"logo",attrs:{src:t.logo,mode:"scaleToFill"}}),n("v-uni-text",{staticClass:"login-title"},[e._v(e._s(t.text))])],1)})),1)],1)},o=[]},aee2:function(e,t,n){"use strict";n("6a54");var i=n("f5bd").default;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=i(n("9b1b"));n("4626"),n("5ac7"),n("bf0f"),n("2797");var a=n("f349"),r=i(n("ac25")),u={data:function(){return{config:r.default,uniIdRedirectUrl:"",isMounted:!1}},onUnload:function(){document.onkeydown=!1},mounted:function(){this.isMounted=!0},onLoad:function(e){var t=this;if(e.is_weixin_redirect){if(uni.showLoading({mask:!0}),window.location.href.includes("#")){var n=window.location.href.split("?")[1].split("&");n.forEach((function(t){var n=t.split("=");"code"==n[0]&&(e.code=n[1])}))}this.$nextTick((function(n){t.$refs.uniFabLogin.login({code:e.code},"weixin")}))}e.uniIdRedirectUrl&&(this.uniIdRedirectUrl=decodeURIComponent(e.uniIdRedirectUrl))},computed:{needAgreements:function(){if(this.isMounted)return!!this.$refs.agreements&&this.$refs.agreements.needAgreements},agree:{get:function(){if(this.isMounted)return!this.$refs.agreements||this.$refs.agreements.isAgree},set:function(e){this.$refs.agreements?this.$refs.agreements.isAgree=e:console.log("不存在 隐私政策协议组件")}}},methods:{loginSuccess:function(e){a.mutations.loginSuccess((0,o.default)((0,o.default)({},e),{},{uniIdRedirectUrl:this.uniIdRedirectUrl}))}}},s=u;t.default=s},b18e:function(e){e.exports=JSON.parse('{"uni-popup.cancel":"cancel","uni-popup.ok":"ok","uni-popup.placeholder":"pleace enter","uni-popup.title":"Hint","uni-popup.shareTitle":"Share to"}')},baed:function(e,t,n){"use strict";n.r(t);var i=n("ab5c"),o=n("bda6");for(var a in o)["default"].indexOf(a)<0&&function(e){n.d(t,e,(function(){return o[e]}))}(a);n("8241");var r=n("828b"),u=Object(r["a"])(o["default"],i["b"],i["c"],!1,null,"10c08e46",null,!1,i["a"],void 0);t["default"]=u.exports},bcf2e:function(e,t,n){"use strict";n("6a54");var i=n("f5bd").default;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,n("4626"),n("5ac7");var o=i(n("ac25")),a=function(){return console.log("为定义")},r={name:"uni-agreements",computed:{agreements:function(){if(!o.default.agreements)return[];var e=o.default.agreements,t=e.serviceUrl,n=e.privacyUrl;return[{url:t,title:"用户服务协议"},{url:n,title:"隐私政策条款"}]}},props:{scope:{type:String,default:function(){return"register"}}},methods:{popupConfirm:function(){this.isAgree=!0,a()},popup:function(e){var t=this;this.needPopupAgreements=!0,this.$nextTick((function(){e&&(a=e),t.$refs.popupAgreement.open()}))},navigateTo:function(e){var t=e.url,n=e.title;uni.navigateTo({url:"/uni_modules/uni-id-pages/pages/common/webview/webview?url="+t+"&title="+n,success:function(e){},fail:function(){},complete:function(){}})},hasAnd:function(e,t){return e.length-1>t},setAgree:function(e){this.isAgree=!this.isAgree,this.$emit("setAgree",this.isAgree)}},created:function(){var e;this.needAgreements=((null===o.default||void 0===o.default||null===(e=o.default.agreements)||void 0===e?void 0:e.scope)||[]).includes(this.scope)},data:function(){return{isAgree:!1,needAgreements:!0,needPopupAgreements:!1}}};t.default=r},bda6:function(e,t,n){"use strict";n.r(t);var i=n("3744"),o=n.n(i);for(var a in i)["default"].indexOf(a)<0&&function(e){n.d(t,e,(function(){return i[e]}))}(a);t["default"]=o.a},c0f8:function(e,t,n){var i=n("c86c");t=i(!1),t.push([e.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* uni.scss */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */\r\n/*操作文字颜色-蓝色*/uni-view[data-v-63b69bf0]{display:flex;box-sizing:border-box;flex-direction:column}.root[data-v-63b69bf0]{flex-direction:row;align-items:center;font-size:12px;color:#8a8f8b}.checkbox-box[data-v-63b69bf0], .uni-label-pointer[data-v-63b69bf0]{align-items:center;display:flex;flex-direction:row}.item[data-v-63b69bf0]{flex-direction:row}.text[data-v-63b69bf0]{line-height:26px}.agreement[data-v-63b69bf0]{color:#04498c;cursor:pointer}.checkbox-box[data-v-63b69bf0]  .uni-checkbox-input{border-radius:100%}.checkbox-box[data-v-63b69bf0]  .uni-checkbox-input.uni-checkbox-input-checked{border-color:#007aff;color:#fff!important;background-color:#007aff}.content[data-v-63b69bf0]{flex-wrap:wrap;flex-direction:row}.root[data-v-63b69bf0]  .uni-popup__error{color:#333}',""]),e.exports=t},c419:function(e,t,n){"use strict";var i=n("68c0"),o=n.n(i);o.a},d0ffe:function(e,t,n){var i=n("c86c");t=i(!1),t.push([e.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* uni.scss */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */\r\n/*操作文字颜色-蓝色*/.uni-popup-dialog[data-v-b2d7af54]{width:300px;border-radius:11px;background-color:#fff}.uni-dialog-title[data-v-b2d7af54]{display:flex;flex-direction:row;justify-content:center;padding-top:25px}.uni-dialog-title-text[data-v-b2d7af54]{font-size:16px;font-weight:500}.uni-dialog-content[data-v-b2d7af54]{display:flex;flex-direction:row;justify-content:center;align-items:center;padding:20px}.uni-dialog-content-text[data-v-b2d7af54]{font-size:14px;color:#6c6c6c}.uni-dialog-button-group[data-v-b2d7af54]{display:flex;flex-direction:row;border-top-color:#f5f5f5;border-top-style:solid;border-top-width:1px}.uni-dialog-button[data-v-b2d7af54]{display:flex;flex:1;flex-direction:row;justify-content:center;align-items:center;height:45px}.uni-border-left[data-v-b2d7af54]{border-left-color:#f0f0f0;border-left-style:solid;border-left-width:1px}.uni-dialog-button-text[data-v-b2d7af54]{font-size:16px;color:#333}.uni-button-color[data-v-b2d7af54]{color:#007aff}.uni-dialog-input[data-v-b2d7af54]{flex:1;font-size:14px;border:1px #eee solid;height:40px;padding:0 10px;border-radius:5px;color:#555}.uni-popup__success[data-v-b2d7af54]{color:#4cd964}.uni-popup__warn[data-v-b2d7af54]{color:#f0ad4e}.uni-popup__error[data-v-b2d7af54]{color:#dd524d}.uni-popup__info[data-v-b2d7af54]{color:#909399}',""]),e.exports=t},e06a:function(e,t,n){"use strict";n.r(t);var i=n("21cb"),o=n.n(i);for(var a in i)["default"].indexOf(a)<0&&function(e){n.d(t,e,(function(){return i[e]}))}(a);t["default"]=o.a},e22b:function(e,t,n){"use strict";n("6a54"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i={data:function(){return{}},created:function(){this.popup=this.getParent()},methods:{getParent:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"uniPopup",t=this.$parent,n=t.$options.name;while(n!==e){if(t=t.$parent,!t)return!1;n=t.$options.name}return t}}};t.default=i},f063:function(e,t,n){var i=n("c86c");t=i(!1),t.push([e.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* uni.scss */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */\r\n/*操作文字颜色-蓝色*/.fab-login-box[data-v-10c08e46],\r\n.item[data-v-10c08e46]{display:flex;box-sizing:border-box;flex-direction:column}.fab-login-box[data-v-10c08e46]{flex-direction:row;flex-wrap:wrap;width:%?750?%;justify-content:space-around;position:fixed;left:0}.item[data-v-10c08e46]{flex-direction:column;justify-content:center;align-items:center;height:%?200?%;cursor:pointer}@media screen and (min-width:690px){.fab-login-box[data-v-10c08e46]{max-width:500px;margin-left:calc(50% - 250px)}.item[data-v-10c08e46]{height:%?160?%}}@media screen and (max-width:690px){.fab-login-box[data-v-10c08e46]{bottom:%?10?%}}.logo[data-v-10c08e46]{width:%?60?%;height:%?60?%;max-width:40px;max-height:40px;border-radius:100%;border:solid 1px #f6f6f6}.login-title[data-v-10c08e46]{text-align:center;margin-top:6px;color:#999;font-size:10px;width:70px}',""]),e.exports=t},f349:function(e,t,n){"use strict";(function(e){n("6a54");var i=n("f5bd").default;Object.defineProperty(t,"__esModule",{value:!0}),t.store=t.mutations=void 0;var o=i(n("2634")),a=i(n("9b1b")),r=i(n("2fdc"));n("dc8a"),n("bf0f"),n("2797"),n("c223");var u=i(n("e5c8")),s=i(n("ac25")),c=i(n("9b8e")),l=e.importObject("uni-id-co"),d=e.database(),p=d.collection("uni-id-users"),f=uni.getStorageSync("uni-id-pages-userInfo")||{},g={userInfo:f,hasLogin:0!=Object.keys(f).length},v={updateUserInfo:function(){var t=arguments,n=this;return(0,r.default)((0,o.default)().mark((function i(){var r,u,s,c;return(0,o.default)().wrap((function(i){while(1)switch(i.prev=i.next){case 0:if(r=t.length>0&&void 0!==t[0]&&t[0],!r){i.next=5;break}p.where("_id==$env.uid").update(r).then((function(e){e.result.updated?(uni.showToast({title:"更新成功",icon:"none",duration:3e3}),n.setUserInfo(r)):uni.showToast({title:"没有改变",icon:"none",duration:3e3})})),i.next=20;break;case 5:return u=e.importObject("uni-id-co",{customUI:!0}),i.prev=6,i.next=9,p.where("'_id' == $cloudEnv_uid").field("mobile,nickname,username,email,avatar_file").get();case 9:return s=i.sent,i.next=12,u.getRealNameInfo();case 12:c=i.sent,n.setUserInfo((0,a.default)((0,a.default)({},s.result.data[0]),{},{realNameAuth:c})),i.next=20;break;case 16:i.prev=16,i.t0=i["catch"](6),n.setUserInfo({},{cover:!0}),console.error(i.t0.message,i.t0.errCode);case 20:case"end":return i.stop()}}),i,null,[[6,16]])})))()},setUserInfo:function(e){var t=arguments;return(0,r.default)((0,o.default)().mark((function n(){var i,a,r;return(0,o.default)().wrap((function(n){while(1)switch(n.prev=n.next){case 0:return i=t.length>1&&void 0!==t[1]?t[1]:{cover:!1},a=i.cover,r=a?e:Object.assign(h.userInfo,e),h.userInfo=Object.assign({},r),h.hasLogin=0!=Object.keys(h.userInfo).length,uni.setStorageSync("uni-id-pages-userInfo",h.userInfo),n.abrupt("return",e);case 6:case"end":return n.stop()}}),n)})))()},logout:function(){var t=this;return(0,r.default)((0,o.default)().mark((function n(){return(0,o.default)().wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(!(e.getCurrentUserInfo().tokenExpired>Date.now())){n.next=9;break}return n.prev=1,n.next=4,l.logout();case 4:n.next=9;break;case 6:n.prev=6,n.t0=n["catch"](1),console.error(n.t0);case 9:uni.removeStorageSync("uni_id_token"),uni.setStorageSync("uni_id_token_expired",0),uni.redirectTo({url:"/".concat(u.default.uniIdRouter&&u.default.uniIdRouter.loginPage?u.default.uniIdRouter.loginPage:"uni_modules/uni-id-pages/pages/login/login-withoutpwd")}),uni.$emit("uni-id-pages-logout"),t.setUserInfo({},{cover:!0});case 14:case"end":return n.stop()}}),n,null,[[1,6]])})))()},loginBack:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.uniIdRedirectUrl,n=void 0===t?"":t,i=0,o=getCurrentPages();if(o.forEach((function(e,t){"login"==o[o.length-t-1].route.split("/")[3]&&i++})),n)return uni.redirectTo({url:n,fail:function(e){uni.switchTab({url:n,fail:function(t){console.log(e,t)}})}});if("weixin"==e.loginType)return window.history.go(-3);if(i){var a=u.default.pages[0];return uni.reLaunch({url:"/".concat(a.path)})}uni.navigateBack({delta:i})},loginSuccess:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.showToast,n=void 0===t||t,i=e.toastText,o=void 0===i?"登录成功":i,a=e.autoBack,r=void 0===a||a,u=e.uniIdRedirectUrl,c=void 0===u?"":u,l=e.passwordConfirmed;if(n&&uni.showToast({title:o,icon:"none",duration:3e3}),this.updateUserInfo(),uni.$emit("uni-id-pages-login-success"),s.default.setPasswordAfterLogin&&!l)return uni.redirectTo({url:c?"/uni_modules/uni-id-pages/pages/userinfo/set-pwd/set-pwd?uniIdRedirectUrl=".concat(c,"&loginType=").concat(e.loginType):"/uni_modules/uni-id-pages/pages/userinfo/set-pwd/set-pwd?loginType=".concat(e.loginType),fail:function(e){console.log(e)}});r&&this.loginBack({uniIdRedirectUrl:c})}};t.mutations=v;var h=c.default.observable(g);t.store=h}).call(this,n("861b")["default"])},f4f5:function(e,t,n){"use strict";var i=n("aa57"),o=n.n(i);o.a}}]);