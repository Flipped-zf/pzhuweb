import base from './base';
import axios from '../utils/request';
import qs from 'qs';

const request = {
	getRoles: (params?: any) => {
		return new Promise((resolve, reject) => {
			axios
				.get(base.status)
				.then((res) => {
					resolve(res.data);
				})
				.catch((error) => {
					reject(error.data);
				});
		});
	},
	updateRole: (id: any, data: any) => {
		console.log(data);
		return new Promise((resolve, reject) => {
			axios
				.put(`${base.status}/${id}`, data)
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
