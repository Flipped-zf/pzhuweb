<template>
	<h1>{{ route.query.id }}</h1>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
</script>

<style scoped lang="less"></style>
