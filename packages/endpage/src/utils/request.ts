import axios from 'axios';
import { ElMessage } from 'element-plus';
import { Session } from '/@/utils/storage';

const codeMessage = {
	200: '服务器成功返回请求的数据。',
	201: '新建或修改数据成功。',
	202: '一个请求已经进入后台排队（异步任务）。',
	204: '删除数据成功。',
	400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
	401: '用户没有权限（令牌、用户名、密码错误）。',
	403: '用户得到授权，但是访问是被禁止的。',
	404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
	406: '请求的格式不可得。',
	410: '请求的资源被永久删除，且不会再得到的。',
	422: '当创建一个对象时，发生一个验证错误。',
	500: '服务器发生错误，请检查服务器。',
	502: '网关错误。',
	503: '服务不可用，服务器暂时过载或维护。',
	504: '网关超时。',
	521: '用户没有权限（令牌、用户名、密码错误）。',
};
// 配置新建一个 axios 实例
const service = axios.create({
	baseURL: import.meta.env.VITE_API_URL as any,
	timeout: 50000,
	headers: { 'Content-Type': 'application/json' },
});

// 添加请求拦截器
service.interceptors.request.use(
	(config) => {
		const csrfToken = Session.getCookie('csrfToken');
		(<any>config.headers).common['x-csrf-token'] = csrfToken;
		// 在发送请求之前做些什么 token
		if (Session.get('token')) {
			(<any>config.headers).common['Authorization'] = `${Session.get('token')}`;
		}
		return config;
	},
	(error) => {
		// 对请求错误做些什么
		return Promise.reject(error);
	}
);

// 添加响应拦截器
service.interceptors.response.use(
	(response) => {
		// 对响应数据做点什么
		// console.log(response);
		const res = response.data;
		if (response.status === 200) {
			if (res.success === 0 && res.message) {
				switch (res.status) {
					case 12312:
						break;
					default:
						ElMessage({
							showClose: true,
							message: res.message,
							type: 'error',
						});
				}
			}
			if (res.success === 1 && res.message) {
				ElMessage({
					showClose: true,
					message: res.message,
					type: 'success',
				});
			}
			return Promise.resolve(response);
		}
		return Promise.reject(response);
		// if (res.code && res.code !== 0) {
		// 	// `token` 过期或者账号已在别处登录
		// 	if (res.code === 401 || res.code === 4001) {
		// 		Session.clear(); // 清除浏览器全部临时缓存
		// 		window.location.href = '/'; // 去登录页
		// 		ElMessageBox.alert('你已被登出，请重新登录', '提示', {})
		// 			.then(() => {})
		// 			.catch(() => {});
		// 	}
		// 	return Promise.reject(service.interceptors.response);
		// } else {
		// 	return response.data;
		// }
	},
	(error) => {
		if (error.response.status) {
			switch (error.response.status) {
				case 403:
					ElMessage({
						showClose: true,
						message: '登录过期，请重新登录',
						type: 'error',
					});
					Session.clear();
					break;
				case 404:
					ElMessage({
						showClose: true,
						message: '资源不存在',
						type: 'error',
					});
					break;
				case 521:
					ElMessage({
						showClose: true,
						message: '用户未登录，请登！',
						type: 'error',
					});
					break;
				default:
					ElMessage({
						showClose: true,
						message: codeMessage[error.response.status],
						type: 'error',
					});
			}
		}
		// 对响应错误做点什么
		// if (error.message.indexOf('timeout') != -1) {
		// 	ElMessage.error('网络超时');
		// } else if (error.message == 'Network Error') {
		// 	ElMessage.error('网络连接错误');
		// } else {
		// 	if (error.response.data) ElMessage.error(error.response.statusText);
		// 	else ElMessage.error('接口路径找不到');
		// }
		// return Promise.reject(error);
	}
);

// 导出 axios 实例
export default service;
