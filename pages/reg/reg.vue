<template>
    <view class="content">
        <view class="input-group">
            <view class="input-row border">
                <text class="title">用户名：</text>
                <m-input type="text" focus clearable v-model="account" placeholder="请输入账号"></m-input>
            </view>
            <view class="input-row border">
                <text class="title">密码：</text>
                <m-input type="password" displayable v-model="password" placeholder="请输入密码"></m-input>
            </view>
            <view class="input-row">
                <text class="title">确认密码：</text>
                <m-input type="password" displayable v-model="repassword" placeholder="请确认密码"></m-input>
            </view>
			<view class="input-row">
                <text class="title">客户类型：</text>
				<view class="flex_row">
                    <picker @change="bindPickerChange" :value="index" :range="array">
                        <view style="margin-left: 10upx;">{{array[index]}}</view>
                    </picker>
                </view>
				</select>
            </view>
			<!-- 企业 -->
			<view v-if="index == 1">
				<view class="input-row border">
					<text class="title">企业名称：</text>
					<m-input type="text" clearable v-model="company" placeholder="请输入企业名称"></m-input>
				</view>
				<view class="input-row border">
					<text class="title">组织机构代码：</text>
					<m-input type="text" clearable v-model="code" placeholder="请输入组织机构代码"></m-input>
				</view>
				<view class="input-row flex_row">
					<text class="title">上传营业执照：</text>
					<text style="width:50%">uk2345</text>
					<text class="iconfont">&#xe610;</text>
				</view>
			</view>
			
			<!-- 个人 -->
			<view v-else>
				<view class="input-row border">
					<text class="title">客户姓名：</text>
					<m-input type="text" clearable v-model="name" placeholder="请输入客户姓名"></m-input>
				</view>
				<view class="input-row border">
					<text class="title">身份证：</text>
					<m-input type="text" clearable v-model="idCard" placeholder="请输入身份证"></m-input>
				</view>
				<view class="input-row flex_row">
					<text class="title">上传身份证：</text>
					<text style="width:50%">32048119456787</text>
					<text class="iconfont">&#xe610;</text>
				</view>
			</view>
			
			<view class="input-row border">
                <text class="title">手机号：</text>
                <m-input type="tel" clearable v-model="phone" placeholder="请输入手机号"></m-input>
            </view>
			<view class="input-row border">
                <text class="title">电子邮箱：</text>
                <m-input type="text" clearable v-model="email" placeholder="请输入电子邮箱"></m-input>
            </view>
			<view class="input-row border">
                <text class="title">邮寄地址：</text>
                <m-input type="text" clearable v-model="address" placeholder="请输入邮寄地址"></m-input>
            </view>
        </view>
        <view class="btn-row">
            <button type="primary" class="primary" @tap="register">注册</button>
        </view>
    </view>
</template>

<script>
    import service from '../../service.js';
    import mInput from '@/components/m-input/m-input.vue';

    export default {
        components: {
            mInput
        },
        data() {
            return {
                account: '', //账号
                password: '', //密码
				repassword: '', //确认密码
				name:'', //用户姓名
				company:'', //企业名
				code: '', //组织机构代码
				idCard:'', //身份证
				phone:'', //手机号
                email: '', //电子邮件
				address:'', //收件地址
				array: ['个人用户', '企业用户'],
				index: 0,
            }
        },
        methods: {
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
			},
            register() {
                /**
                 * 客户端对账号信息进行一些必要的校验。
                 * 实际开发中，根据业务需要进行处理，这里仅做示例。
                 */
				uni.showToast({
                    title: '注册成功'
                });
                // uni.navigateBack({
                //     delta: 1
                // });
				uni.reLaunch({
					url: '../login/login',
                });
                if (this.account.length < 5) {
                    uni.showToast({
                        icon: 'none',
                        title: '账号最短为 5 个字符'
                    });
                    return;
                }
                if (this.password.length < 6) {
                    uni.showToast({
                        icon: 'none',
                        title: '密码最短为 6 个字符'
                    });
                    return;
                }
                if (this.email.length < 3 || !~this.email.indexOf('@')) {
                    uni.showToast({
                        icon: 'none',
                        title: '邮箱地址不合法'
                    });
                    return;
                }

                const data = {
                    account: this.account,
                    password: this.password,
                    email: this.email
                }
                service.addUser(data);
                uni.showToast({
                    title: '注册成功'
                });
                uni.navigateBack({
                    delta: 1
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
	.content{
		.input-row {
			.title{
				width: 32%;
			}
			.iconfont{
				font-size: 48upx;
				margin-right: 20upx;
			}
		}
	}
</style>
