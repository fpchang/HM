<template>
	
	
	<view>

	</view>

	<uni-list>
		<uni-list :border="true">
			<!-- 显示圆形头像 -->
			<uni-list-chat :avatar-circle="true" title="uni-app"
				avatar="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png" note="您收到一条新的消息"
				time="2020-02-02 20:20"></uni-list-chat>
			<!-- 右侧带角标 -->
			<uni-list-chat title="uni-app" avatar="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
				note="您收到一条新的消息" time="2020-02-02 20:20" badge-text="12"></uni-list-chat>
			<!-- 头像显示圆点 -->
			<uni-list-chat title="uni-app" avatar="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
				note="您收到一条新的消息" time="2020-02-02 20:20" badge-positon="left" badge-text="dot"></uni-list-chat>
			<!-- 头像显示角标 -->
			<uni-list-chat title="uni-app" avatar="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
				note="您收到一条新的消息" time="2020-02-02 20:20" badge-positon="left" badge-text="99"></uni-list-chat>
			<!-- 显示多头像 -->
			<uni-list-chat title="uni-app" :avatar-list="avatarList" note="您收到一条新的消息" time="2020-02-02 20:20"
				badge-positon="left" badge-text="dot"></uni-list-chat>
			<!-- 自定义右侧内容 -->
			<uni-list-chat title="uni-app" :avatar-list="avatarList" note="您收到一条新的消息" time="2020-02-02 20:20"
				badge-positon="left" badge-text="dot">
				<view class="chat-custom-right">
					<text class="chat-custom-text">刚刚</text>
					<!-- 需要使用 uni-icons 请自行引入 -->
					<uni-icons type="star-filled" color="#999" size="18"></uni-icons>
				</view>
			</uni-list-chat>
		</uni-list>
	</uni-list>


</template>

<script>
	export default {
		data() {
			return {
				
				      
				name: "",
				href: 'https://uniapp.dcloud.io/component/README?id=uniui'
			}
		},
		onReady() {
			//this.getData();
			this.getOpenId();

		},
		methods: {
			getOpenId() {
				uniCloud.callFunction({
					name: "getOpenId",
					data: {
						code: "0b1ZSx000bQFtS1KFv100pGTCU2ZSx01",
						secret: "845eff40726dc3624688c347dab12bce",
						appId: "wxb0704bf984581410"
					}
				}).then(res => {
					console.log("获取的openid.....", res)
				})
			},
			getData() {
				const db = uniCloud.database();

				db.collection('order').where("checkInEndDateTimeStamp<22222222222222222&&checkInStartDateTimeStamp>111111")
					.get().then(res => {
						console.log("11111", res)

					})
			}
		}
	}
</script>

<style lang="scss">
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
	}

	.con {
		background-color: red;
		width: 600rpx;
		height: 400rpx;
	}
</style>