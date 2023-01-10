/// <reference types="vite/client" />
/// <reference lib="dom" />
declare module '*.vue' {
	import type { DefineComponent } from 'vue';
	const component: DefineComponent<{}, {}, any>;
	export default component;
}
declare module 'js-cookie';
