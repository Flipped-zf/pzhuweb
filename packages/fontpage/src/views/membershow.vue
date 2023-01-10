<template>
	<div>
		<div class="head">
			<div class="select">
				<span>成员分类：</span
				><el-select v-model="value1" multiple clearable collapse-tags @change="change" placeholder="全部" style="width: 240px">
					<el-option v-for="item in data.domain" :key="item.id" :label="item.name" :value="item.id">
						<span style="float: left">{{ item.name }}</span>
						<span style="float: right; color: var(--el-text-color-secondary); font-size: 13px">{{ item.index }}</span>
					</el-option>
				</el-select>
			</div>
			<div class="select">
				<span>年级分类：</span
				><el-select v-model="value2" multiple clearable collapse-tags @change="change" placeholder="全部" style="width: 240px">
					<el-option v-for="item in data.grade" :key="item.value" :label="item.label" :value="item.value" />
				</el-select>
			</div>
		</div>
		<div class="content">
			<div class="card" v-for="(item, index) in data.changeGrade" :key="item.value">
				<div class="cardHead">
					{{ item.label }}
				</div>
				<div class="cardBody">
					<self-card :info="item" v-for="(item, index) in data.changeMydate[item.value]" :key="index + 's'"></self-card>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import SelfCard from '../components/other/selfCard.vue';
import axios from '../utils/request';
import base from '../api/myBase';

const value1 = ref([]);
const value2 = ref([]);

const data = reactive({
	memberInfo: [],
	domain: [],
	grade: [],
	changeMydate: {},
	changeGrade: [],
});

axios.get(base.getMemberInfo).then((res) => {
	data.domain = res.data.domain;
	data.memberInfo = res.data.data;
	data.domain = filterDomainNum(data.domain, data.memberInfo);
	let { myDate, grade } = filterGrade(data.memberInfo);
	data.changeGrade = data.grade = grade;
	data.changeMydate = myDate;
});

function change() {
	let { myDate, grade } = filterGrade(data.memberInfo);
	data.changeGrade = grade;
	data.changeMydate = myDate;
	if (value2.value[0]) {
		data.changeGrade = data.grade.filter((item) => {
			return Boolean(value2.value.indexOf(item.value) + 1);
		});
	}
	if (value1.value[0]) {
		data.changeGrade.forEach((item) => {
			data.changeMydate[item.value] = data.changeMydate[item.value].filter((item) => {
				return Boolean(value1.value.indexOf(item.domain) + 1);
			});
			if (data.changeMydate[item.value][0] == undefined) {
				data.changeGrade = data.changeGrade.filter((item2) => {
					return !(item2.value == item.value);
				});
			}
		});
	}
}

function filterDomainNum(domain, memberInfo) {
	const domains = domain.map((item) => {
		let num = 0;
		for (const i of memberInfo) {
			if (item.id === i.domain) {
				++num;
			}
		}
		return {
			id: item.id,
			name: item.name,
			index: num,
		};
	});
	return domains;
}
function filterGrade(memberInfo) {
	let myDate = {};
	let grade = [];
	memberInfo.forEach((item) => {
		if (item.User.status == 3) {
			if (myDate['teacher'] == undefined) {
				myDate['teacher'] = [];
				grade.push({
					label: '指导老师',
					value: 'teacher',
				});
			}
			myDate['teacher'].push(item);
		} else {
			let num = parseInt(item.id.substring(0, 4)) + 4;
			if (myDate[num] == undefined) {
				myDate[num] = [];
				grade.push({
					label: num + '届',
					value: num + '',
				});
			}
			myDate[num].push(item);
		}
	});
	return {
		myDate,
		grade,
	};
}
</script>

<style scoped lang="less">
.head {
	margin: 10px auto;
	width: 80vw;
	//height: 60px;
	background-color: white;
	display: flex;
	align-items: center;
	justify-content: space-around;
	font-size: 20px;
	font-weight: bold;
	letter-spacing: 0.2em;
	text-align: center;
	.select {
		margin: 10px 0;
		span {
			margin-left: 10px;
		}
	}
	@media (max-width: 700px) {
		flex-direction: column;
		width: 100vw;
	}
}
.content {
	@media (max-width: 700px) {
		width: 100vw;
	}
	margin: 10px auto;
	width: 80vw;
	background-color: white;
	.card {
		width: 100%;
		.cardHead {
			text-align: center;
			padding-left: 50px;
			font-size: 24px;
			font-weight: bold;
			line-height: 60px;
			border-bottom: 1px #f4f3f3 solid;
			@media (max-width: 700px) {
				padding-left: 0;
			}
		}
		.cardBody {
			padding: 10px 0;
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
			grid-row-gap: 15px;
			border-bottom: 3px #f4f3f3 solid;
		}
	}
}
</style>
