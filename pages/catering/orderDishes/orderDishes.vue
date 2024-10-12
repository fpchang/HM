<template>
	<view style="max-width:800px;margin:auto;">
		<view class="header-title" style=""><text>【{{hotel_name}}】用餐预定</text></view>
		<!-- <uni-card :is-shadow="false">
			<text class="uni-body">这是一个基础卡片示例，内容较少，此示例展示了一个没有任何属性不带阴影的卡片。</text>
		</uni-card> -->
		<view style="padding:0 10px"> 
			<uni-forms
			ref="orderDishesRef"
			:modelValue="orderDishesForm"
			:rules="orderDishesRules"
			label-width="130px"
		  >
			<uni-forms-item label="用户名" required name="userName">
			  <uni-easyinput
				v-model="orderDishesForm.userName"
				placeholder="请输入员工名"
			  />
			</uni-forms-item>
			<uni-forms-item label="手机号" name="phone" required>
				<uni-easyinput
				v-model="orderDishesForm.phone"
				type="number"
				maxlength="11"
				placeholder="请输入手机号"
			  />
			  </uni-forms-item>
			<uni-forms-item label="用餐日期" required>
				<uni-datetime-picker v-model="orderDishesForm.mealDate"
						type="data" :start="new Date().getTime()" />
			</uni-forms-item>

			<uni-forms-item label="餐点">
				<uni-data-checkbox
				  v-model="orderDishesForm.mealType"
				  :localdata="mealTypeItems"
				></uni-data-checkbox>
			  </uni-forms-item>
			</uni-forms>
		</view>
		<lee-linkage v-if="show == 1" :list="dataList" @onGoodItem="onGoodItem"></lee-linkage>
		<lee-linkage v-if="show == 2" :list="dataList" @onGoodItem="onGoodItem">
			<template v-slot:custom="{row}">
			   
				<view class="foods-item" v-for="(item,index) in row.foods">
				  <view class="name-content"> {{item.name}} </view>
				  <view> 
					<u-number-box :min="0" integer v-model="item.checkCount">
					  <input slot="input" style="width: 100px;text-align: center;" class="input"
						  v-model="item.checkCount"></input>
				  </u-number-box>
				  </view>
				   
				</view>
			</template>
		</lee-linkage>
	</view>
  </template>
  
  <script>
	import leeLinkage from '../../../components/StarLee-linkage/linkage'
  export default {
		components: {
			leeLinkage			 
		},
		onload(params){
			console.log("params",params);
		},
		data() {
			return {
				hotel_name:"见山舍",
				mealTypeItems:[
		// 			{
        //   value: "breakfast",
        //   text: "早餐",
        // },
        {
          value: "lunch",
          text: "午餐",
        },{
          value: "dinner",
          text: "晚餐",
        }
				],
				orderDishesForm:{
					mealDate:'',
					mealType:'dinner',
					userName:"",
					phone:"",
				},
				orderDishesRules:{
					userName:{
						rules:[
							{
              required: true,
              errorMessage: "请输入用餐者名称"
            }
						]
					
					},
        // 对name字段进行必填验证
        phone: {
          rules: [
            {
              required: true,
              errorMessage: "请输入手机号",
            },
            {
              pattern: "^[1][3,4,5,6,7,8,9][0-9]{9}$",
              errorMessage: "手机号不正确",
            },
            {
              validateFunction: (rule, value, data, callback) => {
                
                return true;
              },
            },
          ],
        },
      },
				show: 2,//1默认，2自定义插槽
				dataList: [{
						"name": "素菜",
						"foods": [{
								"cat": 1,
								"name": "炒青菜",
								"icon": "https://img0.baidu.com/it/u=3055692262,3157455076&fm=253&fmt=auto&app=138&f=JPEG?w=658&h=449",
								"key": "炒青菜",
								"checkCount":0
							},
							{
								"cat": 2,
								"name": "清炒豆芽",
								"icon": "https://img1.baidu.com/it/u=3279735775,3452133464&fm=253&fmt=auto&app=120&f=JPEG?w=1200&h=800",
								"key": "清炒豆芽",
								"checkCount":0
							},
							{
								"cat": 3,
								"name": "清淡素菜",
								"icon": "https://img2.baidu.com/it/u=4086801619,1654538614&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889",
								"key": "清淡素菜",
								"checkCount":0
							}
						]
					},
					{
						"name": "荤菜",
						"foods": [{
								"cat": 4,
								"name": "红烧肉",
								"icon": "https://img2.baidu.com/it/u=695504465,1026317581&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=666",
								"key": "红烧肉",
								"checkCount":0
							},
							{
								"cat": 5,
								"name": "红烧排骨",
								"icon": "https://img2.baidu.com/it/u=284434635,2024542185&fm=253&fmt=auto&app=138&f=JPEG?w=893&h=500",
								"key": "红烧排骨",
								"checkCount":0
							},
							{
								"cat": 6,
								"name": "梅菜扣肉",
								"icon": "https://img1.baidu.com/it/u=463538496,1711231452&fm=253&fmt=auto&app=138&f=JPEG?w=640&h=351",
								"key": "梅菜扣肉",
								"checkCount":0
							},
							{
								"cat": 7,
								"name": "叫花鸡",
								"icon": "https://img1.baidu.com/it/u=3625215846,2808204280&fm=253&fmt=auto&app=138&f=JPEG?w=891&h=500",
								"key": "叫花鸡",
								"checkCount":0
							}
						]
					},
					{
						"name": "药材品类",
						"foods": [
							{
								"cat": 8,
								"name": "万寿竹",
								"icon": "https://img2.baidu.com/it/u=169080642,2075021678&fm=253&fmt=auto&app=138&f=JPEG?w=748&h=500",
								"key": "万寿竹",
								"checkCount":0
							},{
								"cat": 9,
								"name": "龙胆花",
								"icon": "https://img2.baidu.com/it/u=1719740605,2798532403&fm=253&fmt=auto&app=138&f=JPEG?w=700&h=497",
								"key": "龙胆花",
								"checkCount":0
							},
							{
								"cat": 10,
								"name": "白鲜皮",
								"icon": "https://img1.baidu.com/it/u=2165640000,1671829495&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500",
								"key": "白鲜皮",
								"checkCount":0
							},
							{
								"cat": 11,
								"name": "滋补药材",
								"icon": "http://nq348.com/uploads/category/20220418/33b965295811fdd6f5e672e9a3ce34a2.png",
								"key": "滋补药材",
								"checkCount":0
							}
						]
					},
					{
						"name": "粮油副食",
						"foods": [{
								"cat": 12,
								"name": "精选粮油",
								"icon": "http://nq348.com/uploads/category/20220418/1bb32e319ecf5aa352b7fe26fc265004.png",
								"key": "精选粮油",
								"checkCount":0
							},
							{
								"cat": 13,
								"name": "美味坚果",
								"icon": "http://nq348.com/uploads/category/20220418/6ded13eae4a3b113b5225ca8b99bbfdd.png",
								"key": "美味坚果",
								"checkCount":0
							},
							{
								"cat": 14,
								"name": "加工罐头",
								"icon": "http://nq348.com/uploads/category/20220418/1e1c10838799de5834aa77f0f9eb8f40.png",
								"key": "加工罐头",
								"checkCount":0
							},
							{
								"cat": 15,
								"name": "江小白",
								"icon": "http://nq348.com/uploads/category/20220418/c43cd994e49023c7efdf2b18b1bca30b.png",
								"key": "江小白",
								"checkCount":0
							}
						]
					},
					{
						"name": "花卉苗木",
						"foods": [{
								"cat": 16,
								"name": "鲜花盆景",
								"icon": "http://nq348.com/uploads/category/20220418/b21c44045daaa8b8d148981ba9efc2e0.png",
								"key": "鲜花盆景",
								"checkCount":0
							},
							{
								"cat": 17,
								"name": "果树苗",
								"icon": "http://nq348.com/uploads/category/20220418/63ee2b902ff0f4d638d8a5ad770f7641.png",
								"key": "果树苗",
								"checkCount":0
							},
							{
								"cat": 18,
								"name": "蔬瓜种子",
								"icon": "http://nq348.com/uploads/category/20220418/2df521877616ee44fd01aae0434a5815.png",
								"key": "蔬瓜种子",
								"checkCount":0
							},
							{
								"cat": 19,
								"name": "经济作物",
								"icon": "http://nq348.com/uploads/category/20220418/f85be72a98694befd889f30de45a1d64.png",
								"key": "经济作物",
								"checkCount":0
							}
						]
					},
  
					{
						"name": "其他分类",
						"foods": [{
								"cat": 434,
								"name": "礼盒包装",
								"icon": "http://nq348.com/uploads/category/20220418/ebdfd326333344825adbe81dbd89e2c9.png",
								"key": "礼盒包装",
								"checkCount":0
							},
							{
								"cat": 435,
								"name": "安全设备",
								"icon": "http://nq348.com/uploads/category/20220418/03230c63f066f46005abf5f576df0ed1.png",
								"key": "安全设备",
								"checkCount":0
							},
							{
								"cat": 436,
								"name": "日用百货",
								"icon": "http://nq348.com/uploads/category/20220418/93393f2df3264faba86bb449a0c10a79.png",
								"key": "日用百货",
								"checkCount":0
							},
							{
								"cat": 437,
								"name": "快递包裹",
								"icon": "http://nq348.com/uploads/category/20220418/f553505ebabbcb1bf762b288716cf1e7.png",
								"key": "快递包裹",
								"checkCount":0
							}
						]
					}
				]
			}
		},
		computed:{
			// hotel_id(){
			// 	return this.$store.state.hotel_id;
			// }
		},
		methods: {
			onGoodItem(item){
				console.log(item);
				uni.showToast({
					title:`点击了 ${item.name}`,
					icon:'none'
				})
			}
		}
	}
  </script>
  
  <style lang="scss">
 .header-title{
	display:flex;font-size:25px;height:55px;justify-content:center;align-items:center
 }
  .foods-item{
	height: 40px;
	display: flex;
	justify-content: space-between;
	.name-content{
	  flex:1;
	  display:flex;
	  align-items: center;
	}
  }
  </style>