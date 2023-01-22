import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
// import viteCompression from 'vite-plugin-compression';

function pathResolve(dir: string) {
	return resolve(process.cwd(), '.', dir);
}
export default defineConfig({
	base: '/back/',
	resolve: {
		// 配置别名
		alias: [{ find: '/@', replacement: pathResolve('src') + '/' }],
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
		port: 9798,
		open: true,
		proxy: {
			'/api': {
				target: 'http://127.0.0.1:7001',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ''),
			},
		},
	},
	define: {
		// __VUE_I18N_LEGACY_API__: JSON.stringify(true), //没用
		// __VUE_I18N_FULL_INSTALL__: JSON.stringify(false),
		// __INTLIFY_PROD_DEVTOOLS__: JSON.stringify(false),
	},
	optimizeDeps: {
		include: ['element-plus/lib/locale/lang/zh-cn', 'element-plus/lib/locale/lang/en', 'element-plus/lib/locale/lang/zh-tw'],
	},
	build: {
		target: 'esnext',
		assetsDir: './static',
		chunkSizeWarningLimit: 500,
		cssCodeSplit: true,
		terserOptions: {
			compress: {
				// warnings: false,
				drop_console: true, //打包时删除console
				drop_debugger: true, //打包时删除 debugger
				pure_funcs: ['console.log'],
			},
			output: {
				// 去掉注释内容
				comments: true,
			},
		},
		rollupOptions: {
			output: {
				chunkFileNames: 'static/js/[name]-[hash].js',
				entryFileNames: 'static/js/[name]-[hash].js',
				assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
				manualChunks: {
					vue: ['vue', 'vue-router', 'pinia'],
					echarts: ['echarts'],
					elementPlus: ['element-plus'],
				},
			},
		},
	},
});
