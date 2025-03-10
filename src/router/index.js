import { createRouter, createWebHistory } from 'vue-router'
import UuidTool from '../views/UuidTool.vue'

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
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router