/*
 * @Date: 2022-06-08 09:58:28
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-07-04 11:06:45
 * @Description:
 */

console.log("正在启动......");

module.exports = {
	publicPath: "/",
	// publicPath: "/dist/",
	// assetsDir: "/static",

	outputDir: "dist",

	transpileDependencies: true,
	lintOnSave: false,

	productionSourceMap: false,
	devServer: {
		host: "localhost",
		port: 8080,
		proxy: process.env.VUE_APP_BASE_URL,
	},
	//其他配置....
	configureWebpack: {
		plugins: [],
	},
};
