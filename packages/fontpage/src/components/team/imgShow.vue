<template>
	<el-scrollbar height="600px">
		<section class="hero-section">
			<!--      <div class="">{{ isPhone }}</div>-->
			<div class="card-grid">
				<a class="card" v-for="(item, index) in imgList" :key="index + 'il'">
					<div class="card__background" ref="cardFull">
						<!-- <img :href="item.link" :src="item.link" style="user-select: none" /> -->
						<el-image :href="item.link" :src="item.link" style="user-select: none; width: 100%; height: 100%" loading="lazy">
							<template #placeholder>
								<div class="image-slot">Loading<span class="dot">...</span></div>
							</template>
						</el-image>
					</div>
					<!--          <div class="card__content">-->
					<!--            <p class="card__category">Category</p>-->
					<!--            <h3 class="card__heading">Example Card Heading</h3>-->
					<!--          </div>-->
				</a>
			</div>
		</section>
	</el-scrollbar>
</template>

<script setup>
import $ from 'jquery';
import { computed, onBeforeUnmount, onMounted } from 'vue';
import 'magnific-popup/dist/jquery.magnific-popup.min';
import 'magnific-popup/dist/magnific-popup.css';
const props = defineProps({
	imgsData: {
		type: Object,
	},
});
const imgList = computed(() => props.imgsData.photos);

onMounted(() => {
	let timer = setTimeout(() => {
		$('.card__background').magnificPopup({
			delegate: 'img',
			type: 'image',
			removalDelay: 300,
			mainClass: 'mfp-with-zoom',
			gallery: {
				enabled: true,
			},
			zoom: {
				enabled: false, // By default it's false, so don't forget to enable it

				duration: 300, // duration of the effect, in milliseconds
				easing: 'ease-in-out', // CSS transition easing function

				// The "opener" function should return the element from which popup will be zoomed in
				// and to which popup will be scaled down
				// By defailt it looks for an image tag:
				opener: function (openerElement) {
					// openerElement is the element on which popup was initialized, in this case its <a> tag
					// you don't need to add "opener" option if this code matches your needs, it's defailt one.
					return openerElement.is('img') ? openerElement : openerElement.find('img');
				},
			},
		});
		clearTimeout(timer);
	}, 1000);
});
const action = ['contextmenu', 'selectstart', 'copy'];
action.forEach(function (ev) {
	document.addEventListener(ev, function (ev) {
		ev.preventDefault();
		ev.returnValue = false;
	});
});

onBeforeUnmount(() => {
	const action = ['contextmenu', 'selectstart', 'copy'];
	action.forEach(function (ev) {
		document.removeEventListener(ev, function (ev) {
			ev.preventDefault();
			ev.returnValue = false;
		});
	});
});

// const isPhone = inject('isPhone')
</script>

<style scoped>
.hero-section {
	--background-dark: #2d3548;
	--text-light: rgba(255, 255, 255, 0.6);
	--text-lighter: rgba(255, 255, 255, 0.9);
	--spacing-s: 8px;
	--spacing-m: 16px;
	--spacing-l: 24px;
	--spacing-xl: 32px;
	--spacing-xxl: 30px;
	--width-container: 1200px;
}
.hero-section {
	align-items: flex-start;
	/*background-image: linear-gradient(15deg, #0f4667 0%, #2a6973 150%);*/
	/*display: flex;*/
	min-height: 100%;
	justify-content: center;
	/*max-height: 600px;*/
	/*overflow-y: scroll;*/
	/*padding: var(--spacing-xxl) var(--spacing-l);*/
}

.card-grid {
	display: grid;
	grid-template-columns: repeat(1, 1fr);
	grid-column-gap: var(--spacing-l);
	grid-row-gap: var(--spacing-l);
	max-width: var(--width-container);
	width: 100%;
}

@media (min-width: 540px) {
	.card-grid {
		grid-template-columns: repeat(2, 1fr);
	}
}

@media (min-width: 960px) {
	.card-grid {
		grid-template-columns: repeat(4, 1fr);
	}
}

.card {
	list-style: none;
	position: relative;
	cursor: pointer;
	/*height: 200px;*/
}
@media (max-width: 768px) {
	.card {
		height: 200px;
	}
}
.card:before {
	content: '';
	display: block;
	padding-bottom: 150%;
	width: 100%;
}

.card__background {
	background-size: cover;
	background-position: center;
	border-radius: var(--spacing-l);
	bottom: 0;
	/*filter: brightness(0.75) saturate(1.2) contrast(0.85);*/
	left: 0;
	position: absolute;
	right: 0;
	top: 0;
	transform-origin: center;
	trsnsform: scale(1) translateZ(0);
	transition: filter 200ms linear, transform 200ms linear;
	overflow: hidden;
}
.card__background img {
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.card:hover .card__background {
	transform: scale(1.05) translateZ(0);
}

.card-grid:hover > .card:not(:hover) .card__background {
	/*filter: brightness(0.5) saturate(0) contrast(1.2) blur(20px);*/
}

.card__content {
	left: 0;
	padding: var(--spacing-l);
	position: absolute;
	top: 0;
}

.card__category {
	color: var(--text-light);
	font-size: 0.9rem;
	margin-bottom: var(--spacing-s);
	text-transform: uppercase;
}

.card__heading {
	color: var(--text-lighter);
	font-size: 1.9rem;
	text-shadow: 2px 2px 20px rgba(0, 0, 0, 0.2);
	line-height: 1.4;
	word-spacing: 100vw;
}
</style>
