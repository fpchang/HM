<template>
	<view class="content">
		<scroll-view :scroll-y="true" :scroll-x="false" class="scroll-view" style="">
			<createOrderComponent></createOrderComponent>
		</scroll-view>

	</view>
</template>

<script>
	import createOrderComponent from '../components/createOrderComponent';
	export default {
		components: {
			createOrderComponent
		},
		data() {
			return {

			}
		},

		methods: {

		}
	}
</script>

<style lang="scss">
	.scroll-view {
		padding: 20px 15px;
		box-sizing: border-box;
		height: calc(100vh - 44px)
	}
</style>