<template>
    <view class="content">
        <view class="btn-row">
            <button v-if="!hasLogin" type="primary" class="primary" @tap="bindLogin">登录</button>
            <button v-if="hasLogin" type="default" @tap="bindLogout">退出登录</button>
        </view>
    </view>
</template>

<script>
    import {
        mapState,
        mapMutations
    } from 'vuex'

    export default {
        computed: {
            ...mapState(['hasLogin', 'forcedLogin'])
        },
        methods: {
            ...mapMutations(['logout']),
            bindLogin() {
                uni.navigateTo({
                    url: '../login/login',
                });
            },
            bindLogout() {
				let _this = this;
				uni.showModal({
					title: '提示',
					content: '确定退出登录？',
					success: function (res) {
						if (res.confirm) {
							_this.logout();
							/**
							 * 如果需要强制登录跳转回登录页面
							 */
							if (_this.forcedLogin) {
							    uni.reLaunch({
							        url: '../login/login',
							    });
							}
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
            }
        }
    }
</script>

<style>

</style>
