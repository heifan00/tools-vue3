<template>
  <div class="timestamp-tool">
    <el-card class="tool-card">
      <template #header>
        <div class="card-header">
          <h2>时间戳转换工具</h2>
        </div>
      </template>
      
      <div class="tool-content">
        <el-row :gutter="20">
          <el-col :span="24">
            <div class="current-time">
              <h3 class="timestamp-display">
                当前时间：{{ currentTime }}
                <el-button class="copy-btn" size="small" @click="copyCurrentTime">
                  <el-icon><DocumentCopy /></el-icon>
                </el-button>
              </h3>
              <h3 class="timestamp-display">
                秒级时间戳：{{ currentTimestampSeconds }}
                <el-button class="copy-btn" size="small" @click="copyTimestampSeconds">
                  <el-icon><DocumentCopy /></el-icon>
                </el-button>
              </h3>
              <h3 class="timestamp-display">
                毫秒级时间戳：{{ currentTimestampMillis }}
                <el-button class="copy-btn" size="small" @click="copyTimestampMillis">
                  <el-icon><DocumentCopy /></el-icon>
                </el-button>
              </h3>
            </div>
          </el-col>
        </el-row>

        <el-divider />

        <el-row :gutter="20" class="convert-section">
          <el-col :xs="24" :sm="12">
            <h3>时间戳转日期时间</h3>
            <el-input v-model="timestampInput" placeholder="请输入时间戳" @input="convertTimestampToDate">
              <template #append>
                <el-button @click="convertTimestampToDate">转换</el-button>
              </template>
            </el-input>
            <div class="result-box" v-if="dateResult">
              <p class="timestamp-display">
                转换结果：{{ dateResult }}
                <el-button class="copy-btn" size="small" @click="copyDateResult">
                  <el-icon><DocumentCopy /></el-icon>
                </el-button>
              </p>
            </div>
          </el-col>

          <el-col :xs="24" :sm="12">
            <h3>日期时间转时间戳</h3>
            <el-date-picker
              v-model="dateInput"
              type="datetime"
              placeholder="选择日期时间"
              @change="convertDateToTimestamp"
              @input="convertDateToTimestamp"
              @blur="convertDateToTimestamp"
              @paste="handleDatePaste"
              style="width: 100%"
            />
            <div class="result-box" v-if="timestampSecondsResult || timestampMillisResult">
              <p class="timestamp-display">
                秒级时间戳：{{ timestampSecondsResult }}
                <el-button class="copy-btn" size="small" @click="copyResultTimestampSeconds">
                  <el-icon><DocumentCopy /></el-icon>
                </el-button>
              </p>
              <p class="timestamp-display">
                毫秒级时间戳：{{ timestampMillisResult }}
                <el-button class="copy-btn" size="small" @click="copyResultTimestampMillis">
                  <el-icon><DocumentCopy /></el-icon>
                </el-button>
              </p>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { DocumentCopy } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const currentTime = ref('')
const currentTimestampSeconds = ref(0)
const currentTimestampMillis = ref(0)
const timestampInput = ref('')
const dateInput = ref('')
const dateResult = ref('')
const timestampSecondsResult = ref('')
const timestampMillisResult = ref('')

// 更新当前时间和时间戳
const updateCurrentTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleString()
  currentTimestampSeconds.value = Math.floor(now.getTime() / 1000)
  currentTimestampMillis.value = now.getTime()
}

// 复制功能
const copyToClipboard = async (text, successMessage) => {
  try {
    await navigator.clipboard.writeText(text)
    ElMessage.success(successMessage)
  } catch (error) {
    ElMessage.error('复制失败')
  }
}

const copyCurrentTime = () => copyToClipboard(currentTime.value, '当前时间已复制到剪贴板')
const copyTimestampSeconds = () => copyToClipboard(currentTimestampSeconds.value.toString(), '秒级时间戳已复制到剪贴板')
const copyTimestampMillis = () => copyToClipboard(currentTimestampMillis.value.toString(), '毫秒级时间戳已复制到剪贴板')
const copyDateResult = () => copyToClipboard(dateResult.value, '转换结果已复制到剪贴板')
const copyResultTimestampSeconds = () => copyToClipboard(timestampSecondsResult.value, '秒级时间戳已复制到剪贴板')
const copyResultTimestampMillis = () => copyToClipboard(timestampMillisResult.value, '毫秒级时间戳已复制到剪贴板')

// 时间戳转日期时间
const convertTimestampToDate = () => {
  if (!timestampInput.value) return
  try {
    const timestamp = parseInt(timestampInput.value)
    // 自动判断是秒级还是毫秒级时间戳
    const date = new Date(timestamp.toString().length > 10 ? timestamp : timestamp * 1000)
    if (isNaN(date.getTime())) {
      dateResult.value = '无效的时间戳'
      return
    }
    dateResult.value = date.toLocaleString()
  } catch (error) {
    dateResult.value = '无效的时间戳'
  }
}

// 日期时间转时间戳
const convertDateToTimestamp = () => {
  if (!dateInput.value) return
  try {
    const timestamp = dateInput.value.getTime()
    timestampSecondsResult.value = Math.floor(timestamp / 1000).toString()
    timestampMillisResult.value = timestamp.toString()
  } catch (error) {
    timestampSecondsResult.value = ''
    timestampMillisResult.value = ''
  }
}

// 处理日期时间输入框的粘贴事件
const handleDatePaste = (event) => {
  event.preventDefault()
  const pastedText = event.clipboardData.getData('text')
  try {
    const pastedDate = new Date(pastedText)
    if (!isNaN(pastedDate.getTime())) {
      dateInput.value = pastedDate
      convertDateToTimestamp()
    }
  } catch (error) {
    // 如果粘贴的内容无法转换为有效日期，则不做处理
  }
}

// 定时更新当前时间
let timer
onMounted(() => {
  updateCurrentTime()
  timer = setInterval(updateCurrentTime, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
.timestamp-tool {
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

.current-time {
  text-align: left;
  padding: 20px;
  background-color: #f5f7fa;
  border-radius: 4px;
}

.timestamp-display {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 10px 0;
}

.copy-btn {
  opacity: 0.8;
}

.copy-btn:hover {
  opacity: 1;
}

.convert-section {
  margin-top: 20px;
}

@media (max-width: 768px) {
  .timestamp-tool {
    padding: 10px;
  }
}

.timestamp-display {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  white-space: pre-line;
}

.copy-btn {
  padding: 5px 10px;
}
</style>
const copyTimestampSeconds = () => copyToClipboard(timestampResult.value.split('\n')[0].split('：')[1], '秒级时间戳已复制到剪贴板')
const copyTimestampMillis = () => copyToClipboard(timestampResult.value.split('\n')[1].split('：')[1], '毫秒级时间戳已复制到剪贴板')