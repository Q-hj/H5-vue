<template>
	<div class="visit-detail">
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
			<main class=" ">
				<van-row class="top p-20 bc-white brs-10">
					<van-col
						class="p-15-0"
						span="12"
						v-for="item in visitLabelProps.slice(0, 5)"
						:key="item.bind"
						><p>{{ item.label }}</p>
						<span class="">{{ detail[item.bind] }}</span>
					</van-col>
					<van-col class="p-15-0" span="12">
						<img
							class="w-60"
							:src="
								require(`../assets/image/${detail.status ? 'success' : 'fail'}.png`)
							"
							alt=""
						/>
					</van-col>
				</van-row>

				<van-row class="p-20 bc-white brs-10 m-t-15">
					<van-col
						class="p-15-0"
						span="12"
						v-for="item in visitLabelProps.slice(5)"
						:key="item.bind"
						><p>{{ item.label }}</p>
						<span class="">{{ detail[item.bind] }}</span>
					</van-col>
				</van-row>
			</main>
			<footer class="m-t-80 flex-center">
				<img src="../assets/image/bg-image.png" alt="" />
			</footer>
		</div>
	</div>
</template>

<script>
	import { fommatDate } from "@/utils/date";
	export default {
		data() {
			return {
				detail: {},
				currentIndex: null,
				visitLabelProps: [
					{ label: "参观预约ID", bind: "id" },
					{ label: "参观场所", bind: "fireBrigadeName" },
					{ label: "参观时间", bind: "visitTime" },
					{ label: "参观团名称", bind: "groupName" },
					{ label: "参观人数", bind: "number" },
					{ label: "联系人名称", bind: "contactName" },
					{ label: "联系电话", bind: "contactNumber" },
				],
			};
		},
		watch: {
			currentIndex(index) {
				this.$router.push({
					path: "/History",
					query: { index },
				});
			},
		},
		created() {
			const id = +this.$route.query.id;
			this.get("/fireVisitAPPT/infoById", { id }).then((res) => {
				this.detail = {
					...res,
					visitTime: fommatDate(res.eventTime) + " " + res.visitTime.slice(0, 5),
				};
			});
		},
		mounted() {
			// ZWJSBridge.setTitle({
			// 	title: "预约详情",
			// });
		},
		methods: {
			handleChange(index) {
				this.currentIndex = index;
			},
		},
	};
</script>

<style lang="less" scpoed>
	.visit-detail {
		height: 100vh;
		background-color: #f4f4f4;
		nav {
			transform: translateY(20rem);
		}
		main {
			transform: translateY(40rem);
			.van-col.top {
				border-bottom: 1px solid #e9e9e9;
				&:last-child {
					border-width: 0;
				}
			}
			p {
				color: #ababab;
				line-height: 40rem;
			}
		}
	}
</style>
