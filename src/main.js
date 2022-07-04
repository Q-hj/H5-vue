/*
 * @Date: 2022-07-04 09:37:42
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-07-04 15:05:00
 * @Description: 入口文件
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./utils/index";
import "./style/include.less";
// import "./style/index";

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount("#app");
