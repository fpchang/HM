<template>
  <view class="use_com">
      <text>uniapp ---- 组件</text>
      <view>1、 scroll-view</view>
      
      <scroll-view class="com_scroll_view" scroll-x="true">
          <view v-for="(item,index) in get_scroll_view_list" :key="index" class="com_content">
              <view>
                  <image :src="item.mainPic" mode="" class="com_image"></image>
                  <view class="com_text1">{{item.skuName}}</view>
                  <view class="com_text2">{{item.priceValue}}</view>
                  <view class="com_text3">{{item.originPrice}}</view>
              </view>
              <view>
                  <view class="com_text4">
                      {{item.companyName}}
                  </view>
              </view>
          </view>
      </scroll-view>
      
      <view>******************************</view>
      
      <view>1、 scroll-view 双联动案例 （类似于锚点,原理也还是锚点）利用 scroll-into-view</view>
      <!-- uniapp获取节点信息，根据节点信息调整写需求。 -->
      <view>
          <view class="left">
              <!--    :class="index == click_index ? 'life_title':''"
                      :class="{life_title:index == click_index}"        -->
              <view 
              v-for="(item,index) in left_list" 
              :key="index" @click="change_click_index(index)" 
              :class="{life_title:index == click_index}"
              >
                  {{item.title}}
              </view>
          </view>
              
          <view class="right">
              <scroll-view 
              scroll-y="true" 
              class="scroll_y" 
              :scroll-into-view="scroll_into_view" 
              scroll-with-animation="true"
              @scroll="scroll_detail"
              @scrolltolower="scroll_bottom"
              >
                  <view v-for="(item,index) in left_list" :key="index">
                      <view style="background: red;" :id="'id'+index" class="selectAll">{{item.title}}</view>
                      <view v-for="(ite,ind) in item.list" :key="ind">{{ite}}</view>
                  </view>
              </scroll-view>
          </view>
      </view>
  </view>
</template>

<script>
  export default {
      data() {
          return {
              get_scroll_view_list:[],
              left_list:[
                  { title:"手机",list:["iphone12","华为p40","vivo90","oppoy77","三星手机"] },
                  { title:"电脑",list:["Mac pro","联想yoga910","华硕911","联想811","三星电脑"] },
                  { title:"水果",list:["香蕉","苹果","西瓜","榴莲","山竹"] },
                  { title:"饮料",list:["coke可乐","脉动","红牛","冰糖雪梨","果汁"] },
              ],
              //切换class
              click_index:0,
              //id动态切换
              scroll_into_view:"",
              //节点top值
              top_list:[]
          }
      },
      onLoad: function(){
          this.get_scroll_view();
      },
      methods: {
          async get_scroll_view(){
              let res = await this.$uni_request({
                  body:{
                      defaultProvince: "370000",
                      firstCateCode: "",
                      oldCustFlag: "2",
                      requiredAmount: "3"
                  },
                  header:{
                      bizCode: "prom013"
                  }
              });
              this.get_scroll_view_list = res.data.body.result;
          },
          //切换
          change_click_index(index){
              this.click_index = index;
              //利用uniapp组件的配置信息。
              this.scroll_into_view = 'id'+index;
              //解决最后一个 ***来回*** 问题 (由于点击左侧导航，右侧锚点位置信息变化，此时滚动事件也随之滚动。)
              uni.setStorageSync("resolve","last");
              setTimeout(()=>{
                  uni.clearStorageSync("resolve")
              },400);
          },
          //滚动过程
          scroll_detail(options){
              //options  为滚动信息。  options.detail.scrollTop  值为相对于scroll-view。
              if(!uni.getStorageSync("resolve")){
                  this.get_node_details(options);
              };
          },
          //获取节点信息
          get_node_details(options){
              const query = uni.createSelectorQuery().in(this); //获得实力
              //获取多个节点方式
              query.selectAll(".selectAll").boundingClientRect(data=>{
                  console.log(data); //得到class类名为  selectAll的数组集合
                  this.top_list = data.map(item=>{
                      return Math.ceil(item.top);
                  });
                  this.async_detail_msg(options);
              }).exec();
          },
          async_detail_msg(options){
              //options  为滚动信息。  options.detail.scrollTop  值为相对于scroll-view。
              let top_page = options.detail.scrollTop + this.top_list[0];
              
              for(let i = 0;i < this.top_list.length; i++){
                  let node1 = this.top_list[i];
                  let node2 = this.top_list[i+1];
                  if(node2 && top_page >= node1 && top_page < node2){
                      this.click_index = i;
                      break;
                  }else if(node2 && top_page === node2){
                      this.click_index = i + 1;
                      break;
                  }
              }
          },
          //滚动到底部
          scroll_bottom(options){
              setTimeout(()=>{
                  this.click_index = 3;
              },100)
          },
          
      }
  }
</script>

<style lang="scss" scoped>
  .use_com{
      margin-bottom: 100px;
  }
  .com_scroll_view{
      white-space:nowrap;
      .com_content{
          display: inline-block;
          width: 200px;
          padding: 0 10px;
          .com_image{
              width: 100%;
          }
          .com_text1,.com_text2,.com_text3,.com_text4{
              width: 100%;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
          }
          
      }
  }
  .left,.right{
      display: inline-block;
      border: 1px solid #4CD964;
      vertical-align: top;
      height: 160px;
  }
  .right{
      display: inline-block;
      border: 1px solid #4CD964;
  }
  .scroll_y{
      height: 100%;
  }
  .life_title{
      background: #DD524D;
  }
  
</style>