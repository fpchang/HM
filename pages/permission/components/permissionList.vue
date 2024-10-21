<template>
  <div class="permissionList">permissionList</div>
</template>

<script>

export default({
  name: "permissionList",
  props: {},
  data() {
    return {}
  },
  computed: {
    hotel_id(){
      return this.$store.state.hotel_id;
    },
    permissionList(){
      return this.$store.state.permissionStore.permissionList;
    }
  },
  methods: {},
  watch: {},

  // 组件周期函数--监听组件挂载完毕
  mounted() {},
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
}) 
</script>

<style scoped></style>