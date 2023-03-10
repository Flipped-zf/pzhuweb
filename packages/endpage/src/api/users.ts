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
	updateUser: (data: any) => {
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
	deleteUser: (id) => {
		return new Promise((resolve, reject) => {
			axios
				.post(base.deleteUser, { id })
				.then((res) => {
					resolve(res.data);
				})
				.catch((error) => {
					reject(error.data);
				});
		});
	},
	addUserInfo: (data) => {
		return new Promise((resolve, reject) => {
			axios
				.post(base.addUserInfo, data)
				.then((res) => {
					resolve(res.data);
				})
				.catch((error) => {
					reject(error.data);
				});
		});
	},
	resetPassword: (id) => {
		return new Promise((resolve, reject) => {
			axios
				.get(base.resetPassword + '/' + id)
				.then((res) => {
					resolve(res.data);
				})
				.catch((error) => {
					reject(error.data);
				});
		});
	},
	getCheckUser: () => {
		return new Promise((resolve, reject) => {
			axios
				.get(base.getCheckUser)
				.then((res) => {
					resolve(res.data);
				})
				.catch((error) => {
					reject(error.data);
				});
		});
	},
	userReviewPass: (ids) => {
		return new Promise((resolve, reject) => {
			axios
				.post(base.userReviewPass, { ids })
				.then((res) => {
					resolve(res.data);
				})
				.catch((error) => {
					reject(error.data);
				});
		});
	},
	userRefuseJoin: (ids) => {
		return new Promise((resolve, reject) => {
			axios
				.post(base.userRefuseJoin, { ids })
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
