import base from './myBase';
import axios from '../utils/request';
const AchievementIssue = {
	getAchievementIssue(id) {
		return new Promise((resolve, reject) => {
			axios
				.post(base.getAchievementIssue, { id })
				.then((res) => {
					resolve(res.data);
				})
				.catch((err) => {
					reject(err.data);
				});
		});
	},
	uploadAchievement(params) {
		return new Promise((resolve, reject) => {
			axios
				.post(base.uploadAchievement, params)
				.then((res) => {
					resolve(res.data);
				})
				.catch((err) => {
					reject(err.data);
				});
		});
	},
	uploadAchievementCover(params) {
		return new Promise((resolve, reject) => {
			axios
				.post(base.uploadAchievementCover, params)
				.then((res) => {
					resolve(res.data);
				})
				.catch((err) => {
					reject(err.data);
				});
		});
	},
	delAchievementCover(params) {
		return new Promise((resolve, reject) => {
			axios
				.post(base.delAchievementCover, params)
				.then((res) => {
					resolve(res.data);
				})
				.catch((err) => {
					reject(err.data);
				});
		});
	},
	uploadAchievementAttachment(params) {
		return new Promise((resolve, reject) => {
			axios
				.post(base.uploadAchievementAttachment, params)
				.then((res) => {
					resolve(res.data);
				})
				.catch((err) => {
					reject(err.data);
				});
		});
	},
	delAchievementAttachment(params) {
		return new Promise((resolve, reject) => {
			axios
				.post(base.delAchievementAttachment, params)
				.then((res) => {
					resolve(res.data);
				})
				.catch((err) => {
					reject(err.data);
				});
		});
	},
};

export default AchievementIssue;
