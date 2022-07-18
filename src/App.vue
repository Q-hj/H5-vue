<!--
 * @Date: 2022-07-04 09:37:42
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-07-18 14:28:35
 * @Description: 
-->
<template>
	<div id="app">
		<Loading v-show="LOADING"></Loading>
		<router-view />
	</div>
</template>
<script>
	import { mapState } from "vuex";
	import Loading from "@/components/Loading/index.vue";
	export default {
		name: "app",
		components: { Loading },
		computed: {
			...mapState(["LOADING"]),
		},
		data() {
			return {
				clientId: "vGy66er3qfKpXEQddgyDmyXa2RQucgg5",
				sk: "BCDSGS_22e2d810c606df32186709580c4b8b36",
				ak: "BCDSGA_d5e7b25caecebf4a178260c6d27f6e46",
				assetsUrl:
					"https://mapi.zjzwfw.gov.cn/web/mgop/gov-open/zj/2002207318/reserved/index.html?debug=true",
			};
		},
		async mounted() {
			return;
			// JSBridge API 初始化
			ZWJSBridge.onReady(() => {});

			ZWJSBridge.setTitle({
				title: "浙江消防体验场馆预约系统",
			});
			// 埋点初始化
			// bury.init({
			// 	autoTrack: true, //是否打开自动点击事件埋点，默认true打开，关闭传false
			// 	appId: "2002207318", //必传，向埋点系统后台申请
			// 	businessId: "8ec3d75da4ac4a1b90768aad88034a3d", //必传，向埋点系统后台申请
			// });
			// 获取当前是否为 适老版
			const { uiStyle } = await ZWJSBridge.getUiStyle();
			this.$store.commit("set_elder", uiStyle === "elder");

			// 不存在token 则先获取票据 然后进行登录
			if (!this.getStore("token")) this.getTicket();
		},
		methods: {
			// 获取页面路径中携带的票据
			getTicket() {
				var url = window.location.href;

				//false 时，重定向到测试版本 获取票据
				let needLogin = url.indexOf("ticket") < 0;
				// 不存在ticket 则去获取
				// if (needLogin) return this.singleLoginFun();

				// this.singleLoginFun();

				// 存在ticket 则去登录
				const ticket = url.split("=")[2]?.split("#")[0];

				const params = {
					clientId: this.clientId,
					code:
						"8a1189378144481301820fd7b71a27e6-ticket" || ticket.replace("&debug", ""),
				};
				this.post("/mina/token", params).then((res) => {
					this.setStore("token", (res.token_type || "") + (res.access_token || ""));
				});
			},
			// 单点登录
			singleLoginFun() {
				// 判断当前所处环境
				const sUserAgent = window.navigator.userAgent.toLowerCase();
				const isApp = sUserAgent.indexOf("dtdreamweb") > -1; // 浙里办APP
				// const bIsAlipayMini =
				// 	sUserAgent.indexOf("miniprogram") > -1 &&
				// 	sUserAgent.indexOf("alipay") > -1;

				const appHref =
					"https://puser.zjzwfw.gov.cn/sso/mobile.do?action=oauth&scope=1";

				const alimappHref =
					"https://puser.zjzwfw.gov.cn/sso/alipay.do?action=ssoLogin";
				// 不同环境跳转不同路径
				const getTicketUrl = isApp ? appHref : alimappHref;

				window.location.href =
					getTicketUrl + `&servicecode=${this.ak}&redirectUrl=${this.assetsUrl}`;
			},
		},
	};
</script>

<style lang="less">
	#app {
		min-height: 80vh;
		// background-color: #f4f4f4;
	}
</style>
