<template>
	<el-tag @close="handleremove(tag)" v-for="tag in tags" :key="tag.label" class="mr10 mb10" :closable="tag.value !== 0">
		{{ tag.label }}
	</el-tag>
	<el-row justify="center" style="margin-top: 100px">
		<el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="10">
			<el-input v-model="tagName" placeholder="Please input">
				<template #append> <el-button type="success" @click="handleadd">添加标签</el-button> </template>
			</el-input>
		</el-col>
	</el-row>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import resapi from '/@/api/manageresource';
import { ElMessage } from 'element-plus';

const props = defineProps({
	tags: Array,
});
const emit = defineEmits(['update:tags']);
const tagName = ref('');

const handleadd = () => {
	if (tagName.value) {
		resapi
			.addResourceTag({
				tagName: tagName.value,
			})
			.then((res) => {
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
	resapi
		.delResourceTag({
			tagid: tag.value,
		})
		.then((res) => {
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
