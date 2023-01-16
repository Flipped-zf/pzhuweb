import base from './base';
import axios from '../utils/request';

const albumapi = {
	getAlbums: (data) => {
		return new Promise((resolve, reject) => {
			axios
				.post(base.getAlbums, data)
				.then((res) => {
					resolve(res.data);
				})
				.catch((error) => {
					reject(error.data);
				});
		});
	},
	delAlbum: (params) => {
		return new Promise((resolve, reject) => {
			axios
				.get(base.delAlbum, { params })
				.then((res) => {
					resolve(res.data);
				})
				.catch((error) => {
					reject(error.data);
				});
		});
	},
	updateAlbum: (data) => {
		return new Promise((resolve, reject) => {
			axios
				.post(base.updateAlbum, data)
				.then((res) => {
					resolve(res.data);
				})
				.catch((error) => {
					reject(error.data);
				});
		});
	},
	getPhotosByAlbumId: (params) => {
		return new Promise((resolve, reject) => {
			axios
				.get(base.getPhotosByAlbumId, { params })
				.then((res) => {
					resolve(res.data);
				})
				.catch((error) => {
					reject(error.data);
				});
		});
	},
	addAlbumType: (val) => {
		return new Promise((resolve, reject) => {
			axios
				.get(`${base.addAlbumType}/${val}`)
				.then((res) => {
					resolve(res.data);
				})
				.catch((error) => {
					reject(error.data);
				});
		});
	},
	delAlbumType: (val) => {
		return new Promise((resolve, reject) => {
			axios
				.get(`${base.delAlbumType}/${val}`)
				.then((res) => {
					resolve(res.data);
				})
				.catch((error) => {
					reject(error.data);
				});
		});
	},
};

export default albumapi;
