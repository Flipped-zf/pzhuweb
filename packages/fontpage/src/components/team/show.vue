<template>
	<main class="grid" :style="{ '--n': props.LFData.length, '--k': 0 }" ref="main">
		<article class="grid" :id="'#a' + (index + 1)" :style="{ '--i': index }" v-for="(item, index) in props.LFData" :key="item.id">
			<h3 class="c--ini fade">{{ '<<' + item.title + '>>' }}</h3>
			<div class="c--ini fade content">
				<img :src="item.UserInfo.avatar" class="myImg" />
				<div>
					<h4>{{ item.introduction }}</h4>
					<h4 class="date">{{ dayjs(item.created_at).format('YYYY-MM-DD') }}</h4>
				</div>
			</div>
			<div class="nav c--ini fade">
				<span class="my" @click.prevent="anchor($event, (index - 1 + props.LFData.length) % props.LFData.length, 'p')">上一个</span>
				<span class="my" @click.prevent="anchor($event, (index + 1) % props.LFData.length, 'next')">下一个</span>
			</div>
			<section class="grid c--fin" role="img" :style="{ '--img': 'url(' + crurent + ')', '--m': 8 }">
				<div class="slice" aria-hidden="true" style="--j: 0"></div>
				<div class="slice" aria-hidden="true" style="--j: 1"></div>
				<div class="slice" aria-hidden="true" style="--j: 2"></div>
				<div class="slice" aria-hidden="true" style="--j: 3"></div>
				<div class="slice" aria-hidden="true" style="--j: 4"></div>
				<div class="slice" aria-hidden="true" style="--j: 5"></div>
				<div class="slice" aria-hidden="true" style="--j: 6"></div>
				<div class="slice" aria-hidden="true" style="--j: 7"></div>
			</section>
			<a class="det grid c--fin fade" :href="item.achievementlink || item.attachment" target="_blank">了解更多</a>
		</article>
	</main>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { Bounce, TweenMax } from 'gsap';
import dayjs from 'dayjs';

const props = defineProps({
	LFData: Array,
});
const posterlinks = ref([]);
const crurent = ref('');

const main = ref(null);
onMounted(() => {
	// console.log(props.LFData.map((item) => item.posterlink));
	posterlinks.value = props.LFData.map((item) => item.posterlink);
	crurent.value = posterlinks.value[0];
});

function anchor(e, anchorName, action) {
	/*找到锚点*/
	anchorName = 'a' + anchorName;

	let anchorElement = document.getElementById(anchorName);
	/*如果对应id的锚点存在，就跳转到锚点*/
	if (anchorElement) {
		anchorElement.scrollIntoView();
	}
	let N = +main.value.style.getPropertyValue('--n');

	let k = +main.value.style.getPropertyValue('--k');
	let _t = e.target;

	if (_t.classList.contains('my')) {
		if (action === 'next') {
			main.value.style.setProperty('--k', (k = (k + 1) % N));
			crurent.value = posterlinks.value[(k = (k + 1) % N)];
			TweenMax.from('.myImg', {
				opacity: 0,
				y: -100,
				duration: 1.5,
				ease: Bounce.easeOut,
			});
		} else {
			main.value.style.setProperty('--k', (k = (k - 1 + N) % N));
			crurent.value = posterlinks.value[(k = (k + 1) % N)];
			TweenMax.from('.myImg', {
				opacity: 0,
				y: 100,
				duration: 1.5,
				ease: Bounce.easeOut,
			});
		}
	}
}
</script>

<style scoped>
.grid {
	display: grid;
}

main {
	place-self: center;
	overflow: hidden;
	max-width: 56.25em;
	box-shadow: -16px 16px 23px currentcolor;
	background: #fff;
	color: #b9b7bb;
	font: 1em/1.25 ubuntu, trebuchet ms, sans-serif;
}

article {
	--not-sel: min(1, max(var(--k) - var(--i), var(--i) - var(--k)));
	--sel: calc(1 - var(--not-sel));
	--sgn-sel: calc(2 * var(--sel) - 1);
	--pad: min(1.5em, 5vw);
	grid-area: 1/1;
	grid-auto-flow: column;
	grid-template-columns: repeat(auto-fit, minmax(min(100%, 24em), 1fr));
	z-index: var(--sel);
	padding: var(--pad);
	transition: z-index 0s 1s;
}

a {
	font-size: 0.875em;
	text-decoration: none;
	color: #000;
}

a:focus {
	outline: none;
}

a:hover,
a:focus {
	color: #3699d5;
}

.c--ini {
	grid-column: 1;
}

.c--fin {
	grid-column-end: -1;
}

.fade {
	transform: translatey(calc(var(--not-sel) * 2rem));
	opacity: var(--sel);
	transition: transform 1s ease-out calc(var(--sel) * 1s), opacity 1s ease-in calc(var(--sel) * 1s);
}

h3 {
	font-size: clamp(1.25em, 8vw, 2.5em);
	font-weight: 900;
	place-self: end center;
	padding: 0 0 1em;
	color: #2c2a2e;
}

.content {
	padding: 0 5vw;
	color: #989898;
	font-size: 0.875em;
	display: flex;
	align-items: center;
}

.content img {
	width: 50px;
	height: 50px;
	border-radius: 50%;
	object-position: center;
	object-fit: cover;
	margin-right: 20px;
}

.content .date:before {
	font-family: 'iconfont';
	margin-right: 10px;
	content: '\e8b4';
}

.nav {
	place-self: start center;
	margin: auto;
	border: solid 1px #e0dee0;
	padding: 1em min(2.5em, 5vw);
	border-radius: 4em;
	font-weight: 700;
	text-align: center;
}

@media screen and (min-width: 300px) and (max-width: 900px) {
	.nav {
		padding: 5px;
		margin: 5px;
	}
}

.nav span {
	cursor: pointer;
	padding: 0 20px;
}

.nav span:hover {
	color: #3699d5;
}

section {
	grid-row-end: span 3;
	clip-path: inset(calc(-1 * var(--pad)) 0);
}

.slice {
	--p: calc(var(--j) / var(--m));
	--s: calc((1 + var(--j)) / var(--m) * 100%);
	--mask: linear-gradient(90deg, transparent calc(var(--p) * 100% - 1px), red calc(var(--p) * 100%) var(--s), transparent calc(var(--s) + 1px));
	grid-area: 1/1;
	height: 50vmin;
	transform: translatey(calc(var(--not-sel) * (-100% - var(--pad) - 1px)));
	background: var(--img) 50% / cover;
	-webkit-mask: var(--mask);
	mask: var(--mask);
	transition: transform 1s ease-out calc((var(--sel) + var(--p)) * 1s);
}

.det {
	grid-auto-flow: column;
	grid-gap: 0.5em;
	place-content: end start;
	place-self: end start;
	position: relative;
	z-index: 2;
	padding: 0 1em;
	height: 0;
	line-height: 2;
	white-space: nowrap;
}

.det::before {
	position: absolute;
	z-index: -1;
	bottom: 0;
	height: 2em;
	width: 100%;
	background: #fff;
	content: '';
}

.det::after {
	content: '➔';
	animation: dong 2s infinite;
}

@keyframes dong {
	0% {
	}
	30% {
		transform: translatex(-5px);
	}
	100% {
		transform: translatex(5px);
	}
}
</style>
