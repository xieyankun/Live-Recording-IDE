/**
 * Created by Kira on 6/4/17.
 * 直播相关路由
 */

import Teacher from '@/views/Live/teacher/teacher'
// import student from './../views/Live/student/student';
// import playback from './../views/Live/playback/playback';

export default [
  {
    path: '/teacher',
    name: 'Teacher',
    component: Teacher
  }
]
