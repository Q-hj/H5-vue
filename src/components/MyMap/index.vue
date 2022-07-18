<!--
 * @Date: 2022-06-08 10:35:50
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-07-18 15:48:18
 * @Description: 地图
-->
<template>
	<div class="myMap w100p">
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
				infoWindow: null,
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
			this.addMarkers();
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
				this.map = new AMap.Map("map", {
					resizeEnable: true,
					clickable: true,
					center: this.position,
					zoom: 11,
				});

				// this.map.on("click", (e)=>console.log(e.lnglat));

				//实时路况图层
				// var trafficLayer = new AMap.TileLayer.Traffic({
				// 	zIndex: 10,
				// });
				// this.map.add(trafficLayer);
			},
			addMarkers(markerList) {
				markerList = [
					{
						longitude: 120.227583,
						latitude: 30.225813,
						name: "测试测试测试",
					},
					{
						longitude: 120.297583,
						latitude: 30.275813,
						name: "实例场馆",
					},
				];
				markerList.map((venue) => {
					const marker = new AMap.Marker({
						position: [venue.longitude, venue.latitude],
						map: this.map,
						content:
							`<img class="w-30" src="${require("./icon/maker.png")}" alt="">` ||
							`<div class="flex-col-cneter  brs-10">
											<span class="c-white">${venue.name}</span>
											<img  src="${require("./icon/maker.png")}" alt="">
										</div>`,
						offset: new AMap.Pixel(-15, -15),
					});
					Object.assign(marker, venue); //将场馆属性添加到maker中

					// AMap.event.addListener(marker, "click", (e) => console.log(e.target));

					marker.on("click", ({ target }) => {
						const { name } = target;
						const content = `<div class='bc-white lh-30 p-0-10 brs-15 '>${name}</div>`;
						//创建信息窗体
						this.infoWindow = new AMap.InfoWindow({
							isCustom: true, //使用自定义窗体
							content, //信息窗体的内容可以是任意html片段
							offset: new AMap.Pixel(0, -10),
						});
						this.infoWindow.open(this.map, target.getPosition());
					}); //打开信息窗体

					this.map.add(marker);
				});
			},
		},
	};
</script>
<style scoped lang="less"></style>
