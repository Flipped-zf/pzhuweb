<template>
	<el-card v-loading="loading">
		<el-tabs v-model="activeName" class="demo-tabs" @tab-change="handletab">
			<el-tab-pane label="文章列表" name="1">
				<el-table :data="tableData" stripe style="width: 100%">
					<el-table-column label="标题" prop="title" min-width="200px" />
					<el-table-column label="标签" prop="tag" min-width="125px">
						<template #header>
							<el-select @change="handleTag" v-model="tag" class="m-2" placeholder="Select" size="small">
								<el-option v-for="item in tags" :key="item.value" :label="item.label" :value="item.value" />
							</el-select>
						</template>
						<template #default="scope">
							<el-tag type="success" effect="plain" disable-transitions>{{ scope.row.tag.name }}</el-tag>
						</template></el-table-column
					>
					<el-table-column label="附件" prop="attachment">
						<template #default="scope">
							<el-link v-if="scope.row.attachment" type="primary" :href="scope.row.attachment" target="_blank">附件下载</el-link>
							<el-link v-else disabled>无附件</el-link>
						</template>
					</el-table-column>
					<el-table-column label="展示" prop="isshow">
						<template #default="scope">
							<el-switch v-model="scope.row.top" @change="handletop(scope.row)" inline-prompt active-text="是" inactive-text="否" />
						</template>
					</el-table-column>
					<el-table-column label="作者" prop="author" min-width="140px">
						<template #default="scope">
							<div style="display: flex; align-items: center">
								<el-avatar style="width: 40px; height: 40px" :src="scope.row.author.avatar" fit="cover" />
								<span style="margin-left: 10px">{{ scope.row.author.name }}</span>
							</div>
						</template>
					</el-table-column>
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
							<!-- <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button> -->
							<el-row align="middle" justify="space-between">
								<el-link v-if="scope.row.link" :href="scope.row.link">
									<el-icon class="mr5"><View /></el-icon>链接
								</el-link>
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
		<el-dialog v-model="currentArticl.centerDialogVisible" title="确认删除这篇成果吗 ?" width="30%" center>
			<span>{{ currentArticl.title }}</span>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="currentArticl.centerDialogVisible = false">Cancel</el-button>
					<el-button type="primary" @click="ConfirmDel">Confirm</el-button>
				</span>
			</template>
		</el-dialog>
	</el-card>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import manageAchi from '/@/api/manageachi';
import { formatDate } from '/@/utils/formatTime';
import { Search, View } from '@element-plus/icons-vue';
import changeTag from './component/changeTag.vue';
import { useRouter } from 'vue-router';
import _ from 'lodash';
interface article {
	id: number;
	title: string;
	tag: Object;
	attachment: string;
	isshow: boolean;
	author: Object;
	createtime: '';
	top: false;
	link: string;
}
const router = useRouter();
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
const handletab = () => {
	initData();
};
const currentArticl = reactive({
	centerDialogVisible: false,
	title: '',
	id: 0,
});
const activeName = ref('1');
const handleSizeChange = (val: number) => {
	pageInfo.pageSize = val;
	initData();
};
const handleCurrentChange = (val: number) => {
	pageInfo.currentPage = val;
	initData();
};
// const handleEdit = (index: number, row: article) => {
// 	console.log(index, row);
// 	router.push({ path: '/editarticle', query: { id: row.id } });
// };
const myrequest = _.debounce(async function (row) {
	await manageAchi
		.isShow({
			checked: row.top,
			id: row.id,
		})
		.then((res) => {
			!res.success && (row.top = !row.top);
		});
}, 1500);
const handletop = (row) => {
	myrequest(row);
};
const handleDelete = (index: number, row: article) => {
	currentArticl.title = row.title;
	currentArticl.id = row.id;
	currentArticl.centerDialogVisible = true;
};
const ConfirmDel = async () => {
	await manageAchi.delAchievement(currentArticl.id).then((res) => {
		currentArticl.centerDialogVisible = false;
	});
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
	manageAchi
		.getAchievementInfo({
			page: pageInfo.currentPage,
			pageSize: pageInfo.pageSize,
			keywords: search.value,
			mytag: tag.value,
		})
		.then((res) => {
			console.log(res.data);
			tableData.value = res.data.achievement.map((item) => {
				return {
					id: item.id,
					title: item.title,
					tag: {
						id: item.AchievementType.id,
						name: item.AchievementType.name,
					},
					attachment: item.attachment,
					isshow: Boolean(item.show),
					author: {
						name: item.UserInfo.User.name,
						avatar: item.UserInfo.avatar,
					},
					createtime: formatDate(new Date(item.created_at), 'YYYY-mm-dd'),
					link: item.achievementlink,
				};
			});
			tags.value = res.data.tag.map((tag) => {
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
