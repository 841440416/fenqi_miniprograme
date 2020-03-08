<template>
	<view class="content">
		<view class="input-group">
		    <view class="input-row border">
		        <text class="title">姓名：</text>
		        <m-input class="m-input" type="text" clearable focus v-model="userName" placeholder="请输入姓名"></m-input>
		    </view>
		    <view class="input-row border">
		        <text class="title">车牌号：</text>
		        <m-input type="text" clearable focus v-model="chepai" placeholder="请输入车牌号"></m-input>
		    </view>
			<view class="input-row">
			    <text class="title">车架号：</text>
			    <m-input type="text" clearable focus v-model="chejia" placeholder="请输入车架号"></m-input>
			</view>
		</view>
		<view class="btn-row">
		    <button type="primary" class="primary" @tap="bindSubmit">确定</button>
		</view>
	</view>
</template>

<script>
	import mInput from '../../components/m-input/m-input.vue';
	export default {
		components: {
		    mInput
		},
		data() {
			return {
				userName: '',
				chepai: '',
				chejia: '',
			};
		},
		onLoad(option) {
			console.log(option.id)
		},
		methods: {
			bindSubmit(){
				uni.showLoading({
					title: '加载中'
				});
				let _this = this;
				setTimeout(function () {
					uni.hideLoading();
					uni.redirectTo({
						url: `../inquiry/inquiry`
					});
				}, 500);
			}
		}
	}
</script>

<style lang="scss" scoped>
	
</style>
