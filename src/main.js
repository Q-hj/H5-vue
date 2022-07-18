/*
 * @Date: 2022-07-04 09:37:42
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-07-18 16:51:54
 * @Description: 入口文件
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./utils/index";
import "./style/include.less";
// import "./style/index";
import VConsole from "vconsole";
// new VConsole();
Vue.config.productionTip = false;

// 获取当前ui模式，再实例化vue
ZWJSBridge.getUiStyle()
	.then(({ uiStyle }) => {
		window.isOlder = uiStyle == "elder";
		new Vue({
			router,
			store,
			render: (h) => h(App),
		}).$mount("#app");
	})
	.catch((err) => {
		console.log(err);
	});
