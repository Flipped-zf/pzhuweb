<template>
	<el-card v-loading="loading">
		<el-tabs v-model="activeName" class="demo-tabs" @tab-change="handletab">
			<el-tab-pane label="文章列表" name="1">
				<el-table :data="tableData" stripe style="width: 100%">
					<el-table-column label="作者" prop="author" />
					<el-table-column label="标签" prop="tag" min-width="100px">
						<template #header>
							<el-select @change="handleTag" v-model="tag" class="m-2" placeholder="Select" size="small">
								<el-option v-for="item in tags" :key="item.value" :label="item.label" :value="item.value" />
							</el-select>
						</template>
						<template #default="scope">
							<el-tag type="success" effect="plain" disable-transitions>{{ scope.row.tag.name }}</el-tag>
						</template></el-table-column
					>
					<el-table-column label="相册名称" prop="name" min-width="200px">
						<template #default="scope">
							<el-link type="primary" @click="goalbums(scope.row.id, scope.row.name)">{{ scope.row.name }}</el-link>
						</template>
					</el-table-column>
					<el-table-column label="相册描述" prop="description" min-width="200px"></el-table-column>
					<el-table-column label="相片数量" prop="number"></el-table-column>
					<el-table-column label="发布时间" prop="createtime" min-width="125px" />
					<el-table-column fixed="right" min-width="100px">
						<template #header>
							<div class="flex" :style="{ justifyContent: 'center', alignItems: 'center' }">
								<el-input v-model="search" size="small" placeholder="Type to search" clearable />
								<el-tooltip class="box-item" effect="dark" content="点击搜索" placement="top">
									<el-icon @click="handleserch" class="cursor-pointer"><Search /></el-icon>
								</el-tooltip>
							</div>
						</template>
						<template #default="scope">
							<el-row align="middle" justify="space-between">
								<el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
								<el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
							</el-row>
						</template>
					</el-table-column>
				</el-table>
				<el-row justify="end" class="mt20">
					<el-pagination
						v-model:current-page="pageInfo.currentPage"
						v-model:page-size="pageInfo.pageSize"
						:page-sizes="[10, 15, 20]"
						layout="total, sizes, prev, pager, next, jumper"
						:total="pageInfo.total"
						@size-change="handleSizeChange"
						@current-change="handleCurrentChange"
					/>
				</el-row>
			</el-tab-pane>
			<el-tab-pane label="标签列表" name="2">
				<changeTag v-model:tags="tags"></changeTag>
			</el-tab-pane>
		</el-tabs>
		<el-dialog v-model="currentArticl.centerDialogVisible" title="确认删除这篇相册吗 ?" width="30%" center>
			<p align="center">{{ currentArticl.title + '(删除之后照片移入默认相册)' }}</p>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="currentArticl.centerDialogVisible = false">Cancel</el-button>
					<el-button type="primary" @click="ConfirmDel">Confirm</el-button>
				</span>
			</template>
		</el-dialog>
		<el-dialog v-model="dialogFormVisible" title="修改相册信息">
			<el-form :model="formInfo" label-width="150px" v-loading="dialogloading">
				<el-form-item label="相册名称">
					<el-input v-model="formInfo.name" autocomplete="off" placeholder="请输入相册名称" />
				</el-form-item>
				<el-form-item label="相册描述">
					<el-input v-model="formInfo.desc" type="textarea" placeholder="请输入相册描述(可选)"></el-input>
				</el-form-item>
				<el-form-item label="分类">
					<el-select v-model="formInfo.typeId" class="m-2" placeholder="Select">
						<el-option v-for="item in tags" :key="item.value" :label="item.label" :value="item.value" />
					</el-select>
				</el-form-item>
				<el-form-item label="相册状态">
					<el-switch v-model="formInfo.status" active-text="公开" inactive-text="私有" />
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="dialogFormVisible = false">Cancel</el-button>
					<el-button type="primary" @click="handelupdate"> Confirm </el-button>
				</span>
			</template>
		</el-dialog>
	</el-card>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import albumapi from '/@/api/managealbum';
import { formatDate } from '/@/utils/formatTime';
import { Search } from '@element-plus/icons-vue';
import changeTag from './component/changeTag.vue';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
interface article {
	id: number;
	author: string;
	tag: Object;
	name: string;
	description: string;
	number: number;
	createtime: string;
	typeid: number;
	status: number;
}
const search = ref('');
const tag = ref(0);
const pageInfo = reactive({
	currentPage: 1,
	pageSize: 10,
	total: 0,
});
const loading = ref(true);
const tableData = ref<article[]>([]);
const tags = ref([]);

const dialogFormVisible = ref(false);
const dialogloading = ref(false);
const formInfo = reactive({
	id: 0,
	name: '',
	desc: '',
	typeId: 0,
	status: false,
});
const handelupdate = () => {
	if (!formInfo.name) {
		ElMessage({
			type: 'warning',
			message: '请输入相册名称',
		});
		return;
	}
	dialogloading.value = true;
	albumapi
		.updateAlbum({
			id: formInfo.id,
			typeId: formInfo.typeId,
			name: formInfo.name,
			desc: formInfo.desc,
			status: Number(formInfo.status),
		})
		.then((res) => {
			if (res.success) {
				dialogFormVisible.value = false;
				initData();
			}
			dialogloading.value = false;
		});
};
const handleEdit = (index: number, row: article) => {
	formInfo.id = row.id;
	formInfo.name = row.name;
	formInfo.desc = row.description;
	formInfo.typeId = row.typeid;
	// formInfo.status = row.status;
	dialogFormVisible.value = true;
	// router.push({ path: '/editarticle', query: { id: row.id } });
};

const currentArticl = reactive({
	centerDialogVisible: false,
	title: '',
	id: 0,
});
const handleDelete = (index: number, row: article) => {
	currentArticl.title = row.name;
	currentArticl.id = row.id;
	currentArticl.centerDialogVisible = true;
};
const ConfirmDel = async () => {
	await albumapi.delAlbum({ id: currentArticl.id }).then((res) => {
		if (res.success) {
			currentArticl.centerDialogVisible = false;
		}
	});
	initData();
};

const router = useRouter();
const activeName = ref('1');
const goalbums = (id, name) => {
	// activeName.value = '2';
	router.push({ path: '/editalbum', query: { id, tagsViewName: name } });
};
const handletab = () => {
	initData();
};

const handleSizeChange = (val: number) => {
	pageInfo.pageSize = val;
	initData();
};
const handleCurrentChange = (val: number) => {
	pageInfo.currentPage = val;
	initData();
};
const handleserch = () => {
	initData();
};
const handleTag = () => {
	initData();
};
const initData = () => {
	loading.value = true;
	albumapi
		.getAlbums({
			page: pageInfo.currentPage,
			pageSize: pageInfo.pageSize,
			keywords: search.value,
			mytag: tag.value,
		})
		.then((res) => {
			console.log(res.data);
			tableData.value = res.data.albums.map((item) => {
				return {
					id: item.id,
					author: item.user_id,
					tag: {
						id: item.AlbumType.id,
						name: item.AlbumType.name,
					},
					name: item.name,
					description: item.description,
					typeid: item.type,
					number: res.data.photoNum[item.id] || 0,
					createtime: formatDate(new Date(item.created_at), 'YYYY-mm-dd'),
				};
			});
			tags.value = res.data.albumTypes.map((tag) => {
				return {
					label: tag.name,
					value: tag.id,
				};
			});
			pageInfo.total = res.data.total;
			loading.value = false;
		});
};
initData();
</script>
<style lang="less" scoped></style>
