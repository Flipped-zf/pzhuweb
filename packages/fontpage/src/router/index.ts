import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		component: () => import('../views/beforeHome.vue'),
		redirect: '/home',
		children: [
			{
				path: '/home',
				name: 'Home',
				meta: { title: '首页' },
				component: Home,
			},
			{
				path: '/achievement',
				name: 'achievement',
				meta: { title: '成果分享' },
				component: () => import('../views/achievement.vue'),
			},
			{
				path: '/dongtai',
				name: 'dongtai',
				meta: { title: '团队动态' },
				component: () => import('../views/dongtai.vue'),
			},
			{
				path: '/show',
				name: 'show',
				meta: { title: '成员展示' },
				component: () => import('../views/membershow.vue'),
				// children: [
				//   {
				//     path: 'all',
				//     name: 'all',
				//   }
				// ]
			},
			{
				path: '/resourceshare',
				name: 'resourceshare',
				meta: { title: '资源分享' },
				component: () => import('../views/resourceshare.vue'),
			},
			{
				path: '/mien',
				name: 'mien',
				meta: { title: '团队风采' },
				component: () => import('../views/teammien.vue'),
			},
			{
				path: '/login',
				name: 'Login',
				meta: { title: '登录' },
				component: () => import('@/views/login/loginMy.vue'),
			},
			{
				path: '/user',
				name: 'User',
				meta: { title: '个人主页' },
				component: () => import('../components/other/userHome.vue'),
				children: [
					{
						path: ':id?/article',
						name: 'myArticle',
						component: () => import('../components/userTable/articleTable.vue'),
					},
					{
						path: ':id?/ac',
						name: 'myAchievement',
						component: () => import('../components/userTable/atable.vue'),
					},
					{
						path: ':id?/resources',
						name: 'myResources',
						component: () => import('../components/userTable/reTable.vue'),
					},
					{
						path: ':id?/collect',
						name: 'myCollect',
						component: () => import('../components/userTable/coTable.vue'),
					},
				],
			},
			{
				path: '/articleDetails',
				name: 'ArticleDetails',
				meta: { title: '文章详情' },
				component: () => import('../components/other/articleDetails.vue'),
			},
			{
				path: '/changInfo',
				name: 'ChangInfo',
				meta: { title: '编辑个人资料' },
				component: () => import('../components/userToolPage/changeUserInfo.vue'),
			},
			{
				path: '/resourceIssue',
				name: 'ResourceIssue',
				meta: { title: '资源分享' },
				component: () => import('../components/userToolPage/resourceIssue.vue'),
			},
			{
				path: '/achivementIssue',
				name: 'Achievement',
				meta: { title: '成果发布' },
				component: () => import('../components/userToolPage/achivementIssue.vue'),
			},
			{
				path: '/articleEdit',
				name: 'AtcEdit',
				component: () => import('../components/userToolPage/articleEdit.vue'),
			},
		],
	},
	{
		path: '/:pathMatch(.*)*', // 页面不存在的情况下会跳到404页面
		meta: { title: '页面不存在' },
		component: () => import('@/views/errorPage.vue'),
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition;
		} else {
			return { top: 0 };
		}
	},
});

export default router;
