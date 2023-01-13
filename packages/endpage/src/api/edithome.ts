import base from './base';
import axios from '../utils/request';

const edithome = {
	getedithome: () => {
		return new Promise((resolve, reject) => {
			axios
				.get(base.getedithome)
				.then((res) => {
					resolve(res.data);
				})
				.catch((error) => {
					reject(error.data);
				});
		});
	},
	updateHomeInfo: (data) => {
		return new Promise((resolve, reject) => {
			axios
				.post(base.updateHomeInfo, data)
				.then((res) => {
					resolve(res.data);
				})
				.catch((error) => {
					reject(error.data);
				});
		});
	},
};
export default edithome;
