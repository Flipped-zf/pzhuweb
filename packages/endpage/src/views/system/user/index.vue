<template>
	<el-tabs v-model="editableTabsValue" :tab-position="themeConfig.isPhone ? 'top' : 'left'" style="height: 100%" class="demo-tabs">
		<el-tab-pane label="全部">
			<div class="system-user-container">
				<el-card shadow="hover">
					<div class="system-user-search mb15">
						<el-input size="default" placeholder="请输入用户名称" style="max-width: 180px; margin-right: 10px" v-model="search"> </el-input>
						<el-tooltip class="box-item" effect="dark" content="刷新" placement="right">
							<el-button :icon="RefreshRight" @click="initTableData" type="success" circle size="small" />
						</el-tooltip>
					</div>
					<el-table :data="filterTableData" stripe style="width: 100%" v-loading="loading">
						<el-table-column type="index" :index="totalIndex" label="序号" width="60" />
						<el-table-column prop="id" label="学号" show-overflow-tooltip></el-table-column>
						<el-table-column prop="name" label="姓名" min-width="110" :fixed="themeConfig.isPhone" show-overflow-tooltip>
							<template #default="scope">
								<div style="display: flex; align-items: center">
									<el-avatar style="width: 40px; height: 40px" :src="scope.row.avatar" fit="cover" />
									<span style="margin-left: 10px">{{ scope.row.name }}</span>
								</div>
							</template>
						</el-table-column>
						<el-table-column prop="major" label="专业" show-overflow-tooltip></el-table-column>
						<el-table-column prop="phone" label="联系方式" show-overflow-tooltip></el-table-column>
						<el-table-column prop="domain" label="研究方向" show-overflow-tooltip></el-table-column>
						<!-- <el-table-column prop="status" label="用户状态" show-overflow-tooltip>
					<template #default="scope">
						<el-tag type="success" v-if="scope.row.status">启用</el-tag>
						<el-tag type="info" v-else>禁用</el-tag>
					</template>
				</el-table-column> -->
						<!-- <el-table-column prop="describe" label="用户描述" show-overflow-tooltip></el-table-column> -->
						<el-table-column prop="createTime" label="加入时间" show-overflow-tooltip></el-table-column>
						<el-table-column label="操作" width="100">
							<template #default="scope">
								<el-button :disabled="scope.row.name === 'admin'" size="small" text type="primary" @click="onOpenEditUser(scope.row)">修改</el-button>
								<el-button :disabled="scope.row.name === 'admin'" size="small" text type="primary" @click="onRowDel(scope.row)">删除</el-button>
							</template>
						</el-table-column>
					</el-table>
					<el-pagination
						@size-change="onHandleSizeChange"
						@current-change="onHandleCurrentChange"
						class="mt15"
						:pager-count="5"
						:page-sizes="[10, 20, 30]"
						v-model:current-page="tableData.param.pageNum"
						background
						v-model:page-size="tableData.param.pageSize"
						layout="total, sizes, prev, pager, next, jumper"
						:total="total"
					>
					</el-pagination>
				</el-card></div
		></el-tab-pane>
		<el-tab-pane label="修改成员" lazy :disabled="editableTabsValue !== '1'"> <EditUser :editUserData="editData" /> </el-tab-pane>
		<el-tab-pane label="添加成员" lazy> <AddUer /> </el-tab-pane>
	</el-tabs>
</template>

<script lang="ts">
import { toRefs, reactive, onMounted, ref, defineComponent, computed } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { RefreshRight } from '@element-plus/icons-vue';
import AddUer from '/@/views/system/user/component/addUser.vue';
import EditUser from '/@/views/system/user/component/editUser.vue';
import request from '/@/api/users';
import { useThemeConfig } from '/@/stores/themeConfig';
import { storeToRefs } from 'pinia';
import { formatDate } from '/@/utils/formatTime';

// 定义接口来定义对象的类型
interface TableDataRow {
	id: string;
	name: string;
	major: string;
	phone: string;
	domain: string;
	// status: boolean;
	// describe: string;
	createTime: string;
	data: Object;
}
interface TableDataState {
	tableData: {
		allData: Array<TableDataRow>;
		total: number;
		param: {
			pageNum: number;
			pageSize: number;
		};
	};
	editData: object;
}

export default defineComponent({
	name: 'SystemUser',
	components: { AddUer, EditUser },
	setup() {
		const storesThemeConfig = useThemeConfig();
		const { themeConfig } = storeToRefs(storesThemeConfig);
		const editableTabsValue = ref('0');

		const state = reactive<TableDataState>({
			tableData: {
				allData: [],
				total: 0,
				param: {
					pageNum: 1,
					pageSize: 10,
				},
			},
			editData: {},
		});
		const loading = ref(false);
		const search = ref('');

		const filterTableData = computed(() => {
			return state.tableData.allData
				.filter((data) => !search.value || data.name.toLowerCase().includes(search.value.toLowerCase()))
				.slice((state.tableData.param.pageNum - 1) * state.tableData.param.pageSize, state.tableData.param.pageNum * state.tableData.param.pageSize);
		});
		const totalIndex = computed(() => (state.tableData.param.pageNum - 1) * state.tableData.param.pageSize + 1);
		const total = computed(() =>
			!search.value
				? state.tableData.total
				: state.tableData.allData.filter((data) => !search.value || data.name.toLowerCase().includes(search.value.toLowerCase())).length
		);
		// 初始化表格数据
		const initTableData = async () => {
			let data: Array<TableDataRow> = [];
			await request
				.getUsers()
				.then((res) => {
					console.log(res);
					data = res.allUser.map((row) => {
						return {
							id: row.id,
							name: row.User.name, //学号
							major: row.Major.name,
							phone: row.phone,
							domain: row.Domain.name,
							// status: row.status === 1,
							// describe: row.Status.describe,
							avatar: row.avatar,
							createTime: formatDate(new Date(row.created_at), 'YYYY-mm-dd'),
							data: row,
						};
					});
					state.tableData.total = data.length;
					state.tableData.param.pageNum = 1;
					state.tableData.allData = data;
					loading.value = false;
				})
				.catch(() => {
					loading.value = false;
				});

			// state.tableData.data = data;
			// state.tableData.total = state.tableData.data.length;
		};
		const onOpenEditUser = (row: TableDataRow) => {
			editableTabsValue.value = '1';
			state.editData = row.data;
		};
		// 删除用户
		const onRowDel = (row: TableDataRow) => {
			ElMessageBox.confirm(`此操作将永久删除账户名称：“${row.name}”，是否继续?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					request.deleteUser(row.id).then((res) => {
						res.success && ElMessage.success('删除成功');
					});
				})
				.catch(() => {});
		};
		// 分页改变
		const onHandleSizeChange = (val: number) => {
			state.tableData.param.pageSize = val;
		};
		// 分页改变
		const onHandleCurrentChange = (val: number) => {
			state.tableData.param.pageNum = val;
		};
		// 页面加载时
		onMounted(() => {
			initTableData();
		});
		return {
			onOpenEditUser,
			onRowDel,
			onHandleSizeChange,
			onHandleCurrentChange,
			initTableData,
			...toRefs(state),
			loading,
			search,
			filterTableData,
			totalIndex,
			total,
			themeConfig,
			editableTabsValue,
			RefreshRight,
		};
	},
});
</script>
