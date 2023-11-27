import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthView from '@/views/AuthView'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/auth',
    name: 'auth',
    component: AuthView,
    meta: { requiresUnAuth: false }
  },
  {
    path: '/deposit',
    name: 'deposit',
    meta: { requiresAuth: true },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/DepositView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(function (to, _, next) {
  console.log('router.beforeEach', to.meta.requiresUnAuth)
  if (!to.meta.requiresAuth && localStorage.getItem('token') !== null) {
    next('/auth')
  } else if (to.meta.requiresAuth && localStorage.getItem('token') === null) {
    next('/')
  } else {
    next()
  }
})

export default router
