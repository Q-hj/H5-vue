<!--
 * @Date: 2022-07-18 11:42:02
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-07-18 13:49:19
 * @Description: loading组件
-->
<template>
	<div class="loading fixed w100p h100p flex-center">
		<!-- <van-loading color="#06427e" /> -->
		<van-loading type="spinner" color="#06427e" />
	</div>
</template>

<script>
	export default {
		name: "LOADING",
		data() {
			return {};
		},
	};
</script>
<style lang="less" scoped>
	.loading {
		background: rgba(255, 255, 255, 0.5);
		z-index: 9999;
	}
	.van-loading {
		transform: scale(1.5);
	}
</style>
