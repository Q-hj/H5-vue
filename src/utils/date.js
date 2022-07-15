/*
 * @Date: 2022-07-14 20:33:37
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-07-14 20:47:14
 * @Description: 处理日期的函数集
 */

// 将毫秒值 处理为 yyyy-mm-dd
export function fommatDate(time) {
	if (!time) return "";
	const date = new Date(time * 1000).toJSON();
	return date.slice(0, -14);
	return date.slice(0, -5);
}
