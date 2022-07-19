<!--
 * @Date: 2022-07-04 09:37:42
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-07-18 17:45:15
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
			return {};
		},
		async mounted() {
			// JSBridge API 初始化
			ZWJSBridge.onReady(() => {});

			console.log(window.isOlder ? "适老化模式" : "常规ui");
			ZWJSBridge.setTitle({
				title: "消防体验场馆预约",
			});
			// 埋点初始化
			// bury.init({
			// 	autoTrack: true, //是否打开自动点击事件埋点，默认true打开，关闭传false
			// 	appId: "2002207318", //必传，向埋点系统后台申请
			// 	businessId: "8ec3d75da4ac4a1b90768aad88034a3d", //必传，向埋点系统后台申请
			// });

			// 获取当前是否为 适老版
			// const { uiStyle } = await ZWJSBridge.getUiStyle();
			// this.$store.commit("set_elder", uiStyle === "elder");
		},
		methods: {},
	};
</script>

<style lang="less">
	#app {
		min-height: 80vh;
		// background-color: #f4f4f4;
	}
</style>
