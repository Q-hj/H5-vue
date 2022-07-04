/*
 * @Author: qinhaojie
 * @Date: 2021-09-03 16:14:41
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-07-04 15:08:40
 * @Description: In User Settings Edit
 * @FilePath:  375rem == 100vw
 */

// 基准大小
const baseSize = 2;
// 设置 rem 函数
function setRem() {
	// 当前页面宽度相对于 750 宽的缩放比例
	const scale = document.documentElement.clientWidth / 750;

	// 设置页面根节点字体大小
	document.documentElement.style.fontSize = baseSize * Math.min(scale, 2) + "px";
	// document.documentElement.style.fontSize = 56.8889
	// (true = 40.8296px)
}

// 初始化
setRem();

// 改变窗口大小时重新设置 rem
window.onresize = setRem;
