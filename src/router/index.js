import { createRouter, createWebHistory } from 'vue-router'

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
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router