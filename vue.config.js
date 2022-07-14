/*
 * @Date: 2022-06-08 09:58:28
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-07-14 14:38:06
 * @Description:
 */

console.log("正在启动......");

module.exports = {
	publicPath: "./",
	// publicPath: "/dist/",
	// assetsDir: "/static",

	outputDir: "build",

	transpileDependencies: true,
	lintOnSave: false,

	productionSourceMap: false,
	devServer: {
		host: "localhost",
		port: 8080,

		proxy: {
			// 以下将 “api” 重写为 VUE_APP_BASE_URL
			"/api": {
				target: process.env.VUE_APP_BASE_URL, //对应自己的接口
				changeOrigin: true,
				ws: true,
				pathRewrite: {
					"^/api": "",
				},
			},
		},
	},
	//其他配置....
	configureWebpack: {
		plugins: [],
	},
	css: {
		loaderOptions: {
			less: {
				// 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
				lessOptions: {
					// 修改vant 主题
					modifyVars: {
						// 直接覆盖变量
						blue: "#06427e",
						// "border-color": "#eee",
						// 或者可以通过 less 文件覆盖（文件路径为绝对路径）
						// hack: `true; @import "your-less-file-path.less";`,
					},
				},
			},
		},
	},
};
