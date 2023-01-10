import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { resolve } from 'path';

function pathResolve(dir: string) {
	return resolve(process.cwd(), '.', dir);
}
export default defineConfig({
	base: './',
	resolve: {
		// 配置别名
		alias: [{ find: '@', replacement: pathResolve('src') + '/' }],
	},
	plugins: [
		AutoImport({
			resolvers: [ElementPlusResolver()],
		}),
		Components({
			resolvers: [ElementPlusResolver()],
		}),
		vue(),
	],
	server: {
		port: 9797,
		open: true,
		proxy: {
			'/api/my': {
				target: 'http://127.0.0.1:7001',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api\/my/, ''),
			},
			'/api': {
				target: 'http://127.0.0.1:8081',
				changeOrigin: true,
			},
		},
	},
});
