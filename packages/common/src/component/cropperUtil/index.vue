<template>
	<div class="cropper-image-upload-page">
		<div class="cropper-image" @click="chooseImage" @mouseenter="mouseenterHandler" @mouseleave="mouseleaveHandler">
			<el-icon v-if="!imgUrl"><upload /></el-icon>
			<img v-else :src="imgUrl" alt="裁剪图片" />
			<div v-show="imgUrl && maskShow" class="mask">
				<!--        <i  class="el-icon-delete"></i>-->
				<el-icon @click.stop="clearImg"><delete /></el-icon>
			</div>
			<input type="hidden" v-model="imgUrl" placeholder="请选择图片" />
		</div>
		<el-dialog title="图片上传" v-model="imageDialog" width="900px">
			<cropper-image-upload :imgUrl="imgUrl" @uploadImgSuccess="uploadImgSuccessHandler"></cropper-image-upload>
		</el-dialog>
	</div>
</template>

<script>
import { toRefs, ref, reactive, isReactive } from 'vue';
import CropperImageUpload from './components/cropper-image-upload.vue';
import userInteractionFun from './composables/userInteractionFun';
import { Upload, Delete } from '@element-plus/icons-vue';

export default {
	name: 'CropperImage',
	components: {
		CropperImageUpload,
		Upload,
		Delete,
	},
	props: {
		imgUrl: String,
	},
	setup(props, { attrs, emit }) {
		// const {imgUrl} = toRefs(attrs)
		const { imageDialog, maskShow, clearImg, chooseImage, mouseenterHandler, mouseleaveHandler } = userInteractionFun(emit);
		const uploadImgSuccessHandler = function (state) {
			emit('update:imgUrl', state);
		};
		return {
			imageDialog,
			maskShow,
			clearImg,
			chooseImage,
			mouseenterHandler,
			mouseleaveHandler,
			uploadImgSuccessHandler,
		};
	},
};
</script>
<style lang="less" scoped>
.cropper-image-upload-page {
	.cropper-image {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 180px;
		height: 90px;
		cursor: pointer;
		border: 1px dashed rgb(230, 230, 230);
		> i {
			font-size: 28px;
		}
		> img {
			width: 100%;
			height: 100%;
		}
		.mask {
			display: flex;
			justify-content: center;
			align-items: center;
			position: absolute;
			top: 0;
			left: 0;
			z-index: 999;
			background: rgba(0, 0, 0, 0.25);
			width: 100%;
			height: 100%;
			i {
				color: #fff;
				font-size: 18px;
			}
		}
	}
}
</style>
