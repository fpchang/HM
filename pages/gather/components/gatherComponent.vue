<template>
  <view class="gather">
    <uni-section class="mb-10" title="待办" type="line"></uni-section>

    <view style="display: flex; justify-content: center">
      <view
        class="card-container"
        :style="{ width: `${cardContainerWidth}px` }"
      >
        <view
          class="card"
          v-for="item of dataList"
          :style="{ width: `${cardWidth}px` }"
        >
          <view class="card-item">
            <gatherCardComponent :targetObj="item">
				<template v-slot:content>
					<uni-section class="mb-10" title="详情" type="line"></uni-section>
				</template>
			</gatherCardComponent>
          </view>
        </view>
      </view>
    </view>
    <uni-section class="mb-10" title="统计" type="line"></uni-section>
    <view>
      <ui-echarts ref="chart" :option="option"   exportBase64></ui-echarts>
      <image v-if="image" :src="image"></image>
      <button type="primary" size="mini" @click="toImage">导出图片</button>
    </view>
  </view>
</template>

<script>
import gatherCardComponent from './gatherCardComponent.vue';

	export default{
		components:{
			gatherCardComponent
		},
		 props: {

		  },
		  data(){
			  return {

				dataList:[
					{
					title:"今日待办",
					OrderList:[]

					},{
						title:"今日订单",
						OrderList:[]
					}
					],
					image:"",
				option:{}
			  }
		  },

		  computed:{
			user(){
				return this.$store.state.user;
			},
			viewWidth() {
      let viewWidth =
        uni.getSystemInfoSync().windowWidth ||
        uni.getSystemInfoSync().screenWidth;
      return viewWidth + this.widthTemp - this.widthTemp;
    },

    cardWidth() {
      let windowWidth = this.viewWidth - 20; //-20 为pc端滚动条宽度
      let count = Math.floor(windowWidth / 375);
      if (count == 0) {
        return windowWidth;
      }
      let ys = windowWidth % 375;
      return Math.min(375 + ys / count, 450);
    },
    cardContainerWidth() {
      let count = Math.max(Math.floor(this.viewWidth / this.cardWidth), 1);
      return this.cardWidth * count;
    },
    isPcShow() {
      return this.$store.state.isPcShow;
    }
		},
		
		  mounted() {
		  	console.log('gatherComponent create');
			this.option={
            grid: {
                right: 20
            },
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [150, 230, 224, 218, 135, 147, 260],
                type: 'line'
            }]
        }
		  },
		  onLoad: function() {
		  	console.log('gatherComponent Show')
		  },
		  methods:{
			toImage () {
            this.$refs?.chart.toImageFile({
                /**
                 * tempFilePath 图片路径, H5导出也是base64
                 * base64 图片base64
                 */
                success: ({ tempFilePath, base64 }) => {
                    this.image = base64;
                }
            })
        }
		  }
	}
</script>

<style lang="scss">
.gather{
  padding:0 20px;
}
.card-container {
  display: flex;
  flex-wrap: wrap;
  min-width: 375px;
  .card {
    min-width: 375px;
    max-width: 450px;
    padding: 10px;
    box-sizing: border-box;
    .card-item {
      height: 100%;
      box-sizing: border-box;
      background: #fff;
      padding: 10px 20px;
      box-shadow: 0 0 4px 4px #e4e0e0;
      border-radius: 8px;
    }
  }
}
</style>
