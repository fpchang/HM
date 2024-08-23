<template>
	<view class="order-component">
		<view class="uni-padding-wrap uni-common-mt" style="max-width: 450px;">
			<uni-segmented-control :current="current" :values="items" :style-type="styleType"
				:active-color="activeColor" @clickItem="onClickItem" />
		</view>
		<view class="content">
			<view v-if="current === 0">
				<view class="mobile-show-style" style="max-width: 450px;">
					<uni-collapse accordion v-model="accordionVal" @change="change">
						<uni-collapse-item title="手风琴效果">
							<view class="content">
								<text class="text">手风琴效果同时只会保留一个组件的打开状态，其余组件会自动关闭。</text>
							</view>
						</uni-collapse-item>
						<uni-collapse-item title="手风琴效果">
							<view class="content">
								<text class="text">手风琴效果同时只会保留一个组件的打开状态，其余组件会自动关闭。</text>
							</view>
						</uni-collapse-item>
						<uni-collapse-item title="手风琴效果">
							<view class="content">
								<text class="text">手风琴效果同时只会保留一个组件的打开状态，其余组件会自动关闭。</text>
							</view>
						</uni-collapse-item>
					</uni-collapse>
				</view>
				
			</view>
			<view v-if="current === 1">
				<view class="h5-show-style">
					<uni-table border stripe emptyText="暂无更多数据">
						<!-- 表头行 -->
						<uni-tr>
							<uni-th align="center">日期</uni-th>
							<uni-th align="center">姓名</uni-th>
							<uni-th align="left">地址</uni-th>
						</uni-tr>
						<!-- 表格数据行 -->
						<uni-tr>
							<uni-td>2020-10-20</uni-td>
							<uni-td>Jeson</uni-td>
							<uni-td>北京市海淀区</uni-td>
						</uni-tr>
						<uni-tr>
							<uni-td>2020-10-21</uni-td>
							<uni-td>HanMeiMei</uni-td>
							<uni-td>北京市海淀区</uni-td>
						</uni-tr>
						<uni-tr>
							<uni-td>2020-10-22</uni-td>
							<uni-td>LiLei</uni-td>
							<uni-td>北京市海淀区</uni-td>
						</uni-tr>
						<uni-tr>
							<uni-td>2020-10-23</uni-td>
							<uni-td>Danner</uni-td>
							<uni-td>北京市海淀区</uni-td>
						</uni-tr>
				
					</uni-table>
				</view>
				
			</view>
			<view v-if="current === 2"><text class="content-text">选项卡3的内容</text></view>
		</view>
		
	</view>

</template>

<script>
	export default {
		props: {

		},
		data() {
			return {
				current:0,
				items: ['列表', '表格', '选项卡3']
			}
		},
		created() {
			console.log('orderComponent create')
		},
		onLoad: function() {
			console.log('orderComponent Show')
		},
		methods:{
				onClickItem(e) {
							if (this.current !== e.currentIndex) {
								this.current = e.currentIndex
							}
						},
		}
	}
</script>

<style lang="scss">
	.order-component {
		padding: 0 15px;
		box-sizing: border-box;
	}
</style>