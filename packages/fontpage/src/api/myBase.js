const base = {
	//无需权限
	getHomeInfo: '/my/homeinfo', //
	getHomeuser: '/my/homeuserinfo', //首页成员信息
	getArticle: '/my/article', //团队动态
	getArticleInfo: '/my/articleDetails', // 获取文章详情界面的接口
	getResource: '/my/resourceShare', //资源分享
	getAchievement: '/my/achievementShare',
	getMemberInfo: '/my/memberInfo',
	getAlbums: '/my/albums',
	getPhotosByAlbumId: '/my/photosByAlbumId',
	getCode: '/api/my/getcode',
	login: '/my/fontlogin',
	forgetPassword: '/my/forgetpassword',
	changePassword: '/my/changepassword',
	getemailCode: '/my/getemailCode',
	registerUser: '/my/registerUser',
	getregisterCode: '/my/emailCode',
	//有id没权限
	getUserInfo: '/my/getUserInfo', // 获取用户个人信息
	getUserArticle: '/my/getUserArticle',
	searchUserArticle: '/my/searchUserArticle',
	getUserAchievement: '/my/getUserAchievement',
	searchUserAchievement: '/my/searchUserAchievement',
	getUserCollect: '/my/getUserCollect',
	searchUserCollect: '/my/searchUserCollect',
	getUserResource: '/my/getUserResource',
	searchUserResource: '/my/searchUserResource',
	//权限
	qiniuToken: '/my/qiniuToken',

	getInitInfo: '/my/fontapi/getInitInfo',
	getInitMessage: '/my/fontapi/getInitMessage',
	uploadUserInfo: '/my/fontapi/uploadUserInfo',

	getAchievementIssue: '/my/fontapi/getAchievementIssue',
	uploadAchievement: '/my/fontapi/uploadAchievement',
	deleteAchievement: '/my/fontapi/deleteAchievement',
	uploadAchievementCover: '/my/fontapi/uploadAchievementCover',
	delAchievementCover: '/my/fontapi/delAchievementCover',
	uploadAchievementAttachment: '/my/fontapi/uploadAchievementAttachment',
	delAchievementAttachment: '/my/fontapi/delAchievementAttachment',

	getResourceIssue: '/my/fontapi/getResourceIssue',
	uploadResource: '/my/fontapi/uploadResource',
	deleteResource: '/my/fontapi/deleteResource',
	uploadResourceCover: '/my/fontapi/uploadResourceCover',
	delResourceCover: '/my/fontapi/delResourceCover',
	uploadResourceAttachment: '/my/fontapi/uploadResourceAttachment',
	delResourceAttachment: '/my/fontapi/delResourceAttachment',

	getArticleEdit: '/my/fontapi/getArticleEdit',
	uploadArticleInfo: '/my/fontapi/uploadArticleInfo',
	uploadArticleeCover: '/my/fontapi/uploadArticleeCover',
	delCoverImg: '/my/fontapi/delCoverImg',
	delUserArticle: '/my/fontapi/delUserArticle',
	getMediaItems: '/my/fontapi/getMediaItems',
	uploadArticleResource: '/my/fontapi/uploadArticleResource',
};
export default base;
