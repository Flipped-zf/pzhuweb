import axios from '../utils/request';

const Post = function (url, params) {
	return new Promise((resolve, reject) => {
		axios
			.post(url, params)
			.then((res) => {
				resolve(res.data);
			})
			.catch((err) => {
				reject(err.data);
			});
	});
};

const postCode = function (url, params) {
	return new Promise((resolve, reject) => {
		axios
			.get(`${url}/${params}`)
			.then((res) => {
				resolve(res.data);
			})
			.catch((err) => {
				reject(err.data);
			});
	});
};
export { Post, postCode };
