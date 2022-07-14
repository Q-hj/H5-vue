<!--
 * @Date: 2022-06-08 10:35:50
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-07-05 15:03:55
 * @Description: 地图
-->
<template>
	<div class="myMap">
		<div ref="map" :style="{ width, height }"></div>
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
				default: () => {
					return {
						longitude: 0, //经度
						latitude: 0, //纬度
					};
				},
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
			this.clickListener && qq.maps.event.removeListener(this.clickListener);
		},
		methods: {
			/**
			 * 位置信息在地图上展示
			 */
			initMap() {
				var myLatlng = new qq.maps.LatLng(
					this.position.latitude,
					this.position.longitude
				);
				var myOptions = {
					zoom: 16,
					center: myLatlng,
				};
				//获取dom元素添加地图信息
				this.map = new qq.maps.Map(this.$refs.map, myOptions);

				//给定位的位置添加图片标注
				this.marker = new qq.maps.Marker({
					position: myLatlng,
					map: this.map,
					draggable: true, //允许鼠标拖动
				});

				if (this.clickable) this.bindMapClickListener();
			},
			bindMapClickListener() {
				this.clickListener = qq.maps.event.addListener(
					this.map,
					"click",
					(event) => {
						const longitude = event.latLng.getLng();
						const latitude = event.latLng.getLat();
						this.$emit("onClick", { longitude, latitude });

						this.marker.setMap(null); //清除标记
						// 添加标记
						this.marker = new qq.maps.Marker({
							position: new qq.maps.LatLng(latitude, longitude),
							map: this.map,
						});
					}
				);
			},
		},
	};
</script>
<style scoped lang="less">
	.myMap {
		width: 100%;
	}
</style>
