<template>
	<el-row justify="center">
		<el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
			<el-card shadow="always" v-loading="loading">
				<el-tabs v-model="activeName" class="demo-tabs" @tab-change="handletab">
					<el-tab-pane label="首页配置项" name="1">
						<el-table :data="tableData.filter((item) => !!item.title)" stripe style="width: 100%">
							<el-table-column prop="title" label="标题" width="180" />
							<el-table-column prop="desc" min-width="200px" label="描述" />
							<el-table-column label="操作" fixed="right" width="100">
								<template #default="scope">
									<el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
								</template>
							</el-table-column>
						</el-table>
					</el-tab-pane>
					<el-tab-pane label="修改配置项" name="2" disabled>
						<el-form ref="ruleFormRef" :model="form" label-width="120px" :rules="rules">
							<el-row justify="center">
								<el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18" class="mb20"
									><el-form-item label="标题" prop="title"> <el-input v-model="form.title" /> </el-form-item
								></el-col>
								<el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18" class="mb20"
									><el-form-item label="描述" prop="description">
										<el-input :autosize="{ minRows: 4, maxRows: 10 }" v-model="form.description" type="textarea" /> </el-form-item
								></el-col>
							</el-row>
							<el-row justify="center">
								<el-upload
									:before-upload="handleChange"
									v-model:file-list="form.cover"
									:limit="form.num"
									:on-exceed="handleExceed"
									class="upload-demo"
									list-type="picture-card"
								>
									<el-icon class="el-icon--upload"><Plus /></el-icon>
									<div class="el-upload__text">上传{{ form.num }}张图片</div>
									<template #file="{ file }">
										<div>
											<img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
											<span class="el-upload-list__item-actions">
												<span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
													<el-icon><zoom-in /></el-icon>
												</span>
												<span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
													<el-icon><Delete /></el-icon>
												</span>
											</span>
										</div>
									</template>
								</el-upload>
								<el-dialog v-model="dialogVisible">
									<img :src="dialogImageUrl" alt="Preview Image" style="width: 100%" />
								</el-dialog>
							</el-row>
						</el-form>
						<el-row justify="center" class="mt20"><el-button type="primary" @click="handlesave">保存</el-button></el-row>
					</el-tab-pane>
				</el-tabs>
			</el-card>
		</el-col>
	</el-row>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import edithome from '/@/api/edithome';
import Qiniu from '/@/api/qiniu';
import { Delete, Plus, ZoomIn } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import qiniu from '/@/utils/qiniu.js';

const activeName = ref('1');
const tableData = ref([]);
const loading = ref(false);
const ruleFormRef = ref(null);
const delFileList = ref([]);
const form = reactive({
	id: 1,
	title: '',
	description: '',
	cover: [],
	num: 0,
});
const rules = reactive({
	title: [{ required: true }],
	description: [{ required: true }],
});
const handleEdit = (index: number, row) => {
	activeName.value = '2';
	form.title = row.title;
	form.description = row.desc;
	form.cover = tableData.value
		.filter((item) => item.order == row.order)
		.map((item) => {
			return {
				name: '',
				url: item.cover,
			};
		});
	form.num = form.cover.length;
	form.id = row.id;
};

const initdata = () => {
	edithome.getedithome().then((res) => {
		tableData.value = res.baseInfo;
	});
};
initdata();
const handletab = () => {
	initdata();
};
const dialogImageUrl = ref('');
const dialogVisible = ref(false);
const disabled = ref(false);

const handleRemove = (file) => {
	// Qiniu.delfile(file.url).then((res) => {
	// 	form.cover = form.cover.filter((item) => item.url !== file.url);
	// });
	form.cover = form.cover.filter((item) => item.url !== file.url);
	delFileList.value.push(file.url);
};

const handleExceed = () => {
	ElMessage({
		message: `只上传${form.num}张照片`,
		type: 'error',
	});
};
const handleChange = (file) => {
	console.log(file);
	loading.value = true;
	qiniu(file).then((res) => {
		form.cover.push({
			name: '',
			url: 'http://img.pzhuweb.cn/' + res.key,
		});
		loading.value = false;
	});
	return false;
};
const handlePictureCardPreview = (file) => {
	dialogImageUrl.value = file.url!;
	dialogVisible.value = true;
};
const handlesave = () => {
	ruleFormRef.value.validate((valid) => {
		if (valid && form.cover.length == form.num) {
			loading.value = true;
			edithome
				.updateHomeInfo({
					id: form.id,
					title: form.title,
					desc: form.description,
					cover: form.cover.map((item) => item.url),
					num: form.num,
				})
				.then((res) => {
					loading.value = false;
				});
			for (let i = 0; i < delFileList.value.length; i++) {
				Qiniu.delfile({ key: delFileList.value[i] }).then((res) => {
					console.log(res);
				});
			}
		} else {
			ElMessage({
				message: `完善信息`,
				type: 'error',
			});
		}
	});
};
</script>

<style scoped lang="less"></style>
