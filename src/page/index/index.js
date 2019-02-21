import Vue from 'vue'
import store from './store/index'
import App from './App.vue'
import router from './router/index'
/* eslint-disable no-new */
console.log('index.js')
new Vue({ router, store, render: h => h(App) }).$mount('#app')
