import { createRouter, createWebHistory } from 'vue-router'
import ExampleView from '../views/GUI/ExampleView.vue'
import HomeVue from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeVue
    },
  ]
})

export default router
