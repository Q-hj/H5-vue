/*
 * @Date: 2022-07-04 09:37:42
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-07-15 15:27:42
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
let sUserAgent = window.navigator.userAgent.toLowerCase();
let bIsDtDreamApp = sUserAgent.indexOf("dtdreamweb") > -1; // 浙里办APP
let bIsAlipayMini =
	sUserAgent.indexOf("miniprogram") > -1 && sUserAgent.indexOf("alipay") > -1; //支付宝浙里办小程序

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount("#app");
