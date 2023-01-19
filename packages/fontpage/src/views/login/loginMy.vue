<template>
	<div>
		<div class="back">
			<div class="container">
				<div class="screen">
					<div class="screen__content">
						<el-form ref="loginFormRef" :model="loginData" class="login" :rules="loginData.loginRules">
							<el-form-item class="login__field" prop="stuNum">
								<i class="login__icon iconfont icon-jurassic_user"></i>
								<el-input autofocus autocomplete class="login__input" v-model="loginData.stuNum" placeholder="学号" />
							</el-form-item>
							<el-form-item class="login__field" prop="password">
								<i class="login__icon iconfont icon-tianchongxing-"></i>
								<el-input clearable class="login__input" type="password" @input="setPs" v-model="loginData.password" placeholder="密码" />
							</el-form-item>
							<el-form-item class="login__field" prop="render">
								<i class="login__icon iconfont icon-yanzhengma"></i>
								<el-input
									@keyup.enter.native="submitFormLogin(loginFormRef)"
									style="width: 110px; margin-right: 20px"
									class="login__input"
									maxlength="4"
									v-model="loginData.render"
									placeholder="验证码"
								/>
								<img
									title="点击更换"
									:src="base.getCode"
									ref="Render"
									@click="changRender()"
									style="border-radius: 5px; width: 80px; height: 30px; object-fit: cover; object-position: center"
								/>
							</el-form-item>
							<el-form-item>
								<el-button :loading="loginIng" type="primary" @click="submitFormLogin(loginFormRef)">
									{{ !loginIng ? '登录' : '登录中' }}
								</el-button>
							</el-form-item>
						</el-form>
						<div class="social-login">
							<el-link @click="centerDialogVisible = true">忘记密码?</el-link>
						</div>
					</div>
					<div class="screen__background">
						<span class="screen__background__shape screen__background__shape4"></span>
						<span class="screen__background__shape screen__background__shape3"></span>
						<span class="screen__background__shape screen__background__shape2"></span>
						<span class="screen__background__shape screen__background__shape1"></span>
					</div>
				</div>
			</div>
		</div>
		<el-dialog v-model="centerDialogVisible" title="忘记密码" width="300px" center ref="findFormRef" @closed="myCancel">
			<el-form v-if="!findData.nextTip" ref="findFormRef" :model="findData" :rules="findData.findRules" status-icon label-width="70px">
				<el-form-item label="学号:" prop="stuNumFind">
					<el-input v-model="findData.stuNumFind" placeholder="学号" />
				</el-form-item>
				<el-form-item label="邮箱:" prop="email">
					<el-autocomplete v-model="findData.email" :fetch-suggestions="querySearch" placeholder="邮箱" @select="handleSelect">
						<template #default="{ item }">
							<div class="value">{{ item }}</div>
						</template>
					</el-autocomplete>
				</el-form-item>
				<el-form-item label="新密码:" prop="newPassWord">
					<el-input type="password" autocomplete="off" v-model="findData.newPassWord" placeholder="密码" />
				</el-form-item>
			</el-form>
			<el-form ref="findFormRef2" v-else :model="helloData" class="demo-form-inline" :rules="helloData.helloDataRule">
				<el-form-item prop="password" label="验证码">
					<el-input v-model="helloData.code" placeholder="验证码" />
					<el-button @click="uploadCode" :disabled="helloData.sendStatus">{{ helloData.sendEmail }}</el-button>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="findData.nextTip = !findData.nextTip" v-if="findData.nextTip">上一步</el-button>
					<el-button :loading="helloData.loading" type="primary" v-if="findData.nextTip" @click="handelSave"> 确定</el-button>
					<el-button v-else type="primary" @click="submitFind(findFormRef)">下一步</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup>
import router from '../../router';
import { Bounce, TweenMax } from 'gsap';
import { ElMessage } from 'element-plus';
import { ref, onMounted, reactive } from 'vue';
import login from '../../api/login';
import md5 from 'js-md5';
import auth from '../../utils/auth';
import Cookies from 'js-cookie';
import { Post } from '../../api/myApi';
import axios from '../../utils/request';
import base from '../../api/myBase';
import { useStore } from '@/store';
import { validatorNum, validatorPassword, validatorRender } from '@tommyzf/common';

const userStore = useStore();
const centerDialogVisible = ref(false);
const loginIng = ref(false);
const loginFormRef = ref(null);
const findFormRef = ref(null);
const findFormRef2 = ref(null);
const Render = ref(null);
const loginData = reactive({
	stuNum: Cookies.get('yourStuNum') || '',
	password: Cookies.get('yourPassword') || '',
	render: '',
	loginRules: {
		stuNum: [{ validator: validatorNum, trigger: 'blur' }],
		password: [{ validator: validatorPassword, trigger: 'blur' }],
		render: [{ validator: validatorRender, trigger: 'blur' }],
	},
});
const findData = reactive({
	stuNumFind: Cookies.get('yourStuNum') || '',
	email: '',
	newPassWord: '',
	nextTip: false,
	findRules: {
		stuNumFind: [{ validator: validatorNum, required: true, trigger: 'blur' }],
		email: [
			{
				type: 'email',
				required: true,
				message: 'Please input correct email address',
				trigger: 'blur',
			},
		],
		newPassWord: [{ validator: validatorPassword, required: true, trigger: 'blur' }],
	},
});
const helloData = reactive({
	code: '',
	sendStatus: false,
	sendEmail: '发送验证码',
	loading: false,
	helloDataRule: {
		password: [{ validator: validatorCode, trigger: 'blur' }],
	},
});
onMounted(() => {
	TweenMax.staggerFrom(
		'.login__field',
		1,
		{
			opacity: 0,
			y: -50,
			duration: 1.5,
			ease: Bounce.easeOut,
		},
		0.3
	);
});
const setPs = () => {
	Cookies.set('yourPassword', '');
};
function mylogin() {
	const flag = loginData.password.length > 20;
	return flag ? md5(loginData.password) : md5(md5(loginData.password));
}
const submitFormLogin = (formEl) => {
	if (!formEl) return;
	formEl.validate((valid) => {
		if (valid) {
			loginIng.value = true;
			login
				.login({
					id: loginData.stuNum,
					password: mylogin(),
					code: loginData.render,
				})
				.then((res) => {
					loginIng.value = false;
					if (res.success) {
						// store.state.userInfo.isTourist = false
						// store.state.userInfo.id = loginData.stuNum
						auth.setToken(res.data.token);
						if (!Cookies.get('yourPassword')) {
							Cookies.set('yourPassword', md5(loginData.password), {
								expires: 1,
							});
						}
						Cookies.set('yourStuNum', loginData.stuNum, { expires: 1 });
						userStore.loginSet(auth.getToken(), Cookies.get('yourStuNum'));
						router.replace({ path: '/user/article' });
					} else {
						changRender();
						loginData.render = '';
					}
				});
		} else {
			ElMessage({
				type: 'error',
				message: '请完善信息 !!!',
			});
			return false;
		}
	});
};
const submitFind = (formEl) => {
	if (!formEl) return;
	formEl.validate((valid) => {
		if (valid) {
			Post(base.forgetPassword, {
				id: findData.stuNumFind,
				email: findData.email,
				password: md5(findData.newPassWord),
			}).then((res) => {
				if (res.success) {
					findData.nextTip = true;
				}
			});
		}
	});
	// centerDialogVisible.value = false
};
const uploadCode = () => {
	if (findData.email === '') {
		ElMessage({
			type: 'error',
			message: '邮箱不存在，请返回上一步',
		});
		return;
	}
	axios.get(base.getemailCode).then((res) => {
		if (res.data.success) {
			// 468369392@qq.com
			helloData.sendStatus = true;
			let time = 60;
			const clearnTime = setInterval(() => {
				time--;
				if (time == 0) {
					clearInterval(clearnTime);
					helloData.sendEmail = '重新发送';
					helloData.sendStatus = false;
				} else {
					helloData.sendEmail = `${time}s后重新发送`;
				}
			}, 1000);
		}
	});
	// ElMessage({
	// 	type: 'success',
	// 	message: '发送成功,请查看邮箱 !!!',
	// });
};
const handelSave = () => {
	if (helloData.code == '') {
		ElMessage({
			type: 'error',
			message: '请输入验证码',
		});
		return;
	}
	helloData.loading = true;

	axios
		.post(base.changePassword, {
			code: helloData.code,
		})
		.then((res) => {
			if (res.data.success) {
				// ElMessage({
				// 	type: 'success',
				// 	message: '修改成功',
				// });
				centerDialogVisible.value = false;
				findData.nextTip = false;
			}
			helloData.loading = false;
		})
		.catch(() => {
			// setTimeout(() => {
			// 	ElMessage({
			// 		type: 'success',
			// 		message: '修改成功',
			// 	});
			// 	centerDialogVisible.value = false;
			// 	findData.nextTip = false;
			// 	helloData.loading = false;
			// }, 2000);
		});
};

function myCancel() {
	if (!findFormRef.value) return;
	findFormRef.value.resetFields();
	if (!findFormRef2.value) return;
	findFormRef2.value.resetFields();
}

function validatorCode(rule, value, callback) {}

function changRender() {
	Render.value.src = Render.value.src.split('?')[0] + '?' + Math.floor(Math.random(10) * 10);
}

const querySearch = (value, cb) => {
	let autoCompleteResult;
	if (!value || value.indexOf('@') >= 0) {
		autoCompleteResult = [];
	} else {
		autoCompleteResult = ['@gmail.com', '@163.com', '@qq.com', '@aliyun.com'].map((domain) => `${value}${domain}`);
	}
	cb(autoCompleteResult);
};
const handleSelect = (item) => {
	findData.email = item;
};
</script>

<style scoped>
.v-enter,
.v-leave-to {
	opacity: 0; /*透明度*/
	transform: translateX(-100px);
}

/*入场(离场)动画的时间段   */
.v-enter-active,
.v-leave-active {
	transition: all 0.8s ease;
}

:deep(.el-form-item__error) {
	padding-left: 24px;
}

:deep(.el-dialog__body) {
	padding: 0 10px;
}

.back {
	height: 100%;
	width: 100%;
	background: url('../../assets/img/loginbg.jpg') center;
	background-size: cover;
}

.container {
	display: flex;
	align-items: center;
	justify-content: center;
	height: calc(100vh - 60px);
	overflow: hidden;
}
@media screen and (max-width: 800px) {
	.container {
		height: calc(100vh - 50px);
	}
}

.screen {
	/*background: linear-gradient(90deg, #5D54A4, #7C78B8);*/
	position: relative;
	height: 600px;
	width: 360px;
	box-shadow: 0px 0px 24px rgba(34, 35, 58, 0.2);
}

.screen__content {
	z-index: 1;
	position: relative;
	height: 100%;
}

.screen__background {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 0;
	-webkit-clip-path: inset(0 0 0 0);
	clip-path: inset(0 0 0 0);
}

.screen__background__shape {
	transform: rotate(45deg);
	position: absolute;
}

.screen__background__shape1 {
	height: 520px;
	width: 520px;
	background: #fff;
	top: -50px;
	right: 120px;
	border-radius: 0 72px 0 0;
}

.screen__background__shape2 {
	height: 220px;
	width: 220px;
	background: rgba(38, 157, 207, 1);
	top: -172px;
	right: 0;
	border-radius: 32px;
}

.screen__background__shape3 {
	height: 540px;
	width: 190px;
	background: linear-gradient(270deg, rgb(248, 202, 0), rgb(248, 221, 103));
	/*background: rgba(248,202,0,1);*/
	top: -24px;
	right: 0;
	border-radius: 32px;
}

.screen__background__shape4 {
	height: 400px;
	width: 200px;
	background: rgba(115, 195, 32, 1);
	top: 420px;
	right: 50px;
	border-radius: 60px;
}

.login {
	width: 320px;
	padding: 30px;
	padding-top: 120px;
}

.login__field {
	padding: 20px 0px;
	position: relative;
}

.login__icon {
	position: absolute;
	color: #1c92d2;
}

.login__input {
	border: none;
	/*border-bottom: 2px solid #D1D1D4;*/
	background: none;
	/*padding: 10px;*/
	padding-left: 24px;
	font-weight: 700;
	width: 75%;
	transition: 0.2s;
}

.login__input:active,
.login__input:focus,
.login__input:hover {
	outline: none;
	border-bottom-color: #1c92d2;
}

.login__submit {
	background: #fff;
	font-size: 14px;
	margin-top: 30px;
	padding: 16px 20px;
	border-radius: 26px;
	border: 1px solid #d4d3e8;
	text-transform: uppercase;
	font-weight: 700;
	display: flex;
	align-items: center;
	width: 76%;
	color: #1c92d2;
	box-shadow: 0px 2px 2px #1c92d2;
	cursor: pointer;
	transition: 0.2s;
}

.social-login {
	position: absolute;
	height: 140px;
	width: 160px;
	text-align: center;
	bottom: 0px;
	right: 0px;
	color: white;
	font-size: 14px;
}

:deep(.el-link, .el-link.el-link--default:hover) {
	color: white;
}
</style>
