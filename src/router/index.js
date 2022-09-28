import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../components/Home';

Vue.use(VueRouter);

const requireAuth = (to, from, next) => {
  const isAuth = localStorage.getItem('token')
  const loginPath = `/login?rPath=${encodeURIComponent(to.path)}`
  isAuth ? next() : next(loginPath)
}

const router = new VueRouter({
  mode: 'history',
  routes: [
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
      path: '/board/:bid',
      name: 'Board',
      beforeEnter: requireAuth,
      component: () => import(/* webpackChunkName: "board" */ '../components/Board.vue'),
      children: [
        { path: 'card/:cid',
          name: 'Card',
          beforeEnter: requireAuth,
          component: () => import(/* webpackChunkName: "card" */ '../components/Card.vue')
        }
      ]
    },
    {
      path: '*',
      name: 'NotFound',
      component: () => import(/* webpackChunkName: "notfound" */ '../components/NotFound.vue')
    },
  ]
})

export default router;
