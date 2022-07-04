<!--
 * @Date: 2022-07-04 14:10:36
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-07-04 17:42:28
 * @Description: 历史记录
-->
<template>
	<div class="history">
		<nav class="flex-center t-20 w100p brs-15 bc-white">
			<div
				@click="handleChange(i)"
				class="nav-item w50p flex-center h-30 brs-15 c-light trs"
				:class="currentIndex == i ? ['bc-blue', 'c-white'] : 'bc-white'"
				v-for="(item, i) in ['参观预约历史', '参观评价记录']"
				:key="i"
			>
				<img :src="require(`@/assets/icon/history-${i}.png`)" alt="" />
				<span class="m-5">{{ item }}</span>
			</div>
		</nav>
		<div class="flex-center">
			<img src="@/assets/icon/down.png" alt="" />
			<span class="c-light">下面没有了</span>
		</div>
		<div class="history-list">
			<div class="list-item"></div>
		</div>
	</div>
</template>

<script>
	import store from "@/store/index";
	export default {
		components: {},
		data() {
			return {
				currentIndex: 0,
			};
		},
		mounted() {},
		methods: {
			handleChange(index) {
				this.currentIndex = index;
			},
		},
	};
</script>
<style lang="less" scoped>
	.history {
		height: 100vh;
		background-color: #f4f4f4;
	}
</style>
