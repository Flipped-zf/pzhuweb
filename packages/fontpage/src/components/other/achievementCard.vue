<template>
	<div class="resourcesContent">
		<div class="resourcesImg">
			<!--      <img :src="props.resources.posterlink" alt="">-->
			<el-image :src="achievement.posterlink" style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center">
				<template #error>
					<div class="image-slot" style="font-size: 30px">
						<el-icon><icon-picture /></el-icon>
					</div>
				</template>
			</el-image>
		</div>
		<div class="userInfo">
			<!--      <img :src="props.resources.userInfo.avatar">-->
			<el-image class="avaImg" :src="achievement.UserInfo.avatar" style="display: flex; align-items: center; justify-content: center">
				<template #error>
					<div class="image-slot" style="font-size: 20px">
						<el-icon><icon-picture /></el-icon>
					</div>
				</template>
			</el-image>
			<div class="content">
				<div class="user">
					<h4>{{ achievement.UserInfo.User.name }}</h4>
					<h5 style="color: #999999">{{ dayjs(achievement.created_at).format('YYYY-MM-DD') }}</h5>
				</div>
				<div class="description">
					<h5 style="color: black">
						{{ achievement.title || '暂无标题' }}
					</h5>
					<div
						style="
							overflow: hidden;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 4;
							-ms-text-overflow: ellipsis;
							text-overflow: ellipsis;
							line-height: 20px;
							font-size: 13px;
						"
					>
						{{ achievement.introduction || '暂无标题' }}
					</div>
					<p class="read-more" align="right" style="font-size: 12px">
						<a :href="achievement.achievementlink || achievement.attachment" target="_blank">Read More</a>
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { onMounted } from 'vue';
import dayjs from 'dayjs';
import { Picture as IconPicture } from '@element-plus/icons-vue';

const props = defineProps({
	achievement: Object,
});

onMounted(() => {});
</script>

<style scoped lang="less">
.resourcesContent {
	height: 200px;
	width: 350px;
	display: flex;
	-webkit-box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.15);
	-moz-box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.15);
	box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.3);
	//margin-bottom: 10px;
	.resourcesImg {
		width: 50%;
		height: 100%;
		overflow: hidden;
		img {
			width: 100%;
			height: 100%;
			object-position: center;
			object-fit: cover;
			transition: all 0.3s linear 0s;
		}
	}
	.userInfo {
		width: 50%;
		height: 100%;
		//background-color: pink;
		position: relative;
		.avaImg {
			width: 50px;
			height: 50px;
			border-radius: 50%;
			position: absolute;
			left: -30px;
			top: 3px;
			z-index: 2;
			box-shadow: 0px 8px 15px rgba(48, 48, 48, 0.4);
		}
		.content {
			height: 100%;
			width: 100%;
			background-color: white;
			&:before {
				transform: skewX(-3deg);
				content: '';
				background: #fff;
				width: 15px;
				position: absolute;
				left: -5px;
				top: 0;
				bottom: 0;
				z-index: 1;
				background-color: white;
			}
			.user {
				height: 30%;
				padding-left: 30px;
				display: flex;
				flex-direction: column;
				justify-content: center;
				border-bottom: 2px #f4f3f3 solid;
				h5:before {
					font-family: 'iconfont';
					margin-right: 10px;
					content: '\e8b4';
				}
			}
			.description {
				height: 70%;
				padding-left: 10px;
				padding-right: 5px;
				padding-top: 20px;
				font-size: 14px;
				color: #a2a2a2;
				& > div {
					text-indent: 2em;
				}
				.read-more {
					text-align: right;
					position: absolute;
					bottom: 5px;
					right: 5px;
					a {
						color: #5ad67d;
						display: inline-block;
						position: relative;
						&:after {
							content: '\eb0b';
							font-family: 'iconfont';
							margin-left: -10px;
							opacity: 0;
							vertical-align: middle;
							transition: margin 0.3s, opacity 0.3s;
						}
						&:hover:after {
							margin-left: 5px;
							opacity: 1;
						}
					}
				}
			}
		}
	}
	&:hover {
		.resourcesImg {
			.el-image {
				transition: all 0.5s ease-in;
				transform: scale(1.1);
			}
		}
	}
}
</style>
