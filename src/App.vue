<template>
  <div class="common-layout">
    <!-- 外层容器使用 flex 布局 -->
    <el-container class="full-height-container">
      <!-- Header 固定高度 -->
      <el-header height="60px" class="app-header">
        <h1>我的应用</h1>
      </el-header>

      <!-- 内层容器撑满剩余空间 -->
      <el-container class="flex-container">
        <!-- 侧边栏固定 + 独立滚动 -->
        <el-aside width="200px" class="app-aside">
          <el-menu
            router
            :default-active="$route.path"
            class="app-menu h-full"
          >
            <el-menu-item index="/timestamp">
              <el-icon><Clock /></el-icon>
              <span>时间戳工具</span>
            </el-menu-item>
            <el-menu-item index="/json">
              <el-icon><Document /></el-icon>
              <span>JSON格式化</span>
            </el-menu-item>
          </el-menu>
        </el-aside>

        <!-- 主内容区域（固定高度，不滚动） -->
        <el-container direction="vertical" class="main-content-container">
          <!-- 主内容区域 -->
          <el-main class="fixed-main">
            <router-view />
          </el-main>
          
          <!-- Footer 固定底部 -->
          <el-footer height="40px" class="app-footer">
            © 2024 我的应用
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { Clock, Document } from '@element-plus/icons-vue'
</script>

<style>
@font-face {
  font-family: 'CustomFont';
  src: url('https://cdn.jsdmirror.com/gh/LWingYan/photos@latest/zql.woff2') format('woff2');
  font-weight: normal;
  font-style: normal;
}

html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
}

#app {
  font-family: 'CustomFont', Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  overflow: hidden;
}

/* 关键样式 */
.common-layout {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.full-height-container {
  flex: 1;
  min-height: 0; /* 修复 Firefox 的 flex 布局问题 */
  overflow: hidden; /* 防止容器滚动 */
}

.flex-container {
  flex: 1;
  min-height: 0;
  overflow: hidden; /* 防止内层容器滚动 */
}

.app-aside {
  overflow-y: auto;
  height: calc(100% - 60px);
  position: fixed;
  top: 60px;
  width: 200px;
  background-color: white;
  z-index: 1;
}

.main-content-container {
  flex: 1;
  overflow: hidden; /* 防止外层滚动条 */
  display: flex;
  flex-direction: column;
}

.fixed-main {
  flex: 1;
  overflow: hidden; /* 禁止滚动 */
  height: calc(100% - 60px - 40px);
  margin-left: 200px;
}

/* 美化样式 */
.app-header {
  background-color: #ababd1;
  color: white;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.app-footer {
  background-color: #f5f7fa;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #e4e7ed;
}

.h-full {
  height: 100%;
}
</style>
