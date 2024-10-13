<template>
	<view style="max-width:800px;margin:auto;display:flex;flex-direction:column">
		<view class="header-title" style=""><text>【{{hotel_name}}】用餐预定</text></view>
		<!-- <uni-card :is-shadow="false">
			<text class="uni-body">这是一个基础卡片示例，内容较少，此示例展示了一个没有任何属性不带阴影的卡片。</text>
		</uni-card> -->
		<view style="padding:0 10px;height:233px"> 
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
		<view style="flex:1"> 
			<view class="menu-panal">
				<view class="leftMenu">
					<scroll-view scroll-x="false" scroll-y="true" show-scrollbar="false" class="scrollView">
						<view v-for="(item,index) of  menuList" :class="['menuType-item',index==activeLeft?'menuType-active':'']" @click="checkMenu(index)">
							<text>{{item.name}}</text>
						</view>
					</scroll-view>
				</view>
				<view class="rightMenu">
					<scroll-view scroll-x="false" scroll-y="true" show-scrollbar="false" class="scrollView" :scroll-into-view="toMenuDetail_id" @scroll="scrollMenuDetail">
						<view v-for="(item,index) of  menuList" class="menuDetail" :id="'it'+index">
							<view  class="menuDetail-item"><view><text style="font-weight:bold">{{item.name}}</text> </view></view>
							<view  v-for="i of item._id['hm-menuDetail']" class="menuDetail-item"> 
					
								<view>									
									<view><text style="padding-left:15px">{{i.name}}</text>  </view>
									<view class="price-style"><text>￥</text><text>{{i.price}}</text>  </view>
								</view>
								<view class="ad-lose-num flex-center">
									<uni-icons  type="minus-filled" size="24" color="orange" @click="loseMenuCount(i)" v-if="i.checkCount>0"></uni-icons>
									<text style="padding:0 8px" v-if="i.checkCount>0">{{i.checkCount}}</text>
									<uni-icons  type="plus-filled" size="24" color="orange" @click="addMenuCount(i)"></uni-icons>
								</view>
								
								<!-- <u-number-box v-if="i.checkCount" :min="0" integer v-model="i.checkCount">
									<input slot="input" style="width: 40px;text-align: center;" class="input"
										v-model="i.checkCount"></input>
								</u-number-box> -->
							</view>
							
						</view>
					</scroll-view>
				</view>
			</view>
		</view>
	<view style="height:80px;position:relative" class="bottom-panal">
		<view class="bottom-panal-detail" v-if="goodsListPanalHeight!='0'" :style="{'height':goodsListPanalHeight}">
			<view style="background:rgba(0,0,0,0.3);flex:1" @click="openGoodsList"></view>
			<view class="list">
				<view class="list-item"  v-for="item of checkMenuList">
					<view class="list-item-name">{{item.name}}</view>
					<view class="ad-lose-num flex-center">
						<uni-icons  type="minus-filled" size="24" color="orange" @click="loseMenuCount(item)" v-if="item.checkCount>0"></uni-icons>
						<text style="padding:0 8px" v-if="item.checkCount>0">{{item.checkCount}}</text>
						<uni-icons  type="plus-filled" size="24" color="orange" @click="addMenuCount(item)"></uni-icons>
					</view>
				</view>
				<!-- <uni-list>
					<uni-list-item  :title="item.name" v-for="item of checkMenuList">
						
					</uni-list-item>					
				</uni-list> -->
			</view>
		</view>

		<view class="control-area"> 
			<view class=" btn-l control-area-left" @click="openGoodsList" >
				<view style="display:flex;"> 
					<view style="position:relative"> 
						<uni-icons type="cart-filled" size="30" :color="checMenuCount?'orange':'#616161'">				
						</uni-icons>
						<uni-badge :text="checMenuCount" absolute="rightTop"  style="position:absolute;right:0;top:0"></uni-badge>
					</view>
					
					<text style="padding-left:8px" v-if="checMenuCount<1">
						订单为空
					</text>
					<!-- <text style="padding-left:8px" v-if="checMenuCount>0">
						已选<text style="color:orange;padding:0 4px">{{ checMenuCount }}</text>道菜
					</text> -->
					<text style="color:red;font-weight:bold;padding-left:12px">￥{{checMenuPriceTotal}}</text>
				
				</view>
				<view> 
					<text style="color:orange">*（不包含餐具等其它费用）</text>
				</view> 
			</view>
			<view :class="['order-commit-style', 'btn',checMenuCount<1?'btn-disabled':'']" ><text>选好了</text></view>
			
		</view>
		
	</view>
	<!-- <view class="goodsListPanal" :style="{'height':goodsListPanalHeight}">
		<view style="background:orange;flex:1" @click="closeGoodsList"></view>
		<view style="height:300px;background:blue">
			
		</view>
	</view> -->

	<!-- <uni-popup ref="goodsItemPopup" type="bottom" background-color="#fff">
		
		
	</uni-popup> -->
	</view>
  </template>
  
  <script>
  import MenuService from '../../../services/MenuService';
	import leeLinkage from '../../../components/StarLee-linkage/linkage';
  export default {
		components: {
			leeLinkage			 
		},
		onload(params){
			console.log("params",params);
			
		},
		data() {
			return {
				activeLeft:0,
				toMenuDetail_id: 'it0',
				goodsListPanalHeight:0,
				hotel_name:"见山舍",
				hotel_id:"66f4d677e4ec9dbeca1f8ff9",
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

	  menuList:[],
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
			list2() {
				const _list = this.menuList[this.value]?._id['hm-menuDetail'];
				return _list ? _list : [];
			},
			checkMenuList(){
				let resultArray=[];
				 this.menuList.map(item=>{
					let arr = item._id['hm-menuDetail'].filter(it=>it.checkCount>0);
					if(arr.length){
						resultArray.push(arr);
					}
					return item;
				});
				return resultArray.flat();
			},
			checMenuCount(){
				if(!this.checkMenuList.length){
					return 0;
				}
				let count=0;
				this.checkMenuList.map(item=>{
					count += item.checkCount;
				})
				return count;
			},
			checMenuPriceTotal(){
				if(!this.checkMenuList.length){
					return 0;
				}
				let priceTotal=0;
				this.checkMenuList.map(item=>{
					priceTotal += item.checkCount * item.price;
				})
				return priceTotal;
			}
		},
		watch:{
			checMenuCount(newval){
				if(newval<1){
					this.goodsListPanalHeight=0
				}
				
			}
			
		},
		created(){
		this.getMenuList();
		},
		methods: {
			checkMenu(index){
				console.log(index);
				this.activeLeft =index;
				this.toMenuDetail_id = 'it'+index;
			},
			scrollMenuDetail(e){
				console.log(e)
			},
		async getMenuList(){
		let  menuList= [
            {
                "_id": {
                    "_value": "6703f76877f6ba7e271d4b5f",
                    "hm-menuDetail": [
                        {
                            "_id": "67040af760f84340cef243e4",
                            "isOffer": true,
                            "mark": "功1",
                            "menuType_id": "6703f76877f6ba7e271d4b5f",
                            "name": "土豆丝1",
                            "price": 281,
							checkCount:0
                        },
                        {
                            "_id": "67040f701de6951f97ca0e39",
                            "isOffer": true,
                            "mark": "13",
                            "menuType_id": "6703f76877f6ba7e271d4b5f",
                            "name": "毛毛菜",
                            "price": 44,
							checkCount:0
                        },
                        {
                            "_id": "6706b303e4ec9dbeca170c07",
                            "isOffer": true,
                            "mark": "",
                            "menuType_id": "6703f76877f6ba7e271d4b5f",
                            "name": "红烧肉",
                            "price": 48,
							checkCount:0
                        }
                    ]
                },
                "hotel_id": "66f4d677e4ec9dbeca1f8ff9",
                "mark": "家长菜备注2",
                "name": "家长菜2"
            }]
			//this.menuList = this.getMenuListFormat(menuList);

			try {
                uni.showLoading();
              const res = await   MenuService.getMenuList(this.hotel_id);
              console.log("菜单列表",res)
             // store.commit('updateMenuList', res.result.data);
			  this.menuList = this.getMenuListFormat(res.result.data);
              uni.hideLoading();
            } catch (error) {
              console.error(error);
              uni.hideLoading();
                uni.showModal({
                  content: "系统异常，请稍候再试！",
                  confirmText: "确认",
                });
            }
		},
			getMenuListFormat(menuList=[]){
			try {
			let arr =	menuList.map(item=>{
					item._id['hm-menuDetail'].map(it=>{
						it.checkCount=0;
						return it;
					});
					return item;
				});
				return arr
			} catch (error) {
			console.error(error)
				return []
			}
					
			},
			addMenuCount(itObj){
				console.log(itObj)
				this.menuList= this.menuList.map(item=>{
					item._id['hm-menuDetail'].map(it=>{
						if(it._id ==itObj._id){
							let count = it.checkCount ||0;
							it.checkCount =count+1;
						}
						return it;
					});
					return item;
				});
				
			},
			loseMenuCount(itObj){
				this.menuList= this.menuList.map(item=>{
					item._id['hm-menuDetail'].map(it=>{
						if(it._id ==itObj._id){
							it.checkCount--;
							
						}
						return it;
					});
					return item;
				});
				
			},
			openGoodsList(){
				if(!this.checkMenuList.length){
					this.goodsListPanalHeight=0;
					return;
				}
				this.goodsListPanalHeight=this.goodsListPanalHeight=='0'?'calc(100vh - 80px)':0;
				//this.$refs.goodsItemPopup.open();
			},
			closeGoodsList(){
				//this.goodsListPanalHeight='0'
			},
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
	
	display: flex;
	justify-content: space-between;
	.name-content{
	  flex:1;
	  display:flex;
	  flex-direction: column;
	  padding:8px 0;
	  font-size: $uni-font-size-base;
	  .name-content-item{
		padding:4px 0 ;
		
	  }
	  .price-style{
		color:#ff0000;
		font-weight: 400;
	  }
	}
  }


  .menu-panal{
	height: calc(100vh - 44px - 55px - 233px - 80px);
	display: flex;
	.leftMenu{
		max-width: 200px;
		min-width: 120px;
		height: calc(100vh - 44px - 55px - 233px - 80px);
		.menuType-item{
			height: 80px;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: #eee;
		};
		.menuType-active{
			background-color: #fff;
		}
		
		
	};
	.rightMenu{
		flex: 1;
		
		.menuDetail{
			.menuDetail-item{
				height: 80px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding:0 12px;
				.price-style{
					color: #ff0000;
					padding:4px 0 0 15px;
				}
			}
		}
		
	}
	.scrollView{
		height: calc(100vh - 44px - 55px - 233px - 80px);
	}
	
}
.bottom-panal{
	
	box-shadow:  0px -1px 4px -4px #000;
	.control-area{
		background-color: #fff;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 80px;
		overflow: hidden;
	}
	.bottom-panal-detail{
		display: flex;
		flex-direction: column;
		position:absolute;
		bottom:80px;
		width:100%;
		height:0;
		overflow: hidden;;
		transition:all 0.3s linear;
	}
	.control-area-left{
		color:#616161;
		padding-left:8px;
		cursor: pointer;
		&:hover{
			color: #000;
		}
	}
	.btn{
		display: flex;
		align-items: center;
		padding:0 8px;
		color:#eee;
		height: 80px;
		font-size: 14px;
		cursor: pointer;
		background-color: orange;
		&:hover{
			color: #fff;
		}
	}
	.btn-disabled{
		background-color:#aeaeae
	}
}
.goodsListPanal{
	width:100vw;
	background:green;
	height:0;
	overflow: hidden;
	position:fixed;
	bottom:80px;
	display:flex;
	flex-direction:column;
	transition: height 0.3s linear;
}
.list{
	display: flex;
	flex-direction: column;
	background-color: #fff;
	.list-item{
		display: flex;
		height: 40px;
		padding:0 12px;
		justify-content: space-between;
		align-items: center;
	}
}
  </style>