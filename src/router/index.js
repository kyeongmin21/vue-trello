import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'

Vue.use(VueRouter)

const requireAuth = (to, from, next) => {
  const isAuth = localStorage.getItem('token')
  const loginPath = `/login?rPath=${encodeURIComponent(to.path)}`
  isAuth ? next() : loginPath
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: requireAuth
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../components/Login.vue')
  },
  {
    path: '/board/:id',
    name: 'Board',
    component: () => import(/* webpackChunkName: "board" */ '../components/Board.vue'),
    beforeEnter: requireAuth,
    children: [
      { path: 'card/:cardId',
        component: () => import(/* webpackChunkName: "card" */ '../components/Card.vue'),
        beforeEnter: requireAuth
      }
    ]
  },
  {
    path: '/notFound',
    name: 'NotFound',
    component: () => import(/* webpackChunkName: "notFound" */ '../components/NotFound.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
