import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
       
const store = new Vuex.Store({
	state: {
		rootUrl: "https://tlgcapi.zzes1314.cn/api/v1",
		// rootUrl: "http://localhost:7001/api/v1",
		userinfo: false,
		appLaunch: false,
		infos: {},
		/**
		* 是否需要强制登录
		*/
		forcedLogin: true,
		hasLogin: false,
		userName: ""
	},
	mutations: {
		appLaunch(state) {
			state.appLaunch = true
		},
		login(state, userName) {
		    state.userName = userName || '新用户';
		    state.hasLogin = true;
		},
		logout(state) {
		    state.userName = "";
		    state.hasLogin = false;
		},
		SET_INFO (state, status) {
			state.userinfo = status
		},
		SAVE_INFO (state, info) {
			state.infos = info
		}
	},
	actions: {
	}
})

export default store
