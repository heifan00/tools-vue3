<template>
  <div class="md5-tool">
    <el-card class="tool-card">
      <template #header>
        <div class="card-header">
          <h2>MD5加密工具</h2>
          <div class="header-actions">
            <el-button @click="clearContent" type="primary">清空</el-button>
          </div>
        </div>
      </template>
      
      <div class="tool-content">
        <el-row :gutter="20" class="input-section">
          <el-col :span="24">
            <el-input
              v-model="inputText"
              type="textarea"
              :rows="4"
              placeholder="请输入要加密的内容"
              @input="handleInput"
            />
          </el-col>
        </el-row>

        <el-row :gutter="20" class="result-section">
          <el-col :span="24">
            <div class="result-group">
              <h3>32位 MD5</h3>
              <div class="result-item">
                <div class="result-label">大写：</div>
                <div class="result-value">
                  <span class="md5-text">{{ md5_32.toUpperCase() }}</span>
                  <el-button
                    class="copy-btn"
                    size="small"
                    @click="copyToClipboard(md5_32.toUpperCase(), '32位大写MD5')"
                  >
                    <el-icon><DocumentCopy /></el-icon>
                  </el-button>
                </div>
              </div>
              <div class="result-item">
                <div class="result-label">小写：</div>
                <div class="result-value">
                  <span class="md5-text">{{ md5_32.toLowerCase() }}</span>
                  <el-button
                    class="copy-btn"
                    size="small"
                    @click="copyToClipboard(md5_32.toLowerCase(), '32位小写MD5')"
                  >
                    <el-icon><DocumentCopy /></el-icon>
                  </el-button>
                </div>
              </div>
            </div>

            <div class="result-group">
              <h3>16位 MD5</h3>
              <div class="result-item">
                <div class="result-label">大写：</div>
                <div class="result-value">
                  <span class="md5-text">{{ md5_16.toUpperCase() }}</span>
                  <el-button
                    class="copy-btn"
                    size="small"
                    @click="copyToClipboard(md5_16.toUpperCase(), '16位大写MD5')"
                  >
                    <el-icon><DocumentCopy /></el-icon>
                  </el-button>
                </div>
              </div>
              <div class="result-item">
                <div class="result-label">小写：</div>
                <div class="result-value">
                  <span class="md5-text">{{ md5_16.toLowerCase() }}</span>
                  <el-button
                    class="copy-btn"
                    size="small"
                    @click="copyToClipboard(md5_16.toLowerCase(), '16位小写MD5')"
                  >
                    <el-icon><DocumentCopy /></el-icon>
                  </el-button>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { DocumentCopy } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import md5 from 'crypto-js/md5'

const inputText = ref('')
const md5_32 = ref('')
const md5_16 = ref('')

// 计算MD5
const calculateMd5 = (text) => {
  if (!text) {
    md5_32.value = ''
    md5_16.value = ''
    return
  }
  const hash = md5(text).toString()
  md5_32.value = hash
  md5_16.value = hash.substring(8, 24)
}

// 监听输入变化
watch(inputText, (newValue) => {
  calculateMd5(newValue)
})

// 复制到剪贴板
const copyToClipboard = async (text, type) => {
  try {
    await navigator.clipboard.writeText(text)
    ElMessage.success(`${type}已复制到剪贴板`)
  } catch (error) {
    ElMessage.error('复制失败')
  }
}

// 清空内容
const clearContent = () => {
  inputText.value = ''
  calculateMd5('')
}

// 处理输入
const handleInput = () => {
  calculateMd5(inputText.value)
}
</script>

<style scoped>
.md5-tool {
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

.input-section {
  margin-bottom: 20px;
}

.result-section {
  flex: 1;
  overflow-y: auto;
}

.result-group {
  background-color: #f5f7fa;
  border-radius: 4px;
  padding: 15px;
  margin-bottom: 20px;
}

.result-group h3 {
  margin-top: 0;
  margin-bottom: 15px;
  color: #409eff;
}

.result-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.result-item:last-child {
  margin-bottom: 0;
}

.result-label {
  width: 60px;
  color: #606266;
}

.result-value {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  padding: 8px 15px;
  border-radius: 4px;
}

.md5-text {
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
  .md5-tool {
    padding: 10px;
  }
  
  .result-value {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }
  
  .copy-btn {
    align-self: flex-end;
  }
}
</style>