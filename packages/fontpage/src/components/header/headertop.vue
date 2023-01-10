<template>
	<div class="nav" id="nav">
		<div class="navTop">
			<div class="navleft">
				<!--        <button @click="drawer = true" v-if="isPhone">hello</button>-->
				<div @click="drawClick" v-if="isPhone" class="caidan">
					<svg
						t="1646740401627"
						class="icon"
						viewBox="0 0 1462 1024"
						version="1.1"
						xmlns="http://www.w3.org/2000/svg"
						p-id="2056"
						width="16"
						height="16"
					>
						<path
							d="M1389.714286 146.285714H74.517943C37.215086 146.285714 2.896457 115.887543 0.2048 78.555429A73.142857 73.142857 0 0 1 73.142857 0h1315.0208c37.419886 0 71.767771 30.398171 74.430172 67.730286A73.142857 73.142857 0 0 1 1389.714286 146.285714z"
							p-id="2057"
						></path>
						<path
							d="M731.428571 585.142857H74.517943C37.215086 585.142857 2.896457 554.744686 0.2048 517.412571A73.142857 73.142857 0 0 1 73.142857 438.857143h656.735086c37.419886 0 71.738514 30.398171 74.430171 67.701028A73.142857 73.142857 0 0 1 731.428571 585.142857z"
							p-id="2058"
						></path>
						<path
							d="M1389.714286 1024H74.517943C37.215086 1024 2.896457 993.601829 0.2048 956.298971A73.142857 73.142857 0 0 1 73.142857 877.714286h1315.0208c37.419886 0 71.738514 30.398171 74.430172 67.701028A73.142857 73.142857 0 0 1 1389.714286 1024z"
							p-id="2059"
						></path>
					</svg>
				</div>
				<img id="pcTou" src="../../assets/logo.png" @click="router.push('/home')" />
				<ul v-if="!isPhone">
					<li class="pcLi" @click="router.push('/dongtai')">
						<span>团队动态</span>
					</li>
					<li class="pcLi" @click="router.push('/resourceshare')">资源分享</li>
					<li class="pcLi" @click="router.push('/achievement')">成果分享</li>
					<li class="pcLi" @click="router.push('/show')">成员展示</li>
					<li class="pcLi" @click="router.push('/mien')">团队风采</li>
				</ul>
			</div>
			<div class="topCenter" v-if="isPhone">WEB官网</div>
			<div v-if="!isPhone && !isLogin" class="navright">
				<ul>
					<li @click="router.push('/login')">登录</li>
					/
					<li @click="drawerRegister = true">注册</li>
				</ul>
			</div>
			<div v-if="!isPhone && isLogin" style="cursor: pointer; display: flex; align-items: center">
				<el-popover placement="bottom" :width="200" trigger="hover" content="this is content, this is content, this is content">
					<template #reference>
						<el-avatar :size="50" :src="isLogin ? userStore.userInfo.tx : imgURL"></el-avatar>
					</template>
					<el-menu router>
						<el-menu-item index="/user/article">
							<el-icon><Avatar /></el-icon>
							<span>个人主页</span>
						</el-menu-item>
						<el-menu-item index="/articleEdit">
							<el-icon><EditPen /></el-icon>
							<span>文章发布</span>
						</el-menu-item>
						<el-menu-item index="/resourceIssue">
							<el-icon><Link /></el-icon>
							<span>资源发布</span>
						</el-menu-item>
						<el-menu-item index="/achivementIssue">
							<el-icon><Promotion /></el-icon>
							<span>成果发布</span>
						</el-menu-item>
						<el-menu-item index="" @click="UserOut">
							<el-icon><SwitchButton /></el-icon>
							<span>退出登录</span>
						</el-menu-item>
					</el-menu>
				</el-popover>
			</div>
		</div>
	</div>
	<el-drawer v-model="drawer" :with-header="false" :direction="direction" size="70%">
		<div id="drawerHeader">
			<div class="card-header">
				<div class="card-cover">
					<img :src="isLogin ? userStore.userInfo.tx : imgURL" />
				</div>
				<img class="card-avatar" :src="isLogin ? userStore.userInfo.tx : imgURL" alt="avatar" />
				<h1 class="card-fullname">{{ !isLogin ? '请登录' : userStore.userInfo.name }}</h1>
				<h2 class="card-jobtitle" v-if="isLogin" @click="UserOut">退出登录</h2>
			</div>
			<div v-if="isLogin" class="two">
				<button class="button" @click="myToolPage('/user/article')">个人主页</button>
				<button class="button" @click="myToolPage('/articleEdit')">文章发布</button>
				<button class="button" @click="myToolPage('/resourceIssue')">资源发布</button>
				<button class="button" @click="myToolPage('/achivementIssue')">成果发布</button>
			</div>
			<div v-else class="loginButton">
				<button class="button" @click="myToolPage('/login')">去登录</button>
			</div>
		</div>
		<div id="drawerBody">
			<button class="custom-btn btn-5" v-for="(item, index) in routers" :key="index" @click="go(item.path)">
				<span>{{ item.name }}</span>
			</button>
		</div>
	</el-drawer>
	<el-backtop v-if="isPhone" :bottom="50">
		<div
			@click.stop="drawClick"
			style="height: 20px; width: 20px; background-color: #f2f5f6; box-shadow: 0 0 6px rgba(0, 0, 0, 0.12); text-align: center; color: #1989fa"
		>
			<svg
				t="1647697078576"
				class="icon"
				style="width: 20px; height: 20px"
				viewBox="0 0 1033 1024"
				version="1.1"
				xmlns="http://www.w3.org/2000/svg"
				p-id="2904"
				width="200"
				height="200"
			>
				<path
					d="M943.428864 180.48H90.180864a85.248 85.248 0 1 1 0-170.496h852.992a85.248 85.248 0 1 1 0 170.496z m0 417.792H90.692864a85.248 85.248 0 1 1 0-170.496h852.224a85.248 85.248 0 1 1 0 170.496z m0 425.472H90.180864a85.504 85.504 0 1 1 0-170.752h852.992a85.504 85.504 0 1 1 0 170.752z m0 0"
					p-id="2905"
				></path>
			</svg>
		</div>
	</el-backtop>
	<el-drawer v-model="drawerRegister" direction="rtl" size="400">
		<template #header>
			<h2>注册</h2>
		</template>
		<template #default>
			<register-my></register-my>
		</template>
	</el-drawer>
</template>

<script setup>
import router from '../../router/index';
import { onMounted, onUpdated } from 'vue';
import { ref, computed } from 'vue';
import { TweenMax, Bounce, Back } from 'gsap';
import RegisterMy from '../../views/login/registerMy.vue';
import { Avatar, EditPen, SwitchButton, Promotion, Link } from '@element-plus/icons-vue';
import auth from '../../utils/auth';
import { useStore } from '@/store';
import imgURL from '../../assets/test/1.jpg';

const userStore = useStore();
const drawer = ref(false);
let drawerRegister = ref(false);
const direction = ref('ltr');
// const routers = ref(router.getRoutes())
const routers = [
	{
		path: '/home',
		name: '首页',
	},
	{
		path: '/dongtai',
		name: '团队动态',
	},
	{
		path: '/resourceshare',
		name: '资源分享',
	},
	{
		path: '/achievement',
		name: '成果分享',
	},
	{
		path: '/show',
		name: '成员展示',
	},
	{
		path: '/mien',
		name: '团队风采',
	},
];
const props = defineProps({
	isPhone: {
		type: Boolean,
	},
	// isLogin: {
	//   type: Boolean,
	// },
});
const isLogin = computed(() => {
	return !!userStore.token;
});

// const isLogin = watch(
//   () => props.isPhone,
//   (newVal, oldVal) => {
//     if (!newVal) {
//       drawer.value = newVal
//     }
//   }
// )

// const data = reactive({
//   tx: props.isLogin ?  store.state.userInfo.tx: imgURL
// })
onMounted(() => {
	TweenMax.from('#pcTou', {
		opacity: 0,
		y: -100,
		duration: 1.5,
		ease: Bounce.easeOut,
	});
	if (!props.isPhone) {
		TweenMax.staggerFrom('.pcLi', 1, { opacity: 0, x: 100, ease: Back.easeOut }, 0.3);
	}
});
let timer = null;
onUpdated(() => {
	clearTimeout(timer);
	timer = setTimeout(() => {
		TweenMax.from('#pcTou', {
			opacity: 0,
			y: -100,
			duration: 1.5,
			ease: Bounce.easeOut,
		});
	}, 1500);
});

function UserOut() {
	auth.removeToken();
	userStore.resetToken();
	router.push('/login');
}

function myToolPage(path) {
	router.push(path);
	let my = null;
	if (my) {
		clearTimeout(my);
	}
	my = setTimeout(() => {
		drawer.value = false;
	}, 500);
}

function go(path) {
	router.push(path);
	let my = null;
	if (my) {
		clearTimeout(my);
	}
	my = setTimeout(() => {
		drawer.value = false;
	}, 500);
}

function drawClick() {
	drawer.value = true;
}
</script>

<style>
.el-menu {
	border-right: 0;
}
.el-drawer__body {
	overflow: hidden;
}
</style>
<style scoped lang="less">
@media screen and(min-width: 200px) and (max-width: 768px) {
	#nav {
		line-height: 50px;
		height: 50px;

		.navTop {
			justify-content: space-between;

			.navleft {
				img {
					height: 50px;
				}
			}
		}
	}
}

#drawerHeader {
	height: 350px;
	width: 100%;
	//background-color: #6a6a6a;
	.card-header {
		height: 60%;
		width: 100%;
		position: relative;
		display: flex;
		flex-shrink: 0;
		transition: 0.3s;
		.card-cover {
			width: 100%;
			height: 100%;
			position: absolute;
			height: 160px;
			top: -20%;
			left: 0;
			img {
				width: 100%;
				height: 100%;
				will-change: top;
				background-size: cover;
				background-position: center;
				filter: blur(30px);
				transform: scale(1.2);
				transition: 0.5s;
			}
		}
		.card-avatar {
			width: 100px;
			height: 100px;
			box-shadow: 0 8px 8px rgba(0, 0, 0, 0.2);
			border-radius: 50%;
			-o-object-position: center;
			object-position: center;
			-o-object-fit: cover;
			object-fit: cover;
			position: absolute;
			bottom: 0;
			left: 50%;
			transform: translateX(-50%) translateY(-64px);
		}
		.card-fullname {
			position: absolute;
			bottom: 0;
			font-size: 22px;
			font-weight: 700;
			text-align: center;
			white-space: nowrap;
			transform: translateY(-25px) translateX(-50%);
			left: 50%;
		}

		.card-jobtitle {
			position: absolute;
			bottom: 0;
			font-size: 11px;
			white-space: nowrap;
			font-weight: 500;
			opacity: 0.7;
			text-transform: uppercase;
			letter-spacing: 1.5px;
			margin: 0;
			left: 50%;
			transform: translateX(-50%) translateY(-7px);
		}
	}

	.two,
	.loginButton {
		height: 40%;
		width: 100%;
		// background-color: #00aadc;
		.button {
			width: 100%;
			height: 45px;
			font-family: 'Roboto', sans-serif;
			font-size: 11px;
			text-transform: uppercase;
			letter-spacing: 2.5px;
			font-weight: 500;
			color: #000;
			background-color: #fff;
			border: none;
			border-radius: 45px;
			box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
			transition: all 0.3s ease 0s;
			cursor: pointer;
			outline: none;
			user-select: none;
		}
		.button:hover {
			background-color: #2ee59d;
			box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
			color: #fff;
			transform: translateY(-4px);
		}
	}
	.two {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
		grid-gap: 10px;
	}
	.loginButton {
		display: flex;
		justify-content: center;
		align-items: center;
	}
}

#drawerBody {
	padding: 20px 10px 0 10px;

	button {
		margin: 0 0 10px 0;
	}

	.custom-btn {
		height: 40px;
		color: #fff;
		border-radius: 5px;
		padding: 10px 25px;
		font-weight: 500;
		background: transparent;
		cursor: pointer;
		transition: all 0.3s ease;
		position: relative;
		display: inline-block;
		box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5), 7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1);
		outline: none;
	}

	.btn-5 {
		width: 100%;
		height: 40px;
		line-height: 42px;
		padding: 0;
		border: none;
		color: #000000;
		//background: rgb(255,27,0);
		//background: linear-gradient(0deg, rgba(255,27,0,1) 0%, rgba(251,75,2,1) 100%);
	}

	.btn-5:hover {
		color: #000000;
		//background: linear-gradient(90deg, rgba(38,157,207,1) 0%, rgba(115,195,32,1) 50%, rgba(248,202,0,1) 100%);;
		box-shadow: none;
	}

	.btn-5:before,
	.btn-5:after {
		content: '';
		position: absolute;
		top: 0;
		right: 0;
		height: 2px;
		width: 0;
		background: linear-gradient(90deg, rgba(38, 157, 207, 1) 0%, rgba(115, 195, 32, 1) 50%, rgba(248, 202, 0, 1) 100%);
		box-shadow: -1px -1px 5px 0px #fff, 7px 7px 20px 0px #0003, 4px 4px 5px 0px #0002;
		transition: 400ms ease all;
	}

	.btn-5:after {
		right: inherit;
		top: inherit;
		left: 0;
		bottom: 0;
	}

	.btn-5:hover:before,
	.btn-5:hover:after {
		width: 100%;
		transition: 800ms ease all;
	}
}

.nav {
	//background-color: #333333;
	line-height: 60px;

	li {
		user-select: none;
		cursor: pointer;

		&:hover {
			color: #1890ff;
			animation: neon2 1.5s ease-in-out infinite alternate;
		}
	}
}

@keyframes neon2 {
	from {
		text-shadow: 0 0 2px #fff, 0 0 5px #fff, 0 0 7px #fff, 0 0 10px #228dff;
	}
	to {
		text-shadow: 0 0 1px #fff, 0 0 2px #fff, 0 0 4px #fff, 0 0 5px #228dff;
	}
}

.navTop {
	width: 100%;
	margin: 0 auto;
	background-color: #ffffff;
	display: flex;
	justify-content: space-around;
	font-weight: 600;

	.topCenter {
		font-weight: 800;
		font-size: 24px;
		padding: 0 20px;
	}

	.navleft {
		display: flex;

		ul {
			padding: 0;
			margin: 0;
			list-style: none;
			display: flex;

			& li {
				padding: 0 20px;
			}
		}

		.icon {
			width: 20px;
			padding-left: 5px;
		}

		img {
			cursor: pointer;
			height: 60px;
		}
	}

	.navright {
		ul {
			padding: 0;
			margin: 0;
			list-style: none;
			display: flex;

			& li {
				padding: 0 5px;
			}
		}
	}
}
</style>
