<template>
	<view>
		<view class="add-content-style">
			<view class="left-panal">
				<uni-data-checkbox v-model="tabRadioVal" :localdata="tabitems"></uni-data-checkbox>
			</view>
			<view class="control-panal" v-show="tabRadioVal==1">
				<!-- <button class="uni-button" size="mini" type="primary" @click="addMenuType()">添加菜单分类</button> -->
				<u-icon name="plus-circle-fill" color="#000" size="22" label="添加菜单" labelPos="bottom" labelSize="12px"
					@click="addMenuType"></u-icon>
				<u-icon name="share-fill" color="#000" size="22" label="分享至微信" labelPos="bottom" labelSize="12px"
					@click="shareWx"></u-icon>
			</view>
		</view>
		<view style="display: flex; justify-content: center">
			<view class="card-container" :style="{ width: `${cardContainerWidth}px` }">
				<view v-if="tabRadioVal===0" class="card" v-for="item of orderDishesList"
					:style="{ width: `${cardWidth}px` }">
					<view class="card-item">
						<menuOrderCardComponent :orderDishesItem="item" @getOrderDishesList="getOrderDishesList"></menuOrderCardComponent>
					</view>
				</view>
				<view v-if="tabRadioVal===1" class="card" v-for="item of menuList" :style="{ width: `${cardWidth}px` }">
					<view class="card-item">
						<menuCardComponent :menuItem="item" @editMenuType="editMenuType"></menuCardComponent>
					</view>
				</view>
			</view>
		</view>
		<uni-popup ref="popupMenuType" background-color="transprant">
			<view class="popup-content">
				<view class="create-order-title-style">{{
          type == 1 ? "修改菜单分类" : "新增菜单分类"
        }}</view>
				<view class="comContent">
					<addMenuTypeComponent @closePopup="closePopup" :type="type" :targetObj="targetObj">
					</addMenuTypeComponent>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import menuCardComponent from "./menuCardComponent.vue";
	import menuOrderCardComponent from "./menuOrderCardComponent.vue";
	import addMenuTypeComponent from "./addMenuTypeComponent.vue";
	import MenuService from "../../../services/MenuService";
	export default {
		name: "menuList",
		components: {
			menuCardComponent,
			addMenuTypeComponent,
			menuOrderCardComponent
		},
		props: {},
		data() {
			return {
				tabRadioVal: 0,
				tabitems: [{
					value: 0,
					text: '订单管理'
				}, {
					value: 1,
					text: '菜单管理'
				}],
				widthTemp: 0,
				type: 0,
				targetObj: {},
				orderDishesList: []
			};
		},
		computed: {
			hotel_id() {
				return this.$store.state.hotel_id;
			},
			hotelList() {
				return this.$store.state.hotelList;
			},
			hotelName() {
				let tar = this.hotelList.find(item => item._id == this.hotel_id);
				return tar.hotelName
			},
			menuList() {
				return this.$menuStore.state.menuList;
			},
			viewWidth() {
				let viewWidth =
					uni.getSystemInfoSync().windowWidth ||
					uni.getSystemInfoSync().screenWidth;
				return viewWidth + this.widthTemp - this.widthTemp;
			},

			cardWidth() {
				let windowWidth = this.viewWidth - 20; //-20 为pc端滚动条宽度
				let count = Math.floor(windowWidth / 375);
				if (count == 0) {
					return windowWidth;
				}
				let ys = windowWidth % 375;
				return Math.min(375 + ys / count, 450);
			},
			cardContainerWidth() {
				let count = Math.max(Math.floor(this.viewWidth / this.cardWidth), 1);
				return this.cardWidth * count;
			},
			isPcShow() {
				return this.$store.state.isPcShow;
			},
		},
		watch: {
			hotel_id() {
				this.$menuStore.commit("getMenuList", this.hotel_id);
			},
			tabRadioVal(nval) {
				if (nval == 1) {
					this.$menuStore.commit("getMenuList", this.hotel_id);
					return;
				}
				this.getOrderDishesList();
			}
		},
		created() {
			//this.$menuStore.commit("getMenuList", this.hotel_id);
      this.getOrderDishesList();
		},
		methods: {
			addMenuType(item = {}) {
				this.type = 0;
				if (this.$store.state.isPcShow) {
					this.$refs.popupMenuType.open();
					return;
				}

				uni.navigateTo({
					url: `/pages/catering/addMenuType/addMenuType?type=${
          this.type
        }&&targetObj=${JSON.stringify(item)}`,
				});
			},
			editMenuType(item = {}) {
				this.type = 1;
				this.targetObj = item;
				if (this.$store.state.isPcShow) {
					this.$refs.popupMenuType.open();
					return;
				}
				uni.navigateTo({
					url: `/pages/cateromg/addMenuType/addMenuType?type=${
          this.type
        }&&targetObj=${JSON.stringify(item)}`,
				});
			},
			closePopup() {
				if (this.$store.state.isPcShow) {
					this.$refs.popupMenuType.close();
					return;
				}
				uni.navigateBack();
			},
			shareWx() {
				uni.share({
					provider: "weixin", //分享服务提供商（即weixin|qq|sinaweibo）
					type: 0, //图文
					scene: "WXSceneSession", //provider 为 weixin 时必选 WXSceneSession分享到聊天界面，WXSceneTimeline分享到朋友圈，WXSceneFavorite分享到微信收藏
					title: "民宿点菜", //分享内容的标题
					summary: "点菜内容", //分享内容的摘要
					href: `https://env-00jxh1m2dpmq-static.normal.cloudstatic.cn/index.html#/pages/catering/orderDishes/orderDishes?hotel_id=${this.hotel_id}`, //跳转链接，type 为 0 时必选
					//href: `http://localhost:8080/index.html#/pages/catering/orderDishes/orderDishes?hotel_id=${this.hotel_id}`, //跳转链接，type 为 0 时必选
					imageUrl: "", //图片地址，type 为 0、2、5 时必选
					success(res) {
						//成功返回的参数
						console.log(res);
					},
					fail(err) {
						//失败返回的参数
						console.log(err);
					},
				});
			},
			async getOrderDishesList() {
				try {
          uni.showLoading();
					const res = await MenuService.getOrderDishesList(this.hotel_id);
					this.orderDishesList = res.data;
          uni.hideLoading();
				} catch (error) {
					console.log(error)
          uni.hideLoading();
				}

			}
		},


		// 组件周期函数--监听组件挂载完毕
		mounted() {
			if (window) {
				window.onresize = () => {
					this.widthTemp = Math.random(10);
				};
			}
		},
		// 组件周期函数--监听组件数据更新之前
		beforeUpdate() {},
		// 组件周期函数--监听组件数据更新之后
		updated() {},
		// 组件周期函数--监听组件激活(显示)
		activated() {},
		// 组件周期函数--监听组件停用(隐藏)
		deactivated() {},
		// 组件周期函数--监听组件销毁之前
		beforeDestroy() {},
	};
</script>

<style scoped lang="scss">
	.card-container {
		display: flex;
		flex-wrap: wrap;
		min-width: 375px;

		.card {
			min-width: 375px;
			max-width: 450px;
			padding: 10px;
			box-sizing: border-box;

			.card-item {
				height: 100%;
				box-sizing: border-box;
				background: #fff;
				padding: 10px 20px;
				box-shadow: 0 0 4px 4px #e4e0e0;
				border-radius: 8px;
			}
		}
	}
</style>