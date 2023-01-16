import { defineStore } from 'pinia';
import Cookies from 'js-cookie';
import { UserInfosStates } from './interface';
import { Session } from '/@/utils/storage';
import { ElMessage } from 'element-plus';

/**
 * 用户信息
 * @methods setUserInfos 设置用户信息
 */
export const useUserInfo = defineStore('userInfo', {
	state: (): UserInfosStates => ({
		userInfos: {
			userName: '',
			photo: '',
			time: 0,
			roles: [],
			authBtnList: [],
		},
	}),
	actions: {
		async setUserInfos(data?: any) {
			if (data) {
				const userName = Cookies.get('userName');
				const Roles: Array<string> = [data.roles];
				const AuthBtnList: Array<string> = data.authBtnList.split(',');
				// 用户信息模拟数据
				const userInfos = {
					userName: userName,
					photo: '',
					time: new Date().getTime(),
					roles: Roles,
					authBtnList: AuthBtnList,
				};
				// 存储用户信息到浏览器缓存
				this.userInfos = userInfos;
				Session.setObjCookie('userInfo', userInfos);
			} else if (Session.getObjCookie('userInfo')) {
				this.userInfos = Session.getObjCookie('userInfo');
			} else {
				ElMessage({
					showClose: true,
					message: '用户初始化异常，重新登录！！！',
					type: 'error',
				});
				Session.clear();
			}
		},
		async getUserInfo() {
			if (Session.getObjCookie('userInfo')) {
				this.userInfos = Session.getObjCookie('userInfo');
			}
		},
	},
});
