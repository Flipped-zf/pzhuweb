<template>
	<div class="system-edit-user-container">
		<div class="headTip">编辑个人信息</div>
		<el-divider>
			<el-icon><Edit /></el-icon>
		</el-divider>
		<div class="content" v-loading="loading">
			<div class="divInfo" ref="divInfo">
				<el-form label-position="right" ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" id="demo-ruleForm" size="large">
					<el-form-item label="联系方式" prop="phone">
						<el-input v-model="ruleForm.phone" />
					</el-form-item>
					<el-form-item label="学院专业 " prop="schoolMajor">
						<el-cascader v-model="ruleForm.schoolMajor" :options="data.SchoolMajorOptions" />
					</el-form-item>
					<el-form-item label="研究方向" prop="domain">
						<el-cascader v-model="ruleForm.domain" :options="data.DomainOptions" />
					</el-form-item>
					<el-form-item label="个人简介" prop="introduction">
						<el-input v-model="ruleForm.introduction" type="textarea" placeholder="Please input" :autosize="{ minRows: 2, maxRows: 4 }" />
					</el-form-item>
				</el-form>
			</div>
			<div class="divTx" @click="data.imageDialog = !data.imageDialog">
				<el-tooltip content="点击更换头像" placement="bottom" effect="light">
					<el-avatar :size="100" :src="data.src" />
				</el-tooltip>
			</div>
			<p align="right" style="padding-right: 30px">
				<el-button type="primary" @click="handelSave">提交</el-button>
			</p>
		</div>
		<el-dialog title="图片上传" v-model="data.imageDialog" width="900px">
			<cropper-image-upload :imgUrl="data.src" @uploadImgSuccess="uploadImgSuccessHandler"></cropper-image-upload>
		</el-dialog>
	</div>
</template>

<script setup lang="ts">
import { Edit } from '@element-plus/icons-vue';
import { onMounted, reactive, ref } from 'vue';
import { Back, TimelineMax, Bounce } from 'gsap';
// import CropperImageUpload from '../cropperUtil/components/cropper-image-upload.vue';
import { CropperImageUpload } from '@tommyzf/common';
import qiniu from '../../common/qiniu';
import request from '/@/api/users';
import { ElMessage } from 'element-plus';
import { ElNotification } from 'element-plus';
import Cookies from 'js-cookie';
import { useRouter } from 'vue-router';

interface RuleFormRow {
	userName: string;
	email: string;
	phone: string;
	major: number;
	domain: number;
	introduction: string;
}
const router = new useRouter();
const ruleFormRef = ref(null);
const divInfo = ref(null);
const loading = ref(false);
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
	src: '',
	imageDialog: false,
	loading: false,
});
const ruleForm = reactive({
	phone: '',
	schoolMajor: [],
	domain: [],
	introduction: '',
});
axios.get(base.getInitInfo).then((res) => {
	if (res.data.success) {
		ruleForm.phone = res.data.data.phone;
		ruleForm.introduction = res.data.data.description;
		data.src = res.data.data.avatar || data.src;
		ruleForm.schoolMajor = [res.data.data.school, res.data.data.major];
		ruleForm.domain = [res.data.data.domain];
	}
});
axios.get(base.getInitMessage).then((res) => {
	if (res.data.success) {
		data.SchoolMajorOptions = res.data.data.schoolmajor;
		data.DomainOptions = res.data.data.domain;
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
	phone: [{ required: true, validator: validatorPhone, trigger: 'blur' }],
	schoolMajor: [{ required: true }],
	domain: [{ required: true }],
	introduction: [{ required: true, validator: validatorDescription, trigger: 'blur' }],
});

onMounted(() => {
	let tl = new TimelineMax();
	tl.from('.divTx', 1.5, {
		opacity: 0,
		x: 200,
		duration: 1.5,
		ease: Back.easeInOut,
	}).from(divInfo.value, 1, { opacity: 0, x: -100, ease: Bounce.easeOut }, 1);
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
						axios
							.post(base.uploadUserInfo, {
								phone: ruleForm.phone,
								schoolMajor: ruleForm.schoolMajor,
								domain: ruleForm.domain[0],
								description: ruleForm.introduction,
								avatar: res.key,
								status: 1,
							})
							.then((res) => {
								if (res.data.success) {
									data.loading = false;
									ElMessage({
										message: '信息保存成功',
										type: 'success',
									});
									setTimeout(() => {
										router.push('/user/article');
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
				axios
					.post(base.uploadUserInfo, {
						phone: ruleForm.phone,
						schoolMajor: ruleForm.schoolMajor,
						domain: ruleForm.domain[0],
						description: ruleForm.introduction,
						avatar: data.src,
						status: 0,
					})
					.then((res) => {
						if (res.data.success) {
							ElMessage({
								message: '信息保存成功',
								type: 'success',
							});
							loading.value = false;
							setTimeout(() => {
								router.push('/user/article');
							}, 500);
						}
						data.loading = false;
					});
			}
		}
	});
};
</script>

<style>
.el-cascader--large {
	width: 80%;
}
@media (max-width: 800px) {
	.el-cascader--large {
		width: 100%;
	}
}
</style>

<style scoped lang="less">
.changeInfo {
	margin: 200px auto;
	width: 800px;
	background-color: white;
	border-radius: 10px;
	padding: 10px;
	.headTip {
		font-size: 30px;
		font-weight: bold;
		color: gray;
		padding: 5px 10px 0;
	}
	.content {
		position: relative;
		transform-style: preserve-3d;
		perspective: 800px;
		padding-left: 70px;
		.divTx {
			position: absolute;
			top: -150px;
			right: 90px;
			transform: translateZ(100px);
			box-shadow: 2px 4px 16px gray;
			border-radius: 50%;
		}
		.divTx:hover {
			cursor: pointer;
		}
	}
}
@media screen and (max-width: 800px) {
	.changeInfo {
		width: 100%;
		.content {
			padding-left: 0;
			.divTx {
				right: 30px;
			}
		}
	}
}
</style>
