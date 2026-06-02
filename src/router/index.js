import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/rhythm',
    name: 'Rhythm',
    component: () => import('../views/RhythmView.vue')
  },
  {
    path: '/art',
    name: 'Art',
    component: () => import('../views/ArtView.vue')
  },
  {
    path: '/world',
    name: 'World',
    component: () => import('../views/WorldView.vue')
  },
  {
    path: '/puppet-categories',
    name: 'PuppetCategories',
    component: () => import('../views/PuppetCategoriesView.vue')
  },
  {
    path: '/videos',
    name: 'Videos',
    component: () => import('../views/VideosView.vue')
  },
  {
    path: '/inheritors',
    name: 'Inheritors',
    component: () => import('../views/InheritorsView.vue')
  },
  {
    path: '/detail/:type/:name?/:typeName?',
    name: 'Detail',
    component: () => import('../views/DetailView.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('../views/AuthView.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/ProfileView.vue')
  },
  {
    path: '/diy',
    name: 'DIY',
    component: () => import('../views/DIYView.vue')
  },
  {
    path: '/experience',
    name: 'Experience',
    component: () => import('../views/ExperienceView.vue')
  },
  {
    path: '/open-day-2025-detail',
    name: 'OpenDay2025Detail',
    component: () => import('../views/OpenDay2025DetailView.vue')
  },
  {
    path: '/open-day-2026-detail',
    name: 'OpenDay2026Detail',
    component: () => import('../views/OpenDay2026DetailView.vue')
  },
  {
    path: '/lab-experience-detail',
    name: 'LabExperienceDetail',
    component: () => import('../views/LabExperienceDetailView.vue')
  },
  {
    path: '/learn',
    name: 'Learn',
    component: () => import('../views/LearnView.vue')
  },
  {
    path: '/ai-diy',
    name: 'AIDiy',
    component: () => import('../views/AIDiyView.vue')
  },
  {
    path: '/quanzhou-puppet',
    name: 'QuanzhouPuppet',
    component: () => import('../views/QuanzhouDetail.vue')
  },
  {
    path: '/jinjiang-puppet',
    name: 'JinjiangPuppet',
    component: () => import('../views/JinjiangDetail.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    // 每次路由跳转时滚动到页面顶部
    return { top: 0, left: 0 }
  }
})

export default router