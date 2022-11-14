
import { createRouter, createWebHistory, RouteRecordRaw, RouteLocationNormalized, NavigationGuardNext, RouterScrollBehavior } from 'vue-router';
import Home from '@/views/home/index.vue'
import NProgress from 'nprogress'

export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
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
    path: '/detail/:id',
    name: 'detail',
    meta: {
      title: '文章详情'
    },
    component: () => import('@/views/detail/index.vue')
  },
  {
    path: '/search',
    name: 'search',
    meta: {
      title: '搜索'
    },
    component: () => import('@/views/search/index.vue')
  },
  {
    path: '/resume',
    name: 'resume',
    meta: {
      title: '个人简历'
    },
    component: () => import('@/views/resume/index.vue')
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
  // @ts-ignore 
  scrollBehavior (to, from, savedPosition) {
    // console.log('save===', to, from)
    if (to.name === 'detail' && savedPosition) {
      // console.log('savedPosition==', savedPosition)
      // return savedPosition
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(savedPosition)
        }, 200)
      })
    } else {
      return { x: 0, y: 0 }
    }
  }
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
