<template>
	<div class="post-module" @click="goDerails('pc')" ref="myXW">
		<!-- Thumbnail-->
		<div class="thumbnail">
			<img :src="article.postlink" />
		</div>
		<!-- Post Content-->
		<div class="post-content">
			<div class="category">{{ article.keywords }}</div>
			<h1 class="title">{{ article.title }}</h1>
			<div class="sub_title">
				<i class="iconfont icon-biaoqian"></i>
				<el-tag class="ml-2" type="success">{{ article.keywords }}</el-tag>
				<el-tag class="ml-2" type="info">{{ article.Menu.name }}</el-tag>
				<el-tag class="ml-2" type="warning">{{ article.Technology.name }}</el-tag>
			</div>
			<div class="description">{{ article.introduction }}</div>
			<div class="post-meta">
				<span class="timestamp"> <i class="iconfont icon-liulan" style="margin-right: 10px"></i>浏览{{ article.readnumber }} </span>
				<span class="comments">
					<i class="iconfont icon-rili" style="margin-right: 5px"></i>
					{{ dayjs(article.created_at).format('YYYY-MM-DD') }}
				</span>
				<span>
					<img
						@click.stop="router.push({ path: `/user/${article.userid}/article` })"
						:src="article.UserInfo.avatar"
						style="object-fit: cover; object-position: center; margin: 0 5px; vertical-align: middle; width: 30px; height: 30px; border-radius: 50%"
					/>
					<span style="font-size: 12px; color: #999999">{{ article.UserInfo.User.name }}</span>
				</span>
			</div>
			<p class="read-more" v-if="isPhone">
				<a href="" @click.prevent.stop="goDerails('noPC')" style="color: #5ad67d">Read More</a>
			</p>
		</div>
	</div>
</template>

<script setup>
import { onMounted, inject, ref } from 'vue';
import dayjs from 'dayjs';
import { TweenMax, Power1 } from 'gsap';
import router from '../../router';

const myXW = ref(null);
const props = defineProps({
	article: Object,
});
const isPhone = inject('isPhone');
// console.log(isPhone)
onMounted(() => {});

function myFunction() {
	router.push({ path: '/articleDetails', query: { id: props.article.id } });
}
function goDerails(s) {
	if (!isPhone.value) {
		TweenMax.from(myXW.value, 1, {
			scale: 0.7,
			ease: Power1.easeOut,
		});
		TweenMax.delayedCall(0.5, myFunction, ['参数1', '参数2']);
	} else {
		if (s == 'noPC') {
			router.push({ path: '/articleDetails', query: { id: props.article.id } });
		}
	}
}
</script>

<style scoped>
.read-more {
	text-align: right;
}

.read-more a {
	color: #5ad67d;
	display: inline-block;
	position: relative;
}

.read-more a:after {
	content: '\eb0b';
	font-family: 'iconfont';
	margin-left: -10px;
	opacity: 0;
	vertical-align: middle;
	transition: margin 0.3s, opacity 0.3s;
}

.read-more a:hover:after {
	margin-left: 5px;
	opacity: 1;
}

.post-module {
	cursor: pointer;
	position: relative;
	z-index: 1;
	display: block;
	background: #ffffff;
	width: 350px;
	height: 470px;
	-webkit-box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.15);
	-moz-box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.15);
	box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.3);
	-webkit-transition: all 0.3s linear 0s;
	-moz-transition: all 0.3s linear 0s;
	-ms-transition: all 0.3s linear 0s;
	-o-transition: all 0.3s linear 0s;
	transition: all 0.3s linear 0s;
	margin: 0 0 30px 0;
}
@media screen and (max-width: 350px) {
	.post-module {
		width: 100%;
	}
}

.post-module:hover .thumbnail img {
	-webkit-transform: scale(1.1);
	-moz-transform: scale(1.1);
	transform: scale(1.1);
	opacity: 0.6;
}

.post-module .thumbnail {
	background: #000000;
	height: 400px;
	overflow: hidden;
}

.post-module .thumbnail img {
	display: block;
	width: 100%;
	-webkit-transition: all 0.3s linear 0s;
	-moz-transition: all 0.3s linear 0s;
	-ms-transition: all 0.3s linear 0s;
	-o-transition: all 0.3s linear 0s;
	transition: all 0.3s linear 0s;
	object-fit: cover;
	object-position: center;
}

.post-module .post-content {
	position: absolute;
	bottom: 0;
	background: #ffffff;
	width: 100%;
	padding: 30px;
	-webkti-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
	-webkit-transition: all 0.3s cubic-bezier(0.37, 0.75, 0.61, 1.05) 0s;
	-moz-transition: all 0.3s cubic-bezier(0.37, 0.75, 0.61, 1.05) 0s;
	-ms-transition: all 0.3s cubic-bezier(0.37, 0.75, 0.61, 1.05) 0s;
	-o-transition: all 0.3s cubic-bezier(0.37, 0.75, 0.61, 1.05) 0s;
	transition: all 0.3s cubic-bezier(0.37, 0.75, 0.61, 1.05) 0s;
}

.post-module .post-content .category {
	position: absolute;
	top: -39px;
	left: 0;
	background: #e74c3c;
	padding: 10px 15px;
	color: #ffffff;
	font-size: 14px;
	font-weight: 600;
	text-transform: uppercase;
}

.post-module .post-content .title {
	margin: 0 0 10px 0;
	/*padding: 0 0 10px;*/
	color: #333333;
	font-size: 24px;
	font-weight: 700;
	overflow: hidden;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	-ms-text-overflow: ellipsis;
	text-overflow: ellipsis;
}

.post-module .post-content .sub_title {
	margin: 0;
	padding: 0 0 20px;
	color: #e74c3c;
	font-size: 20px;
	font-weight: 400;
}

.post-module .post-content .sub_title .ml-2 {
	margin: 0 5px;
}

.post-module .description {
	/*display: none;*/
	overflow: hidden;
	height: 0;
	width: 100%;
	color: #666666;
	font-size: 14px;
	line-height: 1.8em;
	transition: height 0.5s linear;
}

.post-module:hover .post-content .description {
	/*display: block ;*/
	height: 100px;
}

.post-module .post-content .post-meta {
	margin: 30px 0 0;
	color: #999999;
	line-height: 30px;
	height: 30px;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.post-module .post-content .post-meta .timestamp {
	margin: 0 16px 0 0;
	font-size: 15px;
}

.post-module .post-content .post-meta a {
	color: #999999;
	text-decoration: none;
}

/*.hover .post-content .description {*/
/*  display: block !important;*/
/*  height: auto !important;*/
/*  opacity: 1 !important;*/
/*}*/
</style>
