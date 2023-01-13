import base from './base';
import axios from '../utils/request';

const resapi = {
	getResourceInfo: (data) => {
		return new Promise((resolve, reject) => {
			axios
				.post(base.getResourceInfo, data)
				.then((res) => {
					resolve(res.data);
				})
				.catch((error) => {
					reject(error.data);
				});
		});
	},
	delResource: (id) => {
		return new Promise((resolve, reject) => {
			axios
				.post(base.delResource, { id })
				.then((res) => {
					resolve(res.data);
				})
				.catch((error) => {
					reject(error.data);
				});
		});
	},
	addResourceTag: (data) => {
		return new Promise((resolve, reject) => {
			axios
				.post(base.addResourceTag, data)
				.then((res) => {
					resolve(res.data);
				})
				.catch((error) => {
					reject(error.data);
				});
		});
	},
	delResourceTag: (data) => {
		return new Promise((resolve, reject) => {
			axios
				.post(base.delResourceTag, data)
				.then((res) => {
					resolve(res.data);
				})
				.catch((error) => {
					reject(error.data);
				});
		});
	},
};

export default resapi;
