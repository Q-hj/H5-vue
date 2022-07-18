<!--
 * @Date: 2022-07-15 17:14:15
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-07-18 11:19:08
 * @Description: 视频播放页
-->
<template>
	<div class="">
		<video :src="fommatUrl(video.videoUrl) || video.videoUrl | fommatUrl"></video>

		<videoPlayer
			class="video-player"
			ref="videoPlayer"
			:playsinline="true"
			:options="playerOptions"
		>
		</videoPlayer>
	</div>
</template>

<script>
	import "video.js/dist/video-js.css";
	import { videoPlayer } from "vue-video-player";
	export default {
		components: { videoPlayer },
		data() {
			return {
				playerOptions: {
					autoplay: true, //如果true,浏览器准备好时开始回放。
					muted: false, // 是否静音。
					loop: false, // 是否循环播放。
					preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
					language: "zh-CN",
					aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
					fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
					sources: [
						{
							type: "video/mp4", //mp4格式视频,若为m3u8格式，type需设置为 application/x-mpegURL
							src: "", //url地址
						},
					],
					notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
					controlBar: {
						timeDivider: true,
						durationDisplay: true,
						remainingTimeDisplay: false,
						fullscreenToggle: true, //是否显示全屏按钮
					},
				},
				// 不同视频路径 根路径不一样 ,replace
				baseUrl: ["https://file.hzxf.hzsytz.com/", "https://file.zjxf.hzsytz.com/"],
				// baseUrl: "https://file.zjxf.hzsytz.com/",
				videoList: [],
				index: null,
				video: {},
			};
		},
		watch: {
			index(i) {
				this.video = this.videoList[i];
				this.playerOptions.sources.src = this.fommatUrl(this.video.videoUrl);
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
				// res = url.replace("video", "https://file.hzxf.hzsytz.com/video");
				// res = url.replace(
				// 	"promotionVideo",
				// 	"https://file.zjxf.hzsytz.com/promotionVideo"
				// );
				console.log(res);
				return res;
			},
		},
	};
</script>

<style lang="less" scpoed></style>
