import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './permission.js';
import 'swiper/css/bundle';
import 'element-plus/es/components/message/style/css';
import 'element-plus/es/components/notification/style/css';

import { createPinia } from 'pinia';
const pinia = createPinia();

const app = createApp(App);
app.directive('loadmore', {
	mounted(el, binding) {
		const selectWrap = el.querySelector('.el-scrollbar__wrap');
		selectWrap.addEventListener('scroll', function () {
			const sign = 0;
			const scrollDistance = this.scrollHeight - this.scrollTop - this.clientHeight;
			if (scrollDistance <= sign) {
				binding.value();
			}
		});
	},
});
app.use(pinia).use(router).mount('#app');
