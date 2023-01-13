import base from './base';
import axios from '../utils/request';

const managearticle = {
	getArticleInfo: (data) => {
		return new Promise((resolve, reject) => {
			axios
				.post(base.getArticleInfo, data)
				.then((res) => {
					resolve(res.data);
				})
				.catch((error) => {
					reject(error.data);
				});
		});
	},
	deleteArticle: (id) => {
		return new Promise((resolve, reject) => {
			axios
				.post(base.deleteArticle, { id })
				.then((res) => {
					resolve(res.data);
				})
				.catch((error) => {
					reject(error.data);
				});
		});
	},
	istop: (data) => {
		return new Promise((resolve, reject) => {
			axios
				.post(base.istop, data)
				.then((res) => {
					resolve(res.data);
				})
				.catch((error) => {
					reject(error.data);
				});
		});
	},
	delArticleTag: (data) => {
		return new Promise((resolve, reject) => {
			axios
				.post(base.delArticleTag, data)
				.then((res) => {
					resolve(res.data);
				})
				.catch((error) => {
					reject(error.data);
				});
		});
	},
	addArticleTag: (data) => {
		return new Promise((resolve, reject) => {
			axios
				.post(base.addArticleTag, data)
				.then((res) => {
					resolve(res.data);
				})
				.catch((error) => {
					reject(error.data);
				});
		});
	},
	getArticleEdit(id) {
		return new Promise((resolve, reject) => {
			axios
				.post(base.getArticleEdit, { id })
				.then((res) => {
					resolve(res);
				})
				.catch((err) => {
					reject(err.data);
				});
		});
	},
	uploadArticleInfo(params) {
		return new Promise((resolve, reject) => {
			axios
				.post(base.uploadArticleInfo, params)
				.then((res) => {
					resolve(res.data);
				})
				.catch((err) => {
					reject(err.data);
				});
		});
	},
	uploadArticleeCover(params) {
		return new Promise((resolve, reject) => {
			axios
				.post(base.uploadArticleeCover, params)
				.then((res) => {
					resolve(res.data);
				})
				.catch((err) => {
					reject(err.data);
				});
		});
	},
	delCoverImg(params) {
		return new Promise((resolve, reject) => {
			axios
				.post(base.delCoverImg, params)
				.then((res) => {
					resolve(res.data);
				})
				.catch((err) => {
					reject(err.data);
				});
		});
	},
};

export default managearticle;
