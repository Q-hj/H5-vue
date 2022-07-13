<!--
 * @Date: 2022-07-04 09:37:42
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-07-13 11:25:13
 * @Description: 
-->
<template>
	<div id="app">
		<router-view />
	</div>
</template>
<script>
	export default {
		name: "app",
		data() {
			return {
				sk: "BCDSGS_22e2d810c606df32186709580c4b8b36",
				ak: "BCDSGA_d5e7b25caecebf4a178260c6d27f6e46",
				assetsUrl:
					"https://mapi.zjzwfw.gov.cn/web/mgop/gov-open/zj/2002207318/reserved/index.html?debug=true",
			};
		},
		async mounted() {
			// JSBridge API 初始化
			ZWJSBridge.onReady(() => {});

			// 埋点初始化
			// bury.init({
			// 	autoTrack: true, //是否打开自动点击事件埋点，默认true打开，关闭传false
			// 	appId: "2002207318", //必传，向埋点系统后台申请
			// 	businessId: "8ec3d75da4ac4a1b90768aad88034a3d", //必传，向埋点系统后台申请
			// });
			ZWJSBridge.setTitle({
				title: "浙江消防体验场馆预约系统",
			});
			// 获取当前是否为 适老版
			const { uiStyle } = await ZWJSBridge.getUiStyle();
			this.$store.commit("set_elder", uiStyle === "elder");
			// 获取当前运行环境
			// let sUserAgent = window.navigator.userAgent.toLowerCase();

			// this.bIsDtDreamApp = sUserAgent.indexOf("dtdreamweb") > -1; // 浙里办APP
			// this.bIsAlipayMini =
			// 	sUserAgent.indexOf("miniprogram") > -1 && sUserAgent.indexOf("alipay") > -1; //支付宝浙里办小程序

			// this.init();
			this.getTicket();
		},
		methods: {
			getTicket() {
				var url = window.location.href; // 获取页面路由
				console.log(url);
				if (url.indexOf("ticket") != -1) {
					this.ticket = url.split("=")[2].split("#")[0];
				}
				//如果有票据的话那么进行获取个人信息操作，如果没有的话那么进行登录
				if (this.ticket) {
					console.log("ticket");
					console.log(this.ticket);
					// this.getZLBuserInfo();
				} else {
					// 先登录 判断当前所处环境
					this.loginFun();
				}
			},
			loginFun() {
				const sUserAgent = window.navigator.userAgent.toLowerCase();
				const bIsDtDreamApp = sUserAgent.indexOf("dtdreamweb") > -1; // 浙里办APP
				const bIsAlipayMini =
					sUserAgent.indexOf("miniprogram") > -1 &&
					sUserAgent.indexOf("alipay") > -1;
				if (bIsDtDreamApp) {
					const app = `https://puser.zjzwfw.gov.cn/sso/mobile.do?action=oauth&scope=1&servicecode=${this.ak}&redirectUrl=${this.assetsUrl}`;
					// console.log(app);
					window.location.href = app;
				} else {
					window.location.href = `https://puser.zjzwfw.gov.cn/sso/alipay.do?action=ssoLogin&servicecode=${this.ak}&redirectUrl=${this.assetsUrl}`;
				}

				// if (this.bIsDtDreamApp) {
				// 	window.location.replace(
				// 		`https://puser.zjzwfw.gov.cn/sso/mobile.do?action=oauth&scope=1&servicecode=${this.sk}&redirectUrl=${this.assetsUrl}`
				// 	);
				// } else if (this.bIsAlipayMini) {
				// 	window.location.replace(
				// 		`https://puser.zjzwfw.gov.cn/sso/alipay.do?action=ssoLogin&servicecode=${this.sk}&redirectUrl=${this.assetsUrl}`
				// 	);
				// }
			},
			init() {
				this.sUserAgent = window.navigator.userAgent.toLowerCase();
				this.bIsDtDreamApp = this.sUserAgent.indexOf("dtdreamweb") > -1; // 浙里办APP
				this.bIsAlipayMini =
					this.sUserAgent.indexOf("miniprogram") > -1 &&
					this.sUserAgent.indexOf("alipay") > -1;
				console.log(this.getQuery("ticket"));
				if (this.getQuery("ticket") == null && this.ticket == "") {
					// uni.showLoading({
					// 	title: "登录中",
					// 	mask: true,
					// });
					if (this.bIsAlipayMini) {
						this.watchApply();
					} else {
						this.watchApp();
					}
				} else {
					this.ticket = this.getQuery("ticket");
					console.log(this.ticket);
					// uni.reLaunch({
					// 	url: `./index?ticket=${this.ticket}`,
					// });
				}
			},
			// 浙里办APP判断页面进入状态
			watchApp() {
				window.onpageshow = (event) => {
					if (
						event.persisted ||
						(window.performance && window.performance.navigation.type == 2)
					) {
						ZWJSBridge.close();
					}
					this.isLoad();
				};
			},
			// 支付宝浙里办小程序判断页面进入状态
			watchApply() {
				window.onpageshow = (event) => {
					if (
						event.persisted ||
						(window.performance &&
							(window.performance.navigation.type == 1 ||
								window.performance.navigation.type == 0))
					) {
						this.isLoad();
					} else {
						my.navigateBack();
					}
				};
			},
			isLoad() {
				// if (this.bIsDtDreamApp) {
				// 	window.location.replace(
				// 		`https://puser.zjzwfw.gov.cn/sso/mobile.do?action=oauth&scope=1&servicecode=${this.sk}&redirectUrl=${this.assetsUrl}`
				// 	);
				// } else if (this.bIsAlipayMini) {
				// 	window.location.replace(
				// 		`https://puser.zjzwfw.gov.cn/sso/alipay.do?action=ssoLogin&servicecode=${this.sk}&redirectUrl=${this.assetsUrl}`
				// 	);
				// }
				// console.log("跳转了", this.bIsAlipayMini);
				if (this.bIsAlipayMini) {
					window.location.href = `https://puser.zjzwfw.gov.cn/sso/alipay.do?action=ssoLogin&servicecode=${this.sk}&redirectUrl=${this.assetsUrl}`;
				} else {
					window.location.href = `https://puser.zjzwfw.gov.cn/sso/mobile.do?action=oauth&scope=1&servicecode=${this.sk}&redirectUrl=${this.assetsUrl}`;
				}
			},
			getQuery(name) {
				let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
				let r = window.location.search.substr(1).match(reg);
				if (r != null) {
					console.log("ticket", r);
					return unescape(r[2]);
				}
				return null;
			},
		},
	};
</script>

<style lang="less">
	#app {
		// background-color: #f4f4f4;
	}
</style>
