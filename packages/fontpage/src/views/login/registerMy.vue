<template>
	<div class="register">
		<el-steps style="margin: 20px 0" :space="400" :active="active" finish-status="success" align-center>
			<el-step title="填写信息" />
			<el-step title="发送邮箱" />
			<el-step title="注册完成" />
		</el-steps>
		<el-form ref="registerFormRef" :model="registerData" :rules="registerData.rules" status-icon label-width="100px">
			<el-form-item label="学号:" prop="stuNum">
				<el-input v-model="registerData.stuNum" placeholder="学号" />
			</el-form-item>
			<el-form-item label="姓名:" prop="stuName">
				<el-input v-model="registerData.stuName" placeholder="姓名" />
			</el-form-item>
			<el-form-item label="密码:" prop="pass">
				<el-input type="password" v-model="registerData.pass" placeholder="密码" />
			</el-form-item>
			<el-form-item label="确认密码:" prop="pass2">
				<el-input type="password" v-model="registerData.pass2" placeholder="确认密码" />
			</el-form-item>
			<el-form-item label="邮箱:" prop="email">
				<el-autocomplete
					v-model="registerData.email"
					:fetch-suggestions="querySearch"
					placeholder="邮箱"
					@select="handleSelect"
					@change="myWatch(registerFormRef)"
				>
					<template #default="{ item }">
						<div class="value">{{ item }}</div>
					</template>
				</el-autocomplete>
			</el-form-item>
			<el-form-item label="邮箱验证:">
				<el-input style="width: 100px" v-model="registerData.emailRender" placeholder="邮箱验证" />
				<el-button style="margin-left: 20px" round :disabled="registerData.setSendStatus" @click="uploadCode($event, registerFormRef)">{{
					registerData.text
				}}</el-button>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm(registerFormRef)" :loading="loading">Submit</el-button>
				<el-button @click="resetForm(registerFormRef)">Reset</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { Post, postCode } from '../../api/myApi';
import base from '../../api/myBase';
import md5 from 'js-md5';
import axios from '../../utils/request';

const active = ref(0);
const registerFormRef = ref(null);
const loading = ref(false);
const registerData = reactive({
	stuNum: '202010804027',
	stuName: '张凡',
	pass: '112711zf',
	pass2: '112711zf',
	email: '468369392@qq.com',
	emailRender: '',
	text: '发送验证码',
	setSendStatus: false,
	rules: {
		stuNum: [{ validator: validatorId, required: true, trigger: 'blur' }],
		stuName: [{ validator: validatorName, required: true, trigger: 'blur' }],
		pass: [{ validator: validatorPassword, required: true, trigger: 'blur' }],
		pass2: [{ validator: compareToFirstPassword, required: true, trigger: 'blur' }],
		email: [
			{
				required: true,
				message: 'Please input email address',
				trigger: 'blur',
			},
			{
				type: 'email',
				message: 'Please input correct email address',
				trigger: ['blur'],
			},
		],
		// emailRender: [
		//   { validator: validatorRender, required: true, trigger: 'blur' },
		// ],
	},
});
const submitForm = (formEl) => {
	if (!formEl) return;
	formEl.validate((valid) => {
		if (valid) {
			loading.value = true;
			const data = {
				id: registerData.stuNum,
				name: registerData.stuName,
				password: md5(registerData.pass),
				email: registerData.email,
				code: registerData.emailRender,
			};
			Post(base.registerUser, data)
				.then((res) => {
					if (res.success) {
						active.value = 3;
						ElMessage({
							message: '注册成功,等待审核 !',
							type: 'success',
						});
					}
					loading.value = false;
				})
				.catch(() => {
					ElMessage({
						message: '注册成功,等待审核 !',
						type: 'error',
					});
					loading.value = false;
				});
		} else {
			ElMessage({
				message: '请完善信息 !',
				type: 'error',
			});
			return false;
		}
	});
};
const uploadCode = (e, formEl) => {
	e.preventDefault();
	// if (formEl.validateField('email'))
	formEl.validateField('email', (isValid) => {
		if (isValid) {
			axios.get(base.getregisterCode).then((res) => {
				if (res.data.success) {
					registerData.setSendStatus = true;
					let time = 60;
					const clearnTime = setInterval(() => {
						time--;
						if (time === 0) {
							clearInterval(clearnTime);
							registerData.text = '重新发送';
							registerData.setSendStatus = false;
						} else {
							registerData.text = `${time}s后重新发送`;
						}
					}, 1000);
				}
			});
		}
	});
};

const myWatch = (formEl) => {
	// formEl.validateField(
	//   ['stuNum', 'stuName', 'pass', 'pass2', 'email'],
	//   isValid => {
	//     console.log(isValid)
	//   }
	// )
	if (!formEl) return;
	formEl.validate((valid) => {
		if (valid) {
			active.value = 1;
		}
	});
};
// 验证姓名
function validatorName(rule, value, callback) {
	if (value && value.length > 0 && value.length < 10) {
		callback();
	} else {
		callback('姓名控制在10个汉字以内');
	}
}

// 验证账号
function validatorId(rule, value, callback) {
	const treg = /^[0-9]\d*$|^0$/;
	if (value && treg.test(value) === true && value.length === 12) {
		callback();
	} else {
		callback('请输入12位学号');
	}
}

// 密码验证
function validatorPassword(rule, value, callback) {
	const patt = /(?=.*\d)(?=.*[a-zA-Z])^.{6,20}$/;
	if (patt.test(value) && value) {
		callback();
	} else {
		callback('密码需要在6-20位之间并包含字母和数字');
	}
}

// function validatorRender(rule, value, callback) {
//   if (value || value.length === 4) {
//     callback()
//   } else {
//     callback(new Error('请输入4为验证码'))
//   }
// }

function compareToFirstPassword(rule, value, callback) {
	if (value && value !== registerData.pass) {
		callback('请确保两次密码输入一致');
	} else {
		callback();
	}
}
const querySearch = (value, cb) => {
	let autoCompleteResult;
	if (!value || value.indexOf('@') >= 0) {
		autoCompleteResult = [];
	} else {
		autoCompleteResult = ['@gmail.com', '@163.com', '@qq.com', '@aliyun.com'].map((domain) => `${value}${domain}`);
	}
	myWatch();
	cb(autoCompleteResult);
};
const handleSelect = (item) => {
	registerData.email = item;
};
const resetForm = (formEl) => {
	if (!formEl) return;
	formEl.resetFields();
};
</script>

<style scoped lang="less">
.register {
	margin: auto;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
}
</style>
