import base from './myBase';
import axios from '../utils/request';

const User = {
	getUserInfo(params) {
		return new Promise((resolve, reject) => {
			axios
				.get(`${base.getUserInfo}`, { params })
				.then((res) => {
					resolve(res.data);
				})
				.catch((err) => {
					reject(err.data);
				});
		});
	},
	getUserResource(params) {
		return new Promise((resolve, reject) => {
			axios
				.get(`${base.getUserResource}`, { params })
				.then((res) => {
					resolve(res.data);
				})
				.catch((err) => {
					reject(err.data);
				});
		});
	},
	searchUserResource(params) {
		return new Promise((resolve, reject) => {
			axios
				.get(`${base.searchUserResource}`, { params })
				.then((res) => {
					resolve(res.data);
				})
				.catch((err) => {
					reject(err.data);
				});
		});
	},
	deleteResource(id) {
		return new Promise((resolve, reject) => {
			axios
				.get(`${base.deleteResource}/${id}`)
				.then((res) => {
					resolve(res);
				})
				.catch((err) => {
					reject(err);
				});
		});
	},
	getUserAchievement(params) {
		return new Promise((resolve, reject) => {
			axios
				.get(`${base.getUserAchievement}`, { params })
				.then((res) => {
					resolve(res.data);
				})
				.catch((err) => {
					reject(err.data);
				});
		});
	},
	deleteAchievement(id) {
		return new Promise((resolve, reject) => {
			axios
				.get(`${base.deleteAchievement}/${id}`)
				.then((res) => {
					resolve(res);
				})
				.catch((err) => {
					reject(err);
				});
		});
	},
	searchUserAchievement(params) {
		return new Promise((resolve, reject) => {
			axios
				.get(`${base.searchUserAchievement}`, { params })
				.then((res) => {
					resolve(res.data);
				})
				.catch((err) => {
					reject(err.data);
				});
		});
	},
	getUserArticle(params) {
		return new Promise((resolve, reject) => {
			axios
				.get(`${base.getUserArticle}`, { params })
				.then((res) => {
					resolve(res.data);
				})
				.catch((err) => {
					reject(err.data);
				});
		});
	},
	searchUserArticle(params) {
		return new Promise((resolve, reject) => {
			axios
				.get(`${base.searchUserArticle}`, { params })
				.then((res) => {
					resolve(res.data);
				})
				.catch((err) => {
					reject(err.data);
				});
		});
	},
	delUserArticle(id) {
		return new Promise((resolve, reject) => {
			axios
				.get(`${base.delUserArticle}/${id}`)
				.then((res) => {
					resolve(res);
				})
				.catch((err) => {
					reject(err);
				});
		});
	},
	getUserCollect(params) {
		return new Promise((resolve, reject) => {
			axios
				.get(`${base.getUserCollect}`, { params })
				.then((res) => {
					resolve(res.data);
				})
				.catch((err) => {
					reject(err.data);
				});
		});
	},
	searchUserCollect(params) {
		return new Promise((resolve, reject) => {
			axios
				.get(`${base.searchUserCollect}`, { params })
				.then((res) => {
					resolve(res.data);
				})
				.catch((err) => {
					reject(err.data);
				});
		});
	},
	delUserCollect(id) {
		return new Promise((resolve, reject) => {
			axios
				.post(`${base.delUserCollect}`, { id })
				.then((res) => {
					resolve(res.data);
				})
				.catch((err) => {
					reject(err.data);
				});
		});
	},
	collectArticle(id) {
		return new Promise((resolve, reject) => {
			axios
				.post(base.collectArticle, { id })
				.then((res) => {
					resolve(res.data);
				})
				.catch((err) => {
					reject(err.data);
				});
		});
	},
	cancelCollect(id) {
		return new Promise((resolve, reject) => {
			axios
				.post(base.cancelCollect, { id })
				.then((res) => {
					resolve(res.data);
				})
				.catch((err) => {
					reject(err.data);
				});
		});
	},
};

export default User;
