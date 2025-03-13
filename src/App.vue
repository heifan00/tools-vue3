<template>
  <el-container class="app-container">
    <el-aside width="200px" class="app-aside">
      <el-menu
        router
        :default-active="$route.path"
        class="app-menu"
      >
        <el-menu-item index="/timestamp">
          <el-icon><Clock /></el-icon>
          <span>时间戳工具</span>
        </el-menu-item>
        <el-menu-item index="/json">
          <el-icon><Document /></el-icon>
          <span>JSON格式化</span>
        </el-menu-item>
        <el-menu-item index="/uuid">
          <el-icon><Key /></el-icon>
          <span>UUID生成器</span>
        </el-menu-item>
        <el-menu-item index="/md5">
          <el-icon><Lock /></el-icon>
          <span>MD5加密</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main class="app-main">
      <router-view />
    </el-main>
  </el-container>
</template>

<script setup>
import { Clock, Document, Key, Lock } from '@element-plus/icons-vue'
</script>

<style>
@font-face {
  font-family: 'CustomFont';
  src: url('https://cdn.jsdmirror.com/gh/LWingYan/photos@latest/zql.woff2') format('woff2');
  font-weight: normal;
  font-style: normal;
}

#app {
  font-family: 'CustomFont', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
