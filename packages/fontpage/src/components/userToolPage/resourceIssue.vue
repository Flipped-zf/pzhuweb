<template>
	<div class="resourceIssue-container" v-loading="issueData.loading">
		<div class="header">资源分享 <small>(附件选传)</small></div>
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
				<div class="imgupload" @mouseleave="myhidden = true" @mouseenter="myhidden = false">
					<el-upload
						class="upload-demo"
						drag
						:limit="1"
						:on-preview="handlePictureCardPreview"
						:on-remove="handleRemove"
						:on-change="handlechange"
						:auto-upload="false"
						v-if="!myFlag"
						v-loading="mygo"
					>
						<el-icon class="el-icon--upload"><upload-filled /></el-icon>
						<div class="el-upload__text">Drop file here or <em>click to upload</em></div>
					</el-upload>
					<div v-else class="fengmain">
						<img :src="issueData.posterlink" />
						<div
							class="fengmainlayout"
							:style="{
								opacity: myhidden ? 0 : 1,
							}"
						>
							<el-icon @click="handleRemove"><Delete /></el-icon>
							<el-icon @click="handlePictureCardPreview"><Plus /></el-icon>
						</div>
					</div>
				</div>
				<div class="fujian">
					<el-upload v-if="!myFlag2" ref="uploadp" :auto-upload="false" accept=".zip" :limit="1" :on-change="handlechange2">
						<el-tooltip class="box-item" effect="dark" content="请上传压缩包" placement="bottom">
							<el-button type="primary" :icon="Upload">上传成果附件</el-button>
						</el-tooltip>
					</el-upload>
					<div v-else class="fujianlist">
						<div class="item">
							<el-icon><DocumentAdd /></el-icon><a :href="issueData.attachment" target="_blank">附件</a>
						</div>
						<div class="fujianclose" @click="handleRemove2">
							<el-icon><Close /></el-icon>
						</div>
					</div>
				</div>
			</div>
			<el-dialog v-model="dialogVisible">
				<img :src="issueData.posterlink" alt="Preview Image" style="width: 100%" />
			</el-dialog>
		</div>
		<el-button round type="primary" class="fabu" @click="submitForm(rformRef)" :loading="issueData.loading"> 发布 </el-button>
	</div>
</template>

<script setup>
import { Delete, Plus, Upload, DocumentAdd, Close, UploadFilled } from '@element-plus/icons-vue';
import { useRoute, useRouter } from 'vue-router';
import { reactive, ref, computed } from 'vue';
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
	myFile2: null,
	posterlink: null, // 封面图的cdn地址
	attachment: null, // 附件的cdn地址
	id: routes.query.id || 0, // 成果Id
	title: null,
	achievementlink: null,
	abstract: null,
	typeid: null,
	userid: Cookies.get('yourStuNum'),
});
const rformRef = ref(null);
const rules = reactive({
	link: [{ required: false, trigger: 'blur' }],
	title: [{ required: true, message: 'Please input title', trigger: 'blur' }],
	abstract: [{ required: true, message: 'Please input !', trigger: 'blur' }],
	typeid: [{ required: true, message: 'Please input !', trigger: 'blur' }],
	date: [{ required: true, message: 'Please input !', trigger: 'blur' }],
});
function myvalidate() {
	return !!issueData.achievementlink && !!issueData.posterlink;
}
async function handelIssue() {
	issueData.loading = true;
	const data = {
		id: issueData.id,
		userid: Cookies.get('yourStuNum'),
		title: issueData.title,
		link: issueData.achievementlink,
		typeid: issueData.typeid,
		description: issueData.abstract,
		status: issueData.status,
		date: issueData.date.getTime(),
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
				message: '完善资源信息',
				type: 'error',
			});
		}
	});
};
aApi.getResourceIssue(issueData.id).then((res) => {
	console.log(res);
	if (res.success) {
		issueData.achievementType = res.data;
	} else {
		issueData.id = res.data.resource[0].id;
		issueData.userid = res.data.resource[0].userid;
		issueData.typeid = res.data.resource[0].typeid;
		issueData.title = res.data.resource[0].title;
		issueData.achievementlink = res.data.resource[0].link;
		issueData.abstract = res.data.resource[0].description;
		issueData.achievementType = res.data.resourceType;
		issueData.posterlink = res.data.resource[0].posterlink;
		issueData.attachment = res.data.resource[0].attachment;
		issueData.status = 2;
		issueData.date = res.data.resource[0].created_at ? new Date(res.data.resource[0].created_at) : new Date();
	}
});
const dialogVisible = ref(false);
const myFlag = computed(() => issueData.posterlink);
const myhidden = ref(true);
const mygo = ref(false);
const handlechange = async (uploadFile, uploadFiles) => {
	mygo.value = true;
	await qiniu(uploadFile)
		.then((res) => {
			aApi
				.uploadResourceCover({
					id: issueData.id,
					userid: issueData.userid,
					key: res.key,
					status: issueData.status,
				})
				.then((res) => {
					issueData.posterlink = res.data.posterlink;
					issueData.id = res.data.id;
					issueData.status = res.data.status;
					mygo.value = false;
				});
		})
		.catch((err) => {
			// status = false;
			mygo.value = true;
		});
};
const handleRemove = () => {
	aApi
		.delResourceCover({
			id: issueData.id,
			posterlink: issueData.posterlink,
		})
		.then((res) => {
			issueData.posterlink = '';
		});
};
const handlePictureCardPreview = () => {
	dialogVisible.value = true;
};

const myFlag2 = computed(() => issueData.attachment);
const handlechange2 = async (uploadFile) => {
	await qiniu(uploadFile)
		.then((res) => {
			aApi
				.uploadResourceAttachment({
					id: issueData.id,
					userid: issueData.userid,
					key: res.key,
					status: issueData.status,
				})
				.then((res) => {
					issueData.attachment = res.data.attachment;
					issueData.id = res.data.id;
					issueData.status = res.data.status;
				});
		})
		.catch((err) => {
			// status = false;
		});
};
const handleRemove2 = () => {
	aApi
		.delResourceAttachment({
			id: issueData.id,
			attachment: issueData.attachment,
		})
		.then((res) => {
			issueData.attachment = '';
		});
};
</script>
<style lang="less">
@media (max-width: 800px) {
	.bodyLeft {
		.el-form-item__label {
			width: 20px !important;
		}

		.el-form-item__content {
			margin-left: 5px !important;
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
		display: flex;
		justify-content: space-around;
		align-items: center;
		flex-direction: column;
		.fujian {
			margin-top: 10px;
			width: 100%;
			.fujianlist {
				width: 100%;
				height: 30px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				transition: all 0.5s;
				color: #606266;
				line-height: 18px;
				padding: 0 10px 0;
				.fujianclose {
					opacity: 0;
					cursor: pointer;
				}
				.item a {
					color: #606266;
					margin-left: 10px;
					font-size: 20px;
				}
				.item:hover a {
					color: #48a2ff;
				}
				&:hover {
					background-color: #f5f7fa;
					.fujianclose {
						opacity: 1;
					}
				}
			}
		}
		.imgupload {
			width: 80%;
			// height: 230px;
			.fengmain {
				cursor: pointer;
				width: 100%;
				height: 230px;
				position: relative;
				border-radius: 10px;
				overflow: hidden;
				img {
					width: 100%;
					height: 100%;
					object-fit: cover;
				}
				.fengmainlayout {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					background-color: rgba(0, 0, 0, 0.5);
					opacity: 0;
					transition: opacity 0.3;
					display: inline-flex;
					justify-content: space-around;
					align-items: center;
					color: #fff;
					font-size: 25px;
				}
			}
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
