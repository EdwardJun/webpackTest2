import Vue from 'vue'
import Router from 'vue-router'
// import Global from '@/libs/global'
Vue.use(Router)
// let _global = Global.data

let pageRouterOption = [
  { path: '/', redirect: '/other1' },
  {
    path: '/other1',
    name: 'Other1',
    meta: { title: 'Other1' },
    component (resolve) {
      require.ensure([], () => resolve(require('../views/other1.vue')))
    }
  },
  {
    path: '/other2',
    name: 'Other2',
    meta: { title: 'other2' },
    component (resolve) {
      require.ensure([], () => resolve(require('../views/other2.vue')))
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
