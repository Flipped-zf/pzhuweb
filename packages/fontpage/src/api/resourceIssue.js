import base from './myBase';
import axios from '../utils/request';
const ResourceIssue = {
	getResourceIssue(id) {
		return new Promise((resolve, reject) => {
			axios
				.post(base.getResourceIssue, { id })
				.then((res) => {
					resolve(res.data);
				})
				.catch((err) => {
					reject(err.data);
				});
		});
	},
	uploadResource(params) {
		return new Promise((resolve, reject) => {
			axios
				.post(base.uploadResource, params)
				.then((res) => {
					resolve(res.data);
				})
				.catch((err) => {
					reject(err.data);
				});
		});
	},
	uploadResourceCover(params) {
		return new Promise((resolve, reject) => {
			axios
				.post(base.uploadResourceCover, params)
				.then((res) => {
					resolve(res.data);
				})
				.catch((err) => {
					reject(err.data);
				});
		});
	},
	delResourceCover(params) {
		return new Promise((resolve, reject) => {
			axios
				.post(base.delResourceCover, params)
				.then((res) => {
					resolve(res.data);
				})
				.catch((err) => {
					reject(err.data);
				});
		});
	},
	uploadResourceAttachment(params) {
		return new Promise((resolve, reject) => {
			axios
				.post(base.uploadResourceAttachment, params)
				.then((res) => {
					resolve(res.data);
				})
				.catch((err) => {
					reject(err.data);
				});
		});
	},
	delResourceAttachment(params) {
		return new Promise((resolve, reject) => {
			axios
				.post(base.delResourceAttachment, params)
				.then((res) => {
					resolve(res.data);
				})
				.catch((err) => {
					reject(err.data);
				});
		});
	},
};

export default ResourceIssue;
