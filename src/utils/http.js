import axios from "axios";
import Vue from "vue";
import router from "@/router";

import { Toast } from "vant";

// create an axios instance
const request = axios.create({
	baseURL: process.env.VUE_APP_BASE_URL, // 设置请求根路径
	// loginURL: "http://localhost:3000",
	timeout: 1000 * 10, // 请求超时时间,后端有接口响应慢 则可以设置更长(单位:毫秒)
});

// 将参数转成Body 表单格式
const transformBody = (data, headers) => {
	let ret = "";
	for (let it in data) {
		ret += encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
	}
	return ret.substr(0, ret.length - 1);
};

// request interceptor
// 发送请求前的统一处理。。。
request.interceptors.request.use(
	(request) => {
		// do something before request is sent
		// 设置请求头
		request.headers.post["Content-Type"] = "application/json;charset=utf-8"; //默认json格式
		request.headers.get["Content-Type"] = "application/x-www-form-urlencoded";

		const token = sessionStorage.getItem("token") || "";
		if (token) {
			// 请求头中添加token
			// request.headers["Authorization"] = "Bearer " + token;

			// 在参数中添加token
			request.params = { ...request.params, token };
			request.data = { ...request.data, token };
		}
		return request;
	},
	(error) => {
		// do something with request error
		// 假如发送请求失败
		console.log(error); // for debug
		// return Promise.reject(error)
		return Promise.reject(new Error("网络异常"));
	}
);

// response interceptor
// 请求后的处理
request.interceptors.response.use(
	(response) => {
		const res = response.data;
		// 剖析：response（http响应）  -->  res（http响应体）  -->  result（后端接口结果）

		// response.status  http状态码
		// 也可以根据后端返回的code进行响应状态判断
		// response.data.code 等同于 res.code

		// const permissions = response.status === 401 || res.code == 401;

		if (response.status === 401 || res.code == 401) {
			// 权限不足
			if (sessionStorage.getItem("token")) {
				sessionStorage.clear("token");
				Toast.fail("登录状态已过期,请重新登录");
			} else {
				Toast.fail("请先登录!");
			}
			// router.push("/home");
			window.location.reload();

			return Promise.resolve(res);
		}

		// 请求成功
		if (response.status === 200) {
			if (res == 200) return Promise.resolve(res.result.data || res.result);
			else return Promise.reject(res.result);
		}

		if (response.status === 500) return Promise.reject(res.result);

		return res;
	},
	(error) => {
		console.log(error);
		const response = error.response;
		const method = error.config.method;
		console.error(`[${method}]请求失败:` + error.config.url);

		// switch  ?
		let httpCode = {
			400: "请求参数错误",
			401: "权限不足, 请重新登录",
			403: "服务器拒绝本次访问",
			404: "请求资源未找到",
			405: "请求方法错误",
			500: "内部服务器错误",
			501: "服务器不支持该请求中使用的方法",
			502: "网关错误",
			504: "网关超时",
		};

		Toast.fail(httpCode[response.status] || "请求超时！");

		return Promise.reject(response); //catch捕获
	}
);
console.log(request);
/* 统一封装get请求 */
export const get = (url, params, config = {}) => {
	return new Promise((resolve, reject) => {
		request({
			method: "get",
			url,
			params,
			...config,
		})
			.then((response) => {
				resolve(response);
			})
			.catch((error) => {
				reject(error);
			});
	});
};

/* 统一封装post请求 */
export const post = (url, data, config = {}) => {
	return new Promise((resolve, reject) => {
		request({
			method: "post",
			url,
			data,
			...config,
		})
			.then((response) => {
				resolve(response);
			})
			.catch((error) => {
				reject(error);
			});
	});
};

// 为方便全局使用,可以将请求方法添加到全局Vue对象属性中
// this.get(utl,参数)  即可发起get请求
Vue.prototype.get = get;
Vue.prototype.post = post;
Vue.prototype.request = request;
