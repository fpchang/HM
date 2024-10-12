<template>
	<view>
		<view>22222222222222</view>
		<view class="menu-panal">
			<view class="leftMenu">
				<scroll-view scroll-x="false" scroll-y="true" show-scrollbar="false" class="scrollView">
					<view v-for="item of  menuList" :class="['menuType-item',item==2?'menuType-active':'']" @click="checkMenu(item._id._value)">
						<text>{{item.name}}</text>
					</view>
				</scroll-view>
			</view>
			<view class="rightMenu">
				<scroll-view scroll-x="false" scroll-y="true" show-scrollbar="false" class="scrollView" :scroll-into-view="toMenuDetail_id" @scroll="scrollMenuDetail">
					<view v-for="item of  menuList" class="menuDetail" :id="'it'+item._id._value">
						<view  v-for="i of item._id['hm-menuDetail']" class="menuDetail-item"> 
				
							<text>{{i.name}}</text>
						</view>
						
					</view>
				</scroll-view>
			</view>
		</view>
		
	</view>
</template>

<script>
import UniListItem from '../../../uni_modules/uni-list/components/uni-list-item/uni-list-item.vue'
import uniList from '../../../uni_modules/uni-list/components/uni-list/uni-list.vue'
	export default {
  components: { uniList, UniListItem },
		onLoad(e) {
				console.log("order dishes 参数",e)
		},
		data() {
			return {
				cateList: [], //左侧分类列表
                current: 0, //当前点击项
                rectInfoList:[],
                tempCurrent:0,
                scrollTop:0,//左侧导航栏距离顶部的位置



				toMenuDetail_id:0,
				menuList: [
            {
                "_id": {
                    "_value": "6703f76877f6ba7e271d4b5f",
                    "hm-menuDetail": [
                        {
                            "_id": "67040af760f84340cef243e4",
                            "isOffer": true,
                            "mark": "功1",
                            "menuType_id": "6703f76877f6ba7e271d4b5f",
                            "name": "土豆丝1",
                            "price": 281
                        },
                        {
                            "_id": "67040f701de6951f97ca0e39",
                            "isOffer": true,
                            "mark": "13",
                            "menuType_id": "6703f76877f6ba7e271d4b5f",
                            "name": "毛毛菜",
                            "price": 44
                        },
                        {
                            "_id": "6706b303e4ec9dbeca170c07",
                            "isOffer": true,
                            "mark": "",
                            "menuType_id": "6703f76877f6ba7e271d4b5f",
                            "name": "红烧肉",
                            "price": 48
                        }
                    ]
                },
                "hotel_id": "66f4d677e4ec9dbeca1f8ff9",
                "mark": "家长菜备注2",
                "name": "家长菜2"
            },
            {
                "_id": {
                    "_value": "6707eeba0cfdd30e17686bdb",
                    "hm-menuDetail": [
                        {
                            "_id": "6707eed0ff6b41c804bfe563",
                            "isOffer": true,
                            "mark": "",
                            "menuType_id": "6707eeba0cfdd30e17686bdb",
                            "name": "红烧排骨",
                            "price": 98
                        },
                        {
                            "_id": "6707eee5a2df66f008ce53bd",
                            "isOffer": true,
                            "mark": "",
                            "menuType_id": "6707eeba0cfdd30e17686bdb",
                            "name": "苦瓜炒蛋",
                            "price": 58
                        }
                    ]
                },
                "hotel_id": "66f4d677e4ec9dbeca1f8ff9",
                "name": "特色菜"
            }
        ]
    
}
			
		},
		mounted(){
			this.getRectInfo();
		},
		methods: {
			checkMenu(_id){
				console.log(_id);
				this.toMenuDetail_id = 'it'+_id;
			},
			scrollMenuDetail(e){
				console.log(e)
			},
			      // 获取与顶部之间的距离  https://www.jianshu.com/p/8a01c9a1775d
				  getRectInfo() {
					console.log(11111);
                var top = 0;
                var bottom = 0;
                var temp = 0;
                for (var i = 0; i < this.menuList.length; i++) {
                    let view = uni.createSelectorQuery().in(this).select("#it"+this.menuList[i]._id._value);
                    view.fields({
                        size: true,
                        rect: true
                    }, data => {
                        top = temp;
                        bottom = top + data.height;
                        temp = bottom;
                        this.rectInfoList[i] = {
                            'top':top,
                            'bottom':bottom
                        }
                        // console.log(top, bottom);
                    }).exec();
                }
                console.log(this.rectInfoList);
            },
			getCurrentHeight(e){
                var currentHeight = e.detail.scrollTop;
                this.rectInfoList.forEach((item,index)=>{
                    if(currentHeight >= item.top && currentHeight <= item.bottom){
                        // 当前获取的盒子高度大于top小于bottom，判定将索引传至左侧菜单导航
                        this.current = index;
                        this.scrollTop = index * uni.upx2px(100);
                    }
                })
            }
		}
	}
</script>

<style lang="scss">
.menu-panal{
	display: flex;
	.leftMenu{
		max-width: 200px;
		min-width: 120px;
		.menuType-item{
			height: 100px;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: #eee;
		};
		.menuType-active{
			background-color: #fff;
		}
		
		
	};
	.rightMenu{
		.menuDetail{
			.menuDetail-item{
				height: 150px;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
		
	}
	.scrollView{
		height:calc(100vh - 110px);
	}
	
}
</style>
