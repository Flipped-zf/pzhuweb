import router from './router';
import { ElMessage } from 'element-plus';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style
import auth from './utils/auth'; // get token from cookie
import getPageTitle from './utils/get-page-title';

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = ['/team', '/login', '/home', '/achievement', '/dongtai', '/show', '/resourceshare', '/mien', '/articleDetails']; // no redirect whitelist
const whiteList2 = ['myArticle', 'myAchievement', 'myResources', 'myCollect'];
// const backList = ['']

router.beforeEach(async (to, from, next) => {
	// start progress bar
	NProgress.start();

	// set page title
	document.title = getPageTitle(to.meta.title);

	// determine whether the user has logged in
	const hasToken = auth.getToken();
	// console.log(to.name)
	if (hasToken) {
		next();
	} else {
		if (whiteList.indexOf(to.path) != -1 || whiteList2.indexOf(to.name) != -1) {
			next();
		} else {
			if (to.name !== 'Login' && !hasToken) {
				ElMessage({
					showClose: true,
					message: '请先登录',
					type: 'error',
				});
				next({ name: 'Login' });
			} else {
				next();
			}
		}
	}
});

router.afterEach(() => {
	// finish progress bar
	NProgress.done();
});
