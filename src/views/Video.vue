<!--
 * @Date: 2022-07-04 14:10:37
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-07-19 17:08:14
 * @Description: 视频
-->
<template>
	<div class="Video warp">
		<van-tabs
			v-model="currentType"
			color="#06427e"
			sticky
			swipeable
			animated
			line-width="80px"
			:ellipsis="false"
		>
			<van-tab v-for="item in videoType" :title="item.description" :key="item.id">
				<p class="tac m-t-20 c-gray" v-if="!videoList.length">暂无该类型视频</p>
				<div
					@click="toDetail(i)"
					class="video-item flex-sb-ac m-t-10"
					v-for="(item, i) in videoList"
					:key="item.id"
				>
					<img class="w40p" src="@/assets/image/cover.jpg" alt="" />
					<div class="w60p p-10">
						<p class="lh-20">{{ item.title }}</p>
					</div>
				</div>
			</van-tab>
		</van-tabs>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				videoType: [],
				videoList: [],
				currentType: 0,
				townCode: "",
				baseUrl: "https://file.hzxf.hzsytz.com/",
			};
		},
		watch: {
			currentType(id) {
				console.log(id);
				const params = {
					code: "",
					page: 0,
					pageSize: 10,
					sortType: 1,
					type: id,
				};
				this.post("/video/page", params).then(({ records }) => {
					this.videoList = records;
				});
			},
		},
		created() {
			this.getVideoType();
		},
		mounted() {
			ZWJSBridge.setTitle({
				title: "消防视频",
			});
		},
		methods: {
			getVideoType() {
				this.get("/video/type").then((res) => {
					this.videoType = res || [];
					if (res.length) this.currentType = res[0].id;
				});
			},
			toDetail(index) {
				const videoList = this.videoList;
				this.$router.push({
					path: "/videoDetail",
					query: { videoList, index },
				});
			},
		},
	};
</script>

<style lang="less" scpoed></style>
