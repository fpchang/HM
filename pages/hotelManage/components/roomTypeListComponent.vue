<template>

	<view class="roomType-component">
		<view class="add-content-style" style="">
			<view><button class="uni-button" size="mini" type="primary" @click="addRoomType()">添加房型</button></view>
		</view>
		<view v-if="isPcShow">
			<uni-table border stripe emptyText="暂无更多数据">
				<!-- 表头行 -->
				<uni-tr>
					<uni-th align="center">房型名称</uni-th>
					<uni-th align="center">数量</uni-th>
					<uni-th align="center">设施</uni-th>
					<uni-th align="center" width="200px">操作</uni-th>
				</uni-tr>
				<!-- 表格数据行 -->
				<uni-tr v-for="item of roomType.roomTypeList">
					<uni-td>{{item.name}}</uni-td>
					<uni-td>{{item.count}}</uni-td>

					<uni-td>-</uni-td>
					<uni-td align="center">
						<view class="uni-group">
							<button class="uni-button" size="mini" type="primary">修改</button>
							<button class="uni-button" size="mini" type="warn" @click="deleteRoomType(item)">删除</button>
						</view>
					</uni-td>
				</uni-tr>


			</uni-table>
		</view>
		<view class="mobile-show-style" style="max-width: 450px;" v-if="!isPcShow">
			<uni-collapse v-model="accordionVal" :accordion="true">
				<uni-collapse-item v-for="item of roomType.roomTypeList">
					<template v-slot:title>
						<uni-section class="mb-10" :title=" item.name " type="circle">
							<template v-slot:right>
								<text style="font-weight: bold;">{{item.count}}间-</text>

							</template>
						</uni-section>
					</template>
					<view class="col-content">
						<view class="list">
							<view class="list-item">
								<view class="list-item-c"><text>房型设施：</text><text>--</text></view>
							</view>
							<view class="list-item">
								<view class="list-item-c"><text>数量：</text><text style="font-weight:bold">{{item.count}}</text></view>
							</view>
							<view class="list-item" style="justify-content: flex-end;">

								<view class="list-item-c" style="width: 130px;">
									<button class="uni-button" size="mini" type="primary"
										@click="editRoomType(item)">修改</button>
									<button class="uni-button" size="mini" type="warn"
										@click="deleteRoomType(item)">删除</button>
								</view>
							</view>
						</view>

					</view>
				</uni-collapse-item>

			</uni-collapse>
		</view>
		<uni-popup ref="popupCreateRoomType" background-color="transprant">
			<view class="popup-content">
				<view class="create-order-title-style">创建房型</view>
				<view class="comContent">
					
					 <createRoomTypeComponent @closePopup="closePopup"></createRoomTypeComponent> 
				

				</view>

			</view>
		</uni-popup>
	</view>
</template>

<script>
import createRoomTypeComponent from './createRoomTypeComponent.vue';
	export default {
		components:{
			createRoomTypeComponent
		},
		data() {
			return {
				accordionVal: '0',
				
			}
		},
		computed: {
			isPcShow(){
				return this.$store.state.isPcShow;
			},
			hotel_id(){
				return this.$store.state.hotel_id
			},
			roomType() {
				return this.$store.state.roomType;
			}
		},
		created() {
			 console.warn("roomType>>>>>>>>>>>>>>>>>", this.roomTypeList);
			this.$store.commit("getRoomType");
			
		},
		watch:{
			hotel_id(){
				this.$store.commit("getRoomType");
			}
		},
		methods:{
			editRoomType(rt){
				console.log("editRoomType",rt);
			},
			addRoomType(){
				this.$refs.popupCreateRoomType.open();
			},
			async deleteRoomType(rt){
				const conf = await uni.showModal({
					title: '确认删除房型',
					content: '删除后将无法恢复,确认删除吗?',
					cancelText: '取消',
					confirmText: '确认'
				})
				if (conf['cancel']) {
					return;
				}
				let newRoomTypeList = this.roomType.roomTypeList.filter(item=>{
					return item.value != rt.value;
				})
				console.log("deleteRoomType",rt,newRoomTypeList);
				
			}
			// getRoomTypeList(){
			// 	return uniCloud.callFunction({
			// 		name:"hm_getRoomType",
			// 		data:{hotel_id:this.hotel_id}
			// 	}).then(res=>{
					
			// 		if(res.result.data.length){
			// 			this.$store.commit("updateRoomTypeList",res.result.data[0].roomTypeList);
			// 		}
			// 	})
			// }
		}
	}
</script>

<style lang="scss">
	.add-content-style{
		display: flex;justify-content: flex-end;padding:0 20px;box-sizing: border-box;
	}
	.uni-group {
		display: flex;
		justify-content: space-between;
	}

	.col-content {
		/* background: linear-gradient(to bottom, #FFF, #EEF); */
		border-radius: 4px;
		padding: 0 20px;

		.list {
			display: flex;
			flex-direction: column;

			.list-item {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				padding: 10px 0;

				.list-item-c {
					display: flex;
					justify-content: space-between;
					align-items: center;
				}
			}
		}
	}
</style>