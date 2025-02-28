<template>
  <div class="json-format-tool">
    <el-card class="tool-card">
      <template #header>
        <div class="card-header">
          <h2>JSON格式化工具</h2>
          <div class="header-actions">
            <el-button-group>
              <el-button @click="formatJson" type="primary">格式化</el-button>
              <el-button @click="compressJson">压缩</el-button>
              <el-button @click="clearContent">清空</el-button>
            </el-button-group>
          </div>
        </div>
      </template>
      
      <div class="tool-content">
        <el-row :gutter="20" class="editor-container">
          <el-col :xs="24" :sm="12" class="input-panel">
            <el-input
              v-model="jsonInput"
              type="textarea"
              :rows="20"
              placeholder="请输入要格式化的JSON字符串"
              @input="handleInput"
            />
          </el-col>
          <el-col :xs="24" :sm="12" class="output-panel">
            <div class="output-wrapper">
              <pre class="output-pre"><code class="json hljs" v-html="highlightedOutput"></code></pre>
              <div class="output-info" v-if="lineCount > 0">
                <span class="line-count">总行数: {{ lineCount }}</span>
              </div>
              <el-button
                v-if="formattedOutput"
                class="copy-button"
                size="small"
                type="primary"
                @click="copyToClipboard"
              >
                <el-icon><DocumentCopy /></el-icon>
              </el-button>
            </div>
          </el-col>
        </el-row>

        <el-row v-if="errorMessage" class="error-message">
          <el-col :span="24">
            <el-alert
              :title="errorMessage"
              type="error"
              show-icon
              :closable="false"
            />
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import hljs from 'highlight.js/lib/core'
import json from 'highlight.js/lib/languages/json'
import 'highlight.js/styles/github.css'
import { DocumentCopy } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

// 注册JSON语言支持
hljs.registerLanguage('json', json)

const jsonInput = ref('')
const formattedOutput = ref('')
const highlightedOutput = ref('')
const errorMessage = ref('')

// 计算行数
const lineCount = computed(() => {
  if (!formattedOutput.value) return 0
  return formattedOutput.value.split('\n').length
})

// 处理输入变化
const handleInput = () => {
  if (!jsonInput.value) {
    formattedOutput.value = ''
    highlightedOutput.value = ''
    errorMessage.value = ''
    return
  }
  try {
    const parsed = JSON.parse(jsonInput.value)
    formattedOutput.value = JSON.stringify(parsed, null, 4)
    highlightedOutput.value = hljs.highlight(formattedOutput.value, { language: 'json' }).value
    errorMessage.value = ''
  } catch (error) {
    formattedOutput.value = ''
    highlightedOutput.value = ''
    errorMessage.value = '无效的JSON格式：' + error.message
  }
}

// 格式化JSON
const formatJson = () => {
  if (!jsonInput.value) return
  try {
    const parsed = JSON.parse(jsonInput.value)
    jsonInput.value = JSON.stringify(parsed, null, 4)
    formattedOutput.value = jsonInput.value
    highlightedOutput.value = hljs.highlight(formattedOutput.value, { language: 'json' }).value
    errorMessage.value = ''
  } catch (error) {
    errorMessage.value = '无效的JSON格式：' + error.message
  }
}

// 压缩JSON
const compressJson = () => {
  if (!jsonInput.value) return
  try {
    const parsed = JSON.parse(jsonInput.value)
    jsonInput.value = JSON.stringify(parsed)
    formattedOutput.value = JSON.stringify(parsed, null, 4)
    highlightedOutput.value = hljs.highlight(formattedOutput.value, { language: 'json' }).value
    errorMessage.value = ''
  } catch (error) {
    errorMessage.value = '无效的JSON格式：' + error.message
  }
}

// 复制到剪贴板
const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(formattedOutput.value)
    ElMessage.success('已复制到剪贴板')
  } catch (error) {
    ElMessage.error('复制失败')
  }
}

// 清空内容
const clearContent = () => {
  jsonInput.value = ''
  formattedOutput.value = ''
  highlightedOutput.value = ''
  errorMessage.value = ''
}
</script>

<style scoped>
.json-format-tool {
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

.header-actions {
  display: flex;
  gap: 10px;
}

.tool-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.editor-container {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.input-panel,
.output-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.input-panel :deep(.el-textarea),
.input-panel :deep(.el-textarea__inner) {
  height: 100%;
  flex: 1;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  resize: none;
}

.error-message {
  margin-top: 20px;
}

.output-wrapper {
  position: relative;
  flex: 1;
  display: flex;
  background-color: #f5f7fa;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  overflow: hidden;
}

.output-pre {
  flex: 1;
  margin: 0;
  padding: 14px;
  text-align: left;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 14px;
  line-height: 1.5;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-y: auto;
}

.copy-button {
  position: absolute;
  top: 10px;
  right: 10px;
  opacity: 0.8;
}

.copy-button:hover {
  opacity: 1;
}

.output-info {
  position: absolute;
  bottom: 10px;
  right: 10px;
  padding: 4px 8px;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  font-size: 12px;
  color: #606266;
}

@media (max-width: 768px) {
  .json-format-tool {
    padding: 10px;
  }

  .card-header {
    flex-direction: column;
    gap: 10px;
  }

  .header-actions {
    width: 100%;
    justify-content: center;
  }
}
</style>