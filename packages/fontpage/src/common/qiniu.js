import * as qiniu from 'qiniu-js';
import qiniuAPI from '../api/qiniu';
import Cookies from 'js-cookie';

function qiniuUpload(file) {
	return new Promise((resolve, reject) => {
		qiniuAPI
			.getToken()
			.then((res) => {
				const token = res.data;
				let type = '';
				if (file.name) {
					const num = file.name.split('.');
					type = num[num.length - 1];
				} else {
					type = file.type.split('/')[1];
				}
				const key = 'test/' + Cookies.get('yourStuNum') + Date.now() + '.' + type;
				// let key = 'test'+Date.now();
				const config = {
					useCdnDomain: true, // 是否使用 cdn 加速域名
					region: qiniu.region.z2, // 选择上传域名 华南
				};
				const putExtra = {
					fname: file.name,
					params: {},
					mimeType: ['image/png', 'image/jpeg', 'image/gif'],
				};
				if (file.raw) {
					file = file.raw;
				}
				const observable = qiniu.upload(file, key, token, putExtra, config);
				const observer = {
					next(res) {},
					error(err) {
						reject(err);
					},
					complete(res) {
						resolve(res);
					},
				};
				const subscription = observable.subscribe(observer);
			})
			.catch((err) => {
				reject(err);
			});
	});
}

export default qiniuUpload;
