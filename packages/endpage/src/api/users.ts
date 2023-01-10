import base from './base';
import axios from '../utils/request';

const request = {
	getUsers: () => {
		return new Promise((resolve, reject) => {
			axios
				.get(base.users)
				.then((res) => {
					resolve(res.data.data);
				})
				.catch((error) => {
					reject(error.data);
				});
		});
	},
	initUserMajor: () => {
		return new Promise((resolve, reject) => {
			axios
				.get(base.initUserMajor)
				.then((res) => {
					resolve(res.data);
				})
				.catch((error) => {
					reject(error.data);
				});
		});
	},
	updateUser: (id: any, data: any) => {
		return new Promise((resolve, reject) => {
			axios
				.post(base.updateUserInfo, data)
				.then((res) => {
					resolve(res.data);
				})
				.catch((error) => {
					reject(error.data);
				});
		});
	},
};
export default request;
