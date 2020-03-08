<template>
    <view class="content">
		<view class="mask" v-if="showModal">
			<view class="tip flex_column">
				<text>提示</text>
				<view>微信授权</view>
				<button open-type="getUserInfo" @getuserinfo="wxGetUserInfo" withCredentials="true">确定</button>
			</view>
		</view>
        <view class="input-group">
            <view class="input-row border">
                <text class="title">账号：</text>
                <m-input class="m-input" type="text" clearable v-model="account" placeholder="请输入账号"></m-input>
            </view>
            <view class="input-row">
                <text class="title">密码：</text>
                <m-input type="password" displayable v-model="password" placeholder="请输入密码"></m-input>
            </view>
        </view>
        <view class="btn-row">
			<button type="primary" @tap="bindLogin">登录</button>
        </view>
        <view class="action-row">
            <navigator url="../reg/reg">注册账号</navigator>
            <text>|</text>
            <navigator url="../pwd/pwd">忘记密码</navigator>
        </view>
    </view>
</template>

<script>
    import service from '../../service.js';
    import {
        mapState,
        mapMutations
    } from 'vuex';
    import mInput from '../../components/m-input/m-input.vue';

    export default {
        components: {
            mInput
        },
        data() {
            return {
                providerList: [],
                hasProvider: false,
                account: '',
                password: '',
				showModal: false
            }
        },
        computed: mapState(['forcedLogin']),
        methods: {
            ...mapMutations(['login','appLaunch']),
			wxGetUserInfo(res) {
				this.showModal = false;
				if (res.detail.iv) {
					console.log(`微信授权登录成功`);
					uni.getProvider({
						service: 'oauth',
						success: function(res) {
							console.log(`当前登录环境为${res.provider}`);
							//支持微信、qq和微博等
							if (~res.provider.indexOf('weixin')) {
								uni.login({
									provider: 'weixin',
									success: function(loginRes) {
										console.log('-------获取openid(unionid)-----');
										console.log(JSON.stringify(loginRes));
										// 获取用户信息
										uni.getUserInfo({
											provider: 'weixin',
											success: function(infoRes) {
												console.log('-------获取微信用户所有-----');
												console.log(JSON.stringify(infoRes.userInfo));
											}
										});
									}
								});
							}
						}
					});
				}else {
					uni.showToast({
						title: "您取消了授权,登录失败",
						icon: "none"
					});
					return false;
				}
			},
            bindLogin() {
                /**
                 * 客户端对账号信息进行一些必要的校验。
                 * 实际开发中，根据业务需要进行处理，这里仅做示例。
                 */
                // if (this.account.length < 5) {
                //     uni.showToast({
                //         icon: 'none',
                //         title: '账号最短为 5 个字符'
                //     });
                //     return;
                // }
                // if (this.password.length < 6) {
                //     uni.showToast({
                //         icon: 'none',
                //         title: '密码最短为 6 个字符'
                //     });
                //     return;
                // }
                /**
                 * 下面简单模拟下服务端的处理
                 * 检测用户账号密码是否在已注册的用户列表中
                 * 实际开发中，使用 uni.request 将账号信息发送至服务端，客户端在回调函数中获取结果信息。
                 */
                const data = {
                    account: this.account,
                    password: this.password
                };
                const validUser = service.getUsers().some(function (user) {
                    return data.account === user.account && data.password === user.password;
                });
                if (validUser) {
					uni.showLoading({
						title: '加载中'
					});
					let _this = this;
					setTimeout(function () {
						uni.hideLoading();
						_this.toHome(this.account);
					}, 500);
                } else {
                    // uni.showToast({
                    //     icon: 'none',
                    //     title: '用户账号或密码不正确',
                    // });
					uni.showLoading({
						title: '加载中'
					});
					let _this = this;
					setTimeout(function () {
						uni.hideLoading();
						_this.toHome(this.account);
					}, 500);
                }
            },
            toHome(userName) {
                this.login(userName);
                /**
                 * 强制登录时使用reLaunch方式跳转过来
                 * 返回首页也使用reLaunch方式
                 */
                if (this.forcedLogin) {
                    uni.reLaunch({
                        url: '../home/home',
                    });
                } else {
                    uni.navigateBack();
                }

            }
        },
        onReady() {
			console.log(`页面初次渲染完成`);
			console.log(this.$store.state.appLaunch)
			let _this = this
			uni.getProvider({
				service: 'oauth',
				success: function(res) {
					console.log(res)
					console.log(`当前登录环境为${res.provider}`);
					//支持微信、qq和微博等
					if (~res.provider.indexOf('weixin') && _this.$store.state.appLaunch) {
						_this.showModal = true;
						_this.$store.state.appLaunch = false;
					}
				}
			});
        }
    }
</script>

<style>
    .action-row {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    .action-row navigator {
        color: #007aff;
        padding: 0 20upx;
    }

    .oauth-row {
        display: flex;
        flex-direction: row;
        justify-content: center;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
    }
	.mask{
		position: fixed;
		z-index: 999;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		background: rgba(0,0,0,.6);
	}
	
	.tip{
		position: fixed;
		z-index: 999;
		width: 70%;
		height: 25%;
		top: 50%;
		left: 50%;
		-webkit-transform: translate(-50%,-50%);
		transform: translate(-50%,-50%);
		background-color: #fff;
		text-align: center;
		border-radius: 10upx;
		overflow: hidden;
		justify-content: space-between;
	}
	
	.tip>text{
		display: block;
		width: 100%;
		height: 80upx;
		line-height: 80upx;
		font-size: 38upx;
		font-weight: bold;
	}
	
	.tip>button{
		width: 100%;
		background-color: #fff;
		color: #007AFF;
	}
</style>
