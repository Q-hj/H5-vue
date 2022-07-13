<!--
 * @Date: 2022-07-04 09:37:42
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-07-13 11:22:27
 * @Description: 
-->
<template>
	<div class="home">
		<van-popup class="w70p bc-blue" v-model="showPop">
			<div class="pop p-30">
				<header class="c-white">预约须知</header>
				<main class="c-white">
					<p>
						为了保证您的健康安全，请您在进行场馆预约的过程中，确认您所报名的群体已经做好新冠肺炎的防控工作。
					</p>
					<p>
						预约成功后，请在预约时间段佩戴口罩前往，并配合所参观的场馆做好新冠肺炎防控工作（准备好健康码和行程码)，有序参观。
					</p>
					<p>
						如遇到紧急情况，请积极配合工作人员安排。如拒不配合，危害到他人生命安全，工作人员有权追究其法律责任。
					</p>
				</main>
				<footer
					@click="showPop = false"
					class="w100p h-40 brs-40 flex-center pointer c-white border-white m-t-10"
				>
					<van-icon name="success" />
					<span class="m-l-5">我知道了</span>
				</footer>
			</div>
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
			console.log(this.elder ? "适老化" : "常规ui");
			console.log(window.location.href);
		},
	};
</script>
<style lang="less" scoped>
	.pop {
		main {
			p {
				margin-top: 10rem;
			}
		}
	}
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
