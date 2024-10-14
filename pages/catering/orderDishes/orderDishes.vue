<template>
	<view class="orderDishes-container" v-if="hotel._id">
		<view class="header-title" style=""><text>【{{hotel.hotelName}}】用餐预定</text></view>
		<!-- <uni-card :is-shadow="false">
			<text class="uni-body">这是一个基础卡片示例，内容较少，此示例展示了一个没有任何属性不带阴影的卡片。</text>
		</uni-card> -->
		<view style="padding:0 10px;height:205px">
			<uni-forms ref="orderDishesRef" :modelValue="orderDishesForm" :rules="orderDishesRules" label-width="130px">
				<uni-forms-item   label="用户名" required name="userName" class="forms-item-style">
					<uni-easyinput  v-model="orderDishesForm.userName" placeholder="请输入员工名" />
				</uni-forms-item>
				<uni-forms-item label="手机号" name="phone" required class="forms-item-style">
					<uni-easyinput v-model="orderDishesForm.phone" type="number" maxlength="11" placeholder="请输入手机号" />
				</uni-forms-item>
				<uni-forms-item label="用餐日期" name="mealDate" required class="forms-item-style">
					<uni-datetime-picker v-model="orderDishesForm.mealDate" type="data"  :start="new Date().getTime()" />
				</uni-forms-item>

				<uni-forms-item label="餐点" class="forms-item-style">
					<uni-data-checkbox v-model="orderDishesForm.mealType"
						:localdata="mealTypeItems"></uni-data-checkbox>
				</uni-forms-item>
			</uni-forms>
		</view>
		<view style="flex:1">
			<view class="menu-panal">
				<view class="leftMenu">
					<scroll-view scroll-x="false" scroll-y="true" show-scrollbar="false" class="scrollView">
						<view v-for="(item,index) of  menuList"
							:class="['menuType-item',index==activeLeft?'menuType-active':'']" @click="checkMenu(index)">
							<text>{{item.name}}</text>
						</view>
					</scroll-view>
				</view>
				<view class="rightMenu">
					<scroll-view scroll-x="false" scroll-y="true" show-scrollbar="false" class="scrollView"
						:scroll-into-view="toMenuDetail_id" @scroll="scrollMenuDetail">
						<view v-for="(item,index) of  menuList" class="menuDetail" :id="'it'+index">
							<view class="menuDetail-item">
								<view><text style="font-weight:bold">{{item.name}}</text> </view>
							</view>
							<view v-for="i of item._id['hm-menuDetail']" class="menuDetail-item">

								<view>
									<view><text style="padding-left:15px">{{i.name}}</text> </view>
									<view class="price-style"><text>￥</text><text>{{i.price}}</text> </view>
								</view>
								<view class="ad-lose-num flex-center">
									<uni-icons type="minus-filled" size="24" color="orange" @click="loseMenuCount(i)"
										v-if="i.checkCount>0"></uni-icons>
									<text style="padding:0 8px" v-if="i.checkCount>0">{{i.checkCount}}</text>
									<uni-icons type="plus-filled" size="24" color="orange"
										@click="addMenuCount(i)"></uni-icons>
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
		<view style="height:60px;position:relative" class="bottom-panal">
			<view class="bottom-panal-detail" v-if="goodsListPanalHeight!='0'" :style="{'height':goodsListPanalHeight}">
				<view style="background:rgba(0,0,0,0.3);flex:1" @click="openGoodsList"></view>
				<view class="list">
					<view class="list-item" v-for="item of checkMenuList">
						<view class="list-item-name">{{item.name}}</view>
						<view class="ad-lose-num flex-center">
							<uni-icons type="minus-filled" size="24" color="orange" @click="loseMenuCount(item)"
								v-if="item.checkCount>0"></uni-icons>
							<text style="padding:0 8px" v-if="item.checkCount>0">{{item.checkCount}}</text>
							<uni-icons type="plus-filled" size="24" color="orange"
								@click="addMenuCount(item)"></uni-icons>
						</view>
					</view>
					<!-- <uni-list>
					<uni-list-item  :title="item.name" v-for="item of checkMenuList">
						
					</uni-list-item>					
				</uni-list> -->
				</view>
			</view>

			<view class="control-area">
				<view class=" btn-l control-area-left" @click="openGoodsList">
					<view style="display:flex;align-items:center">
						<view style="position:relative">
							<uni-icons type="cart-filled" size="30" :color="checMenuCount?'orange':'#616161'">
							</uni-icons>
							<uni-badge :text="checMenuCount" absolute="rightTop"
								style="position:absolute;right:0;top:0"></uni-badge>
						</view>

						<!-- <text style="padding-left:8px" v-if="checMenuCount<1">
						订单为空
					</text> -->
						<!-- <text style="padding-left:8px" v-if="checMenuCount>0">
						已选<text style="color:orange;padding:0 4px">{{ checMenuCount }}</text>道菜
					</text> -->
						<text style="color:red;font-weight:bold;padding-left:12px">￥{{checMenuPriceTotal}}</text>
						<text style="color:orange" v-if="checMenuPriceTotal>0">*（不包含餐具等其它费用）</text>
					</view>
					<!-- <view> 
					
				</view>  -->
				</view>
				<view @click="submit" :class="['order-commit-style', 'btn',checMenuCount<1?'btn-disabled':'']">
					<text>选好了</text>
				</view>

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
	import HotelService from '../../../services/HotelService';
	import MenuService from '../../../services/MenuService';
	import leeLinkage from '../../../components/StarLee-linkage/linkage';
	export default {
		components: {
			leeLinkage
		},
		onInit(params) {
			console.log("params", params);
		},
		onload(params) {
			console.log("onload", params)

		},
		created(params) {
			console.log("created", params);
			this.getData();
		},
		data() {
			return {
				isLoading:false,
				hotel: {},
				activeLeft: 0,
				toMenuDetail_id: 'it0',
				goodsListPanalHeight: 0,
				mealTypeItems: [
					{
						value: "lunch",
						text: "午餐",
					}, {
						value: "dinner",
						text: "晚餐",
					}
				],
				orderDishesForm: {
					mealDate: '',
					mealDateTimestamp:0,
					mealType: 'dinner',
					userName: "",
					phone: "",
				},
				orderDishesRules: {
					userName: {
						rules: [{
							required: true,
							errorMessage: "请输入姓名",
						}]

					},
					// 对name字段进行必填验证
					phone: {
						rules: [{
								required: true,
								errorMessage: "手机必填",
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
					mealDate:{
						
						rules:[{
								required: true,
								errorMessage: "请选择定餐日期",
							}]
					
				}
			},

				menuList: [],

			}
		},
		computed: {
			hotel_id() {
				return this.$store.state.hotel_id;
			},
			checkMenuList() {
				let resultArray = [];
				this.menuList.map(item => {
					let arr = item._id['hm-menuDetail'].filter(it => it.checkCount > 0);
					if (arr.length) {
						resultArray.push(arr);
					}
					return item;
				});
				return resultArray.flat();
			},
			checMenuCount() {
				if (!this.checkMenuList.length) {
					return 0;
				}
				let count = 0;
				this.checkMenuList.map(item => {
					count += item.checkCount;
				})
				return count;
			},
			checMenuPriceTotal() {
				if (!this.checkMenuList.length) {
					return 0;
				}
				let priceTotal = 0;
				this.checkMenuList.map(item => {
					priceTotal += item.checkCount * item.price;
				})
				return priceTotal;
			}
		},
		watch: {
			checMenuCount(newval) {
				if (newval < 1) {
					this.goodsListPanalHeight = 0
				}

			}

		},

		methods: {
			checkMenu(index) {
				console.log(index);
				this.activeLeft = index;
				this.toMenuDetail_id = 'it' + index;
			},
			scrollMenuDetail(e) {
				//console.log(e)
			},
			async getData() {
				try {
					uni.showLoading();
					const hotelRes = await HotelService.getHotelInfoById(this.hotel_id);
					const res = await MenuService.getMenuList(this.hotel_id);
					console.log("酒店信息", hotelRes)
					console.log("菜单列表", res)
					this.hotel = hotelRes.data[0];
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

			getMenuListFormat(menuList = []) {
				try {
					let arr = menuList.map(item => {
						item._id['hm-menuDetail'].map(it => {
							it.checkCount = 0;
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
			addMenuCount(itObj) {
				console.log(itObj)
				this.menuList = this.menuList.map(item => {
					item._id['hm-menuDetail'].map(it => {
						if (it._id == itObj._id) {
							let count = it.checkCount || 0;
							it.checkCount = count + 1;
						}
						return it;
					});
					return item;
				});

			},
			loseMenuCount(itObj) {
				this.menuList = this.menuList.map(item => {
					item._id['hm-menuDetail'].map(it => {
						if (it._id == itObj._id) {
							it.checkCount--;

						}
						return it;
					});
					return item;
				});

			},
			openGoodsList() {
				if (!this.checkMenuList.length) {
					this.goodsListPanalHeight = 0;
					return;
				}
				this.goodsListPanalHeight = this.goodsListPanalHeight == '0' ? 'calc(100vh - 60px)' : 0;
				//this.$refs.goodsItemPopup.open();
			},
			closeGoodsList() {
				//this.goodsListPanalHeight='0'
			},
			 submit() {
				//http://localhost:8080/#/pages/catering/orderDishes/orderDishes?hotel_id=66f4d677e4ec9dbeca1f8ff9
				if(this.checMenuCount<1||this.isLoading){
					return;
				}
				this.$refs.orderDishesRef.validate().then(async (res) => {
					this.isLoading=true;
					uni.showLoading();
					let orderDishesObj =Object.assign(this.orderDishesForm,{hotel_id:this.hotel_id, checkMenuList:this.checkMenuList})
					console.log(orderDishesObj);
					orderDishesObj.mealDateTimestamp=new Date(orderDishesObj.mealDate).getTime();;
					try {
					const res =	await MenuService.addOrderDishes(orderDishesObj);
					this.isLoading=false;
					uni.hideLoading();
					uni.reLaunch({
					url:`/pages/common/success?hotel=${JSON.stringify(this.hotel)}`,
					});
			
					} catch (error) {
						let errobj = JSON.parse(JSON.stringify(error));
						console.log("1111",errobj,errobj.errMsg);
						this.isLoading=false;
						uni.hideLoading();
						const text = errobj.errMsg.includes("exists")?'请不要重复提交':"系统异常，请稍候再试！"
						uni.showModal({
						content: text,
						confirmText: "确认",
					});
					
				}
					
					
				})
			}
		}
	}
</script>

<style lang="scss">
	.orderDishes-container {
		max-width: 800px;
		margin: auto;
		display: flex;
		flex-direction: column
	}

	.header-title {
		display: flex;
		font-size: 22px;
		height: 55px;
		justify-content: center;
		align-items: center;
	}

	.forms-item-style {
		margin-bottom: 20px;
	}

	.foods-item {

		display: flex;
		justify-content: space-between;

		.name-content {
			flex: 1;
			display: flex;
			flex-direction: column;
			padding: 8px 0;
			font-size: $uni-font-size-base;

			.name-content-item {
				padding: 4px 0;

			}

			.price-style {
				color: #ff0000;
				font-weight: 400;
			}
		}
	}


	.menu-panal {
		height: calc(100vh - 55px - 205px - 60px);
		display: flex;

		.leftMenu {
			max-width: 200px;
			min-width: 120px;
			height: calc(100vh - 55px - 205px - 60px);

			.menuType-item {
				height: 60px;
				display: flex;
				align-items: center;
				justify-content: center;
				background-color: #eee;
			}

			;

			.menuType-active {
				background-color: #fff;
			}


		}

		;

		.rightMenu {
			flex: 1;

			.menuDetail {
				.menuDetail-item {
					height: 60px;
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 0 12px;

					.price-style {
						color: #ff0000;
						padding: 4px 0 0 15px;
					}
				}
			}

		}

		.scrollView {
			height: calc(100vh - 55px - 205px - 60px);
		}

	}

	.bottom-panal {

		box-shadow: 0px -1px 4px -4px #000;

		.control-area {
			background-color: #fff;
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 60px;
			overflow: hidden;
		}

		.bottom-panal-detail {
			display: flex;
			flex-direction: column;
			position: absolute;
			bottom: 60px;
			width: 100%;
			height: 0;
			overflow: hidden;
			;
			transition: all 0.3s linear;
		}

		.control-area-left {
			color: #616161;
			padding-left: 8px;
			cursor: pointer;

			&:hover {
				color: #000;
			}
		}

		.btn {
			display: flex;
			align-items: center;
			padding: 0 8px;
			color: #eee;
			height: 60px;
			font-size: 14px;
			cursor: pointer;
			background-color: orange;

			&:hover {
				color: #fff;
			}
		}

		.btn-disabled {
			background-color: #aeaeae
		}
	}

	.goodsListPanal {
		width: 100vw;
		background: green;
		height: 0;
		overflow: hidden;
		position: fixed;
		bottom: 60px;
		display: flex;
		flex-direction: column;
		transition: height 0.3s linear;
	}

	.list {
		display: flex;
		flex-direction: column;
		background-color: #fff;

		.list-item {
			display: flex;
			height: 40px;
			padding: 0 12px;
			justify-content: space-between;
			align-items: center;
		}
	}
</style>