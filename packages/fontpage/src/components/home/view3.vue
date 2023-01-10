<template>
	<div class="swiper" id="swiper3">
		<div class="swiper-wrapper">
			<div class="swiper-slide">
				<div class="first">
					<div class="one">
						<div class="box" data-swiper-parallax-x="-100">
							<div class="cover-text">
								{{ props.all.baseInfo[0].desc }}
							</div>
							<div class="band wband">
								<span>{{ props.all.baseInfo[0].title }}</span>
							</div>
						</div>
					</div>
					<div class="two" data-swiper-parallax="-100">
						<img :src="props.all.baseInfo[0].cover" alt="" data-swiper-parallax-scale="1.2" />
					</div>
				</div>
			</div>
			<div class="swiper-slide">
				<div className="home-fullpageThree">
					<div className="home-fullpageThree-header">
						<span>研究方向</span>
						<span>Research Interests</span>
					</div>
					<div className="home-fullpageThree-body">
						<div className="home-fullpageThree-body-front" data-swiper-parallax-x="-100">
							<div className="home-fullpageThree-body-front-img">
								<img :src="props.all.baseInfo[1].cover" :alt="props.all.baseInfo[1].title" />
							</div>
							<div className="home-fullpageThree-body-front-context">
								<div className="home-fullpageThree-body-front-context-title">
									{{ props.all.baseInfo[1].title }}
								</div>
								<div className="home-fullpageThree-body-front-context-desc">
									{{ props.all.baseInfo[1].desc }}
								</div>
							</div>
						</div>
						<div className="home-fullpageThree-body-back" data-swiper-parallax-x="100">
							<div className="home-fullpageThree-body-back-img">
								<img :src="props.all.baseInfo[2].cover" :alt="props.all.baseInfo[2].title" />
							</div>
							<div className="home-fullpageThree-body-back-context">
								<div className="home-fullpageThree-body-back-context-title">
									{{ props.all.baseInfo[2].title }}
								</div>
								<div className="home-fullpageThree-body-back-context-desc">
									{{ props.all.baseInfo[2].desc }}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="swiper-slide">
				<div class="three">
					<div class="title" data-swiper-parallax-x="-100">
						<span>团队荣誉</span>
						<span>Team Honour</span>
					</div>
					<Show :LFData="props.all.ac" data-swiper-parallax-x="100"></Show>
				</div>
			</div>
		</div>
		<div class="swiper-pagination"></div>
	</div>
</template>

<script setup>
import Swiper from 'swiper/bundle';
import { onMounted } from 'vue';
import Show from '../team/show.vue';

// let flag = inject('isPhone')

const props = defineProps({
	all: Object,
});

onMounted(() => {
	let mySwiper = new Swiper('#swiper3', {
		speed: 1000,
		direction: 'vertical',
		observer: true,
		observeParents: true,
		enabled: false,
		parallax: true,
		effect: 'fade',
		fadeEffect: {
			crossFade: true,
		},
		mousewheel: {
			releaseOnEdges: true,
		},
		touchReleaseOnEdges: true,
		// preventInteractionOnTransition : true,
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
	});
	const app = document.getElementById('app');
	window.onscroll = function () {
		// 获取距离顶部的距离
		// var scrollTop = app.scrollTop;
		// 获取可视区的高度
		let windowHeight = app.clientHeight;
		// 获取滚动条的总高度
		let scrollHeight = app.scrollHeight;
		let my = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;
		// console.log(my+'-'+scrollTop+'-'+windowHeight+'-'+scrollHeight)
		if (my + windowHeight >= scrollHeight) {
			mySwiper.enable();
		} else {
			mySwiper.disable();
		}
	};
});
</script>

<style scoped lang="less">
#swiper3 {
	height: 100vh;
	:deep(.swiper-pagination) {
		right: 20px;
		span {
			margin: 10px;
		}
	}
}
.first {
	height: 100%;
	width: 100%;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
	@media (max-width: 1000px) {
		grid-template-rows: 1fr 1fr;
	}
	.two {
		width: 100%;
		height: 100%;
		overflow: hidden;
		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			object-position: center;
			@keyframes scale {
				0% {
					-webkit-transform: scale(1);
					transform: scale(1);
					opacity: 0.5;
				}

				50% {
					-webkit-transform: scale(1.05);
					transform: scale(1.05);
					opacity: 1;
				}

				100% {
					-webkit-transform: scale(1);
					transform: scale(1);
					opacity: 0.5;
				}
			}
			animation: scale 5s linear 0s infinite;
			animation-name: scale;
			-webkit-animation-name: scale;
			animation-duration: 5s;
			-webkit-animation-duration: 5s;
			animation-timing-function: linear;
			-webkit-animation-timing-function: linear;
			animation-delay: 0s;
			-webkit-animation-delay: 0s;
			animation-iteration-count: infinite;
			-webkit-animation-iteration-count: infinite;
			animation-direction: normal;
			-webkit-animation-direction: normal;
			animation-fill-mode: none;
			-webkit-animation-fill-mode: none;
			animation-play-state: running;
			-webkit-animation-play-state: running;
		}
	}
	.one {
		height: 100%;
		width: 100%;
		@media (max-width: 800px) {
			width: 100vw;
		}
		background-color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		box-sizing: border-box;
		padding: 20px;
		.box {
			position: relative;
			background: #fff;
			box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
		}
		.cover-text {
			//margin: 20px;
			//margin-top: 100px;
			text-indent: 2em;
			padding: 60px;
			text-align: center;
			font-size: 30px;
			font-weight: bold;
			@media (max-width: 800px) {
				font-size: 16px;
			}
			color: #000000;
		}

		.band span {
			background: #3699d5;
			color: #fff;
			width: 225px;
			font-size: 24px;
			font-weight: bold;
			padding: 8px 0;
			position: absolute;
			transform: rotate(45deg);
			left: -25px;
			top: 30px;
			text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
			text-align: center;
			box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
		}

		.band {
			position: absolute;
			width: 150px;
			height: 150px;
			overflow: hidden;
			top: -10px;
			right: -10px;
		}
		.band::before,
		.band::after {
			border: 5px solid #2880b8;
			content: '';
			position: absolute;
			border-top-color: transparent;
			border-right-color: transparent;
		}
		.band::after {
			bottom: 0;
			right: 0;
		}
	}
}
.title {
	width: 100%;
	height: 20%;
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-orient: vertical;
	-webkit-box-direction: normal;
	-ms-flex-direction: column;
	flex-direction: column;
	-webkit-box-pack: center;
	-ms-flex-pack: center;
	justify-content: center;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
	span:first-child {
		color: #1890ff;
		font-size: 40px;
		margin-bottom: 10px;
	}
	span {
		color: #bbb;
	}
}
.three {
	height: 100%;
	width: 100%;
	background-color: white;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.home-fullpageThree {
	width: 100%;
	height: 100%;
	// background-color: rgb(34, 34, 34);
	background-color: #fff;

	&-header {
		width: 100%;
		height: 20%;
		@media (max-width: 1000px) {
			height: 10%;
		}
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		span:first-child {
			color: #1890ff;
			font-size: 40px;
			margin-bottom: 10px;
		}

		span:last-child {
			color: #bbb;
		}
	}

	&-body {
		width: 100%;
		height: 85%;
		display: flex;
		justify-content: center;
		@media (max-width: 1000px) {
			flex-direction: column;
		}

		&-front {
			width: 45%;
			@media (max-width: 1000px) {
				width: 100%;
				height: 50%;
			}
			height: 75%;
			display: flex;
			align-items: center;
			margin-right: 20px;
			overflow: hidden;
			border-radius: 5px;
			box-shadow: 0 0 5px #bbb;
			&-img {
				object-fit: cover;
				object-position: center;
				width: 55%;
				height: 100%;
				overflow: hidden;
				display: flex;
				justify-content: center;
				align-items: center;
				transition: 1s;

				&:hover {
					transform: scale(1.1);
				}

				img {
					height: 100%;
				}
			}

			&-context {
				flex: 1;
				height: 75%;
				padding: 30px;
				@media (max-width: 1000px) {
					padding: 0 0 0 30px;
				}

				&-title {
					width: 100%;
					color: #333;
					font-size: 30px;
					@media (max-width: 1000px) {
						font-size: 22px;
					}
				}

				&-desc {
					width: 100%;
					font-size: 15px;
					margin-top: 20px;
					color: #333;
					line-height: 1.8;
				}
			}
		}

		&-back {
			width: 45%;
			@media (max-width: 1000px) {
				width: 100%;
				height: 55%;
			}
			height: 75%;
			overflow: hidden;

			border-radius: 5px;
			box-shadow: 0 0 5px #bbb;
			&-img {
				width: 100%;
				height: 60%;
				overflow: hidden;
				display: flex;
				justify-content: center;
				align-items: center;
				transition: 1s;
				object-fit: cover;
				object-position: center;
				&:hover {
					transform: scale(1.1);
				}

				img {
					width: 100%;
				}
			}

			&-context {
				flex: 1;
				height: 40%;
				padding: 30px;
				@media (max-width: 1000px) {
					padding: 0;
				}
				&-title {
					width: 100%;
					text-align: center;
					font-size: 30px;
					@media (max-width: 1000px) {
						font-size: 22px;
					}
					color: #333;
				}

				&-desc {
					margin-top: 20px;
					font-size: 15px;
					color: #333;
					line-height: 1.8;
				}
			}
		}
	}
}
</style>
