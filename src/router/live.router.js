/**
 * Created by Kira on 6/4/17.
 * 直播相关路由
 */

import Live from '@/views/Live/index/index'
import Teacher from '@/views/Live/teacher/teacher'
import Student from '@/views/Live/student/student'

export default [
  {
    path: '/live',
    component: Live,
    children: [
      {
        path: '/live/teacher',
        name: 'Teacher',
        component: Teacher
      },
      {
        path: '/live/student',
        name: 'Student',
        component: Student
      }
    ]
  }
]
