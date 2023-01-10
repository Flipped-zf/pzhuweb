import { defineStore } from 'pinia';
import auth from '../utils/auth';
import Cookies from 'js-cookie';
export const useStore = defineStore('useStore', {
	state: () => ({
		token: auth.getToken(),
		userInfo: {
			tx: Cookies.get('userTx'),
			id: Cookies.get('yourStuNum'),
			isTourist: !auth.getToken(), // 默认是游客访问用户界面
			name: '',
		},
	}),
	actions: {
		loginSet(tk, id) {
			this.token = tk;
			this.userInfo.id = id;
			this.userInfo.isTourist = false;
		},
		SET_TOKEN(token: string) {
			this.token = token;
		},
		SET_TX(tx, name) {
			this.userInfo.tx = tx;
			this.userInfo.name = name;
		},
		resetToken() {
			return new Promise((resolve) => {
				this.SET_TOKEN('');
				this.userInfo.tx = '';
				this.userInfo.id = '';
				this.userInfo.isTourist = true;
				auth.removeUserInfo();
			});
		},
	},
});
