import Cookies from 'js-cookie';
const TokenKey = 'Admin-Token';
export default {
	getToken: function () {
		return Cookies.get(TokenKey);
	},
	setToken: function (token: string) {
		return Cookies.set(TokenKey, token, { expires: 1 });
	},
	removeToken: function () {
		return Cookies.remove(TokenKey);
	},
	removeUserInfo: function () {
		this.removeToken();
		// Cookies.remove('yourPassword')
		// Cookies.remove('yourStuNum')
		Cookies.remove('userTx');
	},
	getCookie(key: string) {
		return Cookies.get(key);
	},
	setCookie(key: string, val: any) {
		Cookies.set(key, val, { expires: 1 });
	},
	removeAllCookies() {
		Cookies.remove('yourStuNum');
		Cookies.remove('yourPassword');
	},
};
