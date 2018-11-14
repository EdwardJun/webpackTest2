import Vue from 'vue'
import store from './store/index'
import App from './App'
import router from './router'
/* eslint-disable no-new */
new Vue({ router, store, render: h => h(App) }).$mount('#app')
