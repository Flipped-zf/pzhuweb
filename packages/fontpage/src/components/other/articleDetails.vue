<template>
	<myloading v-if="data.loading"></myloading>
	<div v-else class="articleInfo">
		<div class="articleInfo-header">
			<div class="articleInfo-header-info">
				<div class="articleInfo-header-info-label">
					<el-button round style="color: white; background-color: transparent">{{ data.article[0].keywords }} </el-button>
					<el-button round style="color: white; background-color: transparent">{{ data.article[0].Menu.name }} </el-button>
					<el-button round style="color: white; background-color: transparent">{{ data.article[0].Technology.name }} </el-button>
				</div>
				<div class="articleInfo-header-info-title">
					{{ data.article[0].title }}
				</div>
				<div class="articleInfo-header-info-user">
					<el-avatar :src="data.article[0].UserInfo.avatar" style="margin-right: 10px" />
					<p>{{ data.article[0].UserInfo.User.name }}</p>
					<p style="margin-left: 10px">
						<i class="iconfont icon-rili" style="vertical-align: center; margin-right: 5px"></i>
						{{ dayjs(data.article[0].created_at).format('YYYY-MM-DD') }}
					</p>
				</div>
			</div>
			<div class="articleInfo-header-shadow"></div>
			<div class="articleInfo-header-bgImg" :style="{ backgroundImage: `url(${data.article[0].postlink})` }"></div>
		</div>
		<div class="articleInfo-body">
			<div class="articleInfo-body-content braft-output-content" v-html="data.article[0].context"></div>
			<div class="articleInfo-body-recommend">
				<p>
					<el-divider content-position="center">推荐阅读</el-divider>
				</p>
				<div class="articleInfo-body-recommend-body">
					<div v-for="(item, index) in data.recommends" :key="item.id" class="articleInfo-body-recommend-body-item">
						<div class="link" :style="{ backgroundImage: `url(${item.postlink})` }" @click.prevent.stop="goDerails(item.id)">
							<span>{{ item.title }}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { reactive, onUpdated } from 'vue';
import axios from '../../utils/request';
import mybase from '../../api/myBase';
import { useRoute } from 'vue-router';
import Myloading from './myloading.vue';
import dayjs from 'dayjs';
import router from '../../router';
import { TweenMax, Back } from 'gsap';

const route = useRoute();
const data = reactive({
	article: [],
	recommends: [],
	loading: true,
});
axios.get(mybase.getArticleInfo + `/${route.query.id}`).then((res) => {
	console.log(res.data.data);
	data.article = res.data.data.article;
	data.recommends = res.data.data.recommend;
	data.loading = false;
});

onUpdated(() => {
	let objects = ['.articleInfo-header-info-label', '.articleInfo-header-info-title', '.articleInfo-header-info-user'];
	TweenMax.staggerFrom(objects, 1, { y: '+=100', ease: Back.easeOut }, 0.2);
});

function goDerails(num) {
	router.push({ path: '/articleDetails', query: { id: num } });
}
</script>
<style></style>
<style scoped lang="less">
:deep(.articleInfo-body img) {
	width: 100%;
}
:deep(.articleInfo-body video) {
	width: 100% !important;
}

.articleInfo {
	width: 100%;
	//min-width: 1400px;
	min-height: 600px;
	background: white;

	&-header {
		width: 100%;
		height: 400px;
		display: flex;
		justify-content: center;
		background-size: cover;
		background-position: center;
		position: relative;
		@media (max-width: 800px) {
			height: 300px;
		}
		&-shadow {
			width: 100%;
			height: 100%;
			position: absolute;
			z-index: 1;
			background-color: rgba(0, 0, 0, 0.2);
		}

		&-bgImg {
			width: 100%;
			height: 100%;
			background-position: center;
			background-size: cover;
			position: absolute;
			z-index: 0;
		}

		&-info {
			width: 50%;
			@media (max-width: 1000px) {
				width: 95%;
			}
			height: 100%;
			padding-top: 50px;
			z-index: 2;

			&-label {
				width: 100%;
				margin-bottom: 20px;

				.ant-btn-background-ghost {
					margin-right: 10px;
					border-radius: 30px;
				}
			}

			&-title {
				font-size: 55px;
				line-height: 1.1;
				width: 100%;
				margin-bottom: 30px;
				color: white;
				@media (max-width: 1000px) {
					font-size: 30px;
				}
			}

			&-user {
				width: 100%;
				height: 50px;
				display: flex;
				align-items: center;
				color: white;

				p {
					font-size: 18px;

					&:not(:last-child)::after {
						display: inline-block;
						height: 100%;
						vertical-align: middle;
						content: '.';
						margin: 0 5px;
					}
				}
			}
		}
	}

	&-body {
		width: 100%;
		min-height: 300px;
		display: flex;
		align-items: center;
		flex-direction: column;

		&-content {
			width: 50%;
			height: auto;
			margin: 50px 0;
			@media (max-width: 1200px) {
				width: 95%;
			}
		}

		&-recommend {
			width: 50%;

			p {
				text-align: center;
				font-weight: bold;
				height: 40px;
			}

			&-body {
				width: 100%;
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;

				&-item {
					width: 240px;
					height: 240px;
					border-radius: 10px;
					margin: 0 10px 15px;

					.link {
						cursor: pointer;
						display: inline-block;
						width: 100%;
						height: 100%;
						background-size: cover;
						background-position: center;
						border-radius: 10px;
						text-align: center;
						position: relative;

						span {
							color: white;
							height: 100%;
							background-image: radial-gradient(circle, rgba(0, 0, 0, 0.34), rgba(255, 255, 255, 0));
							display: flex;
							justify-content: center;
							align-items: center;
							padding: 0 10px;
							line-height: 1.2;
							font-size: 24px;

							&:hover {
								color: #269dcf;
							}
						}
					}
				}
			}
		}
	}
}

@media (max-width: 1000px) {
	.articleInfo-body-recommend {
		width: 100%;

		&-body {
			justify-content: center;
			&-item {
				width: 80%;
			}
		}
	}
}
</style>
