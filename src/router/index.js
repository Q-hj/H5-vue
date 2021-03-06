/*
 * @Date: 2022-07-04 09:37:42
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-07-18 10:26:17
 * @Description:
 */
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import store from "@/store/index";
const routes = [
	{
		path: "/Home",
		name: "Home",
		component: () => import("@/views/Home.vue"),
	},
	{
		path: "/visitDetail",
		name: "visitDetail",
		component: () => import("@/views/visitDetail.vue"),
	},
	{
		path: "/videoDetail",
		name: "videoDetail",
		component: () => import("@/views/videoDetail.vue"),
	},
	{
		path: "*",
		redirect: "Home",
	},
];

const router = new VueRouter({
	routes,
});

// 添加路由
store.state.menu.map(({ name, title, icon }) =>
	router.addRoute({
		name,
		path: "/" + name,
		meta: { title, icon },
		component: () => import(`@/views/${name}.vue`),
	})
);

export default router;
