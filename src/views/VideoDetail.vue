<!--
 * @Date: 2022-07-15 17:14:15
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-07-18 11:30:52
 * @Description: 视频播放页
-->
<template>
	<div class="">
		<!-- <video :src="fommatUrl(video.videoUrl) || video.videoUrl | fommatUrl"></video> -->

		<my-video v-if="videoUrl" :url="videoUrl"> </my-video>
	</div>
</template>

<script>
	import myVideo from "@/components/MyVideo/index.vue";
	export default {
		components: { myVideo },
		data() {
			return {
				// 不同视频路径 根路径不一样 ,replace
				baseUrl: ["https://file.hzxf.hzsytz.com/", "https://file.zjxf.hzsytz.com/"],
				// baseUrl: "https://file.zjxf.hzsytz.com/",
				videoList: [],
				index: null,
				video: {},
				videoUrl: "",
			};
		},
		watch: {
			index(i) {
				this.video = this.videoList[i];
				this.videoUrl = this.fommatUrl(this.video.videoUrl);
			},
		},
		filters: {},
		created() {
			// 获取传进来的 当前类型的 ids
			const { videoList, index } = this.$route.query;
			this.videoList = videoList;
			this.index = index;
		},
		mounted() {},
		methods: {
			fommatUrl(url) {
				let res = "";
				console.log(url.includes("video"));
				console.log(this.baseUrl);
				if (url.includes("video")) res = this.baseUrl[0] + url;
				if (url.includes("promotionVideo")) res = this.baseUrl[1] + url;
				console.log(res);
				return res;
			},
		},
	};
</script>

<style lang="less" scpoed></style>
