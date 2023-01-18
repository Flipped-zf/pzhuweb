<template>
	<div class="myupload" v-loading="loading">
		<el-card shadow="always" class="mb20">
			<el-row justify="space-around">
				<img :src="data.cover" class="albuncover" />
				<div :style="{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }">
					<h1>{{ `${data.name} - - ${data.total}张` }}</h1>
					<h3>{{ data.description }}</h3>
				</div>
				<div style="width: 200px">
					{{ checkids }}
					<el-button plain @click="handlemore">{{ morecheck ? '取消多选' : '多选' }}</el-button>
					<div v-if="morecheck" class="mt10">
						<el-popover placement="bottom" :width="100" trigger="click">
							<template #reference>
								<el-button type="primary" @click="moreMove">移动</el-button>
							</template>
							<el-select v-model="movetoalbum" placeholder="选择相册" size="small">
								<el-option v-for="item in moveTo" :key="item.value" :label="item.label" :value="item.value" />
							</el-select>
						</el-popover>
						<el-button v-if="!Boolean(route.query.id == 0)" type="danger" @click="moreDel">删除</el-button>
						<el-popconfirm @confirm="moreDel" v-else title="默认相册删除将永远删除">
							<template #reference>
								<el-button>Delete</el-button>
							</template>
						</el-popconfirm>
					</div>
				</div>
			</el-row>
		</el-card>
		<n-upload
			:disabled="disabledmy"
			:custom-request="handlereq"
			accept="image/*"
			:default-file-list="fileList"
			list-type="image-card"
			@change="handleUploadChange"
			@remove="handleRemove"
			ref="myupload"
			multiple
			:keep-file-after-finsh="true"
			:file-list-style="{ width: '100%', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', justifyContent: 'center' }"
		>
			点击上传
		</n-upload>
		<n-modal v-model:show="showModal" preset="card" style="width: 600px" title="一张很酷的图片">
			<img :src="previewImageUrl" style="width: 100%" />
		</n-modal>
	</div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { ElMessage } from 'element-plus';
import { NUpload, NModal } from 'naive-ui';
import qiniuAPI from '/@/api/qiniu';
import Cookies from 'js-cookie';
import * as qiniu from 'qiniu-js';
import albumapi from '/@/api/managealbum';
import { useRoute } from 'vue-router';

const route = useRoute();
const showModal = ref(false);
const previewImageUrl = ref('');
const myupload = ref(null);
const fileList = ref([]);
const loading = ref(true);
const data = reactive({
	cover: '',
	name: '',
	total: route.query.total,
	description: '',
});
const morecheck = ref(false);
const checkLinks = ref([]);
const disabledmy = ref(false);
const moveTo = ref([]);
const movetoalbum = ref(null);
const checkids = computed(() =>
	fileList.value
		.map((f) => {
			if (checkLinks.value.includes(f.url)) return f.id;
		})
		.filter((i) => i)
);
const handleUploadChange = (data) => {
	// fileList.value = data.fileList;
};
const handleRemove = ({ file }) => {
	albumapi
		.delPhotos({
			ids: [file.id],
		})
		.then((result) => {
			console.log(result);
		});
};
const handlemore = () => {
	const nodelist = myupload.value.$el.children[1].querySelectorAll('.n-upload-file');
	const nodeArrry = Array.from(nodelist);
	let oDiv = document.createElement('input');
	oDiv.classList = 'checkimg';
	oDiv.type = 'checkbox';
	// oDiv.addEventListener('click', () => {
	// 	console.log(123);
	// });
	morecheck.value = !morecheck.value;

	if (morecheck.value) {
		disabledmy.value = true;
		for (let item of nodeArrry) {
			let link = item.querySelector('img').src;
			let node = oDiv.cloneNode(true);
			node.dataset.link = link;
			node.addEventListener('click', (e) => {
				const flag = e.target.checked;
				const link = e.target.dataset.link;
				if (flag) {
					checkLinks.value.push(link);
				} else {
					checkLinks.value = checkLinks.value.filter((item) => item !== link);
				}
			});
			item.appendChild(node);
		}
	} else {
		for (let item of nodeArrry) {
			const delele = item.querySelector('.checkimg');
			item.removeChild(delele);
		}
		checkLinks.value = [];
		disabledmy.value = false;
	}
};
const moreDel = () => {
	console.log(checkids.value);
	if (!checkids.value.toString()) {
		ElMessage({
			message: '请选择照片',
			type: 'warning',
		});
		return;
	}
	albumapi
		.delPhotos({
			ids: checkids.value,
			albumId: route.query.id,
		})
		.then((result) => {
			// const files = fileList.value.filter((item) => !checkids.value.includes(item.id));
			const files = fileList.value;
			checkids.value.forEach((item) => {
				let delindex;
				for (let index = 0; index < files.length; index++) {
					const element = files[index];
					if (element.id == item) {
						delindex = index;
						break;
					}
				}
				fileList.value.splice(delindex, 1);
			});
			checkLinks.value = [];
		});
};
const moreMove = () => {
	if (!movetoalbum.value) {
		ElMessage({
			message: '请选择目标相册',
			type: 'warning',
		});
		return;
	}
	if (checkids.value == []) {
		ElMessage({
			message: '请选择照片',
			type: 'warning',
		});
		return;
	}
	albumapi
		.movePhotos({
			ids: checkids.value,
			albumId: movetoalbum.value,
		})
		.then((res) => {
			const files = fileList.value;
			checkids.value.forEach((item) => {
				let delindex;
				for (let index = 0; index < files.length; index++) {
					const element = files[index];
					if (element.id == item) {
						delindex = index;
						break;
					}
				}
				fileList.value.splice(delindex, 1);
			});
			checkLinks.value = [];
		});
	movetoalbum.value = null;
};

const initData = () => {
	albumapi.getPhotosByAlbumId(route.query.id).then((res) => {
		console.log(res);
		moveTo.value = res.data.albums;
		data.cover = res.data.albumInfo.cover;
		data.name = res.data.albumInfo.name;
		data.description = res.data.albumInfo.description;
		let filedefault = res.data.photos.map((item) => {
			return {
				id: item.id,
				name: item.name,
				status: 'finished',
				url: item.link,
			};
		});
		for (let item of filedefault) {
			fileList.value.push(item);
		}
		loading.value = false;
	});
};
initData();
const handlereq = ({ file, onProgress, onFinish, onError }) => {
	qiniuAPI
		.getToken()
		.then((res) => {
			const token = res.data;
			console.log(token);
			let type = '';
			if (file.name) {
				const num = file.name.split('.');
				type = num[num.length - 1];
			} else {
				type = file.type.split('/')[1];
			}
			const key = 'test/' + Cookies.get('yourStuNum') + Date.now() + '.' + type;
			// let key = 'test'+Date.now();
			const config = {
				useCdnDomain: true, // 是否使用 cdn 加速域名
				region: qiniu.region.z2, // 选择上传域名 华南
			};
			const putExtra = {
				fname: file.name,
				params: {},
				mimeType: ['image/png', 'image/jpeg', 'image/gif'],
			};
			if (file.raw) {
				file = file.raw;
			}
			const observable = qiniu.upload(file.file, key, token, putExtra, config);
			const observer = {
				next(res) {
					onProgress({ percent: Math.ceil(res.total.percent) });
				},
				error(err) {
					onError();
				},
				complete(res) {
					onFinish();
					// filelistok.value.push({
					// 	id: file.id,
					// 	name: 'test',
					// 	status: 'finished',
					// 	url: 'http://img.pzhuweb.cn/' + res.key,
					// });
					// console.log(fileList.value.find((item) => item.id === file.id));
					// fileList.value.find((item) => item.id === file.id).url = 'http://img.pzhuweb.cn/' + res.key;
					const myfile = file;
					albumapi
						.uploadPhotos({
							albumId: route.query.id,
							link: 'http://img.pzhuweb.cn/' + res.key,
							name: file.name,
						})
						.then((res) => {
							const file = fileList.value.find((item) => item.id === myfile.id);
							file.url = res.data.link;
							file.id = res.data.id;
						});
				},
			};
			const subscription = observable.subscribe(observer);
		})
		.catch((err) => {
			onError();
		});
};
</script>
<style scoped lang="less">
.myupload {
	width: 100%;
	.albuncover {
		height: 100px;
		transition: all ease 0.3s;
		&:hover {
			box-shadow: 0 2px 12px var(--next-color-dark-hover);
			cursor: pointer;
			transform: scale(1.1);
		}
	}
}
:deep(.n-upload-file) {
	width: 180px !important;
	height: 200px !important;
}
:deep(.n-upload-trigger) {
	width: 180px !important;
	height: 200px !important;
}
:deep(.n-upload-file-list .n-upload-file:hover) {
	background-color: transparent !important;
}
:deep(.n-upload-file-list .n-upload-file.n-upload-file--image-card-type::before) {
	position: relative;
}
:deep(.checkimg) {
	margin: 0 5px;
}
</style>
