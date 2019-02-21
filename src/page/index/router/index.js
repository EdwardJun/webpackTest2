import Vue from 'vue'
import Router from 'vue-router'
// import Global from '@/libs/global'
// import store from '../store/index' // 直接引入的方式
// import Club from '@/components/Club'
console.log('dddddddddddddd')
Vue.use(Router)
// let _global = Global.data

let pageRouterOption = [
  { path: '/', redirect: '/home' },
  {
    path: '/home',
    name: 'Home',
    // component: Club
    meta: { title: 'Home' },
    /* component (resolve) {
      require(['../page/home.vue'], resolve)
    } */
    component (resolve) {
      require.ensure([], () => resolve(require('../views/home.vue')))
    }
  },
  {
    path: '/home2',
    name: 'Home2',
    meta: { title: 'Home2' },
    component (resolve) {
      require.ensure([], () => resolve(require('../views/home2.vue')))
    }
  }
]

let router = new Router({
  routes: pageRouterOption
})

router.beforeEach((to, from, next) => {
  // _global.loading = true
  if (to.meta.title) {
    document.title = to.meta.title
  }
  return next()
})

export default router
