import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

function pathResolve(dir: string) {
	return resolve(process.cwd(), '.', dir);
}
export default defineConfig({
	base: './',
	resolve: {
		// 配置别名
		alias: [{ find: '/@', replacement: pathResolve('src') + '/' }],
	},
	plugins: [vue()],
	server: {
		port: 9798,
		open: true,
		proxy: {
			'/myapi': {
				target: 'http://127.0.0.1:7001',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/myapi/, ''),
			},
		},
	},
	define: {
		// __VUE_I18N_LEGACY_API__: JSON.stringify(true), //没用
		// __VUE_I18N_FULL_INSTALL__: JSON.stringify(false),
		// __INTLIFY_PROD_DEVTOOLS__: JSON.stringify(false),
	},
});
