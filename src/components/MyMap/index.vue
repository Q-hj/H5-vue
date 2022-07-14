<!--
 * @Date: 2022-06-08 10:35:50
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-07-13 16:26:19
 * @Description: 地图
-->
<template>
	<div class="myMap">
		<div id="map" ref="map" :style="{ width, height }"></div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				// key: "OYRBZ-DRLKK-XO2JD-ARB56-TBKNZ-Y4BN7",
				width: "100%",
				height: "300px",
				map: null,
				marker: null,
				clickable: false,
			};
		},
		props: {
			size: {
				type: String,
				default: () => "small",
			},
			position: {
				type: Object,
				default: () => ({
					longitude: 0, //经度
					latitude: 0, //纬度
				}),
			},
			markers: {
				type: Array,
				default: () => [],
			},
		},
		watch: {},
		created() {
			this.height = this.size == "small" ? "300rem" : "500rem";
			// 获取组件上绑定的监听事件
			const directives = this.$vnode.componentOptions.listeners;
			// 存在onClick事件则可绑定地图事件
			if (directives && directives.onClick) this.clickable = true;
		},
		mounted() {
			this.initMap();
		},
		beforeDestroy() {
			this.map = null;
			// this.clickListener && qq.maps.event.removeListener(this.clickListener);
		},
		methods: {
			/**
			 * 位置信息在地图上展示
			 */
			initMap() {
				const { longitude, latitude } = this.position;
				this.map = new AMap.Map("map", {
					resizeEnable: true,
					center: [longitude, latitude],
					zoom: 13,
				});
				//实时路况图层
				var trafficLayer = new AMap.TileLayer.Traffic({
					zIndex: 10,
				});
				this.map.add(trafficLayer); //添加图层到地图
			},
			addMarkers() {
				//创建信息窗体
				const infoWindow = new AMap.InfoWindow({
					isCustom: true, //使用自定义窗体
					content: "<div>信息窗体</div>", //信息窗体的内容可以是任意html片段
					offset: new AMap.Pixel(16, -45),
				});
				const markers = this.markers.map(
					(venue) =>
						new AMap.Marker({
							position: [venue.longitude, venue.latitude],
						})
				);
				markers.forEach(
					(marker) =>
						marker.on("click", (e) =>
							infoWindow.open(this.map, e.target.getPosition())
						) //打开信息窗体
				);
			},
			bindMapClickListener() {
				// this.clickListener
			},
		},
	};
</script>
<style scoped lang="less">
	.myMap {
		width: 100%;
	}
</style>
