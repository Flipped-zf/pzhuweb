import { nextTick } from 'vue';
//有原生的
/**
 * 图片懒加载
 * @param el dom 目标元素
 * @param arr 列表数据
 * @description data-xxx 属性用于存储页面或应用程序的私有自定义数据
 */
//  <img :data-img="v.img" :data-key="k" :data-lazy-img-list="k" />
// other.lazyImg('[data-lazy-img-list]', state.tableData.data);
export const lazyImg = (el: any, arr: any) => {
	const io = new IntersectionObserver((res) => {
		res.forEach((v: any) => {
			if (v.isIntersecting) {
				const { img, key } = v.target.dataset;
				v.target.src = img;
				v.target.onload = () => {
					io.unobserve(v.target);
					arr[key]['loading'] = false;
				};
			}
		});
	});
	nextTick(() => {
		document.querySelectorAll(el).forEach((img) => io.observe(img));
	});
};
export const lazyImgEle = (el: any) => {
	const io = new IntersectionObserver((res) => {
		res.forEach((v: any) => {
			if (v.isIntersecting) {
				const { img } = v.target.dataset;
				v.target.src = img;
				v.target.onload = () => {
					io.unobserve(v.target);
				};
			}
		});
	});
	nextTick(() => {
		document.querySelectorAll(el).forEach((img) => {
			console.log(img);
			io.observe(img.querySelector('img'));
		});
	});
};
