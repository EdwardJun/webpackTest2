import Vue from 'vue'
import store from './store/index'
import Other from './Other.vue'
import router from './/router/index'
/* eslint-disable no-new */
new Vue({ router, store, render: h => h(Other) }).$mount('#other')
