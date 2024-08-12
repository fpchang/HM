<template>
	<scroll-view :scroll-y="true" :scroll-top="0" @scroll="scrollEvent" style="height:calc(100vh - 50px);">
		<view style="" class="container">

<view class="top-area">
	<view class="title-area">
		<view class="check-area">
			<text class="$uni-font-size-lg">见山舍民宿</text>
			<u-icon name="arrow-down-fill" color="#000" size="20px" top="2"></u-icon>
		</view>
		<view class="add-area">
			<u-icon name="plus-circle" color="#000" size="20px" label="" top="2"></u-icon>
		</view>
	</view>
	<view :class="['navbar',isSticky?'sticky-style':'']">
		<u-tabs @click="clickTab" @change="checkTab" :list="list4" lineWidth="0" lineColor="#f56c6c"
			:current="currentTab_index"
			:activeStyle="{
			            color: '#303133',
			            fontWeight: 'bold',
						fontSize:'20px',
			            transform: 'scale(1.15)'
			        }" :inactiveStyle="{
			            color: '#606266',
						fontSize:'20px',
			            transform: 'scale(1)'
			        }" itemStyle="padding-left: 15px; padding-right: 15px; height: 34px;">
		</u-tabs>
	</view>
	
</view>
			



			<view class="content-area">

				<u-icon name="photo" color="#2979ff" size="28"></u-icon>

			</view>
		</view>


	</scroll-view>



</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				isSticky: false,
				currentTab_index:0,
				list4: [{
					id:"11",
					name: '关注'
				}, {
					id:"22",
					name: '推荐',
					badge: {
						isDot: true
					}
				}, {
					id:"33",
					name: '电影',
				}, {
					id:"22",
					name: '推荐',
					badge: {
						isDot: true
					}
				}, {
					id:"33",
					name: '电影',
				}, {
					id:"22",
					name: '推荐',
					badge: {
						isDot: true
					}
				}, {
					id:"33",
					name: '电影',
				}]
			}
		},
		onLoad() {

		},
		methods: {
			clickTab(e) {
				console.log("clickTab", e)
				this.currentTab_index =e.index;
			},
			checkTab(e) {
				//console.log("checkTab", e)
			},
			scrollEvent(e) {
				let {
					scrollTop
				} = e.detail;
				this.isSticky = (scrollTop > 80 ? true : false);
			}
		}
	}
</script>

<style lang="scss">
	.container {
		
		display: flex;
		flex-direction: column;
		font-size: $uni-font-size-lgs;
	}

	.top-area {
		
		height: 130px;
		box-sizing: border-box;
		.title-area{
			height: 70px;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			padding: 0 20px;
			.check-area {
				height: 24px;
				display: flex;
				flex-direction: row;
				text-align: center;
				overflow: hidden;
			
			}
		};
		
		.navbar {
			width: 100%;
			height: 40px;		
			z-index: 999;
			padding:10px 20px;
			box-sizing: border-box;
			background-color: #fff;
		}
	}



	.sticky-style {
		position: fixed;
		top: 0;
		left: 0;
	}
	.content-area{
		min-height: calc(100vh - 140px);
		height: 1200px;
		background-color: red;
	}
</style>