import { createRouter, createWebHistory } from 'vue-router'
import ExampleView from '../views/GUI/ExampleView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Example',
      component: ExampleView
    },
  ]
})

export default router
