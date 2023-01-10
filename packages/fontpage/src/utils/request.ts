import axios from 'axios';
import { AxiosRequestConfig } from 'axios';
import { ElMessage } from 'element-plus';
import auth from './auth';
import 'element-plus/es/components/message/style/css';

interface IcodeMessage {
	[key: number]: string;
}

const codeMessage = <IcodeMessage>{
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

// create an axios instance
const service = axios.create({
	baseURL: import.meta.env.VITE_APP_API_BASEURL, // url = base url + request url
	// withCredentials: true, // send cookies when cross-domain requests
	timeout: 10000, // request timeout
	withCredentials: true,
});

interface YXRequestConfig extends AxiosRequestConfig {
	headers?: any;
}
// request interceptor
service.interceptors.request.use(
	(config: YXRequestConfig) => {
		const csrfToken = auth.getCookie('csrfToken');
		(<any>config.headers).common['x-csrf-token'] = csrfToken;
		if (auth.getToken()) {
			config.headers['Authorizationfont'] = auth.getToken();
		}
		return config;
	},
	(error) => {
		// do something with request error
		console.log(error); // for debug
		return Promise.reject(error);
	}
);
service.interceptors.response.use(
	(response) => {
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
					auth.removeToken();
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
	}
);

export default service;
