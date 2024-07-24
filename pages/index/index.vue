<template>
	<view class="container">
		<createOrder></createOrder>
	</view>
</template>
<script setup>
	import test from './components/test.vue'
</script>
<script>

	export default {
		data() {
			return {
				href: 'https://uniapp.dcloud.io/component/README?id=uniui'
			}
		},
		methods: {

		}
	}
</script>

<style>
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
	}
</style>
