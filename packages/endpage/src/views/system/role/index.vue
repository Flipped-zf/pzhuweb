<template>
	<div class="system-role-container">
		<el-card shadow="hover">
			<div class="system-user-search mb15">
				<el-input size="default" placeholder="请输入角色名称" style="max-width: 180px" v-model="search"> </el-input>
				<!-- <el-button size="default" type="primary" class="ml10">
					<el-icon>
						<ele-Search />
					</el-icon>
					查询
				</el-button> -->
				<el-button disabled size="default" type="success" class="ml10" @click="onOpenAddRole">
					<el-icon>
						<ele-FolderAdd />
					</el-icon>
					新增角色
				</el-button>
			</div>
			<el-table :data="filterTableData" style="width: 100%" v-loading="loading">
				<el-table-column type="index" :index="totalIndex" label="序号" width="60" />
				<el-table-column prop="roleName" label="角色名称" show-overflow-tooltip></el-table-column>
				<el-table-column prop="roleSign" sortable label="角色标识" show-overflow-tooltip></el-table-column>
				<el-table-column prop="status" label="角色状态" show-overflow-tooltip>
					<template #default="scope">
						<el-tag type="success" v-if="scope.row.status">启用</el-tag>
						<el-tag type="info" v-else>禁用</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="describe" label="角色描述" show-overflow-tooltip></el-table-column>
				<el-table-column prop="createTime" label="创建时间" show-overflow-tooltip></el-table-column>
				<el-table-column label="操作" width="100">
					<template #default="scope">
						<el-button :disabled="scope.row.roleName === '超级管理员'" size="small" text type="primary" @click="onOpenEditRole(scope.row)"
							>修改</el-button
						>
						<el-button :disabled="scope.row.roleName === '超级管理员'" size="small" text type="primary" @click="onRowDel(scope.row)">删除</el-button>
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
		</el-card>
		<AddRole ref="addRoleRef" />
		<EditRole ref="editRoleRef" />
	</div>
</template>

<script lang="ts">
import { toRefs, reactive, onMounted, ref, defineComponent, computed } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import AddRole from '/@/views/system/role/component/addRole.vue';
import EditRole from '/@/views/system/role/component/editRole.vue';
import request from '/@/api/status';
import { formatDate } from '/@/utils/formatTime';
// 定义接口来定义对象的类型
interface TableData {
	roleName: string;
	roleSign: string;
	describe: string;
	status: boolean;
	createTime: string;
	statusId: number;
}
interface TableDataState {
	tableData: {
		allData: any;
		total: number;
		param: {
			pageNum: number;
			pageSize: number;
		};
	};
}

export default defineComponent({
	name: 'SystemRole',
	components: { AddRole, EditRole },
	setup() {
		const addRoleRef = ref();
		const editRoleRef = ref();
		const state = reactive<TableDataState>({
			tableData: {
				allData: [],
				total: 0,
				param: {
					pageNum: 1,
					pageSize: 10,
				},
			},
		});
		const loading = ref(false);
		// const change = () => {
		// 	state.tableData.data = state.tableData.allData.slice(
		// 		(state.tableData.param.pageNum - 1) * state.tableData.param.pageSize,
		// 		state.tableData.param.pageNum * state.tableData.param.pageSize
		// 	);
		// 	// state.tableData.allIndex = (state.tableData.param.pageNum - 1) * state.tableData.param.pageSize + 1;
		// };
		const search = ref('');

		const filterTableData = computed(() => {
			return state.tableData.allData
				.filter((data) => !search.value || data.roleName.toLowerCase().includes(search.value.toLowerCase()))
				.slice((state.tableData.param.pageNum - 1) * state.tableData.param.pageSize, state.tableData.param.pageNum * state.tableData.param.pageSize);
		});
		const totalIndex = computed(() => (state.tableData.param.pageNum - 1) * state.tableData.param.pageSize + 1);
		const total = computed(() =>
			!search.value
				? state.tableData.total
				: state.tableData.allData.filter((data) => !search.value || data.roleName.toLowerCase().includes(search.value.toLowerCase())).length
		);
		// 初始化表格数据
		const initTableData = async () => {
			let data: Array<TableData> = [];
			loading.value = true;
			await request
				.getRoles()
				.then((res) => {
					console.log(res);
					data = res.rows.map((row) => {
						return {
							roleName: row.roleName,
							roleSign: row.roles,
							describe: row.describe,
							status: row.active === 1,
							createTime: formatDate(new Date(row.createdAt), 'YYYY-mm-dd'),
							statusId: row.id,
						};
					});

					state.tableData.total = res.count;

					state.tableData.allData = data;
					loading.value = false;
				})
				.catch(() => {
					loading.value = false;
				});
		};
		// 打开新增角色弹窗
		const onOpenAddRole = () => {
			addRoleRef.value.openDialog();
		};
		// 打开修改角色弹窗
		const onOpenEditRole = (row: Object) => {
			editRoleRef.value.openDialog(row);
		};
		// 删除角色
		const onRowDel = (row: any) => {
			ElMessageBox.confirm(`此操作将永久删除角色名称：“${row.roleName}”，是否继续?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					ElMessage.success('删除成功');
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
			addRoleRef,
			editRoleRef,
			onOpenAddRole,
			onOpenEditRole,
			onRowDel,
			onHandleSizeChange,
			onHandleCurrentChange,
			...toRefs(state),
			loading,
			search,
			filterTableData,
			totalIndex,
			total,
		};
	},
});
</script>
