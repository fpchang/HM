<template>

	<view class="roomType-component">
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
				<uni-tr v-for="item of roomTypeList">
					<uni-td>{{item.name}}</uni-td>
					<uni-td>{{item.count}}</uni-td>

					<uni-td>-</uni-td>
					<uni-td align="center">
						<view class="uni-group">
							<button class="uni-button" size="mini" type="primary">修改</button>
							<button class="uni-button" size="mini" type="warn" @click="deleteRoomType(item)">撤销</button>
						</view>
					</uni-td>
				</uni-tr>


			</uni-table>
		</view>
		<view class="mobile-show-style" style="max-width: 450px;" v-if="!isPcShow">
			<uni-collapse v-model="accordionVal" :accordion="true">
				<uni-collapse-item v-for="item of roomTypeList">
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
							<view class="list-item" style="justify-content: flex-end;">

								<view class="list-item-c" style="width: 130px;">
									<button class="uni-button" size="mini" type="warn"
										@click="deleteRoomType(item)">修改</button>
									<button class="uni-button" size="mini" type="warn"
										@click="deleteRoomType(item)">删除</button>
								</view>
							</view>
						</view>

					</view>
				</uni-collapse-item>

			</uni-collapse>
		</view>
		<uni-popup ref="popup" background-color="transprant">
			<view class="popup-content">
				<view class="create-order-title-style">创建订单</view>
				<view class="comContent">
					<!-- <keep-alive> -->
					<!-- <createOrderComponent @closePopup="closePopup"></createOrderComponent> -->
					<!-- </keep-alive> -->

				</view>

			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				accordionVal: '0',
				// roomTypeList: [{
				// 		"count": 1,
				// 		"name": "包栋",
				// 		"value": "t0"
				// 	},
				// 	{
				// 		"count": 5,
				// 		"name": "大床房",
				// 		"value": "t1"
				// 	},
				// 	{
				// 		"count": 7,
				// 		"name": "标房",
				// 		"value": "t2"
				// 	},
				// 	{
				// 		"count": 2,
				// 		"name": "商务大床房",
				// 		"value": "t3"
				// 	},
				// 	{
				// 		"count": 3,
				// 		"name": "商务标间",
				// 		"value": "t4"
				// 	}
				// ]

			}
		},
		computed: {
			isPcShow(){
				return this.$store.state.isPcShow;
			},
			hotel_id(){
				return this.$store.state.hotel_id
			},
			roomTypeList() {
				return this.$store.state.roomTypeList;
			}
		},
		created() {
			console.warn("roomType>>>>>>>>>>>>>>>>>", this.roomTypeList);
			if(this.roomTypeList.length<1){
				this.getRoomTypeList();
			}
			
		},
		methods:{
			getRoomTypeList(){
				return uniCloud.callFunction({
					name:"hm_getRoomType",
					data:{hotel_id:this.hotel_id}
				}).then(res=>{
					
					if(res.result.data.length){
						this.$store.commit("updateRoomTypeList",res.result.data[0].roomTypeList);
					}
				})
			}
		}
	}
</script>

<style>
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