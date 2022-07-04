<!--
 * @Date: 2022-07-04 09:37:42
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-07-04 16:04:19
 * @Description: 
-->
<template>
	<div class="home">
		<img class="title-bg w100p" src="../assets/image/title-bg.png" />
		<nav class="flex-warp warp">
			<router-link
				tag="div"
				class="nav-item flex-col-center"
				v-for="item in menu"
				:key="item.name"
				:to="item.name"
			>
				<img :src="require(`../assets/icon/${item.icon}.png`)" alt="" />
				<span>{{ item.title }}</span>
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
			return {
				menu: store.state.menu,
			};
		},
		mounted() {},
	};
</script>
<style lang="less" scoped>
	nav {
		transform: translateY(-40rem);
		.nav-item {
			background-color: #fff;
			border-radius: 15rem;
			width: calc(50% - 7.5rem);
			height: 200rem;
			border: 1px solid #cbc6c7;
			margin-bottom: 10rem;
			&:nth-child(odd) {
				margin-right: 10rem;
			}
			span {
				margin-top: 17rem;
			}
		}
	}
</style>
