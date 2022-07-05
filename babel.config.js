/*
 * @Date: 2022-07-04 09:37:42
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-07-05 10:29:12
 * @Description:
 */
module.exports = {
	presets: ["@vue/cli-plugin-babel/preset"],
	plugins: [
		[
			// 自动引入
			"import",
			{
				libraryName: "vant",
				libraryDirectory: "es",
				// style: true,
				style: (name) => `${name}/style/less`,
			},
			"vant",
		],
	],
};
