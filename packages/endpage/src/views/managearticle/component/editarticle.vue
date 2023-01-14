<template>
	<div class="Edit" v-loading="articleData.loading">
		<div style="border-bottom: 1px solid #e8e8e8">
			<div id="toolbar-container"><!-- 工具栏 --></div>
			<!--      <Toolbar-->
			<!--        id="editor-toolbar"-->
			<!--        style="border-bottom: 1px solid #ccc"-->
			<!--        :editor="editorRef"-->
			<!--        :defaultConfig="data.toolbarConfig"-->
			<!--        :mode="data.mode"-->
			<!--      />-->
		</div>
		<div id="content">
			<div id="editor-container">
				<div id="title-container">
					<input placeholder="Page title..." v-model="articleData.title" type="text" />
				</div>
				<div style="overflow: hidden; min-height: 800px; width: 100%" id="e-container">
					<!-- 编辑器 -->
				</div>
				<!--        <div id="editor-text-area"></div>-->
				<!--        <Editor-->
				<!--          id="editor-text-area"-->
				<!--          style="height: 500px; overflow-y: hidden"-->
				<!--          v-model="data.valueHtml"-->
				<!--          :defaultConfig="data.editorConfig"-->
				<!--          :mode="data.mode"-->
				<!--          @onCreated="handleCreated"-->
				<!--        />-->
			</div>
			<div class="articleSet">
				<div class="coverImg">
					<div class="imgupload" @mouseleave="myhidden = true" @mouseenter="myhidden = false">
						<el-upload
							class="upload-demo"
							drag
							:limit="1"
							:on-preview="handlePictureCardPreview"
							:on-remove="handleRemove"
							:on-change="handlechange"
							:auto-upload="false"
							v-if="!myFlag"
							v-loading="mygo"
							element-loading-text="上传图片中"
						>
							<el-icon class="el-icon--upload"><upload-filled /></el-icon>
							<div class="el-upload__text">上传文章 <em>封面</em></div>
						</el-upload>
						<div v-else class="fengmain">
							<img :src="articleData.postlink" />
							<div
								class="fengmainlayout"
								:style="{
									opacity: myhidden ? 0 : 1,
								}"
							>
								<el-icon @click="handleRemove"><Delete /></el-icon>
								<el-icon @click="handlePictureCardPreview"><Plus /></el-icon>
							</div>
						</div>
					</div>
					<el-dialog v-model="dialogVisible">
						<img style="width: 100%" :src="articleData.postlink" alt="Preview Image" />
					</el-dialog>
				</div>
				<div class="other">
					<el-divider content-position="left">分类</el-divider>
					<el-select v-model="articleData.selectType" class="m-2" placeholder="Select" size="large">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
					</el-select>
					<el-divider content-position="left">技术标签</el-divider>
					<el-select v-model="articleData.selectTechnology" class="m-2" placeholder="Select" size="large">
						<el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value" />
					</el-select>
					<el-divider content-position="left">发布日期</el-divider>
					<el-date-picker v-model="articleData.date" type="date" placeholder="请选择日期" :default-value="articleData.date" />
					<el-divider content-position="left">关键字</el-divider>
					<el-input style="margin-bottom: 20px" v-model="articleData.keywords" placeholder="Please input" />
					<el-button round type="primary" class="fabu" @click="submitForm" :loading="articleData.loading"> 发布 </el-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
// 引入 css
import '@wangeditor/editor/dist/css/style.css';
import { ref, onMounted, reactive, computed } from 'vue';
// import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { createEditor, createToolbar } from '@wangeditor/editor';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import qiniu from '/@/utils/qiniu';
import aApi from '/@/api/managearticle';
import { Delete, Plus, UploadFilled } from '@element-plus/icons-vue';

const route = useRoute();
const router = useRouter();
const imgList = ref([]);
const articleData = reactive({
	id: route.query.id || 0,
	menu: [], // 分类
	technology: [], // 技术标签
	article: null, // 文章资源
	selectType: 1, // 文章类别
	selectTechnology: 1, // 技术标签
	title: '', // 文章标题
	keywords: '', // 文章关键字
	date: new Date(), // 文章发布日期
	postlink: null, // 封面图链接
	context: null, // 文章给你内容
	raw: null, // 用户编辑的文章内容格式
	loading: false,
});
const data = reactive({
	valueHtml: '',
	editor: null,
	toolbar: null,
});
// watchEffect(() => {
// 	data.editor?.setHtml(data.valueHtml);
// });

onMounted(() => {
	const editorConfig = {
		placeholder: '请输入内容...',
		onChange(editor) {
			const html = editor.getHtml();
			data.valueHtml = html;
			// 也可以同步到 <textarea>
		},
		onCreated(editor) {},
		MENU_CONF: {},
	};
	editorConfig.MENU_CONF['uploadImage'] = {
		customUpload(file, insertFn) {
			let url = '';
			let alt = '';
			let href = '';
			articleData.loading = true;
			qiniu(file).then((res) => {
				url = 'http://img.pzhuweb.cn/' + res.key;
				alt = res.key;
				imgList.value.push(res.key);
				articleData.loading = false;
				insertFn(url, alt, href);
			});
		},
	};
	data.editor = createEditor({
		selector: '#e-container',
		html: '',
		config: editorConfig,
		mode: 'default', // or 'simple'
	});
	const toolbarConfig = {
		excludeKeys: ['fullScreen'],
	};
	data.toolbar = createToolbar({
		editor: data.editor,
		selector: '#toolbar-container',
		config: toolbarConfig,
		mode: 'default', // or 'simple'
	});
});

// 编辑器实例，必须用 shallowRef
// const editorRef = shallowRef()

const options = computed(() => {
	const objs = [];
	articleData.menu.forEach((item) => {
		objs.push({ value: item.id, label: item.name });
	});
	return objs;
});
const options1 = computed(() => {
	const objs = [];
	articleData.technology.forEach((item) => {
		objs.push({ value: item.id, label: item.name });
	});
	return objs;
});
function checkedValue() {
	if (!articleData.title) {
		ElMessage({
			message: '请输入文章标题',
			type: 'warning',
		});
		return false;
	}
	if (!articleData.postlink) {
		ElMessage({
			message: '请填上传封面',
			type: 'warning',
		});
		return false;
	}
	if (!articleData.keywords) {
		ElMessage({
			message: '请填写关键字',
			type: 'warning',
		});
		return false;
	}

	return true;
}
async function submitForm() {
	const str = data.valueHtml;
	const text = str.replace(/<[^<script>]+>/g, '');
	const abstract = text.substring(0, 120);
	articleData.loading = true;
	if (checkedValue()) {
		const imgListok = data.editor.getElemsByType('image').map((item) => item.alt);
		const delimglist = imgList.value.filter((item) => !imgListok.includes(item));
		const mydata = {
			id: articleData.id,
			title: articleData.title,
			abstract,
			context: data.editor.getHtml(),
			technologyid: articleData.selectTechnology,
			keywords: articleData.keywords,
			menuid: articleData.selectType,
			date: articleData.date,
			raws: imgListok,
			delimglist,
		};
		aApi.uploadArticleInfo(mydata).then((res) => {
			if (res.success) {
				setTimeout(() => {
					ElMessage({
						message: '文章修改成功',
						type: 'success',
					});
					router.push('/managearticle');
				}, 500);
			} else {
				ElMessage({
					message: '修改失败!!!',
					type: 'error',
				});
			}
			articleData.loading = false;
		});
	} else {
		articleData.loading = false;
	}
}
aApi.getArticleEdit(articleData.id).then((result) => {
	const res = result.data;
	if (res.success) {
		articleData.menu = res.data.menu;
		articleData.technology = res.data.technology;
		articleData.article = res.data.article[0];
		articleData.id = res.data.article[0].id;
		articleData.postlink = res.data.article[0].postlink;
		articleData.title = res.data.article[0].title;
		articleData.keywords = res.data.article[0].keywords;
		articleData.date = res.data.article[0].created_at ? new Date(res.data.article[0].created_at) : new Date();
		// data.valueHtml = res.data.article[0].context ?? '';
		data.editor?.dangerouslyInsertHtml(res.data.article[0].context ?? '');
		imgList.value = res.data.article[0].raws.split(',');
	}
});

const dialogVisible = ref(false);
const myFlag = computed(() => articleData.postlink);
const myhidden = ref(true); //遮罩
const mygo = ref(false);
const handlechange = async (uploadFile, uploadFiles) => {
	mygo.value = true;
	await qiniu(uploadFile)
		.then((res) => {
			aApi
				.uploadArticleeCover({
					id: articleData.id,
					key: res.key,
				})
				.then((res) => {
					articleData.postlink = res.data.postlink;
					articleData.id = res.data.id;
					mygo.value = false;
				});
		})
		.catch((err) => {
			// status = false;
			mygo.value = true;
		});
};
const handleRemove = () => {
	aApi
		.delCoverImg({
			id: articleData.id,
			postlink: articleData.postlink,
		})
		.then((res) => {
			articleData.postlink = '';
		});
};
const handlePictureCardPreview = () => {
	dialogVisible.value = true;
};
</script>

<style scoped lang="less">
.articleSet {
	/*width: 100%;*/
	margin-top: 30px;
}
.articleSet .coverImg {
	width: 250px;
	// height: 150px;
	.imgupload {
		width: 100%;
		// height: 230px;
		.fengmain {
			cursor: pointer;
			width: 100%;
			height: 190px;
			position: relative;
			border-radius: 10px;
			overflow: hidden;
			img {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
			.fengmainlayout {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background-color: rgba(0, 0, 0, 0.5);
				opacity: 0;
				transition: opacity 0.3;
				display: inline-flex;
				justify-content: space-around;
				align-items: center;
				color: #fff;
				font-size: 25px;
			}
		}
	}
	/*background-color: #0d0925;*/
}

.articleSet .other {
	margin-top: 20px;
	padding: 0 5px;
	width: 100%;
	background-color: #fff;
	flex-direction: column;
	display: flex;
	justify-content: center;
}
.Edit {
	margin-top: 10px;
}
#editor-toolbar {
	/*width: 1350px;*/
	display: flex;
	justify-content: center;
	background-color: #fcfcfc;
	margin: 0 auto;
}

#content {
	height: calc(100% - 40px);
	background-color: rgb(245, 245, 245);
	overflow-y: auto;
	position: relative;
	display: flex;
	justify-content: center;
	column-gap: 20px;
}
@media (max-width: 1000px) {
	#content {
		flex-direction: column-reverse;
	}
	.articleSet {
		/*width: 100%;*/
		display: flex;
		flex-direction: column;
		margin-top: 15px;
		justify-content: center;
		align-items: center;
	}
}

#editor-container {
	width: 850px;
	background-color: #fff;
	padding: 20px 50px 20px 50px;
	border: 1px solid #e8e8e8;
	box-shadow: 0 2px 10px rgb(0 0 0 / 12%);
	height: 100%;
	overflow: hidden;
}
@media screen and (max-width: 800px) {
	#editor-container {
		padding: 10px;
		width: 100%;
	}
}
#title-container {
	padding: 20px 0;
	border-bottom: 1px solid #e8e8e8;
}

#title-container input {
	font-size: 30px;
	border: 0;
	outline: none;
	width: 100%;
	line-height: 1;
}

#editor-text-area {
	min-height: 900px;
	margin-top: 20px;
}
</style>
