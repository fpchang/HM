<template>
	<scroll-view :scroll-y="true" show-scrollbar="false" :scroll-top="0" @scroll="scrollEvent" style="height: 100vh;">
		<view style="" class="container">
			<view class="scroll-content">
				
				<view style="height:60px"></view>
				<view :class="['top-area',isSticky?'sticky-style':'']">
					<view class="title-area" :style="{opacity:opacityVal}">
						<view class="check-area">
							<text class="$uni-font-size-lg">见山舍民宿</text>
							<u-icon name="arrow-down-fill" color="#000" size="20px" top="2"></u-icon>
						</view>
						<view class="add-area">
							<u-icon name="plus-circle" color="#000" size="20px" label="" top="2"></u-icon>
						</view>
					</view>
					<view class="navbar">
						<view class="nav-content">
							<u-tabs @click="clickTab" @change="checkTab" :list="list4" lineWidth="0" lineColor="#f56c6c"
								:current="currentTab_index" :activeStyle="{
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
				
				</view>
				
				
			</view>
			


			<view class="content-area">
		
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
				opacityVal:1,
				currentTab_index: 0,
				list4: [{
                    name: '关注',
                }, {
                    name: '推荐',
                }, {
                    name: '电影'
                }, {
                    name: '科技'
                }, {
                    name: '音乐'
                }, {
                    name: '美食'
                }, {
                    name: '文化'
                }, {
                    name: '财经'
                }, {
                    name: '手工'
                }]
			
			}
		},
		onLoad() {

		},
		methods: {
			clickTab(e) {
				console.log("clickTab", e)
				this.currentTab_index = e.index;
			},
			checkTab(e) {
				//console.log("checkTab", e)
			},
			scrollEvent(e) {
				let {
					scrollTop
				} = e.detail;
				this.opacityVal=1-(Math.min(scrollTop/60,1));
				this.isSticky = (scrollTop >= 60 ? true : false);
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
.scroll-content{
	height:190px;
}
	.scroll-content .top-area {
		
		height: 130px;
		box-sizing: border-box;
		z-index: 999;
		background-color: #fff;
		.title-area {
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
		}

		;

		.navbar {
			width: 100%;
			height: 60px;
			display: flex;
			justify-content: center;
			align-items: center;
			
			
			background-color: #fff;
			.nav-content{	
				padding: 0 15px;
				width: 100%;
				box-sizing: border-box;
				
				
			}
			
		}
	}



	.sticky-style {
		width: 100vw;
		position: fixed;
		top: 0;
		left: 0;
	}

	.content-area {
		min-height: calc(100vh - 130px);
		height: 120vh;
		background-color: #eee;
	}
</style>