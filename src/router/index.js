import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import code from '@/components/code'
import LiveRouter from './live.router'
// import Teacher from '@/views/Live/teacher/teacher'

Vue.use(Router)

const router = {
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
}

// 合并路由
router.routes = router.routes.concat(LiveRouter)

const RouterInstance = new Router(router)

export default RouterInstance
