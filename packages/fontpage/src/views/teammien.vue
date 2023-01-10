<template>
	<div>
		<Suspense>
			<!-- 具有深层异步依赖的组件 -->
			<teamImg></teamImg>
			<!-- 在 #fallback 插槽中显示 “正在加载中” -->
			<template #fallback>
				<div style="height: 650px">
					<myloading></myloading>
				</div>
			</template>
		</Suspense>
		<div class="team">
			<div id="teamSwiper">
				<div class="swiper-wrapper">
					<div class="swiper-slide">
						<div class="Pfirst myMove" data-swiper-parallax-x="200" data-swiper-parallax-opacity="0.5">
							<div class="player-cover">
								<div class="player-cover__item"></div>
							</div>
							<div style="padding: 30px 30px 30px 200px; width: 100%; word-break: break-all">sddddddddddgsdgsddddddddddddddddddddddddddddddd</div>
						</div>
						<div class="Psecend myMove" data-swiper-parallax-x="-200" data-swiper-parallax-opacity="0.5"></div>
					</div>
					<div class="swiper-slide">
						<div class="Pfirst myMove" data-swiper-parallax-x="200" data-swiper-parallax-opacity="0.5"></div>
						<div class="Psecend myMove" data-swiper-parallax-x="-200" data-swiper-parallax-opacity="0.5"></div>
					</div>
					<div class="swiper-slide">slider3</div>
				</div>
				<div class="swiper-pagination"></div>
			</div>
		</div>
	</div>
</template>

<script setup>
import Swiper from 'swiper/bundle';
import moveAction from '@/utils/moveAnimation.ts';
import { onMounted, reactive, inject, watchEffect } from 'vue';
import teamImg from '@/components/team/teamImg.vue';
import Myloading from '../components/other/myloading.vue';

const data = reactive({
	myAnimate: {
		with: 800,
		height: 600,
	},
});
const isPhone = inject('isPhone');
let myMove = null;
watchEffect(() => {
	if (isPhone.value) {
		data.myAnimate.height = window.innerHeight * 0.8;
		data.myAnimate.with = window.innerWidth * 0.9;
		myMove?.setOptions(data.myAnimate.with, data.myAnimate.height);
	} else {
		myMove?.setOptions(800, 600);
	}
	myMove?.removeAll();
});
onMounted(() => {
	myMove = new moveAction({
		target: document.getElementsByClassName('myMove'),
		width: data.myAnimate.with,
		height: data.myAnimate.height,
	});

	let mySwiper = new Swiper('#teamSwiper', {
		// autoplay: true, //可选选项，自动滑动
		direction: 'vertical',
		parallax: true,
		enabled: false,
		mousewheel: {
			releaseOnEdges: true,
		},
		touchReleaseOnEdges: true,
		// preventInteractionOnTransition: true,
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
			dynamicBullets: true,
		},
		on: {
			slideChangeTransitionStart: function () {
				myMove.removeAll();
			},
		},
	});
	window.addEventListener('scroll', function (e) {
		const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
		const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;

		if (scrollTop + clientHeight >= scrollHeight) {
			mySwiper.enable();
		} else {
			mySwiper.disable();
		}
	});
});
</script>

<style scoped lang="less">
.team {
	overflow: hidden;
	width: 100%;
	height: 100vh;
}
//@media screen and (max-width: 900px) {
//  .team {
//    height: 100%;
//  }
//}
#teamSwiper {
	position: relative;
	//overflow: hidden;
	width: 100%;
	height: 100%;
	.swiper-slide {
		width: 100%;
		height: 100%;
		//position: relative;
	}
	.Pfirst,
	.Psecend {
		width: 600px;
		height: 300px;
		position: absolute;
		transition: all 1s ease-in-out;
		border-radius: 30px;
		//bo2x-shadow: 0px 20px 60px #c6c5c6, -20px -20px 60px #ffffff,
		//  0 0 2vh 2vh hsl(0, 0%, 96%);
		.player-cover {
			width: 200px;
			height: 300px;
			float: left;
			margin-left: -70px;
			margin-top: 20px;
			flex-shrink: 0;
			position: relative;
			z-index: 2;
			border-radius: 15px;
			background-color: #0e0620;
			.player-cover__item {
				background-repeat: no-repeat;
				background-position: center;
				background-size: cover;
				background-image: url('../assets/test/1.jpg');
				width: 100%;
				height: 100%;
				border-radius: 15px;
				position: absolute;
				left: 0;
				top: 0;
			}
			.player-cover__item:before {
				content: '';
				background: inherit;
				width: 100%;
				height: 100%;
				box-shadow: 0px 10px 40px 0px rgba(76, 70, 124, 0.5);
				display: block;
				z-index: 1;
				position: absolute;
				top: 30px;
				transform: scale(0.9);
				filter: blur(10px);
				opacity: 0.9;
				border-radius: 15px;
			}
			.player-cover__item:after {
				content: '';
				background: inherit;
				width: 100%;
				height: 100%;
				box-shadow: 0px 10px 40px 0px rgba(76, 70, 124, 0.5);
				display: block;
				z-index: 2;
				position: absolute;
				border-radius: 15px;
			}
		}
	}
	.Pfirst {
		top: 300px;
		left: 90px;
		background-color: pink;
	}
	.Psecend {
		background-color: #0d0925;
		left: 65%;
		top: 100px;
	}
	@media screen and (max-width: 900px) {
		.Pfirst,
		.Psecend {
			width: 100%;
			left: 0px;
		}
		.Pfirst {
			top: 20px;
		}
		.Psecend {
			top: 50%;
		}
	}
}
</style>
