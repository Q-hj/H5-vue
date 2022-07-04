/*
 * @Author: qinhaojie
 * @Date: 2021-09-04 09:24:55
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-07-04 10:46:20
 * @Description: 常用插件的引入 （自动引入兄弟文件）
 * @FilePath: project\src\plugins\include.js
 */

const files = require.context("./", false, /\.js$/);

files.keys().forEach((path) => {
	if (path === "./index.js") return;
	// console.log(path);
	files(path);
});
