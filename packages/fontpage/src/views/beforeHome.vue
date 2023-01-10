<template>
  <navtop :isPhone="isPhone"></navtop>
  <router-view v-slot="{ Component }">
    <transition name="view" mode="out-in">
      <keep-alive :include="keepAliveComponentNames">
        <component :is="Component" :key="$route.fullPath" />
      </keep-alive>
    </transition>
  </router-view>
  <el-backtop :bottom="100">
    <div
      style="
        height: 100%;
        width: 100%;
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
      "
    >
      UP
    </div>
  </el-backtop>
</template>
<script setup>
import { ref, provide } from 'vue'
import navtop from '../components/header/headertop.vue'

const keepAliveComponentNames = []
let isPhone = ref(false)
isPhone.value = document.documentElement.clientWidth < 768 ? true : false
window.onresize = () => {
  let flag = document.documentElement.clientWidth < 768 ? true : false
  isPhone.value = flag
}
provide('isPhone', isPhone)
</script>
<style lang="less">
.el-drawer__body {
  background-color: #f4f3f3;
}

.el-drawer__body {
  padding: 0;
}

.el-image {
  .el-image__inner {
    object-fit: cover;
    object-position: center;
  }
}
.view-enter-active {
  animation: view-ani 0.5s;
}

.view-leave-active {
  animation: view-ani reverse 0.5s;
}

@keyframes view-ani {
  0% {
    opacity: 0;
    transform: translateX(50px) scale(0.8);
  }
  50% {
    transform: translateX(-10px);
  }
}
</style>
