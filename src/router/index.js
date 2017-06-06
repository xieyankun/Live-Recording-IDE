import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index/index'
import code from '@/components/code'
import LiveRouter from './live.router'

Vue.use(Router)

const router = {
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/code',
      name: 'code',
      component: code
    }
  ]
}

// 合并路由
router.routes = router.routes.concat(LiveRouter)

const RouterInstance = new Router(router)

export default RouterInstance
