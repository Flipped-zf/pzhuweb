<template>
	<div class="sview">
		<div class="left" id="left">
			<i class="iconfont icon-weixin" id="apple"></i>
			<i class="iconfont icon-youxiang" id="twitter"></i>
			<i class="iconfont icon-QQ" id="github"></i>
			<i class="iconfont icon-dianhua1" id="facebook"></i>
		</div>
		<div class="right">
			<div class="swiper" id="swiper2">
				<div class="swiper-wrapper">
					<div class="swiper-slide" v-for="(item, index) in memberInfo" :key="index + 'a'">
						<span data-swiper-parallax="-300" style="text-align: center">
							{{ item.description }}
						</span>
						<span>{{ item.name }}</span>
						<div class="right-img" data-swiper-parallax="100">
							<el-image style="width: 100%; height: 100%" :src="item.avatar" fit="cover" loading="lazy">
								<template #error>
									<div class="image-slot">
										<el-icon><icon-picture /></el-icon></div></template
							></el-image>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { onMounted } from 'vue';
import { Picture as IconPicture } from '@element-plus/icons-vue';
import Swiper from 'swiper/bundle';
import { TweenMax } from 'gsap';
import { lazyImgEle } from '@/utils/lazyImg';

defineProps({
	memberInfo: Array,
});

onMounted(() => {
	lazyImgEle('[data-img]');
	new Swiper('#swiper2', {
		loop: true,
		autoplay: {
			delay: 3000,
			stopOnLastSlide: false,
			disableOnInteraction: false,
		},
		grabCursor: true,
		direction: 'vertical',
		observer: true,
		observeParents: true,
		parallax: true,
		effect: 'fade',
		fadeEffect: {
			crossFade: true,
		},
	});
	TweenMax.from('#left', 1, { x: -100, opacity: 0, scale: 1.4 });
});
</script>

<style scoped lang="less">
@import '//at.alicdn.com/t/font_3173448_r9k3cqhcujj.css';

#swiper2 {
	height: 100%;
	width: 50vw;
}
#left {
	height: 100%;
	width: 50vw;
}
@media screen and(min-width: 200px) and (max-width: 768px) {
	.sview {
		flex-direction: column-reverse;
		width: 100%;
		padding-top: 5px;
		.right {
			width: 100%;
			height: 50%;
			#swiper2 {
				width: 100vw;
				.swiper-slide {
					span {
						font-size: 16px;
					}
				}
			}
		}
		#left {
			box-sizing: border-box;
			width: 100vw;
			margin-top: 10px;
			padding: 0 15px;
		}
	}
}
.sview {
	height: 12vh;
	display: flex;
	.left {
		//background-color: #000000;
		background-image: url('../../assets/img/computer.jpg');
		background-size: cover;
		background-position: center;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	.right {
		.swiper-slide {
			font-weight: bold;
			font-size: 20px;
			display: flex;
			justify-content: space-around;
			align-items: center;
			.right-img {
				height: 40px;
				width: 40px;
				border-radius: 50%;
				// object-fit: cover;
				object-position: center;
				overflow: hidden;
			}
			span:first-child {
				width: 60%;
				display: block;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				line-clamp: 2;
				/* autoprefixer: ignore next */
				-webkit-box-orient: vertical;
				text-indent: 2em;
			}
		}
	}
}

#apple,
#twitter,
#github,
#facebook {
	font-size: 32px;
	color: #fff;
	//box-shadow: 2px 2px 2px #00000080, 10px 1px 12px #00000080,
	//2px 2px 10px #00000080, 2px 2px 3px #00000080, inset 2px 2px 10px #00000080,
	//inset 2px 2px 10px #00000080;
	border-radius: 50%;
	//padding: 11px 19px;
	margin: 0 40px;
	transition: all 0.3s;
}
@media screen and (max-width: 768px) {
	#apple,
	#twitter,
	#github,
	#facebook {
		margin: 0;
	}
}
#apple:hover,
#twitter:hover,
#github:hover,
#facebook:hover {
	text-shadow: 0 0 25px #0072ff, 0 0 50px #0072ff, 0 0 75px #0072ff, 0 0 100px #0072ff;
	transform: translateY(-6px) scale(1.2);
	cursor: pointer;
}
</style>
