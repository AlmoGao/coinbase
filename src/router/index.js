import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '../views/Layout/Layout.vue'
import store from '@/store'

const routes = [
  {
    path: '/',
    name: 'layout',
    component: Layout,
    redirect: '/insurance',
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('../views/Home/Home.vue')
      },
      {
        path: '/insurance',
        name: 'insurance',
        component: () => import('../views/Home/Insurance.vue')
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('../views/My/My.vue')
      },
      {
        path: '/walletInfo',
        name: 'walletInfo',
        component: () => import('../views/My/WalletInfo.vue')
      },
      {
        path: '/fundDetail',
        name: 'fundDetail',
        component: () => import('../views/My/FundDetail.vue')
      },
      {
        path: '/setting',
        name: 'setting',
        component: () => import('../views/My/Setting.vue')
      },
      {
        path: '/password',
        name: 'password',
        component: () => import('../views/My/Password.vue')
      },
      {
        path: '/passset',
        name: 'passset',
        component: () => import('../views/My/PassSet.vue')
      },
      {
        path: '/cards',
        name: 'cards',
        component: () => import('../views/My/Cards.vue')
      },
      {
        path: '/addCard',
        name: 'addCard',
        component: () => import('../views/My/AddCard.vue')
      },
      {
        path: '/withdraw',
        name: 'withdraw',
        component: () => import('../views/My/Withdraw.vue')
      },
      {
        path: '/recharge',
        name: 'recharge',
        component: () => import('../views/My/Recharge.vue')
      },
      {
        path: '/fund',
        name: 'fund',
        component: () => import('../views/Fund/Fund.vue')
      },
      {
        path: '/fundinfo',
        name: 'fundinfo',
        component: () => import('../views/Fund/FundInfo.vue')
      },
      {
        path: '/fundbuy',
        name: 'fundbuy',
        component: () => import('../views/Fund/FundBuy.vue')
      },
      {
        path: '/contract',
        name: 'contract',
        component: () => import('../views/Contract/Contract.vue')
      },
      {
        path: '/lang',
        name: 'lang',
        component: () => import('../views/My/Lang.vue')
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/User/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/User/Register.vue')
  },
  {
    // 找不到路由时
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})


const whiteList = [ 'login', 'register', 'lang' ]
router.beforeEach((to, from, next) => {
  const token = store.state.token
  if (!whiteList.includes(to.name) && !token) {
    next('/login')
  } else {
    next()
  }
})

export default router
