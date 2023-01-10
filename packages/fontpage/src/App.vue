<template>
	<router-view></router-view>
</template>
<script setup>
import { onBeforeMount } from 'vue';
import axios from './utils/request';
axios.get('/my').then((res) => {
	console.log(res.data);
});

onBeforeMount(() => {
	if (document.getElementsByClassName('loadingcontainer')[0]) {
		document.body.removeChild(document.getElementsByClassName('loadingcontainer')[0]);
	}
});
</script>
<style lang="less">
@import './assets/font/iconfont.css';
* {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
}
html,
body {
	padding: 0;
	margin: 0;
	background-color: #f4f3f3;
}

#app {
	height: 100vh;
	//overflow:hidden;
	//text-align: center;
}
a,
a:hover {
	text-decoration: none;
}
//
//.el-drawer {
//  background-image: url("./assets/img/computer.jpg");
//  background-size: cover;
//  background-position: center;
//}

//.expand-enter-active {
//  transition: all 1s ease;
//  height: 50px;
//  overflow: hidden;
//}
//
//.expand-leave-active {
//  transition: all 1s ease;
//  height: 0px;
//  overflow: hidden;
//}
//
//.expand-enter, .expand-leave {
//  height: 0;
//  opacity: 0;
//}
</style>
