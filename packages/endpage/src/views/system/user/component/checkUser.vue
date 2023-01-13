<template>
	<div class="containercheck">
		<el-table :data="filterTableData" max-height="80vh" style="width: 100%" @selection-change="handleSelectionChange">
			<el-table-column type="selection" width="55" show-overflow-tooltip />
			<el-table-column label="姓名" prop="name" show-overflow-tooltip />
			<el-table-column label="学号" prop="id" show-overflow-tooltip />
			<el-table-column label="邮箱" prop="email" show-overflow-tooltip />
			<el-table-column label="时间" sortable prop="date" show-overflow-tooltip />
			<el-table-column align="right">
				<template #header>
					<el-input v-model="search" size="small" placeholder="Type to search" />
				</template>
				<template #default="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">通过</el-button>
					<el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">拒绝</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, effect } from 'vue';
import request from '/@/api/users';
import { formatDate } from '/@/utils/formatTime';

const tableData = ref([]);
const multipleSelection = ref([]);
const search = ref('');
const filterTableData = ref([]);
effect(() => {
	filterTableData.value = tableData.value.filter((data) => !search.value || data.name.toLowerCase().includes(search.value.toLowerCase()));
});
const handleEdit = (index: number, row) => {
	!multipleSelection.value.includes(row.id) && multipleSelection.value.push(row.id);
	if (multipleSelection.value.length !== 0)
		request.userReviewPass(multipleSelection.value).then((res) => {
			console.log(res);
		});
	tableData.value = tableData.value.filter((data) => !multipleSelection.value.includes(data.id));
};
const handleDelete = (index: number, row) => {
	!multipleSelection.value.includes(row.id) && multipleSelection.value.push(row.id);
	if (multipleSelection.value.length !== 0)
		request.userRefuseJoin(multipleSelection.value).then((res) => {
			console.log(res);
		});
	filterTableData.value = tableData.value.filter((data) => !multipleSelection.value.includes(data.id));
};
const handleSelectionChange = (val) => {
	multipleSelection.value = val.map((item) => item.id);
	console.log(multipleSelection.value);
};
const initData = () => {
	request.getCheckUser().then((res) => {
		tableData.value = res.data.reviewUser.map((item) => {
			return {
				date: formatDate(new Date(item.created_at), 'YYYY-mm-dd'),
				email: item.email,
				id: item.id,
				name: item.name,
			};
		});
	});
};
initData();
</script>

<style scoped lang="less"></style>
