<template>
	<view>第一个组件</view>
</template>

<script>
	export default{
		 props: {
		   
		  },
		  data(){
			  return {}
		  },
		  created() {
		  	console.log('gatherComponent create')
		  },
		  onLoad: function() {
		  	console.log('gatherComponent Show')
		  },
	}
	 
</script>

<style>
</style>