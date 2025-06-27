import { createRouter, createWebHistory } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'
import PagePostView from '@/views/PagePostView.vue'
import ScrollPostView from '@/views/ScrollPostView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AdminLayout,
      children: [
        { path: '', name: 'PagePostView', component: PagePostView },
        { path: '/page', name: 'PagePostView', component: PagePostView },
        { path: '/scroll', name: 'ScrollPostView', component: ScrollPostView },
      ],
    },
  ],
})

export default router
