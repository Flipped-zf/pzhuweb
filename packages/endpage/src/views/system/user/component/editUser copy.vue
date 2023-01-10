<template>
	<div class="system-edit-user-container">
		<el-form :model="ruleForm" size="default" label-width="90px">
			<el-row :gutter="35">
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="账户名称">
						<el-input v-model="ruleForm.userName" placeholder="请输入账户名称" clearable></el-input>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="用户昵称">
						<el-input v-model="ruleForm.userNickname" placeholder="请输入用户昵称" clearable></el-input>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="关联角色">
						<el-select v-model="ruleForm.roleSign" placeholder="请选择" clearable class="w100">
							<el-option label="超级管理员" value="admin"></el-option>
							<el-option label="普通用户" value="common"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="手机号">
						<el-input v-model="ruleForm.phone" placeholder="请输入手机号" clearable></el-input>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="邮箱">
						<el-input v-model="ruleForm.email" placeholder="请输入" clearable></el-input>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="性别">
						<el-select v-model="ruleForm.sex" placeholder="请选择" clearable class="w100">
							<el-option label="男" value="男"></el-option>
							<el-option label="女" value="女"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="账户密码">
						<el-input v-model="ruleForm.password" placeholder="请输入" type="password" clearable></el-input>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="账户过期">
						<el-date-picker v-model="ruleForm.overdueTime" type="date" placeholder="请选择" class="w100"> </el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="用户状态">
						<el-switch v-model="ruleForm.status" inline-prompt active-text="启" inactive-text="禁"></el-switch>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
					<el-form-item label="用户描述">
						<el-input v-model="ruleForm.describe" type="textarea" placeholder="请输入用户描述" maxlength="150"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
	</div>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from 'vue';

interface RuleFormRow {
	userName: string;
	email: string;
	userNickname: string;
	roleSign: string;
	department: any;
	phone: string;
	sex: string;
	password: string;
	overdueTime: string;
	status: boolean;
	describe: string;
}

const props = defineProps({
	editUserData: Object,
});
const ruleForm = reactive<RuleFormRow>({
	userName: '', // 账户名称
	userNickname: '', // 用户昵称
	roleSign: '', // 关联角色
	department: [], // 部门
	phone: '', // 手机号
	email: '', // 邮箱
	sex: '', // 性别
	password: '', // 账户密码
	overdueTime: '', // 账户过期
	status: true, // 用户状态
	describe: '', // 用户描述
});
// 初始化部门数据
const initTableData = () => {};
// 页面加载时
onMounted(() => {
	initTableData();
});
</script>
