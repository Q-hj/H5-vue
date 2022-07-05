<!--
 * @Date: 2022-07-04 14:10:36
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-07-05 14:45:19
 * @Description: 历史记录
-->
<template>
	<div class="history">
		<div class="warp">
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
			<div class="visit-list" v-show="!currentIndex">
				<div class="flex-center" v-show="!visitList.length">
					<img src="@/assets/icon/down.png" alt="" />
					<span class="c-light">下面没有了</span>
				</div>
				<div
					class="list-item flex-sb-ac m-b-10 p-10 bc-white brs-10"
					v-for="(item, index) in visitList"
					:key="index"
				>
					<div class="left flex-ac">
						<img class="p-10 w-30" src="@/assets/icon/location.png" alt="" />
						<div class="text">
							<p class="m-b-10">{{ item.name }}</p>
							<span class="c-light">{{ item.time }}</span>
						</div>
					</div>
					<img
						class="w-60"
						:src="require(`@/assets/image/${item.status ? 'fail' : 'success'}.png`)"
						alt=""
					/>
				</div>
			</div>
			<div class="evaluate-list" v-show="currentIndex">
				<div class="flex-center" v-show="!evaluateList.length">
					<img src="@/assets/icon/down.png" alt="" />
					<span class="c-light">下面没有了</span>
				</div>
				<div
					class="list-item m-b-20 p-20 bc-white brs-10"
					v-for="(item, index) in evaluateList"
					:key="index"
				>
					<header class="flex-sb-ac">
						<div class="left flex-ac">
							<img class="p-10 w-30" src="@/assets/icon/location.png" alt="" />
							<div class="text">
								<p class="m-b-10">{{ item.name }}</p>
								<span class="c-light">三天前评价</span>
							</div>
						</div>
						<img
							class="w-35"
							@click="handleLocation(item)"
							src="@/assets/icon/position.png"
							alt=""
						/>
					</header>
					<main class="m-t-30">
						<p>
							城市综合体微型消防站战斗力水平评估研究分析了影响城市综合体微型消防站战斗力的具体因素
						</p>
						<div class="imgs flex-sb flex-warp">
							<img
								v-for="item in 1"
								:key="item"
								class="w30p m-b-10"
								src="@/assets/icon/position.png"
								alt=""
							/>
						</div>
					</main>
					<footer class="flex-sb-ac">
						<p class="c-light">943次浏览</p>
						<ul class="flex">
							<li class="m-l-10 c-light" @click="onShare">
								<van-icon name="share-o" />
								<span class="m-l-5">分享</span>
							</li>
							<li class="m-l-10 c-light" @click="onThumb">
								<van-icon name="thumb-circle-o" />
								<span class="m-l-5">545</span>
							</li>
							<li class="m-l-10 c-light" @click="onComment">
								<van-icon name="chat-o" />
								<span class="m-l-5">45</span>
							</li>
						</ul>
					</footer>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import store from "@/store/index";
	export default {
		components: {},
		data() {
			return {
				currentIndex: null,
				visitList: [],
				evaluateList: [],
			};
		},
		watch: {
			currentIndex(index) {
				const result = new Array(8).fill({
					name: "西湖站",
					time: "2022-7-03 12:00",
					status: 0,
				});
				if (index) this.evaluateList = result;
				else this.visitList = result;
			},
		},
		created() {
			this.currentIndex = 0;
		},
		mounted() {},
		methods: {
			handleChange(index) {
				this.currentIndex = index;
			},
			handleLocation(item) {
				console.log(item);
			},
			onShare() {},
			onThumb() {},
			onComment() {},
		},
	};
</script>
<style lang="less" scoped>
	.history {
		height: 100vh;
		background-color: #f4f4f4;
		nav {
			transform: translateY(20rem);
		}
		.visit-list,
		.evaluate-list {
			transform: translateY(40rem);
		}
	}
</style>
