<template>
	<view class="feedback">
	  <uni-forms ref="feedbackRef" :modelValue="feedbackForm" :rules="feedbackRules" label-width="120px">
  
		<uni-forms-item label="标题"   required name="title" >
		  <uni-easyinput  v-model="feedbackForm.title"  placeholder="请输入标题" />
		</uni-forms-item>
		<uni-forms-item label="内容" name="content" required>
		  <uni-easyinput  v-model="feedbackForm.content" type="textarea" placeholder="请输入反馈内容" />
		</uni-forms-item> 
	  </uni-forms>
	  <u-button type="success" text="保存" color="#007aff" @click="submitForm()" :disabled="submitDisabled"
		:loading="submitLoading"></u-button>
	</view>
  </template>
  </template>
  
  <script>
  import MineService from '../../../services/MineService';
  export default({
	name: "addScenicSport",
	props: {
	  type:0,
	  targetObj:{} //新增加为scenicport 数据，修改为scenicportdetail 数据
	},
	//inject:["getSS"],
	data() {
	  return {
		submitLoading: false,
		menuList:[],
		feedbackForm:this.type==1?{
		 // "menuType_id":this.targetObj.menuType_id,
		  "title": this.targetObj.name,
		  "content": this.targetObj.price
		}:{
		  "title": "",
		  "content": "",

		},
		feedbackRules:{
		  // 对name字段进行必填验证
		title: {
			rules: [
			  {
				required: true,
				errorMessage: "请输入标题",
			  }
			  
			]
		  },
		  content: {
			rules: [
			  {
				required: true,
				errorMessage: "请输入意见内容",
			  }
			  
			]
		  }
		
		}
	  }
	 
	},
	computed: {
		user(){
			return this.$store.state.user;
		},
		submitDisabled(){}
	 
	},
	onLoad(params){
		console.log("params",params)
	},
	watch: {},
	created(e){
	  //this.getMenuTypeList();
	  console.log("eee",e);
	},
	methods: {

	  submitForm(){
		this.$refs.feedbackRef.validate().then(async (res) => {
		  //uni.showLoading();
		  this.submitLoading = true;
		  let obj = Object.assign(this.feedbackForm,{phone:this.user.phone});
		  try {
			const res = await MineService.add(obj);
			uni.hideLoading();
			this.submitLoading = false;
			console.log("意见反馈添加成功");
			uni.navigateBack();
		  } catch (error) {
			console.error("添加意见反馈失败");
			uni.hideLoading();
			this.submitLoading = false;
		  }
		  

	  })
	 
	}
   
  }
})
  </script>
  
  <style scoped>
  .feedback{
	max-width: 800px;
	padding:20px;
	margin:auto
  }
	</style>