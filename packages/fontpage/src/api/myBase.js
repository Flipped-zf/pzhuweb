const base = {
	//无需权限
	getHomeInfo: '/homeinfo', //
	getHomeuser: '/homeuserinfo', //首页成员信息
	getArticle: '/article', //团队动态
	getArticleInfo: '/articleDetails', // 获取文章详情界面的接口
	getResource: '/resourceShare', //资源分享
	getAchievement: '/achievementShare',
	getMemberInfo: '/memberInfo',
	getAlbums: '/albums',
	getPhotosByAlbumId: '/photosByAlbumId',
	getCode: '/api/getcode',
	login: '/fontlogin',
	forgetPassword: '/forgetpassword',
	changePassword: '/changepassword',
	getemailCode: '/getemailCode',
	registerUser: '/registerUser',
	getregisterCode: '/emailCode',
	//有id没权限
	getUserInfo: '/getUserInfo', // 获取用户个人信息
	getUserArticle: '/getUserArticle',
	searchUserArticle: '/searchUserArticle',
	getUserAchievement: '/getUserAchievement',
	searchUserAchievement: '/searchUserAchievement',
	getUserCollect: '/getUserCollect',
	searchUserCollect: '/searchUserCollect',
	getUserResource: '/getUserResource',
	searchUserResource: '/searchUserResource',
	//权限
	qiniuToken: '/qiniuToken',

	getInitInfo: '/fontapi/getInitInfo',
	getInitMessage: '/fontapi/getInitMessage',
	uploadUserInfo: '/fontapi/uploadUserInfo',

	getAchievementIssue: '/fontapi/getAchievementIssue',
	uploadAchievement: '/fontapi/uploadAchievement',
	deleteAchievement: '/fontapi/deleteAchievement',
	uploadAchievementCover: '/fontapi/uploadAchievementCover',
	delAchievementCover: '/fontapi/delAchievementCover',
	uploadAchievementAttachment: '/fontapi/uploadAchievementAttachment',
	delAchievementAttachment: '/fontapi/delAchievementAttachment',

	getResourceIssue: '/fontapi/getResourceIssue',
	uploadResource: '/fontapi/uploadResource',
	deleteResource: '/fontapi/deleteResource',
	uploadResourceCover: '/fontapi/uploadResourceCover',
	delResourceCover: '/fontapi/delResourceCover',
	uploadResourceAttachment: '/fontapi/uploadResourceAttachment',
	delResourceAttachment: '/fontapi/delResourceAttachment',

	getArticleEdit: '/fontapi/getArticleEdit',
	uploadArticleInfo: '/fontapi/uploadArticleInfo',
	uploadArticleeCover: '/fontapi/uploadArticleeCover',
	delCoverImg: '/fontapi/delCoverImg',
	delUserArticle: '/fontapi/delUserArticle',
	getMediaItems: '/fontapi/getMediaItems',
	uploadArticleResource: '/fontapi/uploadArticleResource',
};
export default base;
