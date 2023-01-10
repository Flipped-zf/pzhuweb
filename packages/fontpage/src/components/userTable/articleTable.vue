<template>
	<div>
		<el-table v-loadmore="myLoad" size="large" :data="data.article" max-height="530" style="width: 100%">
			<template #empty>
				<el-skeleton v-if="isLoading" :rows="5" animated />
				<span v-else>暂无数据</span>
			</template>
			<el-table-column :fixed="isPhone" label="发布时间" sortable prop="created_at">
				<template #default="scope">
					{{ dayjs(scope.row.created_at).format('YYYY-MM-DD') }}
				</template>
			</el-table-column>
			<el-table-column min-width="100" label="技术标签" prop="technologyid">
				<template #default="scope">
					<el-tag class="ml-2" type="success">{{ scope.row.Technology.name }}</el-tag>
				</template>
			</el-table-column>
			<el-table-column min-width="300" label="文章名称" prop="title" />
			<el-table-column min-width="150" align="center">
				<template #header>
					<div style="display: flex; align-items: center">
						<el-select size="small" style="width: 40%" @change="myChange" v-model="value" clearable placeholder="全部资源">
							<el-option v-for="(item, index) in data.tagType" :key="item.index" :label="item.label" :value="item.value" />
						</el-select>
						<el-input :prefix-icon="Search" v-model="data.search" @keyup.enter.native="mySearch" size="small" placeholder="Type to search" />
					</div>
				</template>
				<template #default="scope" v-if="isMyself">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit </el-button>
					<el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete </el-button>
				</template>
			</el-table-column>
			<template #append>
				<p v-if="isLoading">
					<el-divider content-position="center">加载中...</el-divider>
				</p>
				<p v-if="isNot">
					<el-divider content-position="center">到底了</el-divider>
				</p>
			</template>
		</el-table>
		<el-dialog v-model="currentArticl.centerDialogVisible" title="确认删除这篇文章吗 ?" width="30%" center>
			<span>{{ currentArticl.title }}</span>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="currentArticl.centerDialogVisible = false">Cancel</el-button>
					<el-button type="primary" @click="ConfirmDel">Confirm</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup>
import { reactive, onMounted, inject, ref } from 'vue';
import user from '../../api/user';
import dayjs from 'dayjs';
import { Search } from '@element-plus/icons-vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { useStore } from '@/store';
const userStore = useStore();
const route = useRoute();
const router = useRouter();

const isPhone = inject('isPhone');
const isLoading = ref(true);
const isNot = ref(false);
const value = ref('');
const isMyself = inject('isMyself');
const data = reactive({
	article: [],
	articleType: [],
	tagType: [],
	search: '',
	beg: 0,
	end: 10,
	index: 0,
	yeshu: 1,
	deleteId: 0,
});

onMounted(() => {});

getArticle();
function getArticle() {
	isLoading.value = true;
	isNot.value = false;
	user
		.getUserArticle({
			beg: data.beg,
			end: data.end,
			index: data.index,
			id: route.params.id,
		})
		.then((res) => {
			data.article = res.data.article;
			data.articleType = res.data.articleType;
			data.tagType = data.articleType.map((item) => {
				return { label: item.name, value: item.id + '' };
			});
			isLoading.value = false;
			if (0 < data.article.length && data.article.length < data.yeshu * 10) {
				isNot.value = true;
			}
		});
}

const handleEdit = (index, row) => {
	// console.log(index, row.id)
	router.push({ path: '/articleEdit', query: { id: row.id } });
};
const currentArticl = reactive({
	centerDialogVisible: false,
	title: '',
	id: null,
});
const handleDelete = (index, row) => {
	data.deleteId = index;
	currentArticl.title = row.title;
	currentArticl.id = row.id;
	currentArticl.centerDialogVisible = true;
};
function ConfirmDel() {
	user.delUserArticle(currentArticl.id).then((res) => {
		console.log(res.data.success);
		if (res.data.success) {
			data.article.splice(data.deleteId, 1);
		}
		currentArticl.centerDialogVisible = false;
	});
}
function myChange(val) {
	data.search = '';
	if (val == '') {
		val = 0;
	}
	data.yeshu = 1;
	data.index = val;
	getArticle();
}

function mySearch() {
	// console.log('hello')
	if (data.search == '') {
		ElMessage({
			showClose: true,
			message: '请输入关键字',
			type: 'error',
		});
	} else {
		value.value = '';
		getSearchData();
	}
}

function getSearchData() {
	isLoading.value = true;
	isNot.value = false;
	user
		.searchUserArticle({
			value: data.search,
			id: route.params.id || userStore.userInfo.id,
			// route.params.id || store.state.userInfo.id
		})
		.then((res) => {
			console.log(res);
			data.article = res.data;
			isLoading.value = false;
			if (0 < data.article.length && data.article.length < data.yeshu * 10) {
				isNot.value = true;
			}
		});
}
const myLoad = () => {
	if (!isNot.value) {
		if (data.search == '') {
			data.end += 10;
			data.yeshu++;
			getArticle();
		} else {
			data.end += 10;
			data.yeshu++;
			getSearchData();
		}
	}
};
</script>

<style scoped></style>
