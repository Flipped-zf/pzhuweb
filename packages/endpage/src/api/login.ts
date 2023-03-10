import base from './base';
import axios from '../utils/request';
const Login = {
	// 用户登录
	login(data) {
		return new Promise((resolve, reject) => {
			axios
				.post(base.backlogin, data)
				.then((res) => {
					resolve(res.data);
				})
				.catch((error) => {
					reject(error.data);
				});
		});
	},
	render: base.backRender,
};
export default Login;
