<template>
	<div style="height: 100%; width: 100%">
		<div class="home" v-if="!data.loading">
			<firstView :firstData="data.firstData"></firstView>
			<view2 :memberInfo="data.memberInfo"></view2>
			<view3 :all="data.all"></view3>
		</div>
		<myloading v-else></myloading>
	</div>
</template>

<script setup>
import firstView from '@/components/home/first.vue';
import View2 from '@/components/home/view2.vue';
import { reactive, onBeforeMount } from 'vue';
import View3 from '@/components/home/view3.vue';
import axios from '@/utils/request';
import mybase from '@/api/mybase';
import Myloading from '@/components/other/myloading.vue';

let data = reactive({
	all: {},
	firstData: {},
	loading: true,
	memberInfo: [],
});

// data.firstData = myData

onBeforeMount(async () => {
	await axios.get(mybase.getHomeInfo).then((res) => {
		// const fengmian = res.data.baseInfo.filter((f) => f.order === 1);
		let firstData = res.data.baseInfo[0];
		firstData.coverArray = [];
		res.data.baseInfo.forEach((info) => {
			if (info.order === 1) {
				firstData.coverArray.push(info.cover);
			}
		});
		res.data.baseInfo = res.data.baseInfo.filter((f) => f.order != 1);
		data.firstData = firstData;
		data.all = res.data;
		data.loading = false;
	});

	axios.get(mybase.getHomeuser).then((res) => {
		data.memberInfo = res.data.userinfo.map((item) => {
			return {
				avatar: item.avatar,
				description: item.description,
				name: item.User.name,
			};
		});
	});
});
</script>

<style scoped></style>
