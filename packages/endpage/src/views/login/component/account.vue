<template>
	<el-form ref="loginFormRef" size="large" class="login-content-form" :model="loginData" :rules="loginData.loginRules">
		<el-form-item prop="stuNum" class="login-animation1">
			<el-input type="text" :placeholder="$t('message.account.accountPlaceholder1')" v-model="loginData.stuNum" clearable autocomplete="off">
				<template #prefix>
					<el-icon class="el-input__icon"><ele-User /></el-icon>
				</template>
			</el-input>
		</el-form-item>
		<el-form-item prop="password" class="login-animation2">
			<el-input
				type="password"
				:placeholder="$t('message.account.accountPlaceholder2')"
				v-model="loginData.password"
				autocomplete="off"
				@input="setPs"
				clearable
			>
				<template #prefix>
					<el-icon class="el-input__icon"><ele-Unlock /></el-icon>
				</template>
			</el-input>
		</el-form-item>
		<el-form-item class="login-animation3" prop="render">
			<el-col :span="15">
				<el-input
					type="text"
					maxlength="4"
					:placeholder="$t('message.account.accountPlaceholder3')"
					v-model="loginData.render"
					clearable
					autocomplete="off"
				>
					<template #prefix>
						<el-icon class="el-input__icon"><ele-Position /></el-icon>
					</template>
				</el-input>
			</el-col>
			<el-col :span="1"></el-col>
			<el-col :span="8">
				<img ref="Render" @click="changRender()" class="login-content-code" :src="Login.render"/>
			</el-col>
		</el-form-item>
		<el-form-item class="login-animation4">
			<el-button type="primary" class="login-content-submit" round @click="submitFormLogin(loginFormRef)" :loading="loginIng">
				<span>{{ $t('message.account.accountBtnText') }}</span>
			</el-button>
		</el-form-item>
		<div class="font12 mt30 login-animation4 login-msg">{{ $t('message.mobile.msgText') }}</div>
	</el-form>
</template>

<script lang="ts" setup>
import {  reactive, computed ,ref} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';
import { useThemeConfig } from '/@/stores/themeConfig';
import { initFrontEndControlRoutes } from '/@/router/frontEnd';
import { initBackEndControlRoutes } from '/@/router/backEnd';
import { Session } from '/@/utils/storage';
import { formatAxis } from '/@/utils/formatTime';
import { NextLoading } from '/@/utils/loading';
import { validatorPassword, validatorRender } from '@tommyzf/common';
import md5 from 'js-md5';
import Login from '/@/api/login'
import { useUserInfo } from '/@/stores/userInfo'

const { t } = useI18n();
const storesThemeConfig = useThemeConfig();
const { themeConfig } = storeToRefs(storesThemeConfig);
const storesUserInfo = useUserInfo();
  
const route = useRoute();
const router = useRouter();
const loginIng = ref(false);
const loginFormRef = ref();
// 时间获取
const currentTime = computed(() => {
	return formatAxis(new Date());
});
const Render = ref(null);
const loginData = reactive({
	stuNum: Session.getCookie('yourStuNum') || 'admin',
	password: Session.getCookie('yourPassword') || 'pzhuweb123',
	render: '',
	loginRules: { 
		stuNum: [{ required: true, trigger: 'blur' }],
		password: [{ validator: validatorPassword, trigger: 'blur' }],
		render: [{ validator: validatorRender2, trigger: 'blur' }],
	},
});
function validatorRender2(rule, value, callback) {
	if (value && value.length !==0) {
		callback();
	} else {
		callback(new Error('请输入计算结果'));
	}
}
const setPs = () => {
	Session.setCookie('yourPassword', '');
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
			Login
				.login( 
					{
						id: loginData.stuNum,
						password: mylogin(),
						code: loginData.render
					},
					loginData.render
				)
				.then(async (res) => {
					loginIng.value = false;
					if (res.success) {
						// store.state.userInfo.isTourist = false
						// store.state.userInfo.id = loginData.stuNum
						Session.set('token',res.data.token);
						if (!Session.getCookie('yourPassword')) {
							Session.setCookie('yourPassword', md5(loginData.password));
						}
						
						Session.setCookie('yourStuNum', loginData.stuNum);
						//storeuserinfo
						storesUserInfo.setUserInfos(res.data)
						if (!themeConfig.value.isRequestRoutes) {
							// 前端控制路由，2、请注意执行顺序
							await initFrontEndControlRoutes();
							signInSuccess();
						} else {
							// 模拟后端控制路由，isRequestRoutes 为 true，则开启后端控制路由
							// 添加完动态路由，再进行 router 跳转，否则可能报错 No match found for location with path "/"
							await initBackEndControlRoutes();
							// 执行完 initBackEndControlRoutes，再执行 signInSuccess
							signInSuccess();
						}
					} else {
						changRender();
						loginData.render = '';
					}
				}).catch(() => {
					loginIng.value = false;
				})
		} else {
			ElMessage({ 
				type: 'error',
				message: '请完善信息 !!!',
			});
			return false;
		}
	});
};
function changRender() {
	Render.value.src = Render.value.src.split('?')[0] + '?' + Math.floor(Math.random(10) * 10);
}
// 登录成功后的跳转
const signInSuccess = () => {
	// 初始化登录成功时间问候语
	let currentTimeInfo = currentTime.value;
	// 登录成功，跳到转首页
	// 如果是复制粘贴的路径，非首页/登录页，那么登录成功后重定向到对应的路径中
	if (route.query?.redirect) {
		router.push({
			path: <string>route.query?.redirect,
			query: Object.keys(<string>route.query?.params).length > 0 ? JSON.parse(<string>route.query?.params) : '',
		}); 
	} else {
		router.push('/');
	}
	// 登录成功提示
	// 关闭 loading
	// state.loading.signIn = true;
	const signInText = t('message.signInText');
	ElMessage.success(`${currentTimeInfo}，${signInText}`);
	// 添加 loading，防止第一次进入界面时出现短暂空白
	NextLoading.start();
};

</script>

<style scoped lang="scss">
.login-content-form {
	.login-msg {
		color: var(--el-text-color-placeholder);
	}
	margin-top: 20px;
	@for $i from 1 through 4 {
		.login-animation#{$i} {
			opacity: 0;
			animation-name: error-num;
			animation-duration: 0.5s;
			animation-fill-mode: forwards;
			animation-delay: calc($i/10) + s;
		}
	}
	.login-content-password {
		display: inline-block;
		width: 20px;
		cursor: pointer;
		&:hover {
			color: #909399;
		}
	}
	.login-content-code {
		width: 100%;
		padding: 0;
		font-weight: bold;
		letter-spacing: 5px;
	}
	.login-content-submit {
		width: 100%;
		letter-spacing: 2px;
		font-weight: 300;
		margin-top: 15px;
	}
}
</style>
