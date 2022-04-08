import { createRouter, createWebHistory } from '@ionic/vue-router';
// import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'

const routes = [
  {
    path: '/',
    redirect: '/tabs/learn'
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/learn'
      },
      // {
      //   path: 'review',
      //   component: () => import('@/views/ReviewPage.vue')
      // },
      {
        path: 'learn',
        component: () => import('@/views/LearnPage.vue')
      },
      {
        path: 'settings',
        component: () => import('@/views/SettingsPage.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
