<template>
	<div class="firstview">
		<div class="swiper swiper-no-swiping" id="swiper1">
			<div class="swiper-wrapper">
				<div class="swiper-slide" v-for="(item, index) in firstData.coverArray" :key="index">
					<img :src="item" data-swiper-parallax-scale="1.1" />
				</div>
				<!-- <div class="swiper-slide">
					<img :src="firstData.cover" data-swiper-parallax-scale="1.1" />
				</div>
				<div class="swiper-slide">
					<img :src="firstData.cover" data-swiper-parallax-scale="1.1" />
				</div> -->
			</div>
		</div>
		<div class="ftest">
			<div id="typing-demo">
				<p align="center"></p>
				<p align="center"></p>
			</div>
		</div>
		<div class="gobt">
			<goviewbt></goviewbt>
		</div>
	</div>
	<!--  {{firstData.cover}}-->
</template>

<script setup>
import Swiper from 'swiper/bundle';
import { onMounted } from 'vue';
import goviewbt from './goviewbt.vue';

const props = defineProps({
	firstData: {
		type: Object,
		// default: () => ({
		// 	desc: 'WEB应用专业团队，欢迎你的加入！',
		// 	title: '你的梦想，从这里开始',
		// }),
	},
});

// watch([props], ([newProps], [oldProps]) => {
//   fontDeno(newProps.firstData.description, newProps.firstData.title)
// })
onMounted(() => {
	new Swiper('#swiper1', {
		speed: 3000,
		// init: false,
		autoplay: {
			delay: 3000,
			stopOnLastSlide: false,
			disableOnInteraction: false,
		},
		observer: true,
		observeParents: true,
		effect: 'fade',
		fadeEffect: {
			crossFade: true,
		},
		parallax: true,
	});
	fontDeno(props.firstData.desc, props.firstData.title);
});

function fontDeno(s, s2) {
	let divTyping = document.getElementById('typing-demo');
	let str = [];
	str.push(s);
	str.push(s2);
	new Promise((resolve) => {
		let i = 0,
			timer = 0;
		function typing() {
			if (i <= str[0].length) {
				divTyping.children[0].innerText = str[0].slice(0, i++) + '_';
				timer = setTimeout(typing, 200);
			} else {
				divTyping.children[0].innerText = str[0]; //结束打字,移除 _ 光标
				clearTimeout(timer);
				resolve();
			}
		}

		typing();
	}).then(() => {
		let i = 0,
			timer = 0;
		function typing() {
			if (i <= str[1].length) {
				divTyping.children[1].innerText = str[1].slice(0, i++) + '_';
				timer = setTimeout(typing, 200);
			} else {
				divTyping.children[1].innerText = str[1]; //结束打字,移除 _ 光标
				clearTimeout(timer);
			}
		}
		typing();
	});
}
</script>

<style scoped lang="less">
// @keyframes move {

// }
.firstview {
	position: relative;
	height: 81vh;
	.gobt {
		height: 100%;
		width: 100%;
		position: absolute;
		top: 0;
		z-index: 2;
		margin: auto;
	}

	.ftest {
		color: white;
		position: absolute;
		top: 30%;
		z-index: 2;
		right: 10px;
		transform: translateY(-50%);
		font-weight: bold;
		font-size: 34px;
		letter-spacing: 5px;
		line-height: 50px;
	}

	&::before {
		content: '';
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		background-color: #000000;
		opacity: 0.1;
		z-index: 2;
	}
}

.swiper {
	height: 81vh;

	.swiper-slide {
		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			object-position: center;
		}
	}
}
@media screen and(min-width: 200px) and (max-width: 768px) {
	.firstview {
		.ftest {
			#typing-demo {
				font-size: 24px;
			}
		}
	}
}
</style>
