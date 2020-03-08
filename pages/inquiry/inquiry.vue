<template>
	<view class="content">
		<view class="bar flex_row">
			<!-- <image class="icon icon-add" v-if="imgSrc" :src="imgSrc + '/add.png'"></image> -->
			<view class="search flex_row">
				<input confirm-type="search" @confirm="search" type="text" placeholder="请输入车牌号/车架号" placeholder-style="color:rgba(255,255,255,.8)"/>
				<!-- <view class="search-btn">查询</view> -->
				<view style="position: absolute;left: 30upx;">
					<uni-icon type="search" size="26" color="#fff"></uni-icon>
				</view>
				<navigator open-type="navigate" url="../inquiry-add/inquiry-add">
					<uni-icon type="plus" size="26" color="#fff"></uni-icon>
                </navigator>
				<!-- <image class="icon icon-search" v-if="imgSrc" :src="imgSrc + '/search.png'"></image> -->
			</view>
		</view>
		<view class="lists">
			<view class="lists-item" vi-if="lists" v-for="(item,index) in lists" :key="index">
				<uni-swipe-action :options="options" :is-opened="isOpened" :auto-close="true" @click="bindClick(index, item, $event)">
					<view class="flex_row">
						<text>车牌号</text>
						<text>沪A888888</text>
						<!-- <text>{{item.plate}}</text> -->
					</view>
					<view class="flex_row">
						<text>车架号</text>
						<text>HK.32588</text>
						<!-- <text>{{item.frame}}</text> -->
					</view>
					<view class="flex_row">
						<text>车主姓名</text>
						<text>张三</text>
						<!-- <text>{{item.name}}</text> -->
					</view>
				</uni-swipe-action>
			</view>
		</view>
		<uni-load-more status="loading" v-if="loading"></uni-load-more>
		<neil-modal :show="show" @close="closeModal()" :title="title">
		    <view class="input-view">
		        <view class="input-name">
		            <view>车牌</view>
		            <input type="text" placeholder="请输入用车牌号" />
		        </view>
		        <view class="input-password">
		            <view>车架</view>
		            <input type="text" password placeholder="请输入车架号" />
		        </view>
				<view class="input-password">
				    <view>姓名</view>
				    <input type="text" password placeholder="请输入姓名" />
				</view>
		    </view>
		</neil-modal>
	</view>
</template>

<script>
	import uniIcon from "@/components/uni-icon/uni-icon.vue";
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue";
	import uniSwipeAction from "@/components/uni-swipe-action/uni-swipe-action.vue";
	import neilModal from '@/components/neil-modal/neil-modal.vue';
	
	export default {
		components: {
			uniIcon,
			uniLoadMore,
			uniSwipeAction,
			neilModal
		},
		data() {
			return {
				imgSrc: '../../static/images/',
				loading: false,
				isOpened: false,
				show: false,
				title: '车辆编辑',
				lists: [
					{id: 'qdqdqwdwec', plate:'11111', frame: '22222', name:'张三'},
					{id: 'dfrewfefff', plate:'11111', frame: '22222', name:'李四'},
					{id: 'scvszvevev', plate:'11111', frame: '22222', name:'赵武'},
					{id: 'hntntnfrec', plate:'11111', frame: '22222', name:'郑留'},
					{id: 'dscxqwedsd', plate:'22222', frame: '22222', name:'大厨'}
				],
				options: [{
					text: '编辑',
					style: {
						backgroundColor: '#007aff'
					}
				}, {
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}]
			};
		},
		onLoad() {
	
		},
		methods: {
			search(value){
				uni.showToast({
					title: `搜索`,
					icon: 'none'
				})
			},
			bindClick(index, item, $event){
				console.log(`点击触发了${index}个`, $event.text);
				if($event.index === 0){
					console.log(`开始编辑`);
// 					uni.redirectTo({
// 						url: `../inquiry-edit/inquiry-edit?id=${item.id}`
// 					});
					this.confirm();
				}else{
					this.lists.splice(index, 1);
				}
			},
			confirm() {
			    console.log(this[`show`])
			    this[`show`] = true
			    console.log(this[`show`])
			},
			closeModal() {
			    console.log(`监听到close`)
			    this[`show`] = false
			},
			bindBtn(type) {
			    uni.showToast({
			        title: `点击了${type==='cancel'?'取消':'确定'}按钮`,
			        icon: 'none'
			    })
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		padding: 0;
		.bar{
			height: 120upx;
			overflow:hidden;
			background: #247896;
			position: relative;
			padding: 20upx;
			.search{
				justify-content: space-between;
				width: 100%;
				height: 76upx;
				box-sizing: border-box;
				color: rgba(255,255,255,1);
				input{
					width:80%;
					height:100%;
					padding-left:80upx;
					background: #1f6077;
					div{
						@extend .search;
					}
				}
			}
		}
		.lists{
			margin-top: 40upx;
			padding: 0 20upx;
			.lists-item{
				height: 160upx;
				line-height: 1.667;
				margin-bottom: 30upx;
				background: #fff;
				-webkit-box-shadow: 4upx 4upx 10upx #CCCCCC;
				box-shadow: 4upx 4upx 10upx #CCCCCC;	
				.flex_row{
					 width:calc(100% - 40upx);
					padding: 0 20upx;
					justify-content: space-between;
				}
			}
		}
		.input-name,
		.input-password {
		    height: 80upx;
		    width: 100%;
		    display: flex;
		    flex-direction: row;
		    justify-content: center;
		    align-items: center;
		    position: relative;
		    padding-left: 30upx;
		    box-sizing: border-box;
		}
		.input-name::after {
		    content: " ";
		    position: absolute;
		    left: 30upx;
		    bottom: 0;
		    right: 0;
		    height: 1px;
		    border-top: 1px solid #e5e5e5;
		    transform-origin: 0 0;
		    transform: scaleY(.5);
		}
		.input-name view,
		.input-password view {
		    width: 120upx;
		    height: 50upx;
		    line-height: 50upx;
		    font-size: 28upx;
		    color: #333333;
		}
		
		.input-name input,
		.input-password input {
		    flex: 1;
		    height: 50upx;
		    line-height: 50upx;
		}
	}
</style>
