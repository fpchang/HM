<template>
	<view>
		
	</view>
</template>

<script>
import PermissionService from "../../../services/PermissionService";
	export default {
		data() {
			return {
				
				roleList:[],
				permissionList:[],
				role_permission_list:[]
				
			}
		},
		computed:{
			hotel_id(){
				return this.$store.state.hotel_id || "66f4d677e4ec9dbeca1f8ff9";
			},
			phone(){
				return ["186516285834","13122905832"][0];
			}
		},
		created(){
			//this.getRolePermissionList();
			this.getPermissionList();
		},
		methods: {
			getRoleList(){},
			async getPermissionList(){
				try {
					const res = await PermissionService.getPermissionList(this.hotel_id,this.phone);
					console.log("权限列表",res)
				} catch (error) {
					console.error(error)
				}
				
			},
			async getRolePermissionList(){
				try {
					const res = await PermissionService.getRolePermissionList("manager");
					console.log("角色权限列表",res)
				} catch (error) {
					console.error(error)
				}
				
			}
		}
	}
</script>

<style>

</style>
