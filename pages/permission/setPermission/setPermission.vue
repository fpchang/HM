<template>
	<view>
		<button @click="deletePermission">删除</button>
		<button @click="setPermissionRole">添加权限administraoor</button>
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

		},
		methods: {
			async deletePermission(){
				const db = uniCloud.database();
				await db.collection("hm-role-permission").remove();
				console.log("删除成功");
			},
			async setPermissionRole(){
				try {
					const db = uniCloud.database();
					const permissionRes=await db.collection("hm-permission").get();
					console.log("permissionRes",permissionRes);
					let arr=[];
					permissionRes.result.data.map(item=>{
				
						arr.push({
							role_name:"administrator",
							permission_id:item._id,
							description:""
						})
					})
					db.collection("hm-role-permission").add(arr).then(item=>{
						console.log("添加成功")
					})
				} catch (error) {
					throw new Error(error);
				}
				

			},
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
