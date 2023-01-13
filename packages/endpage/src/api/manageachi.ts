import base from './base';
import axios from '../utils/request';

const ahiapi = {
	getAchievementInfo: (data) => {
		return new Promise((resolve, reject) => {
			axios
				.post(base.getAchievementInfo, data)
				.then((res) => {
					resolve(res.data);
				})
				.catch((error) => {
					reject(error.data);
				});
		});
	},
	delAchievement: (id) => {
		return new Promise((resolve, reject) => {
			axios
				.post(base.delAchievement, { id })
				.then((res) => {
					resolve(res.data);
				})
				.catch((error) => {
					reject(error.data);
				});
		});
	},
	isShow: (data) => {
		return new Promise((resolve, reject) => {
			axios
				.post(base.isShow, data)
				.then((res) => {
					resolve(res.data);
				})
				.catch((error) => {
					reject(error.data);
				});
		});
	},
	delAchievementTag: (data) => {
		return new Promise((resolve, reject) => {
			axios
				.post(base.delAchievementTag, data)
				.then((res) => {
					resolve(res.data);
				})
				.catch((error) => {
					reject(error.data);
				});
		});
	},
	addAchievementTag: (data) => {
		return new Promise((resolve, reject) => {
			axios
				.post(base.addAchievementTag, data)
				.then((res) => {
					resolve(res.data);
				})
				.catch((error) => {
					reject(error.data);
				});
		});
	},
};

export default ahiapi;
