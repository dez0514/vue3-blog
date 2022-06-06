
import { createRouter, createWebHistory, RouteRecordRaw, RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import Home from '@/views/home/index.vue'
import NProgress from 'nprogress'

export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    meta: {
      title: '博客'
    },
    component: Home,
  
  },
  {
    path: '/archive',
    name: 'archive',
    meta: {
      title: '归档'
    },
    component: () => import('@/views/archive/index.vue')
  },
  {
    path: '/about',
    name: 'about',
    meta: {
      title: '关于'
    },
    component: () => import('@/views/about/index.vue')
  },
  {
    path: '/messageboard',
    name: 'messageboard',
    meta: {
      title: '留言板'
    },
    component: () => import('@/views/messageboard/index.vue')
  },
  {
    path: "/:pathMatch(.*)*",
    name: '404',
    component: () => import('@/views/error/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(), //history模式使用HTML5模式
  routes: [
    ...constantRoutes
  ],
});

router.beforeEach((
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  if (typeof (to.meta.title) === 'string') {
    document.title = to.meta.title
  }
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
