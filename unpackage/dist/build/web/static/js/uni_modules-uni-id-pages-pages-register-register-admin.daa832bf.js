(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["uni_modules-uni-id-pages-pages-register-register-admin"],{"0315":function(e,t,n){"use strict";var i=n("f681"),a=n.n(i);a.a},"0889":function(e,t,n){"use strict";n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){}));var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-uni-view",{staticClass:"uni-popup-dialog"},[n("v-uni-view",{staticClass:"uni-dialog-title"},[n("v-uni-text",{staticClass:"uni-dialog-title-text",class:["uni-popup__"+e.dialogType]},[e._v(e._s(e.titleText))])],1),"base"===e.mode?n("v-uni-view",{staticClass:"uni-dialog-content"},[e._t("default",[n("v-uni-text",{staticClass:"uni-dialog-content-text"},[e._v(e._s(e.content))])])],2):n("v-uni-view",{staticClass:"uni-dialog-content"},[e._t("default",["checkbox"===e.inputType?n("v-uni-input",{staticClass:"uni-dialog-input",attrs:{maxlength:e.maxlength,placeholder:e.placeholderText,focus:e.focus,type:"checkbox"},model:{value:e.val,callback:function(t){e.val=t},expression:"val"}}):"radio"===e.inputType?n("input",{directives:[{name:"model",rawName:"v-model",value:e.val,expression:"val"}],staticClass:"uni-dialog-input",attrs:{maxlength:e.maxlength,placeholder:e.placeholderText,focus:e.focus,type:"radio"},domProps:{checked:e._q(e.val,null)},on:{change:function(t){e.val=null}}}):n("input",{directives:[{name:"model",rawName:"v-model",value:e.val,expression:"val"}],staticClass:"uni-dialog-input",attrs:{maxlength:e.maxlength,placeholder:e.placeholderText,focus:e.focus,type:e.inputType},domProps:{value:e.val},on:{input:function(t){t.target.composing||(e.val=t.target.value)}}})])],2),n("v-uni-view",{staticClass:"uni-dialog-button-group"},[e.showClose?n("v-uni-view",{staticClass:"uni-dialog-button",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.closeDialog.apply(void 0,arguments)}}},[n("v-uni-text",{staticClass:"uni-dialog-button-text"},[e._v(e._s(e.closeText))])],1):e._e(),n("v-uni-view",{staticClass:"uni-dialog-button",class:e.showClose?"uni-border-left":"",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.onOk.apply(void 0,arguments)}}},[n("v-uni-text",{staticClass:"uni-dialog-button-text uni-button-color"},[e._v(e._s(e.okText))])],1)],1)],1)},a=[]},1373:function(e,t,n){"use strict";n.r(t);var i=n("ca9e"),a=n.n(i);for(var r in i)["default"].indexOf(r)<0&&function(e){n.d(t,e,(function(){return i[e]}))}(r);t["default"]=a.a},"21cb":function(e,t,n){"use strict";n("6a54");var i=n("f5bd").default;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,n("64aa"),n("f7a5");var a=i(n("e22b")),r=n("d3b4"),o=i(n("8460")),s=(0,r.initVueI18n)(o.default),u=s.t,l={name:"uniPopupDialog",mixins:[a.default],emits:["confirm","close","update:modelValue","input"],props:{inputType:{type:String,default:"text"},showClose:{type:Boolean,default:!0},value:{type:[String,Number],default:""},placeholder:{type:[String,Number],default:""},type:{type:String,default:"error"},mode:{type:String,default:"base"},title:{type:String,default:""},content:{type:String,default:""},beforeClose:{type:Boolean,default:!1},cancelText:{type:String,default:""},confirmText:{type:String,default:""},maxlength:{type:Number,default:-1},focus:{type:Boolean,default:!0}},data:function(){return{dialogType:"error",val:""}},computed:{okText:function(){return this.confirmText||u("uni-popup.ok")},closeText:function(){return this.cancelText||u("uni-popup.cancel")},placeholderText:function(){return this.placeholder||u("uni-popup.placeholder")},titleText:function(){return this.title||u("uni-popup.title")}},watch:{type:function(e){this.dialogType=e},mode:function(e){"input"===e&&(this.dialogType="info")},value:function(e){-1!=this.maxlength&&"input"===this.mode?this.val=e.slice(0,this.maxlength):this.val=e},val:function(e){this.$emit("input",e)}},created:function(){this.popup.disableMask(),"input"===this.mode?(this.dialogType="info",this.val=this.value):this.dialogType=this.type},methods:{onOk:function(){"input"===this.mode?this.$emit("confirm",this.val):this.$emit("confirm"),this.beforeClose||this.popup.close()},closeDialog:function(){this.$emit("close"),this.beforeClose||this.popup.close()},close:function(){this.popup.close()}}};t.default=l},"222b":function(e,t,n){"use strict";n.r(t);var i=n("5d8e"),a=n("4c94");for(var r in a)["default"].indexOf(r)<0&&function(e){n.d(t,e,(function(){return a[e]}))}(r);n("2bf8");var o=n("828b"),s=Object(o["a"])(a["default"],i["b"],i["c"],!1,null,"63b69bf0",null,!1,i["a"],void 0);t["default"]=s.exports},"2bf8":function(e,t,n){"use strict";var i=n("57de"),a=n.n(i);a.a},"3c97":function(e,t,n){"use strict";var i;n("6a54"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,n("64aa");var a={name:"UniMatchMedia",props:{width:{type:[Number,String],default:""},minWidth:{type:[Number,String],default:""},maxWidth:{type:[Number,String],default:""},height:{type:[Number,String],default:""},minHeight:{type:[Number,String],default:""},maxHeight:{type:[Number,String],default:""},orientation:{type:String,default:""}},data:function(){return{matches:!0}},mounted:function(){var e=this;i=uni.createMediaQueryObserver(this),i.observe({width:this.width,maxWidth:this.maxWidth,minWidth:this.minWidth,height:this.height,minHeight:this.minHeight,maxHeight:this.maxHeight,orientation:this.orientation},(function(t){e.matches=t}))},destroyed:function(){i.disconnect()}};t.default=a},"3d10":function(e,t,n){var i=n("bf9b");i.__esModule&&(i=i.default),"string"===typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);var a=n("967d").default;a("d2b13d04",i,!0,{sourceMap:!1,shadowMode:!1})},"4c94":function(e,t,n){"use strict";n.r(t);var i=n("bcf2e"),a=n.n(i);for(var r in i)["default"].indexOf(r)<0&&function(e){n.d(t,e,(function(){return i[e]}))}(r);t["default"]=a.a},"57de":function(e,t,n){var i=n("c0f8");i.__esModule&&(i=i.default),"string"===typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);var a=n("967d").default;a("184739bc",i,!0,{sourceMap:!1,shadowMode:!1})},"589a":function(e){e.exports=JSON.parse('{"uni-popup.cancel":"取消","uni-popup.ok":"確定","uni-popup.placeholder":"請輸入","uni-popup.title":"提示","uni-popup.shareTitle":"分享到"}')},"5d8e":function(e,t,n){"use strict";n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return r})),n.d(t,"a",(function(){return i}));var i={uniPopup:n("baf5").default,uniPopupDialog:n("672a").default},a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.agreements.length?n("v-uni-view",{staticClass:"root"},[e.needAgreements?[n("v-uni-checkbox-group",{on:{change:function(t){arguments[0]=t=e.$handleEvent(t),e.setAgree.apply(void 0,arguments)}}},[n("v-uni-label",{staticClass:"checkbox-box"},[n("v-uni-checkbox",{staticStyle:{transform:"scale(0.5)","margin-right":"-6px"},attrs:{checked:e.isAgree}}),n("v-uni-text",{staticClass:"text"},[e._v("同意")])],1)],1),n("v-uni-view",{staticClass:"content"},e._l(e.agreements,(function(t,i){return n("v-uni-view",{key:i,staticClass:"item"},[n("v-uni-text",{staticClass:"agreement text",on:{click:function(n){arguments[0]=n=e.$handleEvent(n),e.navigateTo(t)}}},[e._v(e._s(t.title))]),e.hasAnd(e.agreements,i)?n("v-uni-text",{staticClass:"text and",attrs:{space:"nbsp"}},[e._v("和")]):e._e()],1)})),1)]:e._e(),e.needAgreements||e.needPopupAgreements?n("uni-popup",{ref:"popupAgreement",attrs:{type:"center"}},[n("uni-popup-dialog",{attrs:{confirmText:"同意"},on:{confirm:function(t){arguments[0]=t=e.$handleEvent(t),e.popupConfirm.apply(void 0,arguments)}}},[n("v-uni-view",{staticClass:"content"},[n("v-uni-text",{staticClass:"text"},[e._v("请先阅读并同意")]),e._l(e.agreements,(function(t,i){return n("v-uni-view",{key:i,staticClass:"item"},[n("v-uni-text",{staticClass:"agreement text",on:{click:function(n){arguments[0]=n=e.$handleEvent(n),e.navigateTo(t)}}},[e._v(e._s(t.title))]),e.hasAnd(e.agreements,i)?n("v-uni-text",{staticClass:"text and",attrs:{space:"nbsp"}},[e._v("和")]):e._e()],1)}))],2)],1)],1):e._e()],2):e._e()},r=[]},"5f84":function(e,t,n){"use strict";n.r(t);var i=n("e85e"),a=n("8854");for(var r in a)["default"].indexOf(r)<0&&function(e){n.d(t,e,(function(){return a[e]}))}(r);n("d9a3");var o=n("828b"),s=Object(o["a"])(a["default"],i["b"],i["c"],!1,null,"2c18b432",null,!1,i["a"],void 0);t["default"]=s.exports},"672a":function(e,t,n){"use strict";n.r(t);var i=n("0889"),a=n("e06a");for(var r in a)["default"].indexOf(r)<0&&function(e){n.d(t,e,(function(){return a[e]}))}(r);n("c419");var o=n("828b"),s=Object(o["a"])(a["default"],i["b"],i["c"],!1,null,"b2d7af54",null,!1,i["a"],void 0);t["default"]=s.exports},"68c0":function(e,t,n){var i=n("d0ffe");i.__esModule&&(i=i.default),"string"===typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);var a=n("967d").default;a("27785058",i,!0,{sourceMap:!1,shadowMode:!1})},"6e09":function(e,t,n){"use strict";n("6a54");var i=n("f5bd").default;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,n("5c47"),n("0506"),n("23f4"),n("7d2f"),n("9c4e"),n("ab80");var a=i(n("ac25")),r=a.default.passwordStrength,o={super:/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[~!@#$%^&*_\-+=`|\\(){}[\]:;"'<>,.?/])[0-9a-zA-Z~!@#$%^&*_\-+=`|\\(){}[\]:;"'<>,.?/]{8,16}$/,strong:/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[~!@#$%^&*_\-+=`|\\(){}[\]:;"'<>,.?/])[0-9a-zA-Z~!@#$%^&*_\-+=`|\\(){}[\]:;"'<>,.?/]{8,16}$/,medium:/^(?![0-9]+$)(?![a-zA-Z]+$)(?![~!@#$%^&*_\-+=`|\\(){}[\]:;"'<>,.?/]+$)[0-9a-zA-Z~!@#$%^&*_\-+=`|\\(){}[\]:;"'<>,.?/]{8,16}$/,weak:/^(?=.*[0-9])(?=.*[a-zA-Z])[0-9a-zA-Z~!@#$%^&*_\-+=`|\\(){}[\]:;"'<>,.?/]{6,16}$/},s={normal:{noPwd:"请输入密码",noRePwd:"再次输入密码",rePwdErr:"两次输入密码不一致"},passwordStrengthError:{super:"密码必须包含大小写字母、数字和特殊符号，密码长度必须在8-16位之间",strong:"密码必须包含字母、数字和特殊符号，密码长度必须在8-16位之间",medium:"密码必须为字母、数字和特殊符号任意两种的组合，密码长度必须在8-16位之间",weak:"密码必须包含字母，密码长度必须在6-16位之间"}};function u(e){return!(r&&o[r]&&!new RegExp(o[r]).test(e))||s.passwordStrengthError[r]}var l={ERROR:s,validPwd:u,getPwdRules:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"password",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"password2",n={};return n[e]={rules:[{required:!0,errorMessage:s.normal.noPwd},{validateFunction:function(e,t,n,i){var a=u(t);return!0!==a&&i(a),!0}}]},t&&(n[t]={rules:[{required:!0,errorMessage:s.normal.noRePwd},{validateFunction:function(t,n,i,a){return n!=i[e]&&a(s.normal.rePwdErr),!0}}]}),n}};t.default=l},8460:function(e,t,n){"use strict";n("6a54");var i=n("f5bd").default;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=i(n("b18e")),r=i(n("a461")),o=i(n("589a")),s={en:a.default,"zh-Hans":r.default,"zh-Hant":o.default};t.default=s},8854:function(e,t,n){"use strict";n.r(t);var i=n("c563"),a=n.n(i);for(var r in i)["default"].indexOf(r)<0&&function(e){n.d(t,e,(function(){return i[e]}))}(r);t["default"]=a.a},9897:function(e,t,n){"use strict";n.r(t);var i=n("f371"),a=n("c266");for(var r in a)["default"].indexOf(r)<0&&function(e){n.d(t,e,(function(){return a[e]}))}(r);n("0315");var o=n("828b"),s=Object(o["a"])(a["default"],i["b"],i["c"],!1,null,"5b2da37e",null,!1,i["a"],void 0);t["default"]=s.exports},a461:function(e){e.exports=JSON.parse('{"uni-popup.cancel":"取消","uni-popup.ok":"确定","uni-popup.placeholder":"请输入","uni-popup.title":"提示","uni-popup.shareTitle":"分享到"}')},a6bd:function(e,t,n){"use strict";n.r(t);var i=n("b08a"),a=n("1373");for(var r in a)["default"].indexOf(r)<0&&function(e){n.d(t,e,(function(){return a[e]}))}(r);n("f84d");var o=n("828b"),s=Object(o["a"])(a["default"],i["b"],i["c"],!1,null,"f757c716",null,!1,i["a"],void 0);t["default"]=s.exports},aee2:function(e,t,n){"use strict";n("6a54");var i=n("f5bd").default;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=i(n("9b1b"));n("4626"),n("5ac7"),n("bf0f"),n("2797");var r=n("f349"),o=i(n("ac25")),s={data:function(){return{config:o.default,uniIdRedirectUrl:"",isMounted:!1}},onUnload:function(){document.onkeydown=!1},mounted:function(){this.isMounted=!0},onLoad:function(e){var t=this;if(e.is_weixin_redirect){if(uni.showLoading({mask:!0}),window.location.href.includes("#")){var n=window.location.href.split("?")[1].split("&");n.forEach((function(t){var n=t.split("=");"code"==n[0]&&(e.code=n[1])}))}this.$nextTick((function(n){t.$refs.uniFabLogin.login({code:e.code},"weixin")}))}e.uniIdRedirectUrl&&(this.uniIdRedirectUrl=decodeURIComponent(e.uniIdRedirectUrl))},computed:{needAgreements:function(){if(this.isMounted)return!!this.$refs.agreements&&this.$refs.agreements.needAgreements},agree:{get:function(){if(this.isMounted)return!this.$refs.agreements||this.$refs.agreements.isAgree},set:function(e){this.$refs.agreements?this.$refs.agreements.isAgree=e:console.log("不存在 隐私政策协议组件")}}},methods:{loginSuccess:function(e){r.mutations.loginSuccess((0,a.default)((0,a.default)({},e),{},{uniIdRedirectUrl:this.uniIdRedirectUrl}))}}},u=s;t.default=u},b08a:function(e,t,n){"use strict";n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return r})),n.d(t,"a",(function(){return i}));var i={uniMatchMedia:n("9897").default,uniForms:n("316d").default,uniFormsItem:n("5f84").default,uniEasyinput:n("2b5e").default,uniIdPagesAgreements:n("222b").default},a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-uni-view",{staticClass:"uni-content"},[n("uni-match-media",{attrs:{"min-width":690}},[n("v-uni-view",{staticClass:"login-logo"},[n("v-uni-image",{attrs:{src:e.logo}})],1),n("v-uni-text",{staticClass:"title title-box"},[e._v("创建超级管理员")])],1),n("uni-forms",{ref:"form",attrs:{value:e.formData,rules:e.rules,"validate-trigger":"submit","err-show-type":"toast"}},[n("uni-forms-item",{attrs:{name:"username",required:!0}},[n("uni-easyinput",{staticClass:"input-box",attrs:{inputBorder:!1,focus:e.focusUsername,placeholder:"请输入用户名",trim:"both"},on:{blur:function(t){arguments[0]=t=e.$handleEvent(t),e.focusUsername=!1}},model:{value:e.formData.username,callback:function(t){e.$set(e.formData,"username",t)},expression:"formData.username"}})],1),n("uni-forms-item",{attrs:{name:"nickname"}},[n("uni-easyinput",{staticClass:"input-box",attrs:{inputBorder:!1,focus:e.focusNickname,placeholder:"请输入用户昵称",trim:"both"},on:{blur:function(t){arguments[0]=t=e.$handleEvent(t),e.focusNickname=!1}},model:{value:e.formData.nickname,callback:function(t){e.$set(e.formData,"nickname",t)},expression:"formData.nickname"}})],1),n("uni-forms-item",{attrs:{name:"password",required:!0},model:{value:e.formData.password,callback:function(t){e.$set(e.formData,"password",t)},expression:"formData.password"}},[n("uni-easyinput",{staticClass:"input-box",attrs:{inputBorder:!1,focus:e.focusPassword,maxlength:"20",placeholder:"请输入"+("weak"==e.config.passwordStrength?"6":"8")+"-16位密码",type:"password",trim:"both"},on:{blur:function(t){arguments[0]=t=e.$handleEvent(t),e.focusPassword=!1}},model:{value:e.formData.password,callback:function(t){e.$set(e.formData,"password",t)},expression:"formData.password"}})],1),n("uni-forms-item",{attrs:{name:"password2",required:!0},model:{value:e.formData.password2,callback:function(t){e.$set(e.formData,"password2",t)},expression:"formData.password2"}},[n("uni-easyinput",{staticClass:"input-box",attrs:{inputBorder:!1,focus:e.focusPassword2,placeholder:"再次输入密码",maxlength:"20",type:"password",trim:"both"},on:{blur:function(t){arguments[0]=t=e.$handleEvent(t),e.focusPassword2=!1}},model:{value:e.formData.password2,callback:function(t){e.$set(e.formData,"password2",t)},expression:"formData.password2"}})],1),n("uni-id-pages-agreements",{ref:"agreements",attrs:{scope:"register"}}),n("v-uni-button",{staticClass:"uni-btn",attrs:{type:"primary"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.submit.apply(void 0,arguments)}}},[e._v("注册")]),n("v-uni-button",{staticClass:"register-back",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.navigateBack.apply(void 0,arguments)}}},[e._v("返回")]),n("uni-match-media",{attrs:{"min-width":690}},[n("v-uni-view",{staticClass:"link-box"},[n("v-uni-text",{staticClass:"link",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.toLogin.apply(void 0,arguments)}}},[e._v("已有账号？点此登录")])],1)],1)],1)],1)},r=[]},b18e:function(e){e.exports=JSON.parse('{"uni-popup.cancel":"cancel","uni-popup.ok":"ok","uni-popup.placeholder":"pleace enter","uni-popup.title":"Hint","uni-popup.shareTitle":"Share to"}')},bcf2e:function(e,t,n){"use strict";n("6a54");var i=n("f5bd").default;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,n("4626"),n("5ac7");var a=i(n("ac25")),r=function(){return console.log("为定义")},o={name:"uni-agreements",computed:{agreements:function(){if(!a.default.agreements)return[];var e=a.default.agreements,t=e.serviceUrl,n=e.privacyUrl;return[{url:t,title:"用户服务协议"},{url:n,title:"隐私政策条款"}]}},props:{scope:{type:String,default:function(){return"register"}}},methods:{popupConfirm:function(){this.isAgree=!0,r()},popup:function(e){var t=this;this.needPopupAgreements=!0,this.$nextTick((function(){e&&(r=e),t.$refs.popupAgreement.open()}))},navigateTo:function(e){var t=e.url,n=e.title;uni.navigateTo({url:"/uni_modules/uni-id-pages/pages/common/webview/webview?url="+t+"&title="+n,success:function(e){},fail:function(){},complete:function(){}})},hasAnd:function(e,t){return e.length-1>t},setAgree:function(e){this.isAgree=!this.isAgree,this.$emit("setAgree",this.isAgree)}},created:function(){var e;this.needAgreements=((null===a.default||void 0===a.default||null===(e=a.default.agreements)||void 0===e?void 0:e.scope)||[]).includes(this.scope)},data:function(){return{isAgree:!1,needAgreements:!0,needPopupAgreements:!1}}};t.default=o},bf9b:function(e,t,n){var i=n("c86c");t=i(!1),t.push([e.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* uni.scss */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */\r\n/*操作文字颜色-蓝色*/.input-box[data-v-f757c716]  .uni-input-input[type="password"]::-ms-reveal{display:none}.uni-content[data-v-f757c716]{padding:0 %?60?%}.login-logo[data-v-f757c716]{display:none}@media screen and (min-width:690px){.uni-content[data-v-f757c716]{margin:0 auto;position:relative;top:100px;padding:30px 40px 80px 40px;max-width:450px;max-height:450px;border-radius:10px;box-shadow:0 0 20px #efefef;background-color:#fff}.login-logo[data-v-f757c716]{display:flex;justify-content:center}.login-logo uni-image[data-v-f757c716]{width:60px;height:60px}.register-back[data-v-f757c716]{display:none}uni-button[data-v-f757c716]{padding-bottom:1px}}.uni-content uni-view[data-v-f757c716]{box-sizing:border-box}.title[data-v-f757c716]{display:flex;padding:18px 0;font-weight:800;flex-direction:column}.tip[data-v-f757c716]{display:flex;color:#bdbdc0;font-size:11px;margin:6px 0}.uni-content[data-v-f757c716]  .uni-easyinput__content,\r\n.input-box[data-v-f757c716]{height:44px;background-color:#f8f8f8!important;border-radius:0;font-size:14px;display:flex;flex:1}.link[data-v-f757c716]{color:#04498c;cursor:pointer}.uni-content[data-v-f757c716]  .uni-forms-item__inner{padding-bottom:8px}.uni-btn[data-v-f757c716]{text-align:center;height:40px;line-height:40px;margin:15px 0 10px 0;color:#fff!important;border-radius:5px;font-size:16px}.uni-body.uni_modules-uni-id-pages-pages-login-login-withoutpwd[data-v-f757c716]{height:auto!important}@media screen and (max-width:690px){.uni-content[data-v-f757c716]{margin-top:15px;height:100%;background-color:#fff}}@media screen and (min-width:690px){.uni-content[data-v-f757c716]{padding:30px 40px 60px;max-height:520px}.link-box[data-v-f757c716]{display:flex;flex-direction:row;justify-content:space-between;margin-top:10px}.link[data-v-f757c716]{font-size:12px}}.uni-content[data-v-f757c716]  .uni-forms-item__label{position:absolute;left:-15px}uni-button[data-v-f757c716]{margin-top:15px}',""]),e.exports=t},c0f8:function(e,t,n){var i=n("c86c");t=i(!1),t.push([e.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* uni.scss */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */\r\n/*操作文字颜色-蓝色*/uni-view[data-v-63b69bf0]{display:flex;box-sizing:border-box;flex-direction:column}.root[data-v-63b69bf0]{flex-direction:row;align-items:center;font-size:12px;color:#8a8f8b}.checkbox-box[data-v-63b69bf0], .uni-label-pointer[data-v-63b69bf0]{align-items:center;display:flex;flex-direction:row}.item[data-v-63b69bf0]{flex-direction:row}.text[data-v-63b69bf0]{line-height:26px}.agreement[data-v-63b69bf0]{color:#04498c;cursor:pointer}.checkbox-box[data-v-63b69bf0]  .uni-checkbox-input{border-radius:100%}.checkbox-box[data-v-63b69bf0]  .uni-checkbox-input.uni-checkbox-input-checked{border-color:#007aff;color:#fff!important;background-color:#007aff}.content[data-v-63b69bf0]{flex-wrap:wrap;flex-direction:row}.root[data-v-63b69bf0]  .uni-popup__error{color:#333}',""]),e.exports=t},c266:function(e,t,n){"use strict";n.r(t);var i=n("3c97"),a=n.n(i);for(var r in i)["default"].indexOf(r)<0&&function(e){n.d(t,e,(function(){return i[e]}))}(r);t["default"]=a.a},c419:function(e,t,n){"use strict";var i=n("68c0"),a=n.n(i);a.a},c563:function(e,t,n){"use strict";n("6a54");var i=n("f5bd").default;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=i(n("fcf3")),r=i(n("2634")),o=i(n("39d8")),s=i(n("2fdc"));n("64aa"),n("aa9c"),n("bf0f"),n("2797"),n("dd2b");var u={name:"uniFormsItem",options:{virtualHost:!0},provide:function(){return{uniFormItem:this}},inject:{form:{from:"uniForm",default:null}},props:{rules:{type:Array,default:function(){return null}},name:{type:[String,Array],default:""},required:{type:Boolean,default:!1},label:{type:String,default:""},labelWidth:{type:[String,Number],default:""},labelAlign:{type:String,default:""},errorMessage:{type:[String,Boolean],default:""},leftIcon:String,iconColor:{type:String,default:"#606266"}},data:function(){return{errMsg:"",userRules:null,localLabelAlign:"left",localLabelWidth:"70px",localLabelPos:"left",border:!1,isFirstBorder:!1}},computed:{msg:function(){return this.errorMessage||this.errMsg}},watch:{"form.formRules":function(e){this.init()},"form.labelWidth":function(e){this.localLabelWidth=this._labelWidthUnit(e)},"form.labelPosition":function(e){this.localLabelPos=this._labelPosition()},"form.labelAlign":function(e){}},created:function(){var e=this;this.init(!0),this.name&&this.form&&this.$watch((function(){var t=e.form._getDataValue(e.name,e.form.localData);return t}),(function(t,n){var i=e.form._isEqual(t,n);if(!i){var a=e.itemSetValue(t);e.onFieldChange(a,!1)}}),{immediate:!1})},destroyed:function(){this.__isUnmounted||this.unInit()},methods:{setRules:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;this.userRules=e,this.init(!1)},setValue:function(){},onFieldChange:function(e){var t=arguments,n=this;return(0,s.default)((0,r.default)().mark((function i(){var a,s,u,l,c,d,f,p,m,v,h,g;return(0,r.default)().wrap((function(i){while(1)switch(i.prev=i.next){case 0:if(a=!(t.length>1&&void 0!==t[1])||t[1],s=n.form,u=s.formData,s.localData,l=s.errShowType,c=s.validateCheck,d=s.validateTrigger,f=s._isRequiredField,p=s._realName,m=p(n.name),e||(e=n.form.formData[m]),v=n.itemRules.rules&&n.itemRules.rules.length,n.validator&&v&&0!==v){i.next=7;break}return i.abrupt("return");case 7:if(h=f(n.itemRules.rules||[]),g=null,"bind"!==d&&!a){i.next=18;break}return i.next=12,n.validator.validateUpdate((0,o.default)({},m,e),u);case 12:g=i.sent,h||void 0!==e&&""!==e||(g=null),g&&g.errorMessage?("undertext"===l&&(n.errMsg=g?g.errorMessage:""),"toast"===l&&uni.showToast({title:g.errorMessage||"校验错误",icon:"none"}),"modal"===l&&uni.showModal({title:"提示",content:g.errorMessage||"校验错误"})):n.errMsg="",c(g||null),i.next=19;break;case 18:n.errMsg="";case 19:return i.abrupt("return",g||null);case 20:case"end":return i.stop()}}),i)})))()},init:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=this.form||{},n=t.validator,i=t.formRules,r=t.childrens,o=(t.formData,t.localData),s=t._realName,u=t.labelWidth,l=t._getDataValue;t._setDataValue;if(this.localLabelAlign=this._justifyContent(),this.localLabelWidth=this._labelWidthUnit(u),this.localLabelPos=this._labelPosition(),this.form&&e&&r.push(this),n&&i){this.form.isFirstBorder||(this.form.isFirstBorder=!0,this.isFirstBorder=!0),this.group&&(this.group.isFirstBorder||(this.group.isFirstBorder=!0,this.isFirstBorder=!0)),this.border=this.form.border;var c=s(this.name),d=this.userRules||this.rules;"object"===(0,a.default)(i)&&d&&(i[c]={rules:d},n.updateSchema(i));var f=i[c]||{};this.itemRules=f,this.validator=n,this.itemSetValue(l(this.name,o))}},unInit:function(){var e=this;if(this.form){var t=this.form,n=t.childrens,i=t.formData,a=t._realName;n.forEach((function(t,n){t===e&&(e.form.childrens.splice(n,1),delete i[a(t.name)])}))}},itemSetValue:function(e){var t=this.form._realName(this.name),n=this.itemRules.rules||[],i=this.form._getValue(t,e,n);return this.form._setDataValue(t,this.form.formData,i),i},clearValidate:function(){this.errMsg=""},_isRequired:function(){return this.required},_justifyContent:function(){if(this.form){var e=this.form.labelAlign,t=this.labelAlign?this.labelAlign:e;if("left"===t)return"flex-start";if("center"===t)return"center";if("right"===t)return"flex-end"}return"flex-start"},_labelWidthUnit:function(e){return this.num2px(this.labelWidth?this.labelWidth:e||(this.label?70:"auto"))},_labelPosition:function(){return this.form&&this.form.labelPosition||"left"},isTrigger:function(e,t,n){return"submit"!==e&&e?"bind":void 0===e?"bind"!==t?t?"submit":""===n?"bind":"submit":"bind":"submit"},num2px:function(e){return"number"===typeof e?"".concat(e,"px"):e}}};t.default=u},c8e7:function(e,t,n){var i=n("c86c");t=i(!1),t.push([e.i,"uni-view[data-v-5b2da37e]{display:block}",""]),e.exports=t},ca9e:function(e,t,n){"use strict";(function(e){n("6a54");var i=n("f5bd").default;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,n("5c47"),n("a1c1");var a=i(n("ff3d")),r=i(n("aee2")),o=(i(n("ac25")),e.importObject("uni-id-co",{customUI:!0})),s={mixins:[r.default],data:function(){return{formData:{username:"",nickname:"",password:"",password2:"",captcha:""},rules:a.default,focusUsername:!1,focusNickname:!1,focusPassword:!1,focusPassword2:!1,logo:"/static/logo.png"}},onReady:function(){this.$refs.form.setRules(this.rules)},onShow:function(){var e=this;document.onkeydown=function(t){var n=t||window.event;n&&13==n.keyCode&&e.submit()}},methods:{submit:function(){var e=this;this.$refs.form.validate().then((function(t){if(e.needAgreements&&!e.agree)return e.$refs.agreements.popup((function(){e.submitForm(t)}));e.submitForm(t)})).catch((function(t){var n=t[0].key;n=n.replace(n[0],n[0].toUpperCase()),e["focus"+n]=!0}))},submitForm:function(e){var t=this;o.registerAdmin(this.formData).then((function(e){uni.navigateBack()})).catch((function(e){t.$refs.captcha.getImageCaptcha(),uni.showModal({title:"提示",content:e.errMsg||"创建失败: ".concat(e.errCode),showCancel:!1})}))},navigateBack:function(){uni.navigateBack()},toLogin:function(){uni.navigateTo({url:"/uni_modules/uni-id-pages/pages/login/login-withpwd"})},registerByEmail:function(){uni.navigateTo({url:"/uni_modules/uni-id-pages/pages/register/register-by-email"})}}};t.default=s}).call(this,n("861b")["default"])},cf63:function(e,t,n){var i=n("c86c");t=i(!1),t.push([e.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* uni.scss */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */\r\n/*操作文字颜色-蓝色*/.uni-forms-item[data-v-2c18b432]{position:relative;display:flex;margin-bottom:22px;flex-direction:row}.uni-forms-item__label[data-v-2c18b432]{display:flex;flex-direction:row;align-items:center;text-align:left;font-size:14px;color:#606266;height:36px;padding:0 12px 0 0;vertical-align:middle;flex-shrink:0;box-sizing:border-box}.uni-forms-item__label.no-label[data-v-2c18b432]{padding:0}.uni-forms-item__content[data-v-2c18b432]{position:relative;font-size:14px;flex:1;box-sizing:border-box;flex-direction:row}.uni-forms-item .uni-forms-item__nuve-content[data-v-2c18b432]{display:flex;flex-direction:column;flex:1}.uni-forms-item__error[data-v-2c18b432]{color:#f56c6c;font-size:12px;line-height:1;padding-top:4px;position:absolute;top:100%;left:0;transition:-webkit-transform .3s;transition:transform .3s;transition:transform .3s,-webkit-transform .3s;-webkit-transform:translateY(-100%);transform:translateY(-100%);opacity:0}.uni-forms-item__error .error-text[data-v-2c18b432]{color:#f56c6c;font-size:12px}.uni-forms-item__error.msg--active[data-v-2c18b432]{opacity:1;-webkit-transform:translateY(0);transform:translateY(0)}.uni-forms-item.is-direction-left[data-v-2c18b432]{flex-direction:row}.uni-forms-item.is-direction-top[data-v-2c18b432]{flex-direction:column}.uni-forms-item.is-direction-top .uni-forms-item__label[data-v-2c18b432]{padding:0 0 8px;line-height:1.5715;text-align:left;white-space:normal}.uni-forms-item .is-required[data-v-2c18b432]{color:#dd524d;font-weight:700}.uni-forms-item--border[data-v-2c18b432]{margin-bottom:0;padding:10px 0;border-top:1px #eee solid}.uni-forms-item--border .uni-forms-item__content[data-v-2c18b432]{flex-direction:column;justify-content:flex-start;align-items:flex-start}.uni-forms-item--border .uni-forms-item__content .uni-forms-item__error[data-v-2c18b432]{position:relative;top:5px;left:0;padding-top:0}.is-first-border[data-v-2c18b432]{border:none}',""]),e.exports=t},d0ffe:function(e,t,n){var i=n("c86c");t=i(!1),t.push([e.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* uni.scss */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */\r\n/*操作文字颜色-蓝色*/.uni-popup-dialog[data-v-b2d7af54]{width:300px;border-radius:11px;background-color:#fff}.uni-dialog-title[data-v-b2d7af54]{display:flex;flex-direction:row;justify-content:center;padding-top:25px}.uni-dialog-title-text[data-v-b2d7af54]{font-size:16px;font-weight:500}.uni-dialog-content[data-v-b2d7af54]{display:flex;flex-direction:row;justify-content:center;align-items:center;padding:20px}.uni-dialog-content-text[data-v-b2d7af54]{font-size:14px;color:#6c6c6c}.uni-dialog-button-group[data-v-b2d7af54]{display:flex;flex-direction:row;border-top-color:#f5f5f5;border-top-style:solid;border-top-width:1px}.uni-dialog-button[data-v-b2d7af54]{display:flex;flex:1;flex-direction:row;justify-content:center;align-items:center;height:45px}.uni-border-left[data-v-b2d7af54]{border-left-color:#f0f0f0;border-left-style:solid;border-left-width:1px}.uni-dialog-button-text[data-v-b2d7af54]{font-size:16px;color:#333}.uni-button-color[data-v-b2d7af54]{color:#007aff}.uni-dialog-input[data-v-b2d7af54]{flex:1;font-size:14px;border:1px #eee solid;height:40px;padding:0 10px;border-radius:5px;color:#555}.uni-popup__success[data-v-b2d7af54]{color:#4cd964}.uni-popup__warn[data-v-b2d7af54]{color:#f0ad4e}.uni-popup__error[data-v-b2d7af54]{color:#dd524d}.uni-popup__info[data-v-b2d7af54]{color:#909399}',""]),e.exports=t},d9a3:function(e,t,n){"use strict";var i=n("fe9e"),a=n.n(i);a.a},e06a:function(e,t,n){"use strict";n.r(t);var i=n("21cb"),a=n.n(i);for(var r in i)["default"].indexOf(r)<0&&function(e){n.d(t,e,(function(){return i[e]}))}(r);t["default"]=a.a},e22b:function(e,t,n){"use strict";n("6a54"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i={data:function(){return{}},created:function(){this.popup=this.getParent()},methods:{getParent:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"uniPopup",t=this.$parent,n=t.$options.name;while(n!==e){if(t=t.$parent,!t)return!1;n=t.$options.name}return t}}};t.default=i},e85e:function(e,t,n){"use strict";n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){}));var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-uni-view",{staticClass:"uni-forms-item",class:["is-direction-"+e.localLabelPos,e.border?"uni-forms-item--border":"",e.border&&e.isFirstBorder?"is-first-border":""]},[e._t("label",[n("v-uni-view",{staticClass:"uni-forms-item__label",class:{"no-label":!e.label&&!e.required},style:{width:e.localLabelWidth,justifyContent:e.localLabelAlign}},[e.required?n("v-uni-text",{staticClass:"is-required"},[e._v("*")]):e._e(),n("v-uni-text",[e._v(e._s(e.label))])],1)]),n("v-uni-view",{staticClass:"uni-forms-item__content"},[e._t("default"),n("v-uni-view",{staticClass:"uni-forms-item__error",class:{"msg--active":e.msg}},[n("v-uni-text",[e._v(e._s(e.msg))])],1)],2)],2)},a=[]},f349:function(e,t,n){"use strict";(function(e){n("6a54");var i=n("f5bd").default;Object.defineProperty(t,"__esModule",{value:!0}),t.store=t.mutations=void 0;var a=i(n("2634")),r=i(n("9b1b")),o=i(n("2fdc"));n("dc8a"),n("bf0f"),n("2797"),n("c223");var s=i(n("e5c8")),u=i(n("ac25")),l=i(n("9b8e")),c=e.importObject("uni-id-co"),d=e.database(),f=d.collection("uni-id-users"),p=uni.getStorageSync("uni-id-pages-userInfo")||{},m={userInfo:p,hasLogin:0!=Object.keys(p).length},v={updateUserInfo:function(){var t=arguments,n=this;return(0,o.default)((0,a.default)().mark((function i(){var o,s,u,l;return(0,a.default)().wrap((function(i){while(1)switch(i.prev=i.next){case 0:if(o=t.length>0&&void 0!==t[0]&&t[0],!o){i.next=5;break}f.where("_id==$env.uid").update(o).then((function(e){e.result.updated?(uni.showToast({title:"更新成功",icon:"none",duration:3e3}),n.setUserInfo(o)):uni.showToast({title:"没有改变",icon:"none",duration:3e3})})),i.next=20;break;case 5:return s=e.importObject("uni-id-co",{customUI:!0}),i.prev=6,i.next=9,f.where("'_id' == $cloudEnv_uid").field("mobile,nickname,username,email,avatar_file").get();case 9:return u=i.sent,i.next=12,s.getRealNameInfo();case 12:l=i.sent,n.setUserInfo((0,r.default)((0,r.default)({},u.result.data[0]),{},{realNameAuth:l})),i.next=20;break;case 16:i.prev=16,i.t0=i["catch"](6),n.setUserInfo({},{cover:!0}),console.error(i.t0.message,i.t0.errCode);case 20:case"end":return i.stop()}}),i,null,[[6,16]])})))()},setUserInfo:function(e){var t=arguments;return(0,o.default)((0,a.default)().mark((function n(){var i,r,o;return(0,a.default)().wrap((function(n){while(1)switch(n.prev=n.next){case 0:return i=t.length>1&&void 0!==t[1]?t[1]:{cover:!1},r=i.cover,o=r?e:Object.assign(h.userInfo,e),h.userInfo=Object.assign({},o),h.hasLogin=0!=Object.keys(h.userInfo).length,uni.setStorageSync("uni-id-pages-userInfo",h.userInfo),n.abrupt("return",e);case 6:case"end":return n.stop()}}),n)})))()},logout:function(){var t=this;return(0,o.default)((0,a.default)().mark((function n(){return(0,a.default)().wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(!(e.getCurrentUserInfo().tokenExpired>Date.now())){n.next=9;break}return n.prev=1,n.next=4,c.logout();case 4:n.next=9;break;case 6:n.prev=6,n.t0=n["catch"](1),console.error(n.t0);case 9:uni.removeStorageSync("uni_id_token"),uni.setStorageSync("uni_id_token_expired",0),uni.redirectTo({url:"/".concat(s.default.uniIdRouter&&s.default.uniIdRouter.loginPage?s.default.uniIdRouter.loginPage:"uni_modules/uni-id-pages/pages/login/login-withoutpwd")}),uni.$emit("uni-id-pages-logout"),t.setUserInfo({},{cover:!0});case 14:case"end":return n.stop()}}),n,null,[[1,6]])})))()},loginBack:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.uniIdRedirectUrl,n=void 0===t?"":t,i=0,a=getCurrentPages();if(a.forEach((function(e,t){"login"==a[a.length-t-1].route.split("/")[3]&&i++})),n)return uni.redirectTo({url:n,fail:function(e){uni.switchTab({url:n,fail:function(t){console.log(e,t)}})}});if("weixin"==e.loginType)return window.history.go(-3);if(i){var r=s.default.pages[0];return uni.reLaunch({url:"/".concat(r.path)})}uni.navigateBack({delta:i})},loginSuccess:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.showToast,n=void 0===t||t,i=e.toastText,a=void 0===i?"登录成功":i,r=e.autoBack,o=void 0===r||r,s=e.uniIdRedirectUrl,l=void 0===s?"":s,c=e.passwordConfirmed;if(n&&uni.showToast({title:a,icon:"none",duration:3e3}),this.updateUserInfo(),uni.$emit("uni-id-pages-login-success"),u.default.setPasswordAfterLogin&&!c)return uni.redirectTo({url:l?"/uni_modules/uni-id-pages/pages/userinfo/set-pwd/set-pwd?uniIdRedirectUrl=".concat(l,"&loginType=").concat(e.loginType):"/uni_modules/uni-id-pages/pages/userinfo/set-pwd/set-pwd?loginType=".concat(e.loginType),fail:function(e){console.log(e)}});o&&this.loginBack({uniIdRedirectUrl:l})}};t.mutations=v;var h=l.default.observable(m);t.store=h}).call(this,n("861b")["default"])},f371:function(e,t,n){"use strict";n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){}));var i=function(){var e=this.$createElement,t=this._self._c||e;return t("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:this.matches,expression:"matches"}]},[this._t("default")],2)},a=[]},f681:function(e,t,n){var i=n("c8e7");i.__esModule&&(i=i.default),"string"===typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);var a=n("967d").default;a("678ae077",i,!0,{sourceMap:!1,shadowMode:!1})},f84d:function(e,t,n){"use strict";var i=n("3d10"),a=n.n(i);a.a},fe9e:function(e,t,n){var i=n("cf63");i.__esModule&&(i=i.default),"string"===typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);var a=n("967d").default;a("3c492ab7",i,!0,{sourceMap:!1,shadowMode:!1})},ff3d:function(e,t,n){"use strict";n("6a54");var i=n("f5bd").default;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,n("5c47"),n("0506");var a=i(n("9b1b")),r=i(n("6e09")),o=(0,a.default)({username:{rules:[{required:!0,errorMessage:"请输入用户名"},{minLength:3,maxLength:32,errorMessage:"用户名长度在 {minLength} 到 {maxLength} 个字符"},{validateFunction:function(e,t,n,i){return(/^1\d{10}$/.test(t)||/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(t))&&i("用户名不能是：手机号或邮箱"),/^\d+$/.test(t)&&i("用户名不能为纯数字"),/[\u4E00-\u9FA5\uF900-\uFA2D]{1,}/.test(t)&&i("用户名不能包含中文"),!0}}],label:"用户名"},nickname:{rules:[{minLength:3,maxLength:32,errorMessage:"昵称长度在 {minLength} 到 {maxLength} 个字符"},{validateFunction:function(e,t,n,i){return(/^1\d{10}$/.test(t)||/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(t))&&i("昵称不能是：手机号或邮箱"),/^\d+$/.test(t)&&i("昵称不能为纯数字"),/[\u4E00-\u9FA5\uF900-\uFA2D]{1,}/.test(t)&&i("昵称不能包含中文"),!0}}],label:"昵称"}},r.default.getPwdRules());t.default=o}}]);