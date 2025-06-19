import { createRouter, createWebHistory } from 'vue-router'
import CountdownView from '@/components/CountdownView.vue'

const routes = [
  {
    path: '/',
    name: 'Countdown',
    component: CountdownView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router 