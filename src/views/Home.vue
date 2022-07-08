<!--
 * @Date: 2022-07-04 09:37:42
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-07-08 17:26:34
 * @Description: 
-->
<template>
	<div class="home">
		<van-popup class="w70p" v-model="showPop"
			><img class="w100p" src="../assets/image/index-pop.png" alt=""
		/></van-popup>

		<img class="title-bg w100p" src="../assets/image/title-bg.png" />
		<nav class="flex-center">
			<router-link
				tag="div"
				class="nav-item w-100 h-100 flex-col-center bc-white brs-15 border-light"
				v-for="item in menu"
				:key="item.name"
				:to="item.name"
			>
				<img :src="require(`../assets/icon/${item.icon}.png`)" alt="" />
				<span class="m-t-10">{{ item.title }}</span>
			</router-link>
		</nav>
		<p class="abs bottom-30 tac w100p c-light">版权所有 浙江省消防救援总队</p>
	</div>
</template>

<script>
	import store from "@/store/index";
	export default {
		name: "Home",
		components: {},
		data() {
			return { showPop: false, menu: store.state.menu };
		},
		mounted() {},
	};
</script>
<style lang="less" scoped>
	nav {
		transform: translateY(-40rem);
	}
</style>
