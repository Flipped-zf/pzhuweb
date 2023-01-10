<template>
	<div class="wrapper">
		<div class="news-slider" id="news-slider">
			<div class="item-bg"></div>

			<div class="news-slider__wrp swiper-wrapper">
				<div class="news-slider__item swiper-slide" v-for="(item, index) in data.allAlbum" :key="index + 'al'" @click="fullAction(item.id)">
					<a class="news__item">
						<div class="news-date">
							<span class="news-date__title">{{ item.AlbumType.name }}</span>
							<span class="news-date__txt">{{ data.allPhoto[item.id] + ' 张' }}</span>
						</div>
						<div class="news__title">{{ item.name }}</div>

						<p class="news__txt">
							{{ item.description }}
						</p>

						<div class="news__img">
							<img :src="item.Photo.link" alt="news" />
						</div>
					</a>
				</div>
			</div>

			<div class="news-slider__ctr">
				<div class="news-slider__arrows">
					<button class="news-slider__arrow news-slider-prev">
						<span class="icon-font">
							<svg class="icon icon-arrow-left">
								<use xlink:href="#icon-arrow-left"></use>
							</svg>
						</span>
					</button>
					<button class="news-slider__arrow news-slider-next">
						<span class="icon-font">
							<svg class="icon icon-arrow-right">
								<use xlink:href="#icon-arrow-right"></use>
							</svg>
						</span>
					</button>
				</div>
				<div class="news-slider__pagination"></div>
			</div>
		</div>
		<svg hidden="hidden" style="display: none">
			<defs>
				<symbol id="icon-arrow-left" viewBox="0 0 32 32">
					<title>arrow-left</title>
					<path
						d="M0.704 17.696l9.856 9.856c0.896 0.896 2.432 0.896 3.328 0s0.896-2.432 0-3.328l-5.792-5.856h21.568c1.312 0 2.368-1.056 2.368-2.368s-1.056-2.368-2.368-2.368h-21.568l5.824-5.824c0.896-0.896 0.896-2.432 0-3.328-0.48-0.48-1.088-0.704-1.696-0.704s-1.216 0.224-1.696 0.704l-9.824 9.824c-0.448 0.448-0.704 1.056-0.704 1.696s0.224 1.248 0.704 1.696z"
					></path>
				</symbol>
				<symbol id="icon-arrow-right" viewBox="0 0 32 32">
					<title>arrow-right</title>
					<path
						d="M31.296 14.336l-9.888-9.888c-0.896-0.896-2.432-0.896-3.328 0s-0.896 2.432 0 3.328l5.824 5.856h-21.536c-1.312 0-2.368 1.056-2.368 2.368s1.056 2.368 2.368 2.368h21.568l-5.856 5.824c-0.896 0.896-0.896 2.432 0 3.328 0.48 0.48 1.088 0.704 1.696 0.704s1.216-0.224 1.696-0.704l9.824-9.824c0.448-0.448 0.704-1.056 0.704-1.696s-0.224-1.248-0.704-1.664z"
					></path>
				</symbol>
			</defs>
		</svg>
	</div>
	<el-dialog v-model="visible" :show-close="false" :width="isPhone ? '90%' : '50%'">
		<template #header="{ close, titleId, titleClass }">
			<div class="my-header">
				<h4 :id="titleId" :class="titleClass">
					{{ '更新时间: ' + dayjs(titleInfo?.updatedAt).format('YYYY-MM-DD') }}
				</h4>
				<el-button type="danger" @click="close">
					<el-icon class="el-icon--left"><CircleCloseFilled /></el-icon>
					Close
				</el-button>
			</div>
		</template>
		<img-show :imgsData="data.currentDate"></img-show>
	</el-dialog>
</template>

<script setup>
import $ from 'jquery';
import { computed, inject, onMounted, reactive, ref } from 'vue';
import Swiper from 'swiper/bundle';
import album from '../../api/album.js';
import { CircleCloseFilled } from '@element-plus/icons-vue';
import ImgShow from './imgShow.vue';
import dayjs from 'dayjs';
const data = reactive({
	type: 0,
	keywords: 'null',
	id: 1,
	allAlbum: [],
	allPhoto: {},
	currentDate: {},
});
const visible = ref(false);
const isPhone = inject('isPhone');
const titleInfo = computed(() => data.currentDate.albumInfo);

const requestData = await album.getAlbums({
	type: data.type,
});

data.allAlbum = requestData.data.albums;
data.allPhoto = requestData.data.photoNum;

onMounted(() => {
	let bg = document.querySelector('.item-bg');
	let newslider = document.querySelector('.news-slider');
	if ($(window).width() > 800) {
		$(document).on('mouseover', '.news__item', function (_event, _element) {
			let newsItem = document.querySelectorAll('.news__item');
			newsItem.forEach(function (element, index) {
				element.addEventListener('mouseover', function () {
					let x = this.getBoundingClientRect().left - newslider.offsetLeft;
					let y = 30;
					let width = this.getBoundingClientRect().width;
					let height = this.getBoundingClientRect().height;

					$('.item-bg').addClass('active');
					$('.news__item').removeClass('active');
					// $('.news__item').removeClass('active');
					bg.style.width = width + 'px';
					bg.style.height = height + 'px';
					bg.style.transform = 'translateX(' + x + 'px ) translateY(' + y + 'px)';
				});

				element.addEventListener('mouseleave', function () {
					$('.item-bg').removeClass('active');
					$('.news__item').removeClass('active');
				});
			});
		});
	}

	let swiper = new Swiper('#news-slider', {
		effect: 'coverflow',
		grabCursor: true,
		loop: false,
		centeredSlides: true, //没用
		keyboard: true,
		spaceBetween: 0,
		slidesPerView: 'auto',
		speed: 300,
		autoplay: {
			pauseOnMouseEnter: true,
			disableOnInteraction: false,
		}, //可选选项，自动滑动
		coverflowEffect: {
			rotate: 0,
			stretch: 0,
			depth: 0,
			modifier: 3,
			slideShadows: false,
		},
		breakpoints: {
			480: {
				spaceBetween: 0,
				centeredSlides: true,
			},
		},
		simulateTouch: true,
		navigation: {
			nextEl: '.news-slider-next',
			prevEl: '.news-slider-prev',
		},
		pagination: {
			el: '.news-slider__pagination',
			clickable: true,
		},
		on: {
			init: function () {
				let activeItem = document.querySelector('.swiper-slide-active');

				let sliderItem = activeItem.querySelector('.news__item');

				$('.swiper-slide-active .news__item').addClass('active');

				let x = sliderItem.getBoundingClientRect().left - newslider.offsetLeft;
				let y = 30;
				let width = sliderItem.getBoundingClientRect().width;
				let height = sliderItem.getBoundingClientRect().height;

				$('.item-bg').addClass('active');

				bg.style.width = width + 'px';
				bg.style.height = height + 'px';
				bg.style.transform = 'translateX(' + x + 'px ) translateY(' + y + 'px)';
			},
		},
	});

	swiper.on('touchEnd', function () {
		$('.news__item').removeClass('active');
		$('.swiper-slide-active .news__item').addClass('active');
	});

	swiper.on('slideChange', function () {
		$('.news__item').removeClass('active');
	});

	swiper.on('slideChangeTransitionEnd', function () {
		$('.news__item').removeClass('active');
		let activeItem = document.querySelector('.swiper-slide-active');

		let sliderItem = activeItem.querySelector('.news__item');

		$('.swiper-slide-active .news__item').addClass('active');

		let x = sliderItem.getBoundingClientRect().left - newslider.offsetLeft;
		let y = 30;
		let width = sliderItem.getBoundingClientRect().width;
		let height = sliderItem.getBoundingClientRect().height;

		$('.item-bg').addClass('active');

		bg.style.width = width + 'px';
		bg.style.height = height + 'px';
		bg.style.transform = 'translateX(' + x + 'px ) translateY(' + y + 'px)';
	});
});
// const requestData = await axios.get(
//   `${base.getAlbumTypes}/${data.type}/${data.keywords}`
// )
function fullAction(val) {
	// let bg = document.querySelector('.item-bg')
	// bg.style.cssText = 'width: 100%;'
	visible.value = true;
	data.id = val;
	getDatesId();
}
function getDatesId() {
	album
		.getPhotosByAlbumId({
			id: data.id,
		})
		.then((res) => {
			console.log(res);
			data.currentDate = res.data;
		});
}
</script>
<style>
.el-overlay {
	z-index: 1000 !important;
}
.my-header {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
.news-slider__pagination {
	text-align: center;
	margin-top: 50px;
}
.news-slider__pagination .swiper-pagination-bullet {
	width: 13px;
	height: 10px;
	display: inline-block;
	background: #fff;
	opacity: 0.2;
	margin: 0 5px;
	border-radius: 20px;
	transition: opacity 0.5s, background-color 0.5s, width 0.5s;
	transition-delay: 0.5s, 0.5s, 0s;
}
.news-slider__pagination .swiper-pagination-bullet-active {
	opacity: 1;
	background: #ffffff;
	width: 100px;
	transition-delay: 0s;
}
@media screen and (max-width: 576px) {
	.news-slider__pagination .swiper-pagination-bullet-active {
		width: 70px;
	}
}
</style>

<style scoped>
@import './teamImg.css';
</style>
