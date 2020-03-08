<template>
	<view class="content">
		<!-- 轮播图 -->
		<swiper style="height: 466upx;" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
			<swiper-item v-for="item in itemList" :key="item">
				<image class="banner-img" :src="item"></image>
			</swiper-item>
		</swiper>
		<!-- 列表 -->
		<view class="lists flex_row">
			<view v-for="(v, i) in listData" :key="i" @click="go(v.path)" class="lists-item flex_column">
				<text class="iconfont" v-if="v.path == 'vehicle'">&#xe622;</text>
				<text class="iconfont" v-if="v.path == 'inquiry'">&#xe6a3;</text>
				<text class="iconfont" v-if="v.path == 'insurance'">&#xe641;</text>
				<text class="iconfont" v-if="v.path == 'repayment'">&#xe600;</text>
				<view class="list-name">{{v.name}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	export default {
		data() {
			return {
				itemList: ['../../static/images/banner1.jpg','../../static/images/banner2.jpg'],
				indicatorDots: false,
				autoplay: false,
				interval: 5000,
				duration: 1000,
				listData: [
					{path:'inquiry',name:'车辆管理'},
					{path:'vehicle',name:'询价管理'},
					{path:'insurance',name:'保险管理'},
					{path:'repayment',name:'还款查询'}
				]
			}
		},
		computed: mapState(['forcedLogin', 'hasLogin', 'userName']),
		onLoad() {
		    if (!this.hasLogin) {
		        uni.showModal({
		            title: '未登录',
		            content: '您未登录，需要登录后才能继续',
		            /**
		             * 如果需要强制登录，不显示取消按钮
		             */
		            showCancel: !this.forcedLogin,
		            success: (res) => {
		                if (res.confirm) {
							/**
							 * 如果需要强制登录，使用reLaunch方式
							 */
		                    if (this.forcedLogin) {
		                        uni.reLaunch({
		                            url: '../login/login'
		                        });
		                    } else {
		                        uni.navigateTo({
		                            url: '../login/login'
		                        });
		                    }
		                }
		            }
		        });
		    };
			uni.startPullDownRefresh();
		},
		onPullDownRefresh() {
			setTimeout(function () {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onShareAppMessage() {
			return {
				title: '上海存德车贷首页',
				path: '/pages/home/home'
			}
		},
		mounted() {
			// this.getIronList()
		},
		methods: {
			/**
			 * 跳转对应页面
			 */
			go(path) {
				uni.navigateTo({
					url: `/pages/${path}/${path}`
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		width: 100%;
		text-align: center;
		font-size: 24upx;
		padding: 0;
		swiper{
			image{
				width: 100%;
			}
		}
		.lists{
			margin-top: 40upx;
			padding: 0 20upx;
			.lists-item{
				width: 25%;
				height: 120upx;
				background: #fff;
				margin-right: 10upx;
				.iconfont{
					font-size: 48upx;
				}
			}
			.lists-item:last-child{
				margin: 0;
			}
		}
	}
</style>
