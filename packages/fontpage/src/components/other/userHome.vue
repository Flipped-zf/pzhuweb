<template>
	<div>
		<div class="userHead">
			<div class="headLeft">
				<div style="display: flex; flex-direction: column; align-items: center">
					<el-avatar :size="80" :src="data.touristInfo.avatar" fit="cover">
						<img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
					</el-avatar>
					<el-button
						v-if="auth.getToken() && (!route.params.id || route.params.id == userStore.userInfo.id)"
						round
						style="margin-top: 10px"
						@click="$router.push('/changInfo')"
						>编辑个人资料</el-button
					>
				</div>
				<div class="userInfo">
					<div style="font-size: 25px; font-weight: 600">
						{{ data.userName }}
					</div>
					<p class="gitHub">gitHub</p>
					<p>
						<el-icon style="margin-right: 10px; vertical-align: -0.125em">
							<avatar />
						</el-icon>
						{{ data.schoolName + ' / ' + data.majorName }}
					</p>
					<p>
						<el-icon style="margin-right: 10px; vertical-align: -0.125em">
							<chat-dot-round />
						</el-icon>
						{{ data.touristInfo.description }}
					</p>
				</div>
			</div>
			<div class="headRight">
				<p style="font-size: 25px; font-weight: 600; text-align: center">个人成就</p>
				<p>
					<el-divider>
						<el-icon>
							<trophy />
						</el-icon>
					</el-divider>
				</p>
				<div class="one">
					<div style="width: 50%; text-align: center">
						<i class="iconfont icon-liulan" style="margin: 0 10px; color: #00aadc"></i>文章被阅读了{{ data.touristInfo.readNum }}次
					</div>
					<div className="ach">
						<div className="ach-item">
							<p>文章</p>
							<p>{{ data.touristInfo.articleNum }}</p>
						</div>
						<div className="ach-item">
							<p>成果</p>
							<p>{{ data.touristInfo.achievementNum }}</p>
						</div>
						<div className="ach-item">
							<p>资源</p>
							<p>{{ data.touristInfo.resourceNum }}</p>
						</div>
					</div>
				</div>
				<div class="two">
					<div>
						<span>收藏集</span><span>{{ +data.touristInfo.favoriteNum }}</span>
					</div>
					<div>
						<span>研究方向</span><span>{{ data.domainName }}</span>
					</div>
					<div>
						<span>加入时间</span><span>{{ dayjs(data.touristInfo.createdAt).format('YYYY-MM-DD') }}</span>
					</div>
				</div>
			</div>
		</div>
		<div class="userBody">
			<el-menu :default-active="activeIndex" mode="horizontal" router>
				<el-menu-item index="1" :route="`/user/${route.params.id ? route.params.id + '/' : ''}article`">文章</el-menu-item>
				<el-menu-item index="2" :route="`/user/${route.params.id ? route.params.id + '/' : ''}ac`">成果</el-menu-item>
				<el-menu-item index="3" :route="`/user/${route.params.id ? route.params.id + '/' : ''}resources`">资源</el-menu-item>
				<el-menu-item index="4" :route="`/user/${route.params.id ? route.params.id + '/' : ''}collect`">收藏</el-menu-item>
			</el-menu>
			<div class="bodyTable">
				<router-view v-slot="{ Component }">
					<transition name="view" mode="out-in">
						<component :is="Component" :key="$route.fullPath" />
					</transition>
				</router-view>
			</div>
		</div>
	</div>
</template>

<script setup>
import Cookies from 'js-cookie';
import user from '../../api/user';
import { reactive, onMounted, ref, provide } from 'vue';
import { useRoute } from 'vue-router';
import { Avatar, ChatDotRound, Trophy } from '@element-plus/icons-vue';
import { TweenMax } from 'gsap';
// import router from '../../router'
import auth from '../../utils/auth';
import { useStore } from '@/store';
import dayjs from 'dayjs';

const userStore = useStore();
const data = reactive({
	touristInfo: {},
	schoolName: '',
	majorName: '',
	userName: '',
	domainName: '',
});
const activeIndex = ref('1');
const route = useRoute();

const myList = ['myArticle', 'myAchievement', 'myResources', 'myCollect'];
activeIndex.value = String(myList.indexOf(route.name) + 1);

user.getUserInfo({ id: route.params.id }).then((res) => {
	data.touristInfo = res.data;
	data.schoolName = res.data.School.name;
	data.majorName = res.data.Major.name;
	data.userName = res.data.User.name;
	data.domainName = res.data.Domain.name;
	if (auth.getToken() && (!route.params.id || route.params.id == userStore.userInfo.id)) {
		Cookies.set('userTx', res.data.avatar, { expires: 1 });
		userStore.SET_TX(res.data.avatar, res.data.User.name);
	}
});
if (auth.getToken() && (!route.params.id || route.params.id == userStore.userInfo.id)) {
	provide('isMyself', true);
} else {
	provide('isMyself', false);
}
onMounted(() => {
	TweenMax.from('.headLeft', 1, {
		duration: 2.5,
		ease: 'elastic.out(1, 0.3)',
		x: -200,
	});
	TweenMax.from('.headRight', 1, {
		duration: 2.5,
		ease: 'elastic.out(1, 0.3)',
		y: 200,
	});
});
</script>

<style scoped lang="less">
//::v-deep .el-menu {
//  font-size: 25px;
//}
.viewTable-enter-active {
	animation: view-ani 0.5s;
}

.viewTable-leave-active {
	animation: view-ani reverse 0.5s;
}

@keyframes view-ani {
	0% {
		opacity: 0;
		transform: translateX(50px);
	}
	50% {
		transform: translateX(-10px);
	}
}

:deep(.el-menu--horizontal) {
	justify-content: space-around;

	.el-menu-item {
		font-size: 23px;
		letter-spacing: 10px;
		@media (max-width: 1000px) {
			letter-spacing: 0;
			font-size: 20px;
		}
	}
}

.userHead {
	width: 80%;
	margin: 10px auto 0;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(600px, 1fr));
	justify-items: center;
	grid-row-gap: 20px;
	@media (max-width: 1550px) {
		width: 100%;
	}

	.headLeft {
		height: 250px;
		width: 500px;
		background: white;
		border-radius: 20px;
		display: flex;
		justify-content: space-around;
		align-items: center;

		.userInfo {
			height: 100%;
			width: 300px;
			//background: #6a6a6a;
			display: flex;
			flex-direction: column;
			justify-content: space-around;

			p {
				font-size: 15px;
				line-height: 1.5;
				color: #72777b;
			}

			.gitHub:before {
				font-family: iconfont;
				margin-right: 10px;
				content: '\e885';
				vertical-align: -0.125em;
			}
		}
	}

	.headRight {
		height: 250px;
		width: 600px;
		background: white;
		border-radius: 20px;

		.one {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.ach {
				width: 50%;
				height: 100px;
				border-bottom: 1px solid #e5e5e5;
				display: flex;
				justify-content: space-between;

				&-item {
					flex: 1;
					height: 100%;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;

					p:first-child {
						font-size: 18px;
						margin-bottom: 10px;
					}

					p:last-child {
						font-size: 16px;
						font-weight: 600;
					}
				}
			}
		}

		.two {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 60px;

			div {
				width: 30%;
				height: 80%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 10px;

				&:nth-child(1) {
					width: 20%;
					border-right: #dcdfe6 2px solid;
				}

				&:nth-child(2) {
					border-right: #dcdfe6 2px solid;
				}
			}
		}
	}
}

.userBody {
	width: 80%;
	margin: 10px auto 0;

	.bodyTable {
		margin-top: 20px;
	}
}

@media (max-width: 1000px) {
	.userHead {
		grid-template-columns: 1fr;

		.headRight {
			width: 100vw;

			.two {
				div {
					width: auto;
				}
			}
		}

		.headLeft {
			height: auto;
			width: 100vw;

			.userInfo {
				width: 50%;

				p {
					margin: 5px 0;
				}
			}
		}
	}

	.userBody {
		width: 100%;
	}
}
</style>
