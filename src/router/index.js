import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/index',
    name: 'Index',
    component: () => import('../views/Index.vue'),
    meta: {
      title: '餐饮 - 首页',
      keep: true,
    },
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/Search.vue'),
    meta: {
      title: '餐饮 - 搜索'
    },
  },
  {
    path: '/shopping',
    name: 'Shopping',
    component: () => import('../views/Shopping.vue'),
    meta: {
      title: '餐饮 - 购物车'
    },
  },
  {
    path: '/me',
    name: 'Me',
    component: () => import('../views/Me.vue'),
    meta: {
      title: '餐饮 - 我的'
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
    meta: {
      title: '餐饮 - 注册',
      Footernoshow: true,
      Headernoshow: true,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: {
      title: '餐饮 - 登录',
      Footernoshow: true,
      Headernoshow: true,
    },
  },
  {
    path: '*',
    name: '404',
    component: () => import('../views/404.vue'),
    meta: {
      title: '餐饮 - 找不到页面',
      Footernoshow: true,
      Headernoshow: true,
    }
  },
  {
    path: '/productdetails/:id',
    name: 'ProductDetails',
    component: () => import('../views/ProductDetails.vue'),
    meta: {
      title: '餐饮 - 商品详情',
      Headernoshow: true,
      Footernoshow: true,
    }
  },
  {
    path: '/productlist/:name?',
    name: 'ProductList',
    component: () => import('../views/ProductList.vue'),
    meta: {
      title: '餐饮 - 商品列表',
    }
  },
  {
    path: '/receiving/:uid',
    name: 'Receiving',
    component: () => import('../views/Receiving.vue'),
    meta: {
      title: '我的 - 收货地址',
      Headernoshow: true,
      Footernoshow: true,
    }
  },
  {
    path: '/newreceiving/:uid',
    name: 'NewReceiving',
    component: () => import('../views/NewReceiving.vue'),
    meta: {
      title: '我的 - 修改地址',
      Headernoshow: true,
      Footernoshow: true,
    }
  },
  {
    path: '/set/:uname',
    name: 'Set',
    component: () => import('../views/SetMe.vue'),
    meta: {
      title: '餐饮 - 修改信息',
      Headernoshow: true,
      Footernoshow: true
    },
  },
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
