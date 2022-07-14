<!--
 * @Date: 2022-07-04 14:10:36
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-07-14 16:33:59
 * @Description: 参观预约
-->
<template>
	<div class="Visit warp">
		<my-map class="m-t-10" :position="position"></my-map>
		<van-form label-width="5em" @submit="onSubmit">
			<van-field
				left-icon="location-o"
				v-model="fireBrigadeName"
				name="fireBrigadeName"
				label="参观场所"
				readonly
				click-input="handleSelect"
				placeholder="请选择（点击地图定位）"
				:rules="[{ required: true }]"
			>
				<!-- <img src="../assets/icon/input-1.png" alt="" srcset="" /> -->
			</van-field>
			<van-field
				left-icon="clock-o"
				:value="visitDate + '   ' + visitTime"
				is-link
				readonly
				name="visitDateTime"
				label="参观日期"
				placeholder="请选择参观日期"
				@click="showCascader = true"
			/>
			<van-popup v-model="showCascader" round position="bottom">
				<van-cascader
					title="请选择参观日期"
					:options="options"
					active-color="#06427e"
					@close="showCascader = false"
					@finish="onChangeVisitDate"
				/>
			</van-popup>
			<van-field
				left-icon="friends-o"
				v-model="form.number"
				name="number"
				label="参观人数"
				:placeholder="numberPlaceholder"
				type="number"
				:rules="[{ validator: validatorNumber }]"
			/>
			<!-- <van-icon class-prefix="my-icon" name="number" /> -->
			<van-field
				left-icon="flag-o"
				v-model="form.groupName"
				name="groupName"
				label="参观团名称"
				placeholder="自定义填写，如**单位"
				:rules="[{ required: true }]"
			/>
			<van-field
				v-model="form.remarks"
				name="remarks"
				label=""
				placeholder="请输入备注信息"
				:maxlength="200"
				show-word-limit
				:rules="[{ required: true, message: '' }]"
			/>
			<van-field
				left-icon="phone-o"
				v-model="form.contactNumber"
				name="contactNumber"
				type="tel"
				:maxlength="11"
				label="联系方式"
				:rules="[{ validator: validatorTel, message: '手机号码格式不正确' }]"
			>
				<template #button>
					<van-button size="small" @click="getCode" plain type="info"
						>发送验证码</van-button
					>
				</template>
			</van-field>

			<van-field
				left-icon="user-circle-o"
				v-model="form.contactName"
				name="contactName"
				label="姓名"
				placeholder="请输入真实姓名"
				:rules="[{ required: true, message: '' }]"
			/>
			<van-field left-icon="friends-o" name="sex" label="性别">
				<template #input>
					<van-radio-group v-model="form.sex" direction="horizontal">
						<van-radio :name="0">男</van-radio>
						<van-radio :name="1">女</van-radio>
					</van-radio-group>
				</template>
			</van-field>

			<van-button
				class="m-t-20"
				round
				block
				icon="passed"
				type="info"
				size="large"
				native-type="submit"
				>&nbsp;提交预约</van-button
			>
		</van-form>
	</div>
</template>

<script>
	import myMap from "../components/MyMap/index.vue";
	export default {
		components: { myMap },
		data() {
			return {
				position: {
					longitude: 116.376829,
					latitude: 39.963459,
				},
				fireBrigadeId: 0,
				fireBrigadeName: "",
				form: {
					contactNumber: "",
					contactName: "",
					groupName: "",
					visitTime: "",
					eventTime: 0,
					sex: 0,
					vcode: "",
					number: 1,
					remarks: "",
					geocodedCode: "",
				},
				visitDate: "",
				visitTime: "",
				visitDateList: [],
				showCascader: false,
				options: [
					{
						text: "7-17",
						value: "330000",
						children: [{ text: "14:00 - 20:00", value: "14:00 - 20:00" }],
					},
					{
						text: "7-18",
						value: "320000",
						children: [{ text: "14:00 - 20:00", value: "14:00 - 20:00" }],
					},
				],
				apptnumberMin: 1,
				apptnumberMax: 100,
				numberPlaceholder: "请输入参观人数",
				vcode: null,
				countdown: false,
				vcodeTime: 60,
			};
		},
		created() {
			dd.device.location.get({
				onSuccess: (res) => this.getVenceList(res),
				onFail: (error) => this.$toast.fail(error.errorMessage),
			});
		},
		mounted() {},
		methods: {
			getVenceList(res) {
				const geocodedCode = res.townCode;
				this.get("/fireBrigade/visit/open", { geocodedCode }).then((list) => {
					console.log(list);
				});
			},
			onChangeVisitDate({ value, selectedOptions }) {
				this.showCascader = false;
				[this.visitDate, this.visitTime] = selectedOptions.map(
					(option) => option.text
				);
			},
			onSubmit(values) {
				console.log(values);
			},
			getCode() {
				if (this.countdown) return;
				const resPhone = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/;
				const phone = this.form.contactNumber;

				if (!phone) return this.$toast.fail("请填写手机号！");
				if (!resPhone.test(phone)) return this.$toast.fail("手机号码格式不正确！");
				// 发送验证码
				// app.post("/sms/vcode", { phone }).then(({ message }) => {
				//   app.lightTip("验证码已发送");
				//   this.setData({ countdown: true, vcode: message });
				//   this.handleCountdown();
				// });
			},
			validatorTel(phone) {
				const resPhone = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/;
				return resPhone.test(phone);
			},
			validatorNumber(val) {
				if (!val) return false;
				if (val < this.apptnumberMin) {
					this.$toast(`人数不能少于${this.apptnumberMin}人`);
					return false;
				}
				if (val > this.apptnumberMax) {
					this.$toast(`人数不能多于${this.apptnumberMax}人`);
					return false;
				}
				return true;
			},
		},
	};
</script>
<style lang="less" scoped>
	.Visit {
		// height: 100vh;
		background-color: #fff9f9;
		.van-cell + .van-cell {
			border-top: 1px solid #e7e7e7;
		}
		/deep/.van-field__left-icon,
		/deep/.van-field__label {
			display: flex;
			align-items: center;
		}
	}
</style>
