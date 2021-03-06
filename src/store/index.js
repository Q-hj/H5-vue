/*
 * @Date: 2022-07-04 09:37:42
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-07-18 11:41:19
 * @Description: 全局状态
 */
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		menu: [
			{ name: "Visit", title: "参观预约", icon: "Visit" },
			{ name: "Video", title: "消防视频", icon: "Video" },
			{ name: "History", title: "历史记录", icon: "History" },
		],
		elder: false,
		LOADING: false,
	},
	getters: {
		elder: (state) => state.elder,
	},
	mutations: {
		set_elder(state, elder) {
			state.elder = elder;
		},
		showLoading(state) {
			state.LOADING = true;
		},
		hideLoading(state) {
			state.LOADING = false;
		},
	},
	actions: {},
	modules: {},
});
