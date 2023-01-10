<template>
	<div class="system-add-user-container">
		<el-form status-icon :model="ruleForm" ref="ruleFormRef" size="default" :rules="rules" label-width="90px">
			<el-row :gutter="35">
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<div style="display: flex; justify-content: center; align-items: center" @click="data.imageDialog = !data.imageDialog">
						<el-tooltip content="点击更换头像" placement="right" effect="light">
							<el-avatar :size="100" :src="data.src" />
						</el-tooltip>
					</div>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="学号 :" prop="id">
						<el-input v-model="ruleForm.id" placeholder="请输入学号" clearable></el-input>
					</el-form-item>
					<el-form-item label="姓名 :" prop="name">
						<el-input v-model="ruleForm.name" placeholder="请输入姓名" clearable></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter="35">
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="密码 :" prop="password">
						<el-input v-model="ruleForm.password" placeholder="请输入密码" type="password" clearable></el-input>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="确认密码 :" prop="passwordConfirm">
						<el-input v-model="ruleForm.passwordConfirm" placeholder="请确认密码" type="password" clearable></el-input>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="邮箱 :" prop="email">
						<el-input v-model="ruleForm.email" placeholder="请输入邮箱" clearable></el-input>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="联系方式 :" prop="phone">
						<el-input v-model="ruleForm.phone" placeholder="请输入联系方式" clearable></el-input>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="学院专业 :" prop="schoolMajor">
						<el-cascader v-model="ruleForm.schoolMajor" :options="data.SchoolMajorOptions" />
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="研究方向 :" prop="domain">
						<el-cascader v-model="ruleForm.domain" :options="data.DomainOptions" />
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="成员介绍" prop="introduction">
						<el-input v-model="ruleForm.introduction" type="textarea" placeholder="成员简介（20字以内）" maxlength="150"></el-input>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20">
					<div style="display: flex; align-items: center; justify-content: center; height: 100%">
						<el-button type="primary" @click="handelSave">提交</el-button>
					</div>
				</el-col>
			</el-row>
		</el-form>
		<el-dialog title="图片上传" v-model="data.imageDialog" width="900px">
			<cropper-image-upload :imgUrl="data.src" @uploadImgSuccess="uploadImgSuccessHandler"></cropper-image-upload>
		</el-dialog>
	</div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { CropperImageUpload } from '@tommyzf/common';
import qiniu from '/@/utils/qiniu.js';
import request from '/@/api/users';
import { ElMessage, ElNotification } from 'element-plus';
import Cookies from 'js-cookie';
import { useRouter } from 'vue-router';
import { validatorNum, validatorPassword } from '@tommyzf/common';

const router = useRouter();
const ruleFormRef = ref(null);
const loading = ref(false);
interface UserState {
	id: string;
	name: string;
	password: string;
	passwordConfirm: string;
	email: string;
	phone: string;
	schoolMajor: [];
	domain: [];
	introduction: '';
}
const ruleForm = reactive<UserState>({
	id: '',
	name: '',
	password: '',
	passwordConfirm: '',
	email: '468369392@qq.com',
	phone: '15328986407',
	schoolMajor: [],
	domain: [],
	introduction: '',
});
const data = reactive({
	SchoolMajorOptions: [
		{
			value: 1,
			label: '数学与计算机学院',
			children: [
				{ value: 5, label: '数据科学与大数据技术' },
				{ value: 4, label: '网络工程' },
				{ value: 3, label: '信息科学与技术' },
				{ value: 2, label: '计算机科学与技术' },
				{ value: 1, label: '软件工程' },
			],
		},
	],
	DomainOptions: [
		{ value: 1, label: '前端' },
		{ value: 2, label: '后端' },
		{ value: 3, label: '算法' },
		{ value: 4, label: '全栈' },
	],
	src: 'http://img.pzhuweb.cn/avatar',
	imageDialog: false,
});
request.initUserMajor().then((res) => {
	if (res.success) {
		data.SchoolMajorOptions = res.data.schoolmajor;
		data.DomainOptions = res.data.domain;
	}
});
// 联系方式验证
const validatorPhone = (rule, value, callback) => {
	const treg = /^[1-9]\d*$|^0$/;
	if (value && treg.test(value) === true) {
		callback();
	} else {
		callback('请输入11位的手机号');
	}
};
// 个人简介验证
const validatorDescription = (rule, value, callback) => {
	if (!value || value.length < 20) {
		callback();
	} else {
		callback('个人简介控制在20字以内');
	}
};
const rules = reactive({
	id: [{ validator: validatorNum, required: true }],
	name: [{ required: true }],
	password: [{ validator: validatorPassword, required: true }],
	passwordConfirm: [{ required: true }],
	email: [{ type: 'email', required: true }],
	phone: [{ required: true, validator: validatorPhone, trigger: 'blur' }],
	schoolMajor: [{ required: true }],
	domain: [{ required: true }],
	introduction: [{ required: true, validator: validatorDescription, trigger: 'blur' }],
});
const uploadImgSuccessHandler = function (state) {
	// console.log('上传成功')
	data.src = state || data.src;
	ElNotification({
		title: 'Success',
		message: '修改头像成功',
		type: 'success',
	});
	data.imageDialog = false;
};
// base64转换成Blob对象
const dataURLtoBlob = (dataurl) => {
	const arr = dataurl.split(','),
		mime = arr[0].match(/:(.*?);/)[1],
		bstr = atob(arr[1]);
	let n = bstr.length;
	const u8arr = new Uint8Array(n);
	// eslint-disable-next-line no-const-assign
	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}
	return new Blob([u8arr], { type: mime });
};
// 保存用户信息
const handelSave = (e) => {
	e.preventDefault();
	ruleFormRef.value.validate((valid) => {
		console.log(valid);
		if (valid) {
			loading.value = true;
			// 判断图片资源是本地的,还是第三方资源链接
			const strRegex = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/|www\.)/;
			const re = new RegExp(strRegex);
			if (!re.test(data.src)) {
				const dataBlob = dataURLtoBlob(data.src);
				const files = new File([dataBlob], Cookies.get('yourStuNum') + 'tx', {
					type: dataBlob.type,
				});
				qiniu(dataBlob)
					.then((res) => {
						request
							.addUserInfo({
								id: ruleForm.id,
								password: ruleForm.password,
								name: ruleForm.name,
								email: ruleForm.email,
								phone: ruleForm.phone,
								schoolMajor: ruleForm.schoolMajor,
								domain: ruleForm.domain[0],
								description: ruleForm.introduction,
								avatar: res.key,
								isCDN: 1,
							})
							.then((res) => {
								if (res.success) {
									loading.value = false;
									setTimeout(() => {
										router.replace('/system/user');
									}, 500);
								} else {
									ElMessage({
										message: '信息保存失败 !!!',
										type: 'error',
									});
								}
								loading.value = false;
							});
					})
					.catch((err) => {
						ElMessage({
							message: '头像保存失败 !!!',
							type: 'error',
						});
					});
			} else {
				request
					.addUserInfo({
						id: ruleForm.id,
						password: ruleForm.password,
						name: ruleForm.name,
						email: ruleForm.email,
						phone: ruleForm.phone,
						schoolMajor: ruleForm.schoolMajor,
						domain: ruleForm.domain[0],
						description: ruleForm.introduction,
						avatar: data.src,
						isCDN: 0,
					})
					.then((res) => {
						if (res.success) {
							loading.value = false;
							setTimeout(() => {
								router.replace('/system/user');
							}, 500);
						}
						loading.value = false;
					});
			}
		}
	});
};
</script>
<style scoped lang="less">
.system-add-user-container {
	width: 900px;
	margin: 100px auto;
}
@media screen and (max-width: 800px) {
	.system-add-user-container {
		width: 90%;
		margin: 100px auto;
	}
}
</style>
