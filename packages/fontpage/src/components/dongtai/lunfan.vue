<template>
	<div class="swiper" id="swiper4">
		<div class="swiper-wrapper">
			<div class="swiper__item swiper-slide" v-for="(item, index) in props.allSlideshow" :key="index">
				<div class="swiper__img">
					<img :src="item.postlink" alt="" />
				</div>
				<div class="swiper__content">
					<div style="display: flex; align-items: center; margin-bottom: 15px">
						<span class="swiper__code">{{ dayjs(item.createdAt).format('YYYY-MM-DD') }}</span>
						<el-avatar :src="item.UserInfo.avatar" @click.stop="router.push({ path: `/user/${item.userid}/article` })" />
						<span style="padding-left: 10px">{{ item.UserInfo.User.name }}</span>
					</div>
					<div class="swiper__title">{{ item.title }}</div>
					<div
						class="swiper__text"
						style="
							overflow: hidden;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 3;
							-ms-text-overflow: ellipsis;
							text-overflow: ellipsis;
						"
					>
						{{ item.introduction }}
					</div>
					<div class="swiper__button" @click.prevent.stop="goDerails(item.id)">READ MORE</div>
				</div>
			</div>
		</div>
		<div class="swiper__pagination"></div>
	</div>
</template>

<script setup>
import { onMounted } from 'vue';
import Swiper from 'swiper/bundle';
import dayjs from 'dayjs';
import router from '../../router';
const props = defineProps({
	allSlideshow: Array,
});
onMounted(() => {
	// console.log(props.allSlideshow)
	new Swiper('#swiper4', {
		spaceBetween: 30,
		effect: 'fade',
		loop: true,
		parallax: true,
		grabCursor: true,
		observer: true,
		observeParents: true,
		autoplay: {
			pauseOnMouseEnter: true,
			disableOnInteraction: false,
		}, //可选选项，自动滑动
		mousewheel: {
			invert: false,
		},
		fadeEffect: {
			crossFade: true,
		},
		// autoHeight: true,
		pagination: {
			el: '.swiper__pagination',
			clickable: true,
		},
	});
});
function goDerails(num) {
	router.push({ path: '/articleDetails', query: { id: num } });
}
</script>

<style scoped lang="less">
.swiper {
	width: 95%;
	position: relative;
	max-width: 800px;
	margin: 30px 0 0 50px;
	background: #fff;
	box-shadow: 0px 8px 15px rgba(34, 35, 58, 0.2);
	padding: 25px;
	border-radius: 25px;
	height: 400px;
	transition: all 0.3s;
	overflow: visible;
}

@media screen and (max-width: 992px) {
	#swiper4 {
		max-width: 680px;
		height: 400px;
	}
}

@media screen and (max-width: 768px) {
	.swiper {
		margin: 110px auto 60px;
	}
}

@media screen and (max-height: 500px) and (min-width: 992px) {
	.swiper {
	}
}

.swiper__item {
	display: flex;
	align-items: center;
}

@media screen and (max-width: 768px) {
	.swiper__item {
		flex-direction: column;
	}
}

.swiper__item.swiper-slide-active .swiper__img img {
	opacity: 1;
	transition-delay: 0.3s;
}

.swiper__item.swiper-slide-active .swiper__content > * {
	opacity: 1;
	transform: none;
}

.swiper__item.swiper-slide-active .swiper__content > *:nth-child(1) {
	transition-delay: 0.3s;
}

.swiper__item.swiper-slide-active .swiper__content > *:nth-child(2) {
	transition-delay: 0.4s;
}

.swiper__item.swiper-slide-active .swiper__content > *:nth-child(3) {
	transition-delay: 0.5s;
}

.swiper__item.swiper-slide-active .swiper__content > *:nth-child(4) {
	transition-delay: 0.6s;
}

.swiper__item.swiper-slide-active .swiper__content > *:nth-child(5) {
	transition-delay: 0.7s;
}

.swiper__item.swiper-slide-active .swiper__content > *:nth-child(6) {
	transition-delay: 0.8s;
}

.swiper__item.swiper-slide-active .swiper__content > *:nth-child(7) {
	transition-delay: 0.9s;
}

.swiper__item.swiper-slide-active .swiper__content > *:nth-child(8) {
	transition-delay: 1s;
}

.swiper__item.swiper-slide-active .swiper__content > *:nth-child(9) {
	transition-delay: 1.1s;
}

.swiper__item.swiper-slide-active .swiper__content > *:nth-child(10) {
	transition-delay: 1.2s;
}

.swiper__item.swiper-slide-active .swiper__content > *:nth-child(11) {
	transition-delay: 1.3s;
}

.swiper__item.swiper-slide-active .swiper__content > *:nth-child(12) {
	transition-delay: 1.4s;
}

.swiper__item.swiper-slide-active .swiper__content > *:nth-child(13) {
	transition-delay: 1.5s;
}

.swiper__item.swiper-slide-active .swiper__content > *:nth-child(14) {
	transition-delay: 1.6s;
}

.swiper__item.swiper-slide-active .swiper__content > *:nth-child(15) {
	transition-delay: 1.7s;
}

.swiper__img {
	width: 300px;
	flex-shrink: 0;
	height: 300px;
	box-shadow: 4px 13px 30px 1px rgba(59, 59, 59, 0.2);
	border-radius: 20px;
	transform: translateX(-80px);
	overflow: hidden;
}

.swiper__img img {
	width: 100%;
	height: 100%;
	object-fit: cover;
	display: block;
	opacity: 0;
	border-radius: 20px;
	transition: all 0.3s;
}

@media screen and (max-width: 768px) {
	.swiper__img {
		transform: translateY(-50%);
		width: 90%;
		height: 210px;
	}
}

@media screen and (max-width: 576px) {
	.swiper__img {
		width: 95%;
		height: 210px;
	}
}

@media screen and (max-height: 500px) and (min-width: 992px) {
	.swiper__img {
		height: 210px;
	}
}

.swiper__content {
	padding-right: 25px;
}

@media screen and (max-width: 768px) {
	.swiper__content {
		margin-top: -80px;
		text-align: center;
		padding: 0 30px;
	}
}

@media screen and (max-width: 576px) {
	.swiper__content {
		padding: 0;
	}
}

.swiper__content > * {
	opacity: 0;
	transform: translateY(25px);
	transition: all 0.4s;
}

.swiper__code {
	color: #7b7992;
	//margin-bottom: 15px;
	display: block;
	font-weight: 500;
	padding-right: 10px;
}

.swiper__code:before {
	font-family: 'iconfont';
	margin-right: 10px;
	content: '\e8b4';
}

.swiper__title {
	font-size: 24px;
	font-weight: 700;
	color: #0d0925;
	margin-bottom: 20px;
}

.swiper__text {
	color: #4e4a67;
	margin-bottom: 20px;
	line-height: 1.5em;
}

.swiper__button {
	cursor: pointer;
	display: inline-block;
	background-image: linear-gradient(147deg, #73c320 0%, #f6c601 100%);
	padding: 15px 35px;
	border-radius: 50px;
	color: #fff;
	box-shadow: 0px 8px 30px rgba(48, 48, 48, 0.4);
	text-decoration: none;
	font-weight: 500;
	justify-content: center;
	text-align: center;
	letter-spacing: 1px;
}

@media screen and (max-width: 576px) {
	.swiper__button {
		width: 60%;
		min-width: 190px;
		padding: 5px 0;
		box-shadow: 0px 8px 15px rgba(48, 48, 48, 0.4);
		letter-spacing: 0.5px;
	}
}

.swiper .swiper-container-horizontal > .swiper-pagination-bullets,
.swiper .swiper-pagination-custom,
.swiper .swiper-pagination-fraction {
	bottom: 10px;
	left: 0;
	width: 100%;
}

.swiper__pagination {
	position: absolute;
	z-index: 21;
	right: 20px;
	width: 11px !important;
	text-align: center;
	left: auto !important;
	top: 50%;
	bottom: auto !important;
	transform: translateY(-50%);
}

@media screen and (max-width: 768px) {
	:deep(.swiper__pagination) {
		transform: translateX(-50%);
		left: 50% !important;
		top: 430px;
		width: 100% !important;
		display: flex;
		justify-content: center;
		align-items: center;
	}
}

:deep(.swiper__pagination.swiper-pagination-bullets .swiper-pagination-bullet) {
	margin: 8px 0;
}

@media screen and (max-width: 768px) {
	:deep(.swiper__pagination.swiper-pagination-bullets .swiper-pagination-bullet) {
		margin: 0 5px;
	}
}

:deep(.swiper__pagination .swiper-pagination-bullet) {
	width: 11px;
	height: 11px;
	display: block;
	border-radius: 10px;
	background: #062744;
	opacity: 0.2;
	transition: all 0.3s;
}

:deep(.swiper__pagination .swiper-pagination-bullet-active) {
	opacity: 1;
	background: #29a6d3;
	height: 30px;
	box-shadow: 0px 0px 20px rgba(8, 8, 8, 0.3);
}

@media screen and (max-width: 768px) {
	:deep(.swiper__pagination .swiper-pagination-bullet-active) {
		height: 11px;
		width: 30px;
	}
}
</style>
