<!--
 * @Date: 2022-07-04 09:37:42
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-07-11 11:39:52
 * @Description: 
-->
<template>
	<div class="home">
		<van-popup class="w70p" v-model="showPop">
			<!-- <img class="w100p" src="../assets/image/index-pop.png" alt=""
		/> -->
		</van-popup>

		<img class="title-bg w100p" src="../assets/image/title-bg.png" />
		<nav class="" :class="elder ? 'flex-warp' : 'translateY flex-center'">
			<!-- 抽离两种ui模式下公共的样式 -->
			<router-link
				tag="div"
				class="nav-item m-5 brs-15"
				:class="
					elder
						? 'color-item flex-center w80p h-90 m-l-10p '
						: 'w-100 h-100 flex-col-center bc-white border-light'
				"
				v-for="item in menu"
				:key="item.name"
				:to="item.name"
			>
				<img
					:src="require(`../assets/icon/${item.icon}${elder ? '-o' : ''}.png`)"
					alt=""
				/>
				<span :class="elder ? 'fz-30 c-white m-l-10' : 'm-t-10'">{{
					item.title
				}}</span>
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
				showPop: false,
				menu: store.state.menu,
				elder: store.state.elder,
			};
		},
		mounted() {
			console.log(this.elder);
		},
	};
</script>
<style lang="less" scoped>
	.translateY {
		transform: translateY(-40rem);
	}
	.color-item {
		&:nth-child(1) {
			background: linear-gradient(90deg, #67c2ef, #21a8ea);
		}
		&:nth-child(2) {
			background: linear-gradient(90deg, #fccd59, #eb7f25);
		}
		&:nth-child(3) {
			background: linear-gradient(90deg, #f8868e, #f25d87);
		}
		&:nth-child(4) {
			background: linear-gradient(90deg, #86f4f8, #5df29e);
		}
	}
</style>
