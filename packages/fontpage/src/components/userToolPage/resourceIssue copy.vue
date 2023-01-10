<template>
	<div class="resourceIssue-container" v-loading="issueData.loading">
		<div class="header">资源分享 <small>(链接或附件二选一)</small></div>
		<div class="body">
			<div class="bodyLeft">
				<el-form ref="rformRef" :model="issueData" label-width="120px" size="large" :rules="rules">
					<el-form-item prop="link">
						<el-input v-model="issueData.achievementlink" placeholder="分享成果链接：http://www.pzhuweb.cn" />
					</el-form-item>
					<el-form-item prop="title">
						<el-input v-model="issueData.title" placeholder="请输入成果标签" />
					</el-form-item>
					<el-form-item prop="abstract">
						<el-input v-model="issueData.abstract" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea" placeholder="资源描述(120字以内)" />
					</el-form-item>
					<el-form-item prop="typeid" label="分类 ">
						<el-radio-group v-model="issueData.typeid">
							<el-radio class="myType" :label="item.id" border v-for="(item, index) in issueData.achievementType" :key="index + 'v'">
								{{ item.name }}
							</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item prop="date" label="日期 ">
						<el-date-picker v-model="issueData.date" type="date" placeholder="请选择日期" :default-value="issueData.date" />
					</el-form-item>
				</el-form>
			</div>
			<div class="bodyRight">
				<el-upload
					:file-list="orientFileList.fenmian"
					ref="uploadf"
					class="myDemoUpload"
					drag
					:auto-upload="false"
					:limit="1"
					:on-exceed="handleExceedf"
					accept="image/jpeg,image/png"
					list-type="picture"
					:on-change="handleChange1"
					:on-preview="handlePictureCardPreview"
					:on-remove="remove1"
				>
					<el-icon class="el-icon--upload">
						<upload-filled />
					</el-icon>
					<div class="el-upload__text">Drop file here or <em>click to upload</em></div>
					<template #tip>
						<div class="el-upload__tip">请上传类型为 png 或 jpg 的封面图</div>
					</template>
				</el-upload>
				<el-dialog v-model="dialogVisible">
					<img style="width: 100%" :src="dialogImageUrl" alt="Preview Image" />
				</el-dialog>
				<div class="fujian">
					<el-upload
						ref="uploadp"
						class="upload-demo"
						action="https://jsonplaceholder.typicode.com/posts/"
						:auto-upload="false"
						accept=".pdf"
						:limit="1"
						:on-exceed="handleExceedp"
						:on-change="handleChange2"
						:file-list="orientFileList.fujian"
						:on-remove="remove2"
					>
						<el-tooltip class="box-item" effect="dark" content="请上传pdf格式的文件" placement="bottom">
							<el-button type="primary" :icon="Upload">上传成果附件</el-button>
						</el-tooltip>
					</el-upload>
				</div>
			</div>
		</div>
		<el-button round type="primary" class="fabu" @click="submitForm(rformRef)" :loading="issueData.loading"> 发布 </el-button>
	</div>
</template>

<script setup>
import { UploadFilled, Upload } from '@element-plus/icons-vue';
import { useRoute, useRouter } from 'vue-router';
import { reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import aApi from '../../api/resourceIssue';
import qiniu from '../../common/qiniu';
import Cookies from 'js-cookie';

const routes = useRoute();
const router = useRouter();
// console.log(routes.query.id)
const issueData = reactive({
	status: 1, // 默认1数据添加状态，2数据更新状态,
	achievementType: [],
	loading: false,
	date: new Date(), // 成果发布日期
	myFile1: null,
	myFile2: null,
	posterlink: null, // 封面图的cdn地址
	attachment: null, // 附件的cdn地址
	id: routes.query.id || 0, // 成果Id
	title: null,
	achievementlink: null,
	abstract: null,
	typeid: null,
});
const rformRef = ref(null);
const rules = reactive({
	link: [{ required: false, trigger: 'blur' }],
	title: [{ required: true, message: 'Please input title', trigger: 'blur' }],
	abstract: [{ required: true, message: 'Please input !', trigger: 'blur' }],
	typeid: [{ required: true, message: 'Please input !', trigger: 'blur' }],
	date: [{ required: true, message: 'Please input !', trigger: 'blur' }],
});
const orientFileList = reactive({
	fenmian: [],
	fujian: [],
});
const dialogVisible = ref(false);
const dialogImageUrl = ref('');
function myvalidate() {
	const flag1 = !!issueData.myFile1 || orientFileList.fenmian[0];
	const flag2 = !!issueData.myFile2 || orientFileList.fujian[0];
	return flag1 && (flag2 || issueData.achievementlink);
}
async function handelIssue() {
	issueData.loading = true;
	let status = true;
	if (issueData.myFile2) {
		await qiniu(issueData.myFile2)
			.then((res) => {
				issueData.attachment = res.key;
			})
			.catch((err) => {
				status = false;
			});
	}
	if (issueData.myFile1) {
		await qiniu(issueData.myFile1)
			.then((res) => {
				issueData.posterlink = res.key;
			})
			.catch((err) => {
				status = false;
			});
	}
	if (!status) {
		ElMessage({
			message: '发布失败!!!',
			type: 'error',
		});
		issueData.loading = false;
		return;
	}
	const data = {
		id: issueData.id,
		userid: Cookies.get('yourStuNum'),
		title: issueData.title,
		achievementlink: issueData.achievementlink,
		typeid: issueData.typeid,
		introduction: issueData.abstract,
		status: issueData.status,
		date: issueData.date.getTime(),
		posterlink: issueData.posterlink,
		attachment: issueData.attachment,
	};
	await aApi.uploadResource(data).then((res) => {
		if (res.success) {
			setTimeout(() => {
				issueData.loading = false;
				ElMessage({
					message: '成果发布成功',
					type: 'success',
				});
				router.push('/resourceshare');
			}, 500);
		} else {
			issueData.loading = false;
			ElMessage({
				message: '发布失败!!!',
				type: 'error',
			});
		}
	});
}
const submitForm = async (formEl) => {
	if (!formEl) return;
	await formEl.validate((valid, fields) => {
		if (valid && myvalidate()) {
			handelIssue();
		} else {
			console.log('error submit!', fields);
			ElMessage({
				showClose: true,
				message: '完善成果信息',
				type: 'error',
			});
		}
	});
};
aApi.getResourceIssue(issueData.id).then((res) => {
	if (res.success) {
		issueData.achievementType = res.data;
	} else {
		issueData.id = res.data.resource[0].id;
		issueData.typeid = res.data.resource[0].typeid;
		issueData.title = res.data.resource[0].title;
		issueData.achievementlink = res.data.resource[0].link;
		issueData.abstract = res.data.resource[0].description;
		issueData.achievementType = res.data.resourceType;
		issueData.posterlink = res.data.resource[0].posterlink;
		issueData.attachment = res.data.resource[0].attachment;
		orientFileList.fenmian = [
			{
				name: issueData.title,
				url: issueData.posterlink,
			},
		];
		if (issueData.attachment) {
			orientFileList.fujian = [
				{
					name: issueData.title,
					url: issueData.attachment,
				},
			];
		}

		issueData.status = 2;
		issueData.date = new Date(res.data.resource[0].created_at) || new Date();
	}
});
const uploadf = ref(null);
const uploadp = ref(null);

function handleChange1(file1) {
	issueData.myFile1 = file1;
}
function handleChange2(file2) {
	issueData.myFile2 = file2;
}
function handlePictureCardPreview() {
	if (issueData.myFile1) {
		dialogImageUrl.value = issueData.myFile1.url;
	} else {
		dialogImageUrl.value = issueData.posterlink;
	}
	dialogVisible.value = true;
}
function remove1() {
	issueData.posterlink = '';
	orientFileList.fenmian = [];
}
function remove2() {
	orientFileList.fujian = [];
	issueData.attachment = '';
}
function handleExceedf(files, uploadFiles) {
	ElMessage.warning(`The limit is 1, you selected ${files.length} files this time, add up to ${files.length + uploadFiles.length} totally`);
	uploadf.value?.clearFiles();
	const file = files[0];
	uploadf.value?.handleStart(file);
	issueData.myFile1 = file;
}
function handleExceedp(files, uploadFiles) {
	ElMessage.warning(`The limit is 1, you selected ${files.length} files this time, add up to ${files.length + uploadFiles.length} totally`);
	uploadp.value?.clearFiles();
	const file = files[0];
	uploadp.value?.handleStart(file);
	issueData.myFile2 = file;
}
</script>
<style lang="less">
.bodyRight .el-upload__tip {
	text-align: center;
}

.bodyRight .el-upload {
	margin: 0 auto;
}

@media (max-width: 800px) {
	.bodyLeft {
		.el-form-item__label {
			width: 20px !important;
		}

		.el-form-item__content {
			margin-left: 5px !important;
		}
	}

	.bodyRight {
		.el-upload-list {
			width: 100%;
		}
	}
}
</style>
<style scoped lang="less">
.resourceIssue-container {
	width: 1200px;
	background-color: #fff;
	border-radius: 10px;
	margin: 20px auto 0;
	padding: 25px;

	.header {
		color: rgba(0, 0, 0, 0.65);
		width: 100%;
		height: 80px;
		font-size: 30px;
		font-weight: 600;
		line-height: 80px;
	}

	.fabu {
		display: block;
		width: 200px;
		padding: 5px 0;
		margin: 0 auto;
	}

	.body {
		width: 100%;
		display: flex;
	}

	.bodyLeft {
		width: 50%;

		.myType {
			margin: 10px 5px;
		}
	}

	.bodyRight {
		width: 50%;

		.myDemoUpload {
			display: flex;
			align-items: center;
			flex-direction: column;
		}

		.fujian {
			width: 100%;
			padding: 50px;
		}
	}
}

@media (max-width: 900px) {
	.resourceIssue-container {
		width: 100%;

		.header {
			font-size: 20px;
		}

		.body {
			flex-direction: column-reverse;
		}

		.bodyLeft {
			width: 100%;

			.fabu {
				margin-left: 20px;
			}
		}

		.bodyRight {
			padding-bottom: 50px;
			width: 100%;
		}
	}
}
</style>
