<template>
	<div class="swiper" id="hotSwiper">
		<div class="swiper-wrapper">
			<div class="swiper-slide" v-for="(item, index) in data.hotArticle" :key="index">
				<div
					:class="['blog-card', { alt: index2 == 1 }]"
					v-for="(item2, index2) in item"
					:key="item2.id"
					:data-swiper-parallax="index2 == 1 ? 100 : -100"
					data-swiper-parallax-opacity="0"
				>
					<div class="meta">
						<div class="photo">
							<el-image :src="item2.postlink" style="width: 100%; height: 100%">
								<template #error>
									<div class="image-slot" style="display: flex; align-items: center; justify-content: center; font-size: 30px">
										<el-icon>
											<icon-picture />
										</el-icon>
									</div>
								</template>
							</el-image>
						</div>
						<ul class="details">
							<li class="author">
								<a style="cursor: pointer" @click.stop="router.push({ path: `/user/${item2.userid}/article` })">{{ item2.UserInfo.User.name }}</a>
							</li>
							<li class="date">{{ dayjs(item2.created_at).format('YYYY-MM-DD') }}</li>
							<li class="tags">
								<ul>
									<!--                  <li><a href="#">Learn</a></li>-->
									<!--                  <li><a href="#">Code</a></li>-->
									<!--                  <li><a href="#">HTML</a></li>-->
									<!--                  <li><a href="#">CSS</a></li>-->
									<li>{{ item2.keywords }}</li>
									<!--                  <li>{{ item2.menu.name }}</li>-->
									<!--                  <li>{{ item2.technology.name }}</li>-->
								</ul>
							</li>
							<li>
								<span> <i class="iconfont icon-liulan" style="vertical-align: middle; margin-right: 10px"></i>浏览{{ item2.readnumber }} </span>
							</li>
						</ul>
					</div>
					<div class="description">
						<h1
							style="
								overflow: hidden;
								display: -webkit-box;
								-webkit-box-orient: vertical;
								-webkit-line-clamp: 2;
								-ms-text-overflow: ellipsis;
								text-overflow: ellipsis;
							"
						>
							{{ item2.title }}
						</h1>
						<h2
							style="
								text-indent: 2em;
								overflow: hidden;
								overflow: hidden;
								display: -webkit-box;
								-webkit-box-orient: vertical;
								-webkit-line-clamp: 3;
								-ms-text-overflow: ellipsis;
								text-overflow: ellipsis;
								line-height: 30px;
							"
						>
							{{ item2.introduction }}
						</h2>
						<p class="read-more">
							<a ref="myRead" href="#" @click.prevent.stop="goDerails(item2.id)">Read More</a>
						</p>
					</div>
				</div>
			</div>
		</div>
		<div class="swiper-scrollbar"></div>
	</div>
</template>

<script setup>
import { onMounted, reactive, watch, ref } from 'vue';
import Swiper from 'swiper/bundle';
import { Picture as IconPicture } from '@element-plus/icons-vue';
import router from '../../router';
import dayjs from 'dayjs';

const myRead = ref(null);
const props = defineProps({
	allHotArticle: Array,
});
const data = reactive({
	hotArticle: [],
});
watch([props], ([newProps], [oldProps]) => {
	// fontDeno(newProps.firstData.description, newProps.firstData.title)
	data.hotArticle = group(newProps.allHotArticle, 2);
});
onMounted(() => {
	const mySwiper = new Swiper('#hotSwiper', {
		speed: 1500,
		autoplay: {
			pauseOnMouseEnter: true,
			disableOnInteraction: false,
		}, //可选选项，自动滑动
		parallax: true,
		grabCursor: true,
		observer: true,
		observeParents: true,
		scrollbar: {
			el: '.swiper-scrollbar',
		},
	});
	// if (props.allHotArticle[0] !== undefined) {
	//   data.hotArticle = group(props.allHotArticle, 3)
	// }
});

function group(array, num = 3) {
	let index = 0;
	let newArray = [];
	while (index < array.length) {
		newArray.push(array?.slice(index, (index += num)));
	}
	return newArray;
}

function goDerails(num) {
	router.push({ path: '/articleDetails', query: { id: num } });
}
</script>

<style scoped lang="less">
:deep(.swiper-scrollbar-drag) {
	background-color: #239bcc !important;
}

#hotSwiper {
	height: 400px;
	width: 500px;
	@media (max-width: 500px) {
		width: 100vw;
	}

	.swiper-slide {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}
}

/*PEN STYLES*/

@color_white: #fff;
@color_prime: #5ad67d;
@color_grey: #e2e2e2;
@color_grey_dark: #a2a2a2;

.blog-card {
	width: 100%;
	height: 40%;
	display: flex;
	flex-direction: column;
	box-shadow: 0 3px 7px -1px rgba(#000, 0.1);
	background: @color_white;
	line-height: 1.4;
	font-family: sans-serif;
	border-radius: 5px;
	overflow: hidden;
	z-index: 0;
	//a {
	//  color: inherit;
	//  &:hover {
	//    color: @color_prime;
	//  }
	//}
	&:hover {
		.photo {
			transform: scale(1.3) rotate(3deg);
		}
	}

	.meta {
		position: relative;
		z-index: 0;
		height: 200px;
	}

	.photo {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-size: cover;
		background-position: center;
		transition: transform 0.2s;

		img {
			width: 100%;
			height: 100%;
			object-position: center;
			object-fit: cover;
		}
	}

	.details,
	.details ul {
		margin: auto;
		padding: 0;
		list-style: none;
	}

	.details {
		position: absolute;
		top: 0;
		bottom: 0;
		left: -100%;
		margin: auto;
		transition: left 0.2s;
		background: rgba(#000, 0.6);
		color: @color_white;
		padding: 10px;
		width: 100%;
		font-size: 0.9rem;

		a {
			text-decoration: dotted underline;
			color: white;
		}

		ul li {
			display: inline-block;
		}

		.author:before {
			font-family: 'iconfont';
			margin-right: 10px;
			content: '\e6a5';
		}

		.date:before {
			font-family: 'iconfont';
			margin-right: 10px;
			content: '\e8b4';
		}

		.tags {
			ul:before {
				font-family: 'iconfont';
				content: '\e65b';
				margin-right: 10px;
			}

			li {
				margin-right: 2px;

				&:first-child {
					margin-left: -4px;
				}
			}
		}
	}

	.description {
		padding: 0.5rem;
		background: @color_white;
		position: relative;
		z-index: 1;

		h1,
		h2 {
			font-family: Poppins, sans-serif;
		}

		h1 {
			line-height: 1;
			margin: 0;
			font-size: 1.2rem;
		}

		h2 {
			font-size: 1rem;
			font-weight: 300;
			text-transform: uppercase;
			color: @color_grey_dark;
			margin-top: 5px;
		}

		.read-more {
			text-align: right;

			a {
				color: @color_prime;
				display: inline-block;
				position: relative;

				&:after {
					content: '\eb0b';
					font-family: 'iconfont';
					margin-left: -10px;
					opacity: 0;
					vertical-align: middle;
					transition: margin 0.3s, opacity 0.3s;
				}

				&:hover:after {
					margin-left: 5px;
					opacity: 1;
				}
			}
		}
	}

	&:hover {
		.details {
			left: 0%;
		}
	}

	@media (min-width: 300px) {
		flex-direction: row;
		max-width: 700px;
		.meta {
			flex-basis: 40%;
			height: auto;
		}

		.description {
			flex-basis: 60%;

			&:before {
				transform: skewX(-3deg);
				content: '';
				background: #fff;
				width: 30px;
				position: absolute;
				left: -10px;
				top: 0;
				bottom: 0;
				z-index: -1;
			}

			h2 {
				font-size: 12px;
			}
		}

		&.alt {
			flex-direction: row-reverse;

			.description {
				&:before {
					left: inherit;
					right: -10px;
					transform: skew(3deg);
				}
			}

			.details {
				padding-left: 25px;
			}
		}
	}
}
</style>
