<template>
	<el-tag @close="handleremove(tag)" v-for="tag in tags" :key="tag.label" class="mr10 mb10" :closable="tag.value !== 0">
		{{ tag.label }}
	</el-tag>
	<el-row justify="center" style="margin-top: 100px">
		<el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="10">
			<el-input v-model="tagName" placeholder="Please input">
				<template #append> <el-button type="success" @click="handleadd" v-waves="'light'">添加标签</el-button> </template>
			</el-input>
		</el-col>
	</el-row>
	<test :test="testmy"></test>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import albumapi from '/@/api/managealbum';
import { ElMessage } from 'element-plus';
import test from './test.vue';
const props = defineProps({
	tags: Array,
});
const emit = defineEmits(['update:tags']);
const tagName = ref('');

const testmy = ref([1, 2]);
const handleadd = () => {
	testmy.value = [];
	if (tagName.value) {
		albumapi.addAlbumType(tagName.value).then((res) => {
			console.log(res);
			if (res.success) {
				emit('update:tags', [
					...props.tags,
					{
						label: tagName.value,
						value: res.tag.id,
					},
				]);
			}
		});
	} else {
		ElMessage({
			message: '请输入标签名',
			type: 'error',
		});
	}
};
const handleremove = (tag) => {
	albumapi.delAlbumType(tag.value).then((res) => {
		console.log(res);
		if (res.success) {
			emit(
				'update:tags',
				props.tags?.filter((item) => item.value !== tag.value)
			);
		}
	});
};
</script>

<style scoped lang="less">
:deep(button.el-button) {
	background-color: var(--el-button-bg-color);
	color: var(--el-button-text-color);
}
</style>
