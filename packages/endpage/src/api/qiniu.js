import base from './base';
import axios from '../utils/request';
const Qiniu = {
	// 获取上传证书秘钥
	getToken() {
		return new Promise((resolve, reject) => {
			axios
				.get(`${base.qiniuToken}`)
				.then((res) => {
					resolve(res.data);
				})
				.catch((err) => {
					reject(err.data);
				});
		});
	},
	delfile(params) {
		return new Promise((resolve, reject) => {
			axios
				.get(base.delfile, { params })
				.then((res) => {
					resolve(res.data);
				})
				.catch((err) => {
					reject(err.data);
				});
		});
	},
};
export default Qiniu;
