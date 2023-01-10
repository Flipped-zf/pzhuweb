<template>
	<div class="cropper-content" v-loading="uploadLoading">
		<div class="cropper-box">
			<div class="cropper">
				<div class="cropper-title">图片处理</div>
				<vue-cropper
					ref="cropperInstance"
					:img="option.img"
					:outputSize="option.outputSize"
					:outputType="option.outputType"
					:info="option.info"
					:canScale="option.canScale"
					:autoCrop="option.autoCrop"
					:autoCropWidth="option.autoCropWidth"
					:autoCropHeight="option.autoCropHeight"
					:fixed="option.fixed"
					:fixedNumber="option.fixedNumber"
					:full="option.full"
					:fixedBox="option.fixedBox"
					:canMove="option.canMove"
					:canMoveBox="option.canMoveBox"
					:original="option.original"
					:centerBox="option.centerBox"
					:height="option.height"
					:infoTrue="option.infoTrue"
					:maxImgSize="option.maxImgSize"
					:enlarge="option.enlarge"
					:mode="option.mode"
					@realTime="realTime"
					@imgLoad="imgLoad"
				>
				</vue-cropper>
			</div>
			<!--底部操作工具按钮-->
			<div class="footer-btn">
				<div class="scope-btn">
					<label class="btn" for="uploads">选择素材</label>
					<input
						type="file"
						id="uploads"
						ref="uploadsFileInstall"
						style="position: absolute; clip: rect(0 0 0 0)"
						accept="image/png, image/jpeg, image/gif, image/jpg"
						@change="selectImg($event)"
					/>
					<el-button size="small" type="danger" plain @click="changeScale(1)">
						<el-icon><zoom-in /></el-icon>
						放大
					</el-button>
					<el-button size="small" type="danger" plain @click="changeScale(-1)">
						<el-icon><zoom-out /></el-icon>
						缩小</el-button
					>
					<!-- <el-button size="mini" type="danger" plain icon="el-icon-delete" @click="clearImg">清空素材</el-button> -->
					<el-button size="small" type="danger" plain @click="rotateLeft">↺ 左旋转</el-button>
					<el-button size="small" type="danger" plain @click="rotateRight">↻ 右旋转</el-button>
				</div>
				<div class="upload-btn">
					<el-button size="small" type="success" :loading="uploadLoading" @click="uploadImg('blob')"
						>上传素材 <i class="el-icon-upload"></i
					></el-button>
				</div>
			</div>
		</div>
		<!--预览效果图-->
		<div class="show-preview">
			<div class="show-preview-title">预览</div>
			<div :style="previews.div" class="preview">
				<img v-show="previews.url" :src="previews.url" :style="previews.img" />
			</div>
		</div>
	</div>
</template>
<script>
import { toRefs, watch } from 'vue';
import { ZoomIn, ZoomOut } from '@element-plus/icons-vue';
import cropperOperationFun from '../composables/cropperOperationFun';
import cropperInitFun from '../composables/cropperInitFun';
import 'vue-cropper/dist/index.css';
import { VueCropper } from 'vue-cropper';
export default {
	name: 'CropperImageUpload',
	components: {
		ZoomIn,
		ZoomOut,
		VueCropper,
	},
	props: {
		imgUrl: {
			type: String,
			default: () => '',
		},
	},
	setup(props, { emit }) {
		const { imgUrl } = toRefs(props);
		const { previews, uploadLoading, imgLoad, realTime } = cropperInitFun();
		const { option, chooseImageType, cropperInstance, uploadsFileInstall, changeScale, rotateLeft, rotateRight, selectImg, uploadImg } =
			cropperOperationFun(emit, uploadLoading);

		watch(
			imgUrl,
			(v) => {
				option.img = v;
				v && uploadsFileInstall.value && (uploadsFileInstall.value.value = '');
			},
			{
				immediate: true,
			}
		);

		return {
			previews,
			uploadLoading,
			imgLoad,
			realTime,
			option,
			chooseImageType,
			cropperInstance,
			uploadsFileInstall,
			changeScale,
			rotateLeft,
			rotateRight,
			selectImg,
			uploadImg,
		};
	},
};
</script>
<style lang="less" scoped>
.cropper-content {
	display: flex;
	display: -webkit-flex;
	justify-content: flex-end;
	padding: 12px 16px;
	//width:860px;
	.cropper-box {
		flex: 1;
		width: 100%;
		.cropper {
			width: auto;
			height: 300px;
			> .cropper-title {
				font-size: 16px;
				font-weight: 600;
				padding-bottom: 10px;
			}
		}
	}

	.show-preview {
		padding-left: 16px;
		flex: 1;
		-webkit-flex: 1;
		.preview {
			overflow: hidden;
			border: 1px solid #ccc;
			background: #cccccc;
			width: 280px !important;
			height: 160px !important;
		}
		.show-preview-title {
			font-weight: 600;
			font-size: 16px;
			margin-bottom: 10px;
		}
	}
}
.footer-btn {
	margin-top: 60px;
	display: flex;
	display: -webkit-flex;
	justify-content: flex-end;
	.scope-btn {
		display: flex;
		display: -webkit-flex;
		justify-content: space-between;
		padding-right: 10px;
	}
	.upload-btn {
		flex: 1;
		-webkit-flex: 1;
		display: flex;
		display: -webkit-flex;
		justify-content: center;
	}
	.btn {
		outline: none;
		display: inline-block;
		line-height: 1;
		white-space: nowrap;
		cursor: pointer;
		-webkit-appearance: none;
		text-align: center;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		outline: 0;
		-webkit-transition: 0.1s;
		transition: 0.1s;
		font-weight: 500;
		padding: 5px 11px;
		font-size: 12px;
		border-radius: 3px;
		color: #fff;
		background-color: #409eff;
		border-color: #409eff;
		margin-right: 10px;
	}
}
//@media (max-width:800px) {
//  .cropper-content {
//    flex-direction: column;
//  }
//}
</style>
