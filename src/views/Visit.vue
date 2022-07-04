<!--
 * @Date: 2022-07-04 14:10:36
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-07-04 17:47:19
 * @Description: 参观预约
-->
<template>
	<div class="Visit">
		<div class="flex-center m-20 h-100">map</div>
		<van-form @submit="onSubmit">
			<van-field
				v-model="username"
				name="用户名"
				label="用户名"
				placeholder="用户名"
				:rules="[{ required: true, message: '请填写用户名' }]"
			/>
			<van-field
				v-model="password"
				type="password"
				name="密码"
				label="密码"
				placeholder="密码"
				:rules="[{ required: true, message: '请填写密码' }]"
			/>
			<div style="margin: 16px">
				<van-button round block type="info" native-type="submit">提交</van-button>
			</div>
		</van-form>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				username: "",
				password: "",
			};
		},
		methods: {
			onSubmit(values) {
				console.log("submit", values);
			},
		},
	};
</script>
<style lang="less" scoped>
	.Visit {
		// height: 100vh;
		// background-color: #f4f4f4;
	}
</style>
