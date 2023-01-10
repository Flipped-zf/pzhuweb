<template>
	<div>
		<div id="content_head">
			<lunfan :allSlideshow="data.allSlideshow"></lunfan>
			<div class="right">
				<p align="center">热门文章</p>
				<div class="hot">
					<hot :allHotArticle="data.allHotArticle"></hot>
				</div>
			</div>
		</div>
		<div class="mainContent" id="mainContent2">
			<div class="head">
				<div class="biaoqian">
					<span>新闻分类:</span>
					<el-badge class="item">
						<el-button autofocus @click="getTechnology(0)">推荐</el-button>
					</el-badge>
					<el-badge :value="data.allGroup[item.id]" class="item" v-for="(item, index) in data.allTechnology" :key="item.id">
						<el-button @click="getTechnology(item.id)">{{ item.name }}</el-button>
					</el-badge>
				</div>
				<el-input v-model="searchWord" class="find" placeholder="请输入文章标题" :prefix-icon="Search" @keyup.enter="getKeywords" />
			</div>
			<div class="content">
				<el-skeleton style="width: 100%" :loading="loading" animated>
					<template #template>
						<div style="padding: 14px">
							<el-skeleton-item variant="image" style="width: 100%; height: 40vh" />
						</div>
						<div style="padding: 14px">
							<el-skeleton :rows="5" animated style="width: 100%" />
						</div>
					</template>
					<template #default>
						<div class="contentXinwen">
							<xinwen :article="item" v-for="(item, index) in data.allArticle" :key="item.id" class="xinwen"></xinwen>
							<!--            <loading></loading>-->
						</div>
						<div class="bottomLoading">
							<XWLoding v-show="loading2" v-if="!end"></XWLoding>
							<p v-else align="center" style="padding-bottom: 10px">
								<el-divider content-position="center">没有了</el-divider>
							</p>
						</div>
					</template>
				</el-skeleton>
			</div>
		</div>
	</div>
</template>

<script setup>
import Lunfan from '../components/dongtai/lunfan.vue';
import Hot from '../components/dongtai/hot.vue';
import { ref, onMounted, reactive, onUpdated, nextTick } from 'vue';
import { Search } from '@element-plus/icons-vue';
import Xinwen from '../components/dongtai/xinwen.vue';
import XWLoding from '../components/dongtai/XWLoding.vue';
import { Back, TweenMax } from 'gsap';
import axios from '../utils/request';
// import base from '../api/base';
import mybase from '../api/myBase';

const searchWord = ref('');
const loading = ref(true);
const loading2 = ref(false);
// const currentDate = new Date().toDateString()
const count = ref(1);
const end = ref(false);

const data = reactive({
	allSlideshow: [],
	allTechnology: [],
	allArticle: [],
	allHotArticle: [],
	allGroup: [],
});
const page = reactive({
	beg: 0,
	end: 8,
	index: 0,
	keywords: 'null',
});
// axios.get(mybase.getArticle + '/0/8/0/null').then((res) => console.log(res));
axios.get(mybase.getArticle + '/0/8/0/null').then((res) => {
	data.allSlideshow = res.data.data.slideshow;
	data.allTechnology = res.data.data.technology;
	data.allArticle = res.data.data.article;
	data.allHotArticle = res.data.data.hotArticle;
	data.allGroup = res.data.data.technologyGroup;
	loading.value = false;
});
let isMount = false;
onMounted(() => {
	isMount = true;
});
onUpdated(() => {
	if (isMount) {
		TweenMax.staggerFrom('.item', 1, { opacity: 0, x: -50, ease: Back.easeOut }, 0.3);
		isMount = false;
	}
});

const app = document.getElementById('app');
let isRefresh = false;
window.onscroll = function () {
	// 获取距离顶部的距离
	// var scrollTop = app.scrollTop;
	// 获取可视区的高度
	let windowHeight = app.clientHeight;
	// 获取滚动条的总高度
	let scrollHeight = app.scrollHeight;
	let my = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;
	// console.log(my+'-'+scrollTop+'-'+windowHeight+'-'+scrollHeight)
	if (my + windowHeight >= scrollHeight - 50 && !end.value) {
		if (!isRefresh && !loading2.value) {
			isRefresh = true;
			loading2.value = true;
			getArticle().then((res) => {
				// console.log(res.data.data.allArticle.length)
				data.allArticle = res.data.data.article;
				loading2.value = false;
				isRefresh = false;
				if (res.data.data.article.length < 8 * count.value) {
					end.value = true;
				}
			});
		}
	}
};

function getArticle() {
	// page.beg += 8
	page.end += 8;
	count.value++;
	return axios.get(`${mybase.getArticle}/${page.beg}/${page.end}/${page.index}/${page.keywords}`);
}

function getKeywords() {
	loading.value = true;
	page.beg = 0;
	page.end = 8;
	page.keywords = searchWord.value || 'null';
	count.value = 0;
	end.value = false;
	getArticle().then((res) => {
		data.allArticle = res.data.data.article;
		if (res.data.data.article.length < 8 * count.value) {
			end.value = true;
		}
		loading.value = false;
	});
	setTimeout(() => {
		TweenMax.staggerFrom('.xinwen', 0.5, {
			opacity: 0,
			y: 50,
			ease: Back.easeOut,
		});
	}, 300);
}

function getTechnology(id) {
	// data.allArticle = []
	loading.value = true;
	page.index = id;
	page.beg = 0;
	page.end = 8;
	count.value = 0;
	end.value = false;
	getArticle().then((res) => {
		data.allArticle = res.data.data.article;
		if (res.data.data.article.length < 8 * count.value) {
			end.value = true;
		}
		loading.value = false;
	});
}
</script>

<style scoped lang="less">
:deep(.el-divider__text) {
	color: #999999;
}
@media screen and (max-width: 768px) {
	#mainContent2 {
		width: 100vw;

		.head {
			flex-direction: column;

			.item {
				margin: 6px 15px;
			}

			.find {
				align-self: end;
			}
		}
	}
}

.mainContent {
	width: 80vw;
	margin: 15px auto 0;

	.head {
		background-color: white;
		//height: 63px;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.biaoqian {
			span {
				display: inline-block;
				font-size: 20px;
				font-weight: bold;
				padding: 10px 10px;
				letter-spacing: 3px;
			}

			.item {
				margin: 3px 15px;
			}
		}

		.find {
			width: 200px;
			margin-right: 20px;
		}
	}

	.content {
		background-color: white;
		margin: 10px 0 0 0;

		.contentXinwen {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
			justify-items: center;
		}

		.bottomLoading {
			width: 100%;
		}
	}
}

#content_head {
	margin: 5px auto 0;
	width: 80vw;
	background-color: white;
	overflow: hidden;
	display: flex;
	justify-content: space-around;
	align-items: center;
	overflow: visible;

	.right {
		p {
			font-weight: bold;
			font-size: 22px;
		}
	}
}
@media screen and (max-width: 900px) {
	#content_head {
		flex-direction: column;
		width: 100vw !important;
	}
}
</style>
