import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index/index'
import ide from '@/components/ide/ide'
import LiveRouter from './live.router'
// import RecordRouter from './record.router.js'

Vue.use(Router)

const router = {
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/ide',
      name: 'ide',
      component: ide
    }
  ]
}

// 合并路由
router.routes = router.routes.concat(LiveRouter)

const RouterInstance = new Router(router)

export default RouterInstance
