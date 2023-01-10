import base from './myBase';
import axios from '../utils/request';

const album = {
	getAlbums(params) {
		return new Promise((resolve, reject) => {
			axios
				.get(`${base.getAlbums}/${params.type}`)
				.then((res) => {
					resolve(res.data);
				})
				.catch((err) => {
					reject(err.data);
				});
		});
	},
	getPhotosByAlbumId(params) {
		return new Promise((resolve, reject) => {
			axios
				.get(`${base.getPhotosByAlbumId}/${params.id}`)
				.then((res) => {
					resolve(res.data);
				})
				.catch((err) => {
					reject(err.data);
				});
		});
	},
	createAlbum() {},
	uploadPhotos() {},
};
export default album;
