<template>

	<view class="hotel-component">
		<view class="add-content-style">
			<view class="control-panal">
			<u-icon
			   name="plus-circle-fill"
			   color="#000"
			   size="22"
			   label="添加酒店"
			   labelPos="bottom"
			   labelSize="12px"
			   @click="addHotel"
			 ></u-icon>
		   </view>
		   </view>
		<view v-if="isPcShow">
			<uni-table border stripe emptyText="暂无更多数据">
				<!-- 表头行 -->
				<uni-tr>
					<uni-th align="center" width="120px">酒店名称</uni-th>
					<uni-th align="center" >地址</uni-th>
					<uni-th align="center" width="180px">操作</uni-th>
				</uni-tr>
				<!-- 表格数据行 -->
				<uni-tr v-for="item of hotelList">
					<uni-td>{{item.hotelName}}</uni-td>
					<uni-td>{{item.hotelAdress}}</uni-td>
					<uni-td align="center">
						<view class="uni-group" style="justify-content:space-around">
						  <text class="edit-text-btn-style" @click="editHotel(item)">修改</text>
            			  <text class="edit-text-btn-style" @click="deleteHotel(item)">删除</text>
						</view>
					</uni-td>
				</uni-tr>


			</uni-table>
		</view>
		<view class="mobile-show-style" style="max-width: 450px;" v-if="!isPcShow">
			<uni-collapse v-model="accordionVal" :accordion="true">
				<uni-collapse-item v-for="item of hotelList">
					<template v-slot:title>
						<uni-section class="mb-10" :title=" item.hotelName " type="circle">
				
						</uni-section>
					</template>
					<view class="col-content">
						<view class="list">
							<view class="list-item">
								<view class="list-item-c"><text class="stitle">地址：</text><text>{{item.hotelAdress}}</text></view>
							</view>
							<view class="list-item">
								<view class="list-item-c"><text class="stitle">简介：</text><text>{{item.hotelIntroduction}}</text></view>
							</view>
							<view class="list-item" style="justify-content: flex-end;">

								<view class="list-item-c" style="width: 80px;">
										<u-icon name="edit-pen-fill" color="#06c" labelColor="#06c" size="22" label="修改"
									labelPos="bottom" labelSize="12px" @click="editHotel(item)"></u-icon>
							<u-icon name="trash-fill" color="#e64340" labelColor="#e64340" size="22" label="删除"
							labelPos="bottom" labelSize="12px" @click="deleteHotel(item)"></u-icon>
								</view>
							</view>
						</view>

					</view>
				</uni-collapse-item>

			</uni-collapse>
		</view>
		<uni-popup ref="popupaddHotel" background-color="transprant">
			<view class="popup-content">
				<view class="create-order-title-style">{{type==1?"修改酒店信息":"创建酒店信息"}}</view>
				<view class="comContent">
					<createHotelComponent @closePopup="closePopup" :type="type" :rt="rt"></createHotelComponent>
				</view>

			</view>
		</uni-popup>
	</view>
</template>

<script>
import createHotelComponent from '../components/createHotelComponent';
import HotelService from "../../../services/HotelService";
import DB from '../../../api/DB';
	export default {
		components:{
			createHotelComponent
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
			hotelList() {
				return this.$store.state.hotelList;
			}
		},
		async created() {
			console.log("1111",this.hotelList)
			
		},
		watch:{
			hotel_id(){
				// this.$store.dispatch("getRoomType");
			}
		},
		methods:{
			editHotel(rt){
				if(!this.$store.state.permissionStore.permissionList.includes('HOTEL_UPDATE')){
					 this.$alert.alertNoPermisson();
					return;
				}
				this.type=1;
				this.rt =rt;
				if(this.$store.state.isPcShow){
					this.$refs.popupaddHotel.open();
					return;
				}
					
				
				uni.navigateTo({
					url:`/pages/hotelManage/createHotel/createHotel?type=${this.type}&&rt=${JSON.stringify(this.rt)}`
				})
			},
			addHotel(){
				if(!this.$store.state.permissionStore.permissionList.includes('HOTEL_CREATE')){
					 this.$alert.alertNoPermisson();
					return;
				}
				this.type=0;
				if(this.$store.state.isPcShow){
					this.$refs.popupaddHotel.open();
					return;
				}									
				uni.navigateTo({
					url:'/pages/hotelManage/createHotel/createHotel'
				})
			},
			async deleteHotel(rt){
				if(!this.$store.state.permissionStore.permissionList.includes('HOTEL_DELETE')){
					 this.$alert.alertNoPermisson();
					return;
				}
				const conf = await uni.showModal({
					title: '确认删除此酒店',
					content: '删除后将无法恢复,确认删除吗?',
					cancelText: '取消',
					confirmText: '确认'
				})
				if (conf['cancel']) {
					return;
				}
				this.submitLoading = true;
				//uni.showLoading();
				// DB.callFunction("hm_deleteHotel",
				// 	{
				// 		_id:rt._id
				// 	}
				// )
				HotelService.deleteHotel(rt._id).then(async res=>{
                            console.log("删除成功");
						await this.$store.dispatch("getHotelList");
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
				this.$refs.popupaddHotel.close();
			}
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