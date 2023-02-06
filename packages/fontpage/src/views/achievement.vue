<template>
	<div class="mainContent" id="mainContent2">
		<div class="head">
			<div class="biaoqian">
				<span>资源分享:</span>
				<el-badge class="item">
					<el-button autofocus @click="getTechnology(0)">推荐</el-button>
				</el-badge>
				<el-badge :value="item.index" class="item" v-for="(item, index) in data.achievementType" :key="index + 'b'" @click="getTechnology(item.id)">
					<el-button>{{ item.name }}</el-button>
				</el-badge>
			</div>
			<el-input v-model="searchWord" class="find" placeholder="请输入成果名称" :prefix-icon="Search" @keyup.enter="getKey()" />
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
					<div class="contentRes">
						<achievementCard class="resCard" :achievement="item" v-for="(item, index) in data.achievementByPage" :key="index + 'r'"></achievementCard>
					</div>
					<div class="bottomLoading">
						<XWLoding v-show="loading2" v-if="!end"></XWLoding>
						<p v-else align="center" style="padding-bottom: 10px; margin-top: 20px">
							<el-divider content-position="center">没有了</el-divider>
						</p>
					</div>
				</template>
			</el-skeleton>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, onUpdated, reactive, inject } from 'vue';
import { Search } from '@element-plus/icons-vue';
import { Back, TweenMax } from 'gsap';
import axios from '../utils/request';
import base from '../api/myBase';
import achievementCard from '../components/other/achievementCard.vue';

const searchWord = ref('');
const loading = ref(true);
const data = reactive({
	achievementByPage: [],
	achievementType: [],
});
const loading2 = ref(false);
const count = ref(1);
const end = ref(false);
const isPhone = inject('isPhone');
const page = reactive({
	beg: 0,
	end: isPhone.value ? 0 : 5,
	index: 0,
	keywords: 'null',
});

// axios.get(base.getAchievement + '/0/10/0/null').then((res) => {
// 	data.achievementByPage = res.data.data.achievementByPage;
// 	data.achievementType = res.data.data.achievementType;
// 	loading.value = false;
// });
getArticle().then((res) => {
	data.achievementByPage = res.data.data.ac;
	data.achievementType = res.data.data.acType;
	loading.value = false;
});
let isMount = false;
onMounted(() => {
	isMount = true;
});
// let timer
onUpdated(() => {
	// if (timer) {
	//   clearTimeout(timer)
	// }
	// timer = setTimeout(() =>{
	//   if (document.getElementsByClassName('resCard')[0]) {
	//     TweenMax.staggerFrom(".resCard", 1, {opacity: 0, y: 50, ease: Back.easeOut}, 0.1);
	//   }
	// },500)
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
				data.achievementByPage = res.data.data.ac;
				loading2.value = false;
				isRefresh = false;
				if (res.data.data.ac.length < 10 * count.value) {
					end.value = true;
				}
			});
		}
	}
};

function getArticle() {
	// page.beg += 8
	page.end += 10;
	count.value++;
	const params = {
		beg: page.beg,
		end: page.end,
		index: page.index,
		keywords: page.keywords,
	};
	return axios.get(base.getAchievement, { params });
}

function getKey() {
	loading.value = true;
	page.beg = 0;
	page.end = 10;
	page.keywords = searchWord.value || 'null';
	count.value = 0;
	end.value = false;
	getArticle().then((res) => {
		data.achievementByPage = res.data.data.ac;
		if (res.data.data.ac < 10 * count.value) {
			end.value = true;
		}
		loading.value = false;
	});
	setTimeout(() => {
		if (document.getElementsByClassName('resCard')[0]) {
			TweenMax.staggerFrom('.resCard', 1, { opacity: 0, y: 50, ease: Back.easeOut }, 0.1);
		}
	}, 300);
}

function getTechnology(id) {
	// data.allArticle = []
	loading.value = true;
	page.index = id;
	page.beg = 0;
	page.end = 10;
	count.value = 0;
	end.value = false;
	getArticle().then((res) => {
		data.achievementByPage = res.data.data.ac;
		if (res.data.data.ac.length < 10 * count.value) {
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

@media screen and (max-width: 900px) {
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
	margin: 5px auto 0;

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

		.contentRes {
			//height: 80vh;
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
			justify-items: center;
			grid-row-gap: 20px;
		}
	}
}
</style>
