import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import code from '@/components/code'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/code',
      name: 'code',
      component: code
    }
  ]
})
