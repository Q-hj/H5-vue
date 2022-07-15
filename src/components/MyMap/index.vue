<!--
 * @Date: 2022-06-08 10:35:50
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-07-14 20:21:36
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
				type: Array,
				default: () => [],
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
				var clickHandler = function (e) {
					console.log(e.lnglat);
				};
				this.map = new AMap.Map("map", {
					resizeEnable: true,
					clickable: true,
					center: this.position,
					zoom: 11,
				});
				this.map.on("click", clickHandler);
				//实时路况图层
				// var trafficLayer = new AMap.TileLayer.Traffic({
				// 	zIndex: 10,
				// });
				// this.map.add(trafficLayer);

				// let markerOption = new MarkerOptions();
				// markerOption.position(this.position);
				// markerOption.title("标题").snippet("今天考完试了很开心");
				// markerOption.draggable(false);//设置Marker可拖动
				// markerOption.icon(BitmapDescriptorFactory.fromResource(R.mipmap.icon1));
				// aMap.addMarker(markerOption);
			},
			addMarkers(markerList) {
				//创建信息窗体
				// const infoWindow = new AMap.InfoWindow({
				// 	isCustom: true, //使用自定义窗体
				// 	content: "<div>信息窗体</div>", //信息窗体的内容可以是任意html片段
				// 	offset: new AMap.Pixel(16, -45),
				// });
				markerList.map((venue) => {
					const marker = new AMap.Marker({
						position: [venue.longitude, venue.latitude],
						map: this.map,
						content:
							`<img class="w-30" src="${require("./icon/maker.png")}" alt="">` ||
							`<div class="flex-col-cneter border-deep brs-10">
										<span class="c-white">${venue.name}</span>
										<img src="${require("./icon/maker.png")}" alt="">
									</div>`,
						offset: new AMap.Pixel(-13, -30),
					});
					AMap.event.addListener(marker, "click", (e) => console.log(e));
					// marker.on("click", (e) => {
					// 	console.log(e);
					// 	infoWindow.open(this.map, e.target.getPosition());
					// }); //打开信息窗体
					this.map.add(marker);
				});
				// markers.forEach((marker) => {});
			},
		},
	};
</script>
<style scoped lang="less">
	.myMap {
		width: 100%;
	}
</style>
