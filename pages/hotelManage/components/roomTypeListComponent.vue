<template>

	<view class="roomType-component">
		<!-- <view class="add-content-style" style="">
			<view><button class="uni-button" size="mini" type="primary" @click="addRoomType()">添加房型</button></view>
		</view> -->
		<view class="add-content-style">
			<view class="control-panal">
			<u-icon
			   name="plus-circle-fill"
			   color="#000"
			   size="22"
			   label="添加房型"
			   labelPos="bottom"
			   labelSize="12px"
			   @click="addRoomType"
			 ></u-icon>
		   </view>
		   </view>
		<view v-if="isPcShow">
			<uni-table border stripe emptyText="暂无更多数据">
				<!-- 表头行 -->
				<uni-tr>
					<uni-th align="center" width="120px">房型名称</uni-th>
					<uni-th align="center" width="80px">数量</uni-th>
					<uni-th align="center">房间号</uni-th>
					<uni-th align="center" width="180px">操作</uni-th>
				</uni-tr>
				<!-- 表格数据行 -->
				<uni-tr v-for="item of roomType">
					<uni-td>{{item.name}}</uni-td>
					<uni-td>{{item.count}}</uni-td>
					<uni-td>
						<text v-for="it of sortRoomList(item.roomList)" v-if="item.roomList.length<=20">【{{it}}】</text>
						<uni-collapse ref="collapse"  :border="false" v-if="item.roomList.length>20">
							<uni-collapse-item title="显示房间号" >
								<view class="content">
									<text v-for="it of sortRoomList(item.roomList)">【{{it}}】</text>
								</view>
							</uni-collapse-item>
							</uni-collapse>
						
						
					</uni-td>
					<uni-td align="center">
						<view class="uni-group" style="justify-content:space-around">
							<!-- <button class="uni-button" size="mini" type="primary" @click="editRoomType(item)">修改</button> -->
							<!-- <button class="uni-button" size="mini" type="warn" @click="deleteRoomType(item)" :loading="submitLoading">删除</button> -->
							<!-- <u-icon name="trash-fill" color="#06c" labelColor="#06c" size="22" label="修改"
									labelPos="bottom" labelSize="12px" @click="editRoomType(item)"></u-icon>
							<u-icon name="trash-fill" color="#e64340" labelColor="#e64340" size="22" label="删除"
							labelPos="bottom" labelSize="12px" @click="deleteRoomType(item)"></u-icon> -->
							  <text class="edit-text-btn-style" @click="editRoomType(item)">修改</text>
            				  <text class="edit-text-btn-style" @click="deleteRoomType(item)">删除</text>
						</view>
					</uni-td>
				</uni-tr>


			</uni-table>
		</view>
		<view class="mobile-show-style" style="max-width: 450px;" v-if="!isPcShow">
			<uni-collapse v-model="accordionVal" :accordion="true">
				<uni-collapse-item v-for="item of roomType">
					<template v-slot:title>
						<uni-section class="mb-10" :title=" item.name " type="circle">
							<template v-slot:right>
								<text style="font-weight: bold;">{{item.count}}间</text>

							</template>
						</uni-section>
					</template>
					<view class="col-content">
						<view class="list">
							<view class="list-item">
								<view class="list-item-c">
									<view style="width:60px;"><text class="stitle">房间号：</text></view>
									<view style="flex:1"><text v-for="i of sortRoomList(item.roomList)"">【{{i}}】</text></view>
								
								</view>
								
							</view>
							<view class="list-item">
								<view class="list-item-c"><text class="stitle">数量：</text><text>{{item.count}}</text></view>
							</view>
							<view class="list-item" style="justify-content: flex-end;">

								<view class="list-item-c" style="width: 130px;">
									<button class="uni-button" size="mini" type="primary"
										@click="editRoomType(item)">修改</button>
									<button class="uni-button" size="mini" type="warn"
										@click="deleteRoomType(item)" :loading="submitLoading">删除</button>
										<!-- <u-icon name="edit-pen-fill" color="#06c" labelColor="#06c" size="22" label="修改"
									labelPos="bottom" labelSize="12px" @click="editRoomType(item)"></u-icon>
							<u-icon name="trash-fill" color="#e64340" labelColor="#e64340" size="22" label="删除"
							labelPos="bottom" labelSize="12px" @click="deleteRoomType(item)"></u-icon> -->
								</view>
							</view>
						</view>

					</view>
				</uni-collapse-item>

			</uni-collapse>
		</view>
		<uni-popup ref="popupCreateRoomType" background-color="transprant">
			<view class="popup-content">
				<view class="create-order-title-style">{{type==1?"修改房型":"创建房型"}}</view>
				<view class="comContent">
					
					 <createRoomTypeComponent @closePopup="closePopup" :type="type" :rt="rt"></createRoomTypeComponent> 
				

				</view>

			</view>
		</uni-popup>
	</view>
</template>

<script>
import createRoomTypeComponent from './createRoomTypeComponent.vue';
import DB from '../../../api/DB';
	export default {
		components:{
			createRoomTypeComponent
		},
		data() {
			return {
				type:0,
				rt:{},
				submitLoading: false,
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
		async created() {
			await  this.$store.dispatch("getRoomType");
			
		},
		watch:{
			hotel_id(){
				 this.$store.dispatch("getRoomType");
			}
		},
		methods:{
			sortRoomList(list){
				let newList = list.filter(item=>{return item})
				return newList.sort();
			},
			editRoomType(rt){
				if(!this.$store.state.permissionStore.permissionList.includes('ROOMTYPE_UPDATE')){
					 this.$alert.alertNoPermisson();
					return;
				}
				this.type=1;
				this.rt =rt;
				if(this.$store.state.isPcShow){
					this.$refs.popupCreateRoomType.open();
					return;
				}
					
				
				uni.navigateTo({
					url:`/pages/hotelManage/createRoomType/createRoomType?type=${this.type}&&rt=${JSON.stringify(this.rt)}`
				})
			},
			addRoomType(){
				this.type=0;
				if(this.$store.state.isPcShow){
					this.$refs.popupCreateRoomType.open();
					return;
				}
					
				
				uni.navigateTo({
					url:'/pages/hotelManage/createRoomType/createRoomType'
				})
			},
			async deleteRoomType(rt){
				if(!this.$store.state.permissionStore.permissionList.includes('ROOMTYPE_DELETE')){
					 this.$alert.alertNoPermisson();
					return;
				}
				const conf = await uni.showModal({
					title: '确认删除房型',
					content: '删除后将无法恢复,确认删除吗?',
					cancelText: '取消',
					confirmText: '确认'
				})
				if (conf['cancel']) {
					return;
				}
				this.submitLoading = true;
				//uni.showLoading();
				DB.callFunction("hm_deleteRoomType",
					{
						_id:rt._id
					}
				).then(async res=>{
                            console.log("删除成功");
							await this.$store.dispatch("getRoomType");
						this.submitLoading = false;
						uni.hideLoading();
							
				}).catch(er => {
						console.log("删除失败",er);
						this.submitLoading = false;
						uni.hideLoading();
						uni.showModal({
							content:"系统异常，请稍候再试！",
							confirmText:"确认"
						});
					})
				
			},
			closePopup(){
				this.$refs.popupCreateRoomType.close();
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
					.stitle{
						font-weight: bold;
					}
				}
			}
		}
	}
</style>