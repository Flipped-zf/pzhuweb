import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';

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
	plugins: [vue(), dts()],
	build: {
		lib: {
			// Could also be a dictionary or array of multiple entry points
			entry: resolve(__dirname, 'src/main.ts'),
			name: 'MyLib',
			// the proper extensions will be added
			fileName: 'my-lib',
		},
		cssCodeSplit: true,
		rollupOptions: {
			// 确保外部化处理那些你不想打包进库的依赖
			external: ['vue'],
			output: {
				// 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
				globals: {
					vue: 'Vue',
				},
			},
		},
	},
	// server: {
	//   port: 9798,
	//   open: true,
	//   // proxy: {
	//   //   '/api': {
	//   //     target: 'http://127.0.0.1:8081',
	//   //     changeOrigin: true,
	//   //   },
	//   // },
	// },
});
