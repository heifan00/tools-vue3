<template>
  <div class="uuid-tool">
    <el-card class="tool-card">
      <template #header>
        <div class="card-header">
          <h2>UUID生成工具</h2>
          <div class="header-actions">
            <el-button-group>
              <el-button @click="generateUuids" type="primary">重新生成</el-button>
              <el-button @click="copyAllUuids">复制全部</el-button>
              <el-button @click="clearUuids">清空</el-button>
            </el-button-group>
          </div>
        </div>
      </template>
      
      <div class="tool-content">
        <el-row :gutter="20" class="control-panel">
          <el-col :span="12">
            <el-form-item label="生成数量">
              <el-input-number
                v-model="count"
                :min="1"
                :max="50"
                @change="generateUuids"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="显示分隔符">
              <el-switch
                v-model="showDash"
                @change="generateUuids"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row class="uuid-list">
          <el-col :span="24">
            <div v-for="(uuid, index) in uuids" :key="index" class="uuid-item">
              <span class="uuid-text">{{ uuid }}</span>
              <el-button
                class="copy-btn"
                size="small"
                @click="copyUuid(uuid)"
              >
                <el-icon><DocumentCopy /></el-icon>
              </el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { DocumentCopy } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { v4 as uuidv4 } from 'uuid'

const count = ref(10)
const showDash = ref(false)
const uuids = ref([])

// 生成UUID列表
const generateUuids = () => {
  uuids.value = Array(count.value).fill().map(() => {
    const uuid = uuidv4()
    return showDash.value ? uuid : uuid.replace(/-/g, '')
  })
}

// 复制单个UUID
const copyUuid = async (uuid) => {
  try {
    await navigator.clipboard.writeText(uuid)
    ElMessage.success('UUID已复制到剪贴板')
  } catch (error) {
    ElMessage.error('复制失败')
  }
}

// 复制全部UUID
const copyAllUuids = async () => {
  if (uuids.value.length === 0) {
    ElMessage.warning('没有可复制的UUID')
    return
  }
  try {
    await navigator.clipboard.writeText(uuids.value.join('\n'))
    ElMessage.success('所有UUID已复制到剪贴板')
  } catch (error) {
    ElMessage.error('复制失败')
  }
}

// 清空UUID列表
const clearUuids = () => {
  uuids.value = []
}

// 组件挂载时生成初始UUID列表
onMounted(() => {
  generateUuids()
})
</script>

<style scoped>
.uuid-tool {
  height: 100%;
  padding: 20px;
  overflow: hidden;
}

.tool-card {
  height: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tool-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.control-panel {
  margin-bottom: 20px;
}

.uuid-list {
  flex: 1;
  overflow-y: auto;
}

.uuid-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: #f5f7fa;
  border-radius: 4px;
  margin-bottom: 10px;
}

.uuid-text {
  font-family: monospace;
  font-size: 14px;
}

.copy-btn {
  opacity: 0.8;
}

.copy-btn:hover {
  opacity: 1;
}

@media (max-width: 768px) {
  .uuid-tool {
    padding: 10px;
  }
}
</style>