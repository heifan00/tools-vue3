import { createRouter, createWebHistory } from 'vue-router'
import UuidTool from '../views/UuidTool.vue'
import Md5Tool from '../views/Md5Tool.vue'

const routes = [
  {
    path: '/',
    redirect: '/timestamp'
  },
  {
    path: '/timestamp',
    name: 'Timestamp',
    component: () => import('../views/TimestampTool.vue')
  },
  {
    path: '/json',
    name: 'JsonFormat',
    component: () => import('../views/JsonFormatTool.vue')
  },
  {
    path: '/uuid',
    name: 'UUID',
    component: UuidTool
  },
  {
    path: '/md5',
    name: 'md5',
    component: Md5Tool
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router