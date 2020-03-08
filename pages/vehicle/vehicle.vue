<template>
	<view class="content">
		<view class="bar flex_row">
			<view class="search flex_row">
				<input confirm-type="search" @confirm="search" type="text" placeholder="请输入车牌号/车架号" placeholder-style="color:rgba(255,255,255,.8)"/>
				<view class="search-btn" @click="search">查询</view>
				<view style="position: absolute;left: 30upx;">
					<uniIcon type="search" size="26" color="#fff"></uniIcon>
				</view>
			</view>
		</view>
		<view class="input-group">
			<view class="input-row border">
                <text class="title">车牌号：</text>
                <m-input type="text" focus clearable v-model="chepai" placeholder="请输入账号"></m-input>
            </view>
            <view class="input-row border">
                <text class="title">车架号：</text>
                <m-input type="text" displayable v-model="chejia" placeholder="请输入密码"></m-input>
            </view>
            <view class="input-row">
                <text class="title">车主姓名：</text>
                <m-input type="text" displayable v-model="name" placeholder="请确认密码"></m-input>
            </view>
			<view class="input-row flex_row">
				<text class="title">上传行驶证：</text>
				<text style="width:50%">32048119456787</text>
				<text class="iconfont">&#xe610;</text>
			</view>
			<view class="input-row">
                <text class="title">选择险种：</text>
				<view class="flex_row">
                    <picker @change="bindPickerChange" :value="index" :range="array">
                        <view style="margin-left: 10upx;">{{array[index]}}</view>
                    </picker>
                </view>
				</select>
            </view>
			<!-- checkbox -->
			<view class="uni-list">
				<checkbox-group @change="checkboxChange">
					<label class="uni-list-cell uni-list-cell-pd" v-for="item in items" :key="item.value">
						<view>
							<checkbox :value="item.value" :checked="item.checked" />
						</view>
						<view>{{item.name}}</view>
					</label>
				</checkbox-group>
			</view>
		</view>
		<view class="btn-row">
            <button type="primary" class="primary" @tap="submit">提交</button>
        </view>
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
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	import mInput from '@/components/m-input/m-input.vue';
	import neilModal from '@/components/neil-modal/neil-modal.vue';
	
	export default {
		components: {
			uniIcon,
			mInput,
			neilModal
		},
		data() {
			return {
				imgSrc: '../../static/images/',
				loading: false,
				show: false,
				title: '询价管理',
				chepai:'',
				chejia:'',
				name:'',
				array: ['中国人民保险', '中国人寿保险', '太平洋保险'],
				index: 0,
				 items: [{
                        value: '1',
                        name: '交强险'
                    },
                    {
                        value: '2',
                        name: '机动车损失险',
                        checked: 'true'
                    },
                    {
                        value: '3',
                        name: '盗抢险'
                    },
                    {
                        value: '4',
                        name: '第三种责任险50万'
                    },
                    {
                        value: '5',
                        name: '第三种责任险100万'
                    },
                    {
                        value: '6',
                        name: '第三种责任险150万'
                    }
                ]
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
			checkboxChange: function (e) {
                var items = this.items,
                    values = e.detail.value;
                for (var i = 0, lenI = items.length; i < lenI; ++i) {
                    const item = items[i]
                    if(values.includes(item.value)){
                        this.$set(item,'checked',true)
                    }else{
                        this.$set(item,'checked',false)
                    }
                }
            },
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
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
			submit(){
				
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
				line-height: 76upx;
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
				.search-btn{
					width: 68upx;
					margin-left: 20upx;
				}
			}
		}
		.input-group{
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
		.uni-list{
			padding: 0 30upx 30upx 30upx;
			.uni-list-cell {
				justify-content: flex-start
			}
		}
	}
</style>
