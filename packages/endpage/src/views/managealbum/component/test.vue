<template>
	<h1>{{ test }}</h1>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
defineProps({
	test: Array,
});
</script>

<style scoped lang="less"></style>
