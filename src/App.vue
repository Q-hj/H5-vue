<!--
 * @Date: 2022-07-04 09:37:42
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-07-11 10:45:45
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
			const { uiStyle } = await ZWJSBridge.getUiStyle();
			this.$store.commit("set_elder", true || uiStyle === "elder");
		},
	};
</script>

<style lang="less">
	#app {
		// background-color: #f4f4f4;
	}
</style>
